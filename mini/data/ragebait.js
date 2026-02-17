SPA.data = {}

SPA.data.sentences = [
	"this subject -sucks",
	"this subject is adj",
	"adj subject",
	"adj",
	"ur a adj streamer",
	"ur a -waste of oxygen",
	"ur a adj person",
	"ur a -mistake",
	"you remind me of -gross",
	"i opinion this subject",
	"i opinion you",
	"your mom is adj",
	"turn -off the stream",
	"turn -off the music",
	"what -game is this",
	"what is this -game",
	"why are you -throwing",
	"ur -throwing",
	"why is he -throwing",
	"why is he -adj",
	"why are you -adj",
	"ur -adj",
	"-end stream now",
	"-end stream",
	"put the -fries in the -bag",
	"just put the -fries in the -bag",
	"ur -bad at this",
	"ur playing this -wrong",
	"ur playing -wrong",
	"-stop playing this game",
	"that game is -adj",
	"-trash gameplay",
	"i want you to -end stream",
	"this gameplay is -trash",
	"play something -else",
	"-change the music",
	"can you -change the music",
	"any -gifters",
	"-ads",
	"turn -off ads",
	"turn -off the ads",
	"turn -off the game",
	"turn -off this game",
	"i got -ads",
	"i have -ads",
	"-gift me a sub",
	"can you -gift me a sub",
	"can someone -gift me a sub",
	"someone -gift me a sub",
	"i need a -sub",
	"-sub to my channel",
	"please -gift me a sub",
	"please -end stream",
	"please log -off",
	"-shut off the stream",
	"-shut off the game",
	"can you -pause",
	"turn -off ur facecam",
	"-!claim",
	"can you -smile more",
	"-ew",
	"-ew facecam",
	"-read my messages",
	"-check my messages",
	"-F",
	"mini -F",
	"big -F",
	"the stream is -lagging",
	"stream is -lagging",
	"ur -muted",
	"ur facecam is -off",
	"-hurry up",
	"can you -hurry up",
	"can you go -faster",
	"-open my stream",
	"-check my stream",
	"are you -viewbotting",
	"why are you -viewbotting",
	"ur -viewbotting",
	"stop -viewbotting",
	"can you stop -viewbotting",
	"maybe just -end stream",
	"is he -viewbotting",
	"bro is -viewbotting",
	"-adj andy",
	"bro is -adj",
	"i'm -leaving",
	"-goodbye",
	"chat is moving -slow",
	"chat is bro -viewbotting",
	"chat is bro -adj",
	"why is chat so -slow",
	"chat is so -slow",
	"chat is -slow",
	"give me -attention",
	"can we be -friends",
	"wanna be -friends",
	"are you -single",
	"-notice me please",
	"this is -disappointing",
	"you got -cancelled",
	"-dead chat",
	"chat is -dead",
	"why is chat -dead",
	"your [view count] is -low",
	"bro has [-0 viewers]",
	"-nobody cares",
	"-nobody is listening",
	"-nobody is watching this",
	"turn the music -down",
	"turn your mic -down",
	"-lower the music",
	"-lower your mic",
	"-lower your mic",
	"-move your facecam",
	"can i be -mod",
	"can you -mod me",
	"-mod me",
	"do you need -mods",
	"do you need a -mod",
	"-ban me",
	"just -ban me",
	"can you -ban me",
	"-follow me",
	"can you -follow me",
	"please -follow me",
	"everyone -follow me",
	"this is -slop",
	"-lock in",
	"bro -lock in",
	"i'm [-falling asleep] now",
	"what is he -playing",
	"-low viewership",
	"shut -up please",
	"please shut -up",
]

