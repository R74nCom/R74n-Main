constants = {
	defaultPlanetWidth: 200,
	defaultPlanetHeight: 120,
	defaultPixelSize: 6,
	defaultChunkSize: 4,
	markerResolution: 2,
	defaultWaterLevel: 0.4,
	maxPopulationPerChunk: 20,
	maxPopulation: (subject) => subject.size * $c.maxPopulationPerChunk,
	maxResourcePerChunk: 5,
	maxResource: (subject) => {
		let max = 0;
		let size = subject.size;
		if (size >= 5) {
			max += size * ($c.maxResourcePerChunk * 4);
			size -= 5;
		}
		max += size * $c.maxResourcePerChunk;
		return max;
	},
	baseBirthRate: 0.02,
	baseDeathRate: 0.008,
	baseExpandRate: 0.5,
	baseColonyRate: 0.05,
	colonyCooldown: 25,
	daysPerColony: 30,
	colonyNameSuffixRate: 0.2,
	baseDecayRate: 0.75,
	minPopulationDensity: 0.1,
	baseEatRate: 0.2,
	noFoodHappyInfluence: -1.25,
	lowFoodHappyInfluence: -0.75,
	baseEmployRate: 0.05,
	baseResourceRate: 0.05,
	maxInfluence: 10,
	minInfluence: -10,
	townProjectCooldown: 30,
	townSyllables: 3,
	warningCooldown: 20,

	RARE: 3,
	UNCOMMON: 5,
	COMMON: 10,
	SUPERCOMMON: 15
}

$c = constants;


