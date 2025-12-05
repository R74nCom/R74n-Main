constants = {
	defaultPlanetWidth: 200,
	defaultPlanetHeight: 120,
	defaultPixelSize: 6,
	defaultChunkSize: 4,
	markerResolution: 2,
	defaultWaterLevel: 0.4,
	maxPopulationPerChunk: 20,
	maxPopulation: (subject) => subject.size * $c.maxPopulationPerChunk *
		Math.pow(2,Math.floor(((planet.unlocks.smith + 20) || 0) / 10)),
	maxResourcePerChunk: 5,
	maxResource: (subject) => {
		let max = 0;
		let size = subject.size;
		if (size >= 5) {
			max += size * ($c.maxResourcePerChunk * 4);
			size -= 5;
		}
		max += size * $c.maxResourcePerChunk;
		max *= Math.pow(2,Math.floor(((planet.unlocks.smith + 20) || 0) / 10));
		return max;
	},
	baseBirthRate: 0.02,
	baseDeathRate: 0.008,
	deathRate: (town) => {
		return addInfluence($c.baseDeathRate, town, "disease");
	},
	baseExpandRate: 0.5,
	baseColonyRate: 0.05,
	colonyCooldown: 25,
	daysPerColony: 30,
	colonyNameSuffixRate: 0.2,
	revolutionCooldown: 25,
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
	warningCooldown: 30,
	dailyEventTries: 25,

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
				if (userSettings.notify !== false) document.getElementById("actionItem-unlocks").classList.add("notify");
				if (levelData.func) {
					levelData.func(subject,target,args);
				}
				unlockExecutive("unlocks");
			},
			UpdateScore: (subject,target,args) => {
				if (planet.dead) return planet.stats.score;

				let joy = 0;
				let total = 0;

				let avgmood = regBrowserExtra.stats.avgmood();
				joy += (avgmood + 10) / 20;
				total += 1

				if (planet.stats.birth) {
					joy += 1 - (planet.stats.death / planet.stats.birth);
					total += 1;
				}
				

				let score = joy / total;

				score = Math.round(score * 100) / 100;

				planet.stats.score = score;
				if (planet.unlockedExecutive["stats"]) {
					if (!planet.stats.peakscore || score > planet.stats.peakscore) planet.stats.peakscore = score;
					if (!userSettings.highscore || score > userSettings.highscore) {
						userSettings.highscore = score;
						saveSettings();
					}
				}

				return score;
			},
			Usurp: (subject,target,args) => {
				if (!planet.usurp || !planet.letter) {
					planet.usurp = planet.day;

					// Create letter
					let letter = happen("Create", subject, null, {
						name: parseText("{{c:Declaration|Proclamation}} of Independence"),
						type: "letter",
						text:
	`Dated: {{date:${planet.day}}}
	
	Dear ${userSettings.playerName || "Player"},
	
	${choose(["Suffice to say, we have not been pleased with your performance.","We’re not just disappointed, but also mad.","We are writing to inform you of your termination."])}
	
	We, the {{people}}, have decided to ${choose(["cut you off","relieve you of your duties"])}.
	
	${choose(["Sincerely","Signed"])},
	
	` + commaList(regToArray("town").map(town => `{{regname:town|${town.id}}}`))
					}, "product");

					planet.letter = letter.id;

					happen("Create", subject, null, {
						type: "usurp"
					}, "process")
				};

				regToArray("town").forEach(town => {
					if (!town.usurp) town.usurp = planet.day;
					town.influences.faith = $c.minInfluence;
				});

				happen("Letter", subject, target, args);

				document.getElementById("gameDiv").classList.add("usurp");
			},
			Letter: (subject,target,args) => {
				lockPlanet();
				let id = planet.letter;
				logMessage("{{people}} have authored a letter addressed to you.", undefined, {
					buttons: [{
						name: "Read",
						func: () => {
							regBrowse("product", id);
							unlockPlanet();
							delete planet.letter;
							if (planet.usurp) logMessage("You may start a new planet or wait for faith to build up again.", "tip", {buttons: [
							{
								name: "Start Over",
								func: () => resetPlanetPrompt()
							},
							{
								name: "Share",
								func: () => shareProgress()
							}
							]})
							autosave();
						}
					}]
				});
			},
			UnUsurp: (subject,target,args) => {
				if (!planet.usurp) return;
				planet.usurp = false;
				unlockPlanet();
				delete planet.letter;
				if (args.message !== false) logMessage("Some {{people}} have regained faith in you!","milestone");
				document.getElementById("gameDiv").classList.remove("usurp");
				happen("Create", subject, null, {
					type: "unusurp"
				}, "process")
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
							if (Math.random() < 0.33 && chunkIsNearby(x, y, (c) => c.b === "mountain", 4)) { //Monte-
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
				delete target.prefix;
				if (args.value.match(/^the /i)) {
					args.value = args.value.substring(4);
					target.prefix = "the";
				}
				else if (args.value.match(/^a /i)) {
					args.value = args.value.substring(2);
					target.prefix = "a";
				}
				target.name = titleCase(args.value);
				if (target.name.match(/^United| of |republic$|kingdom$|lands$/i)) {
					target.prefix = "the";
				}
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
				let inv = target.resources;
				if (inv[type] === undefined) inv[type] = 0;
				inv[type] += args.count || 1;
				if (type === "cash") return;
				let max = $c.maxResource(target);
				if (inv[type] > max) inv[type] = max;
				inv[type] = Math.floor(inv[type]);
			},
			RemoveResource: (subject,target,args) => {
				let type = args.type;
				let inv = target.resources;
				if (inv[type] === undefined) return;
				inv[type] -= Math.max(0, args.count || 1);
				inv[type] = Math.floor(inv[type]);
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

					change = Math.min(change, 5);
					change = Math.max(change, -5);

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
			AddRelation: (subject,target,args) => {
				if (subject.id === target.id) return;

				let amount = args.amount;

				const current = subject.relations[target.id] || 0;

				if (Math.sign(current) === Math.sign(amount)) amount += current * Math.abs(amount);

				let newRelation = current + amount;

				newRelation = Math.min(newRelation, $c.maxInfluence);
				newRelation = Math.max($c.minInfluence, newRelation);

				subject.relations[target.id] = newRelation;
				target.relations[subject.id] = newRelation;

				return target;
			},
			SetRelation: (subject,target,args) => {
				if (subject.id === target.id) return;
				
				let newRelation = args.amount;
				newRelation = Math.min(newRelation, $c.maxInfluence);
				newRelation = Math.max($c.minInfluence, newRelation);

				subject.relations[target.id] = newRelation;
				target.relations[subject.id] = newRelation;

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
			NameVariant: (subject,target,args) => {
				let newName = "";
				if (Math.random() < $c.colonyNameSuffixRate) {
					let mainName = target.name.match(/\S+$/)[0].toLowerCase();
					if (Math.random() < 0.5 && args.x !== undefined) {
						let horizontal = args.x - target.center[0];
						let vertical = args.y - target.center[1];
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
						usedNames[newName] = true;
						return titleCase(newName);
					}
					else return "";
				}
				return newName;
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
						if (resource === "cash") continue;
						if (subject.resources[resource] <= 0) continue;
						if (Math.random() < (subject.resources[resource] / pop)) {
							happen("RemoveResource", null, subject, {type:resource, count:1});
							happen("AddResource", null, target, {type:resource, count:1});
						}
					}
				}

				if (subject.wealth) {
					let perCapita = Math.round((subject.wealth || 0) / subject.pop);
					let wealth = perCapita * count;
					subject.wealth -= wealth;
					target.wealth = (target.wealth || 0) + wealth;
				}

				// influences
				let influences = {};
				for (let key in subject.influences) {
					influences[key] = subject.influences[key] * 0.05;
				}
				delete influences.happy;
				happen("Influence", subject, target, influences);

				happen("AddRelation", subject, target, {amount: 0.25});

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
				if (target.end) return;
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
				target.issues = {};
				target.type = "ghost "+(target.type || "town");
				target.wealth = 0;
				target.tax = 0;
				delete target.usurp;
				renderHighlight();
				updateCanvas();
			},
			Related: (subject,target,args) => {
				let related = [];
				let done = {};

				related.push([target._reg, target.id]);
				if (target.animal) related.push(["resource", target.animal]);

				let chunks = randomChunks((c) => c.v.s === target.id, 10);
				chunks.forEach(chunk => {
					if (done[chunk.b]) return;
					done[chunk.b] = true;
					let biome = biomes[chunk.b];
					if (biome.crop) related.push(...biome.crop.map((id) => ["resource", id]));
					if (biome.livestock) related.push(...biome.livestock.map((id) => ["resource", id]));
				})

				if (args.objects) {
					related = related.map((r) => regGet(r[0], r[1]));
				}

				return related;
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
				if (args.towns) target.towns = args.towns;
				else if (subject && subject.id && subject._reg === "town") {
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
				else if (target.type === "revolution") {
					
				}
				else if (target.type === "war") {

				}
				
				return target;
			},
			Finish: (subject,target,args) => {
				if (target.done) return false;
				target.done = planet.day;

				if (target.town) {
					let town = regGet("town",target.town);
					if (town.issues[target.type] === target.id) delete town.issues[target.type];
				}
				else if (target.towns) {
					target.towns.forEach(id => {
						let town = regGet("town",id);
						if (town.issues[target.type] === target.id) delete town.issues[target.type];
					})
				}
				else if (target.chunks) {
					let towns = [...new Set(target.chunks.map((coords) => chunkAt(coords[0],coords[1])).filter((i) => i).filter((c) => c.v.s).map((chunk) => chunk.v.s))];
					towns.forEach(id => {
						let town = regGet("town",id);
						if (town.issues[target.type] === target.id) delete town.issues[target.type];
					})
				}

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
						target.delete = true;
					}

					delete target.chunks;
					delete target.towns;
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
				if (target.town) {
					let town = regGet("town",target.town);
					if (town.issues[target.type] === target.id) delete town.issues[target.type];
				}
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
			},
			"temple": {
				symbol: "₳",
				color: [204, 82, 192],
				influences: { faith:3 },
				needsUnlock: { farm:10 },
				nameTemplate: "Temple of $"
			},
			"hospital": {
				symbol: "+",
				color: [204, 82, 82],
				influences: { disease:-2 },
				needsUnlock: { smith:20 },
				nameTemplate: "$ Hospital"
			},
			"bank": {
				symbol: "§",
				color: [81, 102, 237],
				influences: { trade:2 },
				needsUnlock: { trade:30 },
				nameTemplate: "$ Bank"
			},
			"statue": {
				symbol: "☻",
				color: [130, 130, 130],
				influences: { faith:3 },
				needsUnlock: { smith:20 },
				nameTemplate: "Statue of $"
			},
			"tower": {
				symbol: "⏸",
				color: [134, 130, 168],
				influences: { trade:3 },
				needsUnlock: { smith:30 },
				nameTemplate: "$ Towers"
			},
			"stadium": {
				symbol: "⏼",
				color: [130, 163, 168],
				influences: { happy:3 },
				needsUnlock: { smith:10 },
				nameTemplate: "$ Stadium"
			},
		},
		_disasterSubtypes: {
			"wildfire": {
				location: "land",
				radius: 2,
				message: "{{c:Brush|Bramble|Scrub|A log|A branch|A stick}} catches fire, causing [NAME] $.",
				messageDone: "[NAME] $ is extinguished.",
				color: [255, 0, 0],
				excludeBiome: ["snow"],
				
				deathRate: 1,
				destroy: true,
				spread: 4
			},
			"hurricane": {
				location: "shore",
				radius: 5,
				scale: ["1","2","3","4","5"],
				message: "[NAME] forms $ as a Category [SCALE] cylone.",
				messageDone: "[NAME] $ settles down.",
				color: [114, 122, 122],
				name: (d) => {
					return (d.x / (planetWidth/chunkSize) > 0.5 ? "Typhoon " : "Hurricane ") + generateHumanName()
				},
				
				deathRate: 0.2,
				destroy: true,
				spread: 4,
				move: 1
			},
			"earthquake": {
				location: "any",
				radius: 7,
				scale: ["5", "6", "7", "8"],
				message: "Seismic activity causes [NAME] $.",
				messageDone: "[NAME] stops rumbling $.",
				color: [140, 107, 65],
				name: (d) => "Magnitude " + d.scale + "." + randRange(0,9) + " Earthquake",

				deathRate: 1.5,
				destroy: true,
				duration: 1
			},
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
			},
			Related: (subject,target) => {
				if (!target.town) return;
				return happen("Related", subject, regGet("town", target.town));
			}
		}
	},

	product: {
		reg: "product",
		asTarget: {
			Create: (subject,target,args) => {
				target = regAdd("product", {
					name: args.name,
					type: args.type
				})

				if (args.text) target.desc = args.text;

				return target;
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
			if (!planet.stats.peakprompts || planet.stats.promptstreak > planet.stats.peakprompts) planet.stats.peakprompts = planet.stats.promptstreak;

			if (planet.usurp) {
				if (planet.day - planet.usurp > 30 && Math.random() < 0.2) {
					regToArray("town").forEach((town) => {
						if (town.influences.faith <= -5) town.influences.faith = 0;
					})
					happen("UnUsurp", null, currentPlayer);
				}
			}
			else if (planet.stats.promptstreak < -10) {
				logWarning("inactive", "{{people}} haven't heard from you in a while... Don't let them lose faith!");
				regToArray("town").forEach((town) => {
					happen("Influence", null, town, {faith:-0.25});
				})
			}

			happen("UpdateScore", subject, currentPlayer);
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

			if (subject.issues.revolution) {}
			else if (subject.influences.happy < -6) {
				let revolutionRate = (subject.influences.happy / $c.minInfluence) + ($c.minInfluence / 2 / 10);
				if (!subject.gov || subject.gov === "anarchy") revolutionRate = 0;
				if (subject.lastRevolution && planet.day-subject.lastRevolution < $c.revolutionCooldown) revolutionRate = 0;
				if (subject.lastColony && planet.day-subject.lastColony < 10) revolutionRate = 0;
				if (planet.day-subject.start <= 10) revolutionRate = 0;
				
				if (subject.gov === "dictatorship") revolutionRate *= 0.5;

				if (Math.random() < revolutionRate && planet.warnings["angry"+subject.id]) {
					let process = happen("Create", subject, null, {
						type: "revolution",
						town: subject.id,
						duration: Math.max(Math.floor(subject.size / 10), 5)
					}, "process");
					subject.issues.revolution = process.id;
					logMessage("{{c:Revolution|Rebellion}}! {{c:Angry|Furious}}, {{residents:"+subject.id+"}} {{c:mobilize|organize|revolt|storm|siege|take to the streets}} in opposition to {{c:their government|"+(subject.adj || subject.name)+" leadership|living conditions}}!", "warning");
				}
				else {
					logWarning("angry"+subject.id, "{{residents:"+subject.id+"}} are very angry!");
				}
			}
			else if (subject.influences.happy < -2) {
				logWarning("unhappy"+subject.id, "{{residents:"+subject.id+"}} are unhappy!");
			}

			if (subject.influences.happy > 1 && planet.stats.promptstreak > -10) {
				happen("Influence", null, subject, { faith:0.2 });
			}
			else if (subject.influences.happy <= -8.5 && planet.day - subject.start >= 10) {
				happen("Influence", null, subject, { faith:-0.2 });
			}

			if (!planet.stats.oldesttown || planet.stats.oldesttown < planet.day - subject.start) {
				planet.stats.oldesttown = planet.day - subject.start;
			}

			if (subject.usurp) {
				if (subject.influences.faith > 0) {
					subject.usurp = false;
					if (planet.usurp) happen("UnUsurp", subject, currentPlayer, {message:false});
					logMessage(`{{c:Hooray|Yippee|Rejoice|Praise be}}!! {{residents:${subject.id}}} have regained faith in you, and will once again ask for your input.`,"milestone");
				}
			}
			else if (!planet.usurp && planet.day - subject.start > $c.colonyCooldown) {
				if (subject.influences.faith <= -9.75 && Math.random() < 0.25) {
					subject.usurp = planet.day;

					let towns = regToArray("town");
					let usurpCount = 0;
					let totalFaith = 0;
					let allLow = true;
					for (let i = 0; i < towns.length; i++) {
						const town = towns[i];
						if (town.usurp) usurpCount++;
						totalFaith += town.influences.faith || 0;
						if (!town.influences.faith || town.influences.faith >= 1) allLow = false;
					}

					if ((allLow && totalFaith/towns.length <= -5) || (usurpCount/towns.length >= 0.9) || (totalFaith/towns.length <= -7)) {
						happen("Usurp", subject, currentPlayer);
					}
					else logMessage(`{{c:Uh oh|Erm|Hmm|Uhh, so|Not good|Yikes|Guh}}... {{residents:${subject.id}}} have lost all faith in you, and will now run their ${subject.type||"town"} without your input.`,"warning");
				}
				else if (subject.influences.faith < -0.5) {
					logWarning("unfaith"+subject.id, "{{residents:"+subject.id+"}} are quickly losing faith in you...");
				}
			}

			if (subject.econcrash) {
				if (Math.random() < 0.25) {
					subject.econ = chooseDifferent(Object.keys(econForms), subject.econ);
					subject.influences.trade = 0;
					delete subject.econcrash;
					logMessage(`{{residents|${subject.id}}} have {{c:elected|adopted}} a new, ${wordAdjective(subject.econ)} {{c:economy|economic system|economic structure}}.`)
				}
			}
			else if (subject.econ && subject.influences.trade <= -9) {
				if (!planet.warnings["lowtrade"+subject.id]) {
					logWarning("lowtrade"+subject.id, `Economic collapse in {{regname:town|${subject.id}}} is imminent!`);
				}
				else if (Math.random() < 0.25) {
					subject.econcrash = true;
					delete subject.tax;
					happen("Influence", null, subject, { trade:-1, happy:-5, temp:true });
					logMessage(`Crash!! The economy has collapsed in {{regname:town|${subject.id}}}.`, "warning");
				}
			}

			for (let type in subject.issues) {
				if (isNaN(subject.issues[type])) {
					delete subject.issues[type];
					continue;
				}
				let process = regGet("process", subject.issues[type]);
				if (!process || process.done || process.end) delete subject.issues[type];
			}

			if (!subject.peakpop || subject.peakpop < subject.pop) {
				subject.peakpop = subject.pop;
			}
			if (!subject.peaksize || subject.peaksize < subject.size) {
				subject.peaksize = subject.size;
			}
		}
	},

	"townDeath": {
		daily: true,
		subject: { reg: "town", all: true },
		func: (subject, target, args) => {
			let pop = subject.pop;
			if (pop <= 0) return;
			let deathRate = $c.deathRate(subject);
			let popChange = pop*deathRate;
			if (popChange > pop) {
				popChange = pop;
			}

			if (Math.random() < (popChange % 1)) popChange += 1;
			popChange = Math.floor(popChange);

			if (popChange) happen("Death", null, subject, { count: popChange, cause: "natural" });
		}
	},
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
	"townExpand": {
		daily: true,
		subject: { reg: "town", all: true },
		func: (subject, target, args) => {
			if (subject.legal["travel.expansion"] === false) return;
			if (subject.issues.revolution) return;
			if (subject.issues.war) return;

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
							colonyRate = Math.max(colonyRate, 0.05)
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
							newTown.level = 0;
							newTown.legal = structuredClone(subject.legal);
							newTown.influences.faith = subject.influences.faith;
							if (subject.usurp) newTown.usurp = planet.day;
							if (subject.gov) newTown.gov = subject.gov;
							if (subject.econ) newTown.econ = subject.econ;
							if (subject.tax) newTown.tax = subject.tax / 2;
							let newName = happen("NameVariant", null, subject, {x:colonyChunk.x, y:colonyChunk.y});
							if (newName) newTown.name = newName;
							// Colony migration
							let migrateCount = 2;
							if (subject.influences.happy < 0) {
								migrateCount = randRange(subject.pop*0.1, subject.pop*0.9);
								logMessage("Unhappy with life in {{regname:town|"+subject.id+"}}, settlers found {{regname:town|"+newTown.id+"}}.");
								happen("SetRelation", subject, newTown, {amount:-3});
							}
							else {
								migrateCount = randRange(subject.pop*0.05, subject.pop*0.25);
								logMessage("{{c:Settlers|Travelers}} from {{regname:town|"+subject.id+"}} found {{regname:town|"+newTown.id+"}}.");
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
		check: (subject) => subject.legal["travel.expansion"] !== false,
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

			if (planet.day - subject.start <= 1) {}
			else if (foodCount < 1) {
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
			let employed = sumValues(subject.jobs);
			let unemployed = subject.pop - employed;
			let toEmploy = Math.max(Math.floor(unemployed * (subject.legal.unemployment === false ? 0.25 : $c.baseEmployRate)), Math.random() < 0.5 ? 1 : 0);
			if (employed >= subject.pop) toEmploy = 0;
			if (toEmploy) {
				let jobs = [];
				let weights = [];
				defaultJobs.forEach(job => {
					if (jobNeedsUnlock[job] && planet.unlocks[jobNeedsUnlock[job][0]] >= jobNeedsUnlock[job][1]) {
						jobs.push(job);
						weights.push( Math.floor(addInfluence(100, subject, (jobInfluences[job]||0)) / 10) );
					}
				});
				if (!jobs.length) return;
				for (let i = 0; i < toEmploy; i++) {
					const job = chooseWeighted(jobs,weights.slice());
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
			if (planet.unlocks.farm < 20) return;
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
		subject: { reg:"town", filter: (town) => (planet.day - town.start + 1) % 100 === 0 && (planet.day - town.start > 5) },
		func: (subject) => {
			logMessage(`{{residents|${subject.id}}} celebrate {{num:${planet.day - subject.start + 1}}} days since their town's founding.`, "milestone");
			happen("Influence", null, subject, {temp:true, happy:1})
		}
	},

	"townPay": {
		daily: true,
		subject: { reg:"town", all:true },
		check: () => planet.unlocks.trade >= 30,
		func: (subject) => {
			if (!subject.econ) return;
			let employed = sumValues(subject.jobs);
			subject.wealth = (subject.wealth || 0) + employed;
		}
	},
	"townTax": {
		daily: true,
		subject: { reg:"town", all:true },
		check: () => planet.unlocks.trade >= 30,
		func: (subject) => {
			if (!(subject.tax > 0)) return;
			let taxRate = subject.tax;
			if (subject.legal["crime.tax_evasion"]) taxRate /= 2;
			let employed = sumValues(subject.jobs);
			let tax = employed * taxRate;
			tax = Math.min(tax, subject.wealth);

			subject.wealth -= tax;
			subject.wealth = Math.max(0, subject.wealth);
			happen("AddResource", null, subject, { type:"cash", count:tax });

			if (!subject.econStart || planet.day - subject.econStart > 20) {
				let perCapita = Math.round((subject.wealth || 0) / subject.pop);
				if (!subject.econcrash && perCapita < subject.pop / 100) {
					logWarning("poor"+subject.id, `{{residents:${subject.id}}} are very poor!`);
					happen("Influence", null, subject, { trade:-0.5 });
				}
			}
		}
	},

	"townTaxChange": {
		random: true,
		subject: {
			reg: "player", id: 1
		},
		target: {
			reg: "town", random: true
		},
		check: (_, target) => planet.unlocks.trade >= 30 && target.econ,
		value: (_, target, args) => {
			let diff = randRange(1,5) / 100;
			if (Math.random() < 0.5 && target.tax) diff = -diff;
			if (diff < 0) diff = Math.max(-target.tax, diff);

			args.result = (target.tax || 0) + diff;
			args.result = Math.max(0, args.result);
			if (!args.result) return false;
			if (Math.abs(args.result) < 0.01) args.result = 0;
			diff = Math.round(diff * 100) / 100;
			args.result = Math.round(args.result * 100) / 100;

			return diff;
		},
		message: (_, target, args) => {
			let msg = `Motion from {{regname:town|${target.id}}} to `;

			if (!target.tax) return msg+`introduce a {{percent:${args.value}}} income tax for funding town projects.`;

			if (args.result === 0) return msg+`abolish the town's {{percent:${target.tax}}} income tax.`;
			
			return msg+(args.value > 0 ? "increase" : "decrease")+` the town's income tax by {{percent:${args.value}}}, for a total of {{percent:${args.result}}}.`;
		},
		messageDone: (_, target, args) => {
			let msg = `{{regname:town|${target.id}}} `;

			if (!target.tax) return msg+`introduces a {{percent:${args.value}}} income tax.`;

			if (args.result === 0) return msg+`abolishes the town's income tax.`;
			
			return msg+(args.value > 0 ? "increases" : "decreases")+` the town's income tax to {{percent:${args.result}}}.`;
		},
		messageNo: (_, target) => `{{residents:${target.id}}} reject tax changes.`,
		func: (_, target, args) => {
			target.tax = args.result;
		},
		needsUnlock: {
			trade: 30
		},
		weight: $c.UNCOMMON
	},

	"townTrade": {
		random: true,
		auto: true,
		subject: { reg:"town", random:true },
		target: { reg:"town", nearby:true },
		check: () => planet.unlocks.trade >= 10,
		func: (subject, target, args) => {
			let resource = chooseDifferent(Object.keys(target.resources),"cash");

			let seller;
			let buyer;

			if (subject.resources[resource] > target.resources[resource]) {
				seller = subject;
				buyer = target;
			}
			else {
				seller = target;
				buyer = subject;
			}

			let useCash = !!buyer.resources.cash;

			let min = Math.round(seller.resources[resource] * 0.05);
			min = Math.max(min, 1);
			let max = Math.round(seller.resources[resource] * 0.33);
			let count = randRange(min, max);
			if (useCash) count = Math.min(count, Math.max(Math.floor(buyer.resources.cash), 1));

			if (!count) return;

			happen("AddResource", seller, buyer, {type:resource, count:count});
			happen("RemoveResource", buyer, seller, {type:resource, count:count});
			if (useCash) {
				happen("AddResource", buyer, seller, {type:"cash", count:count});
				happen("RemoveResource", seller, buyer, {type:"cash", count:count});
			}
			happen("AddRelation", seller, buyer, {amount:1});

			args.message = `{{regname:town|${buyer.id}}} ${useCash ? "{{c:purchases|buys}}" : "receives"} ${resource} from {{regname:town|${seller.id}}}.`;
		},
		message: (subject, target, args) => args.message,
		influencedBy: {
			trade: 1
		},
		weight: $c.COMMON
	},

	"townDiplomacy": {
		random: true,
		auto: true,
		subject: { reg:"town", random:true },
		target: { reg:"town", nearby:true },
		value: (subject, target, args) => {
			args.peace = Math.random() < (subject.influences.military > 8 ? 0.2 : 0.475);

			if (Math.random() < 0.75) {
				if (args.peace && subject.relations[target.id] < 0) args.peace = false;
				else if (!args.peace && subject.relations[target.id] > 0) args.peace = true;
			}

			if (!subject.center) happen("UpdateCenter", null, subject);
			args.location = nearbyTown(subject.center[0], subject.center[1], (t) => t.id !== subject.id, 5);

		},
		check: (subject, target) => {
			if (subject.issues.revolution || target.issues.revolution) return false;
			return true;
		},
		func: (subject, target, args) => {

			happen("AddRelation", subject, target, {amount: args.peace ? 2 : -2});

			let relation = subject.relations[target.id];
			if (isNaN(relation)) return;

			if (!args.peace && relation < 0) {
				let warRate = 0.15;
				warRate *= Math.abs(relation);
				warRate = addInfluence(warRate, subject, "military");
				if (subject.issues.war || target.issues.war) warRate = 0;
				if (!subject.jobs.soldier) warRate = 0;
				if (planet.day - subject.start < $c.revolutionCooldown) warRate = 0;

				if (planet.unlocks.military && Math.random() < warRate) {
					let process = happen("Create", subject, null, {
						type: "war",
						towns: [subject.id, target.id]
					}, "process");
					subject.issues.war = process.id;
					target.issues.war = process.id;
					args.war = true;
					logMessage(choose([
						`War! {{regadj:town|${subject.id}}} {{c:troops|soldiers}} begin an offensive along the {{regadj:town|${target.id}}} border.`,
						`Fire! {{regname:town|${subject.id}}} declares war on {{regname:town|${target.id}}}.`,
					]), "warning");
				}
			}

		},
		message: (subject, target, args) => {
			if (args.war) return;
			message = null;

			if (args.peace) {
				message = `Diplomats from {{regname:town|${subject.id}}} `;
				if (args.location.id === target.id || !args.location) {
					message += `arrive in {{regname:town|${target.id}}}`;
				}
				else message += `and {{regname:town|${target.id}}} meet in {{regname:town|${args.location.id}}}`;
				if (subject.issues.war && target.issues.war) message += ` to discuss {{c:peace plans|a ceasefire|an end to the war}}.`
				else message += ` to improve relations.`;
			}
			else {
				message = `Anger erupts following a tense meeting `;
				if (args.location.id === target.id || !args.location) {
					message += `with {{regname:town|${subject.id}}} in {{regname:town|${target.id}}}`;
				}
				else message += `between {{regname:town|${subject.id}}} and {{regname:town|${target.id}}} in {{regname:town|${args.location.id}}}`;
				message += ".";
			}

			if (!message) return false;
			return message;
		},
		influencedBy: {
			travel: 1
		},
		weight: $c.SUPERCOMMON
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
				happen("Cancel", null, subject);
				return;
			}

			let cost = randRange(1, Math.ceil(subject.total * 0.5));

			let rock = happen("CountResource", subject, target, {type:"rock"});
			let lumber = happen("CountResource", subject, target, {type:"lumber"});
			
			// use lumber and rock, rock amount is worth double
			let rockCost = Math.min(rock, Math.ceil(cost * 0.5));
			let lumberCost = Math.min(lumber, cost - rockCost);
			
			happen("RemoveResource", subject, target, {type:"rock", count:rockCost});
			happen("RemoveResource", subject, target, {type:"lumber", count:lumberCost});
			happen("RemoveResource", subject, target, {type:"cash", count:cost});

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
			let doneTowns = {};

			if (subject.chunks !== undefined && !Array.isArray(subject.chunks)) subject.chunks = [];

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
					if (!subject.dir) {
						subject.dir = [choose([-1,0,1]), choose([-1,0,1])];
						while (subject.dir[0] === 0 && subject.dir[1] === 0) {
							subject.dir = [choose([-1,0,1]), choose([-1,0,1])];
						}
					}
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

					if (!doneTowns[town.id]) {
						doneTowns[town.id] = true;
						happen("Influence", subject, town, {temp:true, happy:-0.33});
						town.lastColony = planet.day - 10;
						if (!subject.done) town.issues.disaster = subject.id;
					}

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
				subject.towns = [...new Set(subject.chunks.map((coords) => chunkAt(coords[0],coords[1])).filter((i) => i).filter((c) => c.v.s).map((chunk) => chunk.v.s))];
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
					logMessage(data.messageDone.replace(/\$/g, subject.locationDesc || "").replace(/\[NAME\]/g, `{{regname:process|${subject.id}}}`).replace(/\[SCALE\]/g, subject.scale));
				}

				happen("Finish", null, subject);
				delete subject.locationDesc;
				delete subject.dir;
			}
		}
	},
	"processRevolution": {
		meta: true,
		subject: { reg: "process" },
		func: (subject, target, args) => {
			let town = regGet("town", subject.town);
			if (!town || town.end) return;

			town.lastRevolution = planet.day;

			let newDeaths = 0;
			let newInjuries = 0;
			let destroyed = [];

			if (subject.duration) subject.duration--;

			let deaths = (town.pop*0.1*(randRange(8,12) / 10))/town.size;
			deaths = Math.min(town.pop/town.size,deaths);

			let injuries = deaths*10*(randRange(8,12) / 10);
			injuries = Math.min(town.pop/town.size,injuries);
			if (Math.random() < injuries) {
				injuries = Math.ceil(injuries);
				newInjuries += injuries;
			}

			if (town.end) {
				delete town.issues.revolution;
				happen("Finish", null, subject);
				return;
			}

			if (Math.random() < 0.5) {
				const chunk = randomChunk((c) => c.v.s === town.id);
				if (!chunk) return;
				if (!chunk.v.s) return;
				const unclaimed = happen("Unclaim", subject, town, {x:chunk.x, y:chunk.y});
				if (unclaimed.marker) destroyed.push(unclaimed.marker);
				deaths += town.pop / town.size / 2;
			}
			if (Math.random() < deaths) {
				deaths = Math.ceil(deaths);
				deaths = happen("Death", subject, town, {count:deaths, cause:"disaster"}).count;
				newDeaths += deaths;
			}

			if (town.end) {
				delete town.issues.revolution;
				happen("Finish", null, subject);
				return;
			}

			happen("Influence", subject, town, { happy:-0.2, temp:true });
			happen("Influence", subject, town, { faith:-0.3 });

			if (newDeaths) subject.deaths = (subject.deaths||0) + newDeaths;
			if (newInjuries) subject.injuries = (subject.injuries||0) + newInjuries;

			const both = newDeaths && newInjuries;
			if ((newDeaths || newInjuries)) {
				logMessage(
					`{{regadj:town|${town.id}}} Revolution ${newDeaths ? "kills "+newDeaths : ""}${both ? " and " : ""}${newInjuries ? "injures "+newInjuries : ""}.` +
					(destroyed.length ? " " + commaList(destroyed.map((id) => `{{regname:marker|${id}}}`)) + " " + (destroyed.length === 1 ? "was" : "were") + " destroyed." : "")
				, "warning");
			}

			if (subject.duration <= 0 || (subject.chunks && !subject.chunks.length)) {

				let militaryPower = (town.jobs.soldier || 0) / town.pop;
				if (Math.random() < militaryPower) {
					for (let influence in town.influences) {
						if (influence === "faith") continue;
						town.influences[influence] *= 0.75;
					}
					logMessage(`{{regadj:town|${town.id}}} Revolution comes to an end after being thwarted by {{regadj:town|${town.id}}} military forces.`)
					delete town.issues.revolution;
					happen("Finish", null, subject);
					return;
				}

				for (let influence in town.influences) {
					if (influence === "faith") continue;
					town.influences[influence] /= 2;
				}

				if (Math.random() < 0.5 && town.size > 5) {
					// Part of town splits off
					happen("UpdateCenter", subject, town);
					let groups = splitChunks(filterChunks((c) => c.v.s === town.id), town.center, 2);
					let newGroup = choose(["1","2"]);
					if (!groups[newGroup].length) return;

					let newTown = regAdd("town", defaultTown());

					newTown.gov = chooseDifferent(Object.keys(govForms), town.gov);
					newTown.pop = 0;

					let oldSize = town.size;

					groups[newGroup].forEach((chunk) => {
						happen("Unclaim", subject, town, {x:chunk.x, y:chunk.y});
						chunk.v.s = newTown.id;
						newTown.size ++;
					})

					happen("UpdateCenter", null, newTown);
					let newName = happen("NameVariant", null, town, {x:newTown.center[0], y:newTown.center[1]});
					if (newName) newTown.name = newName;

					newTown.color = colorChange(town.color);
					newTown.lastRevolution = planet.day;

					happen("Migrate", town, newTown, {count: Math.round(town.pop * (newTown.size / oldSize))});
					newTown.influences.happy = 0;
					newTown.influences.faith = Math.min(0.5, town.influences.faith);
					newTown.former = town.id;
					for (let key in town.relations) {
						let id = parseInt(key);
						let relation = town.relations[key];
						happen("SetRelation", town, regGet("town", id), {amount:relation * 0.1});
					}
					happen("SetRelation", town, newTown, {amount:-5});

					logMessage(`{{regadj:town|${town.id}}} Revolution comes to an end, and the autonomous ${newTown.gov} of {{regname:town|${newTown.id}}} is formed.`);

				}
				else {
					// Town forms new government
					town.gov = chooseDifferent(Object.keys(govForms), town.gov);
					town.legal = {};
					if (Math.random() < 0.33) {
						if (town.gov === "dictatorship" && !town.name.includes("egime")) {
							town.prefix = "the";
							town.suffix = "Regime";
						}
						else if (town.gov === "republic" && !town.name.includes("epublic")) {
							if (Math.random() < 0.5) { town.prefix = "Republic of"; delete town.suffix }
							else { town.suffix = "Republic"; delete town.prefix; }
						}
						else if (town.gov === "monarchy" && !town.name.includes("ingdom")) {
							if (Math.random() < 0.5) { town.prefix = "Kingdom of"; delete town.suffix }
							else { town.suffix = "Kingdom"; delete town.prefix }
						}
						else if (!town.name.includes("New")) town.name = "New "+town.name;
					}
					town.color = colorChange(town.color);
					town.influences.happy = 0;
					logMessage(`Revolution comes to an end, and {{regname:town|${town.id}}} reorganizes into a ${town.gov}.`);
				}

				delete town.issues.revolution;
				happen("Finish", null, subject);
			}
		}
	},
	"processWar": {
		meta: true,
		subject: { reg: "process" },
		func: (subject, target, args) => {
			if (!subject.towns || subject.towns.length === 0) {
				happen("Finish", null, subject);
				return;
			}

			let newDeaths = 0;
			let newInjuries = 0;
			let destroyed = [];

			for (let i = 0; i < subject.towns.length; i++) {
				const town1 = regGet("town",subject.towns[i]);
				for (let j = 0; j < subject.towns.length; j++) {
					if (i === j) continue;
					const town2 = regGet("town",subject.towns[j]);

					if (town1.end || town2.end) {
						happen("Finish", null, subject);
						return;
					}
					if (!town1.center) happen("UpdateCenter", null, town1);
					if (!town2.center) happen("UpdateCenter", null, town2);

					if (town1.relations[town2.id] >= 0) {
						logMessage(`Following {{c:deliberations|intense talks}}, {{regname:town|${town1.id}}} and {{regname:town|${town2.id}}} agree to {{c:peace|a ceasefire|a truce|end the war}}.`);
						delete town1.issues.war;
						delete town2.issues.war;
						happen("Finish", null, subject);
						return;
					}

					happen("AddRelation", town1, town2, {amount:-0.1});
					happen("Influence", null, town1, {happy:-0.1, temp:true});
					happen("Influence", null, town2, {happy:-0.1, temp:true});

					// 0-1
					let power = (town1.jobs.soldier || 0) / ((town1.jobs.soldier || 0) + (town2.jobs.soldier || 0));

					let density = town2.pop / town2.size;
					
					let chunkCount = (Math.floor(planet.unlocks.military / 10) + 2 /*3 by default*/) * power;
					if (chunkCount < 1 && Math.random() < chunkCount) chunkCount = 1;
					chunkCount = Math.floor(chunkCount);
					chunkCount = Math.min(chunkCount, town2.size);

					let kill = 0;
					for (let i = 0; i < chunkCount; i++) {
						if (town2.end) break;

						let chunk = nearestChunk(town1.center[0], town1.center[1], (c) => c.v.s === town2.id);
						if (!chunk) break;

						if (density < 1 && Math.random() < density) kill += 1;
						else kill += Math.round(density);

						happen("Unclaim", town1, town2, {x:chunk.x, y:chunk.y});

						if (Math.random() < 0.5) { // take over
							town1.size ++;
							chunk.v.s = town1.id;
							happen("UpdateCenter", null, town1);
						}
						happen("UpdateCenter", null, town2);
					}

					// kill
					if (kill && !town2.end) {
						newDeaths += happen("Death", null, town2, {count:kill, cause:"war"}).count;
					}

					if (power < 0.2 && Math.random() < 0.25 && planet.day - subject.start > 5) {
						if (town1.size > 10 && Math.random() < 0.5) {
							logMessage(`{{regname:town|${town1.id}}} agrees to cede some territory to {{regname:town|${town2.id}}}, ending the war.`);
							let chunk = nearestChunk(town2.center[0], town1.center[1], (c) => c.v.s === town1.id);
							let chunks = splitChunks(filterChunks((c) => c.v.s === town1.id), [chunk.x, chunk.y], 2)[1];
							happen("Migrate", town1, town2, {count: Math.floor(town1.pop / town1.size * chunks.length)});
							chunks.forEach((c) => {
								happen("Unclaim", town2, town1, {x:c.x, y:c.y});
								c.v.s = town2.id;
								town2.size ++;
							});
							happen("UpdateCenter", null, town1);
						}
						else {
							logMessage(`Surrounded, members of the {{regadj:town|${town1.id}}} government surrender to {{regadj:town|${town2.id}}} soldiers.`);
							// all territory goes to town2
							happen("Migrate", town1, town2, {count: town1.pop});
							filterChunks((c) => c.v.s === town1.id).forEach((c) => {
								happen("Unclaim", town1, town2, {x:c.x, y:c.y});
								c.v.s = town2.id;
								town2.size ++;
							})
							town1.ender = town2.id;
							if (!town1.end) happen("End", null, town1);
						}
						subject.winner = town2.id;
						town2.won = (town2.won||0) + 1;
						happen("UpdateCenter", null, town2);
						happen("Finish", null, subject);
						return;
					}
					if (town2.end) {
						town2.ender = town1.id;
						subject.winner = town1.id;
						town1.won = (town1.won||0) + 1;
						logMessage(`Victory! {{regadj:town|${town1.id}}} soldiers defeat {{regname:town|${town2.id}}}.`)
						return;
					}

				}
			}

			if (newDeaths) subject.deaths = (subject.deaths||0) + newDeaths;
			if (newInjuries) subject.injuries = (subject.injuries||0) + newInjuries;
			const both = newDeaths && newInjuries;
			if (newDeaths || newInjuries) {
				logMessage(
					`War between ${commaList(subject.towns.map((t) => `{{regname:town|${t}}}`))} ${newDeaths ? "kills "+newDeaths : ""}${both ? " and " : ""}${newInjuries ? "injures "+newInjuries : ""}.` +
					(destroyed.length ? " " + commaList(destroyed.map((id) => `{{regname:marker|${id}}}`)) + " " + (destroyed.length === 1 ? "was" : "were") + " destroyed." : "")
				, "warning");
			}

			// ~if military unlocked, start war
			// ~influenced by military
			// ~set both towns issues.war so they don't start another
			// ~peace talks instead when in war
			// ~cancel war if relations improve
				// ~following deliberations, agree to peace/ceasefire/truce
			// ~each day of war, decrease relations a little
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
		noUsurp: true
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
		check: (subject, target) => {
			return !target.lastColor || planet.day - target.lastColor > 50;
		},
		value: (subject, target) => {
			return colorChange(target.color);
		},
		// check: (subject, target) => {
		//   return planet.day % 5 === 0;
		// },
		func: (subject, target, args) => {
			target.lastColor = planet.day;
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
			// choose: ["TestTown", "TestCity", "TestVille"],
			message: (_, target) => `What should {{regname:town|${target.id}}} be called?`,
			preview: (text) => `Welcome to {{b:${titleCase(text)}}}.${specialNames[text.toLowerCase().replace(/ +/g,"")] ? " {{color:�|#ffff00|true}}" : ""}`
		},
		check: (subject, target) => {
			return !target.lastRename || planet.day - target.lastRename > 50;
		},
		func: (subject, target, args) => {
			if (!args.value) return false;

			target.lastRename = planet.day;

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
							.replace(/\$/g, `{{color:${data.emblem || "O"}|${data.emblemColor || data.foreground || "#000000"}|${data.background || "#ffffff"}}}`);
					}
					else {
						target.flag = `{{color:${target.flag}|${data.foreground || "#000000"}|${data.background || "#ffffff"}}}`
					}
				}
				else if (data.emblem) {
					data.symbol = data.emblem;
				}
				if (data.dem) target.dem = titleCase(data.dem);
				if (data.dems) target.dems = titleCase(data.dems);
				if (data.adj) target.adj = titleCase(data.adj);
				else if (data.dem) target.adj = titleCase(data.dem);
				if (data.gov) target.gov = data.gov;
				if (data.prefix) target.prefix = data.prefix;
				if (data.suffix) target.suffix = data.suffix;
				if (data.gov) target.gov = data.gov;
				if (data.econ) target.econ = data.econ;
				let color = data.color || data.emblemColor || data.foreground;
				if (color) {
					if (typeof color === "string" && color.match(/^#/)) color = hexToRGB(color);
					if (Array.isArray(color)) target.color = color;
				}
				if (data.end) happen("End", subject, target);

				logTip("specialName","You discovered a special name. Try to find them all!");
			}

			return happen("Rename", subject, target, args);
		},
		skip: (subject, target, args, func) => {
			target.lastRename = planet.day;
		},
		message: (subject, target, args) => `{{residents|${target.id}}} want you to pick their town's new name.`,
		messageDone: (subject, target, args) => `{{regname:town|${target.id}}} adopts a new name.`,
		messageNo: (subject, target, args) => `{{regname:town|${target.id}}} keeps its name.`,
		weight: $c.RARE
	},
	"townDemonym": {
		random: true,
		subject: {
			reg: "player", id: 1
		},
		target: {
			reg: "town", random: true
		},
		check: (subject, target) => {
			if (!target.lastRename) return false;
			if (target.lastRename > target.lastDemonym) return true;
			return target.dem === undefined;
		},
		value: {
			ask: true,
			message: (_, target) => `What should a person from {{regname:town|${target.id}}} be called?`,
			preview: (text) => `This {{b:${titleCase(text)}}}. These {{p:${titleCase(wordPlural(text))}}}. The {{p:${titleCase(wordAdjective(text))}}} people.`,
			basis: (_, target) => target.name
		},
		func: (subject, target, args) => {
			if (!args.value) return false;
			target.lastDemonym = planet.day;
			target.lastRename = planet.day;
			args.value = args.value.replace(/^an? /, "");
			target.dem = titleCase(args.value);
			target.dems = titleCase(args.previewParts[0]);
			target.adj = titleCase(args.previewParts[1]);
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
			preview: (text) => `This {{b:${titleCase(text)}}}. These {{p:${titleCase(wordPlural(text))}}}. The {{p:${titleCase(wordAdjective(text))}}} people.`,
			basis: () => planet.name
		},
		func: (subject, target, args) => {
			if (!args.value) return false;
			args.value = args.value.replace(/^an? /, "");
			planet.dem = titleCase(args.value);
			planet.dems = titleCase(args.previewParts[0]);
			planet.adj = titleCase(args.previewParts[1]);
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
		messageNo: (subject, target, args) => `{{residents|${target.id}}} reject the {{c:hollow|shallow}} symbolism of flags.`,
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
	"townCurrency": {
		random: true,
		subject: {
			reg: "player", id: 1
		},
		target: {
			reg: "town", random: true
		},
		check: (subject, target) => target.currency === undefined && target.econ,
		value: {
			ask: true,
			message: (_, target) => `What should money from {{regname:town|${target.id}}} be called?`,
			preview: (text) => `One {{b:${titleCase(text)}}}. Twenty ${titleCase(wordPlural(text))}.`
		},
		func: (subject, target, args) => {
			if (!args.value) return false;
			args.value = args.value.replace(/^an? /, "");
			target.currency = titleCase(args.value);
			let split = args.value.toLowerCase().split(" ");
			let lastWord = split[split.length - 1];
			let letter = lastWord[0];
			if (!wordComponents.CURRENCY[letter]) letter = "_";
			let sign = choose(wordComponents.CURRENCY[letter].split(","));
			if (specialCurrencies[lastWord]) sign = specialCurrencies[lastWord];
			target.currencySign = sign;
		},
		message: (subject, target, args) => `{{regname:town|${target.id}}} needs a name for their currency.`,
		messageDone: (subject, target, args) => `{{residents:${target.id}}} have spare {{symbol:${target.currencySign}|rgb(${target.color.join(",")})}} ${wordPlural(target.currency)} lying around.`,
		weight: $c.UNCOMMON,
		needsUnlock: {
			trade: 30
		}
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
			if (target.legal["travel.construction"] === false) return false;

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
			return choose(choices) || false;
		},
		check: (subject, target, args) => {
			if (target.size <= 5) return false;
			if (target.lastProject && planet.day - target.lastProject < $c.townProjectCooldown) return false;
			if (!args.value) return false;
			
			return !regExists("process", (p) => !p.done && p.town === target.id);
		},
		func: (subject, target, args) => {
			target.lastProject = planet.day;

			let project = happen("Create", target, null, {
				type: "project",
				subtype: args.value,
				cost: Math.max(20, Math.round(target.pop))
			}, "process")

			return project;
		},
		message: (subject, target, args) => `Motion from {{regname:town|${target.id}}} to {{c:begin|start}} {{c:constructing|building|construction of}} a new ${args.value.replace(/_/g," ")}.`,
		messageDone: (subject, target, args) => `{{residents|${target.id}}} {{c:begin|start}} {{c:constructing|building|construction of}} a ${args.value.replace(/_/g," ")}.`,
		messageNo: (subject, target, args) => `{{regname:town|${target.id}}} rejects the construction of a ${args.value.replace(/_/g," ")}.`,
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
			},
			related: true,
			skip: true
		},
		check: (subject, target, args) => {
			if (planet.usurp) return false;
			if (!target.town) return true;
			let town = regGet("town", target.town);
			if (town.usurp) return false;
			return true;
		},
		func: (subject, target, args) => {
			if (!args.value) return false;
			let data = actionables.process._projectSubtypes[target.subtype];
			let name = args.value +" "+target.subtype;
			if (data && data.nameTemplate) name = data.nameTemplate.replace(/\$/g, args.value);
			target.name = titleCase(name);
			delete target.named;
			if (args.namer) target.namer = args.namer;
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
			args.name = args.name.replace(/_/g," ");

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

	"townGov": {
		random: true,
		subject: {
			reg: "player", id: 1
		},
		target: {
			reg: "town", random: true
		},
		value: () => choose(Object.keys(govForms)),
		check: (_, target) => !govForms[target.gov],
		func: (subject, target, args) => {
			target.gov = args.value;
			if (govForms[args.value].influences) {
				happen("Influence", subject, target, govForms[args.value].influences);
			}
		},
		message: (subject, target, args) => `Motion from {{regname:town|${target.id}}} to {{c:establish|form}} a {{c:${wordAdjective(args.value)} government|${args.value}}}.`,
		messageDone: (subject, target, args) => `{{regname:town|${target.id}}} {{c:establishes|forms}} a {{c:${wordAdjective(args.value)} government|${args.value}}}.`,
		messageNo: (subject, target, args) => `{{residents:${target.id}}} reject ${wordAdjective(args.value)} ideals.`,
		weight: $c.SUPERCOMMON,
		needsUnlock: {
			"government": 10
		}
	},
	"townEcon": {
		random: true,
		subject: {
			reg: "player", id: 1
		},
		target: {
			reg: "town", random: true
		},
		value: () => choose(Object.keys(econForms)),
		check: (_, target) => !target.econ,
		func: (subject, target, args) => {
			target.econ = args.value;
			target.econStart = planet.day;
			if (econForms[args.value].influences) {
				happen("Influence", subject, target, econForms[args.value].influences);
			}
		},
		message: (subject, target, args) => `Motion from {{regname:town|${target.id}}} to adopt {{c:a ${wordAdjective(args.value)} economy|${args.value}}}.`,
		messageDone: (subject, target, args) => `{{regname:town|${target.id}}} adopts {{c:a ${wordAdjective(args.value)} economy|${args.value}}}.`,
		messageNo: (subject, target, args) => `{{residents:${target.id}}} reject ${args.value}.`,
		weight: $c.SUPERCOMMON,
		needsUnlock: {
			"trade": 10
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
			ask: true,
			shuffle: false
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
		messageDone: (subject, target, args) => `{{people}} say hello.`,
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

	"increaseResearch": {
		random: true,
		subject: {
			reg: "player", id: 1
		},
		target: {
			reg: "town", random: true
		},
		value: (subject, target, args) => {
			let choices = Object.keys(researchInfluences).filter((r) => {
				if (target.research[r] === 10) return false;
				if (influenceNeedsUnlock[r] && !planet.unlocks[influenceNeedsUnlock[r]]) return false;
				return true;
			});
			if (!choices.length) return false;
			
			if (Object.keys(target.research).length) {
				const entries = Object.entries(target.research);
				entries.sort((a, b) => b[1] - a[1]);
				if (entries[0]) args.highest = entries[0][0];
			};

			return choose(choices);
		},
		message: (subject, target, args) => `How should {{regname:town|${target.id}}} prioritize ${researchInfluences[args.value]} research?`,
		messageDone: (subject, target, args) => `{{regname:town|${target.id}}} will prioritize ${researchInfluences[args.value]} research${ args.highest ? " higher than "+researchInfluences[args.highest] : "" }.`,
		buttonYes: "high",
		func: (subject, target, args) => {
			let influences = {};
			for (let key in target.research) {
				if (key === args.value) continue;
				target.research[key] = target.research[key] * 0.5;
				influences[key] = -0.25;
				if (target.research[key] <= 1) {
					delete target.research[key];
					continue;
				}
				target.research[key] = Math.round(target.research[key]);
			}

			target.research[args.value] = 10;
			influences[args.value] = 1;

			happen("Influence", subject, target, influences);
		},
		messageNo: (subject, target, args) => `{{regname:town|${target.id}}} will ${args.highest ? "keep "+researchInfluences[args.highest]+" research higher than "+researchInfluences[args.value] : "not prioritize "+researchInfluences[args.value]}.`,
		buttonNo: "low",
		funcNo: (subject, target, args) => {
			if (!target.research[args.value]) return;
			let influences = {};

			for (let key in target.research) {
				if (key === args.value) continue;
				target.research[key] += target.research[args.value] * 0.5;
				influences[key] = 0.1;
				target.research[key] = Math.round(target.research[key]);
				target.research[key] = Math.min(10, target.research[key]);
			}

			target.research[args.value] = target.research[args.value] * 0.25;
			if (target.research[args.value] <= 1) {
				delete target.research[args.value];
			}
			else target.research[args.value] = Math.round(target.research[args.value]);
			influences[args.value] = -1;

			happen("Influence", subject, target, influences);
		},
		weight: $c.COMMON
	},
	"doResearch": {
		daily: true,
		subject: {
			reg: "town", all: true
		},
		func: (subject) => {
			let influences = {};
			for (let key in subject.research) {
				let value = subject.research[key];
				value = (value / 10) * 0.05;
				influences[key] = value;
			}
			happen("Influence", null, subject, influences);
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

			let scale = null;
			if (data.scale) {
				scale = randRange(0, data.scale.length-1) + 1;
			}

			let chunks;
			if (data.radius) {
				let radius = data.radius;
				if (data.scale) {
					radius *= scale / data.scale.length;
					radius = Math.ceil(radius);
				}

				chunks = circleChunks(chunk.x, chunk.y, radius, true);
			}
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
			if (data.scale) disaster.scale = data.scale[scale - 1];
			args.message = args.message.replace(/\[NAME\]/g, `{{regname:process|${disaster.id}}}`).replace(/\[SCALE\]/g, disaster.scale);

			towns.forEach((id) => {
				let town = regGet("town",id);
				town.issues.disaster = disaster.id;
			})

			if (data.name) disaster.name = data.name(disaster);
			delete disaster.scale;

			return disaster;
		},
		message: (subject, target, args) => {
			return args.message;
		},
		weight: $c.RARE
	},

	"ambientBlurb": {
		random: true,
		auto: true,
		subject: {
			reg: "nature", id: 1
		},
		check: () => !planet.dead,
		value: (_, __, args) => {
			if (planet.dead) return false;
			
			let choices = [];
			let weights = [];
			let max = allBlurbs.ambient.length;
			for (let i = 0; i < allBlurbs.ambient.length; i++) {
				let index = planet.recentBlurbs.ambient.indexOf(i);
				if (index === -1) index = 0;
				let weight = max - index;

				let blurb = allBlurbs.ambient[i];
				if (typeof blurb === "object" && blurb.influences) {
					for (let key in blurb.influences) {
						if (influenceNeedsUnlock[key] && !planet.unlocks[influenceNeedsUnlock[key]]) weight = 0;
					}
				}

				choices.push(i);
				weights.push(weight);
			}

			for (let tries = 0; tries < 20; tries++) {
				let index = chooseWeighted(choices, weights);
	
				// remove chosen index from recentBlurbs
				if (planet.recentBlurbs.ambient.indexOf(index) !== -1) planet.recentBlurbs.ambient.splice( planet.recentBlurbs.ambient.indexOf(index), 1 );
				// push chosen index to end of recentBlurbs
				planet.recentBlurbs.ambient.push(index);
	
				let blurb = allBlurbs.ambient[index];

				let ctx = {};
				let result = blurber(blurb, ctx);
				if (result === false) continue;

				if (typeof blurb === "object") {
					if (blurb.influences && ctx.town) {
						args.oldInfluences = structuredClone(ctx.town[0].influences);
						args.influencedTown = ctx.town[0];
						happen("Influence", null, ctx.town[0], {...blurb.influences, temp:true});
					}
				}
	
				return result;
			}

			return false;
		},
		message: (_, __, args) => args.value,
		weight: $c.COMMON,
	},
	
	"infoBlurb": {
		random: true,
		auto: true,
		subject: {
			reg: "nature", id: 1
		},
		target: {
			reg:"town", random:true
		},
		check: (_, target) => !planet.dead && (!target.lastInfoBlurb || planet.day - target.lastInfoBlurb > 20),
		value: (_, target, args) => {
			if (planet.day - target.lastInfoBlurb < 20) return false;
			let choices = [];
			let weights = [];
			let max = allBlurbs.info.length;
			for (let i = 0; i < allBlurbs.info.length; i++) {
				let index = planet.recentBlurbs.info.indexOf(i);
				let blurb = allBlurbs.info[i];
				if (index === -1) index = 0;
				let weight = max - index;

				if (blurb.check && !blurb.check(target)) continue;

				choices.push(i);
				weights.push(weight);
			}

			if (!choices.length) return false;

			for (let tries = 0; tries < 20; tries++) {
				let index = chooseWeighted(choices, weights);
	
				// remove chosen index from recentBlurbs
				if (planet.recentBlurbs.info.indexOf(index) !== -1) planet.recentBlurbs.info.splice( planet.recentBlurbs.info.indexOf(index), 1 );
				// push chosen index to end of recentBlurbs
				planet.recentBlurbs.info.push(index);
	
				let blurb = allBlurbs.info[index];

				let ctx = {
					town: [target]
				};
				let result = blurber(blurb, ctx);
				if (result === false) continue;
	
				return result;
			}

			return false;
		},
		func: (_, target) => {
			target.lastInfoBlurb = planet.day;
		},
		message: (_, __, args) => "{{c:Studies suggest|Studies suggest|Polling suggests|Polls suggest|Reports show|New report}}: " + args.value,
		weight: $c.SUPERCOMMON,
	},
	
	"decisionBlurb": {
		random: true,
		subject: {
			reg: "nature", id: 1
		},
		target: {
			reg:"town", random:true
		},
		check: (_, target) => !planet.dead,
		value: (_, target, args) => {
			let choices = [];
			for (let i = 0; i < allBlurbs.decision.length; i++) {
				let index = planet.recentBlurbs.decision.indexOf(i);
				let blurb = allBlurbs.decision[i];
				if (index !== -1) continue; //skip if already done

				if (blurb.check && !blurb.check(target)) continue;

				choices.push(i);
			}

			if (!choices.length) return false;

			for (let tries = 0; tries < 20; tries++) {
				let index = choose(choices);
	
				planet.recentBlurbs.decision.push(index);
	
				let blurb = allBlurbs.decision[index];

				let ctx = {
					town: [target]
				};
				let result = blurber(blurb, ctx);
				if (result === false) continue;

				if (typeof blurb === "object") {
					if (blurb.influences) args.influences = blurb.influences;
					if (blurb.influencesNo) args.influencesNo = blurb.influencesNo;
					if (blurb.no) args.buttonNo = blurb.no;
					if (blurb.yes) args.buttonYes = blurb.yes;
				}
	
				return result;
			}

			return false;
		},
		func: (_, target, args) => {
			if (args.influences) {
				happen("Influence", null, target, {...args.influences, temp:true});
			}
		},
		funcNo: (_, target, args) => {
			if (args.influencesNo) {
				happen("Influence", null, target, {...args.influencesNo, temp:true});
			}
		},
		message: (_, __, args) => args.value,
		weight: $c.COMMON,
	},

}

subBlurbs = {
	"town": (ctx) => {
		return ctx.town ? ctx.town[0] : regToArray("town");
	},
	"resource": () => regToArray("resource"),
	"personal emergency": "being trapped in a [tree/well/hole]/carbon monoxide poisoning/a chemical emergency/a flood/a house fire/an illness/a landslide/food poisoning/drowning/a heart attack/a concussion/being stuck in a cave/being struck by debris",
	"animal": () => regFilter("resource", (r) => r.type === "livestock"),
	"crop": () => regFilter("resource", (r) => r.type === "crop"),
	"object": "rare [gemstones/jewels]/equipment/uniforms/a secret stash/[money]/[food]/toiletries",
	"food": "crop/meat",
	"money": (ctx) => ctx.town ? (ctx.town[0].currency ? "{{currency:"+ctx.town[0].id+"}} " + ctx.town[0].currency : "") || "cash" : undefined,
	"landmark": (ctx) => {
		if (!ctx.town) return "a [building/home]";
		let landmark = choose(regFilter("marker", (m) => m.town === ctx.town[0].id));
		if (landmark) return `the {{regname:marker|${landmark.id}}}`;
		return "a [building/home]";
	},
	"town adj": (ctx) => {
		let town;
		if (!ctx.town) {
			town = choose(regToArray("town"));
			ctx.town = [town];
		}
		else town = ctx.town[0];
		return `{{regadj:town|${town.id}}}`;
	},
	"demonym": (ctx) => {
		let town;
		if (!ctx.town) {
			town = choose(regToArray("town"));
			ctx.town = [town];
		}
		else town = ctx.town[0];
		return town.dem ? `{{resident:${town.id}}}` : "town adult";
	},
	"demonyms": (ctx) => {
		let town;
		if (!ctx.town) {
			town = choose(regToArray("town"));
			ctx.town = [town];
		}
		else town = ctx.town[0];
		return town.dems ? `{{residents:${town.id}}}` : "town people";
	},
	"job": (ctx) => {
		return (ctx.town ? Object.keys(ctx.town[0].jobs) : defaultJobs).join("/");
	},
	"adult": (ctx) => {
		return "man/woman/resident/individual/job/job"
	},
	"town adult": "[town adj] [adult]/adult from [town]/demonym",
	"people": (ctx) => {
		return "=people=/residents/individuals" + (ctx.town && Object.keys(ctx.town[0].jobs).length ? "/"+wordPlural(choose(Object.keys(ctx.town[0].jobs)) || "") : "");
	},
	"town people": "[town adj] [people]/[people] from [town]",
	"child": "boy/girl/=child=/student",
	"town child": "[town adj] [child]/[child] from [town]",
	"person": "adult/adult/child",
	"town person": "town adult/town child/demonym",
	"body part": "arm/leg/spine/hip/skull/foot/ankle/neck/elbow/wrist",
	"injury": "[injured/fractured/broken/sprained/bruised] [body part]",
	"influence": () => {
		return Object.keys(allInfluences).map(i => (regBrowserKeys[i] || i).toLowerCase()).filter(i => i !== "mood" && (!influenceNeedsUnlock[i] || planet.unlocks[influenceNeedsUnlock[i]])).join("/");
	},
	"law": () => {
		return Object.keys(allLaws).map(l => l.split(".")[l.split(".").length - 1].replace(/_/g, " ")).map(l => (regBrowserKeys[l] || l).toLowerCase()).join("/");
	},
	"crime": (ctx) => {
		if (!ctx.town || !planet.unlocks.government) return;
		return Object.keys(ctx.town[0].legal).filter(l => ctx.town[0].legal[l] === false).map(l => l.split(".")[l.split(".").length - 1].replace(/_/g, " ")).map(l => (regBrowserKeys[l] || l).toLowerCase()).join("/");
	},
	"activity": "influence/law",
	"town related": (ctx) => ctx.town ? happen("Related", null, ctx.town[0], {objects:true}) : undefined,
	"town gov": (ctx) => ctx.town ? ctx.town[0].gov : undefined,
	"town econ": (ctx) => ctx.town ? ctx.town[0].econ : undefined,
	"personal goal": "better times/a bountiful harvest/world peace/an end to hunger/a new landmark/a nice meal/a sandwich/a relationship/a new home",
	"personal adjective": "cooked/at peace/freaking out/an alpha/chopped/cheesed/so sigma/freaking out",
	"student": () => planet.unlocks.education ? "=student=" : "child",
	"lawyer": () => planet.unlocks.government ? "=lawyer=" : null,
	"first name": () => generateHumanName(),
	"name": () => generateFullName(),
	"number": (ctx) => {
		let max = 20;
		if (ctx.town) max = Math.ceil(ctx.town[0].pop / 100);
		max = Math.max(max, 5);
		max = Math.min(max, 100);
		return `{{num:${randRange(1,max)}}}`;
	},
	"disaster": (ctx) => {
		return choose(regFilter("process", p => p.type === "disaster" && p.deaths && planet.day - p.done <= 20));
	},
	"hospital": (ctx) => ctx.town ? regFilter("marker", m => m.town === ctx.town[0].id && m.subtype === "hospital") : undefined,
	"school": (ctx) => ctx.town ? regFilter("marker", m => m.town === ctx.town[0].id && m.subtype === "school") : undefined,
	"player": () => userSettings.playerName || undefined,
	"future": () => "{{date:" + (planet.day + randRange(10,50)) + "}}",
}

allBlurbs = {

ambient: [
"A [horde/pack] of [animal] [breaks loose/escapes containment] and [attacks/chases] residents in [town]",
"A [adult] has stolen [object] from [landmark] in [town]",
"A [town adult] was rescued after [personal emergency]",
"A [town adult] [suffered/sustained] a [injury] after [stepping/tripping/slipping] on a [animal/rock/[crop] peel/stick/toy]",
"Some [town people] were forced to [isolate/evacuate] after an [unknown/undisclosed] incident",
"A [pro/anti]-[activity] activist is [attacked/arrested] at a [rally/meetup/protest]",
"Missing [town person] is [found/discovered] safe in [a shed/a storage facility/landmark]",
"A [town adult] is honored after [rescuing/saving] a [child/animal] from [personal emergency]",
"A [town person] is arrested [for/after suspected] [crime]",
"A [town person] has [discovered/developed] a new way to [talk to/attract/train/cook] [animal/resource]",
"A [town person] has [discovered/found] a [resource/hole/rock/leaf] that [looks like/resembles] a [man/woman/job/town related/town related]",
"A [town person] is praying for [personal goal]",
"\"I'm [personal adjective],\" [says a [town person]/a [town person] says]",
"\"Oh my [player],\" [says a [town person]/a [town person] says]",
"[town people] attend the funeral of [an honored/a beloved] [job] who died from [personal emergency]",
"[town adj] hide-and-seek champion, [name], [[is/was] found dead in [landmark]/has gone missing.]",
"A [town adj] [lawyer] accidentally sues [him/her/them]self",
"[town] is unsure why [their/its] sewers [smell/stink]",
"[town adj] officials raid illegal [resource] farm, [number] arrested",
"Meeting about safety in [town] ends in devastating accident",
"Report: Homicide victims rarely [talk to/cooperate with] police",
"[Survivors/Victims] of [disaster] were buried in [town]",
"A [town person] commits every crime imaginable, sentenced to [number] years",
"A [town person] is sentenced to [number] years after committing [crime]",
"A [town person] is conveniently injured at [hospital]",
"A [town person] arrives at [hospital] with a [injury]",
"[Parents in [town]/[town adj] parents] keep kids home to protest [school] closure",
"A [town person] dressed as a [animal] fools onlookers",
"[name], a [town person], sets [a new/the world] record for [most/least] [activity]",
"[name], a [town person], is predicting the world will end on [future]",
"A [town adj] conspiracy theorist is [protesting against/ranting about] Big {{title:[influence]}}",
"A [town adj] conspiracy theorist denounces [player] as \"fake news\".",
"A [adult] has fallen into the river in [town]!",
"A [town person] spots a [animal] eating a [resource]",
"[town adj] scientists discover [the meaning of [life/the universe]/the cure to all disease], but don't [reveal/release] it",
"[town adj] [scientists/philosophers] debate [the meaning of [life/the universe]/the nature of reality/ethics and morality/the existence of numbers]",
"[town] vows to catch unknown individual who committed [crime]",
"[town adj] archaeologists uncover remains of [ancient/prehistoric] skeleton [civilization/society]",
"[demonyms] wage \"Great War\" on local [animal] population; Lose shortly thereafter",
"Local [town person] believes they were a [animal] in a past life",
"[resource] is \"spiritually [town adj]\", {{people}} are saying",
{
	text: "[school] [children/students] are protesting against [schooling/education] in [town]",
	influences: { education:-1 }
},
{
	text: "[town adj] police officer is [under fire/canceled] after [alleged/allegedly committing] [crime]",
	influences: { crime:1 }
},
{
	text: "Sales of stuffed [animal] soar in [town] after new youth trend",
	influences: { trade:1 }
},
{
	text: "[town] mourns the loss of beloved town [animal] named [first name]",
	influences: { mood:-0.25 }
},
{
	text: "[school] [children/students] celebrate their graduation in [town]",
	influences: { education:1 }
},
{
	text: "[demonyms] are told to quarantine after rabid [animal] escapes captivity",
	influences: { travel:-2, disease:2 }
},
{
	text: "[Rising/Falling] temperatures cause decreased crop growth in [town]",
	influences: { farm:-2 }
},

],

info: [
{
	text: "More [town adj] students than ever are dropping out of school",
	check: (town) => town.influences.education <= -6 && planet.unlocks.education
},
{
	text: "[town people] are committing more crime than ever",
	check: (town) => town.influences.crime >= 6
},
{
	text: "\"No Way to Prevent This,\" says [town], the only town where this regularly happens",
	check: (town) => town.influences.crime >= 8
},
{
	text: "More and more [town adj] families are going without food",
	check: (town) => town.influences.hunger >= 8
},
{
	text: "[demonyms] [more often/would rather] worship [related] than [player]",
	check: (town) => town.influences.faith <= -8 && !town.usurp
},
{
	text: "[demonyms] are questioning the effectiveness of [town gov]",
	check: (town) => town.gov && (town.influences.faith <= -6 || town.influences.happy <= -6) && !town.usurp
},
{
	text: "[demonyms] are questioning the effectiveness of [town econ]",
	check: (town) => town.econ && town.influences.trade <= -6
},
{
	text: "[demonyms] avoid potential murderers on the streets",
	check: (town) => town.legal["crime.murder"]
},
{
	text: "[town adj] farmers are going hungry",
	check: (town) => town.influences.farming <= -8
},
{
	text: "[town adj] farmers have more food than they know what to do with",
	check: (town) => town.influences.farming >= 9
},
{
	text: "Rates of depression in [town] reach all-time highs",
	check: (town) => town.influences.happy <= -8
},
{
	text: "Tourism is booming in [town]",
	check: (town) => town.influences.travel >= 9
},
{
	text: "The average GPA of [town adj] students is 3.[6/7/8/9]/4",
	check: (town) => town.influences.education >= 9
},
{
	text: "[demonyms] are enlisting in the military at record rates",
	check: (town) => town.influences.military >= 9
},
{
	text: "[demonyms] are disgusted at the idea of invading a sovereign town",
	check: (town) => town.influences.military <= -8
},
{
	text: "[Amount/Frequency] of theft incidents have increased in [town]",
	check: (town) => town.legal["crime.theft"]
}
],

decision: [
{
	text: "Motion from [town] to require mandatory military service",
	check: (town) => planet.unlocks.military,
	influences: { military:3 }
},
{
	text: "How ambitious should [town] be about exploration?",
	no: "Low", yes: "High",
	check: (town) => planet.unlocks.travel,
	influences: { travel:3 },
	influencesNo: { travel:-2 }
},
{
	text: "Motion from [town] to [make healthcare free/establish a free healthcare program]",
	check: (town) => planet.unlocks.trade >= 30,
	influences: { disease:-3, happy:1, trade:-2 },
	influencesNo: { disease:-2, happy:-1, trade:2 }
},
{
	text: "Motion from [town] to [make college free/establish a free college program]",
	check: (town) => planet.unlocks.trade >= 30 && planet.unlocks.education >= 20,
	influences: { education:3, happy:1 },
	influencesNo: { education:-2, happy:-1 }
},
{
	text: "Motion from [town] to abolish human rights",
	influences: { happy:-10 },
	check: (town) => planet.day > 10
},
{
	text: "Motion from [town] to introduce a guaranteed minimum income",
	check: (town) => planet.unlocks.trade >= 30,
	influences: { happy:1, trade:3 },
	influencesNo: { happy:-0.5, trade:-1 }
},
{
	text: "How [hard/tough] should [town] be on crime?",
	no: "Lax", yes: "Strict",
	check: (town) => planet.unlocks.government,
	influences: { happy:-1, crime:-3 },
	influencesNo: { happy:1, crime:3 }
},
{
	text: "Motion from [town] to lower the age of military conscription",
	check: (town) => planet.unlocks.military,
	influences: { military:3, education:-2 },
	influencesNo: { happy:1, education:1 }
},
{
	text: "Motion from [town] to invest in renovating [school]",
	check: (town) => planet.unlocks.education,
	influences: { education:3 },
	influencesNo: { education:-1 }
},
{
	text: "How much should [town] support small businesses?",
	check: (town) => planet.unlocks.trade,
	influences: { trade:3 },
	influencesNo: { trade:-1 }
},
{
	text: "Motion from [town] to issue stimulus checks in response to falling economy",
	check: (town) => planet.unlocks.trade && town.influences.trade <= -5,
	influences: { trade:3 },
	influencesNo: { happy:-2, trade:-1 }
},
],

}



unlockTree = {
	"farm": {
		levels: [
			{
				level: 10,
				name: "Agriculture",
				emoji: "🌱",
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
				emoji: "🐄",
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
				emoji: "🚶",
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
				emoji: "🛶",
				message: "{{people}} notice how wood floats on water and want to investigate further. {{should}}",
				messageDone: "Travelers make use of boats to expand across the seas.",
				influences: { travel:2 },
				messageNo: "Violent waves deter travelers from the seas.",
				influencesNo: { travel:-1 },
			},
			{
				level: 40,
				name: "Wheels",
				emoji: "🛞",
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
				emoji: "🔥",
				message: "{{people}} realize rubbing sticks together makes lots of heat. {{should}}",
				messageDone: "Fire allows for heating and lighting.",
				influences: { happy:1 },
				messageNo: "It's common to stay cold all night long.",
				influencesNo: { happy:-1 },
			},
			{
				level: 20,
				name: "Cooking",
				emoji: "🍳",
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
				emoji: "🪨",
				message: "{{people}} try breaking rocks with other rocks. {{should}}",
				messageDone: "Stone is used as a durable building material.",
				influences: { travel:0.5 }
			},
			{
				level: 20,
				name: "Stone Tools",
				emoji: "⛏️",
				message: "{{people}} try connecting loose rocks to handles. {{should}}",
				messageDone: "Pointed stone tools increase durability and efficiency.",
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
				emoji: "🪚",
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
				emoji: "📈",
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
				emoji: "💸",
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
				emoji: "⚖️",
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
				emoji: "🏫",
				message: "{{people}} want their children to learn a variety of skills. {{should}}",
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
				emoji: "🗡️",
				message: "The addition of another settlement worries {{regoldest:town}}. Should it?",
				messageDone: "{{regoldest:town}} begins enlisting soldiers.",
				influences: { military:1, crime:0.25 },
				messageNo: "The settlements trust each other, for now...",
				influencesNo: { military:-2 },
				check: () => regCount("town") > 1
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
				messageDone: "Cavalries are seen practicing on {{randreg:resource|livestock}}back.",
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
	"education": "education",
	// "mine": "smith",
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
	"mine": { happy:-0.25 },
	"law": { crime:-0.8 },
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
	"law": 1,
	"faith": 1
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
researchInfluences = {
	// influence: name
	"farm": "farming",
	"military": "military",
	"trade": "economics",
	"education": "education",
	// "mine": "mining",
	// "lumber": "forestry",
}
allLaws = {
	// key: severity from 0-1
	// influence.name
	"farm": 0.8,
	"travel": 0.8,
	"travel.expansion": 0.6,
	"travel.construction": 0.3,
	"happy.speech": 1,
	"happy.unemployment": 1.2,
	"crime.gambling": 0.1,
	"crime.fraud": 0.5,
	"crime.theft": 0.6,
	"crime.arson": 0.75,
	"crime.murder": 1,
	"crime.tax_evasion": 1,
	"faith.religion": 1,
}
govForms = {
	"democracy": { influences:{law:2} },
	"republic": { influences:{law:1.5} },
	"monarchy": { influences:{law:1} },
	"dictatorship": { influences:{law:5, happy:-3} },
}
econForms = {
	"socialism": { color:"#ff0a4f", influences:{trade:1, law:2, happy:1} },
	"capitalism": { color:"#93FF08", influences:{trade:3, law:0.5} },
}
regBrowserKeys = {
	"pop": "Population",
	"events": "Current events",
	"resources": "Resources",
	"raw": "Material",
	"town.crop": "Crop",
	"town.livestock": "Livestock",
	"planet.start": "Formed",
	"size": "Size",
	"circumference": "Circumference {{symbol:↔}}",
	"land": "Land",
	"influences": "Influences",
	"research_": "Researching",
	"birth": "Birth",
	"smith": "Smithing",
	"farm": "Farming",
	"happy": "Mood",
	"biome": "Biome",
	"rate": "Efficiency",
	"mine": "Mining",
	"lumber": "Lumber",
	"econ_": "Economy",
	"relations_": "Relations",
	"jobs": "Jobs",
	"legal_": "Laws",
	"town.animal": "Town Animal",
	"biome.crops": "Crops",
	"biome.livestocks": "Livestock",
	"domesticated": "Domesticated",
	"process.town": "Town",
	"process.subtype": "Type",
	"process.deaths": "Deaths",
	"process.injuries": "Injuries",
	"duration_": "Duration",
	"disastertowns": "Towns",
	"towns_": "Towns",
	"process.winner": "Winner",
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
	"lifespan": "Average lifespan",

	"continents": "Continents",
	"landmasses": "Landmasses",
	"volume": "Total volume",
	"landvolume": "Land volume",
	"globalwealth": "Global wealth",

	"farmer":"{{icon:crop}}Farmer",
	"lumberer":"{{icon:lumber}}Lumberer",
	"miner":"{{icon:rock}}Miner",
	"soldier":"{{icon:sword}}Soldier",

	"town.start": "Founded",
	"town.end": "Fell",
	"age": "Age",
	"namer_": "Named after",
	"former": "Formerly",
	"town.won": "Wars won",
	"town.ender": "Defeated by",

	"planet": "Planet",

	"stats.alive": "Alive",
	"stats.death": "Deaths",
	"stats.deathnatural": "Natural deaths",
	"stats.deathdisaster": "Disaster deaths",
	"stats.deathwar": "War deaths",
	"stats.birth": "Births",
	"stats.peak": "Peak population",
	"stats.prompt": "Acts issued",
	"stats.towns": "Towns",
	"stats.avgmood": "Average mood",
	"stats.score": "Score",
	"stats.peakscore": "Peak score",
	"stats.promptstreak": "Prompt streak",
	"stats.peakprompts": "Peak prompt streak",
	"stats.oldesttown": "Oldest town",
}
regBrowserValues = {
	"pop": (value, town) => `{{num:${value}}}{{face:${town.id}}}` + (town.end ? ` ({{num:${town.peakpop}}}{{face:${town.id}}} at peak)` : ""),
	"size": (value, town) => `{{area:${value}}}` + (town.end ? ` ({{area:${town.peaksize}}} at peak)` : ""),
	"land": (value) => `{{area:${value}}}`,
	"platesize": (value) => `{{area:${value}}}`,
	"circumference": (value) => `{{length:${value}}}`,
	"crop": (value) => `{{num:${value}}}{{icon:crop}}`,
	"lumber": (value) => `{{num:${value}}}{{icon:lumber}}`,
	"rock": (value) => `{{num:${value}}}{{icon:rock}}`,
	"metal": (value) => `{{num:${value}}}{{icon:metal}}`,
	"town.livestock": (value) => `{{num:${value}}}{{icon:livestock}}`,
	"town.cash": (value, town) => `{{num:${value}}} {{currency:${town.id}}}`,
	"biome": (value) => `{{biome:${value}}}`,
	"town.animal": (value) => `{{regname:resource|${value}}}`,
	"start": (value) => `{{date:${value}}}`,
	"end": (value) => `{{date:${value}}}`,
	"domesticated": (value) => `{{date:${value}}}`,
	"process.done": (value) => `{{date:${value}}}`,
	"age": (value) => `{{num:${value}}} Day${Math.abs(value) === 1 ? "" : "s"}`,
	"town.former": (value) => `{{regname:town|${value}}}`,
	"birth": null,
	"law": null,
	"rate": (value) => `${value}x`,
	"process.town": (value) => `{{regname:town|${value}}}`,
	"town.ender": (value) => `{{regname:town|${value}}}`,
	"process.winner": (value) => `{{regname:town|${value}}}`,
	"process.subtype": (value) => titleCase(value),
	"process.cost": (value) => `${value}{{icon:lumber}}{{icon:rock}}`,
	"injuries": (value, town) => `{{num:${value}}}{{icon:sad}}`,
	"deaths": (value, town) => `{{num:${value}}}{{icon:sad}}`,
	"marker": (value) => `{{regname:marker|${value}}}`,
	"marker.town": (value) => `{{regname:town|${value}}}`,
	"landmark.process": (value) => `{{regname:process|${value}}}`,
	"resource.ancestor": (value) => `{{regname:resource|${value}}}`,
	"issues": null,
	"stats.score": (value) => `{{percent:${value}}}`,
	"stats.peakscore": (value) => `{{percent:${value}}}`,
	"stats.oldesttown": (value) => `{{num:${value}}} days`,
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
		},
		"deathwar": () => {
			return planet.stats.deathBy.war || 0;
		},
		"avgmood": () => {
			return Math.round(sumArray(regToArray("town").map((t) => (t.influences.happy || 0))) / regCount("town") * 100) / 100;
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
		},
		"globalwealth": () => {
			if (!planet.unlocks.trade || planet.unlocks.trade < 30) return;
			let wealth = 0;
			regToArray("town").forEach((t) => {
				if (t.wealth) wealth += t.wealth;
				if (t.resources.cash) wealth += t.resources.cash;
			});
			return "¤{{num:"+wealth+"|K}}";
		}
	},
	town: {
		"legal_": (town) => {
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
		"econ_": (town) => {
			if (!town.econ) return;
			
			let data = {};
			
			if (planet.unlocks.trade >= 30) {
				if (town.pop) data["private wealth"] = `{{currency:${town.id}}}{{num:${Math.round(town.wealth || 0)}|K}}`;
				if (town.tax) data["tax rate"] = `{{percent:${town.tax}}}`;
				if (town.pop) data["per capita"] = `{{currency:${town.id}}}{{num:${Math.round((town.wealth || 0) / town.pop)}|K}}`;
			}
			
			data.form = `{{color:${titleCase(wordAdjective(town.econ))}|${econForms[town.econ].color || ""}}}`;
			if (town.currency) data.currency = `{{color:${town.currency}|rgb(${town.color.join(",")})}}`;

			return data;
		},
		"relations_": (town) => {
			if (!town.relations || !Object.keys(town.relations).length || town.end) return;
			
			let data = {};

			let sorted = Object.keys(town.relations);
			sorted.sort((a, b) => town.relations[b] - town.relations[a]);

			for (let i = 0; i < sorted.length; i++) {
				const key = sorted[i];
				let town2 = regGet("town", parseInt(key));
				if (town2.end) continue;

				let mood = town.relations[key];
				let icon = "neutral";
				if (mood >= 2) icon = "happy";
				if (mood <= -2) icon = "sad";

				let count = Math.min(3,Math.ceil(Math.abs(mood) / 3)) || 1;

				data["{{regname:town|"+key+"}}"] = `{{icon:${icon}|${Math.round(mood)}}}`.repeat(count);
			}

			return data;
		},
		"elevation": (town) => {
			let elevations = filterChunks((c) => c.v.s === town.id).map((c) => c.e);
			if (!elevations.length) return;
			let elevation = Math.round(sumArray(elevations) / elevations.length * 100) / 100;
			return `{{elevation:${elevation}|l}}`;
		},
		"events": (town) => {
			if (!Object.values(town.issues).length) return;
			return Object.values(town.issues).map((id) => `{{regname:process|${id}}}`);
		},
		"landmasses": (town) => {
			let continents = new Set(filterChunks((c) => c.v.s === town.id).map((c) => c.v.g));
			continents = Array.from(continents);
			return continents.map((id) => `{{regname:landmass|${id}}}`);
		},
		"research_": (town) => {
			const entries = Object.entries(town.research);
			if (!entries.length) return;
			entries.sort((a, b) => b[1] - a[1]);
			if (entries[0]) return titleCase(researchInfluences[entries[0][0]]);
		},
		"lifespan": (town) => {
			return `{{num:${Math.round(1 / $c.deathRate(town))}}} days`
		},
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
		"disastertowns": (process) => {
			if (!process.chunks) return;
			if (!process.chunks.length) return;
			let towns = [...new Set(process.chunks.map((coords) => chunkAt(coords[0],coords[1])).filter((i) => i).filter((c) => c.v.s).map((chunk) => chunk.v.s))].map((id) => `{{regname:town|${id}}}`);
			if (!towns.length) return;
			return towns;
		},
		"towns_": (process) => {
			if (!process.towns) return;
			return process.towns.map((id) => "{{regname:town|" + id + "}}").join(", ");
		},
		"name": (process) => {
			if (process.name) return process.name;
			if (process.subtype) return titleCase(process.subtype);
			if (process.type === "revolution") {
				let town = regGet("town",process.town);
				return (town.adj || town.name) + " Revolution";
			}
			if (process.type === "war") {
				if (!process.towns) return "War";
				return process.towns.map((id) => regGet("town", id).name).join("–") + " War";
			}
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
			if (process.type === "revolution") {
				let town = regGet("town",process.town);
				return town.color;
			}
			if (process.type === "war") {
				if (!process.towns) return;
				return colorMix(regGet("town", process.towns[0]).color, regGet("town", process.towns[1]).color);
			}
		},
		"duration_": (process) => {
			return `{{duration:${(process.done || planet.day) - process.start}}}` + (process.done ? "" : " (Ongoing)")
		},
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
		},
		"namer_": (marker) => {
			if (!marker.namer) return;
			return `{{regname:${marker.namer[0]}|${marker.namer[1]}}}`
		}
	}
}