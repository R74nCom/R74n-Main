constants = {
	defaultPlanetWidth: 200,
	defaultPlanetHeight: 120,
	defaultPixelSize: 6,
	defaultChunkSize: 4,
	defaultWaterLevel: 0.45,
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
	colonyNameSuffixRate: 0.2,
	baseEatRate: 0.2,
	noFoodHappyInfluence: -0.75,
	lowFoodHappyInfluence: -0.25,
	baseEmployRate: 0.05,
	baseResourceRate: 0.05,
	maxInfluence: 10,
	minInfluence: -10
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
				return target;
			},
			Boost: (subject,target,args) => {
				if (target.rate === undefined) target.domesticated = planet.day;
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
						// for (let i = 0; i < 5; i++) {
						//   let newChunk = nearestChunk(chunk.x, chunk.y,  (c) => c.b !== "water" && !c.v.s,  (c) => (c.v.s && c.v.s !== chunk.v.s) || c.b === "water" || c.b === "mountain");
						//   if (newChunk) {
						//     newChunk.v.s = target.id;
						//     chunks.push(newChunk);
						//     done++;
						//   }
						// }
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
								prefix = choose(wordComponents.prefixes.MOUNTAINOUS)[0];
							}
							else if (Math.random() < 0.25 && chunkIsNearby(x, y, (c) => c.b === "water", 2)) { //Cape-
								prefix = choose(wordComponents.prefixes.WATERFRONT)[0];
							}
							if (prefix) {
								if (target.name.includes(" ")) target.name = titleCase(target.name.replace(/ /," "+prefix).toLowerCase());
								else target.name = titleCase((prefix + target.name).toLowerCase());
							}
							regAdd("town",target);
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

				for (let key in args) {
					if (allInfluences[key] === undefined) continue;
					if (args.done && args.done.includes(key)) continue;
					if (influenceNeedsUnlock[key] && !planet.unlocks[influenceNeedsUnlock[key]]) continue;
					done.push(key);

					let amount = args[key];
					let change = Math.abs(target.influences[key]) * Math.abs(amount) + Math.abs(amount);

					if (!target.influences[key]) target.influences[key] = amount;
					else if (amount > 0) target.influences[key] += change;
					else target.influences[key] -= change;

					// minimum and maximum influence
					if (target.influences[key] > $c.maxInfluence) target.influences[key] = $c.maxInfluence;
					else if (target.influences[key] < $c.minInfluence) target.influences[key] = $c.minInfluence;

					if (influenceEffects[key]) {
						let effects = influenceEffects[key];
						for (let effect in effects) {
							let args2 = { done: done };
							args2[effect] = effects[effect] * amount;
							happen("Influence", subject, target, args2);
						}
					}
				}
			},
			AddPop: (subject,target,args) => {
				const pop = target.pop;
				const maxPop = $c.maxPopulation(target);
				if (pop >= maxPop) return;

				let count = args.count || 1;
				let maxChange = maxPop - pop;
				count = Math.min(count, maxChange);

				target.pop += count;
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

			},
			End: (subject,target,args) => {
				logMessage(`{{regname:town|${target.id}}} has fallen.`, "warning");
				filterChunks((c) => c.v.s === target.id).forEach(c => {
					delete c.v.s;
				});
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




weights = {

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

			if (popChange) happen("AddPop", null, subject, {count: popChange});
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

			if (popChange) happen("Death", null, subject, { count: popChange });
		}
	},
	"townExpand": {
		daily: true,
		subject: { reg: "town", all: true },
		func: (subject, target, args) => {
			let expandRate = addInfluence($c.baseExpandRate + (subject.size/50), subject, "travel");
			if (Math.random() < expandRate) {
				let chunk = randomChunk((c) => c.v.s === subject.id);
				if (chunk) {
					let newChunk = nearestChunk(chunk.x, chunk.y, (c) => c.v.s === undefined && c.b !== "water", (c) => ((!planet.unlocks.travel || planet.unlocks.travel < 30) && c.b === "water") || c.b === "mountain" || (c.v.s && c.v.s !== subject.id));
					if (newChunk) {
						let colonyRate = $c.baseColonyRate;
						
						// One town per 30 days
						if (!(regCount("town") < Math.ceil(planet.day / 30))) colonyRate = 0;
						else if (subject.size <= 10 || (subject.lastColony !== undefined && planet.day-subject.lastColony < 25)) colonyRate = 0;
						else if (subject.pop <= 2) colonyRate = 0;
						else {
							colonyRate = subtractInfluence(colonyRate, subject, "happy");
							colonyRate = addInfluence(colonyRate, subject, "travel");
							if (chunk.v.g !== newChunk.v.g) colonyRate *= 2;
						}

						if (Math.random() < colonyRate) {
							let limit = Math.floor(addInfluence(50, subject, "travel"));
							let possibleChunks = floodFill(newChunk.x, newChunk.y, (c) => c.v.s === undefined && c.b !== "water" && c.b !== "mountain", limit );
							let colonyChunk = choose(possibleChunks);

							let newTown = happen("Create", subject, null, {x:colonyChunk.x, y:colonyChunk.y, pop:0}, "town");
							subject.lastColony = planet.day;
							newTown.lastColony = planet.day - $c.colonyCooldown;
							newTown.color = colorChange(subject.color);
							newTown.former = subject.id;
							newTown.type = newTown.size <= 2 ? "microtown" : "colony";
							newTown.level = 10;
							if (Math.random() < $c.colonyNameSuffixRate) {
								let newName = "";
								let mainName = subject.name.match(/\S+$/)[0].toLowerCase();
								if (Math.random() < 0.5) {
									let vertical = colonyChunk.y - newChunk.y;
									let horizontal = colonyChunk.x - newChunk.x;
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
						}
					}
				}
			}
		}
	},
	"townEat": {
		daily: true,
		subject: { reg: "town", all: true },
		func: (subject, target, args) => {
			let foodCost = subject.pop * $c.baseEatRate;
			foodCost = Math.floor(addInfluence(foodCost, subject, "hunger"));
			let crops = happen("CountResource",null,subject,{ type:"crop" });
			let livestocks = happen("CountResource",null,subject,{ type:"livestock" });
			let foodCount = crops + livestocks;

			if (foodCount < 1) {
				happen("Influence", null, subject, { "happy": $c.noFoodHappyInfluence });
				logWarning("noFood"+subject.id, "{{regname:town|"+subject.id+"}} is out of food!");
				happen("Death", null, subject, { count:randRange(1,foodCost) });
				return;
			}
			else if (foodCount < subject.pop) {
				happen("Influence", null, subject, { "happy": $c.lowFoodHappyInfluence });
				logWarning("lowFood"+subject.id, "{{regname:town|"+subject.id+"}} is dangerously low on food!");
			}

			let cropCost = randRange(0, foodCost);
			let livestockCost = foodCost - cropCost;

			if (cropCost) happen("RemoveResource", null, subject, { type:"crop", count: Math.min(crops, cropCost) });
			if (livestockCost) happen("RemoveResource", null, subject, { type:"livestock", count: Math.min(livestocks, livestockCost) });
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
			let fertility = happen("Fertility",subject,chunk,null,"chunk") / 2;
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
			if (!args.value) return;
			args.value = Math.floor(Math.min(subject.pop * (randRange(1,10) / 10), args.value));
			args.value = Math.min(args.value, subject.size);
			if (!args.value) return;
			happen("AddResource",null,subject,{ type:"livestock", count:args.value });
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
	"townCheck": {
		daily: true,
		subject: { reg: "town", all: true },
		func: (subject, target, args) => {
			if (subject.pop <= 0) {
				happen("End",null,subject);
				return;
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
			if (subject.level === 0 && subject.size > 10) { // colony -> town
				upgrade = [10,"town"];
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
		},
		message: (subject, target, args) => args.value.levelData.message,
		messageDone: (subject, target, args) => args.value.levelData.messageDone,
		messageNo: (subject, target, args) => args.value.levelData.messageNo,
		weight: 10,
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
		weight: 5
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
			preview: (text) => `Welcome to {{b:${titleCase(text)}}}.`
		},
		func: (subject, target, args) => {
			if (!args.value) return false;
			return happen("Rename", subject, target, args);
		},
		message: (subject, target, args) => `{{residents|${target.id}}} want you to pick their town's new name.`,
		messageDone: (subject, target, args) => `{{regname:town|${target.id}}} adopts a new name.`,
		messageNo: (subject, target, args) => `{{regname:town|${target.id}}} keeps its name.`,
		weight: 5
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
		weight: 5
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
		weight: 5
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
			let emblem = choose(wordComponents.flags.EMBLEM);
			args.emblem = emblem;
			let emblemColor = "rgb(" + target.color.join(",") + ")";

			let template = choose(wordComponents.flags.TEMPLATE);

			let flag = template
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
		weight: 5
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
			return target.name === undefined;
		},
		func: (subject, target, args) => {
			if (!args.value) return false;
			target.name = titleCase(args.value.split(" ")[0]);
			return target;
		},
		message: (subject, target, args) => `{{people}} want to know your name.`,
		weight: 10
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
		weight: 15,
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
		weight: 5,
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
			happen("Migrate", subject, target, {count: args.value});
		},
		message: (subject,target,args) => `${subject.influences.happy < 0 ? "Looking for change, a" : "A"} group of {{residents:${subject.id}|travelers}} make their way to {{regname:town|${target.id}}}.`,
		weight: 5,
		influencedBy: {
			"happy": -1,
			"travel": 1
		},
		needsUnlock: {
			"travel": 10
		}
	},



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
					"farm": 20
				}
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
				message: "The addition of a second settlement worries {{regoldest:town}}. Should it?",
				messageDone: "{{regoldest:town}} begins enlisting soldiers.",
				influences: { military:1, crime:0.25 },
				messageNo: "The settlements trust each other, for now...",
				influencesNo: { military:-2 },
				check: () => regCount("town") > 1,
				func: () => logMessage("Militarism hasn't been added yet.", "tip") //BETA
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
	"trade": "trade"
}
influenceEffects = {
	// influence -> effect on other influences
	"crime": { happy:-0.5 },
	"happy": { crime:-0.5, birth:0.25 },
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
defaultJobs = ["farmer","lumberer","miner"];
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
regBrowserKeys = {
	"pop": "Population",
	"resources": "Resources",
	"raw": "Material",
	"town.crop": "Crop",
	"town.livestock": "Livestock",
	"planet.start": "Formed",
	"size": "Size",
	"land": "Land",
	"influences": "Influences",
	"birth": "Birth",
	"smith": "Smithing",
	"farm": "Farming",
	"happy": "Mood",
	"biome": "Biome",
	"rate": "Efficiency",
	"jobs": "Jobs",
	"town.start": "Founded",
	"town.end": "Fell",
	"age": "Age",
	"former": "Formerly",
	"biome.crops": "Crops",
	"biome.livestocks": "Livestock",
	"domesticated": "Domesticated",

	"farmer":"{{icon:crop}}Farmer",
	"lumberer":"{{icon:lumber}}Lumberer",
	"miner":"{{icon:rock}}Miner",
	"soldier":"{{icon:sword}}Soldier",
}
regBrowserValues = {
	"pop": (value, town) => `{{num:${value}}}{{face:${town.id}}}`,
	"size": (value) => `{{num:${value}}}{{icon:land}}`,
	"land": (value) => `{{num:${value}}}{{icon:land}}`,
	"crop": (value) => `{{num:${value}}}{{icon:crop}}`,
	"lumber": (value) => `{{num:${value}}}{{icon:lumber}}`,
	"rock": (value) => `{{num:${value}}}{{icon:rock}}`,
	"metal": (value) => `{{num:${value}}}{{icon:metal}}`,
	"town.livestock": (value) => `{{num:${value}}}{{icon:livestock}}`,
	"biome": (value) => `{{biome:${value}}}`,
	"start": (value) => `Day {{num:${value}}}`,
	"end": (value) => `Day {{num:${value}}}`,
	"domesticated": (value) => `Day {{num:${value}}}`,
	"age": (value) => `{{num:${value}}} Day${Math.abs(value) === 1 ? "" : "s"}`,
	"town.former": (value) => `{{regname:town|${value}}}`,
	"birth": null,
	"rate": (value) => `${value}x`,
}