actionables = {

	player: {
		reg: "player",
		asTarget: {
			Create: (subject,target,args) => {
				target = regAdd("player",{});
				return target;
			},
			Unlock: (subject,target,args) => {
				let type = args.value.type;
				let levelData = args.value.levelData;
				planet.unlocks[type] = levelData.level;
				if (levelData.messageTomorrow) logTomorrow(levelData.messageTomorrow);
				document.getElementById("actionItem-unlocks").classList.add("notify");
				if (levelData.func) {
					levelData.func(subject,target,args);
				}
				unlockExecutive("unlocks");
			}
		}
	},

	resource: {
		reg: "resource",
		asTarget: {
			Create: (subject,target,args) => {
				target = regAdd("resource",{
					name: args.name || generateWord(randRange(1,2),false),
					type: args.type || "raw", //raw, crop, or livestock
					biome: args.biome,
					rate: 1
				});
				if (args.color) target.color = args.color;
				else if (args.biome) target.color = biomes[args.biome].color
				if (target.biome) {
					if (!biomes[target.biome][target.type]) biomes[target.biome][target.type] = [];
					biomes[target.biome][target.type].push(target.id);
				}

				if (!args.name && target.type === "livestock" && biomes[target.biome] && biomes[target.biome].adj) {
					let fromBiome = choose(Object.keys(biomes));
					if (fromBiome !== target.biome && biomes[fromBiome].livestock) {
						let fromLivestock = regGet("resource",choose(biomes[fromBiome].livestock));
						if (fromLivestock && fromLivestock.name) {
							target.name = choose(biomes[target.biome].adj) + " " + fromLivestock.name;
							target.ancestor = fromLivestock.id;
						}
					}
				}

				return target;
			},
			Boost: (subject,target,args) => {
				if (target.domesticated === undefined) target.domesticated = planet.day;
				target.rate = (target.rate||1) + (args.value||0.5);
				target.rate = Math.round(target.rate * 100) / 100;
				return target;
			}
		}
	},

	town: {
		reg: "town",
		asTarget: {
			Create: (subject,target,args) => {
				target = defaultTown();
				if (args.pop !== undefined) target.pop = args.pop;
				target.id = reg.town._id;
				if (args && args.x && args.y) {
					let x = args.x; let y = args.y;
					let chunk = chunkAt(x, y);
					if (chunk) {
						let done = 0;
						let chunks = [];
						let newChunks = floodFill(chunk.x, chunk.y, (c) => c.b !== "water" && c.b !== "mountain" && !c.v.s, 5, (c) => (c.v.s && c.v.s !== chunk.v.s) || c.b === "water" || c.b === "mountain")
						newChunks.forEach(newChunk => {
							newChunk.v.s = target.id;
							chunks.push(newChunk);
							done++;
						})
						if (done) {
							target.size += chunks.length;
							chunks.forEach((c) => {
								if (biomes[c.b].crop) {
									happen("AddResource",null,target,{ type:"crop", count:20 })
								}
							});
							if (target.size <= 2) target.type = "microtown";
							unlockExecutive("towns");
							target.startBiome = chunk.b;
							// names
							let prefix = "";
							if (chunkIsNearby(x, y, (c) => c.b === "mountain", 5)) { //Monte-
								target.name = generateWord($c.townSyllables-1, true);
								prefix = choose(wordComponents.prefixes.MOUNTAINOUS)[0];
							}
							else if (Math.random() < 0.25 && chunkIsNearby(x, y, (c) => c.b === "water", 2)) { //Cape-
								prefix = choose(wordComponents.prefixes.WATERFRONT)[0];
							}
							if (prefix) {
								if (target.name.includes(" ")) target.name = titleCase(target.name.replace(/ /," "+prefix).toLowerCase());
								else target.name = titleCase((prefix + target.name).toLowerCase());

								target.name = target.name.replace(/(.)\1\1/g, '$1$1');
							}
							regAdd("town",target);
							happen("UpdateCenter", subject, target);
						}
						else return false;
					}
				}
				return target;
			},
			Rename: (subject,target,args) => {
				if (!target) return;
				target.name = titleCase(args.value);
				return target;
			},
			Recolor: (subject,target,args) => {
				if (!target) return;
				target.color = args.value;
				return target;
			},
			UpdateCenter: (subject,target,args) => {
				let chunkList = filterChunks((c) => c.v.s === target.id);
				let groups = [];
				let done = {};

				let n = 0;
				chunkList.forEach((c) => {
					if (done[c.x + "," + c.y] !== undefined) return;
					let members = floodFill(c.x, c.y, (c) => c.v.s === target.id);
					groups.push(members);
					members.forEach((m) => {
						done[m.x + "," + m.y] = n;
					})
					n ++;
				})

				if (!n) return false;

				const lengths = groups.map(a=>a.length);
				let largest = groups[lengths.indexOf(Math.max(...lengths))];
				
				let x = 0;
				let y = 0;
				largest.forEach((c) => {
					x += c.x;
					y += c.y;
				})
				x = Math.round(x / largest.length);
				y = Math.round(y / largest.length);

				let result = nearestChunk(x, y, (c) => c.v.s === target.id);
				target.center = [result.x, result.y];

				return target;
			},
			Landmasses: (subject,target,args) => {
				return [...new Set(filterChunks((c) => c.v.s === target.id).map((c) => c.v.g))];
			},
			CountResource: (subject,target,args) => {
				if (!target.resources) return 0;
				if (!target.resources[args.type]) return 0;
				return target.resources[args.type];
			},
			AddResource: (subject,target,args) => {
				let type = args.type;
				if (!target.resources) target.resources = {};
				let inv = target.resources;
				if (inv[type] === undefined) inv[type] = 0;
				inv[type] += args.count || 1;
				let max = $c.maxResource(target);
				if (inv[type] > max) inv[type] = max;
			},
			RemoveResource: (subject,target,args) => {
				let type = args.type;
				if (!target.resources) target.resources = {};
				let inv = target.resources;
				if (inv[type] === undefined) return;
				inv[type] -= Math.max(0, args.count || 1);
				if (inv[type] <= 0) delete inv[type];
			},
			Influence: (subject,target,args) => {
				let done = args.done || [];

				if (args.temp && target.influencesTemp === undefined) target.influencesTemp = {};

				for (let key in args) {
					if (allInfluences[key] === undefined) continue;
					if (args.done && args.done.includes(key)) continue;
					if (influenceNeedsUnlock[key] && !planet.unlocks[influenceNeedsUnlock[key]]) continue;
					done.push(key);

					let amount = args[key];
					let change = Math.abs(target.influences[key]) * Math.abs(amount) + Math.abs(amount);

					let before = target.influences[key] || 0;

					if (!target.influences[key]) target.influences[key] = amount;
					else if (amount > 0) target.influences[key] += change;
					else target.influences[key] -= change;

					// minimum and maximum influence
					if (target.influences[key] > $c.maxInfluence) target.influences[key] = $c.maxInfluence;
					else if (target.influences[key] < $c.minInfluence) target.influences[key] = $c.minInfluence;

					if (args.temp) {
						let diff = target.influences[key] - before;
						target.influencesTemp[key] = (target.influencesTemp[key]||0) + diff;
						if (target.influencesTemp[key] > $c.maxInfluence) target.influencesTemp[key] = $c.maxInfluence;
						else if (target.influencesTemp[key] < $c.minInfluence) target.influencesTemp[key] = $c.minInfluence;
					}
					
					if (influenceEffects[key]) {
						let effects = influenceEffects[key];
						for (let effect in effects) {
							let args2 = { done: done, temp: args.temp };
							args2[effect] = effects[effect] * amount;
							happen("Influence", subject, target, args2);
						}
					}
				}
			},
			EaseInfluences: (subject,target,args) => {
				if (target.influencesTemp === undefined) return;
				let keys = Object.keys(target.influencesTemp);
				if (!keys.length) return;

				for (let i = 0; i < keys.length; i++) {
					const key = keys[i];

					let diff = target.influencesTemp[key];
					if (diff > 0.5) diff = 0.5;
					else if (diff < -0.5) diff = -0.5;

					target.influences[key] -= diff;
					target.influencesTemp[key] -= diff;

					if (Math.abs(target.influencesTemp[key]) <= 0.01) {
						delete target.influencesTemp[key];
					}
				}

				return target;
			},
			Legality: (subject,target,args) => {
				let law = args.law;
				let split = law.split(".");
				let influence = split[0];
				let sublaw = split[split.length - 1];
				if (target.legal[law] === undefined) {
					return !!influenceModality[influence];
				}
				return target.legal[law];
			},
			AddPop: (subject,target,args) => {
				const pop = target.pop;
				const maxPop = $c.maxPopulation(target);
				if (pop >= maxPop) return;

				let count = args.count || 1;
				let maxChange = maxPop - pop;
				count = Math.min(count, maxChange);

				target.pop += count;

				return {count: count};
			},
			RemovePop: (subject,target,args) => {
				let pop = target.pop;
				let count = args.count || 1;
				count = Math.min(count, pop);
				target.pop -= count;

				let jobCount = {};

				// Remove workers
				let jobs = Object.keys(target.jobs);
				for (let i = 0; i < count; i++) {
					let job = choose(jobs);
					if (target.jobs[job] <= 0) continue;
					if (Math.random() < (target.jobs[job] / pop)) {
						target.jobs[job] --;
						if (jobCount[job] === undefined) jobCount[job] = 0;
						jobCount[job] ++;
					}
				}

				// Ensure workers are removed if greater than population
				let employed = sumValues(target.jobs);
				while (employed > target.pop) {
					let job = choose(jobs);
					if (target.jobs[job] <= 0) continue;
					if (jobCount[job] === undefined) jobCount[job] = 0;
					jobCount[job] ++;
					target.jobs[job] --;
					employed --;
				}

				if (target.pop <= 0) {
					happen("End",subject,target);
				}

				return {count:count, jobs:jobCount};
			},
			Death: (subject,target,args) => {
				let count = happen("RemovePop",subject,target, {count:args.count || 1});
				statsAdd("death", count.count);
				if (args.cause !== undefined) statsAdd("deathBy."+args.cause, count.count);
				return count;
			},
			Migrate: (subject,target,args) => {
				let pop = subject.pop;
				let count = args.count || 1;
				count = Math.min(subject.pop, count);
				count = Math.min($c.maxPopulation(target), count);

				// population
				let removed = happen("RemovePop",null,subject,{count:count});
				count = removed.count;
				happen("AddPop",null,target,{count:count});
				
				// jobs
				let jobCount = removed.jobs;
				for (let job in jobCount) {
					if (target.jobs[job] === undefined) target.jobs[job] = jobCount[job];
					else target.jobs[job] += jobCount[job];
				}

				// resources
				let resources = Object.keys(subject.resources);
				if (sumValues(subject.resources)) {
					for (let i = 0; i < count; i++) {
						let resource = choose(resources);
						if (subject.resources[resource] <= 0) continue;
						if (Math.random() < (subject.resources[resource] / pop)) {
							happen("RemoveResource", null, subject, {type:resource, count:1});
							happen("AddResource", null, target, {type:resource, count:1});
						}
					}
				}

				// influences
				let influences = {};
				for (let key in subject.influences) {
					influences[key] = subject.influences[key] * 0.05;
				}
				delete influences.happy;
				happen("Influence", subject, target, influences);

			},
			Unclaim: (subject,target,args) => {
				const x = args.x;
				const y = args.y;
				const chunk = chunkAt(x,y);
				if (!chunk) return false;

				let response = {};

				if (chunk.v.m) {
					const marker = regGet("marker", chunk.v.m);
					happen("End", null, marker);
					delete chunk.v.m;
					response.marker = marker.id;
				}
				delete chunk.v.s;
				target.size --;

				if (target.size <= 0) {
					happen("End", null, target);
				}

				return response;
			},
			End: (subject,target,args) => {
				logMessage(`{{regname:town|${target.id}}} has fallen.`, "warning");
				filterChunks((c) => c.v.s === target.id).forEach(c => {
					delete c.v.s;
				});
				regFilter("marker", (m) => m.town === target.id).forEach((m) => {
					m.end = planet.day;
				})
				// regRemove("town", target.id);
				target.end = planet.day;
				target.size = 0;
				target.pop = 0;
				target.jobs = {};
				target.influences = {};
				target.resources = {};
				target.type = "ghost "+(target.type || "town");
				renderHighlight();
				updateCanvas();
			}
		}
	},

	process: {
		reg: "process",
		asTarget: {
			Create: (subject,target,args) => {
				target = regAdd("process",{
					type: args.type
				});

				if (args.name) target.name = args.name;
				if (subject && subject.id && subject._reg === "town") {
					target.town = subject.id;
				}
				if (!isNaN(args.x)) target.x = args.x;
				if (!isNaN(args.y)) target.y = args.y;
				if (!isNaN(args.cost)) {
					target.cost = args.cost;
					target.total = args.cost;
				}
				if (args.subtype) {
					target.subtype = args.subtype;
					target.name = titleCase(target.subtype);
				}
				if (args.chunks) target.chunks = args.chunks;
				if (args.duration) target.duration = args.duration;

				if (target.type === "project") {
					unlockExecutive("projects");
					let data = actionables.process._projectSubtypes[target.subtype] || {};
					if (data.symbol) target.symbol = data.symbol;
					if (data.color) target.color = data.color;
				}
				else if (target.type === "disaster") {
					let data = actionables.process._disasterSubtypes[target.subtype] || {};
					if (data.symbol) target.symbol = data.symbol;
					target.color = data.color || [255,0,0];
				}
				
				return target;
			},
			Finish: (subject,target,args) => {
				if (target.done) return false;
				target.done = planet.day;

				if (target.subtype && target.type === "project" && target.town) {
					unlockExecutive("timeline");

					let data = actionables.process._projectSubtypes[target.subtype] || {};
					let influences = {};
					if (data.influences) {
						for (let influence in data.influences) {
							if (influenceNeedsUnlock[influence] && !planet.unlocks[influenceNeedsUnlock[influence]]) continue;
							influences[influence] = data.influences[influence];
						}
					}
					happen("Influence", null, regGet("town",target.town), influences);

					delete target.cost;

					let x = target.x;
					let y = target.y;
					let chunk = null;
					if (target.x === undefined || target.y === undefined) {
						let choices = filterChunks((c) => {
							if (c.v.s !== target.town) return false;
							if (c.v.m) return false;
							if (target.center && c.x === target.center[0] && c.x === target.center[1]) return false;

							for (let i = 0; i < adjacentCoords.length; i++) {
								let coords = adjacentCoords[i];
								let c2 = chunkAt(c.x + coords[0], c.y + coords[1]);
								if (!c2 || c2.v.s !== c.v.s) return false;
							}

							return true;
						})
						chunk = choose(choices);
						if (chunk) {
							x = chunk.x;
							y = chunk.y;
						}
						else return target;
					}
					else {
						delete target.x;
						delete target.y;
					}

					let landmark = happen("Create", target, null, {
						// name: titleCase(target.subtype),
						named: false,
						type: "landmark",
						subtype: target.subtype,
						x: x,
						y: y,
						symbol: target.symbol,
						color: target.color
					}, "marker")
					target.marker = landmark.id;
					landmark.process = target.id;

					if (chunk) chunk.v.m = landmark.id;
				}

				if (target.subtype && target.type === "disaster") {
					let data = actionables.process._disasterSubtypes[target.subtype] || {};

					if (target.deaths || target.injuries) unlockExecutive("timeline");
					else {
						data.delete = true;
					}

					delete target.chunks;
				}

				delete target.color;
				delete target.symbol;
				delete target.duration;

				return target;
			},
			Cancel: (subject,target,args) => {
				if (target.end) return false;
				target.end = planet.day;
				delete target.color;
				delete target.symbol;
				delete target.duration;
				return target;
			}
		},
		_projectSubtypes: {
			"park": {
				symbol: "🌴",
				color: [63, 163, 0],
				influences: { happy:1 },
				nameTemplate: "$ Park"
			},
			"skatepark": {
				symbol: "u",
				color: [103, 128, 102],
				influences: { happy:0.5, crime:1 },
				needsUnlock: { travel:40 },
				nameTemplate: "$ Park"
			},
			"school": {
				symbol: "☗",
				color: [214, 180, 79],
				influences: { education:1 },
				needsUnlock: { education:10 },
				nameTemplate: "$ School"
			},
			"university": {
				symbol: "☗",
				color: [235, 218, 66],
				influences: { education:1.5 },
				needsUnlock: { education:30 },
				nameTemplate: "$ University"
			},
			"prison": {
				symbol: "⌧",
				color: [163, 89, 85],
				influences: { crime:-1 },
				needsUnlock: { government:10 },
				nameTemplate: "$ Prison"
			},
			"fortress": {
				symbol: "▙▟",
				color: [176, 148, 172],
				influences: { military:1 },
				needsUnlock: { military:10 },
				nameTemplate: "Fort $"
			},
			"market": {
				symbol: "📊",
				color: [0, 145, 82],
				influences: { trade:1, disease:0.1 },
				needsUnlock: { trade:10 },
				nameTemplate: "$ Plaza"
			},
			"farmland": {
				symbol: "░",
				color: [94, 204, 82],
				influences: { farm:1 },
				needsUnlock: { farm:10 },
				nameTemplate: "$ Farm"
			},
			"factory": {
				symbol: "📁",
				color: [176, 176, 176],
				influences: { trade:1, happy:-0.25, disease:0.1 },
				needsUnlock: { farm:40 },
				nameTemplate: "$ Factory"
			},
			"highway": {
				symbol: "ǁ",
				color: [110, 110, 110],
				influences: { travel:2, trade:2, happy:-1 },
				needsUnlock: { travel:40 },
				nameTemplate: "Route $"
			}
		},
		_disasterSubtypes: {
			"wildfire": {
				location: "land",
				radius: 2,
				message: "Brush catches fire, causing [NAME] $.",
				messageDone: "[NAME] $ is extinguished.",
				color: [255, 0, 0],
				excludeBiome: ["snow"],
				
				deathRate: 1,
				destroy: true,
				spread: 1
			},
			"hurricane": {
				location: "shore",
				radius: 3,
				message: "[NAME] forms $.",
				messageDone: "[NAME] $ settles down.",
				color: [114, 122, 122],
				
				deathRate: 0.2,
				destroy: true,
				spread: 1,
				move: 1
			},
			"earthquake": {
				location: "any",
				radius: 5,
				message: "Seismic activity causes [NAME] $.",
				messageDone: "[NAME] stops rumbling $.",
				color: [140, 107, 65],

				deathRate: 1.5,
				destroy: true,
				duration: 1
			}
		}
	},

	marker: {
		reg: "marker",
		asTarget: {
			Create: (subject,target,args) => {
				target = regAdd("marker", {
					name: args.name,
					type: args.type || "marker",
					x: args.x,
					y: args.y,
					symbol: args.symbol || "⏺",
					color: args.color || [176, 176, 153]
				})
				if (args.x !== undefined) {
					let townID = chunkAt(args.x, args.y).v.s;
					if (townID) target.town = townID;
				}
				if (args.subtype) target.subtype = args.subtype;
				if (args.named === false) target.named = false;

				return target;
			},
			End: (subject,target,args) => {
				target.end = planet.day;
				filterChunks((c) => c.v.m === target.id).forEach((c) => {
					delete c.v.m;
				})
				if (target.type !== "landmark") regRemove("marker", target.id);
			}
		}
	},

	chunk: {
		reg: null,
		asTarget: {
			Fertility: (_,target) => {
				if (target.m === 0) return 0;
				if (biomes[target.b].infertile) return 0;

				let fertility = 4;
				fertility -= Math.abs(1-target.m)*2;
				fertility -= Math.abs(0.5-target.t);
				fertility -= Math.abs(0.5-target.e);

				fertility = fertility/4;
				fertility = Math.ceil(fertility * 10) / 10;

				return fertility;
			}
		}
	}

}









