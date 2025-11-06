gameLoaded = false;

// Text Viewer setup
textParserConfig.escapeHTML = true;
addParserCommand("c",function(args) {
	return choose(args);
})
addParserCommand("color",function(args) {
	if (args.length === 0) {return ""}
	if (args.length === 1) {return args[0]}
	return `<span style='color:${args[1]+ (args[2] && args[2] !== "true" ? ";background-color:"+args[2] : "")}'${ args[2] ? " class='font2'" : "" }>${args[0]}</span>`;
})
addParserCommand("symbol",function(args) {
	if (args.length === 0) {return ""}
	return `<span class="font2"${ args[1] ? ` style="color:`+args[1]+`"` : "" }>${args[0]}</span>`;
})
addParserCommand("b",function(args) {
	if (args.length === 0) {return ""}
	return "<strong>"+args[0]+"</strong>";
})
addParserCommand("i",function(args) {
	if (args.length === 0) {return ""}
	return "<em>"+args[0]+"</em>";
})
addParserCommand("num",function(args) {
	if (args.length === 0) {return ""}
	let n = parseFloat(args[0]);
	if (args[1] === "K") {
		let num = n;
		if (num < 1000) return num.toString();
		if (num < 1000000) return Math.floor((num / 1000) * 10) / 10 + "K";
		return Math.floor((num / 1000000) * 10) / 10 + "M";
	}
	let parts = args[0].toString().split(".");
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	let num = parts.join(".");
	if (args[2] && n >= parseFloat(args[2])) {
		return `{{color:${num}|#ffff8c}}`
	}
	return num;
})
addParserCommand("percent",function(args) {
	if (args.length === 0) {return ""}
	let n = parseFloat(args[0]);
	n = Math.round(n * 100);
	return `{{num:${n}}}%`;
})
addParserCommand("area",function(args) {
	if (args.length === 0) {return ""}
	let n = parseFloat(args[0]);

	if (!userSettings.units || userSettings.units === "x") {
		return `{{num:${n}}}{{icon:land}}`;
	}
	if (userSettings.units === "m") {
		return `{{num:${n * (800 * 800)}}} km²`
	}
	if (userSettings.units === "i") {
		return `{{num:${Math.round(n * (800 * 800) / 2.59)}}} mi²`
	}
	return `{{num:${n}}}`;
})
addParserCommand("length",function(args) {
	if (args.length === 0) {return ""}
	let n = parseFloat(args[0]);

	if (!userSettings.units || userSettings.units === "x") {
		return `{{num:${n}}}{{icon:land}}`;
	}
	if (userSettings.units === "m") {
		return `{{num:${n * 800}}} km`
	}
	if (userSettings.units === "i") {
		return `{{num:${Math.round(n * 800 / 1.609)}}} mi`
	}
	return `{{num:${n}}}`;
})
addParserCommand("volume",function(args) {
	if (args.length === 0) {return ""}
	let n = parseFloat(args[0]);
	n = Math.round(n*10) / 10;

	if (!userSettings.units || userSettings.units === "x") {
		return `{{num:${n}}}{{icon:land}}`;
	}
	if (userSettings.units === "m") {
		return `{{num:${Math.round(n * 944000000 / 1000000000000)}}} trillion km³`
	}
	if (userSettings.units === "i") {
		return `{{num:${Math.round(n * 944000000 / 4.168 / 1000000000000)}}} trillion mi³`
	}
	return `{{num:${n}}}`;
})
addParserCommand("elevation",function(args) {
	if (args.length === 0) {return ""}
	let n = parseFloat(args[0]);

	if (!userSettings.units || userSettings.units === "x") {
		return `{{num:${Math.round(n*100)}}}%`;
	}

	let elevation = n*100;
	let seaLevel = waterLevel*100;
	let seaLevelDiff = elevation - seaLevel;

	if (args[1] === "d") seaLevelDiff = Math.abs(seaLevelDiff);

	let text = "Invalid Elevation";
	if (userSettings.units === "m") {
		text = `{{num:${Math.round(seaLevelDiff / 10 * 1475)}}} m`
	}
	if (userSettings.units === "i") {
		text = `{{num:${Math.round(seaLevelDiff / 10 * 1475 * 3.281)}}} ft`
	}
	if (args[1] === "l") {
		if (seaLevelDiff === 0) text = "at sea level";
		else text += (seaLevel > 0 ? " above" : "below") + " sea level";
	}
	return text;
})
addParserCommand("temperature",function(args) {
	if (args.length === 0) {return ""}
	let n = parseFloat(args[0]);

	if (!userSettings.units || userSettings.units === "x") {
		return `{{num:${Math.round(n * 100)}}}°`;
	}

	n = Math.round(n * 40 - 10);

	if (userSettings.units === "m") {
		return `{{num:${n}}}°C`;
	}
	if (userSettings.units === "i") {
		return `{{num:${Math.round(n * 9/5) + 32}}}°F`
	}
	return `Invalid Temperature`;
})
addParserCommand("date",function(args) {
	if (args.length === 0) {return ""}
	let n = parseInt(args[0]);
	if (isNaN(n)) return "Invalid Date";

	if (!userSettings.dates || userSettings.dates === "x") {
		if (args[1] === 's') return n.toString();
		return `Day {{num:${n}}}`;
	}
	if (userSettings.dates === "g") {
		let date = new Date("2023-01-01");
		date.setTime(date.getTime() + 86400000 * (Math.max(1,n)-1));
		if (args[1] === 's') {
			const formatter = new Intl.DateTimeFormat(undefined, {
				month: 'short',
				day: 'numeric',
				timeZone: "UTC"
			});
			return formatter.format(date);
		}
		const formatter = new Intl.DateTimeFormat(undefined, {
			weekday: args[1] === 'l' ? 'short' : undefined,
			month: 'short',
			day: 'numeric',
			timeZone: "UTC"
		});
		return formatter.format(date) + ", " + (date.getUTCFullYear() - 2023).toString().padStart(4, "0");
	}
	return `{{num:${n}}}`;
})
addParserCommand("duration",function(args) {
	let n = parseFloat(args[0]);
	if (isNaN(n)) return "Invalid Duration";
	let unit = "day";
	if (n && Math.abs(n) < 1) {
		n *= 24;
		unit = "hour";
	}
	return `{{num:${Math.round(n)}}} ${unit}${Math.abs(n) === 1 ? "" : "s"}`;
})
addParserCommand("check",function(args) {
	return `{{color:${args[0] || "/"}|#00ff00|true}}`;
})
addParserCommand("x",function(args) {
	return `{{color:${args[0] || "X"}|#ff0000|true}}`;
})
addParserCommand("wait",function(args) {
	return `{{color:${args[0] || "»"}|#ffff00|true}}`;
})
// addParserCommand("town",function(args) {
//   if (args.length === 0) {return ""}
//   let town = regGet("town",parseInt(args[0]));
//   if (!town) return `<span class='entityName' title='${parseInt(args[0])}'>Invalid Town</span>`;
//   return `<span class='entityName' style='color:rgb(${town.color.join(",")})'>${town.name}</span>`;
// })
addParserCommand("icon",function(args) {
	if (args.length === 0) {return ""}
	return `<img src="icons/${args[0]}.png" class="inlineIcon pixelart" alt="${args[1]||titleCase(args[0])}" title="${args[1]||""}" draggable="false">`;
})
addParserCommand("resourcetotal",function(args) {
	if (args.length < 2) {return ""}
	let town = regGet("town",parseInt(args[0]));
	let type = args[1];
	if (!town.resources || !town.resources[type]) return 0;
	let total = town.resources[type];
	total = total.toString();
	if (total >= $c.maxResource(town)) {
		return `{{color:{{num:${total}|K}}|#ffff8c}}`
	}
	return total;
})
addParserCommand("diff",function(args) {
	if (args.length === 0) {return ""}
	let n = parseFloat(args[0]);
	n = Math.round(n) / 100
	if (n === 0) return '<span style="color:#ffff6e">0</span>';
	let pos = n > 0;
	return `<span style="color:${pos ? "#6eff6e" : "#ff6e6e"}">${(pos ? "+" : "") + args[0]}</span>`;
})
addParserCommand("arrow",function(args) {
	if (args.length < 2) {return ""}
	return `<img src="icons/${parseInt(args[0]) ? 'up' : 'down'}-${parseInt(args[1]) ? 'good' : 'bad'}.png" class="inlineIcon pixelart" alt="${parseInt(args[0]) ? '↑' : '↓'}" draggable="false">`.repeat(parseInt(args[2]) || 1);
})
addParserCommand("regname",function(args) {
	if (args.length < 2) {return ""}
	// const id = parseInt(args[1]);
	// if (isNaN(id)) return `<span class='entityName' title='${data.id}' data-reg='${args[0]}' data-id='${data.id}'>Invalid Thing</span>`;
	const data = regGet(args[0],parseInt(args[1]));
	if (!data) return `<span class='entityName' title='${args[1]}' data-reg='${args[0]}' data-id='${args[1]}'>Invalid Thing</span>`;
	let name = data.name;
	if (args[2] && args[2] !== "-") name = args[2];
	let color = data.color;
	if (regBrowserExtra[data._reg]) {
		if (!name && regBrowserExtra[data._reg].name) {
			name = regBrowserExtra[data._reg].name(data);
		}
		if (!color && regBrowserExtra[data._reg].color) {
			color = regBrowserExtra[data._reg].color(data);
		}
	}
	if (!name) name = data.subtype || data.type;
	return (!args[2] && data.prefix ? "<span class='affix'>" + data.prefix + " </span>" : "") + `<span class='entityName${data.usurp ? " usurp" : ""}' title='${titleCase(args[0])}' data-reg='${args[0]}' data-id='${data.id}' ${color ? `style="color:rgb(${color[0]},${color[1]},${color[2]})"` : ""} onclick="handleEntityClick(this); event.stopPropagation();" onmouseenter='handleEntityHover(this)' onmouseleave='handleEntityHoverOut(this)' role="link">${args[2] !== "-" ? (data.flag||data.symbol) ? parseText(data.flag||"{{symbol:"+data.symbol+"}}")+" " : "" : ""}${name}</span>` + (!args[2] && data.suffix ? "<span class='affix'> " + data.suffix + "</span>" : "");
})
addParserCommand("regoldest",function(args) {
	if (args.length < 1) {return ""}
	let data = regToArray(args[0])[0];
	if (!data) return "a "+args[0];
	return `{{regname:${args[0]}|${data.id}}}`;
})
addParserCommand("randreg",function(args) {
	if (args.length < 1) {return ""}
	let options;
	if (args[1]) options = regFilter(args[0],(r) => r.type === args[1]);
	else options = regToArray(args[0]);

	if (options.length) return `{{regname:${args[0]}|${choose(options).id}}}`
	
	return ``;
})
addParserCommand("regadj",function(args) {
	if (args.length < 2) {return ""}
	const data = regGet(args[0],parseInt(args[1]));
	if (!data) return `{{regname:${args[0]}|${args[1]}}}`;
	return `{{regname:${args[0]}|${args[1]}${
		data.adj ? "|"+data.adj : ""
	}}}`
})
addParserCommand("currency",function(args) {
	if (args.length < 1) {return ""}
	const data = regGet("town",parseInt(args[0]));
	if (!data) return `{{symbol:¤}}`;
	let symbol = data.currencySign || "¤";
	return `{{symbol:${symbol}|rgb(${data.color.join(",")})}}`;
})
addParserCommand("planet",function(args) {
	return `<span class='entityName' onclick='regBrowsePlanet()' style="color:rgb(${(planet.color||biomes.water.color).join(",")})">${args[0] || planet.name}</span>`;
})
addParserCommand("biome",function(args) {
	return `<span class='entityName' onclick='regBrowseBiome("${args[0]}")' style="color:rgb(${biomes[args[0]].color.join(",")})">${titleCase(args[1] || biomes[args[0]].name || args[0])}</span>`;
})
addParserCommand("people",function(args) {
	if (planet.dems) return `{{planet|${planet.dems}}}`;
	return "inhabitants of {{planet}}";
})
addParserCommand("residents",function(args) {
	if (args.length === 0) return "residents";
	let town = regGet("town",args[0]);
	if (!town) return "{{c:residents|citizens}}";
	if (town.dems) return `{{regname|town|${args[0]}|${town.dems}}}`;
	if (args[1]) return `${args[1]} from {{regname|town|${args[0]}}}`;
	return `{{c:residents|citizens}} of {{regname|town|${args[0]}}}`;
})
addParserCommand("face",function(args) {
	if (args.length === 0) return "{{icon:neutral|Population}}";
	let town = regGet("town", parseInt(args[0]));
	if (!town) return "{{icon:neutral|Population}}";

	let mood = town.influences.happy || 0;
	let icon = "neutral";
	if (mood >= 3) icon = "happy";
	if (mood <= -2) icon = "sad";

	return `{{icon:${icon}|${args[1]||"Population"}}}`;
})
addParserCommand("should",function(args) {
	return "{{c:Should they|Do you approve|Good idea}}?";
})
addParserCommand("good",function(args) {
	if (args.length === 0) {return ""}
	return "<span class='good'>"+args[0]+"</span>";
})
addParserCommand("bad",function(args) {
	if (args.length === 0) {return ""}
	return "<span class='bad'>"+args[0]+"</span>";
})
addParserCommand("none",function(args) {
	return `<span class='none'>None yet..</span>`;
})

userSettings = {};
if (R74n.has("GenTownSettings")) {
	userSettings = JSON.parse(R74n.get("GenTownSettings"));
}

function escapeHTML(unsafe) {
	return unsafe
		.replace(/&#039;/g, "'")
		.replace(/&quot;/g, '"')
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}
function uuidv4() {
	return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
		(+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
	);
}
function titleCase(str) {
	str = str.toString();
	str = str.replace(/_/g," ");
	return str.replace(
		/(?:^| )[A-Za-zÀ-ÖØ-öø-ÿ]/g,
		text => text.toUpperCase()
	).replace(
		/ (Of|And|Or|With) /g,
		text => text.toLowerCase()
	);
}
function isFunction(obj) {
	return !!(obj && obj.constructor && obj.call && obj.apply);
};
function chooseWeighted(items, weights) {
	var i;

	for (i = 1; i < weights.length; i++)
		weights[i] += weights[i - 1];
	
	var random = Math.random() * weights[weights.length - 1];
	
	for (i = 0; i < weights.length; i++)
		if (weights[i] > random)
			break;
	
	return items[i];
}
function chooseDifferent(items, not) {
	return choose(items.filter(i => i !== not));
}
function sumArray(array) {
	return array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}
function sumValues(obj) {
	let total = 0;
	Object.values(obj).forEach((n) => {
		total += n;
	})
	return total;
}

function coordsToChunk(x, y) {
	return Math.trunc(x/chunkSize)+","+Math.trunc(y/chunkSize);
}
function chunkCoordsToCoords(cx, cy, x, y) {
	return [cx*chunkSize + x, cy*chunkSize + y];
}
function chunkAt(x, y) {
	return planet.chunks[x+","+y];
}
function pixelAt(x, y) {
	const chunk = planet.chunks[coordsToChunk(x,y)];
	if (chunk === undefined) return null;
	x = x % chunkSize;
	y = y % chunkSize;
	return chunk.p[x][y];
}

function RGBtoHSL(rgb) {let r=rgb[0];let g=rgb[1];let b=rgb[2];r /= 255, g /= 255, b /= 255;var max = Math.max(r, g, b), min = Math.min(r, g, b);var h, s, l = (max + min) / 2;if (max == min) {h = s = 0;} else {var d = max - min;s = l > 0.5 ? d / (2 - max - min) : d / (max + min);switch (max) {case r: h = (g - b) / d + (g < b ? 6 : 0); break;case g: h = (b - r) / d + 2; break;case b: h = (r - g) / d + 4; break;}h /= 6;}return [ h, s, l ];}
function HSLtoRGB(hsl) {let h=hsl[0];let s=hsl[1];let l=hsl[2];var r, g, b;if (s == 0) {r = g = b = l;} else {function hue2rgb(p, q, t) {if (t < 0) t += 1;if (t > 1) t -= 1;if (t < 1/6) return p + (q - p) * 6 * t;if (t < 1/2) return q;if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;return p;}var q = l < 0.5 ? l * (1 + s) : l + s - l * s;var p = 2 * l - q;r = hue2rgb(p, q, h + 1/3);g = hue2rgb(p, q, h);b = hue2rgb(p, q, h - 1/3);}return [ r * 255, g * 255, b * 255 ];}

function hexToRGB(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? [
		parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16) ]
	: null;
}

colorCache = {};
function colorBrightness(rgb, multiplier) {
	const key = rgb.join(",")+":b"+multiplier;
	// if (colorCache[key]) return colorCache[key];
	let hsl = RGBtoHSL(rgb);
	hsl[2] = Math.min(1, hsl[2] + multiplier-1);
	hsl[0] = (hsl[0] * multiplier) % 1;
	colorCache[key] = HSLtoRGB(hsl).map((n) => Math.round(n));
	return colorCache[key];
}
function colorChange(rgb) {
	let hsl = RGBtoHSL(rgb);
	hsl[0] += randRange(2,5) / 10 * (Math.random() < 0.5 ? -1 : 1)
	hsl[2] += (randRange(-2,2) / 10);
	hsl[2] = Math.max(0.35, Math.min(0.8, hsl[2]));
	return HSLtoRGB(hsl).map((n) => Math.round(n));
}
//colorChannelA and colorChannelB are ints ranging from 0 to 255
function colorChannelMixer(colorChannelA, colorChannelB, amountToMix){
    var channelA = colorChannelA*amountToMix;
    var channelB = colorChannelB*(1-amountToMix);
    return parseInt(channelA+channelB);
}
//rgbA and rgbB are arrays, amountToMix ranges from 0.0 to 1.0
//example (red): rgbA = [255,0,0]
function colorMix(rgbA, rgbB, amountToMix=0.5){
    var r = colorChannelMixer(rgbA[0],rgbB[0],amountToMix);
    var g = colorChannelMixer(rgbA[1],rgbB[1],amountToMix);
    var b = colorChannelMixer(rgbA[2],rgbB[2],amountToMix);
    return [r,g,b];
}

function generatePerlinNoise(x, y, octaves, persistence) {
	let total = 0;
	let frequency = 1;
	let amplitude = 1;
	let maxValue = 0;  // Used for normalizing the result

	for (let i = 0; i < octaves; i++) {
		total += noise.perlin2(x * frequency, y * frequency) * amplitude;
		maxValue += amplitude; // Keep track of maximum possible value
		amplitude *= persistence;
		frequency *= 2;
	}

	return total / maxValue; // Normalize the result to stay within 0-1 range
}

mapCanvas = document.getElementById("mapCanvas");
ctx = mapCanvas.getContext("2d");

planetWidth = $c.defaultPlanetWidth;
planetHeight = $c.defaultPlanetHeight;
pixelSize = $c.defaultPixelSize;
chunkSize = $c.defaultChunkSize;
waterLevel = $c.defaultWaterLevel;
planetOld = [];

// ensure chunks fit into planet
planetWidth -= (planetWidth % chunkSize);
planetHeight -= (planetHeight % chunkSize);

function defaultSubregistry() {
	return {
		_id: 1
	}
}
function defaultRegistry() {
	let r = {
		"town": defaultSubregistry(),
		"resource": defaultSubregistry(),
		"individual": defaultSubregistry(),
		"player": defaultSubregistry(),
		"registry": defaultSubregistry(),
		"process": defaultSubregistry(),
		"marker": defaultSubregistry(),
		"nature": defaultSubregistry(),
		"product": defaultSubregistry()
	}
	for (let key in r) {
		r.registry[key] = r.registry._id;
		r.registry._id++;
	}
	return r;
}
function regCreate(subregistryName) {
	reg[subregistryName] = defaultSubregistry();
	reg.registry[[subregistryName]] = reg.registry._id;
	reg.registry._id++;
}
function regDelete(subregistryName) {
	delete reg[subregistryName];
}
function regAdd(subregistryName, object) {
	// if (!reg[subregistryName]) regCreate(subregistryName);
	object.id = reg[subregistryName]._id;
	object._reg = subregistryName;
	object.start = planet.day;
	reg[subregistryName][reg[subregistryName]._id] = object;
	reg[subregistryName]._id++;
	return object;
}
function regRemove(subregistryName, id) {
	reg[subregistryName][id].del = true;
	delete reg[subregistryName][id];
}
function regGet(subregistryName, id) {
	return reg[subregistryName][id];
}
// function regToArray(subregistryName) {
//   return Object.values(reg[subregistryName]).filter((i) => isNaN(i));
// }
function regToArray(subregistryName, includeEnded=false) {
	return regFilter(subregistryName, (i) => true, includeEnded);
}
function sortEntities(items, sortBy, inverse=false) {
	items = [...items];

	sortBy = sortBy.split(".");
	let key = sortBy[0];
	let subkey = sortBy[1];

	if (subkey) {
		items.sort((a, b) => (b[key]||{})[subkey] - (a[key]||{})[subkey] );
	}
	else {
		items = items.filter((item) => item[key] !== undefined);

		if (!items.length) return items;

		if (typeof items[0][key] === "string") {
			items.sort((a, b) => (a[key].toString ? a[key].toString() : "").localeCompare((b[key].toString ? b[key].toString() : ""), 'en', {'sensitivity': 'base'}));
		}

		else items.sort((a, b) => b[key] - a[key] );
	}

	if (inverse) items.reverse();

	return items;
}
function regSorted(subregistryName, sortBy, inverse=false) {
	let items = regToArray(subregistryName);

	return sortEntities(items, sortBy, inverse);
}
function regCount(subregistryName) {
	return regToArray(subregistryName).length;
}
function regFilter(subregistryName, check, includeEnded=false) {
	let results = [];
	for (let key in reg[subregistryName]) {
		if (!isNaN(reg[subregistryName][key])) continue;
		if (includeEnded === false && reg[subregistryName][key].end) continue;
		if (check(reg[subregistryName][key])) results.push(reg[subregistryName][key]);
	}
	return results;
}
function regSingle(subregistryName, check) {
	for (let key in reg[subregistryName]) {
		if (!isNaN(reg[subregistryName][key])) continue;
		if (reg[subregistryName][key].end) continue;
		if (check(reg[subregistryName][key])) return reg[subregistryName][key];
	}
	return null;
}
function regExists(subregistryName, check) {
	for (let key in reg[subregistryName]) {
		if (!isNaN(reg[subregistryName][key])) continue;
		if (reg[subregistryName][key].end) continue;
		if (check(reg[subregistryName][key])) return true;
	}
	return false;
}

