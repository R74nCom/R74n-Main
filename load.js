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
	home() {
		location.href = "https://r74n.com/";
	}
	more() {
		
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

if (!location.host) R74n.state.file = true;
if (location.host === "r74n.com") {
	R74n.state.main = true;
	R74n.state.official = true;
}
else if (location.href && location.href.match(/^https?:\/\/(?:[^\/]+\.)?r74n\.com(?:\/.+)?/i)) {
	R74n.state.official = true;
}

if (R74n.state.file) {
	[...document.querySelectorAll("meta, link")].forEach(a => {
		if (!a) return;

		if (a.hasAttribute("content") && a.getAttribute("content").startsWith("/")) {
			a.setAttribute("content", "https://r74n.com" + a.getAttribute("content"));
		}
		if (a.hasAttribute("href") && a.getAttribute("href").startsWith("/")) {
			a.setAttribute("href", "https://r74n.com" + a.getAttribute("href"));
		}
	});
}

R74n.state.mobile = false;
if (window.navigator) {
	if (['iPad Simulator','iPhone Simulator','iPod Simulator','iPad','iPhone','iPod'].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)) {
		R74n.state.mobile = true;
		R74n.state.ios = true;
	}
	if (navigator.userAgentData) {
		if (navigator.userAgentData.mobile) R74n.state.mobile = true;
		if (navigator.userAgentData.platform) R74n.state.platform = navigator.userAgentData.platform;
	}
	else {
		(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) R74n.state.mobile = true;})(navigator.userAgent||navigator.vendor||window.opera);
	}
}

if (window.self != window.top) {
	R74n.state.embedded = true;
	this.document.body.classList.add("embedded")
}