SPA.data.wordlists = {
	"adj": "-adj,-adj,+adj",
	"-adj": "bad,awful,terrible,boring,lame,goofy,dumb,stupid,cringe,discombobulated,buns,L,disgusting,chopped,cooked,goofy ahh",
	"+adj": "lovely,awesome,beautiful,cool,amazing,W,great",
	"opinion": "+love,-hate",
	"subject": "stream,streamer,game",
	"streamer": "streamer,livestreamer,live streamer",
	"stream": "stream,livestream,live,live stream",
	"ur": "you're,ur",
	"a": "a,a,an",
	"-gross": "trash,garbage,poop,a toilet,toenails,spoiled milk,earwax,puke,mold,dandruff",
	"you": "you,you,u",
	"now": "now,rn",
	"facecam": "facecam,face cam",
	"messages": "messages,logs",
	"please": "please,please,pls,plz",
	"-nobody": "nobody,no one",
	"everyone": "everyone,everybody",
	"mic": "mic,microphone,volume"
}

SPA.data.multipliers = {
	"so": 1,
	"really": 1,
	"extremely": 2,
	"super": 1.5,
	"very": 1,
	"pretty": 0.5,
	"quite": 0.5,
	"kinda": 0.5,
	"absolutely": 2,
	"lowkey": 0.75,
	"highkey": 1.5,
	"tbh": 0.5,
	"honestly": 0.75,
	"such": 1
}

SPA.data.inverters = {
	"not": true,
	"don't": true,
}

SPA.data.starters = {};
SPA.data.nextwords = {};
SPA.data.allwords = {};

let sentences = SPA.data.sentences;
SPA.data.sentences = [];
sentences.forEach(sentence => {
	const words = sentence.match(/\[[^\]]+\]|\S+/g).map(w => w.replace(/[\[\]]/g, ""));
	SPA.data.sentences.push(words);

	if (!SPA.data.starters[words[0]]) SPA.data.starters[words[0]] = 1;
	else SPA.data.starters[words[0]] ++;

	for (let i = 0; i < words.length; i++) {
		const word = words[i];
		if (SPA.data.nextwords[word] === undefined) SPA.data.nextwords[word] = {};
		SPA.data.allwords[word] = true;

		const lastWord = words[i+1];
		if (lastWord === undefined) continue;
		if (SPA.data.nextwords[word][lastWord] === undefined) SPA.data.nextwords[word][lastWord] = 2;
		else SPA.data.nextwords[word][lastWord] += 2;
	}
})
SPA.data.allwords = Object.keys(SPA.data.allwords);

for (let key in SPA.data.wordlists) {
	SPA.data.wordlists[key] = SPA.data.wordlists[key].split(",");
}

SPA.data.modifiers = {
	"-": {
		
	},
	"+": {

	}
};

function doWord(word) {
	let key = word;

	if (SPA.data.wordlists[word]) {
		let chosen = choose(SPA.data.wordlists[word]);
		word = chosen;
		if (word !== key) {
			let item = doWord(word);
			word = item.text;
		}
		key = chosen;
	}

	let mod = word.charAt(0);
	if (SPA.data.modifiers[mod]) {
		word = word.slice(1);
	}
	else mod = undefined;

	return {
		text: word,
		key: key,
		mod: mod
	};
}

function pickStarters() {
	let starters = JSON.parse(JSON.stringify(SPA.data.starters));
	let keys = Object.keys(starters);

	let picked = [];

	if (Math.random() < 0.25) {
		picked.push(doWord(choose(Object.keys(SPA.data.multipliers))));
	}
	if (Math.random() < 0.25) {
		picked.push(doWord(choose(Object.keys(SPA.data.inverters))));
	}

	for (let i = 0; i < 4; i++) {
		let word = chooseWeighted(keys, Object.values(starters));
		starters[word] = 0;
		if (!word) continue;
		picked.push(doWord(word));
	}
	
	picked = picked.slice(0,4);
	picked.sort(() => Math.random() - 0.5);

	return picked;
}