function defaultPlanet() {
	return {
		day: 1,
		chunks: {},
		reg: defaultRegistry(),
		created: Date.now(),
		color: biomes.water.color,
		saved: null,
		unlocks: {},
		unlocksRejected: {},
		oneTimeEvents: {},
		nextDayMessages: [],
		warnings: {},
		unlockedExecutive: {},
		stats: {}
	};
}

townColors = [
	[255, 87, 87],
	[255, 116, 51],
	[255, 164, 73],
	[87, 87, 255],
	[151, 87, 255],
	[255, 25, 159],
	[255, 87, 255]
]
extraColors = [
	[87,255,87],
	[38,38,38],
	[224,224,224],
	[38,38,38],
	[224,224,224],
]
function defaultTown() {
	return {
		"name": generateWord($c.townSyllables,true,wordComponents.prefixes.TOWN),
		"pop": 20,
		"color": choose(townColors),
		"type": "town",
		"level": 20, //town
		"resources": {},
		"size": 0,
		"jobs": {},
		"influences": {
			"birth": 1,
			// "happy": 0,
			// "crime": 0,
		},
		"legal": {},
		"issues": {},
		"relations": {},
		"wealth": 0,
		"_reg": "town"
	}
}

randomEvents = {};
dailyEvents = {};
metaEvents = {};
function finalizeEvents() {
	randomEvents = {};
	dailyEvents = {};
	for (let eventClass in gameEvents) {
		let eventInfo = gameEvents[eventClass];
		if (eventInfo.meta === true) {
			metaEvents[eventClass] = eventInfo;
		}
		else if (eventInfo.daily === true) {
			dailyEvents[eventClass] = eventInfo;
		}
		else { // random: true
			randomEvents[eventClass] = eventInfo;
		}
	}
}
finalizeEvents();

function happen(action, subject, target, args, targetClass=undefined) {
	if (!targetClass && target && target._reg) targetClass = target._reg;
	let actionFunc = actionables[targetClass].asTarget[action];
	let r = actionFunc(subject,target,args||{});
	if (r === 0) return r;
	if (r === undefined) return target;
	return r;
}

function readyEvent(eventClass, subject=null, target=null) {
	if (!eventClass) return undefined;

	let args = {};

	const eventInfo = gameEvents[eventClass];

	if (!subject && eventInfo.subject && eventInfo.subject.reg) {
		let regname = eventInfo.subject.reg;
		if (eventInfo.subject.random) {
			subject = choose(regFilter(regname, (r) => !r.start || (planet.day - r.start > 1)));
			if (!subject) return;
		}
		else if (eventInfo.subject.all) {
			subject = regToArray(regname);
			if (subject.length === 0) return;
		}
		else if (eventInfo.subject.filter) {
			subject = regFilter(regname, eventInfo.subject.filter);
			if (subject.length === 0) return;
		}
		else if (eventInfo.subject.single) {
			subject = regSingle(regname, eventInfo.subject.single);
			if (!subject) return;
		}
		else if (eventInfo.subject.id) {
			subject = regGet(regname,eventInfo.subject.id);
			if (!subject) return;
		}
	}

	if (!target && eventInfo.target && eventInfo.target.reg) {
		let regname = eventInfo.target.reg;
		if (eventInfo.target.random) {
			target = choose(regFilter(regname, (r) => !r.start || (planet.day - r.start > 1)));
			if (!target) return;
			if (subject == target) choose(regToArray(regname));
			if (subject == target) return;
		}
		else if (eventInfo.target.all) {
			target = regToArray(regname);
			if (target.length === 0) return;
		}
		else if (eventInfo.target.filter) {
			target = regFilter(regname, eventInfo.target.filter);
			if (target.length === 0) return;
		}
		else if (eventInfo.target.single) {
			target = regSingle(regname, eventInfo.target.single);
			if (!target) return;
		}
		else if (eventInfo.target.id) {
			target = regGet(regname,eventInfo.target.id)
			if (!target) return;
		}
		else if (eventInfo.target.nearby && regname === "town" && subject && subject._reg === "town") {
			let chunk = randomChunk((c) => c.v.s === subject.id);
			if (!chunk) return;
			target = nearbyTown(chunk.x, chunk.y, (t) => t.id !== subject.id, 5);
			if (!target) return;
		}
	}

	if (args.value === undefined && eventInfo.value !== undefined) {
		if (isFunction(eventInfo.value)) {
			args.value = eventInfo.value(subject,target,args);
			if (args.value === false) return;
		}
		else if (typeof eventInfo.value === "object") {
			if (eventInfo.value.random && Array.isArray(eventInfo.value.random)) {
				args.value = choose(eventInfo.value.random);
			}
		}
		else args.value = eventInfo.value;
	}

	let message = null;
	if (isFunction(eventInfo.message)) {
		message = eventInfo.message(subject,target,args);
	}
	else if (eventInfo.message) message = eventInfo.message

	if (!subject && !target) return undefined;

	return {
		subject: subject,
		target: target,
		args: args,
		message: message,
		eventID: uuidv4(),
		eventClass: eventClass
	}
}

function doEvent(eventClass,eventCaller) {
	const eventInfo = gameEvents[eventClass];

	if (!eventCaller) eventCaller = readyEvent(eventClass);

	let subjects = eventCaller.subject;
	if (!Array.isArray(subjects)) subjects = [subjects];
	let targets = eventCaller.target;
	if (!Array.isArray(targets)) targets = [targets];

	let r;
	for (let i = 0; i < subjects.length; i++) {
		const subject = subjects[i];
		
		for (let j = 0; j < targets.length; j++) {
			const target = targets[j];
			
			if (eventInfo.chunkRate && eventInfo.subject && eventInfo.subject.reg === "town" && eventInfo.perChunk) {
				let chunks = filterChunks((c) => c.v.s === subject.id);
				for (let k = 0; k < chunks.length; k++) {
					if (Math.random() > eventInfo.chunkRate) continue;
					const chunk = chunks[k];
					eventInfo.perChunk(subject,target,chunk,eventCaller.args);
				}
			}
			if (eventInfo.func) {
				r = eventInfo.func(subject, target, eventCaller.args);
			}
		}

	}

	// renderMap();
	// renderHighlight();
	// renderCursor();
	// updateStats();
	// updateCanvas();

	return r || targets[targets.length-1];
}

function chooseEvent(step=0,influencingTown) {
	let keys = Object.keys(randomEvents);
	let influences = {};
	if (influencingTown && influencingTown.influences) influences = influencingTown.influences;
	let choice = chooseWeighted(
		keys,
		keys.map((i) => {
			if (recentEvents.indexOf(i) !== -1) return 0;
			i = randomEvents[i];
			if (isNaN(i.weight)) return 1;
			let weight = i.weight;
			if (i.needsUnlock) {
				for (let key in i.needsUnlock) {
					if (planet.unlocks[key] === undefined || planet.unlocks[key] < i.needsUnlock[key]) return 0;
				}
			}
			if (i.influencedBy) {
				for (let influence in i.influencedBy) {
					if (influences[influence] <= $c.minInfluence) return 0;
					if (influences[influence]) weight = addInfluence(weight, influencingTown, influence);
					// if (influences[influence]) weight *= (Math.sign(influences[influence]) + influences[influence]) * (Math.sign(i.influencedBy[influence]) + i.influencedBy[influence]);
					// console.log(weight)
				}
			}
			return weight;
		})
	);
	if (!choice) {
		if (step < 5) choice = chooseEvent(step+1,influencingTown);
	}
	return choice;
}
/*
happen(
	"Rename",
	regGet("player",1),
	regGet("town",1),
	{value: "TestTown"}
);

let e = readyEvent("townRecolor");
doEvent("townRecolor",e);
*/

function addInfluence(value, subject, influenceName) {
	if (subject.influences !== undefined && subject.influences[influenceName] !== undefined) {
		let influence = subject.influences[influenceName];
		if (influence <= $c.minInfluence) return 0;
		if (influence > 0) value *= (influence/10 + 1);
		else value *= (1 - Math.abs(influence)/10)
	}
	return value;
}
function subtractInfluence(value, subject, influenceName) {
	if (subject.influences !== undefined && subject.influences[influenceName] !== undefined) {
		let influence = subject.influences[influenceName];
		if (influence >= $c.maxInfluence) return 0;
		if (influence > 0) value /= (influence/10 + 1);
		else value /= (1 - Math.abs(influence)/10)
	}
	return value;
}
function chanceInfluence(chance, subject, influenceName) {
	chance = addInfluence(chance, subject, influenceName);
	return Math.random() < chance;
}

function generatePlanet() {
	let planet = defaultPlanet();
	// reg = planet.reg;
	
	noise.seed(Math.random());
	noiseMin = -0.3;
	noiseMax = 0.42;
	for (let chunkX = 0; chunkX < planetWidth / chunkSize; chunkX++) {
		for (let chunkY = 0; chunkY < planetHeight / chunkSize; chunkY++) {
			let chunkKey = chunkX+","+chunkY;
			let chunk = {
				v: {},
				x: chunkX,
				y: chunkY
			}
			
			// chunk temperature
			chunk.t = noise.perlin2(chunkX / 20, chunkY / 20);
			// console.log(chunk.t)
			chunk.t = (chunk.t - -0.5) / (0.3 - -0.5);
			chunk.t = Math.max(0,Math.min(chunk.t,1))
			// lower resolution
			chunk.t = Math.ceil(chunk.t * 10) / 10;
	
			// chunk moisture
			chunk.m = noise.perlin2((chunkX+1000) / 20, (chunkY+1000) / 20);
			chunk.m = (chunk.m - -0.5) / (0.3 - -0.5);
			chunk.m = Math.max(0,Math.min(chunk.m,1))
			// lower resolution
			chunk.m = Math.ceil(chunk.m * 10) / 10;
	
			let elevations = 0;
			let isLand = false;
	
			// chunk pixels
			let chunkPixels = [];
			for (let x0 = 0; x0 < chunkSize; x0++) {
				chunkPixels.push([]);
				for (let y0 = 0; y0 < chunkSize; y0++) {
					let coords = chunkCoordsToCoords(chunkX, chunkY, x0, y0);
					let x = coords[0];
					let y = coords[1];
					let value = generatePerlinNoise(x / 40, y / 40, 5, 0.5);
					// value = Math.max(0,value);
					// value = (value+1) / 2;
	
					// normalize to 0-1
					value = (value - noiseMin) / (noiseMax - noiseMin);
	
					value = Math.max(0,value);
					value = Math.min(1,value);
	
					// Calculate distance from the edge of the map
					let distanceToEdge = Math.min(x+1, y+1, planetWidth - x, planetHeight - y);
					
					// Apply a falloff function to make borders low elevation
					let falloff = distanceToEdge / (Math.min(planetWidth, planetHeight) / 10);  // Distance-based falloff
					falloff = Math.min(1, falloff);  // Ensure falloff is between 0 and 1
	
					// Blend the perlin noise with the falloff
					value *= falloff
	
					// lower resolution
					value = Math.ceil(value * 10) / 10;
	
					// console.log(value);
					chunkPixels[x0].push(value);
					elevations += value;
					if (value > waterLevel) isLand = true;
				}
			}
			chunk.p = chunkPixels;
			chunk.e = elevations/(chunkSize*chunkSize);
			// lower resolution
			chunk.e = Math.ceil(chunk.e * 10) / 10;
			if (chunk.e <= waterLevel+0.05) chunk.m = 1;
			if (!isLand) chunk.b = "water";
			planet.chunks[chunkKey] = chunk;
		}
	}
	
	// bounding pixels for testing
	// planet.chunks["0,0"].p[0][0] = 0.99;
	// planet.chunks[(planetWidth / chunkSize - 1)+","+(planetHeight / chunkSize - 1)].p[chunkSize-1][chunkSize-1] = 0.99;

	return planet;
}

farColors = [
	[255, 92, 92],//red
	[92, 255, 92],//green
	[92, 92, 255],//blue
	[255, 174, 92],//orange
	[174, 92, 255],//purple
	[92, 255, 255],//cyan
	[255, 92, 255],//magenta
	[255, 255, 92],//yellow
]
function calculateLandmasses() {
	if (!reg.landmass) regCreate("landmass");

	// Pre-landmass (Mountains)
	for (let chunkKey in planet.chunks) {
		const chunk = planet.chunks[chunkKey];
		if (chunk.v.g === undefined && chunk.b === "mountain") {
			const mountains = floodFill(chunk.x, chunk.y, (c) => c.b === "mountain");
			const landmass = regAdd("landmass", {
				name: "Mount "+generateWord(randRange(1,2), true),
				color: biomes.mountain.color,
				size: mountains.length,
				type: "mountain"
			});
			mountains.forEach((c) => {
				c.v.g = landmass.id;
			})
		}
	}

	// Main landmasses
	for (let chunkKey in planet.chunks) {
		const chunk = planet.chunks[chunkKey];
		if (chunk.v.g === undefined && chunk.b !== "water") {
			const parts = floodFill(chunk.x,chunk.y,(c) => c.b !== "water" && c.v.g === undefined, undefined, (c) => {
				// console.log([].concat(...c.p).filter((p) => p <= waterLevel));
				return [].concat(...c.p).filter((p) => p <= waterLevel).length > (chunkSize*0.95);
			});

			if (parts.length < 6) continue;

			let landmass = regAdd("landmass", {
				name: generateWord(randRange(2,3), true),
				size: 0
			});
			let id = landmass.id;
			landmass.color = farColors[(id-1) % farColors.length];

			landmass.boundLeft   = planetWidth;
			landmass.boundRight  = 0;
			landmass.boundTop    = planetHeight;
			landmass.boundBottom = 0;

			// console.log(parts);
			parts.forEach((newChunk) => {
				newChunk.v.g = id;
				landmass.size++;
				// if (newChunk.x < landmass.boundLeft) landmass.boundLeft = newChunk.x;
				// if (newChunk.x > landmass.boundRight) landmass.boundRight = newChunk.x;
				// if (newChunk.y < landmass.boundTop) landmass.boundTop = newChunk.y;
				// if (newChunk.y > landmass.boundBottom) landmass.boundBottom = newChunk.y;
			})

			if (landmass.size < 40) landmass.type = "island";
			else landmass.type = "continent";
		}
	}

	// Post-landmass (Edges and islands)
	for (let chunkKey in planet.chunks) {
		const chunk = planet.chunks[chunkKey];
		if (chunk.v.g === undefined && chunk.b !== "water") {
			const parts = floodFill(chunk.x,chunk.y,(c) => c.b !== "water" && c.v.g === undefined);
			if (parts.length > 5) {
				let landmass = regAdd("landmass", {
					name: generateWord(randRange(2,3), true),
					size: parts.length,
					type: "island"
				});
				landmass.color = farColors[(landmass.id-1) % farColors.length];
				parts.forEach((newChunk) => {
					newChunk.v.g = landmass.id;
				})
			}
			else {
				let nearest = nearestChunk(chunk.x, chunk.y, (c) => c.v.g, (c) => c.b === "water");
				if (nearest) {
					parts.forEach((newChunk) => {
						newChunk.v.g = nearest.v.g;
					})
				}
				else {
					let landmass = regAdd("landmass", {
						name: generateWord(randRange(2,3), true),
						size: parts.length,
						type: "island"
					});
					landmass.color = farColors[(landmass.id-1) % farColors.length];
					parts.forEach((newChunk) => {
						newChunk.v.g = landmass.id;
					})
				}
			}
		}
	}
}

biomes = {
	"grass": {
		color: [0,255,0],
		elevation: 0.5,
		moisture: 0.5,
		temp: 0.5,
		hasLumber: true,
		name: "grassland"
	},
	"mountain": {
		color: [150,150,150],
		elevation: 1.4,
		temp: 0.1,
		moisture: 0.6,
		crop: null,
		livestock: null,
		name: "mountains",
		adj: ["mountain"]
	},
	"snow": {
		color: [255,255,255],
		elevation: 0.6,
		temp: 0.1,
		moisture: 0.6,
		crop: null,
		hasLumber: true,
		name: "snowscape",
		adj: ["snowy","arctic","polar"]
	},
	"desert": {
		color: [255,255,0],
		moisture: 0.3,
		elevation: 0.4,
		temp: 0.8,
		name: "desert",
		adj: ["desert","warm"]
	},
	"badlands": {
		color: [191, 159, 61],
		moisture: 0.5,
		elevation: 0.5,
		temp: 0.8,
		crop: null,
		infertile: true,
		name: "badlands",
		adj: ["yellow","brown"]
	},
	"tundra": {
		color: [0, 209, 98],
		elevation: 0.5,
		temp: 0.3,
		moisture: 0.3,
		hasLumber: true,
		name: "tundra",
		adj: ["tundra"]
	},
	"wetland": {
		color: [145, 255, 0],
		moisture: 0.9,
		temp: 0.8,
		elevation: 0.5,
		hasLumber: true,
		name: "wetland",
		adj: ["common"]
	},
	"water": {
		noAuto: true,
		color: [178,202,252], //#b2cafc
		elevation: waterLevel,
		moisture: 1,
		temp: 0.5,
		crop: null,
		infertile: true,
		name: "waters",
		water: true
	},
}

planet = null;
reg = null;
usedNames = {};

function updateBiomes() {
	for (let chunkKey in planet.chunks) {
		let chunk = planet.chunks[chunkKey];
		let closestBiome = null;
		let closestDiff = Infinity;

		for (let biomeKey in biomes) {
			let biome = biomes[biomeKey];
			if (biome.noAuto) continue;
			if (chunk.b !== undefined && biomes[chunk.b].noAuto) continue;

			// Calculate the squared differences for each property
			let diff = 0;
			if (biome.elevation !== undefined && chunk.e !== undefined) {
				diff += Math.pow(biome.elevation - chunk.e, 2);  // Squared difference for elevation
			}
			if (biome.temp !== undefined && chunk.t !== undefined) {
				diff += Math.pow(biome.temp - chunk.t, 2);  // Squared difference for temperature
			}
			if (biome.moisture !== undefined && chunk.m !== undefined) {
				diff += Math.pow(biome.moisture - chunk.m, 2);  // Squared difference for moisture
			}

			// Use Euclidean distance (square root of sum of squares)
			let distance = Math.sqrt(diff);

			if (distance < closestDiff) {
				closestBiome = biomeKey;
				closestDiff = distance;
			}
		}

		if (chunk.e === 1) {
			closestBiome = "mountain";
			if (chunk.v.s) delete chunk.v.s;
		}

		if (closestBiome) {
			chunk.b = closestBiome;
		}
	}
}

function statsAdd(key, number) {
	const split = key.split(".");
	key = split[0];
	const subkey = split[1];
	let sub;
	if (subkey) {
		if (!planet.stats[key]) planet.stats[key] = {};
		sub = planet.stats[key];
		key = subkey;
	}
	else sub = planet.stats;

	if (sub[key] === undefined) sub[key] = number;
	else sub[key] += number;
}

canvasLayers = {};
canvasLayersCtx = {};
canvasLayersOrder = [];
function addCanvasLayer(name) {
	let canvas = document.createElement("canvas");
	let ctx = canvas.getContext("2d");
	canvasLayers[name] = canvas;
	canvasLayersCtx[name] = ctx;
	canvasLayersOrder.push(name);
}
function clearCanvasLayers() {
	resizeCanvases();
}
function resizeCanvases() {
	mapCanvas.width = planetWidth*pixelSize;
	mapCanvas.height = planetHeight*pixelSize;
	ctx.webkitImageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;
	ctx.textRendering = "geometricPrecision";
	for (let key in canvasLayers) {
		let ctx = canvasLayersCtx[key];
		canvasLayers[key].width = planetWidth * (key === "markers" ? pixelSize*$c.markerResolution : 1);
		canvasLayers[key].height = planetHeight * (key === "markers" ? pixelSize*$c.markerResolution : 1);
		ctx.webkitImageSmoothingEnabled = false;
		ctx.mozImageSmoothingEnabled = false;
		ctx.imageSmoothingEnabled = false;
		ctx.textRendering = "geometricPrecision";
	}
}
addCanvasLayer("terrain");
addCanvasLayer("highlight");
addCanvasLayer("markers");
addCanvasLayer("cursor");
resizeCanvases();

function fitToScreen() {
	let width = Math.min(700,window.innerWidth-pixelSize);
	width -= width % pixelSize;
	mapCanvas.style.maxWidth = width+"px";
	document.getElementById("mapPanel").style.height = "";
	if (window.innerWidth >= 860) {
		if (document.getElementById("gameHalf1-1").clientHeight < document.getElementById("mapPanel").clientHeight) {
			document.getElementById("mapPanel").style.height = document.getElementById("gameHalf1-1").clientHeight + "px";
		}
		document.getElementById("statsPanel").style.height = (Math.min(document.getElementById("gameHalf1-1").clientHeight+0.5, document.getElementById("mapPanel").clientHeight + 4.45)) + "px";
	}
}
window.addEventListener("resize", () => {
	fitToScreen();
});
window.addEventListener("load", () => {
	fitToScreen();
});
fitToScreen();

