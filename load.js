if (!String.prototype.replaceAll) {
	String.prototype.replaceAll = function(str, newStr){
		if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
			return this.replace(str, newStr);
		}
		return this.replace(new RegExp(str, 'g'), newStr);
	};
};

if (!window.urlParams) {
	window.urlParams = new URLSearchParams(window.location.search);
}

const LSPrefix = "R74nMain-";
class R74nClass {
	constructor() {
		this.R74n = () => {console.log("R74n")}
		this.start = new Date();
		this.state = {};
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
	has(key) {
		return localStorage.hasOwnProperty(LSPrefix+key);
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

if (!window.choose) {
	window.choose = function(array) {
		return array[Math.floor(Math.random() * array.length)];
	}
}
if (!window.randRange) {
	window.randRange = function(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

function playSound(url) {
	var audio = new Audio(url);
	audio.play();
}

window.submitContactForm = function(form) {
	let req = new FormData(form);
	if (window.navigator) {
      req.append("appVersion", window.navigator.appVersion || "");
      req.append("lang", window.navigator.language || "");
    }
	let response = form.querySelector(".response");
	if (!response) {
		response = document.createElement("p");
		form.appendChild(response);
	}
    response.style.display = "block";
    response.innerText = "Submitting...";

	fetch("https://formsubmit.co/ajax/contact@r74n.com", {
      method: "POST",
      body: req
    })
      .then(response => response.json())
      .then(data => {
        response.innerText = data.message;
        if (data.success) form.reset();
      })
      .catch(error => response.innerText = error);
	
	return false;
}

/*R74n Observer
  Don't worry, I'm harmless!*/
if (document.referrer) {
	if (document.referrer.indexOf("r74n.") === -1) {
		const refdomain = document.referrer.replace(/^https?:\/\//g, "").replace(/^www\./g, "").replace(/\/$/g, "");
		document.cookie = "R74nRef="+refdomain+";max-age=86400;path=/;domain=r74n.com";
	}
	else {
		const refpath = document.referrer.replace(/^https?:\/\//g, "").replace(/^www\./g, "").replace(/\/$/g, "");
		document.cookie = "R74nRefLocal="+refpath+";max-age=86400;path=/;domain=r74n.com";
	}
}

// Global URL Params
if (this.location.search) {
	let shareURLs = {
		archive: "https://web.archive.org/save/[URL]",
		reddit: "https://www.reddit.com/submit?url=[URL]&title=[TITLE]",
		pin: "https://www.pinterest.com/pin/create/button/?url=[URL]&media=&description=[TITLE]",
	}
	for (let key in shareURLs) {
		if (urlParams.has(key)) {
			let url = shareURLs[key];
			url = url.replace(/\[URL\]/, encodeURIComponent(location.href));
			url = url.replace(/\[TITLE\]/, encodeURIComponent(document.title));
			this.location.href = url;
			break;
		}
	}
	if (urlParams.has("print")) window.print();
}


if (!window.getCookie) {
	window.getCookie = function (name) {const cookieString = document.cookie;const cookies = cookieString.split(';');for (let i = 0; i < cookies.length; i++) {let cookie = cookies[i].trim();if (cookie.startsWith(name + '=')) {return cookie.substring(name.length + 1);}}return null;}
}

window.addEventListener("load",function(){

if (!location.host) R74n.state.file = true;
if (location.host === "r74n.com") {
	R74n.state.main = true;
	R74n.state.official = true;
}
else if (location.href && location.href.match(/^https?:\/\/(?:[^\/]+\.)?r74n\.com(?:\/.+)?/i)) {
	R74n.state.official = true;
}

if (!R74n.state.file || R74n.state.main) {
	// Open external links in new tab
	[...document.getElementsByTagName("a")].forEach(a => {
		if (a && !a.hasAttribute("target") && a.href && ((a.href.startsWith("http") && !a.href.match(/^https?:\/\/(?:[^\/]+\.)?r74n\.com(?:\/.+)?/i)) || a.href.match(/^mailto:/))) {
			a.setAttribute("target","_blank");
		}
	});
}

if (window.navigator) {
	if (['iPad Simulator','iPhone Simulator','iPod Simulator','iPad','iPhone','iPod'].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)) {
		R74n.state.mobile = true;
		R74n.state.ios = true;
	}
	if (navigator.userAgentData) {
		if (navigator.userAgentData.mobile) R74n.state.mobile = true;
		if (navigator.userAgentData.platform) R74n.state.platform = navigator.userAgentData.platform;
	}
}

if (window.self != window.top) {
	R74n.state.embedded = true;
	this.document.body.classList.add("embedded")
}

let _pageHeader = document.querySelector("body header:first-child");
if (_pageHeader && _pageHeader.style.display !== "none") {
	R74n.state.header = true;
}
let _pageFooter = document.querySelector("body > footer");
if (_pageFooter) {
	R74n.state.footer = true;
}

// Add footer when necessary
if (R74n.state.main && !R74n.state.footer && R74n.state.header) {
	document.body.insertAdjacentHTML("beforeend", `<footer><nav>
  <a href="https://r74n.com/" style="color:#00ffff">More Projects</a>
  <a href="https://r74n.com/contact">Contact</a>
  <a href="https://r74n.com/privacy">Privacy</a>
</nav></footer>`);
}

// Console Watermark
console.log("%c WELCOME TO R74n ","position: absolute; top: 50%; right: 50%; transform: translate(50%,-50%); font-family: Arial; font-size: 3em; font-weight: 700; color: #00ffff; text-shadow: 1px 1px 1px #14c9c9, 1px 2px 1px #14c9c9, 1px 3px 1px #14c9c9, 1px 4px 1px #14c9c9, 1px 5px 1px #14c9c9, 1px 13px 6px rgba(16,16,16,0.4), 1px 22px 10px rgba(16,16,16,0.2), 1px 25px 35px rgba(16,16,16,0.2), 1px 30px 60px rgba(16,16,16,0.4);padding:10px")
console.log("You seem to be tech-oriented. You should join our Discord server.")

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

// if metaKey + shift + E is pressed, add Rue script to the head
window.addEventListener("keydown", function(e) {
	if (e.shiftKey && (e.metaKey||e.ctrlKey) && e.key.toLowerCase() === "e") {
		callRue();
		e.preventDefault();
	}
});

});