function pickNext() {
	let lastWord = currentSentence[currentSentence.length-1].key;
	let picked = [];
	let nextWords = JSON.parse(JSON.stringify(SPA.data.nextwords[lastWord] || {}));
	let keys = Object.keys(nextWords);

	if (Math.random() < 0.25) {
		picked.push(doWord(choose(Object.keys(SPA.data.multipliers))));
	}
	if (Math.random() < 0.25) {
		picked.push(doWord(choose(Object.keys(SPA.data.inverters))));
	}

	if (Object.keys(nextWords).length) {
		// pick 2 weighted words
		for (let i = 0; i < 2; i++) {
			let word = chooseWeighted(keys, Object.values(nextWords));
			if (word) {
				nextWords[word] = 0;
				picked.push(doWord(word));
			}
		}
	}

	let remaining = 4 - picked.length;
	if (remaining) {
		let allWords = [...SPA.data.allwords];
		picked.forEach(item => {
			let index = allWords.indexOf(item.key);
			allWords.splice(index, 1);
		})
		for (let i = 0; i < remaining; i++) {
			let word = choose(allWords);
			if (word) {
				let index = allWords.indexOf(word);
				allWords.splice(index, 1);
				picked.push(doWord(word));
			}
		}
	}

	picked = picked.slice(0,4);
	picked.sort(() => Math.random() - 0.5);

	return picked;
}

function createMessage(text, username, type) {
	let chatMessages = document.getElementById("chatMessages");

	chatMessages.insertAdjacentHTML("beforeend",
		`<div class="message${type ? " "+type : ""}"><span class="username">${username}</span>: <span class="text">${text}</span></div>`
	);
}
function judgeSentence(sentence) {
	sentence = sentence || currentSentence;

	sentence = sentence.map(item => item.key);

	// sentence = ["this","subject","is","so","-adj"];

	let multiplier = 1;
	let inverter = false;
	for (let i = 0; i < sentence.length; i++) {
		const word = sentence[i];
		if (SPA.data.multipliers[word]) {
			multiplier += SPA.data.multipliers[word];
			sentence.splice(i, 1);
			i--;
		}
		if (SPA.data.inverters[word]) {
			inverter = word;
		}
	}

	// console.log(sentence);
	// console.log(multiplier);

	let closest = "";
	let closestScore = 0;

	const string = sentence.join(" ");

	for (let i = 0; i < SPA.data.sentences.length; i++) {
		const string2 = SPA.data.sentences[i].join(" ");
		let score = similarity(string, string2);
		if (score > closestScore) {
			closest = SPA.data.sentences[i];
			closestScore = score;
		}
	}

	if (!closest || !closestScore) return 0;
	if (closestScore < 0.5) return 0;

	// console.log(closest)
	// console.log(closestScore)

	let points = 0;

	sentence.forEach(key => {
		if (key.charAt(0) === "-") points ++;
		if (key.charAt(0) === "+") points --;
	})

	points *= closest.length * closestScore;
	points *= multiplier;

	if (inverter && closest.indexOf(inverter) === -1) {
		points = -points;
	}

	return points;
}
currentMoves = 0;
function sendSentence() {
	if (!currentSentence.length) return;
	if (document.getElementById("chatInputSend").getAttribute("disabled") === "true") return;

	let text = "";
	currentSentence.forEach(item => {
		text += item.text + " ";
	});
	text = text.trim();

	if (!text) return;

	createMessage(text, "You", "self");
	let score = judgeSentence();
	
	currentScore += score;
	currentScore = Math.round(currentScore * 10) / 10;
	currentScore = Math.max(currentScore, 0);
	currentMoves ++;

	// sound: typing
	document.querySelectorAll("#chatInputButtons button").forEach(btn => btn.disabled = true);
	document.getElementById("chatInputCursor").style.visibility = "hidden";
	document.getElementById("chatInputSend").setAttribute("disabled", "true");
	setTimeout(() => {
		// sound: huh
		// sprite: looking
		playAudio(Math.random() < 0.5 ? "huh1.wav" : "huh2.wav");
		let streamer = document.getElementById("img-streamer");
		streamer.style.backgroundImage = `url("art/ragebait/react.png")`;
		streamer.classList.add("downward");

		setTimeout(() => {

			// sound: reaction (very angry, angry, confused, happy)
			// sprite: idle with mood
			// new high score above 2 = flash picture on screen

			if (score > currentBest) {
				currentBest = score;
				flashImage("img/ragebait" + (Math.floor(Math.random() * 9) + 1) + ".jpg");
			}

			streamer.classList.remove("downward");
			document.getElementById("chatInputCursor").style.visibility = "unset";
			document.getElementById("chatInputSend").setAttribute("disabled", "false");
			newTurn();
			updateMeter();
			if (currentScore >= maxScore) endRound();

		}, 500);
	}, 500);
	console.log(`${score} ${currentScore}`)
}
lastImg = "idle";
function updateMeter() {
	let percent = Math.round(currentScore / maxScore * 100) + 5;
	let rageMeter = document.getElementById("rageMeter");
	rageMeter.style.backgroundImage = `linear-gradient(to top, #ff0000 0%, #ff0000 ${percent}%, #f5f5f5 ${percent}%, #f5f5f5 100%)`;

	let img = "idle"
	if (percent > 80) img = "idle-furious";
	else if (percent > 50) img = "idle-angry";
	else if (percent > 20) img = "idle-mad";
	else if (percent > 5) img = "idle-annoyed";

	let streamer = document.getElementById("img-streamer");
	streamer.style.backgroundImage = `url("art/ragebait/${img}.png")`;

	if (percent > 80) {
		streamer.classList.add("shake");
	}
	else {
		streamer.classList.remove("shake");
		if (lastImg !== img) {
			lastImg = img;
			animateElement(streamer, "upward")
		}
	}
}