function choose(array) {
	return array[Math.floor(Math.random() * array.length)];
}
function randRange(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
function blendRGB(array) {
	let r = 0; let g = 0; let b = 0;
	for (let i = 0; i < array.length; i++) {
		const rgb = array[i];
		r += rgb[0];
		g += rgb[1];
		b += rgb[2];
	}
	r = Math.round(r / array.length);
	g = Math.round(g / array.length);
	b = Math.round(b / array.length);
	return [r,g,b];
}
adjacentCoords = [
	[0,-1],
	[1,0],
	[0,1],
	[-1,0]
]
squareCoords = [
	[-1,-1],
	[0,-1],
	[1,-1],
	[-1,0],
	[0,0],
	[1,0],
	[-1,1],
	[0,1],
	[1,1]
]

waterColors = [
	[25, 73, 170],
	[25, 73, 170],
	[69, 115, 208],
	[122, 155, 222],
	[178, 202, 252]
];
// v = 0.34;
// c = l[Math.min(l.length-1,Math.floor(v*(l.length)))];

function setView(view) {
	if (!view) view = reg.town._id === 1 ? "terrain" : "territory";
	currentView = view;
	document.getElementById("viewName").innerText = titleCase(view);
	clearCanvasLayers();
	renderMap();
	renderHighlight();
	updateCanvas();

	userSettings.view = currentView;
	saveSettings();
}

function renderMap() {
	let ctx = canvasLayersCtx.terrain;
	for (let chunkKey in planet.chunks) {
		let chunk = planet.chunks[chunkKey];
		let biome = biomes[chunk.b];
		// let biomeElevation = biome.elevation || 0.5;

		let biomeColor = biome.color;

		// console.log(chunk.p)
		// render chunk pixels
		for (let x0 = 0; x0 < chunkSize; x0++) {
			for (let y0 = 0; y0 < chunkSize; y0++) {

				let coords = chunkCoordsToCoords(chunk.x, chunk.y, x0, y0);
				let x = coords[0];
				let y = coords[1];
				let value = chunk.p[x0][y0];

				if (viewData[currentView].showTerrain === true) {
					// let pixelBiome = chunk.b;
					let pixelColor = biomeColor;

					// pixel biome blending
					if (y0 === chunkSize-1 && Math.sin((chunk.x+x0)*167) < 0.5) {
						let adjacentChunk = planet.chunks[(chunk.x)+","+(chunk.y+1)];
						if (adjacentChunk) {
							pixelColor = biomes[adjacentChunk.b].color;
						}
					}
					else if (x0 === chunkSize-1 && Math.sin((chunk.y+y0)*167) < 0.5) {
						let adjacentChunk = planet.chunks[(chunk.x+1)+","+(chunk.y)];
						if (adjacentChunk) {
							pixelColor = biomes[adjacentChunk.b].color;
						}
					}

					let color;
					if (value <= waterLevel) { // water colors
						value += 1-waterLevel-0.1;
						color = waterColors[Math.min(waterColors.length-1,Math.floor(value*(waterColors.length)))];
					}
					else { // land colors

						color = [pixelColor[0] * value + 50, pixelColor[1] * value + 50, pixelColor[2] * value + 50];

					}
					if (userSettings.desaturate) {
						let hsl = RGBtoHSL(color);
						// hsl[1] = Math.min(hsl[1], 0.5);
						hsl[1] *= 0.7;
						color = HSLtoRGB(hsl);
					}
					color = "rgb("+color.join(",")+")";
					ctx.fillStyle = color;
					ctx.fillRect(x, y, 1, 1);
				}

				if (viewData[currentView].pixelColor !== undefined) {
					let color = viewData[currentView].pixelColor(value);
					if (color) {
						ctx.fillStyle = viewData[currentView].colorFunction + color.join(",") + ")";
						ctx.fillRect(x, y, 1, 1);
					}
				}

			}
		}

		if (viewData[currentView].chunkColor !== undefined) {
			let color = viewData[currentView].chunkColor(chunk);
			if (color) {
				ctx.fillStyle = viewData[currentView].colorFunction + color.join(",") + ")";
				ctx.fillRect(chunk.x*chunkSize, chunk.y*chunkSize, chunkSize, chunkSize);
			}
		}

	}
}

mousePos = null;
currentZoom = 1;
controlState = {};
selectedChunk = null;
currentPlayer = null;
currentEvents = {};
recentEvents = [];
currentPopup = null;
promptState = null;
currentView = "terrain";
currentHighlight = null;
currentExecutive = null;
currentExecutiveButton = null;
currentExecutiveSorter = null;
debugTemp = null;
debugMode = null;

function handleEntityClick(e) {
	let reg = e.getAttribute("data-reg");
	let id = parseInt(e.getAttribute("data-id"));
	if (controlState.meta) {
		// navigator.clipboard.writeText(id.toString());
		navigator.clipboard.writeText(`regGet("${reg}", ${id})`);
		debugTemp = regGet(reg, id);
		console.log(debugTemp);
		logMessage(`Copied ${reg} ID: ${id}`);
	}
	else if (reg && id) {
		regBrowse(reg,id)
	}
}
function handleEntityHover(e) {
	currentHighlight = [e.getAttribute("data-reg"),parseInt(e.getAttribute("data-id"))];
	renderHighlight()
	updateCanvas();
}
function handleEntityHoverOut(e) {
	currentHighlight = null;
	renderHighlight()
	updateCanvas();
}
function handleMessageClick(e) {
	if (controlState.meta) {
		e.parentNode.remove();
		return;
	}

	let elem = e.parentNode;
	let logText = elem.querySelector(".logText");
	logText.querySelectorAll(".font2").forEach(el => el.style.visibility = "hidden");

	let text = logText.innerText;
	text = text.replace(/  +/, " ");

	logText.querySelectorAll(".font2").forEach(el => el.style.visibility = "");

	text = "**[" + e.innerText + "]** " + text;

	if (elem.querySelector('.logAct span[type="no"][selected="true"]')) text += " [NO]";
	if (elem.querySelector('.logAct span[type="yes"][selected="true"]')) text += " [YES]";

	sharePrompt(text);
}

function renderCursor() {
	let ctx = canvasLayersCtx.cursor;
	ctx.clearRect(0, 0, canvasLayers.cursor.width, canvasLayers.cursor.height);
	if (mousePos) {
		ctx.fillStyle = "rgba(240,240,240,0.5)";
		//ctx.fillRect(mousePos.x, mousePos.y, 1, 1);
		ctx.fillRect(mousePos.chunkX*chunkSize, mousePos.chunkY*chunkSize, chunkSize, chunkSize);
	}
	if (selectedChunk) {
		ctx.fillStyle = "rgba(240,240,240,0.8)";
		ctx.fillRect(selectedChunk.x*chunkSize, selectedChunk.y*chunkSize, chunkSize, chunkSize);
	}
}

function updateCanvas() {
	ctx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
	for (let i = 0; i < canvasLayersOrder.length; i++) {
		const canvas = canvasLayers[canvasLayersOrder[i]];
		ctx.drawImage(canvas, 0, 0, mapCanvas.width, mapCanvas.height); 
	}
}

function floodFill(chunkX,chunkY,check,limit,stopAt) {
	let checked = {};
	let toCheck = [chunkX+","+chunkY];
	let results = [];
	while (toCheck.length) {
		let c = planet.chunks[toCheck[0]];
		checked[toCheck[0]] = true;
		if (c !== undefined && check(c)) {
			results.push(c);
			if (limit !== undefined && results.length >= limit) break;
			// if (stopAt !== undefined && stopAt(c)) {
			//   toCheck.shift();
			//   continue;
			// }
			for (let i = 0; i < adjacentCoords.length; i++) {
				const coords = adjacentCoords[i];
				const chunkKey = (c.x+coords[0]) + "," + (c.y+coords[1]);
				if (checked[chunkKey] !== undefined || planet.chunks[chunkKey] === undefined) continue;
				if (toCheck.indexOf(chunkKey) !== -1) continue;
				if (stopAt !== undefined && stopAt(planet.chunks[chunkKey])) {
					if (check(planet.chunks[chunkKey])) results.push(planet.chunks[chunkKey]);
					continue;
				}
				toCheck.push(chunkKey);
			}
		}
		toCheck.shift();
	}
	return results;
}
function nearestChunk(chunkX,chunkY,check,stop) {
	let checked = {};
	let toCheck = [chunkX+","+chunkY];
	while (toCheck.length) {
		let c = planet.chunks[toCheck[0]];
		checked[toCheck[0]] = true;
		if (check(c) && (stop === undefined || !stop(c))) return c;
		if (c !== undefined) {
			for (let i = 0; i < adjacentCoords.length; i++) {
				const coords = adjacentCoords[i];
				const chunkKey = (c.x+coords[0]) + "," + (c.y+coords[1]);
				if (checked[chunkKey] !== undefined || planet.chunks[chunkKey] === undefined) continue;
				if (toCheck.indexOf(chunkKey) !== -1) continue;
				if (stop === undefined || (stop === undefined || !stop(c))) {
					toCheck.push(chunkKey);
				}
			}
		}
		toCheck.shift();
	}
	return null;
}
function randomChunk(check) {
	return choose(filterChunks(check));
}
// function randomChunk(check) {
// 	let checked = {};
// 	let tries = 0;
// 	let chunksX = Math.floor(planetWidth/chunkSize);
// 	let chunksY = Math.floor(planetHeight/chunkSize);
// 	let maxTries = chunksX*chunksY;
// 	while (tries < maxTries) {
// 		tries++;
// 		let chunkKey = randRange(0,chunksX) + "," + randRange(0,chunksY);
// 		if (checked[chunkKey] || !planet.chunks[chunkKey]) continue;
// 		if (check(planet.chunks[chunkKey])) return planet.chunks[chunkKey];
// 	}
// 	return null;
// }
function filterChunks(check) {
	let results = [];
	for (let chunkKey in planet.chunks) {
		let c = planet.chunks[chunkKey];
		if (check(c)) results.push(c);
	}
	return results;
}
function chunkIsNearby(chunkX, chunkY, check, radius=5) {
	const coords = circleCoords(chunkX, chunkY, radius);
	for (let i = 0; i < coords.length; i++) {
		const coord = coords[i];
		const chunk = chunkAt(coord.x, coord.y);
		if (chunk && check(chunk)) return true;
	}
	return false;
}

function nearbyTown(chunkX,chunkY,check,optionCount) {
	let checked = {};
	let options = [];
	let chunk = nearestChunk(chunkX, chunkY, (c) => {
		if (!c.v.s) return false;

		if (checked[c.v.s]) return false;
		checked[c.v.s] = true;
		let town = regGet("town", c.v.s);
		if (!town) return false;

		if (!check || check(town)) {
			if (optionCount) {
				options.push(town);
				if (options.length < optionCount) return false
			}
			return true;
		}
	})
	if (optionCount && options.length) {
		let weights = [];
		for (let i = 0; i < options.length; i++) {
			weights.push(options.length - i);
		}
		return chooseWeighted(options, weights);
	}
	if (!chunk) return null;
	return regGet("town", chunk.v.s);
}

function distanceCoords(x1, y1, x2, y2) {
	const a = x1 - x2;
	const b = y1 - y2;

	return Math.sqrt( a*a + b*b );
}

function circleCoords(chunkX,chunkY,radius) {
	let coords = [];
	for (let i = Math.max(0, chunkX - radius); i <= Math.min(planetWidth, chunkX + radius); i++) {
		for (let j = Math.max(0, chunkY - radius); j <= Math.min(planetHeight, chunkY + radius); j++) {
			if (Math.pow(i - chunkX, 2) + Math.pow(j - chunkY, 2) <= Math.pow(radius, 2)) {
				coords.push({x: i,y: j});
			}
		}
	}
	return coords;
}
function circleChunks(chunkX,chunkY,radius,taper=false) {
	const coords = circleCoords(chunkX,chunkY,radius);
	let chunks = [];
	coords.forEach((coord) => {
		const chunk = chunkAt(coord.x, coord.y);
		if (!chunk) return;
		if (taper === true) {
			const distance = distanceCoords(chunkX, chunkY, coord.x, coord.y);
			if (distance/radius > 0.5 && Math.random() < distance/radius) return;
		}
		chunks.push(chunk);
	})
	return chunks;
}




wordComponents = {};
wordComponents.C  = "B,C,D,F,G,H,J,K,L,M,N,P,QU,R,S,T,V,W,Y,Z";
wordComponents.C2 = wordComponents.C + ",X,CK,NG,SS,'";
wordComponents.V  = "A,A,A,E,E,É,I,I,I,O,O,O,U,U";
wordComponents.V2 = wordComponents.V + "," + wordComponents.V + ",OU,AE,EE,IE,EA,EU,UI,OI,AI,OO,OW,OE,IA";

wordComponents.C = wordComponents.C.toLowerCase().split(",");
wordComponents.C2 = wordComponents.C2.toLowerCase().split(",");
wordComponents.V = wordComponents.V.toLowerCase().split(",");
wordComponents.V2 = wordComponents.V2.toLowerCase().split(",");

wordComponents.C0 = {
	b: "lr",
	c: "hlr",
	d: "rw",
	f: "lr",
	g: "hlnr",
	k: "lr",
	p: "hlr",
	s: "hklmnptw",
	t: "hrw",
	v: "lr",
	w: "hr",
	z: "hl"
}

wordComponents.prefixes = {};

wordComponents.prefixes.TOWN = [
	["los ",1],
	["las ",1],
	["la ",1],
]

wordComponents.prefixes.NEW = [
	["new ",1],
	["nova ",2],
]
wordComponents.prefixes.MOUNTAINOUS = [
	["monte",2],
]
wordComponents.prefixes.WATERFRONT = [
	["cape ",2],
]

wordComponents.prefixes.NORTH = [
	["north ",1],
]
wordComponents.prefixes.EAST = [
	["east ",1],
]
wordComponents.prefixes.WEST = [
	["west ",1],
]
wordComponents.prefixes.SOUTH = [
	["south ",1],
]

wordComponents.flags = {};
wordComponents.flags.TEMPLATE = [
	" $ ","($)","/$\\","\\$/","/$/",")$(","[$]","]$[","»$«","«$»","−$−","‖$‖","→$←","←$→","░$░","▒$▒","⏴$⏵","⏵$⏴","▌$▐","▛$▟","▙$▜","≣$≣","⏵$―","+$―","$==","◣$◥","◤$◢","» $","$≣≣","⏸$⏸","█$█"
];
wordComponents.flags.EMBLEM = "A,A,A,@,¢,X,₸,₪,≈,―,§,†,‡,∑,®,¤,↕,☼,☻,☺,◦,●,Ξ,Ψ,Ω,ǃ,☮,Ϫ,Ͳ,⏶,⏻,🖤,👽,🥥,🌴,🏆,◆,𝕏,☗,☖,🏠,Ӂ,⏼,⏷".split(",");

wordComponents.CURRENCY = {
	a: "Δ,₳,Ѧ",
	b: "&,ẞ,ß,Б,Ҕ,Ƀ,ƀ,฿,Ȣ",
	c: "©,¢,₵,₠,Ͼ",
	d: "δ,ԁ",
	e: "£,€,≡,Ξ,ξ,₤,Ʃ",
	f: "₣,ƒ,Ϝ,៛",
	g: "Ǥ",
	h: "Ҥ",
	i: "I,Í",
	j: "₺",
	k: "Ҡ,₭",
	l: "₺",
	m: "М",
	n: "₪,Й,П,א,Ͷ,ỻ",
	o: "@,Ø,Ф,Ω,Ө",
	p: "₽,₱,⁋",
	q: "Q",
	r: "®,Я,₹,֏",
	s: "$,☼",
	t: "₸,Ͳ,✛",
	u: "μ,Ů,Ʉ,Ʋ",
	v: "V,Ỵ",
	w: "Щ,Ψ,ʬ,Ѡ,₩",
	x: "Ж,※,𝕏",
	y: "Ψ,Ұ,Ҹ",
	z: "Z",
	_: "¤"
}

badWords = window.atob('ZnVjLGZ1ayxzaGl0LG5pZ2csbmlnZSxmYWcsY29jLGNvayxib29iLGN1bSxreWtlLGtpa2Usc2V4').split(",");

function generateWord(syllableCount, titled=false, prefixes=null) {
	let word = "";
	let syllableCount0 = syllableCount;

	syllableCount = syllableCount || randRange(2,3);

	if (prefixes && Math.random() < Math.min(12,prefixes.length)/13) {
		const prefix = choose(prefixes);
		word += prefix[0];
		syllableCount -= prefix[1];
	}

	let type = Math.random() < 0.5;
	if (type === false && syllableCount === 1) syllableCount++;

	let lastLetter = "";
	for (let i = 0; i < syllableCount; i++) {
		let letter;
		// console.log(lastLetter.length);
		if (type === true) {
			letter = choose(i === 0 ? wordComponents.C : wordComponents.C2);
			syllableCount++;
		}
		else letter = choose(lastLetter.length > 1 ? wordComponents.V : wordComponents.V2);
		if (wordComponents.C0[letter] !== undefined && Math.random() < 1/26) {
			letter += choose(wordComponents.C0[letter]);
		}
		word += letter;
		type = !type;
		lastLetter = letter;
	}

	for (let i = 0; i < badWords.length; i++) {
		const badWord = badWords[i];
		if (word.indexOf(badWord) !== -1) {
			word = generateWord(syllableCount0, false, prefixes);
			break;
		}
	}
	if (usedNames[word]) word = generateWord(syllableCount0, false, prefixes);

	if (titled) {
		if (prefixes) word = titleCase(word);
		else word = word[0].toUpperCase() + word.substring(1);
	}

	return word;
}

function wordPlural(word) {
	let suffix = "s";
	
	if (word.endsWith("ese")) suffix = "";
	else if (word.endsWith("ai")) suffix = "";

	else if (word.match(/[^aeiou]y$/)) {
		word = word.substring(0, word.length-1);
		suffix = "ies";
	}
	else if (word.endsWith("man") && word.length > 5) {
		word = word.substring(0, word.length-3);
		suffix = "men";
	}
	else if (word.endsWith("person")) {
		word = word.substring(0, word.length-6);
		suffix = "people";
	}

	else if (word.match(/(s|h)$/g)) suffix = "es";
	
	if (suffix) word += suffix;
	return word;
}
function wordAdjective(word) {
	let suffix = "";
	if (word.endsWith("er")) {
		word = word.substring(0, word.length-2);
		suffix = "ic";
	}
	else if (word.endsWith("man") && word.length > 5) {
		word = word.substring(0, word.length-3);
		suffix = "";
	}
	else if (word.endsWith("ling")) {
		word = word.substring(0, word.length-4);
		suffix = "";
	}
	else if (word.endsWith("ing")) {
		word = word.substring(0, word.length-3);
		suffix = "";
	}
	else if (word.endsWith("ism")) {
		word = word.substring(0, word.length-1);
		suffix = "t";
	}
	else if (word.endsWith("chy")) {
		word = word.substring(0, word.length-1);
		suffix = "ic";
	}
	else if (word.endsWith("acy")) {
		word = word.substring(0, word.length-2);
		suffix = "tic";
	}
	else if (word.endsWith("ship")) {
		word = word.substring(0, word.length-4);
		suffix = "ial";
	}
	else if (word.endsWith("ublic")) {
		suffix = "al";
	}

	if (suffix) word += suffix;
	return word;
}

function commaList(array) {
	if (!array.length) return "";
	if (array.length === 1) return array[0]+"";
	if (array.length === 2) return array[0] + " and " + array[1];
	return array.slice(0,-1).join(", ") + ", and " + array.slice(-1);
}




function splitChunks(array, center, groupCount=2) {
	let chunks = {};
	let done = {};
	array.forEach((c) => {
		chunks[c.x + "," + c.y] = c;
	})

	let cursors = {};
	for (let n = 1; n < groupCount+1; n++) {
		cursors[n] = [...center]
	}
	
	for (let n = 0; n < 100; n++) {

		for (let cursor in cursors) {
			const pos = cursors[cursor];

			let diff = choose(squareCoords);
			let newX = pos[0] + diff[0];
			let newY = pos[1] + diff[1];

			let chunkKey = newX + "," + newY;
			if (!chunks[chunkKey] || done[chunkKey] !== undefined) continue;

			pos[0] = newX;
			pos[1] = newY;
			cursor = parseInt(cursor);
			done[chunkKey] = cursor;
			chunks[chunkKey].v.tempsplit = cursor;
		}
		
	}

	let groups = {};
	for (let cursor in cursors) {
		groups[cursor] = [];
	}

	array.forEach((c) => {
		let cursor = nearestChunk(c.x, c.y, (c2) => c2.v.tempsplit);
		if (cursor) cursor = cursor.v.tempsplit;
		if (!groups[cursor]) return;
		groups[cursor].push(c);
	})

	array.forEach((c) => {
		delete c.v.tempsplit;
	})

	return groups;
}
// let chunks = splitChunks(filterChunks((c) => c.v.s === 1), regGet("town", 1).center);




tempHover = {};

function renderHighlight() {
	if (!viewData[currentView].showHighlight) return;
	tempHover = {};

	let ctx = canvasLayersCtx.highlight;
	ctx.clearRect(0, 0, canvasLayers.highlight.width, canvasLayers.highlight.height);

	let chunks = filterChunks((c) => c.v.s !== undefined);
	for (let i = 0; i < chunks.length; i++) {
		const chunk = chunks[i];
		const town = regGet("town",chunk.v.s);
		let color = town.color;
		let opacity = 0.33;
		if (currentHighlight && currentHighlight[1] === chunk.v.s && currentHighlight[0] === "town") {
			// color = color.map((x) => Math.floor(Math.min(255, x+30)))
			color = colorBrightness(color, 1.15);
			opacity = 0.5;
		}
		if (town.usurp) {
			color = [...color];
			let i = (color[0] + color[1] + color[2]) / 3;
			let dr = i - color[0];
			let dg = i - color[1];
			let db = i - color[2];
			color[0] = color[0] + dr * 0.75;
			color[1] = color[1] + dg * 0.75;
			color[2] = color[2] + db * 0.75;
		}
		color = color.join(",");
		ctx.fillStyle = "rgba("+color+"," + opacity + ")";
		
		ctx.fillRect(chunk.x*chunkSize, chunk.y*chunkSize, chunkSize, chunkSize);

		ctx.fillStyle = "rgb("+color+")";
		for (let i = 0; i < adjacentCoords.length; i++) {
			const coords = adjacentCoords[i];
			const adjacentChunk = planet.chunks[(chunk.x+coords[0]) + "," + (chunk.y+coords[1])];
			if (adjacentChunk !== undefined && adjacentChunk.v.s !== chunk.v.s) {
				if (coords[0] === -1) {
					ctx.fillRect(chunk.x*chunkSize, chunk.y*chunkSize, 1, chunkSize);
				}
				else if (coords[0] === 1) {
					ctx.fillRect(chunk.x*chunkSize+chunkSize-1, chunk.y*chunkSize, 1, chunkSize);
				}
				else if (coords[1] === -1) {
					ctx.fillRect(chunk.x*chunkSize, chunk.y*chunkSize, chunkSize, 1);
				}
				else if (coords[1] === 1) {
					ctx.fillRect(chunk.x*chunkSize, chunk.y*chunkSize+chunkSize-1, chunkSize, 1);
				}
			}
		}

		if (userSettings.carve) {
			for (let x = 0; x < chunk.p.length; x++) {
				for (let y = 0; y < chunk.p[x].length; y++) {
					let adjacent = false;
	
					let absX = chunkSize * chunk.x + x;
					let absY = chunkSize * chunk.y + y;
	
					for (let i = 0; i < adjacentCoords.length; i++) {
						const coords = adjacentCoords[i];
						let adjacentPixel = pixelAt(absX + coords[0], absY + coords[1]);
						// console.log(adjacentPixel)
						if (adjacentPixel <= waterLevel) {
							adjacent = true;
							break;
						}
					}
	
					if (chunk.p[x][y] <= waterLevel) {
						ctx.clearRect(chunk.x*chunkSize + x, chunk.y*chunkSize + y, 1, 1);
					}
					else if (adjacent === true) {
						ctx.fillRect(absX, absY, 1, 1);
					}
				}
			}
		}
		// ctx.fillStyle = ((chunk.x * chunk.y) % 2) ? "rgb(255, 55, 55)" : "rgb(255, 255, 55)";
	}

	const disasters = regFilter("process", (p) => p.done === undefined && p.type === "disaster");
	for (let i = 0; i < disasters.length; i++) {
		const disaster = disasters[i];
		let color = disaster.color || [255,0,0];
		if (currentHighlight && currentHighlight[1] === disaster.id && currentHighlight[0] === "process") {
			color = colorBrightness(color, 1.15);
		}
		if (Array.isArray(disaster.chunks)) {
			let chunks = {};
			disaster.chunks.forEach((coords) => {
				chunks[coords[0] + "," + coords[1]] = true;
				tempHover[coords[0] + "," + coords[1]] = disaster;
			})
			disaster.chunks.forEach((chunkCoords) => {
				const x = chunkCoords[0];
				const y = chunkCoords[1];
				ctx.fillStyle = "rgba("+color.join(",")+", 0.66)";
				ctx.fillRect(x*chunkSize, y*chunkSize, chunkSize, chunkSize);

				ctx.fillStyle = "rgba(0, 0, 0, 0.66)";
				for (let i = 0; i < adjacentCoords.length; i++) {
					const coords = adjacentCoords[i];
					const hasAdjacent = chunks[(x+coords[0]) + "," + (y+coords[1])];
					if (hasAdjacent === undefined) {
						if (coords[0] === -1) {
							ctx.fillRect(x*chunkSize, y*chunkSize, 1, chunkSize);
						}
						else if (coords[0] === 1) {
							ctx.fillRect(x*chunkSize+chunkSize-1, y*chunkSize, 1, chunkSize);
						}
						else if (coords[1] === -1) {
							ctx.fillRect(x*chunkSize, y*chunkSize, chunkSize, 1);
						}
						else if (coords[1] === 1) {
							ctx.fillRect(x*chunkSize, y*chunkSize+chunkSize-1, chunkSize, 1);
						}
					}
				}
			})

		}
	}

	// const groups = splitChunks(filterChunks((c) => c.v.s === 3), regGet("town", 3).center, 3);
	// for (let group in groups) {
	// 	let chunks = groups[group];
	// 	group = parseInt(group);
	// 	chunks.forEach((c) => {
	// 		ctx.fillStyle = group === 1 ? "#ff0000" : group === 2 ? "#00ff00" : "#0000ff";
	// 		ctx.fillRect(c.x*chunkSize, c.y*chunkSize, chunkSize, chunkSize);
	// 	})
	// }

	renderMarkers();
}

function renderMarkers() {
	if (!viewData[currentView].showMarkers) return;

	let ctx = canvasLayersCtx.markers;
	ctx.clearRect(0, 0, canvasLayers.markers.width, canvasLayers.markers.height);
	const _chunkSize = chunkSize * pixelSize * $c.markerResolution;

	if (ctx.textAlign !== "center") {
		ctx.textBaseline = "middle";
		ctx.textAlign = "center";
	}
	ctx.font = (_chunkSize)+"px PublicPixel";

	let markers = regToArray("marker");
	if (userSettings.markers === false) markers = [];
	for (let i = 0; i < markers.length; i++) {
		const marker = markers[i];
		const x = marker.x;
		const y = marker.y;
		const symbol = marker.symbol || "⏺";
		let color = marker.color || [176, 176, 153];
		if (x === undefined || y === undefined) continue;

		let highlight = currentHighlight && currentHighlight[1] === marker.id && currentHighlight[0] === "marker";
		if (highlight) {
			color = colorBrightness(color, 1.2);
			ctx.font = (_chunkSize*1.5)+"px PublicPixel";
		}

		ctx.strokeStyle = "rgb("+colorBrightness(color, 0.8)+")";
		ctx.lineWidth = pixelSize*2;
		ctx.strokeText(symbol, x*_chunkSize + _chunkSize/2 + pixelSize/1.5, y*_chunkSize + _chunkSize/2 - pixelSize/1.5);

		ctx.fillStyle = "rgb("+color.join(",")+")";
		ctx.fillText(symbol, x*_chunkSize + _chunkSize/2 + pixelSize/1.5, y*_chunkSize + _chunkSize/2 - pixelSize/1.5);

		if (highlight) ctx.font = (_chunkSize)+"px PublicPixel";
	}

	ctx.strokeStyle = "rgb(0,0,0)";
	regToArray("town").forEach((town) => {
		if (!town.center) happen("UpdateCenter", null, town);
		let hasIssue = Object.values(town.issues).length;

		let x = town.center[0];
		let y = town.center[1];

		if ((userSettings.townNames && !controlState.shift) || (controlState.shift && !userSettings.townNames)) {
			let name = town.name;

			if (hasIssue) {
				ctx.strokeStyle = "rgb(255, 0, 0)";
				ctx.fillStyle = "rgb(255, 255, 0)";
			}
			else {
				ctx.strokeStyle = "rgb(0,0,0)";
				ctx.fillStyle = "rgb("+town.color.join(",")+")";
			}
			
			ctx.font = (town.usurp ? "italic " : "") + Math.max(64, Math.round(Math.min(town.size,100)/100 * 96))+"px VT323";

			ctx.lineWidth = pixelSize*2.5;
			ctx.strokeText(name, x*_chunkSize + _chunkSize/2 + pixelSize/1.5, y*_chunkSize + _chunkSize/2 - pixelSize/1.5);
			ctx.fillText(name, x*_chunkSize + _chunkSize/2 + pixelSize/1.5, y*_chunkSize + _chunkSize/2 - pixelSize/1.5);
			
			
		}
		
		else if (hasIssue && userSettings.markers !== false) {
			ctx.lineWidth = pixelSize*3;
			
			ctx.strokeStyle = "rgb(255, 0, 0)";
			ctx.fillStyle = "rgb(255, 255, 0)";

			ctx.font = (town.usurp ? "italic " : "") + Math.max(112, Math.round(Math.min(town.size,128)/100 * 96))+"px VT323";
			ctx.strokeText("!".repeat(hasIssue), x*_chunkSize + _chunkSize/2 + pixelSize/1.5, y*_chunkSize + _chunkSize/2 - pixelSize/1.5);
			ctx.fillText("!".repeat(hasIssue), x*_chunkSize + _chunkSize/2 + pixelSize/1.5, y*_chunkSize + _chunkSize/2 - pixelSize/1.5);
		}
	})
}

onMapClick = null;
onMapClickMsg = null;
function handleCursor(e) {
	const rect = mapCanvas.getBoundingClientRect();
	let x = e.clientX - rect.left;
	let y = e.clientY - rect.top;
	
	let zoom = parseFloat(mapCanvas.style.scale) || 1;
	
	x = Math.floor((x / mapCanvas.clientWidth) * planetWidth / zoom);
	y = Math.floor((y / mapCanvas.clientHeight) * planetHeight / zoom);
	let chunkX = Math.floor(x / chunkSize);
	let chunkY = Math.floor(y / chunkSize);

	let oldChunkX;
	let oldChunkY;
	if (mousePos) {
		oldChunkX = mousePos.chunkX;
		oldChunkY = mousePos.chunkY;
	}

	mousePos = {
		x: x,
		y: y,
		chunkX: chunkX,
		chunkY: chunkY
	}

	let hovered = false;
	let highlight = null;
	if (mousePos && planet.chunks[mousePos.chunkX+","+mousePos.chunkY]) {
		let chunkKey = mousePos.chunkX+","+mousePos.chunkY;
		let chunk = planet.chunks[chunkKey];
		if (viewData[currentView].hover) {
			hovered = !!viewData[currentView].hover(chunk);
		}
		else if (tempHover[chunkKey]) {
			hovered = true;
			highlight = ["process",tempHover[chunkKey].id];
		}
		else if (chunk.v.s) {
			hovered = true;
			highlight = ["town",chunk.v.s];
		}

		if (chunk.v.m) {
			highlight = ["marker",chunk.v.m];
		}
	}
	
	if (hovered) {
		if (!mapCanvas.style.cursor) mapCanvas.style.cursor = "pointer";
	}
	else if (mapCanvas.style.cursor) {
		mapCanvas.style.cursor = "";
	}

	if (!currentHighlight || !highlight || (highlight[0] !== currentHighlight[0] || highlight[1] !== currentHighlight[1])) {
		currentHighlight = highlight;
		renderHighlight();
		updateCanvas();
	}

	if (oldChunkX !== chunkX || oldChunkY !==  chunkY) {
		updateStats();
		renderCursor();
		updateCanvas();
	}
}
mapCanvas.addEventListener("mousemove", (e) => {
	handleCursor(e);
})
// mapCanvas.addEventListener("wheel", (e) => {
// 	const rect = document.getElementById("mapDiv").getBoundingClientRect();
	
// 	if (e.deltaY < 0)
// 	{
// 		setZoom(0.1);
// 	}
// 	else if (e.deltaY > 0)
// 	{
// 		setZoom(-0.1);
// 	}
// 	e.preventDefault();
// });
lastDrag = null;
dragPosition = [0,0];
// mapCanvas.addEventListener("mousemove",(e) => {
// 	if (controlState.mouse && currentZoom > 1) {
// 		if (lastDrag) {
// 			let diffX = e.clientX - lastDrag[0];
// 			let diffY = e.clientY - lastDrag[1];
// 			console.log(diffX,diffY);
// 			dragPosition[0] += diffX;
// 			dragPosition[1] += diffY;
// 			mapCanvas.style.translate = `${dragPosition[0]}px ${dragPosition[1]}px`;
// 		}
// 		lastDrag = [e.clientX, e.clientY];
// 	}
// })
function setZoom(zoom, x, y) {
	// console.log(x, y)
	const mapDiv = document.getElementById("mapDiv");
	currentZoom += zoom;
	if (currentZoom > 2) currentZoom = 2;
	if (currentZoom < 1) currentZoom = 1;
	mapCanvas.style.scale = currentZoom.toString();
	if (currentZoom === 1) {
		mapCanvas.classList.remove("zoomed");
		mapCanvas.style.translate = "";
	}
	else mapCanvas.classList.add("zoomed");
}

function deselectChunk() {
	selectedChunk = null;
	document.querySelector("#statsPanel .panelX").style.display = "none";
}
function handleMouseUp(e) {
	handleCursor(e);

	if (lastDrag) {
		lastDrag = null;
		return;
	}
	
	let chunkKey = mousePos.chunkX+","+mousePos.chunkY;

	if (e.button == 0 || e.force !== undefined) { //left click
		if (onMapClick) {
			onMapClick(e);
		}
		else if (selectedChunk) {
			deselectChunk();
		}
		else if (tempHover[chunkKey]) {
			let entity = tempHover[chunkKey];
			regBrowse(entity._reg, entity.id);
		}
		else {
			let chunk = planet.chunks[chunkKey];
			if (chunk) {
				if (viewData[currentView].click) viewData[currentView].click(chunk);
				else if (chunk.v.m) regBrowse("marker",chunk.v.m);
				else if (chunk.v.s) regBrowse("town",chunk.v.s);
			}
		}
	}
	else if (e.button == 2) { //right click
		if (selectedChunk) {
			deselectChunk();
		}
		else if (mousePos) {
			selectedChunk = planet.chunks[mousePos.chunkX+","+mousePos.chunkY];
			document.querySelector("#statsPanel .panelX").style.display = "block";
		}
	}
	
	
	updateStats();
	renderCursor();
	updateCanvas();
	
	// console.log(mousePos.chunkX+","+mousePos.chunkY)
	// let chunk = planet.chunks[mousePos.chunkX+","+mousePos.chunkY];
	// if (chunk) {
	//   if (e.button == 0) {
	//     for (let i = 0; i < 5; i++) {
	//       let newChunk = nearestChunk(chunk.x, chunk.y, (c) => c.b !== "water" && !c.v.s);
	//       // if (newChunk) newChunk.b = "desert";
	//       if (newChunk) newChunk.v.s = 1;
	//     }
	//     renderHighlight();
	//   }
	//   else if (e.button == 2 && chunk.b !== "water") {
	//     let chunks = floodFill(chunk.x, chunk.y, (c) => c.b === chunk.b);
	//     chunks.forEach((c) => {
	//       c.b = "desert";
	//     })
	//   }
	//   renderMap();
	//   updateCanvas();
	//   // console.log(chunks);
	// }
}
mapCanvas.addEventListener("mouseup", handleMouseUp)
mapCanvas.addEventListener("mouseout", (e) => {
	mousePos = null;
	currentHighlight = null;
	updateStats();
	renderCursor();
	renderHighlight();
	updateCanvas();
})
mapCanvas.oncontextmenu = () => { return false; }

mapCanvas.addEventListener("touchstart", (e) => {
	selectedChunk = null;
	const touch = e.changedTouches[0];
	document.getElementById("statsPanel").classList.add("preview");
	handleCursor(touch);
	e.preventDefault();
},false)
mapCanvas.addEventListener("touchmove", (e) => {
	const touch = e.changedTouches[0];
	document.getElementById("statsPanel").classList.add("preview");
	handleCursor(touch);
	e.preventDefault();
},false)
mapCanvas.addEventListener("touchend", (e) => {
	const touch = e.changedTouches[0];
	document.getElementById("statsPanel").classList.remove("preview");
	handleMouseUp(touch);
	mousePos = null;
	updateStats();
	renderCursor();
	updateCanvas();
})

keybinds = {
	"shift": () => {
		logTip("shiftNames", "Hold shift to show town names, or enable them in Settings!")
		renderMarkers();
		updateCanvas();
	},
	"enter": (e) => {
		let btn = document.getElementById("nextDay");
		if (!btn.getAttribute("disabled")) {
			btn.click();
		}
		e.preventDefault();
		e.stopPropagation();
	},
	" ": (e) => keybinds["enter"](e),
	"backspace": () => {
		if (currentExecutive) closeExecutive();
	},
	"p": () => {
		if (mousePos) {
			selectedChunk = planet.chunks[mousePos.chunkX+","+mousePos.chunkY];
			document.querySelector("#statsPanel .panelX").style.display = "block";
			renderCursor();
			updateCanvas();
		}
	},
	"0": () => setView(),
	"`": () => keybinds["0"](),
	"v": () => {
		document.getElementById("viewButton").click();
	},
	"\\": () => {
		if (currentExecutive === "settings") closeExecutive();
		else document.getElementById("actionSettings").click();
	},
	"l": () => {
		if (currentExecutive === "saves") closeExecutive();
		else document.getElementById("actionSaves").click();
	},
	"i": () => {
		if (currentExecutive === "info") closeExecutive();
		else document.getElementById("actionInfo").click();
	},
	"?": () => {
		populateExecutive([
		{
			text: "Symbols",
			func: ()=>{
				doPrompt({ type: "text", message: "Loading..." })

				fetch("https://r74n.com/gentown/fonts/Glyphs.txt")
				.then((r) => r.text())
				.then((text) => {
				doPrompt({
					type: "text",
					message: "{{symbol:"+text+"}}",
					pre: true
				})})
			}
		},
		{
			text: "Share",
			func: ()=>{
				sharePrompt(`My GenTown planet, ${generateWord(randRange(2,3), true)}, lasted ${randRange(101,342)} days before societal collapse!`)
			}
		}
		], "Debug")
	},
	"y": (e) => {
		let button = document.querySelector('#logMessages .logMessage[new="true"] .logAct span[type="yes"]');
		if (button) {
			button.click();
			return;
		}
		button = document.querySelector('#logMessages .logMessage[new="true"] .logAct span[type="act"]');
		e.stopPropagation();
		if (button) button.click();
		setTimeout(() => {
			document.getElementById("popupText").value = "";
		}, 100)
	},
	"n": () => {
		let button = document.querySelector('#logMessages .logMessage[new="true"] .logAct span[type="no"]');
		if (button) button.click();
	},
	"c": () => {
		let link = document.getElementById("screenshotter");
		link.setAttribute("download",(planet.name||"GenTown")+"-"+planet.day+".png");
		var dt = mapCanvas.toDataURL('image/png');
		link.href = dt;
		link.click();
	}
}

window.addEventListener("keydown",(e) => {
	const key = e.key.toLowerCase();
	let meta = e.metaKey || e.ctrlKey;

	if (meta) {
		controlState.meta = true;
		if (key === "s") {
			saveFile();
			e.preventDefault();
		}
		else if (key === "o") {
			loadFile();
			e.preventDefault();
		}
		return;
	}
	else controlState.meta = false;

	if (key === "escape") {
		if (currentPopup) {
			closePopups();
			document.getElementById("gameDiv").focus();
		}
		else if (currentExecutive) {
			closeExecutive();
		}
		else if (selectedChunk) {
			deselectChunk();
			updateStats();
			renderCursor();
			updateCanvas();
		}
	}

	if (currentPopup) return;
	if (e.target.tagName === "INPUT" || e.target.tagName === "BUTTON") return;

	controlState[key] = true;

	const button = document.querySelector('#actionPanel span[data-keybind="'+key+'"]');
	if (button) {
		if (button.style.display === "none") return;
		if (button == currentExecutiveButton) closeExecutive();
		else button.click();
	}
	else if (keybinds[key]) {
		keybinds[key](e);
		e.stopPropagation();
	}
	else if (parseInt(key)) {
		let newView = Object.keys(viewData)[key - 1];
		if (newView) {
			setView(newView);
		}
	}
})
window.addEventListener("keyup",(e) => {
	const key = e.key.toLowerCase();

	controlState.meta = false;
	controlState[key] = false;
	
	if (key === "shift") {
		renderMarkers();
		updateCanvas();
	}
})
window.addEventListener("blur",(e) => {
	controlState = {};
})
window.addEventListener("focus",(e) => {
	renderMarkers();
	updateCanvas();
})
window.addEventListener("mousedown",(e) => {
	controlState.mouse = {
		0: "left",
		1: "middle",
		2: "right"
	}[e.button] || "other";
})
window.addEventListener("mouseup",(e) => {
	controlState.mouse = false;
	lastDrag = null;
})




function updateStats() {
	let date = parseText("{{date:"+planet.day+"|l}}");
	document.getElementById("dayNumber").innerText = date;
	document.getElementById("dayNumberMobile").innerText = date;
	let statsDiv = document.getElementById("statsDiv");
	let html = "";
	
	if (!mousePos && !selectedChunk) {
		html += `<span class="panelSubtitle">Towns of ${ parseText("{{planet}}") }</span>`;
		// html += `<span>Towns: <br>&nbsp;${
		//   parseText(regToArray("town").reduce((l, {id}) => {l.push("{{regname|town|"+id+"}}"); return l}, []).join("<br>&nbsp;")
		//   || "{{none}}")}</span>`;
		html += `<span><table>`;
		regSorted("town","pop").forEach((town) => {
			html += `<tr>`;
			html += `<td>` + parseText("{{regname:town|"+town.id+"}}") + `</td>`;
			html += `<td>` + parseText(`{{face:${town.id}}}{{num:${town.pop}|K}}`) + `</td>`;
			html += `<td>` + parseText(`{{icon:land}}{{num:${town.size}|K}}`) + `</td>`;
			html += `<td>` + "" + `</td>`;
			html += `</tr>`;
			// html += `<br>`;
		});
		html += `<tr class="total">`;
		html += `<td>Total</td>`;
		html += `<td>` + parseText("{{face}}{{num:" + regToArray("town").reduce((n, {pop}) => n + pop, 0)+"|K}}") + `</td>`;
		html += `<td>` + "" + `</td>`;
		html += `</tr>`;
		html += `</table></span>`;
	}
	else {
		let chunkKey;
		if (mousePos) chunkKey = mousePos.chunkX+","+mousePos.chunkY;
		else if (selectedChunk) chunkKey = selectedChunk.x+","+selectedChunk.y;
		let chunk = selectedChunk || planet.chunks[chunkKey];
		if (chunk) {
			if (tempHover[chunkKey]) {
				let entity = tempHover[chunkKey];
				html += `<span class="panelSubtitle">${parseText("{{regname:"+entity._reg+"|"+entity.id+"}}")}</span><br>`;
			}
			if (chunk.v.m) {
				let marker = regGet("marker",chunk.v.m);
				html += `<span class="panelSubtitle">${parseText("{{regname:marker|"+marker.id+"}}")}</span><br>`;
			}
			if (chunk.v.s) {
				let town = regGet("town",chunk.v.s);
				if (town) {
					html += `<span class="panelSubtitle">${parseText("{{regname:town|"+town.id+"}}")}</span>`;
					html += `<span style="text-align:center">${
						parseText(` {{num:${town.pop}|K|${$c.maxPopulation(town)}}}{{face:${town.id}|Population}}`) +
						parseText(` {{resourcetotal:${town.id}|crop}}{{icon:crop|Crops}}`) +
						parseText(` {{resourcetotal:${town.id}|lumber}}{{icon:lumber|Lumber}}`) +
						parseText(` {{resourcetotal:${town.id}|rock}}{{icon:rock|Rock}}`) +
						parseText(` {{resourcetotal:${town.id}|livestock}}{{icon:livestock|Livestock}}`)
					}</span>`;
					// html += `<span>Population: ${town.pop}</span>`;

					if (Object.values(town.issues).length) {
						html += `<span style="text-align:center">${
							Object.values(town.issues).map(id => 
								"<span class='warningSign'>{!}</span> " + parseText("{{regname:process|"+id+"}}")
							).join("<br>")
						}</span><br>`;
					}
					else html += "<br>";
				}
			}
			let localName = "Local";
			if (chunk.b === "water") {
				let waters = floodFill(chunk.x, chunk.y, (c) => c.b === "water", 60);
				let land = nearestChunk(chunk.x, chunk.y, (c) => c.v.g !== undefined)
				if (land && regGet("landmass",land.v.g).type === "island") localName = "bay";
				else if (waters.length < 20) localName = "lake";
				else if (waters.length < 50) localName = "sea";
				else if (chunk.e <= 0.1) localName = "trench";
				else localName = "ocean";
				localName = "{{biome:water|"+localName+"}}";
				if (land) {
					localName += " of ";
					localName += "{{regname:landmass|"+land.v.g+"}}";
				}
			}
			else if (chunk.b === "mountain" && chunk.v.g) {
				localName = `{{regname:landmass|${chunk.v.g}}}`;
			}
			else {
				localName = "{{biome:"+chunk.b+"}}";
				if (chunk.v.g) localName += ` of {{regname:landmass|${chunk.v.g}}}`;
			}
			html += `<span class="panelSubtitle">${parseText(localName)}</span>`;
			// html += `<span>Temperature: ${
			//   Math.round(titleCase(chunk.t)*100)
			// }%</span>`;
			html += `<span>Temperature: ${
				parseText("{{color|{{temperature:"+ chunk.t + "}}|" +
				`rgb(${255*chunk.t},100,${255*(1-chunk.t)})`  + "}}")
			}</span>`;
			html += `<span>Moisture: ${
				parseText("{{color|"+ Math.round(chunk.m*100) + "%|" +
				`rgb(0,${255*(chunk.m+0.2)},${255*(chunk.m+0.2)})`  + "}}")
			}</span>`;
			html += `<span>${chunk.e <= waterLevel ? "Depth" : "Elevation"}: ${
				parseText("{{color|{{elevation:"+ chunk.e + "|d}}|" +
				`rgb(${255*chunk.e},${255*(chunk.e+0.5)},${255*chunk.e})`  + "}}")
			}</span>`;
			if (chunk.b !== "water") {
				let fertility = happen("Fertility",null,chunk,null,"chunk");
				html += `<span>Fertility: ${
					parseText("{{color|"+ Math.round(fertility*100) + "%|" +
					`rgb(${255*(1-fertility)},${255*fertility},100)`  + "}}")
				}</span>`;
			}

		}
	}

	statsDiv.innerHTML = html;
}
function handleX(elem) {
	if (elem.parentNode.style.display) {
		elem.parentNode.style.display = "";
	}
	elem.style.display = "none";
	if (promptState) {
		if (promptState.onCancel) promptState.onCancel();
		promptState = null;
	}
	elem.parentNode.classList.remove("popupShown");
	if (currentPopup === elem.parentNode.id) closePopups();
	else selectedChunk = null;
	document.getElementById("gamePopupOverlay").classList.remove("overlayShown");
	document.getElementById("gameDiv").focus();
	updateStats();
	renderCursor();
	updateCanvas();
}
function openPopup(id) {
	if (currentPopup) closePopups();
	let elem = document.getElementById(id);
	let X = elem.querySelector(".panelX");
	if (X) X.style.display = "block";
	elem.style.display = "flex";
	elem.classList.add("popupShown");
	document.getElementById("gamePopupOverlay").classList.add("overlayShown");
	currentPopup = id;
}
function doPrompt(obj) {
	if (obj) promptState = obj;
	else if (!promptState) return;
	if (!obj) obj = promptState;
	let type = promptState.type || "text";
	let message = promptState.message;
	let popupInput = document.getElementById("popupInput");
	popupInput.childNodes.forEach((e) => {
		if (e.style) e.style.display = "none";
	})
	openPopup("promptPopup");
	let promptPopup = document.getElementById("promptPopup");
	promptPopup.setAttribute("data-type",type);
	promptPopup.classList.remove("noContent");
	if (type === "text") {
		if (message !== null) message = message || "Something happened.";
		document.getElementById("popupOk").style.display = "";
	}
	else if (type === "confirm") {
		if (message !== null) message = message || "Are you sure?";
		document.getElementById("popupYes").style.display = "";
		if (obj.danger) document.getElementById("popupYes").classList.add("danger");
		else document.getElementById("popupYes").classList.remove("danger");
		document.getElementById("popupNo").style.display = "";
	}
	else if (type === "ask") {
		if (message !== null) message = message || "Enter a value.";
		let popupText = document.getElementById("popupText");
		popupText.value = "";
		popupText.setAttribute("placeholder",(promptState.placeholder || "Answer")+"...");
		popupText.style.display = "";
		document.getElementById("popupTextConfirm").style.display = "";
		popupText.focus();
		setTimeout(() => {popupText.focus()}, 100);
	}
	else if (type === "choose") {
		let popupChoices = document.getElementById("popupChoices");
		popupChoices.innerHTML = "";
		if (message !== null) message = message || "Choose one.";
		if (!promptState.choices) promptState.choices = ["A","B"];
		promptState.choices.forEach((choice) => {
			let button = document.createElement("span");
			button.className = "popupButton";
			button.addEventListener("click", () => {
				handlePrompt(choice);
			})
			button.setAttribute("role","button");
			button.innerHTML = titleCase(parseText(choice));
			popupChoices.appendChild(button);
		})
		popupChoices.style.display = "";
	}
	let popupTitle = document.getElementById("popupTitle");
	if (promptState.title) {
		popupTitle.innerHTML = parseText(promptState.title);
		popupTitle.style.display = "block";
	}
	else {
		popupTitle.style.display = "";
	}
	let popupContent = document.getElementById("popupContent");
	if (message === null) {
		popupContent.style.display = "none";
		popupTitle.style.flexGrow = "0";
		popupTitle.style.paddingBottom = "0.25em";
		popupInput.style.flexGrow = "1";
	}
	else {
		message = parseText(message);
		message = message.replace(/^[a-z]/, (match) => match.toUpperCase());
		popupContent.innerHTML = message.replace(/\n/g, "<br>");
		popupContent.style.display = "";
		popupTitle.style.paddingBottom = "0em";
		popupInput.style.flexGrow = "";
		if (promptState.title) popupContent.style.paddingTop = "1em";
		else popupContent.style.paddingTop = "";
		if (promptState.pre) popupContent.style.whiteSpace = "pre-wrap";
		else popupContent.style.whiteSpace = "";
		if (message.length > 1000) popupContent.style.fontSize = "1em";
		else popupContent.style.fontSize = "";
	}
	if (!message && !promptState.title) {
		promptPopup.classList.add("noContent");
	}
	if (obj.danger) promptPopup.classList.add("danger");
	else promptPopup.classList.remove("danger");
	if (obj.subtype) promptPopup.setAttribute("data-subtype", obj.subtype);
	else promptPopup.removeAttribute("data-subtype");
}
defaultPromptLimit = 32;
function handlePrompt(result) {
	if (!promptState) return;
	const _promptState = promptState;
	if (typeof result === "string") {
		result = result.replace(/[{<]/g, "[");
		result = result.replace(/[}>]/g, "]");
		result = result.substr(0,(promptState.limit || defaultPromptLimit))
	}
	if (promptState.map && promptState.map[result]) result = promptState.map[result];
	if (promptState.choiceValues) result = promptState.choiceValues[promptState.choices.indexOf(result)];
	handleX(document.querySelector("#promptPopup .panelX"));
	if (_promptState.func) {
		_promptState.func(result);
	}
	else promptState = null;
}
function closePopups() {
	document.getElementById("gamePopupOverlay").classList.remove("overlayShown");
	let popups = document.getElementsByClassName("gamePopup");
	if (popups) {
		for (let i = 0; i < popups.length; i++) {
			popups[i].classList.remove("popupShown");
		}
	};
	if (currentPopup) {
		let popup = document.getElementById(currentPopup);
		popup.classList.remove("popupShown");
		if (popup.style.display) popup.style.display = "";
	}
	currentPopup = null;
}
document.getElementById("popupText").addEventListener("keydown",(e) => {
	if(e.key === "Enter") handlePrompt(document.getElementById("popupText").value.replace(/[\{\}]/g,""));
})
document.getElementById("popupText").addEventListener("input",(e) => {
	let sanitized = e.target.value.replace(/[{<]/g, "[").replace(/[}>]/g, "]");
	if (sanitized !== e.target.value) e.target.value = sanitized;

	if (e.target.value.length > (promptState.limit || defaultPromptLimit)) {
		e.target.value = e.target.value.substr(0,(promptState.limit || defaultPromptLimit));
	}

	if (promptState.preview) {
		let preview = document.querySelector("#popupContent .popupPreview");
		if (!preview) {
			if (e.target.value.length === 0) return;
			preview = document.createElement("span");
			preview.className = "popupPreview";
			document.getElementById("popupContent").appendChild(preview);
		}
		if (e.target.value.length === 0) preview.remove();
		else preview.innerHTML = parseText(promptState.preview(e.target.value, promptState.subject, promptState.target));
	}
})
document.getElementById("gamePopupOverlay").addEventListener("click",(e) => {
	closePopups();
	document.getElementById("gameDiv").focus();
})

function regBrowse(subregistryName, id) {
	let data = regGet(subregistryName, id);
	if (data === undefined) return;
	openRegBrowser(data, subregistryName);
}
function openRegBrowser(obj,regName) {
	let regContent = document.getElementById("regContent")
	regContent.innerHTML = "";
	document.getElementById("regBrowser").scrollTop = 0;

	let title = obj.name;
	if (!title && regBrowserExtra[regName] && regBrowserExtra[regName].name) {
		title = regBrowserExtra[regName].name(obj);
	}
	if (title) {
		if (regName && obj.id) title = `{{regname:${regName}|${obj.id}}}`;
		else if (obj.color) title = `{{color:${title}|rgb(${obj.color.join(",")})}}`;
	}
	if (title) {
		let nameSection = document.createElement("div");
		nameSection.className = "regSection regTitle";
		let regTitle = document.createElement("span");
		regTitle.className = "regTitle";
		regTitle.innerHTML = parseText(title);
		nameSection.appendChild(regTitle);
		regContent.appendChild(nameSection);
	}
	let subtitle;
	if (regName && obj.id) {
		subtitle = titleCase(obj.type || regName);
		// if (obj.type && obj.type !== regName) subtitle += " ("+titleCase(obj.type)+")";
	}
	else if (obj.type) subtitle = titleCase(obj.type);
	if (obj.dems) subtitle += " of the "+obj.dems;
	if (obj.gov) subtitle = titleCase(wordAdjective(obj.gov)) + " " + subtitle;
	if (obj.usurp) subtitle = "Autonomous " + subtitle;
	if (subtitle) {
		let subtitleSection = document.createElement("div");
		subtitleSection.className = "regSection regSubTitle";
		let regSubTitle = document.createElement("span");
		regSubTitle.className = "regSubTitle";
		regSubTitle.innerHTML = subtitle;
		subtitleSection.appendChild(regSubTitle);
		regContent.appendChild(subtitleSection);
	}

	if (obj.desc) {
		let descSection = document.createElement("div");
		descSection.className = "regSection regDesc";
		descSection.innerHTML = parseText(obj.desc).replace(/\n/g, "<br>");
		regContent.appendChild(descSection);
	}

	for (let key in regBrowserKeys) {
		let rkey = key;
		let split = null;
		let value = obj[key];
		if (value === undefined) {
			if (regName && regBrowserExtra[regName] && regBrowserExtra[regName][key]) {
				if (typeof regBrowserExtra[regName][key] === "function") value = regBrowserExtra[regName][key](obj);
				else value = regBrowserExtra[regName][key];
			}
			else {
				split = key.split(".");
				if (split.length < 2) continue;
				if (split[0] === regName || split[0] === obj.type) {
					key = split[1];
				}
				else continue;
				if (obj[key] === undefined) continue;
				value = obj[key];
			}
		}
		if (value === undefined) continue;

		let section = document.createElement("div");
		section.className = "regSection";
		let sectionTitle = document.createElement("span");
		sectionTitle.className = "regSectionTitle";
		sectionTitle.innerHTML = parseText(regBrowserKeys[rkey]);
		section.appendChild(sectionTitle);

		let sectionValue = document.createElement("span");
		sectionValue.className = "regSectionValue";
		
		if (Array.isArray(value)) {
			section.classList.add("regSectionArray");
			sectionValue.classList.add("regArray");
			let values = value;
			for (let i = 0; i < values.length; i++) {
				if (i !== 0) sectionValue.insertAdjacentText("beforeend",", ");
				let value = values[i];
				if (regBrowserValues[key]) {
					value = regBrowserValues[key](value, obj);
				}
				let itemSpan = document.createElement("span");
				itemSpan.className = "regArrayItem";
				itemSpan.innerHTML = parseText(value.toString());
				sectionValue.appendChild(itemSpan);
			}
		}
		else if (typeof value === "object") {
			section.classList.add("regSectionDict");
			sectionValue.classList.add("regDict");
			let subkeys = Object.keys(value);
			if (typeof value[subkeys[0]] === "number") subkeys.sort((a,b) => value[b] - value[a]);

			for (let j = 0; j < subkeys.length; j++) {
				const subkey = subkeys[j];
				
				let itemSpan = document.createElement("span");
				itemSpan.className = "regDictItem";
				let keySpan = document.createElement("span");
				keySpan.className = "regDictKey";
				let valueSpan = document.createElement("span");
				valueSpan.className = "regDictValue";

				let name = subkey;
				if (regBrowserKeys[name]) name = regBrowserKeys[name];
				else name = titleCase(name);
				keySpan.innerHTML = parseText(name);

				let value2 = value[subkey];
				if (typeof value2 === "number") {
					value2 = Math.round(value2*100)/100;
				}
				if (regBrowserValues[subkey] === null) continue;
				else if (influenceModality[subkey] !== undefined && typeof value2 === "number") {
					let h = 60;
					h += Math.round((influenceModality[subkey] ? 1 : -1) * (60*value2));
					h = Math.min(120,h);
					h = Math.max(0,h);

					let color = "hsl("+h+",80%,50%)";

					value2 = parseText("{{color:"+value2+"|"+color+"}}");

				}
				else if (regBrowserValues[subkey]) {
					value2 = regBrowserValues[subkey](value2, obj);
				}
				else if (regBrowserValues[regName + "." + subkey]) {
					value2 = regBrowserValues[regName + "." + subkey](value2, obj);
				}
				valueSpan.innerHTML = parseText(value2.toString());

				itemSpan.appendChild(keySpan);
				itemSpan.appendChild(valueSpan);
				sectionValue.appendChild(itemSpan);
			}
		}
		else {
			if (typeof value === "number") {
				value = Math.round(value*100)/100;
			}
			if (regBrowserValues[rkey]) {
				value = regBrowserValues[rkey](value, obj);
			}
			else if (regBrowserValues[key]) {
				value = regBrowserValues[key](value, obj);
			}
			else if (regBrowserValues[regName + "." + key]) {
				value = regBrowserValues[regName + "." + key](value, obj);
			}
			sectionValue.innerHTML = parseText(value.toString());
		}
		
		if (sectionValue.innerHTML.length === 0) sectionValue.innerHTML = parseText("{{none}}");
		section.appendChild(sectionValue);
		regContent.appendChild(section);
	}
	openPopup("regBrowser");
}

function regBrowsePlanet() {
	openRegBrowser({
		name: planet.name,
		color: planet.color,
		type: planet.dems ? "planet" : (!regToArray("town").length ? "uninhabited" : planet.usurp ? "autonomous" : "inhabited") +" planet",
		start: 0,
		age: planet.day,
		land: filterChunks((c) => c.b !== "water").length,
		size: Math.floor((planetHeight / chunkSize) * (planetWidth / chunkSize)),
		circumference: planetWidth / chunkSize,
		continents: regFilter("landmass", (l) => l.size >= 40).map((l) => `{{regname:landmass|${l.id}}}`),
		dems: planet.dems
	}, "planet")
}
function regBrowseBiome(biome) {
	let data = biomes[biome];

	let crops = regFilter("resource", (r) => r.type === "crop" && r.biome === biome);
	crops = crops.map((r) => "{{regname:resource|"+r.id+"}}");
	if (!crops.length) crops = undefined;
	let livestocks = regFilter("resource", (r) => r.type === "livestock" && r.biome === biome);
	livestocks = livestocks.map((r) => "{{regname:resource|"+r.id+"}}");
	if (!livestocks.length) livestocks = undefined;
	
	openRegBrowser({
		name: titleCase(data.name || biome),
		color: data.color,
		type: "biome",
		crops: crops,
		livestocks: livestocks
	})
}



function logMessage(text, type, args) {
	if (sunsetting && type !== "sunset") {
		logTomorrow(text, type, args);
		return;
	}
	text = parseText(escapeHTML(text));
	text = text.replace(/^[a-z]/, (match) => match.toUpperCase());
	let uuid = uuidv4();
	let html = `<span class="logMessage${type ? ' log'+titleCase(type) : ' logNormal'}" id="logMessage-${uuid}" new="true">
	<span class="logDay" data-day="${type === "tip" ? "" : planet.day}" title="${type ? titleCase(type) : ""}" onclick="handleMessageClick(this)">${type === "tip" ? "?" : parseText("{{date:"+planet.day+"|s}}")}</span><span class="logText">${text}</span>
</span>`
	// <span class="logAct"><span>Yes</span><span>No</span></span>
	let logMessages = document.getElementById("logMessages");
	logMessages.insertAdjacentHTML("afterbegin",html);
	let logText = logMessages.querySelector("#logMessage-"+uuid+" .logText");
	if (logText.childNodes[0].className === "affix") {
		logText.childNodes[0].innerText = logText.childNodes[0].innerText.replace(/^[a-z]/, (match) => match.toUpperCase());
	}
	if (logMessages.childNodes.length > 100) {
		logMessages.removeChild(logMessages.lastChild);
	}
	if (args) {
		if (args.buttons) {
			let messageElement = document.getElementById("logMessage-"+uuid);
			let logAct = document.createElement("span");
			logAct.className = "logAct";
			args.buttons.forEach(item => {
				let logAsk = document.createElement("span");
				logAsk.setAttribute("type","act");
				logAsk.setAttribute("role","button");
				logAsk.innerText = item.name || "Act";
				logAsk.addEventListener("click",item.func)
				logAct.appendChild(logAsk);
			})
			messageElement.appendChild(logAct);
		}
		if (args.influences) {
			reportInfluences(uuid, args.influences[0], args.influences[1]);
		}
	}
	if (logPanel.scrollTop) logPanel.scrollTop = 0;
	return uuid;
}
function fadeMessage(uuid) {
	let elem = document.getElementById("logMessage-"+uuid);
	if (elem) {
		elem.classList.add("faded");
		elem.setAttribute("done","true");
		elem.removeAttribute("new");
	}
	return uuid;
}
function logChange(uuid,text) {
	let elem = document.getElementById("logMessage-"+uuid);
	if (elem) {
		elem.setAttribute("changed","true");
		text = parseText(escapeHTML(text));
		text = text.replace(/^[a-z]/, (match) => match.toUpperCase());
		elem.querySelector(".logText").innerHTML = text;
		let logText = elem.querySelector(".logText");
		if (logText.childNodes[0].className === "affix") {
			logText.childNodes[0].innerText = logText.childNodes[0].innerText.replace(/^[a-z]/, (match) => match.toUpperCase());
		}
	}
	return uuid;
}
function logSub(uuid,text) {
	let elem = document.getElementById("logMessage-"+uuid);
	if (elem) {
		let html = `<span class="logSub">${parseText(escapeHTML(text))}</span>`
		elem.insertAdjacentHTML("beforeend", html);
		let act = elem.querySelector(".logAct");
		if (act && !act.innerHTML.length) act.style.display = "none";
	}
	return uuid;
}
function clearLog() {
	document.getElementById("logMessages").innerHTML = "";
}
function logTomorrow(text, type, args) {
	planet.nextDayMessages.push([text,type,args]);
}
function logWarning(type, text) {
	if (planet.warnings[type] && planet.day - planet.warnings[type] < $c.warningCooldown) return false;
	planet.warnings[type] = planet.day;
	(sunsetting ? logTomorrow : logMessage)(text, "warning");
}
function logTip(type, text) {
	if (!userSettings.shownTips) userSettings.shownTips = [];
	if (userSettings.shownTips.includes(type)) return false;
	(sunsetting ? logTomorrow : logMessage)(text, "tip");
	userSettings.shownTips.push(type);
	saveSettings();
}

function reportInfluences(uuid, oldInfluences, newInfluences) {
	let text = "";
	let diffs = [];

	for (let key in newInfluences) {
		let diff = newInfluences[key] - oldInfluences[key];
		if (oldInfluences[key] === undefined) diff = newInfluences[key];
		diffs.push([key,diff]);
	}

	diffs.sort((a, b) => Math.abs(b[1]) - Math.abs(a[1]));
	diffs = diffs.slice(0,5);

	for (let i = 0; i < diffs.length; i++) {
		const key = diffs[i][0];
		const diff = diffs[i][1];
		
		if (Math.abs(diff) > 0.01) {
			let abs = Math.abs(diff);
			let modality = influenceModality[key];
			if (modality === undefined) modality = 1;
			if (modality === 0 && diff < 0) modality = 1;
			else if (modality === 0 && diff > 0) modality = 0;
			else if (diff < 0) modality = 0;

			text += "{{"+(modality ? "good" : "bad")+":";
			text += regBrowserKeys[key] ? regBrowserKeys[key] : titleCase(key);
			text += "}}";
			text += "{{arrow|";
			text += diff > 0 ? 1 : 0;
			text += "|";
			text += modality;
			text += "|";
			text += abs >= 1 ? 3 : abs >= 0.5 ? 2 : 1;
			text += "}} ";
		}
	}

	if (text) logSub(uuid, text);
}

isIOS = ['iPad Simulator','iPhone Simulator','iPod Simulator','iPad','iPhone','iPod'].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document);