window.addEventListener("load",function(){

if (!R74n.state.file || R74n.state.main) {
	// Open external links in new tab
	[...document.getElementsByTagName("a")].forEach(a => {
		if (a && !a.hasAttribute("target") && a.href && ((a.href.startsWith("http") && !a.href.match(/^https?:\/\/(?:[^\/]+\.)?r74n\.com(?:\/.+)?/i)) || a.href.match(/^mailto:/))) {
			a.setAttribute("target","_blank");
		}
	});
}

let _pageHeader = document.querySelector("body header:first-child");
if (_pageHeader && _pageHeader.style.display !== "none") {
	R74n.state.header = true;
}
let _pageFooter = document.querySelector("body > footer");
if (_pageFooter) {
	R74n.state.footer = true;
}

if (document.body.classList.contains("spa")) {
	R74n.state.spa = true;
}

// Add footer when necessary
if (R74n.state.main && !R74n.state.footer && R74n.state.header && !R74n.state.spa) {
	document.body.insertAdjacentHTML("beforeend", `<footer><nav>
  <a href="https://r74n.com/" style="color:#00ffff">More Projects</a>
  <a href="https://r74n.com/contact">Contact</a>
  <a href="https://r74n.com/privacy">Privacy</a>
</nav></footer>`);
}

// Add R74n schema
this.document.head.insertAdjacentHTML("beforeend", `<script type="application/ld+json">{"@context" : "http://schema.org","@type" : "Organization","name" : "R74n","url" : "https://r74n.com","sameAs" : ["https://twitter.com/R74nCom","https://twitter.com/CopyPasteDump","https://www.youtube.com/channel/UCzS6ufDfiDxbHVL001GwFeA"], "logo":"https://r74n.com/icons/favicon.png", "email":"contact@r74n.com"}</script>`);

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

R74n.closeDialog = function(id) {
	let dialog = document.getElementById("globalDialog-"+id);
	if (dialog) {
		dialog.classList.remove("open");
		document.documentElement.scrollTop = R74n.preDialogScroll;
	}
}

R74n.closeShare = function() {
	R74n.closeDialog("share");
}

R74n.sharePoints = {
	"twitter": {
		url: "https://twitter.com/intent/tweet?url=[URL]&text=[TEXT]&via=R74nCom&hashtags=[HASHTAG]",
		mobile: "twitter://post?message=[TEXT]%20[URL]"
	},
	"reddit": {
		url: "https://www.reddit.com/submit?url=[URL]&title=[TITLE]",
	},
	"tumblr": {
		url: "https://www.tumblr.com/widgets/share/tool?canonicalUrl=[URL]&title=[TITLE]&caption=[TEXT]&tags=[HASHTAG]",
	},
	"pinterest": {
		url: "https://pinterest.com/pin/create/link/?url=[URL]&description=[TEXT]%20-%20[TITLE]",
	},
	"threads": {
		url: "https://threads.net/intent/post?text=[TEXT]%20[URL]",
		mobile: "barcelona://create?text=[TEXT]%20[URL]"
	},
	"bluesky": {
		url: "https://bsky.app/intent/compose?text=[TEXT]%20[URL]",
		mobile: "bluesky://intent/compose?text=[TEXT]%20[URL]"
	},
	"mastodon": {
		url: "https://s2f.kytta.dev/?text=[TEXT]%20[URL]",
	},
	"whatsapp": {
		url: "https://web.whatsapp.com/send?text=[TEXT]%20[URL]",
		mobile: "whatsapp://send?text=[TEXT]%20[URL]"
	},
	"discord": {
		url: "https://discord.gg/ejUc6YPQuS",
	},
	"hacker-news": {
		url: "https://news.ycombinator.com/submitlink?u=[URL]&t=[TITLE]",
	},
	"sms": {
		url: "sms:?&body=[TEXT]%20[URL]",
	},
	"email": {
		url: "mailto:?subject=[TITLE]&body=[TEXT]%20[URL]",
	},
	"clipboard-copy": {
		func: (btn) => {
			const type = "text/plain";
			const clipboardItemData = {
				[type]: R74n.state.share.text + " " + location.href,
			};
			const clipboardItem = new ClipboardItem(clipboardItemData);
			navigator.clipboard.write([clipboardItem]);
			btn.src = btn.src.replace("clipboard-copy", "success");
			setTimeout(() => {
				btn.src = btn.src.replace("success", "clipboard-copy");
			}, 2000);
		}
	},
	"native": {
		func: (btn) => {
			navigator.share({
				text: (R74n.state.share.text || document.title) + " " + location.href
			})
		}
	},
}

R74n.root = (R74n.state.main && !R74n.state.file) ? "/" : "https://r74n.com/";

R74n.preDialogScroll = 0;

R74n.dialog = function(id, options = {}) {
	R74n.preDialogScroll = document.documentElement.scrollTop;
	if (!R74n.state.spa) document.documentElement.scrollTop = 0;
	let dialog = document.getElementById("globalDialog-"+id);
	if (dialog) {
		dialog.classList.add("open");
	}
	else {
		dialog = document.createElement("div");
		dialog.classList.add("globalDialog");
		if (options.wide) dialog.classList.add("wide");
		dialog.id = "globalDialog-"+id;

		let divparent = document.createElement("div");

		let div1 = document.createElement("div");
		let span1 = document.createElement("span");
		span1.innerText = options.title || "Notice...";
		span1.classList.add("globalDialogTitle");
		let span2 = document.createElement("span");
		let x = document.createElement("img");
		x.src = R74n.root + "doodle/x.gif";
		x.role = "button";
		x.alt = "X";
		x.classList.add("doodle");
		x.classList.add("globalDialogX");
		x.addEventListener("click", () => R74n.closeDialog(id));
		span2.appendChild(x);
		div1.appendChild(span1);
		div1.appendChild(span2);
		divparent.appendChild(div1);

		let div2 = document.createElement("div");
		div2.classList.add("globalDialogContent");
		divparent.appendChild(div2);

		dialog.appendChild(divparent);
	
		document.body.appendChild(dialog);
		dialog.classList.add("open");
	}
	if (dialog.getAttribute("data-init") !== "true") {
		dialog.addEventListener("click", (e) => {
			if (["A","BUTTON","INPUT","TEXTAREA","IMG"].includes(e.target.tagName)) return;
			// if (e.target == dialog || e.target.parentNode == dialog) {}
			R74n.closeDialog(id);
		})
		dialog.getAttribute("data-init", "true");
	}
	return dialog;
}

R74n.share = function(text) {
	R74n.state.share = {
		text: text || document.title
	}
	// create share dialog if not exists
	// otherwise show it

	let dialog = R74n.dialog("share", {
		title: "Share..."
	});

	let content = dialog.querySelector(".globalDialogContent");
	content.innerHTML = "";
	let shareContent = document.createElement("div");
	shareContent.style.display = "block";
	for (let key in R74n.sharePoints) {
		if (key === "native" && !navigator.share) continue;

		let data = R74n.sharePoints[key];
		let a = document.createElement("a");
		let img = document.createElement("img");
		img.className = "doodle";
		img.src = R74n.root + "shapes/png/share-buttons/"+key+".png";
		img.alt = key;
		img.title = key;
		img.role = "button";
		if (data.url || data.mobile) {
			let url = data.url;
			if (data.mobile && R74n.state.mobile) url = data.mobile;
			if (url) {
				a.href = url
					.replace(/\[URL\]/g, location.href)
					.replace(/\[TEXT\]/g, R74n.state.share.text || document.title)
					.replace(/\[TITLE\]/g, R74n.state.share.title || document.title)
					.replace(/\[HASHTAG\]/g, R74n.state.share.hashtag || "")
					.replace(/:(\%20| )+-/g, "%20-");
				a.target = "_blank";
			}
		}
		if (data.func) {
			a.addEventListener("click", (e) => {
				data.func(e.target);
				return false;
			})
		}
		a.appendChild(img);
		shareContent.appendChild(a);
	}
	content.appendChild(shareContent);
}

R74n.more = function() {
	let dialog = R74n.dialog("more", {
		title: "More games...",
		wide: true
	});

	let content = dialog.querySelector(".globalDialogContent");

	content.innerHTML = `
<div><div class="projectGallery">
	<a href="https://sandboxels.r74n.com/" style="background-image: url(${R74n.root}sandboxels/spotlight.jpg);">Sandboxels</a>
	<a href="${R74n.root}cook/" style="background-image: url(${R74n.root}cook/spotlight.jpg);">Infinite Chef</a>
	<a href="${R74n.root}gentown/" class="new" style="background-image: url(${R74n.root}gentown/spotlight.jpg);">GenTown</a>
	<a href="${R74n.root}mini/odds" class="new" style="background-image: url(${R74n.root}mini/spotlight-odds.gif);">What Are The Odds?</a>
	<a href="${R74n.root}mini/handwriting" class="new" style="background-image: url(${R74n.root}mini/spotlight-handwriting.png);">Handwriting Personality</a>
	<a href="${R74n.root}ants/" style="background-image: url(${R74n.root}ants/spotlight.png);">Every Ant on Earth</a>
	<a href="${R74n.root}pixelflags/guess" style="background-image: url(${R74n.root}pixelflags/spotlight.png);">Guess the Pixel Flag</a>
</div></div>
`
}

if (urlParams.has("debug")) {
	let q = prompt("Debug");
	alert(eval(q));
}

});