// art/ragebait/idle-furious.png
// art/ragebait/idle-angry.png
// art/ragebait/idle-mad.png
// art/ragebait/idle-annoyed.png
// art/ragebait/idle.png
// art/ragebait/background.png
// art/ragebait/react.png

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
function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}
function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function preloadImage(url) {
    var img=new Image();
    img.src=url;
}
// or: <link rel="preload" href="https://via.placeholder.com/160" as="image">
[
	"art/ragebait/idle-angry.png",
	"art/ragebait/idle-annoyed.png",
	"art/ragebait/idle-furious.png",
	"art/ragebait/idle-mad.png",
	"art/ragebait/idle.png",
	"art/ragebait/background.png",
	"art/ragebait/react.png",
].forEach(url => {
	preloadImage(url);
})
for (let i = 1; i <= 9; i++) {
	preloadImage("img/ragebait"+i+".jpg");
}

function preloadAudio(url) {
    var audio = new Audio();
    audio.src = url;
}
[
	"art/ragebait/huh1.wav",
	"art/ragebait/huh2.wav"
].forEach(url => {
	preloadImage(url);
})

audioPlayer = document.getElementById('player');
function playAudio(name) {
    player.src = "art/ragebait/" + name;
    player.play();
}

function animateElement(elem, className) {
	elem.classList.add(className);
	elem.addEventListener('animationend', () => {
		elem.classList.remove('animate');
	}, { once: true });
}

function flashImage(url) {
	let img = document.getElementById("imageFlash");
	img.src = url;
	img.style.display = "block";
	if (img.classList.contains("flash")) img.classList.toggle("flash");
	img.style.top = Math.floor(Math.random() * (window.innerHeight - 300)) + 150 + "px";
	img.style.left = Math.floor(Math.random() * (window.innerWidth - 300)) + 150 + "px";
	img.classList.toggle("flash");
	img.addEventListener("animationend", () => {
		img.classList.toggle("flash");
		img.style.display = "none";
	})
}

currentSentence = [];
currentScore = 0;
currentBest = 0;
maxScore = 30;

function addButtons(items) {
	let chatInputButtons = document.getElementById("chatInputButtons");
	chatInputButtons.innerHTML = "";

	items.forEach(item => {
		let btn = document.createElement("button");
		btn.className = "noSelect";
		btn.setAttribute("data-key", item.key);
		btn.setAttribute("data-text", item.text);
		btn.innerText = item.text;

		if (currentSentence.length > 10) {
			btn.disabled = true;
		}
		
		else btn.addEventListener("click", () => {
			SPA.main.classList.remove("untouched");

			currentSentence.push(item);

			chatInputMessage.insertAdjacentHTML("beforeend",` <span class="word" data-key="${item.key}">${item.text || item.key}</span>`)

			let next = pickNext();
			addButtons(next);
		});

		chatInputButtons.appendChild(btn);
	})
}

function newTurn() {
	currentSentence = [];

	let chatInputMessage = document.getElementById("chatInputMessage");
	chatInputMessage.innerHTML = "";

	let starters = pickStarters();
	addButtons(starters);
}