shareOptions = {
	"Copy Text": {
		func: async (text,title,url) => {
			text += "\n\nPlay: "+url;
			await navigator.clipboard.writeText(text);
			logMessage("Message copied!", "tip");
		},
		main: true
	},
	"Twitter": {
		template: "https://x.com/intent/post?text=TEXT",
		useHashtag: true,
		addLink: true,
		main: true
	},
	"Reddit": {
		template: "https://reddit.com/submit?url=URL&title=TEXT",
		oneLine: true,
		main: true
	},
	"Email": {
		template: "mailto:?subject=TITLE&body=TEXT",
		main: true,
		addLink: true,
	},
	"More...": {
		func: (text) => {
			sharePrompt(text, true);
		},
		main: true
	},

	"Threads": {
		template: "https://threads.net/intent/post?text=TEXT",
		useHashtag: true,
		addLink: true
	},
	"Bluesky": {
		template: "https://bsky.app/intent/compose?text=TEXT",
		useHashtag: true,
		addLink: true
	},
	"Tumblr": {
		template: "https://www.tumblr.com/widgets/share/tool?canonicalUrl=URL&title=TITLE&caption=TEXT&tags=HASHTAG"
	},
	"WhatsApp": {
		template: "https://api.whatsapp.com/send?text=TEXT",
		addLink: true
	},
}
shareOptions[isIOS ? "iMessage" : "SMS"] = {
	template: "sms:{phone_number}?body={url}{text}",
	addLink: true
}
if (navigator.share) {
	shareOptions["Share to..."] = {
		func: async (text,title,url) => {
			const shareData = {
				title: title,
				text: text,
				url: url,
			};
			if (!navigator.canShare(shareData)) {
				logMessage("Could not share!","tip");
				delete shareOptions["Share to..."];
				return;
			}
			await navigator.share(shareData);
		}
	}
}
function sharePrompt(text, more) {
	let title = "GenTown";
	let hashtag = "GenTown";
	let url = "https://r74n.com/gentown/?utm_medium=social";

	doPrompt({
		type: "choose",
		message: more ? null : text,
		title: more ? "More..." : null,
		choices: Object.keys(shareOptions).filter((key) => more ? !shareOptions[key].main : shareOptions[key].main),
		subtype: "share",
		func: (r) => {
			if (!r) return;
			let share = shareOptions[r];
			if (share.func) share.func(text, title, url);
			if (share.template) {
				let link = share.template;
				if (share.oneLine) text = text.replace(/\n/g, " ");
				if (share.useHashtag) {
					if (text.includes(hashtag)) text = text.replace(hashtag, "#"+hashtag);
					else if (!share.addLink) text += " #"+hashtag;
				}
				if (share.addLink) {
					text += "\n\nPlay";
					if (share.useHashtag && !text.includes(hashtag)) text += " #"+hashtag;
					text += ": "+url;
				}
				link = link.replace(/TEXT/g, encodeURIComponent(text));
				link = link.replace(/TITLE/g, encodeURIComponent(title));
				link = link.replace(/HASHTAG/g, encodeURIComponent(hashtag));
				link = link.replace(/URL/g, encodeURIComponent(url));
				window.open(link, '_blank').focus();
			}
		}
	})
}
function shareProgress() {
	let msg = `My GenTown planet, ${planet.name}, `;

	if (planet.dead) {
		msg += `${planet.dead < 50 ? "only " : ""}lasted ${parseText("{{num:"+planet.dead+"}}")} days before societal collapse`;
	}
	else if (planet.usurp) {
		msg += `${planet.usurp < 50 ? "only " : ""}lasted ${parseText("{{num:"+planet.usurp+"}}")} days before they lost faith in me`;
	}
	else {
		if (planet.day === 1) msg += `was just formed`;
		else msg += `has lasted ${parseText("{{num:"+planet.day+"}}")} days`;
		msg += ` and has `;
		let towns = regCount("town");
		let residents = regToArray("town").reduce((n, {pop}) => n + pop, 0);
		msg += choose([
			parseText("{{num:"+towns+"}}") + " town" + (towns === 1 ? "" : "s"),
			parseText("{{num:"+residents+"|K}}") + " resident" + (residents === 1 ? "" : "s"),
		])
	}

	msg += "!";

	let emojis = "";
	for (let type in unlockTree) {
		let levels = unlockTree[type].levels;
		let currentLevel = planet.unlocks[type] || 0;
		for (let i = 0; i < levels.length; i++) {
			const levelData = levels[i];
			if (levelData.level <= currentLevel && levelData.emoji) {
				emojis += levelData.emoji;
			}
			else break;
		}
	}
	if (emojis) msg += "\n\n"+emojis;

	sharePrompt(msg);
}

