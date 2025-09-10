// Text Viewer setup
textParserConfig.escapeHTML = true;
addParserCommand("c",function(args) {
  return choose(args);
})
addParserCommand("color",function(args) {
  if (args.length === 0) {return ""}
  if (args.length === 1) {return args[0]}
  return "<span style='color:"+args[1]+"'>"+args[0]+"</span>";
})
addParserCommand("b",function(args) {
  if (args.length === 0) {return ""}
  return "<strong>"+args[0]+"</strong>";
})
addParserCommand("num",function(args) {
  if (args.length === 0) {return ""}
  if (args[1] === "K") {
    let num = parseFloat(args[0]);
    if (num < 1000) return num.toString();
    return Math.floor((num / 1000) * 10) / 10 + "K"
  }
  let parts = args[0].toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
})
addParserCommand("check",function(args) {
  return "{{color:✓|#00ff00}}";
})
addParserCommand("x",function(args) {
  return "{{color:✗|#ff0000}}";
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
  if (total >= Math.max(20, town.size * 5)) {
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
  let data = regGet(args[0],parseInt(args[1]));
  if (!data) return `<span class='entityName' title='${data.id}' data-reg='${args[0]}' data-id='${data.id}'>Invalid Thing</span>`;
  return `<span class='entityName' title='${titleCase(args[0])}' data-reg='${args[0]}' data-id='${data.id}' ${data.color ? `style="color:rgb(${data.color[0]},${data.color[1]},${data.color[2]})"` : ""} onclick="regBrowse('${args[0]}',${data.id})" onmouseenter='handleEntityHover(this)' onmouseleave='handleEntityHoverOut(this)' role="link">${args[2] || data.name}</span>`;
})
addParserCommand("randreg",function(args) {
  if (args.length < 1) {return ""}
  let options;
  if (args[1]) options = regFilter(args[0],(r) => r.type === args[1]);
  else options = regToArray("town");

  if (options.length) return `{{regname:${args[0]}|${choose(options).id}}}`
  
  return ``;
})
addParserCommand("planet",function(args) {
  return `<span class='entityName' onclick='regBrowsePlanet()' style="color:rgb(${(planet.color||biomes.water.color).join(",")})">${planet.name}</span>`;
})
addParserCommand("biome",function(args) {
  return `<span class='entityName' onclick='regBrowseBiome("${args[0]}")' style="color:rgb(${biomes[args[0]].color.join(",")})">${titleCase(args[1] || biomes[args[0]].name || args[0])}</span>`;
})
addParserCommand("people",function(args) {
  return "Inhabitants of {{planet}}";
})
addParserCommand("residents",function(args) {
  if (args.length === 0) return "Residents";
  let town = regGet("town",args[0]);
  if (!town) return "{{c:Residents|Citizens}}";
  if (town.dems) return `{{regname|town|${args[0]}|${town.dems}}}`;
  return `{{c:Residents|Citizens}} of {{regname|town|${args[0]}}}`;
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

function escapeHTML(unsafe) {
  return unsafe
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
function sumValues(obj) {
  let total = 0;
  Object.values(obj).forEach((n) => {
    total += n;
  })
  return total;
}

function coordsToChunk(x, y) {
  return Math.floor(x/chunkSize)+","+Math.floor(y/chunkSize);
}
function chunkCoordsToCoords(cx, cy, x, y) {
  return [cx*chunkSize + x, cy*chunkSize + y];
}
function chunkAt(x, y) {
  return planet.chunks[x+","+y];
}

function RGBtoHSL(rgb) {let r=rgb[0];let g=rgb[1];let b=rgb[2];r /= 255, g /= 255, b /= 255;var max = Math.max(r, g, b), min = Math.min(r, g, b);var h, s, l = (max + min) / 2;if (max == min) {h = s = 0;} else {var d = max - min;s = l > 0.5 ? d / (2 - max - min) : d / (max + min);switch (max) {case r: h = (g - b) / d + (g < b ? 6 : 0); break;case g: h = (b - r) / d + 2; break;case b: h = (r - g) / d + 4; break;}h /= 6;}return [ h, s, l ];}
function HSLtoRGB(hsl) {let h=hsl[0];let s=hsl[1];let l=hsl[2];var r, g, b;if (s == 0) {r = g = b = l;} else {function hue2rgb(p, q, t) {if (t < 0) t += 1;if (t > 1) t -= 1;if (t < 1/6) return p + (q - p) * 6 * t;if (t < 1/2) return q;if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;return p;}var q = l < 0.5 ? l * (1 + s) : l + s - l * s;var p = 2 * l - q;r = hue2rgb(p, q, h + 1/3);g = hue2rgb(p, q, h);b = hue2rgb(p, q, h - 1/3);}return [ r * 255, g * 255, b * 255 ];}

colorCache = {};
function colorBrightness(rgb, multiplier) {
  const key = rgb.join(",")+":b"+multiplier;
  // if (colorCache[key]) return colorCache[key];
  let hsl = RGBtoHSL(rgb);
  hsl[2] = Math.min(1, hsl[2] * multiplier);
  hsl[0] = (hsl[0] * multiplier) % 1;
  colorCache[key] = HSLtoRGB(hsl).map((n) => Math.round(n));
  return colorCache[key];
}
function colorChange(rgb) {
  let hsl = RGBtoHSL(rgb);
  hsl[0] += randRange(2,5) / 10 * (Math.random() < 0.5 ? -1 : 1)
  hsl[2] *= 1 + (randRange(-1,1) / 10);
  hsl[2] = Math.max(0.2, Math.min(0.8, hsl[2]));
  return HSLtoRGB(hsl).map((n) => Math.round(n));
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

planetWidth = 200;
planetHeight = 120;
pixelSize = 6;
chunkSize = 4;
waterLevel = 0.45;
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
    "registry": defaultSubregistry()
  }
  for (let key in r) {
    r.registry[key] = r.registry._id;
    r.registry._id++;
  }
  return r;
}
function regCreate(subregistryName) {
  reg[subregistryName] = defaultSubregistry();
}
function regDelete(subregistryName) {
  delete reg[subregistryName];
}
function regAdd(subregistryName, object) {
  // if (!reg[subregistryName]) regCreate(subregistryName);
  object.id = reg[subregistryName]._id;
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
function regToArray(subregistryName) {
  return regFilter(subregistryName, (i) => !i.end);
}
function regSorted(subregistryName, sortBy, inverse) {
  sortBy = sortBy.split(".");
  let key = sortBy[0];
  let subkey = sortBy[1];

  let items = regToArray(subregistryName);

  if (subkey) {
    if (inverse) items.sort((a, b) => (a[key]||{})[subkey] - (b[key]||{})[subkey] );
    else items.sort((a, b) => (b[key]||{})[subkey] - (a[key]||{})[subkey] );
  }
  else {
    items = items.filter((item) => item[key] !== undefined);
    if (inverse) items.sort((a, b) => a[key] - b[key] );
    else items.sort((a, b) => b[key] - a[key] );
  }

  return items;
}
function regCount(subregistryName) {
  return regToArray(subregistryName).length;
}
function regFilter(subregistryName, check) {
  let results = [];
  for (let key in reg[subregistryName]) {
    if (!isNaN(reg[subregistryName][key])) continue;
    if (check(reg[subregistryName][key])) results.push(reg[subregistryName][key]);
  }
  return results;
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
function defaultTown() {
  return {
    "name": generateWord(3,true,wordComponents.prefixes.TOWN),
    "pop": 20,
    "color": choose(townColors),
    "type": "town",
    "resources": {},
    "size": 0,
    "jobs": {},
    "influences": {
      "birth": 1,
      // "happy": 0,
      // "crime": 0,
    },
    "legal": {}
  }
}

randomEvents = {};
dailyEvents = {};
function finalizeEvents() {
  randomEvents = {};
  dailyEvents = {};
  for (let eventClass in gameEvents) {
    let eventInfo = gameEvents[eventClass];
    if (eventInfo.daily) {
      dailyEvents[eventClass] = eventInfo;
    }
    else { // random: true
      randomEvents[eventClass] = eventInfo;
    }
  }
}
finalizeEvents();

function happen(targetClass, action, subject, target, args) {
  let actionFunc = actionables[targetClass].asTarget[action];
  let r = actionFunc(subject,target,args);
  if (r === 0) return r;
  return r || target;
}

function readyEvent(eventClass, subject=null, target=null) {
  if (!eventClass) return undefined;

  let args = {};

  const eventInfo = gameEvents[eventClass];

  if (!subject && eventInfo.subject && eventInfo.subject.reg) {
    let regname = eventInfo.subject.reg;
    if (eventInfo.subject.random) {
      subject = choose(regToArray(regname));
      if (!subject) return;
    }
    else if (eventInfo.subject.all) {
      subject = regToArray(regname);
      if (subject.length === 0) return;
    }
    else if (eventInfo.subject.id) {
      subject = regGet(regname,eventInfo.subject.id);
      if (!subject) return;
    }
  }

  if (!target && eventInfo.target && eventInfo.target.reg) {
    let regname = eventInfo.target.reg;
    if (eventInfo.target.random) {
      target = choose(regToArray(regname));
      if (!target) return;
    }
    else if (eventInfo.target.all) {
      target = regToArray(regname);
      if (target.length === 0) return;
    }
    else if (eventInfo.target.id) {
      target = regGet(regname,eventInfo.target.id)
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
          if (influences[influence] <= -10) return 0;
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
    "town",
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
    if (influence <= -10) return 0;
    if (influence > 0) value *= (influence/10 + 1);
    else value *= (1 - Math.abs(influence)/10)
  }
  return value;
}
function subtractInfluence(value, subject, influenceName) {
  if (subject.influences !== undefined && subject.influences[influenceName] !== undefined) {
    let influence = subject.influences[influenceName];
    if (influence >= 10) return 0;
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
  let planet = {
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
    unlockedExecutive: {}
  };
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
      if (chunk.e < waterLevel+0.05) chunk.m = 1;
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
    name: "mountains"
  },
  "snow": {
    color: [255,255,255],
    elevation: 0.6,
    temp: 0.1,
    moisture: 0.6,
    crop: null,
    hasLumber: true,
    name: "snowscape"
  },
  "desert": {
    color: [255,255,0],
    moisture: 0.3,
    elevation: 0.4,
    temp: 0.8,
    name: "desert"
  },
  "badlands": {
    color: [191, 159, 61],
    moisture: 0.5,
    elevation: 0.5,
    temp: 0.8,
    crop: null,
    infertile: true,
    name: "badlands"
  },
  "tundra": {
    color: [0, 209, 98],
    elevation: 0.5,
    temp: 0.3,
    moisture: 0.3,
    hasLumber: true,
    name: "tundra"
  },
  "wetland": {
    color: [145, 255, 0],
    moisture: 0.9,
    temp: 0.8,
    elevation: 0.5,
    hasLumber: true,
    name: "wetland"
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

    if (closestBiome) {
      chunk.b = closestBiome;
    }
  }
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
  for (let key in canvasLayers) {
    let ctx = canvasLayersCtx[key];
    canvasLayers[key].width = planetWidth;
    canvasLayers[key].height = planetHeight;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
  }
}
addCanvasLayer("terrain");
addCanvasLayer("highlight");
addCanvasLayer("cursor");
resizeCanvases();

function fitToScreen() {
  let width = Math.min(700,window.innerWidth-pixelSize);
  width -= width % pixelSize;
  mapCanvas.style.maxWidth = width+"px";
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

waterColors = ["#1949aa","#1949aa","#4573d0","#7a9bde","#b2cafc"];
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
          if (value < waterLevel) { // water colors
            value += 1-waterLevel;
            color = waterColors[Math.min(waterColors.length-1,Math.floor(value*(waterColors.length)))];
          }
          else { // land colors

            color = `rgb(${pixelColor[0] * value + 50},${pixelColor[1] * value + 50},${pixelColor[2] * value + 50})`;

          }
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

    // render chunk temperature
    // let temp = chunk.t;
    // ctx.fillStyle = "rgba(255,0,0,"+Math.min(temp-0.2,1)+")";
    // ctx.fillRect(chunk.x*chunkSize*pixelSize, chunk.y*chunkSize*pixelSize, chunkSize*pixelSize, chunkSize*pixelSize);
    // ctx.fillStyle = "rgba(0,0,255,"+Math.max(1-temp-0.2,0)+")";
    // ctx.fillRect(chunk.x*chunkSize*pixelSize, chunk.y*chunkSize*pixelSize, chunkSize*pixelSize, chunkSize*pixelSize);

    // render chunk moisture
    // let moisture = chunk.m;
    // ctx.fillStyle = "rgba(255,0,255,"+Math.min(moisture-0.2,1)+")";
    // ctx.fillRect(chunk.x*chunkSize*pixelSize, chunk.y*chunkSize*pixelSize, chunkSize*pixelSize, chunkSize*pixelSize);
    // ctx.fillStyle = "rgba(255,255,0,"+Math.max(1-moisture-0.2,0)+")";
    // ctx.fillRect(chunk.x*chunkSize*pixelSize, chunk.y*chunkSize*pixelSize, chunkSize*pixelSize, chunkSize*pixelSize);
  }
}

mousePos = null;
selectedChunk = null;
currentPlayer = null;
currentEvents = {};
recentEvents = [];
currentPopup = null;
promptState = null;
currentView = "terrain";
currentHighlight = null;
currentExecutive = null;
userSettings = {};

function handleEntityHover(e) {
  if (e.getAttribute("data-reg") === "town") {
    currentHighlight = parseInt(e.getAttribute("data-id"));
    renderHighlight()
    updateCanvas();
  }
}
function handleEntityHoverOut(e) {
  if (e.getAttribute("data-reg") === "town") {
    currentHighlight = null;
    renderHighlight()
    updateCanvas();
  }
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
  let checked = {};
  let tries = 0;
  let chunksX = Math.floor(planetWidth/chunkSize);
  let chunksY = Math.floor(planetHeight/chunkSize);
  let maxTries = chunksX*chunksY;
  while (tries < maxTries) {
    tries++;
    let chunkKey = randRange(0,chunksX) + "," + randRange(0,chunksY);
    if (checked[chunkKey] || !planet.chunks[chunkKey]) continue;
    if (check(planet.chunks[chunkKey])) return planet.chunks[chunkKey];
  }
  return null;
}
function filterChunks(check) {
  let results = [];
  for (let chunkKey in planet.chunks) {
    let c = planet.chunks[chunkKey];
    if (check(c)) results.push(c);
  }
  return results;
}




wordComponents = {};
wordComponents.C  = "B,C,D,F,G,H,J,K,L,M,N,P,QU,R,S,T,V,W,Y,Z";
wordComponents.C2 = wordComponents.C + ",X,CK,NG,SS";
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

badWords = window.atob('ZnVjLGZ1ayxzaGl0LG5pZ2csbmlnZSxmYWcsY29jLGNvayxib29iLGN1bQ==').split(",");

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

  else if (word.endsWith("y")) {
    word = word.substring(0, word.length-1);
    suffix = "ies";
  }
  else if (word.endsWith("man")) {
    word = word.substring(0, word.length-3);
    suffix = "men";
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
  else if (word.endsWith("man")) {
    word = word.substring(0, word.length-3);
    suffix = "";
  }

  if (suffix) word += suffix;
  return word;
}







function renderHighlight() {
  if (!viewData[currentView].showHighlight) return;

  let ctx = canvasLayersCtx.highlight;
  ctx.clearRect(0, 0, canvasLayers.highlight.width, canvasLayers.highlight.height);

  let chunks = filterChunks((c) => c.v.s !== undefined);
  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    let color = regGet("town",chunk.v.s).color;
    if (currentHighlight === chunk.v.s) {
      // color = color.map((x) => Math.floor(Math.min(255, x+30)))
      color = colorBrightness(color, 1.15);
    }
    color = color.join(",");
    ctx.fillStyle = "rgba("+color+",.33)";
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
  }
}

onMapClick = null;
onMapClickMsg = null;
function handleCursor(e) {
  const rect = mapCanvas.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
  
  x = Math.floor((x / mapCanvas.clientWidth) * planetWidth);
  y = Math.floor((y / mapCanvas.clientHeight) * planetHeight);
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
    else if (chunk.v.s) {
      hovered = true;
      highlight = chunk.v.s;
    }
  }
  
  if (hovered) {
    mapCanvas.style.cursor = "pointer";
  }
  else if (mapCanvas.style.cursor) {
    mapCanvas.style.cursor = "";
  }

  if (highlight !== currentHighlight) {
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
function deselectChunk() {
  selectedChunk = null;
  document.querySelector("#statsPanel .panelX").style.display = "none";
}
function handleMouseUp(e) {
  handleCursor(e);
  
  if (e.button == 0 || e.force !== undefined) { //left click
    if (onMapClick) {
      onMapClick(e);
    }
    else if (selectedChunk) {
      deselectChunk();
    }
    else {
      let chunk = planet.chunks[mousePos.chunkX+","+mousePos.chunkY];
      if (chunk) {
        if (viewData[currentView].click) viewData[currentView].click(chunk);
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
  handleCursor(touch);
  e.preventDefault();
},false)
mapCanvas.addEventListener("touchmove", (e) => {
  const touch = e.changedTouches[0];
  handleCursor(touch);
  e.preventDefault();
},false)
mapCanvas.addEventListener("touchend", (e) => {
  const touch = e.changedTouches[0];
  handleMouseUp(touch);
  mousePos = null;
  updateStats();
  renderCursor();
  updateCanvas();
})

window.addEventListener("keydown",(e) => {
  if(e.key === "Escape") {
    if (currentPopup) {
      closePopups();
      document.getElementById("gameDiv").focus();
    }
    else if (selectedChunk) {
      deselectChunk();
      updateStats();
    }
  }
})




function updateStats() {
  document.getElementById("dayNumber").innerText = planet.day;
  document.getElementById("dayNumberMobile").innerText = planet.day;
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
      html += `<td>` + parseText("{{face:"+town.id+"}}") + town.pop + `</td>`;
      html += `<td>` + "" + `</td>`;
      html += `</tr>`;
      // html += `<br>`;
    });
    html += `</table></span>`;

    html += `<span style="text-align:right">Total: ${ regToArray("town").reduce((n, {pop}) => n + pop, 0) }</span>`;
  }
  else {
    let chunk = selectedChunk || planet.chunks[mousePos.chunkX+","+mousePos.chunkY];
    if (chunk) {
      if (chunk.v.s) {
        let town = regGet("town",chunk.v.s);
        if (town) {
          html += `<span class="panelSubtitle">${parseText("{{regname:town|"+town.id+"}}")}</span>`;
          html += `<span style="text-align:center">${
            parseText(` {{num:${town.pop}|K}}{{icon:neutral|Population}}`) +
            parseText(` {{resourcetotal:${town.id}|crop}}{{icon:crop|Crops}}`) +
            parseText(` {{resourcetotal:${town.id}|lumber}}{{icon:lumber|Lumber}}`) +
            parseText(` {{resourcetotal:${town.id}|rock}}{{icon:rock|Rock}}`) +
            parseText(` {{resourcetotal:${town.id}|livestock}}{{icon:livestock|Livestock}}`)
          }</span><br>`;
          // html += `<span>Population: ${town.pop}</span>`;
        }
      }
      let localName = "Local";
      if (chunk.b === "water") {
        let waters = floodFill(chunk.x, chunk.y, (c) => c.b === "water", 60);
        let land = nearestChunk(chunk.x, chunk.y, (c) => c.v.g !== undefined)
        if (land && regGet("landmass",land.v.g).type === "island") localName = "bay";
        else if (waters.length < 20) localName = "lake";
        else if (waters.length < 50) localName = "sea";
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
        parseText("{{color|"+ Math.round(chunk.t*100) + "°|" +
        `rgb(${255*chunk.t},100,${255*(1-chunk.t)})`  + "}}")
      }</span>`;
      html += `<span>Moisture: ${
        parseText("{{color|"+ Math.round(chunk.m*100) + "%|" +
        `rgb(0,${255*(chunk.m+0.2)},${255*(chunk.m+0.2)})`  + "}}")
      }</span>`;
      html += `<span>Elevation: ${
        parseText("{{color|"+ Math.round(chunk.e*100) + "%|" +
        `rgb(${255*chunk.e},${255*(chunk.e+0.5)},${255*chunk.e})`  + "}}")
      }</span>`;
      if (chunk.b !== "water") {
        let fertility = happen("chunk","Fertility",null,chunk);
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
  let type = promptState.type || "text";
  let message = promptState.message;
  let popupInput = document.getElementById("popupInput");
  popupInput.childNodes.forEach((e) => {
    if (e.style) e.style.display = "none";
  })
  openPopup("promptPopup");
  document.getElementById("promptPopup").setAttribute("data-type",type);
  if (type === "text") {
    if (message !== null) message = message || "Something happened.";
    document.getElementById("popupOk").style.display = "";
  }
  else if (type === "confirm") {
    if (message !== null) message = message || "Are you sure?";
    document.getElementById("popupYes").style.display = "";
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
    popupContent.innerHTML = parseText(message);
    popupContent.style.display = "";
    popupTitle.style.paddingBottom = "0";
    popupInput.style.flexGrow = "";
  }
}
defaultPromptLimit = 32;
function handlePrompt(result) {
  if (!promptState) return;
  if (typeof result === "string") {
    result = result.replace(/[{<]/g, "[");
    result = result.replace(/[}>]/g, "]");
    result = result.substr(0,(promptState.limit || defaultPromptLimit))
  }
  if (promptState.func) promptState.func(result);
  handleX(document.querySelector("#promptPopup .panelX"));
  promptState = null;
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
    else preview.innerHTML = parseText(promptState.preview(e.target.value));
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
  if (title) {
    if (regName) title = `{{regname:${regName}|${obj.id}}}`;
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
  if (regName) {
    subtitle = titleCase(regName);
    if (obj.type && obj.type !== regName) subtitle += " ("+titleCase(obj.type)+")";
  }
  else if (obj.type) subtitle = titleCase(obj.type);
  if (obj.dems) subtitle += " of the "+obj.dems;
  if (subtitle) {
    let subtitleSection = document.createElement("div");
    subtitleSection.className = "regSection regSubTitle";
    let regSubTitle = document.createElement("span");
    regSubTitle.className = "regSubTitle";
    regSubTitle.innerHTML = subtitle;
    subtitleSection.appendChild(regSubTitle);
    regContent.appendChild(subtitleSection);
  }

  for (let key in regBrowserKeys) {
    let rkey = key;
    let split = null;
    if (obj[key] === undefined) {
      split = key.split(".");
      if (split.length < 2) continue;
      if (split[0] === regName || split[0] === obj.type) {
        key = split[1];
      }
      else continue;
      if (obj[key] === undefined) continue;
    }
    let section = document.createElement("div");
    section.className = "regSection";
    let sectionTitle = document.createElement("span");
    sectionTitle.className = "regSectionTitle";
    sectionTitle.innerHTML = parseText(regBrowserKeys[rkey]);
    section.appendChild(sectionTitle);

    let sectionValue = document.createElement("span");
    sectionValue.className = "regSectionValue";
    
    if (Array.isArray(obj[key])) {
      section.classList.add("regSectionArray");
      sectionValue.classList.add("regArray");
      let values = obj[key];
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
    else if (typeof obj[key] === "object") {
      section.classList.add("regSectionDict");
      sectionValue.classList.add("regDict");
      let subkeys = Object.keys(obj[key]);
      if (typeof obj[key][subkeys[0]] === "number") subkeys.sort((a,b) => obj[key][b] - obj[key][a]);

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

        let value = obj[key][subkey];
        if (typeof value === "number") {
          value = Math.round(value*100)/100;
        }
        if (regBrowserValues[subkey] === null) continue;
        else if (influenceModality[subkey] !== undefined && typeof value === "number") {
          let h = 60;
          h += Math.round((influenceModality[subkey] ? 1 : -1) * (60*value));
          h = Math.min(120,h);
          h = Math.max(0,h);

          let color = "hsl("+h+",80%,50%)";

          value = parseText("{{color:"+value+"|"+color+"}}");

        }
        else if (regBrowserValues[subkey]) {
          value = regBrowserValues[subkey](value, obj);
        }
        else if (regBrowserValues[regName + "." + subkey]) {
          value = regBrowserValues[regName + "." + subkey](value, obj);
        }
        valueSpan.innerHTML = parseText(value.toString());

        itemSpan.appendChild(keySpan);
        itemSpan.appendChild(valueSpan);
        sectionValue.appendChild(itemSpan);
      }
    }
    else {
      let value = obj[key];
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
    type: "planet",
    start: 0
  })
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
    name: data.name || biome,
    color: data.color,
    type: "biome",
    crops: crops,
    livestocks: livestocks
  })
}



function logMessage(text, type) {
  if (sunsetting && type !== "sunset") {
    logTomorrow(text, type);
    return;
  }
  let uuid = uuidv4();
  let html = `<span class="logMessage${type ? ' log'+titleCase(type) : ''}" id="logMessage-${uuid}" new="true">
  <span class="logDay">${planet.day}</span><span class="logText">${parseText(escapeHTML(text))}</span>
</span>`
  // <span class="logAct"><span>Yes</span><span>No</span></span>
  let logMessages = document.getElementById("logMessages");
  logMessages.insertAdjacentHTML("afterbegin",html);
  if (logMessages.childNodes.length > 100) {
    logMessages.removeChild(logMessages.lastChild);
  }
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
    elem.querySelector(".logText").innerHTML = parseText(escapeHTML(text));
  }
  return uuid;
}
function logSub(uuid,text) {
  let elem = document.getElementById("logMessage-"+uuid);
  if (elem) {
    let html = `<span class="logSub">${parseText(escapeHTML(text))}</span>`
    elem.insertAdjacentHTML("beforeend", html);
  }
  return uuid;
}
function clearLog() {
  document.getElementById("logMessages").innerHTML = "";
}
function logTomorrow(text, type) {
  planet.nextDayMessages.push([text,type]);
}
function logWarning(type, text) {
  if (planet.warnings[type] && planet.day - planet.warnings[type] < 10) return false;
  planet.warnings[type] = planet.day;
  (sunsetting ? logTomorrow : logMessage)(text, "warning");
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

  for (let i = 0; i < diffs.length; i++) {
    const key = diffs[i][0];
    const diff = diffs[i][1];
    
    if (diff) {
      let abs = Math.abs(diff);
      let modality = influenceModality[key];
      if (modality === undefined) modality = 1;
      if (modality === 0 && diff < 0) modality = 1;
      else if (modality === 0 && diff > 0) modality = 0;
      else if (diff < 0) modality = 0;

      text += "{{"+(modality ? "good" : "bad")+":";
      text += titleCase(key);
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


townsBefore = null;
sunsetting = false;

function nextDay(e) {
  if (e && e.target.getAttribute("disabled") === "true") return;

  if (recentEvents.length >= 3) recentEvents.shift();
  // recentEvents.shift();

  let oldMessages = document.querySelectorAll('.logMessage[new="true"]');
  oldMessages.forEach((elem) => {
    elem.removeAttribute("new");
  })
  for (let eventID in currentEvents) {
    let eventCaller = currentEvents[eventID];
    if (eventCaller.logID && !eventCaller.done) {
      fadeMessage(eventCaller.logID);
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
    console.log(minChange);
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

      if (msg) {
        sunsetMsg += `{{regname:town|${town.id}}} (` + msg.trim() + ") ";
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
      logMessage(m[0], m[1]);
    })
    planet.nextDayMessages = [];
  }

  if (!regCount("town") && !planet.dead) {
    logMessage("There are no more settlements on Planet {{planet}}.")
    planet.dead = true;
  }

  // skip events when failing additional checks
  for (let tries = 0; tries < 5; tries++) {
    let influencingTown = choose(regToArray("town"));
    let chosenEvent = chooseEvent(undefined,influencingTown);
    if (!chosenEvent) continue;
    let chosenSubject;
    let chosenTarget;
    if (gameEvents[chosenEvent].subject && gameEvents[chosenEvent].subject.reg === "town") chosenSubject = influencingTown;
    if (gameEvents[chosenEvent].target && gameEvents[chosenEvent].target.reg === "town") chosenTarget = influencingTown;
    eventCaller = readyEvent(chosenEvent, chosenSubject, chosenTarget);
    if (eventCaller && eventCaller.eventClass && randomEvents[eventCaller.eventClass].check && !randomEvents[eventCaller.eventClass].check(eventCaller.subject, eventCaller.target, eventCaller.args)) {
      recentEvents.push(eventCaller.eventClass);
      eventCaller = undefined;
    }
    else break;
  }

  if (eventCaller && !eventCaller.target && randomEvents[eventCaller.eventClass].target) eventCaller = undefined;
  if (eventCaller) {
    let eventID = eventCaller.eventID;
    currentEvents[eventID] = eventCaller;
    eventCaller.logID = logMessage(eventCaller.message);
    let messageElement = document.getElementById("logMessage-"+eventCaller.logID);
    let eventClass = eventCaller.eventClass;
    recentEvents.push(eventClass);
    messageElement.setAttribute("data-eventid",eventID)
    messageElement.setAttribute("data-eventclass",eventClass)
    let logText = messageElement.querySelector(".logText");
    let logAct = document.createElement("span");
    logAct.className = "logAct";
    let eventInfo = randomEvents[eventClass];
    if (eventInfo.value && eventInfo.value.ask) {

      let logAsk = document.createElement("span");
      logAsk.setAttribute("type","act");
      logAsk.setAttribute("role","button");
      logAsk.innerText = "Act";
      logAsk.addEventListener("click",(e) => {
        if (messageElement.getAttribute("done")) return;

        promptState = {
          type: "ask",
          message: eventInfo.value.message(eventCaller.subject, eventCaller.target) || eventCaller.message,
          func: (r) => {
            if (r) {
              eventCaller.args.value = r;
              doEvent(eventClass, currentEvents[eventID]);
              messageElement.removeAttribute("new");
              messageElement.setAttribute("done","true");
              e.target.setAttribute("selected","true");
              if (isFunction(eventInfo.messageDone)) {
                logChange(eventCaller.logID, eventInfo.messageDone(eventCaller.subject,eventCaller.target,eventCaller.args));
              }
              else if (eventInfo.messageDone) logChange(eventCaller.logID, eventInfo.messageDone);
              eventCaller.done = true;
              updateStats();
              renderMap();
              renderHighlight();
              updateCanvas();
            }
          },
          preview: eventInfo.value.preview
        }
        doPrompt();

      })

      logAct.appendChild(logAsk);

    }
    else if ((eventInfo.func || eventInfo.influences || eventInfo.influencesNo || eventInfo.messageNo) && !eventInfo.auto) {
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
          happen("town", "Influence", null, influencedTown, eventInfo.influences);
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
        updateStats();
        renderMap();
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
          happen("town", "Influence", null, influencedTown, eventInfo.influencesNo);
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
        updateStats();
        renderMap();
        renderHighlight();
        updateCanvas();
        autosave();
      })

      logAct.appendChild(logNo);
      logAct.appendChild(logYes);
    }
    messageElement.appendChild(logAct);

    if (eventInfo.auto) {
      doEvent(eventClass, currentEvents[eventID]);
      messageElement.setAttribute("done","true");
      eventCaller.done = true;
    }
  }
  else {
    logMessage("An uneventful day.");
  }

  if (e) {
    e.target.setAttribute("disabled","true");
    setTimeout(()=>{
      e.target.removeAttribute("disabled");
    }, 1000)
  }

  updateStats();
  // renderMap();
  renderHighlight();
  updateCanvas();

  autosave();
}

document.getElementById("nextDay").addEventListener("click",nextDay);
document.getElementById("nextDayMobile").addEventListener("click",nextDay);




function initGame() {
  if (!planet.reg) planet.reg = defaultRegistry();
  reg = planet.reg;

  // updateBiomes();
  
  if (parseInt(planet.day) !== planet.day) planet.day = 1;
  document.getElementById("dayNumber").innerText = planet.day;
  document.getElementById("dayNumberMobile").innerText = planet.day;
  
  if (!planet.name) planet.name = generateWord(undefined,true);
  document.getElementById("planetName").innerHTML = parseText("{{planet}}");

  clearLog();
  closeExecutive();

  currentPlayer = regGet("player", 1);
  if (!currentPlayer) {
    currentPlayer = happen("player","Create");
  }

  // remove any existing resources from biomes
  regToArray("resource").forEach((r) => {
    if (r.biome) {
      delete biomes[r.biome][r.type];
    }
  })
  
  if (reg.resource._id === 1) {
    happen("resource","Create",null,null,{ type:"raw", name:"lumber" });
    happen("resource","Create",null,null,{ type:"raw", name:"rock" });
    happen("resource","Create",null,null,{ type:"raw", name:"metal" });
    // happen("resource","Create",null,null,{ type:"crop", biome:"grass" })
    for (let biome in biomes) {
      if (biomes[biome].crop !== null) happen("resource","Create",null,null,{ type:"crop", biome:biome });
      if (biomes[biome].livestock !== null) happen("resource","Create",null,null,{ type:"livestock", biome:biome });
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
    logMessage("GenTown is in early beta. Most features are incomplete. Please report all issues.");
    onMapClickMsg = logMessage("Tap on the map to settle your town.");
    onMapClick = function(e) {
      let chunk = planet.chunks[mousePos.chunkX+","+mousePos.chunkY];
      if (chunk) {

        if (chunk.b !== "water" && chunk.b !== "mountain") {
          onMapClick = null;
          fadeMessage(onMapClickMsg);
          onMapClickMsg = null;
          let town = happen("town","Create",currentPlayer,null,{x:chunk.x, y:chunk.y});

          logMessage("The town of {{regname|town|"+town.id+"}} is founded.")
          document.getElementById("nextDay").removeAttribute("disabled");
          document.getElementById("nextDayMobile").removeAttribute("disabled");
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
    document.getElementById("nextDay").removeAttribute("disabled");
    document.getElementById("nextDayMobile").removeAttribute("disabled");
    townsBefore = JSON.parse(JSON.stringify(reg.town));
  }

  updateStats();
  renderMap();
  renderHighlight();
  updateCanvas();
}


// Views
viewData = {
  territory: {
    showTerrain: true,
    showHighlight: true
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
    showHighlight: true,
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
    // showHighlight: true,
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
    // showHighlight: true,
    colorFunction: "rgba(",
    chunkColor: (chunk) => {
      if (chunk.v.g === undefined) {
        chunk = nearestChunk(chunk.x, chunk.y, (c) => c.v.g !== undefined);
      }
      let color = reg.landmass[chunk.v.g].color;
      return [color[0],color[1],color[2],0.75]
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
function validatePlanet() {
  for (let chunkKey in planet.chunks) {
    let chunk = planet.chunks[chunkKey];
    if (!biomes[chunk.b]) chunk.b = "water";
    if (!chunk.v) chunk.v = {};
    if (chunk.v.s && !reg.town[chunk.v.s]) delete chunk.v.s;
  }
}

unicodeSkips = {
  0: 65, // null -> A
  58: 65, // : -> A
  91: 97, // [ -> a
  123: 192, // { -> À
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

  json.codes = codesReverse;
  json.chunkData = chunkData;

  return json;
}

function parseSave(json) {
  planet = json.planet;
  reg = json.planet.reg;
  planetHeight = json.planetHeight;
  planetWidth = json.planetWidth;
  chunkSize = json.chunkSize;
  waterLevel = json.waterLevel;

  planet.created = json.meta.created || json.meta.saved || Date.now();
  planet.saved = json.meta.saved || json.meta.created || Date.now();

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

  validatePlanet();

  initGame();
  logMessage("The Sun rises on Planet {{planet}}...")
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

  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    let actionItem = document.createElement("span");
    actionItem.className = "actionItem";

    let text;
    if (typeof item === "string") text = item;
    else text = item.text || "Option #"+i;
    actionItem.innerHTML = parseText(text);

    if (item.id) actionItem.id = "actionItem-"+item.id;
    if (item.indent) actionItem.style.marginLeft = item.indent + "em";
    if (item.opacity) actionItem.style.opacity = item.opacity;
    if (item.hide && (!item.id || !planet.unlockedExecutive || !planet.unlockedExecutive[item.id])) actionItem.style.display = "none";

    actionItem.addEventListener("click", (e) => {
      e.target.classList.remove("notify");
    })

    if (item.func) {
      actionItem.addEventListener("click", item.func);
      actionItem.classList.add("clickable");
      actionItem.setAttribute("role","button");
    }

    subpanelList.appendChild(actionItem);
  }

  subpanel.style.display = "flex";
}

function closeExecutive() {
  document.getElementById("actionMain").style.display = "flex";
  document.getElementById("actionSub").style.display = "none";
  document.getElementById("actionSubList").innerHTML = "";
  currentExecutive = null;
}
document.getElementById("actionSubpanelClose").addEventListener("click",closeExecutive)



window.addEventListener("load", function(){ //onload

  document.getElementById("gameLoading").style.display = "none";
  document.getElementById("gameDiv").style.display = "flex";
  document.getElementById("actionAbout").addEventListener("click",()=>{
    doPrompt({ type:"text", message:document.getElementById("blurbAbout").innerText });
  })

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

  if (R74n.has("GenTownSettings")) {
    userSettings = JSON.parse(R74n.get("GenTownSettings"));
    if (userSettings.view) setView(userSettings.view);
  }

  document.querySelector("#gameHalf2 .panelX").addEventListener("click", closeExecutive);

  populateExecutive([
    {
      text: "Towns",
      id: "towns",
      hide: true,
      func: () => {
        let items = [];
        regToArray("town").forEach((town) => {
          items.push({
            text: `{{regname:town|${town.id}}}`,
            func: () => regBrowse("town", town.id)
          });
        })
        populateExecutive(items, "Towns ("+items.length+")");
      }
    },
    {
      text: "Unlocks",
      id: "unlocks",
      hide: true,
      func: () => {
        let items = [];
        for (let type in unlockTree) {
          if (!planet.unlocks[type]) continue;
          let levels = unlockTree[type].levels;
          for (let i = 0; i < levels.length; i++) {
            const levelData = levels[i];
            if (planet.unlocks[type] >= levelData.level) {
              items.push({
                text: levelData.name,
                indent: i
              })
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
      }
    },
    {
      text: "Almanac",
      id: "almanac",
      hide: true,
      func: () => {
        let items = [];
        regSorted("resource", "rate").forEach((resource) => {
          if (resource.type !== "crop" && resource.type !== "livestock") return;
          if (resource.rate === 1 || resource.rate === undefined) return;
          items.push({
            text: `{{icon:${resource.type}}} {{regname:resource|${resource.id}}} (${resource.rate}x)`,
            func: () => regBrowse("resource", resource.id)
          });
        })
        populateExecutive(items, "Resources");
      }
    }
  ], undefined, true)

  document.getElementById("actionSaves").addEventListener("click",() => {
    populateExecutive([
      {
        text: "Reset Progress",
        func: () => {
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
            }
          })
        }
      }
    ], "Save Options")
  })
  
  document.getElementById("actionBeta").addEventListener("click",() => {
    populateExecutive([
      { text: "{{check}} Towns" },
      { text: "{{check}} Jobs" },
      { text: "{{check}} Resources" },
      { text: "{{check}} Unlocks" },
      { text: "{{check}} Starvation" },

      { text: "{{x}} Migration" },
      { text: "{{x}} Settings" },
      { text: "{{x}} Linguistics" },
      { text: "{{x}} Laws" },
      { text: "{{x}} Revolutions / Merging" },
      { text: "{{x}} Economy / Trade" },
      { text: "{{x}} Diplomacy / Wars" },
    ], "Beta Progress")
  })

})