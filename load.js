if (!String.prototype.replaceAll) {
	String.prototype.replaceAll = function(str, newStr){
		if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
			return this.replace(str, newStr);
		}
		return this.replace(new RegExp(str, 'g'), newStr);
	};
};

urlParams = new URLSearchParams(window.location.search);

const LSPrefix = "R74nMain-";
class R74nClass {
	constructor() {
		this.R74n = () => {console.log("R74n")}
		this.start = new Date();
	}
	get(key) {
		return localStorage.getItem(LSPrefix+key);
	}
	set(key, value) {
		return localStorage.setItem(LSPrefix+key, value);
	}
	add(key, value) {
		var old = R74n.get(key);
		if (!old) { return R74n.set(key,value); }
		if (isNaN(parseFloat(old))) {
			try {
				var parsed = JSON.parse(old);
				if (Array.isArray(parsed)) {
					parsed.push(value);
					return R74n.set(key, JSON.stringify(parsed));
				}
			}
			catch { return R74n.set(key, old+value); }
		}
		return R74n.set(key, parseFloat(old)+value);
	}
	del(key) {
		return localStorage.removeItem(LSPrefix+key);
	}
	keys() {
		return listLS(LSPrefix);
	}
}
const R74n = new R74nClass();

function listLS(prefix) {
	prefix = prefix || "";
	var keys = [];
	for (var i = 0; i < localStorage.length; i++) {
		if (localStorage.key(i).startsWith(prefix)) {
			keys.push(localStorage.key(i).replace(prefix,""));
		}
	}
	return keys;
}

function getJSON(url) {
    var Httpreq = new XMLHttpRequest();
    Httpreq.open("GET",url,false);
    Httpreq.send(null);
    return JSON.parse(Httpreq.responseText);
}

function schemaDate(date) {
	return date.toISOString().split('T')[0];
}
function addSchema(schema,id) {
	var structuredDataText = JSON.stringify(schema);
	if (document.getElementById(id)) {
		document.getElementById(id).remove();
	}
	const script = document.createElement('script');
	script.setAttribute('type', 'application/ld+json');
	script.textContent = structuredDataText;
	script.id = id;
	document.head.appendChild(script);
}

function playSound(url) {
	var audio = new Audio(url);
	audio.play();
}

window.addEventListener("load",function(){

// Console Watermark
console.log("%c WELCOME TO R74n ","position: absolute; top: 50%; right: 50%; transform: translate(50%,-50%); font-family: Arial; font-size: 3em; font-weight: 700; color: #00ffff; text-shadow: 1px 1px 1px #14c9c9, 1px 2px 1px #14c9c9, 1px 3px 1px #14c9c9, 1px 4px 1px #14c9c9, 1px 5px 1px #14c9c9, 1px 13px 6px rgba(16,16,16,0.4), 1px 22px 10px rgba(16,16,16,0.2), 1px 25px 35px rgba(16,16,16,0.2), 1px 30px 60px rgba(16,16,16,0.4);padding:10px")

function callRue() {
	if (typeof Rue === "undefined" && !document.getElementById("rueScript")) {
		console.log("Calling Rue...")
		document.body.insertAdjacentHTML("beforeend", `<div style="position:absolute;top:1em;right:1em;padding-right:1em;padding-left:1em;display:block;text-align:center;border:solid white;background:rgb(107, 107, 107);border-radius:100px;height:2em;line-height:2em;width:10em;cursor:pointer" id="rueCallerBox" onclick="this.style.display='none'">☎️ Calling Rue...</div>`);
		var script = document.createElement("script");
		script.id = "rueScript";
		script.onload = function() {
			document.getElementById("rueCallerBox").remove();
			var rueHasLoaded = setInterval(function() {
				if (typeof Rue !== "undefined") {
					clearInterval(rueHasLoaded);
					document.getElementById("rueInput").focus();
					Rue.blink();
					Rue.say("Hello! Type in certain commands to make me do things.");
				}
			}, 10);
		}
		script.onerror = function() {
			console.log("Rue failed to load!");
			document.getElementById("rueCallerBox").innerHTML = "❌ Rue failed to load!";
			setTimeout(function() {
				document.getElementById("rueCallerBox").remove();
			}, 2000);
		}
		script.src = "https://r74n.com/rue/rue.js";
		document.head.appendChild(script);
	}
	else {
		console.log("Rue is already here!");
	}
}
if (urlParams.get("rue") && urlParams.get("rue") !== "false" && urlParams.get("rue") !== "off") {
	callRue();
}

// if metaKey + shift + R is pressed, add Rue script to the head
window.addEventListener("keydown", function(e) {
	if (e.shiftKey && (e.metaKey||e.ctrlKey) && e.key.toLowerCase() === "e") {
		callRue();
		e.preventDefault();
	}
});

});