function killPlanet() {
	if (!planet.dead || planet.dead === true) planet.dead = planet.day;
	logMessage("There are no more settlements on Planet {{planet}}. Your final score was {{percent:"+planet.stats.score+"}}.", undefined, {
	buttons: [
	{
		name: "Start Over",
		func: () => resetPlanetPrompt()
	},
	{
		name: "Share",
		func: () => shareProgress()
	}
	]
	});
	// logTip("deadPlanet", "You may want to start a new planet.");
	document.getElementById("actionSaves").classList.add("notify");
}
function lockPlanet() {
	planet.locked = true;
	document.getElementById("nextDay").setAttribute("disabled", "true");
	document.getElementById("nextDayMobile").setAttribute("disabled", "true");
}
function unlockPlanet() {
	planet.locked = false;
	document.getElementById("nextDay").removeAttribute("disabled");
	document.getElementById("nextDayMobile").removeAttribute("disabled");
}

function resetPlanetPrompt() {
	doPrompt({
		type: "confirm",
		message: "{{people}} look up dreadfully at the sky.\n\nAre you sure you want to DELETE them permanently?",
		title: "Reset Progress",
		func: (r) => {
			if (r) {
				R74n.del("GenTownSave");
				delete userSettings.view;
				saveSettings();
				location.reload();
			}
		},
		danger: true
	});
}