gameEvents = {

	/* DAILY EVENTS */

	"townBirth": {
		daily: true,
		subject: { reg: "town", all: true },
		func: (subject, target, args) => {
			let pop = subject.pop;
			if (pop < 2) return;
			const maxPop = $c.maxPopulation(subject);
			if (pop >= maxPop) return;
			let birthRate = addInfluence($c.baseBirthRate, subject, "birth");
			let popChange = pop*birthRate;
			if (pop+popChange > maxPop) {
				popChange = maxPop - pop;
			}
			
			if (Math.random() < (popChange % 1)) popChange += 1;
			popChange = Math.floor(popChange);

			if (popChange) {
				let count = happen("AddPop", null, subject, {count: popChange}).count;
				statsAdd("birth", count);
			}
		}
	},
	"townDeath": {
		daily: true,
		subject: { reg: "town", all: true },
		func: (subject, target, args) => {
			let pop = subject.pop;
			if (pop <= 0) return;
			let deathRate = addInfluence($c.baseDeathRate, subject, "disease");
			let popChange = pop*deathRate;
			if (popChange > pop) {
				popChange = pop;
			}

			if (Math.random() < (popChange % 1)) popChange += 1;
			popChange = Math.floor(popChange);

			if (popChange) happen("Death", null, subject, { count: popChange, cause: "natural" });
		}
	},
	"townExpand": {
		daily: true,
		subject: { reg: "town", all: true },
		func: (subject, target, args) => {
			let expandRate = addInfluence($c.baseExpandRate + (subject.size/50), subject, "travel");
			
			if ((subject.pop === 1 || subject.pop/subject.size <= $c.minPopulationDensity)) return;

			if (Math.random() < expandRate) {
				let chunk = randomChunk((c) => c.v.s === subject.id);
				if (chunk) {
					let newChunk = nearestChunk(chunk.x, chunk.y, (c) => c.v.s === undefined && c.b !== "water", (c) => c.b === "water" || c.b === "mountain" || (c.v.s && c.v.s !== subject.id));
					if (newChunk) {
						let colonyRate = $c.baseColonyRate;
						
						// One town per 30 days
						if (!(regCount("town") < Math.ceil(planet.day / $c.daysPerColony))) colonyRate = 0;
						else if (subject.size <= 10 || (subject.lastColony !== undefined && planet.day-subject.lastColony < 25)) colonyRate = 0;
						else if (subject.lastColony !== undefined && planet.day-planet.lastColony < 25) colonyRate = 0;
						else if (subject.pop <= 2) colonyRate = 0;
						else {
							colonyRate = subtractInfluence(colonyRate, subject, "happy");
							colonyRate = addInfluence(colonyRate, subject, "travel");
							if (chunk.v.g !== newChunk.v.g) colonyRate *= 2;
						}

						if (Math.random() < colonyRate) {
							let limit = Math.floor(addInfluence(50, subject, "travel"));
							let possibleChunks = floodFill(newChunk.x, newChunk.y, (c) => c.v.s === undefined && !biomes[c.b].infertile && c.b !== "water" && c.b !== "mountain", limit );
							let colonyChunk = choose(possibleChunks);
							if (!colonyChunk) return;

							let newTown = happen("Create", subject, null, {x:colonyChunk.x, y:colonyChunk.y, pop:0}, "town");
							subject.lastColony = planet.day;
							planet.lastColony = planet.day;
							newTown.lastColony = planet.day - $c.colonyCooldown;
							newTown.color = colorChange(subject.color);
							newTown.former = subject.id;
							newTown.type = newTown.size <= 2 ? "microtown" : "colony";
							newTown.level = 10;
							newTown.legal = structuredClone(subject.legal);
							if (Math.random() < $c.colonyNameSuffixRate) {
								let newName = "";
								let mainName = subject.name.match(/\S+$/)[0].toLowerCase();
								if (Math.random() < 0.5) {
									let horizontal = colonyChunk.x - subject.center[0];
									let vertical = colonyChunk.y - subject.center[1];
									if (Math.abs(vertical) > Math.abs(horizontal)) { // NS
										if (vertical > 0) newName += choose(wordComponents.prefixes.SOUTH)[0];
										else newName += choose(wordComponents.prefixes.NORTH)[0];
									}
									else { // EW
										if (horizontal > 0) newName += choose(wordComponents.prefixes.EAST)[0];
										else newName += choose(wordComponents.prefixes.WEST)[0];
									}
									newName += mainName;
								}
								else {
									newName = choose(wordComponents.prefixes.NEW)[0] + mainName;
								}
								if (newName && !usedNames[newName]) {
									newTown.name = titleCase(newName);
									usedNames[newName] = true;
								}
							}
							// Colony migration
							let migrateCount = 2;
							if (subject.influences.happy < 0) {
								migrateCount = randRange(subject.pop*0.1, subject.pop*0.9);
								logMessage("Unhappy with life in {{regname:town|"+subject.id+"}}, settlers found {{regname:town|"+newTown.id+"}}.")
							}
							else {
								migrateCount = randRange(subject.pop*0.05, subject.pop*0.25);
								logMessage("{{c:Settlers|Travelers}} from {{regname:town|"+subject.id+"}} found {{regname:town|"+newTown.id+"}}.")
							}
							migrateCount = Math.max(Math.round(migrateCount), 2);
							happen("Migrate", subject, newTown, {count: migrateCount});
						}
						else {
							newChunk.v.s = subject.id;
							subject.size++;
							if (Math.random() < 0.25) happen("UpdateCenter", null, subject);
						}
					}
				}
			}
		}
	},
	"townBoat": {
		random: true,
		auto: true,
		subject: { reg: "town", random: true },
		value: (subject, _) => {
			let landmasses = happen("Landmasses", null, subject);
			let chunk = randomChunk((c) => c.v.s === subject.id);
			if (!chunk) return false;
			newChunk = nearestChunk(chunk.x, chunk.y, (c) => c.v.s === undefined && c.b !== "water" && c.b !== "mountain" && !landmasses.includes(c.v.g), (c) => c.v.s && c.v.s !== subject.id);
			if (!newChunk) return false;
			return newChunk;
		},
		func: (subject, _, args) => {
			let newChunk = args.value;
			let chunks = floodFill(newChunk.x, newChunk.y, (c) => c.b !== "water" && c.b !== "mountain" && c.v.s === undefined, 5);
			chunks.forEach((c) => {
				c.v.s = subject.id;
				subject.size ++;
			})
		},
		message: (subject, _, args) => `Ships from {{regname:town|${subject.id}}} dock on {{regname:landmass|${args.value.v.g}}}.`,
		weight: $c.UNCOMMON,
		influencedBy: {
			travel: 1
		},
		needsUnlock: {
			travel: 30
		}
	},
	"townEat": {
		daily: true,
		subject: { reg: "town", all: true },
		func: (subject, target, args) => {
			let foodCost = subject.pop * $c.baseEatRate;
			foodCost = Math.floor(addInfluence(foodCost, subject, "hunger"));
			if (!foodCost) foodCost = subject.pop * $c.baseEatRate * 0.05;
			let crops = happen("CountResource",null,subject,{ type:"crop" });
			let livestocks = happen("CountResource",null,subject,{ type:"livestock" });
			let foodCount = crops + livestocks;

			if (foodCount < 1) {
				happen("Influence", null, subject, { "temp":true, "happy": $c.noFoodHappyInfluence });
				logWarning("noFood"+subject.id, "{{regname:town|"+subject.id+"}} is out of food!");
				happen("Death", null, subject, { count:randRange(1,foodCost), cause:"starve" });
				return;
			}
			else if (foodCount < subject.pop) {
				happen("Influence", null, subject, { "temp":true, "happy": $c.lowFoodHappyInfluence });
				logWarning("lowFood"+subject.id, "{{regname:town|"+subject.id+"}} is dangerously low on food!");
			}
			
			let cropCost = Math.round(randRange(0, foodCost));
			let livestockCost = foodCost - cropCost;

			if (cropCost) happen("RemoveResource", null, subject, { type:"crop", count: Math.round(Math.min(crops, cropCost)) });
			if (livestockCost) happen("RemoveResource", null, subject, { type:"livestock", count: Math.round(Math.min(livestocks, livestockCost)) });
		}
	},
	"townEmploy": {
		daily: true,
		subject: { reg: "town", all: true },
		func: (subject, target, args) => {
			if (!subject.jobs) subject.jobs = {};
			let employed = sumValues(subject.jobs);
			let unemployed = subject.pop - employed;
			let toEmploy = Math.max(Math.floor(unemployed * $c.baseEmployRate), Math.random() < 0.5 ? 1 : 0);
			if (employed >= subject.pop) toEmploy = 0;
			if (toEmploy) {
				let jobs = [];
				let weights = [];
				defaultJobs.forEach(job => {
					if (jobNeedsUnlock[job] && planet.unlocks[jobNeedsUnlock[job][0]] >= jobNeedsUnlock[job][1]) {
						jobs.push(job);
						weights.push( addInfluence(100, subject, (jobInfluences[job]||0)) );
					}
				});
				if (!jobs.length) return;
				for (let i = 0; i < toEmploy; i++) {
					const job = chooseWeighted(jobs,weights);
					if (!subject.jobs[job]) subject.jobs[job] = 0;
					subject.jobs[job]++;
				}
			}
		}
	},
	"townFarm": {
		daily: true,
		subject: { reg: "town", all: true },
		chunkRate: $c.baseResourceRate,
		value: 0,
		perChunk: (subject, target, chunk, args) => {
			let fertility = happen("Fertility",subject,chunk,null,"chunk") / 2;
			fertility = addInfluence(fertility, subject, "farm");
			if (Math.random() < fertility) {
				let biome = biomes[chunk.b];
				if (!biome.crop) return;
				let cropID = choose(biome.crop);
				let crop = regGet("resource",cropID);

				let count = 1;
				if (subject.jobs.farmer) count += randRange(0,subject.jobs.farmer);
				if (crop.rate > 0) count += randRange(0,Math.floor(crop.rate));

				args.value += count;
			}
		},
		func: (subject, target, args) => {
			if (subject.legal.farm === false) return;
			if (!args.value) return;
			args.value = Math.floor(Math.min(subject.pop * (randRange(1,10) / 10), args.value));
			if (!args.value) return;
			happen("AddResource",null,subject,{ type:"crop", count:args.value });
		}
	},
	"townTame": {
		daily: true,
		subject: { reg: "town", all: true },
		chunkRate: $c.baseResourceRate,
		value: 0,
		perChunk: (subject, target, chunk, args) => {
			let fertility = 0.2;
			fertility = addInfluence(fertility, subject, "farm");
			if (Math.random() < fertility) {
				let biome = biomes[chunk.b];
				if (!biome.livestock) return;
				let livestockID = choose(biome.livestock);
				let livestock = regGet("resource",livestockID);

				let count = 1;
				if (subject.jobs.farmer) count += randRange(0,Math.floor(subject.jobs.farmer/2));
				if (livestock.rate > 0) count += randRange(0,Math.floor(livestock.rate));

				args.value += count;
			}
		},
		func: (subject, target, args) => {
			if (planet.unlocks.farm >= 20) return;
			if (subject.legal.farm === false) return;
			if (!args.value) return;
			args.value = Math.floor(Math.min(subject.pop * (randRange(1,10) / 10), args.value));
			args.value = Math.min(args.value, subject.size);
			if (!args.value) return;
			happen("AddResource",null,subject,{ type:"livestock", count:Math.round(args.value) });
		}
	},
	"townMine": {
		daily: true,
		subject: { reg: "town", all: true },
		chunkRate: $c.baseResourceRate,
		perChunk: (subject, target, chunk) => {
			let fertility = planet.unlocks.smith < 20 ? 0.1 : chunk.e; //elevation
			if (planet.unlocks.smith >= 20) fertility += 0.05;
			if (planet.unlocks.smith >= 30) fertility += 0.05;
			if (planet.unlocks.smith >= 40) fertility += 0.05;

			if (Math.random() < fertility) {
				let rockCount = 1;
				if (subject.jobs.miner) rockCount += randRange(0,subject.jobs.miner);
				happen("AddResource",null,subject,{ type:"rock", count:rockCount });

				if (planet.unlocks.smith < 30) return;
				let metalCount = 1;
				if (subject.jobs.miner) metalCount += randRange(0,subject.jobs.miner);
				metalCount = Math.floor(metalCount/2);
				happen("AddResource",null,subject,{ type:"metal", count:metalCount });

			}
		},
		check: () => planet.unlocks.smith >= 10
	},
	"townLumber": {
		daily: true,
		subject: { reg: "town", all: true },
		chunkRate: $c.baseResourceRate,
		perChunk: (subject, target, chunk) => {
			if (biomes[chunk.b].hasLumber !== true) return;

			let fertility = 0.1;
			if (planet.unlocks.smith >= 30) fertility += 0.1;
			if (planet.unlocks.smith >= 40) fertility += 0.1;

			if (Math.random() < fertility) {
				let rockCount = 1;
				if (subject.jobs.lumberer) rockCount += randRange(0,subject.jobs.lumberer);
				happen("AddResource",null,subject,{ type:"lumber", count:rockCount });

			}
		},
		check: () => planet.unlocks.smith >= 20
	},
	"planetCheck": {
		daily: true,
		subject: { reg: "nature", random: true },
		func: (subject, target, args) => {

			const totalPop = regToArray("town").reduce((n, {pop}) => n + pop, 0);

			// if global population > 100 unlock stats
			if (!planet.unlockedExecutive["stats"] && totalPop > 100) {
				unlockExecutive("stats");
				logTip("stats", "{{planet}} is growing fast. We can now check on global statistics.");
			}

			if (!planet.stats.peak || totalPop > planet.stats.peak) planet.stats.peak = totalPop;
		}
	},
	"townCheck": {
		daily: true,
		subject: { reg: "town", all: true },
		func: (subject, target, args) => {
			if (subject.pop <= 0) {
				happen("End",null,subject);
				return;
			}

			if ((subject.pop === 1 || subject.pop/subject.size <= $c.minPopulationDensity) && Math.random() < $c.baseDecayRate) {
				logWarning("decay"+subject.id, `{{regname:town|${subject.id}}} is decaying due to underpopulation.`);
				let chunk = randomChunk((c) => c.v.s === subject.id);
				happen("Unclaim", null, subject, {x:chunk.x, y:chunk.y});
			}

			if (!subject.center) {
				happen("UpdateCenter", null, subject);
			}
			
			if (subject.influencesTemp && Object.keys(subject.influencesTemp).length) {
				happen("EaseInfluences", null, subject);
			}

			if (subject.influences.happy < -6) {
				logWarning("angry"+subject.id, "{{residents:"+subject.id+"}} are very angry!");
			}
			else if (subject.influences.happy < -2) {
				logWarning("unhappy"+subject.id, "{{residents:"+subject.id+"}} are unhappy!");
			}
		}
	},
	"townUpgrade": {
		daily: true,
		subject: { reg: "town", all: true },
		func: (subject, target, args) => {
			// colony 0
			// town 10size
			// city 100
			// metropolis 500
			// nation 1000
			// empire 5000

			if (subject.level === undefined) { //compat
				subject.level = 10;
				subject.type = "town";
				return;
			}

			let upgrade = null;
			if (subject.level === 0) { // colony -> town
				if (subject.size > 10) upgrade = [10,"town"];
			}
			else if (subject.level <= 10 && subject.pop > 100) { // town -> city
				upgrade = [20,"city"];
			}
			else if (subject.level <= 20 && subject.pop > 500) { // city -> metropolis
				upgrade = [30,"metropolis"];
			}
			else if (subject.level <= 30 && subject.pop > 1000) { // metropolis -> nation
				upgrade = [40,"nation"];
			}
			else if (subject.level <= 40 && subject.pop > 5000) { // nation -> empire
				upgrade = [50,"empire"];
			}

			if (upgrade) {
				logMessage(`${titleCase(subject.type)} of {{regname:town|${subject.id}}} has reached {{i:${upgrade[1]}}} status.`, "milestone");
				subject.level = upgrade[0];
				subject.type = upgrade[1];
			}
		}
	},
	"townAnniversary": {
		daily: true,
		subject: { reg:"town", filter: (town) => (planet.day - town.start) % 100 === 0 && (planet.day - town.start) },
		func: (subject) => {
			logMessage(`{{residents|${subject.id}}} celebrate {{num:${planet.day - subject.start}}} days since their town's founding.`, "milestone");
			happen("Influence", null, subject, {temp:true, happy:1})
		}
	},



	/* PROCESSES */
	"processAll": {
		daily: true,
		subject: { reg: "process", filter: (subject) => !subject.done && !subject.end },
		func: (subject, target, args) => {
			if (!subject.type) return false;

			const key = "process"+titleCase(subject.type);
			if (metaEvents[key]) metaEvents[key].func(subject, target, args);
		}
	},
	"processProject": {
		meta: true,
		subject: { reg: "process" },
		func: (subject, target, args) => {
			target = regGet("town", subject.town);
			if (target.end) {
				happen("End", null, subject);
				return;
			}

			let cost = randRange(1, Math.ceil(subject.total * 0.2));

			let rock = happen("CountResource", subject, target, {type:"rock"});
			let lumber = happen("CountResource", subject, target, {type:"lumber"});
			
			// use lumber and rock, rock amount is worth double
			let rockCost = Math.min(rock, Math.ceil(cost * 0.5));
			let lumberCost = Math.min(lumber, cost - rockCost);
			
			happen("RemoveResource", subject, target, {type:"rock", count:rockCost});
			happen("RemoveResource", subject, target, {type:"lumber", count:lumberCost});

			// subtract cost from project
			subject.cost -= rockCost * 2;
			subject.cost -= lumberCost;
			subject.cost = Math.round(subject.cost);

			// check if complete, do Finish
			if (subject.cost <= 0) {
				oldInfluences = structuredClone(target.influences);
				happen("Finish", null, subject);
				logMessage(`{{regname:${subject.marker ? "marker" : "process"}|${subject.marker||subject.id}}} construction in {{regname:town|${target.id}}} has {{c:finished|completed}}!`, undefined, {influences: [oldInfluences, target.influences]});
				delete subject.halfway;
				delete subject.cost;
			}
			else if (!subject.halfway && subject.cost / subject.total <= 0.5) {
				subject.halfway = true;
				logMessage(`{{regname:process|${subject.id}}} construction in {{regname:town|${target.id}}} is halfway {{c:complete|done}}!`);
			}
		}
	},
	"processDisaster": {
		meta: true,
		subject: { reg: "process" },
		func: (subject, target, args) => {
			let data = actionables.process._disasterSubtypes[subject.subtype];

			let newDeaths = 0;
			let newInjuries = 0;
			let destroyed = [];

			if (subject.chunks) {
				if (data.spread) {
					subject.chunks.forEach((coords) => {
						const chunk = chunkAt(coords[0], coords[1]);
						if (!chunk) return;
						if (Math.random() > data.spread/10) return;
						let adjacent = choose(adjacentCoords);
						let newChunk = chunkAt(chunk.x + adjacent[0], chunk.y + adjacent[1]);
						if (!newChunk) return;
						if (data.location !== "any" && newChunk.b === "water") return;
						let exists = subject.chunks.filter((co) => co[0] === newChunk.x && co[1] === newChunk.y).length;
						if (!exists) {
							subject.chunks.push([newChunk.x, newChunk.y]);
						}
					})
				}

				if (data.move) {
					if (!subject.dir) subject.dir = [choose([-1,0,1]), choose([-1,0,1])];
					subject.chunks.forEach((coords) => {
						const chunk = chunkAt(coords[0], coords[1]);
						if (!chunk) return;
						subject.chunks.splice(subject.chunks.indexOf(coords), 1);
						let newChunk = chunkAt(chunk.x + subject.dir[0], chunk.y + subject.dir[1]);
						if (!newChunk) return;
						subject.chunks.push([newChunk.x, newChunk.y]);
					})
				}

				subject.chunks.forEach((coords) => {
					const chunk = chunkAt(coords[0], coords[1]);
					if (!chunk) return;
					if (!chunk.v.s) return;
					const town = regGet("town",chunk.v.s);

					happen("Influence", subject, town, {temp:true, happy:-0.1});
					town.lastColony = planet.day;

					if (data.deathRate) {
						let deaths = (town.pop*data.deathRate*(randRange(8,12) / 10))/town.size;
						deaths = Math.min(town.pop/town.size,deaths);
						if (Math.random() < deaths) {
							deaths = Math.ceil(deaths);
							deaths = happen("Death", subject, town, {count:deaths, cause:"disaster"}).count;
							newDeaths += deaths;
						}

						let injuries = deaths*10*(randRange(8,12) / 10);
						injuries = Math.min(town.pop/town.size,injuries);
						if (Math.random() < injuries) {
							injuries = Math.ceil(injuries);
							newInjuries += injuries;
						}
					}
					if (chunk.v.m && data.destroy && Math.random() < 0.1) {
						let marker = regGet("marker", chunk.v.m);
						if (!marker) return;
						destroyed.push(marker.id);
						happen("End", subject, marker);
					}
				})
			}

			if (subject.duration) subject.duration--;
			if (subject.duration <= 0 && subject.chunks) {
				// unclaim chunks, add to destroyed
				subject.chunks.forEach((coords) => {
					const chunk = chunkAt(coords[0], coords[1]);
					if (!chunk) return;
					if (!chunk.v.s) return;
					const town = regGet("town",chunk.v.s);
					const unclaimed = happen("Unclaim", subject, town, {x:chunk.x, y:chunk.y});
					if (unclaimed.marker) destroyed.push(unclaimed.marker);
				})
			}

			if (newDeaths) subject.deaths = (subject.deaths||0) + newDeaths;
			if (newInjuries) subject.injuries = (subject.injuries||0) + newInjuries;
			const both = newDeaths && newInjuries;
			if (newDeaths || newInjuries) {
				logMessage(
					`{{regname:process|${subject.id}}} ${newDeaths ? "kills "+newDeaths : ""}${both ? " and " : ""}${newInjuries ? "injures "+newInjuries : ""}.` +
					(destroyed.length ? " " + commaList(destroyed.map((id) => `{{regname:marker|${id}}}`)) + " " + (destroyed.length === 1 ? "was" : "were") + " destroyed." : "")
				, "warning");
			}

			if (subject.duration <= 0 || (subject.chunks && !subject.chunks.length)) {
				if (!data) return;
				if (data.messageDone) {
					logMessage(data.messageDone.replace(/\$/g, subject.locationDesc || "").replace(/\[NAME\]/g, `{{regname:process|${subject.id}}}`));
				}

				happen("Finish", null, subject);
				delete subject.locationDesc;
				delete subject.dir;
			}
		}
	},





	/* RANDOM EVENTS */

	"unlockLevel": {
		random: true,
		subject: {
			reg: "player", id: 1
		},
		target: {
			reg: "town", random: true
		},
		value: (subject, target) => {
			let type = null;
			let keys = Object.keys(unlockTree);
			for (let i = 0; i < 10; i++) {
				type = choose(keys);
				// const levelData = unlockTree[type].levels[unlockTree[type].levels.length-1];

				// skip if last level has been unlocked
				if (planet.unlocks[type] && unlockTree[type].levels[unlockTree[type].levels.length-1].level <= planet.unlocks[type]) {
					type = null;
				}

				// skip if recently rejected
				if (planet.unlocksRejected[type] && planet.day-planet.unlocksRejected[type] <= 10) type = null;

				if (type) {
					const currentLevel = planet.unlocks[type] || -1;

					let levels = unlockTree[type].levels;
					for (let i = 0; i < levels.length; i++) {
						const levelData = levels[i];
						if (levelData.level > currentLevel) {
							if (levelData.needsUnlock) {
								for (let required in levelData.needsUnlock) {
									if (!planet.unlocks[required] || planet.unlocks[required] < levelData.needsUnlock[required]) {
										type = null;
										break;
									}
								}
							}
							if (levelData.check && !levelData.check(subject,target)) {
								type = null;
							}
							if (type === null) break;
							return {
								type: type,
								levelData: levelData
							};
						}
					}
					type = null;
				}
			}
			return false;
		},
		func: (subject, target, args) => {
			let type = args.value.type;
			let levelData = args.value.levelData;
			happen("Unlock", target, subject, args);
			if (levelData.influences) {
				regToArray("town").forEach((town) => {
					happen("Influence", subject, town, levelData.influences)
				})
			}
		},
		funcNo: (subject, target, args) => {
			let type = args.value.type;
			let levelData = args.value.levelData;
			planet.unlocksRejected[type] = planet.day;
			if (levelData.influencesNo) {
				regToArray("town").forEach((town) => {
					happen("Influence", subject, town, levelData.influencesNo)
				})
			}
			if (levelData.funcNo) {
				levelData.funcNo(subject, target, args);
			}
		},
		message: (subject, target, args) => args.value.levelData.message,
		messageDone: (subject, target, args) => args.value.levelData.messageDone,
		messageNo: (subject, target, args) => args.value.levelData.messageNo,
		weight: $c.COMMON,
	},

	"townRecolor": {
		random: true,
		subject: {
			reg: "player", id: 1
		},
		target: {
			reg: "town", random: true
		},
		// value: {
		//   random: [ [255,0,0], [0,255,0], [0,0,255] ]
		// },
		value: (subject, target) => {
			return colorChange(target.color);
		},
		// check: (subject, target) => {
		//   return planet.day % 5 === 0;
		// },
		func: (subject, target, args) => {
			return happen("Recolor", subject, target, args);
		},
		// funcNo: (subject, target, args) => {},
		message: (subject, target, args) => `Motion from {{regname:town|${target.id}}} to adopt a new {{color:national color|rgb(${args.value.join(",")})}}.`,
		messageDone: (subject, target, args) => `{{regname:town|${target.id}}} adopts a new national color.`,
		messageNo: (subject, target, args) => `{{regname:town|${target.id}}} keeps its national color.`,
		weight: $c.UNCOMMON
	},

	"townAskName": {
		random: true,
		subject: {
			reg: "player", id: 1
		},
		target: {
			reg: "town", random: true
		},
		value: {
			ask: true,
			message: (_, target) => `What should {{regname:town|${target.id}}} be called?`,
			preview: (text) => `Welcome to {{b:${titleCase(text)}}}.${specialNames[text.toLowerCase().replace(/ +/g,"")] ? " {{color:�|#ffff00|true}}" : ""}`
		},
		func: (subject, target, args) => {
			if (!args.value) return false;

			let lower = args.value.toLowerCase().replace(/ +/g,"");
			if (specialNames[lower]) {
				let data = specialNames[lower];
				if (typeof data === "string") {
					data = specialNames[data.substring(1)] || {};
				}

				if (data.name) args.value = data.name;
				if (data.type) target.type = data.type;
				if (data.emblem) target.emblem = data.emblem;
				if (data.flag) {
					target.flag = data.flag.replace(/ /g, " ");
				}
				else if (data.template) {
					target.flag = data.template.replace(/ /g, " ");

					if (target.flag.match(/\$/)) {
						target.flag = target.flag.replace(/^([^$]+)/, `{{color:$1|${data.foreground || "#000000"}|${data.background || "#ffffff"}}}`)
							.replace(/([^$]+)$/, `{{color:$1|${data.foreground || "#000000"}|${data.background || "#ffffff"}}}`)
							.replace(/\$/g, `{{color:${data.emblem || "O"}|${data.emblemColor || "#000000"}|${data.background || "#ffffff"}}}`);
					}
					else {
						target.flag = `{{color:${target.flag}|${data.foreground || "#000000"}|${data.background || "#ffffff"}}}`
					}
				}
				else if (data.emblem) {
					data.symbol = data.emblem;
				}
				if (data.dem) target.dem = data.dem;
				if (data.dems) target.dems = data.dems;
				if (data.adj) target.adj = data.adj;
				let color = data.color || data.emblemColor;
				if (color) {
					if (typeof color === "string" && color.match(/^#/)) color = hexToRGB(color);
					if (Array.isArray(color)) target.color = color;
				}

				logTip("specialName","You discovered a special name. Try to find them all!");
			}

			return happen("Rename", subject, target, args);
		},
		message: (subject, target, args) => `{{residents|${target.id}}} want you to pick their town's new name.`,
		messageDone: (subject, target, args) => `{{regname:town|${target.id}}} adopts a new name.`,
		messageNo: (subject, target, args) => `{{regname:town|${target.id}}} keeps its name.`,
		weight: $c.UNCOMMON
	},
	"townDemonym": {
		random: true,
		subject: {
			reg: "player", id: 1
		},
		target: {
			reg: "town", random: true
		},
		check: (subject, target) => target.dem === undefined,
		value: {
			ask: true,
			message: (_, target) => `What should a person from {{regname:town|${target.id}}} be called?`,
			preview: (text) => `This {{b:${titleCase(text)}}}. These ${titleCase(wordPlural(text))}. The ${titleCase(wordAdjective(text))} people.`
		},
		func: (subject, target, args) => {
			if (!args.value) return false;
			args.value = args.value.replace(/^an? /, "");
			target.dem = titleCase(args.value);
			target.dems = titleCase(wordPlural(args.value));
			target.adj = titleCase(wordAdjective(args.value));
			happen("Influence", subject, target, { happy: 1 });
		},
		message: (subject, target, args) => `{{residents|${target.id}}} need a name for themselves.`,
		messageDone: (subject, target, args) => `{{residents|${target.id}}} have an emboldened identity.`,
		weight: $c.UNCOMMON
	},
	"planetDemonym": {
		random: true,
		subject: {
			reg: "player", id: 1
		},
		check: () => planet.dem === undefined,
		value: {
			ask: true,
			message: () => `What should a person living on Planet {{planet}} be called?`,
			preview: (text) => `This {{b:${titleCase(text)}}}. These ${titleCase(wordPlural(text))}. The ${titleCase(wordAdjective(text))} people.`
		},
		func: (subject, target, args) => {
			if (!args.value) return false;
			args.value = args.value.replace(/^an? /, "");
			planet.dem = titleCase(args.value);
			planet.dems = titleCase(wordPlural(args.value));
			planet.adj = titleCase(wordAdjective(args.value));
		},
		message: (subject, target, args) => `{{people}} need a name for themselves.`,
		messageDone: (subject, target, args) => `{{people}} have an emboldened identity.`,
		weight: $c.UNCOMMON
	},
	"townFlag": {
		random: true,
		subject: {
			reg: "player", id: 1
		},
		target: {
			reg: "town", random: true
		},
		check: (subject, target) => target.flag === undefined,
		value: (subject, target, args) => {
			let background = "rgb(" + choose([ ...townColors, ...extraColors ]).join(",") + ")";
			let foreground = "rgb(" + choose([ ...townColors, ...extraColors ]).join(",") + ")";
			let emblem = choose(wordComponents.flags.EMBLEM).replace(/A/g, target.name[0].toUpperCase());
			args.emblem = emblem;
			let emblemColor = "rgb(" + target.color.join(",") + ")";

			let template = choose(wordComponents.flags.TEMPLATE);

			let flag = template
			    .replace(/ /g, " ")
				.replace(/^([^$]+)/, `{{color:$1|${foreground}|${background}}}`)
				.replace(/([^$]+)$/, `{{color:$1|${foreground}|${background}}}`)
				.replace(/\$/g, `{{color:${emblem}|${emblemColor}|${background}}}`);

			return flag;
		},
		func: (subject, target, args) => {
			if (!args.value) return false;
			target.flag = args.value;
			target.emblem = args.emblem;
		},
		message: (subject, target, args) => `Motion from {{regname:town|${target.id}}} to adopt a new flag. ${args.value}`,
		messageDone: (subject, target, args) => `{{residents|${target.id}}} fly their new flag.`,
		messageNo: (subject, target, args) => `{{residents|${target.id}}} reject {{c:hollow|shallow}} symbolism.`,
		weight: $c.UNCOMMON
	},
	"townAnimal": {
		random: true,
		subject: {
			reg: "player", id: 1
		},
		target: {
			reg: "town", random: true
		},
		check: (subject, target) => target.animal === undefined,
		value: (subject, target, args) => {
			let biome = randomChunk((c) => c.v.s === target.id);
			if (!biome) return false;
			biome = biome.b;
			if (!biomes[biome].livestock) return false;
			return choose(biomes[biome].livestock);
		},
		func: (subject, target, args) => {
			if (!args.value) return false;
			target.animal = args.value;
		},
		message: (subject, target, args) => `Motion to adopt the {{regname:resource|${args.value}}} as {{regname:town|${target.id}}}'s town animal.`,
		messageDone: (subject, target, args) => `{{residents|${target.id}}} look up to the {{c:courage|bravery|independence|grace|strength|harmony|power}} of the {{regname:resource|${args.value}}}.`,
		messageNo: (subject, target, args) => `{{residents|${target.id}}} look up to historical figures instead of animals.`,
		weight: $c.UNCOMMON
	},

	"townProjectStart": {
		random: true,
		subject: {
			reg: "player", id: 1
		},
		target: {
			reg: "town", random: true
		},
		value: (subject, target) => {
			let choices = [];
			for (let key in actionables.process._projectSubtypes) {
				let data = actionables.process._projectSubtypes[key] || {};
				let invalid = false;
				if (data.needsUnlock) {
					for (let unlock in data.needsUnlock) {
						if (!planet.unlocks[unlock] || planet.unlocks[unlock] < data.needsUnlock[unlock]) invalid = true;
						if (target.legal[unlock] === false) invalid = true;
					}
				}
				if (!invalid) choices.push(key);
			}
			if (!choices.length) return false;
			return choose(choices);
		},
		check: (subject, target) => {
			if (target.size <= 5) return false;
			if (target.lastProject && planet.day - target.lastProject < $c.townProjectCooldown) return false;
			
			return !regExists("process", (p) => !p.done && p.town === target.id);
		},
		func: (subject, target, args) => {
			target.lastProject = planet.day;

			let project = happen("Create", target, null, {
				type: "project",
				subtype: args.value,
				cost: Math.max(20, Math.round(target.pop * 0.5))
			}, "process")

			return project;
		},
		message: (subject, target, args) => `Motion from {{regname:town|${target.id}}} to {{c:begin|start}} {{c:constructing|building|construction of}} a new ${args.value.replace(/_/g," ")}.`,
		messageDone: (subject, target, args) => `{{residents|${target.id}}} {{c:begin|start}} {{c:constructing|building|construction of}} a ${args.value.replace(/_/g," ")}.`,
		messageNo: (subject, target, args) => `{{regname:town|${target.id}}} prioritizes other projects.`,
		weight: $c.COMMON,
		needsUnlock: {
			smith: 10
		}
	},
	"markerAskName": {
		random: true,
		subject: {
			reg: "player", id: 1
		},
		target: {
			reg: "marker", single: (m) => m.named === false && m.subtype && m.town
		},
		value: {
			ask: true,
			message: (_, target) => `What should the ${target.subtype} be called?`,
			preview: (text, _, target) => {
				let data = actionables.process._projectSubtypes[target.subtype];
				let name = text +" "+target.subtype;
				if (data && data.nameTemplate) name = data.nameTemplate.replace(/\$/g, text);
				return `Welcome to {{b:${titleCase(name)}}}.`
			}	
		},
		func: (subject, target, args) => {
			if (!args.value) return false;
			let data = actionables.process._projectSubtypes[target.subtype];
			let name = args.value +" "+target.subtype;
			if (data && data.nameTemplate) name = data.nameTemplate.replace(/\$/g, args.value);
			target.name = titleCase(name);
			delete target.named;
		},
		message: (subject, target, args) => `The new {{regname:marker|${target.id}}} in {{regname:town|${target.town}}} needs a name.`,
		messageDone: (subject, target, args) => `{{regname:marker|${target.id}}} has been named.`,
		weight: $c.COMMON,
		needsUnlock: {
			smith: 10
		}
	},

	// LAWS
	"townLaw": {
		random: true,
		subject: {
			reg: "player", id: 1
		},
		target: {
			reg: "town", random: true
		},
		value: (subject, target, args) => {
			let choices = [];
			let weights = [];
			for (let key in allLaws) {
				let split = key.split(".");
				let influence = split[0];
				let isLegal = happen("Legality",subject,target,{law: key});
				let weight = (isLegal ? subtractInfluence : addInfluence)(100, target, influence);
				weight = Math.max(weight, 10);
				choices.push(key);
				weights.push(weight);
			};
			let law = chooseWeighted(choices, weights);
			if (!law) return false;
			
			args.result = !happen("Legality",subject,target,{law: law});
			let split = law.split(".");
			args.influence = split[0];
			args.name = split[split.length-1];
			args.name = (regBrowserKeys[args.name] || args.name).toLowerCase();

			return law;
		},
		message: (subject, target, args) => `Motion from {{regname:town|${target.id}}} to make ${args.name} ${args.result ? "legal" : "illegal"}${target.legal[args.value] !== undefined ? " again" : ""}.`,
		messageDone: (subject, target, args) => `{{regname:town|${target.id}}}'s ${args.result ? "legalization" : "banning"} of ${args.name} {{c:resonates|sends shockwaves}} through the town.`,
		messageNo: (subject, target, args) => `{{regname:town|${target.id}}} {{c:decides not to|will not}} ${args.result ? "allow" : "prosecute"} ${args.name}.`,
		func: (subject, target, args) => {
			target.legal[args.value] = args.result;
			let severity = allLaws[args.value];
			let a = {};
			if (args.result) {
				a[args.influence] = Math.abs(target.influences[args.influence] || 1);
				a[args.influence] = Math.min(a[args.influence], 5);
			}
			else {
				a[args.influence] = -8;
				if (target.influences[args.influence] > 0) a[args.influence] -= target.influences[args.influence];
			}
			a[args.influence] *= severity;
			happen("Influence", subject, target, a);
		},
		weight: $c.COMMON,
		needsUnlock: {
			"government": 10
		}
	},

	"playerAskName": {
		random: true,
		subject: {
			reg: "player", id: 1
		},
		target: {
			reg: "player", id: 1
		},
		value: {
			ask: true
		},
		check: (subject, target) => {
			return userSettings.playerName === undefined;
		},
		func: (subject, target, args) => {
			if (!args.value) return false;
			userSettings.playerName = titleCase(args.value.split(" ")[0]);
			saveSettings();
			return target;
		},
		message: (subject, target, args) => `{{people}} want to know your name.`,
		weight: $c.COMMON
	},

	"domesticate": {
		random: true,
		auto: true,
		subject: {
			reg: "town", random: true
		},
		value: (subject, target, args) => {
			let chunk = randomChunk((c) => c.v.s === subject.id);
			args.type = Math.random() < 0.5 ? "crop" : "livestock";
			if (planet.unlocks.farm < 20) args.type = "crop";
			if (chunk && biomes[chunk.b][args.type]) {
				args.resourceID = choose(biomes[chunk.b][args.type]);
			}
			return randRange(50,100)/100;
		},
		check: (subject, target, args) => args.resourceID !== undefined,
		func: (subject, target, args) => {
			if (args.resourceID) {
				let resource = regGet("resource",args.resourceID);
				if (resource) {
					happen("Boost",subject,resource,args);
					unlockExecutive("almanac");
				}
			}
		},
		message: (subject,target,args) => `New methods in {{regname:resource|${args.resourceID}}} ${args.type === "crop" ? "cultivation" : "breeding"} allow for improved ${args.type === "crop" ? "crop harvest" : "livestock products"}.`,
		weight: $c.SUPERCOMMON,
		influencedBy: {
			"farm": 1
			// from -1 to 1, or beyond
		},
		needsUnlock: {
			"farm": 10
		}
	},

	"increaseFarming": {
		random: true,
		subject: {
			reg: "player", id: 1
		},
		target: {
			reg: "town", random: true
		},
		message: (subject, target, args) => `Motion from {{regname:town|${target.id}}} to encourage farming research.`,
		messageDone: (subject, target, args) => `{{regname:town|${target.id}}} focuses on new farming methods.`,
		// messageNo: (subject, target, args) => `{{regname:town|${target.id}}} prefers to stick to their old ways.`,
		weight: $c.UNCOMMON,
		influencedBy: {
			"farm": 1
		},
		influences: {
			"farm": 0.1
		},
		influencesNo: {
			"farm": -0.1
		},
		needsUnlock: {
			"farm": 10
		}
	},

	"massMigrate": {
		random: true,
		auto: true,
		subject: {
			reg: "town", random: true
		},
		target: {
			reg: "town", random: true
		},
		value: (subject, target, args) => {
			return Math.min($c.maxPopulation(target) - target.pop, Math.round(randRange(subject.pop*0.05, subject.pop*0.15)));
		},
		check: (subject, target, args) => args.value && subject.pop >= 50,
		func: (subject, target, args) => {
			happen("Migrate", subject, target, {count: Math.round(args.value)});
		},
		message: (subject,target,args) => `${subject.influences.happy < 0 ? "Looking for change, a" : "A"} group of {{residents:${subject.id}|travelers}} make their way to {{regname:town|${target.id}}}.`,
		weight: $c.UNCOMMON,
		influencedBy: {
			"happy": -1,
			"travel": 1
		},
		needsUnlock: {
			"travel": 10
		}
	},

	"naturalDisaster": {
		random: true,
		auto: true,
		subject: {
			reg: "nature", id: 1
		},
		value: () => {
			return choose(Object.keys(actionables.process._disasterSubtypes));
		},
		func: (subject, target, args) => {
			let data = actionables.process._disasterSubtypes[args.value];
			let origChunk;
			let chunk;
			let locationDesc;
			
			if (data.location === "land" || !data.location) {
				chunk = randomChunk((c) => c.b !== "water" && (!data.excludeBiome || !data.excludeBiome.includes(c.b)));
				locationDesc = "on";
			}
			else if (data.location === "shore") {
				origChunk = randomChunk((c) => c.b === "water");
				chunk = nearestChunk(origChunk.x, origChunk.y, (c) => c.b !== "water" && (!data.excludeBiome || !data.excludeBiome.includes(c.b)));
				locationDesc = "on the coast of";
			}
			else if (data.location === "any") {
				chunk = randomChunk(() => (!data.excludeBiome || !data.excludeBiome.includes(c.b)));
				locationDesc = "on the coast of";
			}

			if (!chunk) return false;

			let landmass = nearestChunk(chunk.x, chunk.y, (c) => c.b !== "water").v.g;

			if (chunk.b === "water") locationDesc = "off the coast of";
			else if (origChunk && origChunk.b === "water") locationDesc = "on the coast of";
			else locationDesc = "on";
			locationDesc += " {{regname:landmass|"+landmass+"}}";

			let chunks;
			if (data.radius) chunks = circleChunks(chunk.x, chunk.y, data.radius, true);
			else chunks = [chunk];

			if (data.location !== "any") chunks = chunks.filter((c) => c.b !== "water");

			let message = data.message || "Disaster strikes $.";
			message = message.replace(/\$/g, locationDesc);
			
			let populated = chunks.filter((c) => c.v.s !== undefined);
			let towns = [];
			populated.forEach((c) => {
				if (!towns.includes(c.v.s)) towns.push(c.v.s);
			})

			if (towns.length === 0) message += " Luckily, no towns are affected.";
			else if (towns.length === 1) message += " {{regname:town|"+towns[0]+"}} is affected."
			else message += commaList(towns.map((id) => " {{regname:town|"+id+"}}"))+" are affected.";

			args.message = message;

			let duration = randRange(Math.min(data.duration||4,4), data.duration||10);

			let disaster = happen("Create", target, null, {
				x: chunk.x,
				y: chunk.y,
				chunks: chunks.map((c) => [c.x,c.y]),
				type: "disaster",
				subtype: args.value,
				duration: duration
			}, "process")
			disaster.locationDesc = locationDesc;
			args.message = args.message.replace(/\[NAME\]/g, `{{regname:process|${disaster.id}}}`);

			return disaster;
		},
		message: (subject, target, args) => {
			return args.message;
		},
		weight: $c.RARE
	}



}


unlockTree = {
	"farm": {
		levels: [
			{
				level: 10,
				name: "Agriculture",
				message: "{{people}} want to settle down and plant seeds. {{should}}",
				messageDone: "Crops quickly become a popular product.",
				messageTomorrow: "{{randreg:town}} begins hiring farmers.",
				influences: { farm:1, travel:-0.5 },
				messageNo: "Hunting and gathering prevail.",
				influencesNo: { farm:-5 }
			},
			{
				level: 20,
				name: "Husbandry",
				message: "{{people}} want to start feeding their scraps to wild animals. {{should}}",
				messageDone: "Animals become friendly to the population.",
				messageTomorrow: "{{randreg:town}} begins collecting livestock.",
				influences: { farm:1, disease:0.1 },
				messageNo: "Animals are seen as wild beasts to conquer.",
				influencesNo: { farm:-0.5 }
			},
			{
				level: 30,
				name: "Irrigation",
				message: "{{people}} attempt to transport water to their farmland. {{should}}",
				messageDone: "Fresh water becomes a common resource.",
				influences: { farm:1, disease:-0.25, travel:-0.25 },
				messageNo: "Water must be moved from rivers with buckets.",
				influencesNo: { farm:-0.5, travel:0.5 }
			},
			{
				level: 40,
				name: "Crop Rotation",
				message: "{{people}} look into planting different crops in the same areas. {{should}}",
				messageDone: "Different crops are planted one after another.",
				influences: { farm:2 },
				messageNo: "Crops are stuck in their own dedicated areas.",
				influencesNo: { farm:-0.5 }
			}
		]
	},
	"travel": {
		levels: [
			{
				level: 10,
				name: "Travel",
				message: "As {{randreg:town}} grows, inhabitants venture further out. {{should}}",
				messageDone: "Extended journeys are made in search of resources.",
				influences: { travel:1 },
				messageNo: "Communities stay out of the wilderness.",
				influencesNo: { travel:-5 },
			},
			{
				level: 20,
				name: "Paths",
				message: "Repeated travel can cause paths to develop over common routes. {{should}}",
				messageDone: "Paths lead travelers to popular areas.",
				influences: { travel:2 },
				messageNo: "Travelers rely on natural landmarks to find their way.",
				influencesNo: { travel:-1 },
				needsUnlock: {
					"farm": 10
				}
			},
			{
				level: 30,
				name: "Boats",
				message: "{{people}} notice how wood floats on water and want to investigate further. {{should}}",
				messageDone: "Travelers make use of boats to expand across the seas.",
				influences: { travel:2 },
				messageNo: "Violent waves deter travelers from the seas.",
				influencesNo: { travel:-1 },
			},
			{
				level: 40,
				name: "Wheels",
				message: "{{people}} notice that rolling seems to be more efficient in transportation. {{should}}",
				messageDone: "Wheels are used to transport efficiently.",
				influences: { travel:2 },
				messageNo: "People stick to carrying carts by hand.",
				influencesNo: { travel:-1 },
			},
		]
	},
	"fire": {
		levels: [
			{
				level: 10,
				name: "Firestarting",
				message: "{{people}} realize rubbing sticks together makes lots of heat. {{should}}",
				messageDone: "Fire allows for heating and lighting.",
				influences: { happy:1 },
				messageNo: "It's common to stay cold all night long.",
				influencesNo: { happy:-1 },
			},
			{
				level: 20,
				name: "Cooking",
				message: "{{people}} try lighting food on fire for fun. {{should}}",
				messageDone: "Cooking allows for safer and more nutritious food.",
				influences: { hunger:-1, disease:-1 },
				messageNo: "Meat is served extra rare.",
				influencesNo: { hunger:1, disease:1 },
				needsUnlock: {
					"farm": 10
				}
			},
			{
				level: 30,
				name: "Firebombing",
				message: "Fire hurts. Should this be used against enemies?",
				messageDone: "War crimes are encouraged.",
				influences: { military:3, happy:-2 },
				messageNo: "War crimes are frowned upon.",
				influencesNo: { happy:1 },
				needsUnlock: {
					"military": 10
				}
			}
		]
	},
	"smith": {
		levels: [
			{
				level: 10,
				name: "Stonework",
				message: "{{people}} try breaking rocks with other rocks. {{should}}",
				messageDone: "Stone is used as a durable building material.",
				influences: { travel:0.5 }
			},
			{
				level: 20,
				name: "Stone Tools",
				message: "{{people}} try connecting loose rocks to handles. {{should}}",
				messageDone: "Tools made of stone increase durability and efficiency.",
				messageTomorrow: "{{randreg:town}} begins hiring miners and lumberers.",
				influences: { farm:2 },
				messageNo: "Wooden tools prevail.",
				needsUnlock: {
					"farm": 10
				}
			},
			{
				level: 30,
				name: "Metalwork",
				message: "{{people}} try heating up shiny rocks. {{should}}",
				messageDone: "Molten metal can be casted into strong new shapes.",
				messageTomorrow: "{{randreg:town}} begins collecting metals.",
				messageNo: "Fears of heat deter metalworking.",
				needsUnlock: {
					"fire": 10
				},
				influences: { trade:1 }
			},
			{
				level: 40,
				name: "Metal Tools",
				message: "{{people}} try connecting casted metal to handles. {{should}}",
				messageDone: "Tools made of metal increase durability and efficiency.",
				influences: { farm:2, military:3 },
				messageNo: "Stone tools are perfectly fine for the {{people}}.",
				// func: (subject, target) => {
				//   if (planet.unlocks.military) happen("Influence", null, subject, { "military":3 });
				// }
			},
		]
	},
	"trade": {
		levels: [
			{
				level: 10,
				name: "Trade",
				message: "{{people}} want to exchange goods for others of equal value. {{should}}",
				messageDone: "Goods are exchanged with mutual benefit.",
				influences: { trade:1, travel:1, happy:0.2 },
				messageNo: "Nobody wants to give up their precious goods.",
				influencesNo: { trade:-5, travel:-0.5 },
				needsUnlock: {
					"farm": 10
				}
			},
			{
				level: 20,
				name: "Trade routes",
				message: "{{people}} are traveling long distances to trade goods. {{should}}",
				messageDone: "Trade routes are established as goods are transported.",
				influences: { trade:1.5, travel:1.5, happy:0.2 },
				messageNo: "Goods are traded strictly within small communities.",
				influencesNo: { trade:-0.5, travel:-0.5 },
				needsUnlock: {
					"travel": 20
				}
			},
			{
				level: 30,
				name: "Currency",
				message: "{{people}} want a way to trade without having immediate access to their goods. {{should}}",
				messageDone: "Tokens symbolizing monetary value are traded in exchange for goods.",
				influences: { trade:1.5 },
				messageNo: "Merchants carry bags of crops in case they encounter a customer.",
				influencesNo: { trade:-0.5 },
				needsUnlock: {
					"farm": 20,
					"government": 10
				}
			}
		]
	},
	"government": {
		levels: [
			{
				level: 10,
				name: "Laws",
				message: "{{people}} seek control over others they see as immoral. {{should}}",
				messageDone: "Towns begin constructing prisons.",
				influences: { crime:-2 },
				messageNo: "Inhabitants are left to do whatever they please.",
				influencesNo: { crime:3 },
				needsUnlock: {
					"farm": 10
				},
				funcNo: () => {
					regToArray("town").forEach(town => {
						town.gov = "anarchy";
					})
				},
				func: () => {
					regToArray("town").forEach(town => {
						if (town.gov === "anarchy") delete town.gov;
					})
				}
			}
		]
	},
	"education": {
		levels: [
			{
				level: 10,
				name: "Education",
				message: "{{people}} want their children to learn a variety skills. {{should}}",
				messageDone: "Knowledge is passed down through generations.",
				influences: { education:1 },
				messageNo: "Children must learn how the world works through trial and error.",
				influencesNo: { education:-3 },
				needsUnlock: {
					"farm": 10
				}
			},
			{
				level: 20,
				name: "Higher Education",
				message: "Some {{people}} enjoy certain skills and want to master them. {{should}}",
				messageDone: "Higher education allows for specialized fields of knowledge.",
				influences: { education:5 },
				influencesNo: { education:-1 },
			},
		]
	},
	"military": {
		levels: [
			{
				level: 10,
				name: "Military",
				message: "The addition of another settlement worries {{regoldest:town}}. Should it?",
				messageDone: "{{regoldest:town}} begins enlisting soldiers.",
				influences: { military:1, crime:0.25 },
				messageNo: "The settlements trust each other, for now...",
				influencesNo: { military:-2 },
				check: () => regCount("town") > 1,
				func: () => logTip("betaMilitary", "Militarism hasn't been added yet.") //BETA
			},
			{
				level: 20,
				name: "Protective Gear",
				message: "Garments can be worn to absorb the force of attacks. {{should}}",
				messageDone: "Protective gear is developed and worn by soldiers.",
				influences: { military:1 },
				messageNo: "Soldiers remain unprotected in the case of battle.",
				influencesNo: { military:-0.5 },
			},
			{
				level: 30,
				name: "Projectile Weapons",
				message: "Sharp objects could be crafted and thrown in battle. {{should}}",
				messageDone: "Projectile weapons are made to attack from afar.",
				influences: { military:1, crime:0.8 },
				messageNo: "Soldiers prefer close-up combat.",
				influencesNo: { military:-0.5 },
			},
			{
				level: 40,
				name: "Jockeys",
				message: "Soldiers look to domesticated animals for inspiration. {{should}}",
				messageDone: "Soldiers are seen practicing on {{randreg:resource|livestock}}back.",
				influences: { military:1 },
				messageNo: "Soldiers see no use for livestock besides food.",
				needsUnlock: {
					"farm": 20
				}
			},
			{
				level: 50,
				name: "Combat Vehicles",
				message: "Soldiers look to the wheel for inspiration. {{should}}",
				messageDone: "Soldiers are seen driving vehicles to military outposts.",
				influences: { military:1, travel:0.5 },
				messageNo: "Soldiers see no use for the wheel outside of trade.",
				needsUnlock: {
					"travel": 40
				}
			}
		]
	},
	// "farm": {
	//   levels: [
	//     {
	//     }
	//   ]
	// },
}

allInfluences = {} // leave blank
influenceNeedsUnlock = {
	// influence: unlock
	"farm": "farm",
	"military": "military",
	"trade": "trade",
	"education": "education"
}
influenceEffects = {
	// influence -> effect on other influences
	"crime": { happy:-0.5 },
	"happy": { crime:-0.25, birth:0.25 },
	"education": { crime:-0.5 },
	"disease": { happy:-0.75 },
	"travel": { disease:0.1 },
	"hunger": { happy:-0.8 },
	"farm": { hunger:-0.25 },
	"mine": { happy:-0.25 }
}
influenceModality = {
	// good influences = 1, bad influences = 0
	"happy": 1,
	"crime": 0,
	"farm": 1,
	"birth": 1,
	"disease": 0,
	"travel": 1,
	"trade": 1,
	"hunger": 0,
	"education": 1,
	"military": 1,
}
defaultJobs = ["farmer","lumberer","miner","soldier"];
jobInfluences = {
	// job: influence
	"farmer": "farm",
	"lumberer": null,
	"miner": "mine",
	"soldier": "military",
}
jobNeedsUnlock = {
	// job: [unlock, level]
	"farmer": ["farm", 10],
	"miner": ["smith", 20],
	"lumberer": ["smith", 20],
	"soldier": ["military", 10]
}
allLaws = {
	// key: severity from 0-1
	// influence.name
	"farm": 0.8,
	"travel": 0.8,
	"happy.speech": 1,
	"crime.gambling": 0.1,
	"crime.fraud": 0.5,
	"crime.theft": 0.6,
	"crime.arson": 0.75,
	"crime.murder": 1,
}
regBrowserKeys = {
	"pop": "Population",
	"resources": "Resources",
	"raw": "Material",
	"town.crop": "Crop",
	"town.livestock": "Livestock",
	"planet.start": "Formed",
	"size": "Size",
	"circumference": "Circumference {{symbol:↔}}",
	"land": "Land",
	"influences": "Influences",
	"birth": "Birth",
	"smith": "Smithing",
	"farm": "Farming",
	"happy": "Mood",
	"biome": "Biome",
	"rate": "Efficiency",
	"jobs": "Jobs",
	"laws": "Laws",
	"town.animal": "Town Animal",
	"biome.crops": "Crops",
	"biome.livestocks": "Livestock",
	"domesticated": "Domesticated",
	"process.town": "Town",
	"process.subtype": "Type",
	"process.deaths": "Deaths",
	"process.injuries": "Injuries",
	"towns": "Towns",
	"process.done": "Finished",
	"process.end": "Scrapped",
	"process.start": "Began",
	"process.cost": "Remaining",
	"marker": "Marker",
	"marker.town": "Town",
	"marker.end": "Destroyed",
	"landmark.start": "Completed",
	"landmark.process": "Project",
	"resource.ancestor": "Evolved from",
	"platesize": "Plate Size",
	"elevation": "Elevation",

	"continents": "Continents",
	"volume": "Total Volume",
	"landvolume": "Volume (No Water)",

	"farmer":"{{icon:crop}}Farmer",
	"lumberer":"{{icon:lumber}}Lumberer",
	"miner":"{{icon:rock}}Miner",
	"soldier":"{{icon:sword}}Soldier",

	"town.start": "Founded",
	"town.end": "Fell",
	"age": "Age",
	"former": "Formerly",

	"planet": "Planet",

	"stats.alive": "Alive",
	"stats.death": "Deaths",
	"stats.deathnatural": "Natural deaths",
	"stats.deathdisaster": "Disaster deaths",
	"stats.birth": "Births",
	"stats.peak": "Peak population",
	"stats.prompt": "Acts issued",
	"stats.towns": "Towns",
}
regBrowserValues = {
	"pop": (value, town) => `{{num:${value}}}{{face:${town.id}}}`,
	"size": (value) => `{{area:${value}}}`,
	"land": (value) => `{{area:${value}}}`,
	"platesize": (value) => `{{area:${value}}}`,
	"circumference": (value) => `{{length:${value}}}`,
	"crop": (value) => `{{num:${value}}}{{icon:crop}}`,
	"lumber": (value) => `{{num:${value}}}{{icon:lumber}}`,
	"rock": (value) => `{{num:${value}}}{{icon:rock}}`,
	"metal": (value) => `{{num:${value}}}{{icon:metal}}`,
	"town.livestock": (value) => `{{num:${value}}}{{icon:livestock}}`,
	"biome": (value) => `{{biome:${value}}}`,
	"town.animal": (value) => `{{regname:resource|${value}}}`,
	"start": (value) => `{{date:${value}}}`,
	"end": (value) => `{{date:${value}}}`,
	"domesticated": (value) => `{{date:${value}}}`,
	"process.done": (value) => `{{date:${value}}}`,
	"age": (value) => `{{num:${value}}} Day${Math.abs(value) === 1 ? "" : "s"}`,
	"town.former": (value) => `{{regname:town|${value}}}`,
	"birth": null,
	"rate": (value) => `${value}x`,
	"process.town": (value) => `{{regname:town|${value}}}`,
	"process.subtype": (value) => titleCase(value),
	"process.cost": (value) => `${value}{{icon:lumber}}{{icon:rock}}`,
	"injuries": (value, town) => `{{num:${value}}}{{icon:sad}}`,
	"deaths": (value, town) => `{{num:${value}}}{{icon:sad}}`,
	"marker": (value) => `{{regname:marker|${value}}}`,
	"marker.town": (value) => `{{regname:town|${value}}}`,
	"landmark.process": (value) => `{{regname:process|${value}}}`,
	"resource.ancestor": (value) => `{{regname:resource|${value}}}`,
}
regBrowserExtra = {
	stats: {
		"alive": () => {
			return regToArray("town").reduce((n, {pop}) => n + pop, 0);
		},
		"towns": () => {
			return regToArray("town", true).length;
		},
		"deathnatural": () => {
			return planet.stats.deathBy.natural || 0;
		},
		"deathdisaster": () => {
			return planet.stats.deathBy.disaster || 0;
		}
	},
	planet: {
		"volume": () => {
			let volume = 0;
			let elevations = Array.prototype.concat.apply([],Array.prototype.concat.apply([], Object.values(planet.chunks).map( (c) => c.p)));
			elevations.forEach((e) => {
				if (e <= waterLevel) volume += 200000 * 200000 * ((0.4*10+1) * 1475);
				else volume += 200000 * 200000 * ((e*10+1) * 1475);
			})
			let volumeInChunks = volume / 1000 / 944000000;
			return "{{volume:"+volumeInChunks+"}}";
		},
		"landvolume": () => {
			let volume = 0;
			let elevations = Array.prototype.concat.apply([],Array.prototype.concat.apply([], Object.values(planet.chunks).map( (c) => c.p)));
			elevations.forEach((e) => {
				volume += 200000 * 200000 * ((e*10+1) * 1475);
			})
			let volumeInChunks = volume / 1000 / 944000000;
			return "{{volume:"+volumeInChunks+"}}";
		}
	},
	town: {
		"laws": (town) => {
			let laws = {};
			for (let law in town.legal) {
				let split = law.split(".");
				let name = split[split.length - 1];
				if (regBrowserKeys[name]) name = regBrowserKeys[name];
				laws[titleCase(name)] = town.legal[law] ? "{{color:Legal|hsl(120,80%,50%)}}" : "{{color:Illegal|hsl(0,80%,50%)}}";
			}
			if (!Object.keys(laws).length) return;
			return laws;
		},
		"elevation": (town) => {
			let elevations = filterChunks((c) => c.v.s === town.id).map((c) => c.e);
			if (!elevations.length) return;
			let elevation = Math.round(sumArray(elevations) / elevations.length * 100) / 100;
			return `{{elevation:${elevation}|l}}`;
		}
	},
	landmass: {
		"elevation": (landmass) => {
			let elevations = filterChunks((c) => c.v.g === landmass.id).map((c) => c.e);
			if (!elevations.length) return;
			let elevation = Math.round(sumArray(elevations) / elevations.length * 100) / 100;
			return `{{elevation:${elevation}|l}}`;
		},
		"planet": "{{planet}}",
		"platesize": (landmass) => {
			let size = 0;
			Object.values(planet.chunks).forEach((c) => {
				if (c.v.g === landmass.id) {
					size ++;
					return;
				}
				let chunk = nearestChunk(c.x, c.y, (c2) => c2.v.g !== undefined);
				if (chunk && chunk.v.g === landmass.id) size ++;
			})
			return size;
		}
	},
	process: {
		"towns": (process) => {
			if (!process.chunks) return;
			if (!process.chunks.length) return;
			let towns = [...new Set(process.chunks.map((coords) => chunkAt(coords[0],coords[1])).filter((i) => i).filter((c) => c.v.s).map((chunk) => chunk.v.s))].map((id) => `{{regname:town|${id}}}`);
			if (!towns.length) return;
			return towns;
		},
		"name": (process) => {
			if (process.subtype) return titleCase(process.subtype);
		},
		"color": (process) => {
			if (process.subtype) {
				if (process.type === "project") {
					return actionables.process._projectSubtypes[process.subtype].color;
				}
				if (process.type === "disaster") {
					return actionables.process._disasterSubtypes[process.subtype].color;
				}
			}
		}
	},
	marker: {
		"name": (process) => {
			if (process.subtype) return titleCase(process.subtype);
		},
		"color": (process) => {
			if (process.subtype) {
				if (process.type === "landmark") {
					return actionables.process._projectSubtypes[process.subtype].color;
				}
				if (process.type === "disaster") {
					return actionables.process._disasterSubtypes[process.subtype].color;
				}
			}
		}
	}
}