let banned = false;
function newRound() {
	document.getElementById("chatInput").style.display = "block";
	document.getElementById("chatMessages").style.display = "flex";
	document.getElementById("chatBan").style.display = "none";
	document.getElementById("chatMessages").innerHTML = "";
	currentScore = 0;
	currentMoves = 0;
	currentBest = 0;
	updateMeter();
	newTurn();
	banned = false;
	pickUsername();
	pickTitle();
	pickGame();
}
function endRound() {
	document.getElementById("chatInput").style.display = "none";
	document.getElementById("chatMessages").style.display = "none";
	document.getElementById("chatBan").style.display = "flex";
	document.getElementById("banName").innerText = document.getElementById("mainName").innerText;
	document.getElementById("banMoves").innerText = currentMoves;
	banned = true;
	let highScore = R74n.get("RageBaitHigh") || 0;
	if (currentMoves < highScore) {
		R74n.set("RageBaitHigh", currentMoves);
		highScore = currentMoves;
	}
	document.getElementById("banHigh").innerText = highScore;
}

function shareScore() {
	R74n.share(`I was banned from chat in ${currentMoves} messages. Can you beat me?`);
}

function pickUsername() {
	let span = document.getElementById("mainName");
	span.innerText = choose([
		"Ludwing",
		"Southerntiger",
		"Squeaks",
		"PointRaven",
		"Germa",
		"Pinesauce",
		"Pugpug",
		"R7Game",
		"BackManyfolds",
		"TanDRM",
		"Yahiarat",
		"Ainsey",
		"BigAnt"
	])
}
function pickTitle() {
	let span = document.getElementById("mainTitle");
	span.innerText = choose([
		"HUGE STREAM GETTING DUBS",
		"short early stream today",
		"SUBATHON DAY 72834867",
		"just chatting with chat",
		"media share stream GET IN NOW",
		"doing the new challenge"
	])
}
function pickGame() {
	let span = document.getElementById("mainPlaying");
	let game = choose([
		["Sandboxels", "https://neal.fun/sandboxels/"],
		["R74n", "https://r74n.com/"],
		["Infinite Chef", "https://r74n.com/cook/"],
		["What Are The Odds?", "https://r74n.com/mini/odds"],
		["GenTown", "https://r74n.com/gentown/"],
		["Every Ant on Earth", "https://r74n.com/ants/"],
		["Mix-Up!", "https://r74n.com/mix/"]
	])
	span.innerText = game[0];
	span.href = game[1];
}

SPA.onload = () => {
	SPA.main.classList.add("untouched");
	audioPlayer = document.getElementById('player');

	document.getElementById("chatInputSend").addEventListener("click", sendSentence);
	
	newRound();

	SPA.keybinds["1"] = () => {
		let btn = document.querySelector("#chatInputButtons button:nth-child(1)");
		if (btn && !btn.disabled) btn.click();
	}
	SPA.keybinds["2"] = () => {
		let btn = document.querySelector("#chatInputButtons button:nth-child(2)");
		if (btn && !btn.disabled) btn.click();
	}
	SPA.keybinds["3"] = () => {
		let btn = document.querySelector("#chatInputButtons button:nth-child(3)");
		if (btn && !btn.disabled) btn.click();
	}
	SPA.keybinds["4"] = () => {
		let btn = document.querySelector("#chatInputButtons button:nth-child(4)");
		if (btn && !btn.disabled) btn.click();
	}
	SPA.keybinds["q"] = () => {
		let btn = document.querySelector("#chatInputButtons button:nth-child(3)");
		if (btn && !btn.disabled) btn.click();
	}
	SPA.keybinds["w"] = () => {
		let btn = document.querySelector("#chatInputButtons button:nth-child(4)");
		if (btn && !btn.disabled) btn.click();
	}
	SPA.keybinds["Enter"] = () => {
		let btn = document.querySelector("#chatInputSend");
		if (btn && btn.getAttribute("disabled") !== "true") btn.click();
	}

	document.getElementById("mainName").addEventListener("click", pickUsername);
	document.getElementById("mainTitle").addEventListener("click", pickTitle);

}