function updateTitle() {
	newTitle = "GenTown";
	if (planet.day > 1) newTitle += ": Day " + parseText("{{num:"+planet.day+"}}");
	document.title = document.title.replace(/GenTown.+- /, newTitle +" - ")
}

townsBefore = null;
sunsetting = false;

function nextDay(e) {
	if (e && e.target.getAttribute("disabled") === "true") {
		if (planet.letter) logTip("letter", "There is an urgent letter you must read before continuing.");
		return;
	}

	if (e) {
		e.target.setAttribute("disabled","true");
		setTimeout(()=>{
			if (!planet.locked) { e.target.removeAttribute("disabled"); }
		}, 1000)
	}

	if (recentEvents.length >= 3) recentEvents.shift();
	// recentEvents.shift();

	let oldMessages = document.querySelectorAll('.logMessage[new="true"]');
	oldMessages.forEach((elem) => {
		elem.removeAttribute("new");
	})
	for (let eventID in currentEvents) {
		let eventCaller = currentEvents[eventID];
		if (!eventCaller.done) {
			if (eventCaller.logID) {
				fadeMessage(eventCaller.logID);
			}
			if (eventCaller.needsInput) {
				if (planet.stats.promptstreak <= 0) statsAdd("promptstreak",-1);
				else planet.stats.promptstreak = 0;
			}
		}
		delete currentEvents[eventID];
	}

	let towns = regToArray("town");

	sunsetting = true;

	for (let eventClass in dailyEvents) {
		let eventCaller = readyEvent(eventClass);
		if (!eventCaller) continue;
		if (dailyEvents[eventClass].check && !dailyEvents[eventClass].check(eventCaller.subject, eventCaller.target, eventCaller.args)) continue;
		doEvent(eventClass,eventCaller);
	}

	let sunsetMsg = "The Sun sets... ";
	// log daily recap of town changes
	if (townsBefore) {
		let minChange = 0;
		for (let i = 0; i < towns.length; i++) {
			if (!towns[i].end) minChange++;
		}
		for (let i = 0; i < towns.length; i++) {
			const town = towns[i];
			if (town.end) continue;
			const townBefore = townsBefore[town.id];
			if (!townBefore) continue;

			let msg = "";

			const changes = {};

			try {changes.pop = town.pop - townBefore.pop;} catch{}
			if (Math.abs(changes.pop) >= minChange) msg += `{{diff:${changes.pop}}}{{icon:neutral|Population}} `;

			try {changes.size = town.size - townBefore.size;} catch{}
			if (Math.abs(changes.size) >= minChange) msg += `{{diff:${changes.size}}}{{icon:land|Size}} `;

			try {changes.crop = (town.resources.crop||0) - (townBefore.resources.crop||0)} catch{}
			if (Math.abs(changes.crop) >= minChange) msg += `{{diff:${changes.crop}}}{{icon:crop|Crops}} `;

			try {changes.lumber = (town.resources.lumber||0) - (townBefore.resources.lumber||0)} catch{}
			if (Math.abs(changes.lumber) >= minChange) msg += `{{diff:${changes.lumber}}}{{icon:lumber|Lumber}} `;

			try {changes.rock = (town.resources.rock||0) - (townBefore.resources.rock||0)} catch{}
			if (Math.abs(changes.rock) >= minChange) msg += `{{diff:${changes.rock}}}{{icon:rock|Rock}} `;
			
			try {changes.metal = (town.resources.metal||0) - (townBefore.resources.metal||0)} catch{}
			if (Math.abs(changes.metal) >= minChange) msg += `{{diff:${changes.metal}}}{{icon:metal|Metal}} `;

			try {changes.livestock = (town.resources.livestock||0) - (townBefore.resources.livestock||0)} catch{}
			if (Math.abs(changes.livestock) >= minChange) msg += `{{diff:${changes.livestock}}}{{icon:livestock|Livestock}} `;

			try {changes.cash = (town.resources.cash||0) - (townBefore.resources.cash||0)} catch{}
			if (Math.abs(changes.cash) >= minChange) msg += `{{currency:${town.id}}}{{diff:${Math.round(changes.cash)}}} `;

			if (msg) {
				sunsetMsg += `{{regname:town|${town.id}|-}} (` + msg.trim() + ") ";
			}
		}
	}
	logMessage(sunsetMsg, "sunset");
	// store previous town values
	townsBefore = JSON.parse(JSON.stringify(reg.town));
	planet.day ++;
	sunsetting = false;

	let eventCaller;

	if (planet.nextDayMessages.length) {
		planet.nextDayMessages.forEach((m) => {
			logMessage(m[0], m[1], m[2]);
		})
		planet.nextDayMessages = [];
	}

	if (!regCount("town") && !planet.dead) {
		killPlanet();
	}

	// skip events when failing additional checks
	for (let tries = 0; tries < 10; tries++) {
		let influencingTown = choose(regToArray("town"));
		let chosenEvent = chooseEvent(undefined,influencingTown);
		if (!chosenEvent) continue;
		let chosenSubject;
		let chosenTarget;
		if (gameEvents[chosenEvent].subject && gameEvents[chosenEvent].subject.reg === "town") chosenSubject = influencingTown;
		else if (gameEvents[chosenEvent].target && gameEvents[chosenEvent].target.reg === "town" && !gameEvents[chosenEvent].target.random) chosenTarget = influencingTown;
		eventCaller = readyEvent(chosenEvent, chosenSubject, chosenTarget);
		if (eventCaller && eventCaller.eventClass && randomEvents[eventCaller.eventClass].check && !randomEvents[eventCaller.eventClass].check(eventCaller.subject, eventCaller.target, eventCaller.args)) {
			// recentEvents.push(eventCaller.eventClass);
			eventCaller = undefined;
		}
		if (eventCaller && planet.dead && !(eventCaller.subject && eventCaller.subject._reg === "nature")) eventCaller = undefined;
		if (eventCaller && !eventCaller.target && randomEvents[eventCaller.eventClass].target) eventCaller = undefined;
		if (eventCaller && gameEvents[chosenEvent].value && gameEvents[chosenEvent].value.ask &&
			((eventCaller.target && eventCaller.target.usurp) || planet.usurp) && 
			eventCaller.subject && eventCaller.subject._reg === "player") eventCaller = undefined;

		if (eventCaller !== undefined) break;
	}

	if (eventCaller) {
		let eventID = eventCaller.eventID;
		let eventClass = eventCaller.eventClass;
		let eventInfo = randomEvents[eventClass];
		currentEvents[eventID] = eventCaller;
		let oldInfluences;
		let influencedTown;
		if (eventInfo.auto) {
			if (eventInfo.target && eventInfo.target.reg === "town") influencedTown = eventCaller.target;
			else if (eventInfo.subject && eventInfo.subject.reg === "town") influencedTown = eventCaller.subject;

			if (influencedTown) {
				oldInfluences = structuredClone(influencedTown.influences);
			}

			let r = doEvent(eventClass, currentEvents[eventID]);
			if (!eventCaller.message) {
				if (isFunction(eventInfo.message)) {
					eventCaller.message = eventInfo.message(eventCaller.subject,eventCaller.target,eventCaller.args);
				}
				else if (eventInfo.message) eventCaller.message = eventInfo.message
			}
			eventCaller.done = true;
		}
		if (eventCaller.message) eventCaller.logID = logMessage(eventCaller.message);
		let messageElement = document.getElementById("logMessage-"+eventCaller.logID);
		recentEvents.push(eventClass);
		if (messageElement) {
			messageElement.setAttribute("data-eventid",eventID)
			messageElement.setAttribute("data-eventclass",eventClass)
		}
		if (eventInfo.auto) {
			if (messageElement) messageElement.setAttribute("done","true");

			if (oldInfluences && influencedTown) reportInfluences(eventCaller.logID, oldInfluences, influencedTown.influences)
		}
		let logAct = document.createElement("span");
		logAct.className = "logAct";
		if (eventInfo.value && eventInfo.value.ask) {
			eventCaller.needsInput = true;

			let logAsk = document.createElement("span");
			logAsk.setAttribute("type","act");
			logAsk.setAttribute("role","button");
			logAsk.innerText = "Act";
			logAsk.addEventListener("click",(e) => {
				if (messageElement.getAttribute("done")) return;

				promptState = {
					type: "ask",
					message: eventInfo.value.message ? eventInfo.value.message(eventCaller.subject, eventCaller.target) : eventCaller.message,
					func: (r) => {
						if (!r) return;

						let influencedTown;
						if (eventInfo.target && eventInfo.target.reg === "town") influencedTown = eventCaller.target;
						else if (eventInfo.subject && eventInfo.subject.reg === "town") influencedTown = eventCaller.subject;

						let oldInfluences;
						if (influencedTown) {
							oldInfluences = structuredClone(influencedTown.influences);
						}

						eventCaller.args.value = r;
						doEvent(eventClass, currentEvents[eventID]);

						if (oldInfluences) {
							let newInfluences = influencedTown.influences;
							reportInfluences(eventCaller.logID, oldInfluences, newInfluences);
						}

						messageElement.removeAttribute("new");
						messageElement.setAttribute("done","true");
						e.target.setAttribute("selected","true");
						if (isFunction(eventInfo.messageDone)) {
							logChange(eventCaller.logID, eventInfo.messageDone(eventCaller.subject,eventCaller.target,eventCaller.args));
						}
						else if (eventInfo.messageDone) logChange(eventCaller.logID, eventInfo.messageDone);
						eventCaller.done = true;
						statsAdd("prompt",1);
						if (planet.stats.promptstreak < 0) planet.stats.promptstreak = 0;
						statsAdd("promptstreak",1);
						updateStats();
						refreshExecutive();
						renderMap();
						renderHighlight();
						updateCanvas();
						autosave();
					},
					preview: eventInfo.value.preview,
					subject: eventCaller.subject,
					target: eventCaller.target
				}
				doPrompt();

			})

			logAct.appendChild(logAsk);

		}
		else if ((eventInfo.func || eventInfo.influences || eventInfo.influencesNo || eventInfo.messageNo) && !eventInfo.auto) {
			eventCaller.needsInput = true;
			if (eventCaller.target && eventCaller.target.usurp && !eventInfo.noUsurp) {
				eventCaller.needsInput = false;
			}
			if (planet.usurp) eventCaller.needsInput = false;

			let logYes = document.createElement("span");
			logYes.setAttribute("type","yes");
			logYes.setAttribute("role","button");
			logYes.innerText = "Yes";
			logYes.addEventListener("click",(e) => {
				if (messageElement.getAttribute("done")) return;

				let influencedTown;
				if (eventInfo.target && eventInfo.target.reg === "town") influencedTown = eventCaller.target;
				else if (eventInfo.subject && eventInfo.subject.reg === "town") influencedTown = eventCaller.subject;
				
				let oldInfluences;
				if (influencedTown) {
					oldInfluences = structuredClone(influencedTown.influences);
				}

				doEvent(eventClass, currentEvents[eventID]);
				if (eventInfo.influences) {
					happen("Influence", null, influencedTown, eventInfo.influences);
				}

				if (oldInfluences) {
					let newInfluences = influencedTown.influences;
					reportInfluences(eventCaller.logID, oldInfluences, newInfluences);
				}

				messageElement.removeAttribute("new");
				messageElement.setAttribute("done","true");
				e.target.setAttribute("selected","true");
				if (isFunction(eventInfo.messageDone)) {
					logChange(eventCaller.logID, eventInfo.messageDone(eventCaller.subject,eventCaller.target,eventCaller.args));
				}
				else if (eventInfo.messageDone) logChange(eventCaller.logID, eventInfo.messageDone);
				eventCaller.done = true;
				if (eventCaller.needsInput) {
					statsAdd("prompt",1);
					if (planet.stats.promptstreak < 0) planet.stats.promptstreak = 0;
					statsAdd("promptstreak",1);
				}
				updateStats();
				refreshExecutive();
				// renderMap();
				renderHighlight();
				updateCanvas();
				autosave();
			})

			let logNo = document.createElement("span");
			logNo.setAttribute("type","no");
			logNo.setAttribute("role","button");
			logNo.innerText = "No";
			logNo.addEventListener("click",(e) => {
				if (messageElement.getAttribute("done")) return;

				let influencedTown;
				if (eventInfo.target && eventInfo.target.reg === "town") influencedTown = eventCaller.target;
				else if (eventInfo.subject && eventInfo.subject.reg === "town") influencedTown = eventCaller.subject;

				let oldInfluences;
				if (influencedTown) {
					oldInfluences = structuredClone(influencedTown.influences);
				}

				if (eventInfo.funcNo) {
					eventInfo.funcNo(eventCaller.subject,eventCaller.target,eventCaller.args);
				}
				if (eventInfo.influencesNo) {
					happen("Influence", null, influencedTown, eventInfo.influencesNo);
				}

				if (oldInfluences) {
					let newInfluences = influencedTown.influences;
					reportInfluences(eventCaller.logID, oldInfluences, newInfluences);
				}

				messageElement.removeAttribute("new");
				messageElement.setAttribute("done","true");
				e.target.setAttribute("selected","true");
				if (isFunction(eventInfo.messageNo)) {
					logChange(eventCaller.logID, eventInfo.messageNo(eventCaller.subject,eventCaller.target,eventCaller.args));
				}
				else if (eventInfo.messageNo) logChange(eventCaller.logID, eventInfo.messageNo);
				eventCaller.done = true;
				if (eventCaller.needsInput) {
					statsAdd("prompt",1);
					if (planet.stats.promptstreak < 0) planet.stats.promptstreak = 0;
					statsAdd("promptstreak",1);
				}
				updateStats();
				refreshExecutive();
				// renderMap();
				renderHighlight();
				updateCanvas();
				autosave();
			})

			logAct.appendChild(logNo);
			logAct.appendChild(logYes);

			if (!eventCaller.needsInput) { // usurp
				setTimeout(() => {
					(Math.random() < 0.5 ? logYes : logNo).click();
					logAct.addEventListener("click", () => {
						logMessage(`{{regname:${eventCaller.target._reg}|${eventCaller.target.id}}} has chosen to be run independently.`, "tip");
					});
				}, 100);
				if (messageElement) messageElement.classList.add("usurp");
			}
		}
		if (messageElement && logAct.innerHTML.length) messageElement.appendChild(logAct);
	}
	else if (!planet.dead) {
		logMessage("An uneventful day.");
	}

	updateStats();
	refreshExecutive();
	// renderMap();
	renderHighlight();
	updateCanvas();

	autosave();
	updateTitle();
}

document.getElementById("nextDay").addEventListener("click",nextDay);
document.getElementById("nextDayMobile").addEventListener("click",nextDay);



function initGame() {
	if (!planet.reg) planet.reg = defaultRegistry();
	reg = planet.reg;
	gameLoaded = true;
	
	if (parseInt(planet.day) !== planet.day) planet.day = 1;
	
	if (!planet.name) planet.name = generateWord(undefined,true);
	document.getElementById("planetName").innerHTML = parseText("{{planet}}");

	clearLog();
	closeExecutive();

	initExecutive();

	currentPlayer = regGet("player", 1);
	if (!currentPlayer) {
		currentPlayer = happen("Create", null, null, null, "player");
	}
	if (planet.reg.nature._id === 1) {
		regAdd("nature", {
			name: choose(["Mother","Father"]) + " " + planet.name
		})
	}

	// remove any existing resources from biomes
	regToArray("resource").forEach((r) => {
		if (r.biome) {
			delete biomes[r.biome][r.type];
		}
	})
	
	if (reg.resource._id === 1) {
		happen("Create",null,null,{ type:"raw", name:"lumber" },"resource");
		happen("Create",null,null,{ type:"raw", name:"rock" },"resource");
		happen("Create",null,null,{ type:"raw", name:"metal" },"resource");
		// happen("Create",null,null,{ type:"crop", biome:"grass" },"resource")
		for (let biome in biomes) {
			if (biomes[biome].crop !== null) happen("Create",null,null,{ type:"crop", biome:biome },"resource");
			if (biomes[biome].livestock !== null) happen("Create",null,null,{ type:"livestock", biome:biome },"resource");
		}
	}
	else {
		regToArray("resource").forEach((r) => {
			if (r.biome) {
				if (!biomes[r.biome][r.type]) biomes[r.biome][r.type] = [];
				biomes[r.biome][r.type].push(r.id);
			}
		})
	}

	// create first town prompt
	if (reg.town._id === 1) {
		onMapClickMsg = logMessage("Tap on the map to settle your town.");
		onMapClick = function(e) {
			let chunk = planet.chunks[mousePos.chunkX+","+mousePos.chunkY];
			if (chunk) {

				if (chunk.b !== "water" && chunk.b !== "mountain") {
					onMapClick = null;
					fadeMessage(onMapClickMsg);
					onMapClickMsg = null;
					let town = happen("Create",currentPlayer,null,{x:chunk.x, y:chunk.y},"town");

					logMessage("The "+(town.type||"town")+" of {{regname|town|"+town.id+"}} is founded.")
					if (!planet.locked) {
						document.getElementById("nextDay").removeAttribute("disabled");
						document.getElementById("nextDayMobile").removeAttribute("disabled");
					}
					townsBefore = JSON.parse(JSON.stringify(reg.town));

					setView("territory");
					autosave();
				}
			}
		}
	}
	else { // enable "Next Day" buttons if town already exists
		onMapClick = null;
		onMapClickMsg = null;
		if (!planet.locked) {
			document.getElementById("nextDay").removeAttribute("disabled");
			document.getElementById("nextDayMobile").removeAttribute("disabled");
		}
		townsBefore = JSON.parse(JSON.stringify(reg.town));
	}

	let gameDiv = document.getElementById("gameDiv");
	if (planet.letter) {
		happen("Letter", null, currentPlayer);
	}
	if (planet.usurp) gameDiv.classList.add("usurp");
	else gameDiv.classList.remove("usurp");

	if (userSettings.overlay === false) document.getElementById("mapOverlay").style.display = "none";

	updateStats();
	renderMap();
	renderHighlight();
	updateCanvas();

	fitToScreen();
	updateTitle();
}


// Views
viewData = {
	territory: {
		showTerrain: true,
		showHighlight: true,
		showMarkers: true
	},
	terrain: {
		showTerrain: true,
		// showHighlight: true,
		// colorFunction: "rgba(",
		// pixelColor: (value) => {
		//   return [255,0,0,0.5]
		// }
		// chunkColor: (chunk) => {
		//   return [255,0,0,0.5]
		// }
		hover: (chunk) => {
			return chunk.b !== undefined;
		},
		click: (chunk) => {
			regBrowseBiome(chunk.b);
		}
	},
	temperature: {
		showTerrain: true,
		colorFunction: "rgba(",
		chunkColor: (chunk) => {
			// 0 to 1, mid 0.5
			let temp = chunk.t - 0.5;

			if (temp < 0) return [0,0,255,Math.abs(temp)*1.2];
			return [255,0,0,Math.abs(temp)*1.2];
		}
	},
	landmass: {
		showTerrain: true,
		colorFunction: "rgba(",
		chunkColor: (chunk) => {
			if (chunk.v.g !== undefined) {
				let color = reg.landmass[chunk.v.g].color;
				return [color[0],color[1],color[2],0.75]
			}
		},
		hover: (chunk) => {
			return chunk.v.g !== undefined;
		},
		click: (chunk) => {
			if (chunk.v.g) regBrowse("landmass", chunk.v.g);
		}
	},
	plates: {
		showTerrain: true,
		colorFunction: "rgba(",
		chunkColor: (chunk) => {
			if (chunk.v.g === undefined) {
				chunk = nearestChunk(chunk.x, chunk.y, (c) => c.v.g !== undefined);
			}
			let color = reg.landmass[chunk.v.g].color;
			return [color[0],color[1],color[2],0.75]
		}
	},
	elevation: {
		colorFunction: "hsl(",
		pixelColor: (value) => {
			let hue = value;
			hue = 1 - hue;
			return [hue*250, 0.6*100+"%", 0.5*100+"%"];
		}
	}
};

window.addEventListener("load", () => {
	document.getElementById("viewButton").addEventListener("click", () => {
		doPrompt({
			type: "choose",
			choices: Object.keys(viewData),
			message: null,
			title: "Select View",
			func: (r) => { if (r) setView(r) }
		})
	});
	document.getElementById("viewName").innerText = "Terrain";
});

function saveSettings() {
	R74n.set("GenTownSettings",JSON.stringify(userSettings));
}

function unlockExecutive(executiveID) {
	if (planet.unlockedExecutive === undefined) planet.unlockedExecutive = {};
	else if (planet.unlockedExecutive[executiveID]) return;
	planet.unlockedExecutive[executiveID] = true;
	let button = document.getElementById("actionItem-"+executiveID)
	if (button) {
		button.classList.add("notify");
		button.style.display = "";
	}
}

function getUnlockLevel(type) {
	let levels = unlockTree[type].levels;
	let currentLevel = planet.unlocks[type] || 0;
	let highest = null;
	for (let i = 0; i < levels.length; i++) {
		const levelData = levels[i];
		if (levelData.level <= currentLevel) {
			highest = levelData;
		}
		else break;
	}
	return highest;
}


// Mods
Mod = {};
Mod.event = function(id, data) {
	gameEvents[id] = data;
	if (data.meta === true) {
		metaEvents[id] = data;
	}
	else if (data.daily === true) {
		dailyEvents[id] = data;
	}
	else { // random: true
		randomEvents[id] = data;
	}
}
Mod.action = function(className, func) {
	if (!actionables[className]) actionables[className] = {};
	if (!actionables[className].asTarget) actionables[className].asTarget = {};
	actionables[className].asTarget = func;
}

function addModPrompt() {
	doPrompt({
		type: "ask",
		title: "Add Mod",
		message: "Enter a mod name (example_mod.js) or full URL below. Only add mods that you trust!",
		placeholder: ".JS or URL",
		limit: 1000,
		func: (url) => {
			if (!url) return;
			let r = addMod(url);
			if (r === true) r = `${url} was enabled. It may need a page refresh to take effect.`;
			else r = `${url} was unable to be added: ${r||"Unknown error"}.`;

			logMessage(r,"tip");
		}
	})
}
function normalizeMod(url) {
	url = url || "";
	url = url.trim();
	url = url.replace(/\/$/g,"");
	url = url.replace(/ /g,"_");
	url = url.toLowerCase();
	return url;
}
// https://r74ncom.github.io/GenTown-Mods/example_mod.js
function modToURL(url) {
	if (url.match(/^https?:\/\//)) return url;
	else if (url.match(/\.[a-z.]+\//i)) return "https://"+url;
	return "https://r74ncom.github.io/GenTown-Mods/" + url;
}
function modToName(url) {
	return url.match(/[^\/]+$/)[0]
}
function addMod(url) {
	url = normalizeMod(url);
	if (!url) return "Mod not specified";
	if (!userSettings.mods) userSettings.mods = [];
	if (userSettings.mods.includes(url)) return "Mod already enabled";
	if (!url.match(/\.js$/)) return "Not a .JS file"
	userSettings.mods.push(url);
	saveSettings();
	let btn = document.getElementById("actionItem-enabledMods");
	if (btn) btn.style.display = "";
	runMod(url);
	return true;
}
function removeMod(url) {
	if (!userSettings.mods) return;
	userSettings.mods = userSettings.mods.filter((u) => u !== url);
	if (!userSettings.mods.length) {
		let btn = document.getElementById("actionItem-enabledMods");
		if (btn) btn.style.display = "none";
	}
	saveSettings();
}
function showMods() {
	if (!userSettings.mods) return;
	doPrompt({
		type: "choose",
		message: "Choose a mod to manage.",
		choices: userSettings.mods,
		func: (url) => {
			manageMod(url);
		}
	})
}
function manageMod(url) {
	doPrompt({
		type: "choose",
		title: modToName(url),
		message: null,
		choices: [
			"view",
			"remove"
		],
		func: (r) => {
			if (r === "view") window.open(modToURL(url), '_blank').focus();
			if (r === "remove") {
				removeMod(url);
				logMessage(modToName(url) + " has been removed. Refresh to apply changes.","tip");
			}
		}
	})
}
function runMod(url) {
	url = modToURL(url);
	let script = document.createElement("script");
	script.src = url;
	document.body.appendChild(script);
}
if (userSettings.mods) {
	for (let i = 0; i < userSettings.mods.length; i++) {
		const url = userSettings.mods[i];
		runMod(url);
	}
}


// Saves
function autosave() {
	let json = generateSave();
	R74n.set("GenTownSave",JSON.stringify(json));
}
function autoload() {
	let json = R74n.get("GenTownSave");
	json = json.replace(/</g, "[");
	json = json.replace(/>/g, "]");
	json = JSON.parse(json);
	parseSave(json);
}
function saveFile(btn) {
	if (btn && btn.getAttribute("disabled")) return;

	var a = document.createElement("a");

	let json = generateSave();
	let fileName = (planet.name||"Planet") + "-" + (planet.day||1);

    var file = new Blob([JSON.stringify(json)], {type: 'application/vnd.R74n.gentown+json'});
    a.href = URL.createObjectURL(file);
    a.download = fileName + ".planet";
    a.click();

	if (btn) btn.setAttribute("disabled","true");
}
function loadFile() {
	let input = document.getElementById("saveUpload");

	input.click();
}

if (isIOS) {
	document.getElementById("saveUpload").removeAttribute("accept");
}
document.getElementById("saveUpload").addEventListener("change", (e) => {
	const file = e.target.files[0];
	if (file) {
		console.log('File selected:', file.name);
		var reader = new FileReader();
		reader.readAsText(file, "UTF-8");
		console.log(file)
		reader.onload = function (evt) {
			let json = evt.target.result;
			json = json.replace(/</g, "[");
			json = json.replace(/>/g, "]");
			json = JSON.parse(json);
			console.log(json);
			parseSave(json);
		}
		reader.onerror = function (evt) {
			alert("File '"+file.name+"' could not be read");
		}
		e.target.value = "";
	}
})

function validatePlanet() {

	// Updating planet with default data
	const _defaultPlanet = defaultPlanet();
	for (const key in _defaultPlanet) {
		const value = _defaultPlanet[key];
		if (planet[key] === undefined) {
			planet[key] = value;
		}
		else if (Array.isArray(value) && Array.isArray(planet[key])) {
			value.forEach((item) => {
				if (!planet[key].includes(item)) {
					planet[key].push(item);
				}
			})
		}
		else if (typeof value === "object" && typeof planet[key] === "object") {
			for (const key2 in value) {
				if (planet[key][key2] === undefined) {
					planet[key][key2] = value[key2];
				}
			}
		}
	}

	for (const key in planet.reg) {
		// Subregistry validation
		if (planet.reg.registry[key] === undefined) {
			planet.reg.registry[key] = planet.reg.registry._id;
			planet.reg.registry._id++;
		}

		// Entity validation
		for (const key2 in planet.reg[key]) {
			let data = planet.reg[key][key2];
			if (!isNaN(data)) continue;

			if (isNaN(data.start)) data.start = planet.day;
		}
	}

	// Chunk validation
	for (let chunkKey in planet.chunks) {
		let chunk = planet.chunks[chunkKey];
		if (!biomes[chunk.b]) chunk.b = "water";
		if (!chunk.v) chunk.v = {};
		if (chunk.v.s && !reg.town[chunk.v.s]) delete chunk.v.s;
	}

	regToArray("town", true).forEach((town) => {
		let _defaultTown = defaultTown();
		for (const key in _defaultTown) {
			if (town[key] === undefined) town[key] = _defaultTown[key];
		}
	})

	if (!regSingle("resource", (r) => r.name === "cash")) {
		happen("Create",null,null,{ type:"raw", name:"cash" },"resource");
	}

}

unicodeSkips = {
	0: 65, // null -> A
	58: 65, // : -> A
	91: 192, // [ -> À
	215: 216, // × -> Ø
	247: 248, // ÷ -> ø
	688: 880,
	884: 886,
	888: 891,
	894: 895,
	896: 902,
	903: 904,
	907: 908,
	909: 910,
	930: 931,
	1155: 1162,
	1328: 1329,
	1367: 1376,
	1417: 1488,
	1514: 12448,
	12544: 13312
};
function compressChunkData(string) {
	return string.replace(/(.)\1{3,8}/g, (r) => {
		// if (r.length > 9) console.log(r.length)
		return r[0] + "*" + r.length;
	});
}
function decompressChunkData(string) {
	return string.replace(/.\*[4-9]/g, (r) => {
		let char = r[0];
		let num = parseInt(r[2]);
		return char.repeat(num);
	});
}
function generateSave() {
	let json = {
		meta: {
			saveVersion: saveVersion,
			gameVersion: gameVersion,
			created: planet.created || Date.now(),
			saved: planet.saved || Date.now(),
		},
		planet: JSON.parse(JSON.stringify(planet)),
		planetWidth: planetWidth,
		planetHeight: planetHeight,
		chunkSize: chunkSize,
		waterLevel: waterLevel
	};

	delete json.planet.chunks;
	delete json.planet.created;
	delete json.planet.saved;

	for (const regname in json.planet.reg) {
		for (const id in json.planet.reg[regname]) {
			const data = json.planet.reg[regname][id];
			if (!isNaN(data)) continue;
			delete json.planet.reg[regname][id]._reg;
		}
	}

	let chunkData = {};
	let codes = {};
	let codesReverse = {};
	let codeN = 65;

	chunkData.p = "";
	chunkData.t = "";
	chunkData.e = "";
	chunkData.m = "";
	chunkData.b = "";
	chunkData.v = "";

	/* chunk.p:
	0: (4) [0.1, 0.1, 0.1, 0.1]
	1: (4) [0.1, 0.1, 0.1, 0.1]
	2: (4) [0.1, 0.1, 0.1, 0.1]
	3: (4) [0.1, 0.1, 0.1, 0.1]
	*/

	for (let chunkX = 0; chunkX < planetWidth / chunkSize; chunkX++) {
		for (let chunkY = 0; chunkY < planetHeight / chunkSize; chunkY++) {
			let chunkKey = chunkX+","+chunkY;
			let chunk = planet.chunks[chunkKey];
			if (!chunk) {
				console.log("Missing chunk: "+chunkKey);
				return;
			}

			chunk.p.forEach((row) => {
				row.forEach((p) => {
					chunkData.p += p >= 1 ? "M" : Math.trunc(p*10);
				})
			})

			chunkData.t += chunk.t >= 1 ? "M" : Math.trunc(chunk.t*10);
			chunkData.e += chunk.e >= 1 ? "M" : Math.trunc(chunk.e*10);
			chunkData.m += chunk.m >= 1 ? "M" : Math.trunc(chunk.m*10);

			if (!codes[chunk.b]) {
				let char = String.fromCharCode(codeN);
				codes[chunk.b] = char;
				codesReverse[char] = chunk.b;
				codeN++;
				if (unicodeSkips[codeN]) codeN = unicodeSkips[codeN];
			}
			chunkData.b += codes[chunk.b];
			
			chunkData.v += JSON.stringify(chunk.v) + "\t";
		}
	}

	chunkData.p = compressChunkData(chunkData.p);
	chunkData.t = compressChunkData(chunkData.t);
	chunkData.e = compressChunkData(chunkData.e);
	chunkData.m = compressChunkData(chunkData.m);
	chunkData.b = compressChunkData(chunkData.b);
	chunkData.v = chunkData.v.slice(0, -1).replace(/\{\}\t/g,"§").replace(/§§§§§§/g,"¦");

	for (const regname in json.planet.reg) {
		for (const id in json.planet.reg[regname]) {
			const data = json.planet.reg[regname][id];
			if (data.delete) {
				delete json.planet.reg[regname][id];
				continue;
			}
			const keys = Object.keys(data);
			keys.forEach((key) => {
				if (!codes[key]) {
					let char = String.fromCharCode(codeN);
					codes[key] = char;
					codesReverse[char] = key;
					codeN++;
					if (unicodeSkips[codeN]) codeN = unicodeSkips[codeN];
				}
				data[codes[key]] = data[key];
				delete data[key];
			})
		}
	}

	json.codes = codesReverse;
	json.chunkData = chunkData;

	return json;
}

function parseSave(json) {
	planet = json.planet;
	planetHeight = json.planetHeight;
	planetWidth = json.planetWidth;
	chunkSize = json.chunkSize;
	waterLevel = json.waterLevel;

	planet.created = json.meta.created || json.meta.saved || Date.now();
	planet.saved = json.meta.saved || json.meta.created || Date.now();
	
	let saveVer = parseInt(json.meta.saveVersion.split("gt")[1]);

	let codes = json.codes;
	let chunkData = json.chunkData;

	chunkData.p = decompressChunkData(chunkData.p);
	chunkData.t = decompressChunkData(chunkData.t);
	chunkData.e = decompressChunkData(chunkData.e);
	chunkData.m = decompressChunkData(chunkData.m);
	chunkData.b = decompressChunkData(chunkData.b);

	let chunks = {};

	let chunkArea = chunkSize*chunkSize;

	let p = [];
	chunkData.p.match(new RegExp(".{"+chunkArea+"}","g")).forEach(area => {
		let values = area.match(new RegExp(".{"+chunkSize+"}","g"));
		values = values.map(r => [...r].map(v => v === "M" ? 1 : parseInt(v)/10));
		p.push(values);
	});
	chunkData.p = p;

	chunkData.t = [...chunkData.t].map(v => v === "M" ? 1 : parseInt(v)/10);
	chunkData.e = [...chunkData.e].map(v => v === "M" ? 1 : parseInt(v)/10);
	chunkData.m = [...chunkData.m].map(v => v === "M" ? 1 : parseInt(v)/10);
	
	chunkData.b = [...chunkData.b].map(v => codes[v]);

	chunkData.v = chunkData.v.replace(/¦/g,"§§§§§§").replace(/§/g,"{}\t").split("\t").map(v => JSON.parse(v));

	let chunkIndex = 0;
	for (let chunkX = 0; chunkX < planetWidth / chunkSize; chunkX++) {
		for (let chunkY = 0; chunkY < planetHeight / chunkSize; chunkY++) {
			let chunk = {
				x: chunkX,
				y: chunkY,
				p: chunkData.p[chunkIndex],
				t: chunkData.t[chunkIndex],
				e: chunkData.e[chunkIndex],
				m: chunkData.m[chunkIndex],
				b: biomes[chunkData.b[chunkIndex]] ? chunkData.b[chunkIndex] : "water",
				v: chunkData.v[chunkIndex]
			};
			let chunkKey = chunkX + "," + chunkY;
			chunks[chunkKey] = chunk;
			
			chunkIndex++;
		}
	}

	planet.chunks = chunks;

	if (saveVer >= 2) {
		for (const regname in json.planet.reg) {
			for (const id in json.planet.reg[regname]) {
				const data = json.planet.reg[regname][id];
				const keys = Object.keys(data);
				keys.forEach((key) => {
					if (codes[key]) {
						data[codes[key]] = data[key];
						delete data[key];
					}
				})
			}
		}
	}

	reg = json.planet.reg;

	usedNames = {};
	for (const regname in reg) {
		for (const id in reg[regname]) {
			const data = reg[regname][id];
			if (!isNaN(data)) continue;

			if (data.name) usedNames[data.name.toLowerCase()] = true;

			reg[regname][id]._reg = regname;
		}
	}

	validatePlanet();

	initGame();
	setView();

	if (currentPlayer.name) {
		userSettings.playerName = currentPlayer.name;
		delete currentPlayer.name;
		saveSettings();
	}

	logMessage("The Sun rises on Planet {{planet}}...");

	if (planet.dead) killPlanet();
}


// Executive Panel
function populateExecutive(items, title, main=false) {
	if (!main) document.getElementById("actionMain").style.display = "none";

	let subpanel = document.getElementById(main ? "actionMain" : "actionSub");
	
	let subpanelList = document.getElementById(main ? "actionMainList" : "actionSubList");
	if (!main) {
		subpanelList.innerHTML = "";

		let panelTitle = document.createElement("span");
		panelTitle.className = "panelTitle";
		panelTitle.innerText = title ? parseText(title) : "Options";
		subpanelList.appendChild(panelTitle);

		if (title) currentExecutive = title.toLowerCase();
	}

	let sortButton = null;

	if (!items) items = [];
	if (items.length === 1 && items[0].sorter) items = [];
	if (items.length === 0) items.push({
		text: "{{none}}"
	})

	let fallbackID = 1;

	for (let i = 0; i < items.length; i++) {
		const item = items[i];

		let actionItem = document.createElement("span");
		actionItem.classList.add("actionItem");
		actionItem.classList.add("item");

		let text = "";
		if (typeof item === "string") text = item;
		else text = item.text || "Option #"+i;

		if (item.id) actionItem.id = "actionItem-"+item.id;
		if (item.indent) actionItem.style.marginLeft = item.indent + "em";
		if (item.opacity) actionItem.style.opacity = item.opacity;
		if (item.hide && (!item.id || !planet.unlockedExecutive || !planet.unlockedExecutive[item.id])) actionItem.style.display = "none";
		if (item.notify) actionItem.classList.add("notify");
		if (item.danger) actionItem.classList.add("danger");
		if (item.tip) actionItem.setAttribute("title", item.tip);
		if (item.heading) {
			actionItem.style.paddingTop = "1em";
			actionItem.style.textAlign = "center";
			actionItem.style.color = "yellow";
		}
		if (item.spacer) {
			text = item.text || "&nbsp;";
			if (item.text) {
				actionItem.style.paddingBottom = "1em";
				actionItem.style.fontStyle = "italic";
				if (!item.opacity) actionItem.style.opacity = "0.8";
			}
			actionItem.style.borderBottom = "none";
		}

		actionItem.innerHTML = parseText(text);

		if (item.sorter) {
			actionItem.classList.add("actionSort");
			actionItem.classList.add("clickable");
			actionItem.classList.remove("item");
			if (!item.text) actionItem.innerText = "Default";
			actionItem.addEventListener("click", sortExecutive);
			currentExecutiveSorter = item.sorter;
			// actionItem.setAttribute("data-sortIndex", 0);
			sortButton = actionItem;
			actionItem.addEventListener("contextmenu", (e) => {
				let regname = actionItem.parentNode.querySelector(".actionItem.item[data-reg]").getAttribute("data-reg");
				doPrompt({
					type: "choose",
					message: null,
					choices: item.sorter.map((sorter) => sorterName(sorter,regname)),
					choiceValues: [...item.sorter.keys()],
					func: (index) => {
						sortButton.setAttribute("data-sortIndex", index - 1);
						sortButton.click();
					}
				})
				e.preventDefault();
				return false;
			})
		}
		if (item.entity) {
			if (item.entity._reg) {
				actionItem.setAttribute("data-reg", item.entity._reg);
			}
			else {
				item.entity.id = fallbackID;
				fallbackID ++;
				actionItem.setAttribute("data-reg", "none");
				actionItem.setAttribute("data-entity", JSON.stringify(item.entity));
			}
			actionItem.setAttribute("data-id", item.entity.id);
		}
		if (item.setting) {
			actionItem.classList.add("actionSetting");
			actionItem.classList.add("clickable");
			actionItem.addEventListener("click", settingExecutive);
			actionItem.addEventListener("contextmenu", (e) => {
				settingExecutive(e, true);
				e.preventDefault();
				return false;
			})

			let value = userSettings[item.setting];
			if (value === undefined) value = item.default || item.options[0];
			if (value === null) value = "null";
			else if (value.toString) value = value.toString();
			if (value === item.default) actionItem.classList.add("default");
			else if (value === "true") actionItem.classList.add("on");
			else if (value === "false") actionItem.classList.add("off");

			actionItem.insertAdjacentHTML("beforeend",`: <span class='settingValue'>${parseText(item.options[value])}</span>`);

			actionItem.setAttribute("data-setting", item.setting);
			actionItem.setAttribute("data-value", value);
			actionItem.setAttribute("data-default", item.default);
			actionItem.setAttribute("data-values", Object.keys(item.options).join(";;"));
			actionItem.setAttribute("data-labels", Object.values(item.options).join(";;"));
		}

		actionItem.addEventListener("click", (e) => {
			e.target.classList.remove("notify");
		})

		if (item.func) {
			actionItem.addEventListener("click", () => {
				let tempExecutive = currentExecutive;
				item.func(actionItem);
				if (tempExecutive !== currentExecutive) {
					currentExecutiveButton = actionItem
				}
			});
			actionItem.classList.add("clickable");
			actionItem.setAttribute("role","button");
		}
		if (item.url) {
			actionItem.addEventListener("click", () => {
				if (item.url.toLowerCase().includes("r74n.com")) location.href = item.url;
				else window.open(item.url, '_blank').focus();
			});
			actionItem.classList.add("clickable");
			actionItem.setAttribute("role","link");
			actionItem.insertAdjacentHTML("beforeend", " <span class='font2'>▶</span>");
		}
		if (item.keybind) {
			actionItem.setAttribute("data-keybind", item.keybind.toLowerCase());
			// actionItem.innerHTML = actionItem.innerHTML.replace(new RegExp(item.keybind, "i"), (k) => "<u>"+k+"</u>")
			actionItem.insertAdjacentHTML("afterbegin", "<u>"+item.keybind.toUpperCase()+"</u> ");
		}

		subpanelList.appendChild(actionItem);
	}

	if (sortButton) sortButton.click();

	subpanel.style.display = "flex";
}

function closeExecutive() {
	document.getElementById("actionMain").style.display = "flex";
	document.getElementById("actionSub").style.display = "none";
	document.getElementById("actionSubList").innerHTML = "";
	currentExecutive = null;
	currentExecutiveButton = null;
	currentExecutiveSorter = null;
}
function refreshExecutive() {
	if (!currentExecutiveButton) return;
	let e = currentExecutiveButton;
	if (e) {
		closeExecutive();
		e.click();
	}
}

function sorterName(sorter, reg) {
	let sortBy = sorter[0];
	let name = sorter[2] || regBrowserKeys[sortBy];

	let split = sortBy.split(".");
	let subkey = split[split.length - 1];
	if (!name && regBrowserKeys[subkey]) name = regBrowserKeys[subkey];
	if (!name && regBrowserKeys[reg+"."+subkey]) name = regBrowserKeys[reg+"."+subkey];
	if (!name) name = titleCase(sortBy);

	return name;
}
function sortExecutive(e) {
	const sortButton = e.target;
	const sorters = currentExecutiveSorter;
	if (!sorters) return;
	
	let sortIndex = parseInt(sortButton.getAttribute("data-sortIndex") || -1);
	sortIndex = (sortIndex + 1) % sorters.length;
	sortButton.setAttribute("data-sortIndex", sortIndex);

	let buttons = sortButton.parentNode.querySelectorAll(".actionItem.item");

	let entities = [];
	buttons.forEach((button) => {
		let reg = button.getAttribute("data-reg");
		let id = button.getAttribute("data-id");
		if (reg && reg !== "none" && id) entities.push(regGet(reg, id));
		else if (button.getAttribute("data-entity")) entities.push(JSON.parse(button.getAttribute("data-entity")))
	})

	if (!entities.length) return;

	const sorter = sorters[sortIndex];
	let sortBy = sorter[0];
	let inverse = sorter[1];

	let name = sorterName(sorter, entities[0]._reg);
	sortButton.innerText = name;

	entities = sortEntities(entities, sortBy, inverse);
	entities.reverse();

	entities.forEach((entity) => {
		let reg = entity._reg || "none";
		let id = entity.id;
		let button = e.target.parentNode.querySelector(`.actionItem[data-reg="${reg}"][data-id="${id}"]`)
		if (button) {
			sortButton.insertAdjacentElement("afterend", button);
		}
	})
}
function settingExecutive(e, backward) {
	let button = e.target;
	if (button.className === "settingValue") button = button.parentNode;
	let setting = button.getAttribute("data-setting");
	let value = button.getAttribute("data-value");
	let defaultValue = button.getAttribute("data-default");
	let values = button.getAttribute("data-values").split(";;");
	let labels = button.getAttribute("data-labels").split(";;");
	let index = values.indexOf(value);

	if (index === -1) index = -1;
	
	let newIndex = (index + (backward ? 1 : -1)) % (values.length)
	if (newIndex < 0) newIndex = values.length-1;

	let newOption = values[newIndex];
	let isDefault = newOption === defaultValue;
	if (!isNaN(newOption)) {
		newOption = parseFloat(newOption);
		if (newOption === parseInt(newOption)) newOption = parseInt(newOption);
	}
	else if (newOption === "true") {
		newOption = true;
		button.classList.remove("off");
		button.classList.add("on");
	}
	else if (newOption === "false") {
		newOption = false;
		button.classList.remove("on");
		button.classList.add("off");
	}
	else if (newOption === "null") newOption = null;
	let newLabel = parseText(labels[newIndex]);

	if (isDefault) {
		delete userSettings[setting];
		button.classList.add("default");
	}
	else {
		userSettings[setting] = newOption;
		button.classList.remove("default");
	}
	saveSettings();
	
	let labelElement = button.querySelector(".settingValue");
	labelElement.innerHTML = newLabel;

	button.setAttribute("data-value", newOption);
}
document.getElementById("actionSubpanelClose").addEventListener("click",closeExecutive)


function checkHash() {
	if (this.location.hash) {
		let id = location.hash.substring(1);

		if (id === "changelog" || id === "about" || id === "feedback") {
			this.document.getElementById("actionInfo").click();
		}

		let button = this.document.getElementById("actionItem-"+id);
		if (button) button.click();

		button = this.document.getElementById("action"+titleCase(id));
		if (button) button.click();
	}
	else if (currentExecutive) {
		closeExecutive();
	}
}
window.addEventListener("hashchange", checkHash);

function initExecutive() {
	document.querySelectorAll("#actionMainList .actionItem").forEach((e) => {
		e.remove();
	})
	populateExecutive([
	{
		text: "Towns",
		id: "towns",
		hide: true,
		keybind: "t",
		func: () => {
			let items = [];
			items.push({
				sorter: [
					// [key, invert?, name?]
					["pop", false],
					["size", false],
					["start", true],
					["name", false],
					["influences.happy", false],
				]
			})
			regToArray("town").forEach((town) => {
				items.push({
					text: `{{regname:town|${town.id}}}`,
					func: () => regBrowse("town", town.id),
					entity: town
				});
			})
			populateExecutive(items, "Towns ("+(items.length - 1)+")");
		}
	},
	{
		text: "Unlocks",
		id: "unlocks",
		hide: true,
		keybind: "u",
		func: () => {
			let total = 0;
			for (let type in unlockTree) {
				total += unlockTree[type].levels.length;
			}

			let items = [];
			let unlocked = 0;
			for (let type in unlockTree) {
				if (!planet.unlocks[type]) continue;
				let levels = unlockTree[type].levels;
				for (let i = 0; i < levels.length; i++) {
					const levelData = levels[i];
					if (planet.unlocks[type] >= levelData.level) {
						items.push({
							text: levelData.name,
							indent: i
						});
						unlocked ++;
					}
					else {
						items.push({
							text: levelData.name.replace(/\w/g,"?"),
							indent: i,
							opacity: 0.5
						});
						break;
					};
				}
			}
			if (!items.length) items.push("No unlocks yet..");
			populateExecutive(items, "Unlocks");
			populateExecutive(items, "Unlocks ("+Math.round(unlocked / total * 100)+"%)");
		}
	},
	{
		text: "Almanac",
		id: "almanac",
		hide: true,
		keybind: "r",
		func: () => {
			let items = [];
			items.push({
				sorter: [
					// [key, invert?, name?]
					["rate", false],
					["biome", false],
					["domesticated", false],
					["name", false],
				]
			})
			regSorted("resource", "rate").forEach((resource) => {
				if (resource.type !== "crop" && resource.type !== "livestock") return;
				if (resource.rate === 1 || resource.rate === undefined) return;
				items.push({
					text: `{{icon:${resource.type}}} {{regname:resource|${resource.id}}} (${resource.rate}x)`,
					func: () => regBrowse("resource", resource.id),
					entity: resource
				});
			})
			populateExecutive(items, "Almanac ("+(items.length-1)+")");
		}
	},
	{
		text: "Projects",
		id: "projects",
		hide: true,
		keybind: "j",
		func: () => {
			let items = [];
			regFilter("process", (p) => 
				p.type === "project" && !p.done
			).forEach((process) => {
				items.push({
					text: `${process.done ? "{{check" : "{{wait"}${process.symbol ? "|"+process.symbol : ""}}} {{regname:process|${process.id}|-}} ({{regname:town|${process.town}}})`,
					func: () => regBrowse("process", process.id),
					entity: process
				});
			})
			populateExecutive(items, "Projects ("+items.length+")");
		}
	},
	{
		text: "Stats",
		id: "stats",
		hide: true,
		keybind: "/",
		func: () => {
			let items = [];
			items.push({
				sorter: [
					// [key, invert?, name?]
					["value", false, "Highest"],
					["value", true, "Lowest"],
					["name", false, "Name"]
				]
			})
			for (let key in planet.stats) {
				const statsKey = "stats."+key;
				if (!regBrowserKeys[statsKey]) continue;

				let name = regBrowserKeys[statsKey];

				let value = planet.stats[key];
				let valueText = value;
				if (regBrowserValues[statsKey]) valueText = regBrowserValues[statsKey](value);
				if (!isNaN(valueText)) {
					valueText = "{{num:"+valueText+"}}";
					value = parseFloat(value);
				}

				items.push({
					text: `{{i:${name}:}} ${valueText}`,
					entity: {name:name, value:value}
				})
			}
			for (let key in regBrowserExtra.stats) {
				const statsKey = "stats."+key;
				let name = regBrowserKeys[statsKey];
				let value = regBrowserExtra.stats[key]();
				let valueText = value;
				if (!isNaN(value)) {
					valueText = "{{num:"+valueText+"}}";
					value = parseFloat(value);
				}
				items.push({
					text: `{{i:${name}:}} ${valueText}`,
					entity: {name:name, value:value}
				})
			}
			populateExecutive(items, "Stats");
		}
	},
	{
		text: "Timeline",
		id: "timeline",
		hide: true,
		keybind: "h",
		func: () => {
			let items = [];
			// items.push({
			// 	sorter: [
			// 		// [key, invert?, name?]
			// 		["start", false, "Newest"],
			// 		["start", true, "Oldest"]
			// 	]
			// })
			if (planet.dead) items.push({
				text: `{{color:[{{date:${planet.dead}|s}}]|rgba(255,255,0,0.75)}} {{planet}} becomes uninhabited`,
				func: () => regBrowsePlanet,
				_day: planet.dead
			});
			regToArray("town",true).forEach((town) => {
				items.push({
					text: `{{color:[{{date:${town.start}|s}}]|rgba(255,255,0,0.75)}} {{regname:town|${town.id}}} is founded`,
					func: () => regBrowse("town", town.id),
					entity: town,
					_day: town.start
				});
				if (town.end) {
					items.push({
						text: `{{color:[{{date:${town.end}|s}}]|rgba(255,255,0,0.75)}} {{regname:town|${town.id}}} falls`,
						func: () => regBrowse("town", town.id),
						entity: town,
						_day: town.end
					});
				}
				if (town.usurp) {
					items.push({
						text: `{{color:[{{date:${town.usurp}|s}}]|rgba(255,255,0,0.75)}} {{regname:town|${town.id}}} becomes independent`,
						func: () => regBrowse("town", town.id),
						entity: town,
						_day: town.usurp
					});
				}
			})
			regToArray("process").forEach((process) => {
				let text = `{{color:[{{date:${process.start}|s}}${process.done ? "–{{date:"+process.done+"|s}}" : ""}]|rgba(255,255,0,0.75)}} `;
				if (process.type === "project") text += `${process.marker ? "{{regname:marker|"+process.marker+"}}" : "{{regname:process|"+process.id+"}}"} constructed in {{regname:town|${process.town}}}`;
				// else if (process.type === "disaster") text += 
				else if (process.type === "usurp") text += "{{planet}} becomes independent"
				else if (process.type === "unusurp") text += "{{planet}} regains faith"
				else {
					text += `{{regname:process|${process.id}}}`;
				}
				if (process.deaths) text += " kills "+process.deaths;
				else if (process.type === "disaster" && !process.injuries) return;
				items.push({
					text: text,
					func: () => regBrowse("process", process.id),
					entity: process,
					_day: process.start
				});
			})
			items.sort((a, b) => b._day - a._day);
			populateExecutive(items, "Timeline");
		}
	}
	], "Executive", true)
}

window.addEventListener("load", function(){ //onload

	if (userSettings.lastVersionCheck !== gameVersion && userSettings.view) {
		document.getElementById("actionInfo").classList.add("notify");
	}
	else {
		userSettings.lastVersionCheck = gameVersion;
	}
	userSettings.lastVersion = gameVersion;
	saveSettings();

	document.getElementById("gameLoading").style.display = "none";
	document.getElementById("gameDiv").style.display = "flex";

	for (let key in influenceModality) {
		allInfluences[key] = true;
	}
	for (let key in influenceEffects) {
		allInfluences[key] = true;
		for (let key2 in influenceEffects[key]) {
			allInfluences[key2] = true;
		}
	}
	for (let key in jobInfluences) {
		allInfluences[jobInfluences[key]] = true;
	}
	
	if (R74n.has("GenTownSave")) {
		autoload();
	}
	else {
		planet = generatePlanet();
		reg = planet.reg;
		updateBiomes();
		calculateLandmasses();
		initGame();
	}

	if (userSettings.view) setView(userSettings.view);

	document.querySelector("#gameHalf2 .panelX").addEventListener("click", closeExecutive);

	document.getElementById("actionSettings").addEventListener("click",() => {
	populateExecutive([
		{
			text: "Units",
			setting: "units",
			options: { "x": "Simple", "i": "Imperial", "m": "Metric" },
			default: "x",
			tip: "Displays in entity info and preview",
			func: () => {
				updateStats();
			}
		},
		{
			text: "Dates",
			setting: "dates",
			options: { "x": "Simple", "g": "Gregorian" },
			default: "x",
			tip: "Displays in entity info and preview",
			func: () => {
				updateStats();
				document.querySelectorAll(".logDay").forEach(elem => {
					let day = elem.getAttribute("data-day");
					if (day) elem.innerText = parseText("{{date:"+day+"|s}}");
				})
			}
		},
		{ text:"Map", heading:true },
		{
			text: "Town names",
			setting: "townNames",
			options: { "true": "Enabled", "false": "Disabled" },
			default: "false",
			func: () => { renderMarkers(); updateCanvas(); }
		},
		{
			text: "Carve borders",
			setting: "carve",
			options: { "true": "Enabled", "false": "Disabled" },
			default: "false",
			tip: "Removes square borders along the coastline",
			func: () => { renderHighlight(); updateCanvas(); }
		},
		{
			text: "Markers",
			setting: "markers",
			options: { "true": "Enabled", "false": "Disabled" },
			default: "true",
			func: () => { renderMarkers(); updateCanvas(); }
		},
		{
			text: "Overlay",
			setting: "overlay",
			options: { "true": "Enabled", "false": "Disabled" },
			default: "true",
			func: () => { document.getElementById("mapOverlay").style.display = userSettings.overlay === false ? "none" : "block"; }
		},
		{
			text: "Desaturate biomes",
			setting: "desaturate",
			options: { "true": "Enabled", "false": "Disabled" },
			default: "false",
			func: () => { renderMap(); updateCanvas(); }
		},
		{ text:"Mods", heading:true },
		{
			text: "Enabled mods",
			id: "enabledMods",
			hide: !(userSettings.mods || []).length,
			func: () => { showMods(); }
		},
		{
			text: "Add mod",
			func: () => { addModPrompt(); }
		},
		{
			text: "Mod list",
			url: "https://github.com/R74nCom/GenTown-Mods/"
		},
		{ spacer:true },
		{
			text: "Reset to defaults",
			danger: true,
			func: () => {
				doPrompt({
					type: "confirm",
					title: "Reset Settings",
					message: "Are you sure you want to reset to default settings? This will not affect your save.",
					func: (r) => {
						if (!r) return;
						document.querySelectorAll("#actionSubList .actionSetting").forEach((button) => {
							let setting = button.getAttribute("data-setting");
							delete userSettings[setting];
						})
						saveSettings();
						closeExecutive();
						renderMap();
						renderHighlight();
						updateStats();
					},
					danger: true
				})
			}
		},
		{
			text: "Erase data & saves",
			danger: true,
			func: () => {
				doPrompt({
					type: "confirm",
					title: "Erase EVERYTHING",
					message: "Are you sure you want to delete ALL GenTown DATA, including your SAVES? This cannot be undone.",
					func: (r) => {
						if (!r) return;
						R74n.del("GenTownSave");
						R74n.del("GenTownSettings");
						this.location.reload();
					},
					danger: true
				})
			}
		},
	], "Settings");
	currentExecutive = "settings";
	})

	document.getElementById("actionSaves").addEventListener("click",() => {
	populateExecutive([
		// {
		// 	text: "Your current planet is automatically saved.",
		// 	spacer: true
		// },
		{
			text: "Save to file",
			func: saveFile,
			id: "saveFile"
		},
		{
			text: "Load from file",
			func: loadFile,
			id: "loadFile"
		},
		{ spacer: true },
		{
			text: "Make frequent backups!",
			spacer: true
		},
		{
			text: "Reset progress",
			func: () => {
				resetPlanetPrompt();
			},
			notify: planet.dead,
			danger: true
		}
	], "Save Options");
	currentExecutive = "saves";
	})
	
	document.getElementById("actionInfo").addEventListener("click",(e) => {
	populateExecutive([
		{ text: "About", func: ()=> {
			doPrompt({ type:"text", message:document.getElementById("blurbAbout").innerText });
		}, id:"about" },
		{ text: "Controls", func: ()=>{
			doPrompt({ type: "text", message: "Loading..." })

			fetch("https://r74n.com/gentown/controls.txt")
			.then((r) => r.text())
			.then((text) => {
				doPrompt({
					type: "text",
					message: text,
					title: "Controls",
					pre: true
				})
			})
			.catch((error) => {
				alert(error);
			})
		}, id:"controls"},
		{ text: "Changelog", func: ()=>{
			doPrompt({ type: "text", message: "Loading..." })

			fetch("https://r74n.com/gentown/changelog.txt")
			.then((r) => r.text())
			.then((text) => {
				text = text.replace(/(^|\n)(\[.+\])/g, "$1{{b:$2}}");
				text = text.replace(/((?:^|\n) +)(\+)/g, "$1{{color:$2|#00ff00}}");
				text = text.replace(/((?:^|\n) +)(~)/g, "$1{{color:$2|#ffff00}}");
				text = text.replace(/((?:^|\n) +)(-)/g, "$1{{color:$2|#ff0000}}");
				doPrompt({
					type: "text",
					message: text,
					title: "Changelog",
					pre: true
				})

				document.getElementById("actionItem-changelog").classList.remove("notify");
				document.getElementById("actionInfo").classList.remove("notify");

				if (userSettings.lastVersionCheck !== gameVersion) {
					userSettings.lastVersionCheck = gameVersion;
					saveSettings();
				}
			})
			.catch((error) => {
				alert(error);
			})
		}, id:"changelog", notify: userSettings.lastVersionCheck && userSettings.lastVersionCheck !== gameVersion },
		{ text: "Share", func:shareProgress, id:"share" },
		{ text: "Feedback", url: "https://docs.google.com/forms/d/e/1FAIpQLSeq2TMoKAxJRKXlCmBLeONYLTMCc1j6lYcY5nxBr4lwaRWTpA/viewform", id:"feedback" },

		{ spacer: true },
		{ text: "{{color:R74n|#00ffff}} - More projects!", url:"https://r74n.com/" },
		{ text: "Copyright 2025.", url:"https://r74n.com/license.txt" }
	], "GenTown v"+gameVersion);
	currentExecutive = "info";
	})

	checkHash();

})