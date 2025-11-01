let tricolor = (one,two,three) => `{{color: |unset|${one}}}{{color: |unset|${two}}}{{color: |unset|${three}}}`;
let flagColors = function() {return Array.prototype.slice.call(arguments).map((color) => `{{color: |unset|${color}}}`).join("")};

specialNames = {
	"america": {
		background: "#ffffff",
		foreground: "#ff0000",
		emblem: "▒",
		emblemColor: "#0000ff",
		color: "#ff0000",
		template: "$≣≣",
		dem: "American",
		dems: "Americans",
		adj: "American"
	},
	"usa": "=america",
	"us": "=america",
	"unitedstates": "=america",
	"unitedstatesofamerica": "=america",

	"r74n": {
		background: "#000000",
		foreground: "#ff00ff",
		emblem: "R",
		emblemColor: "#00ffff",
		color: "#00ffff",
		template: "→$←",
		dem: "Developer",
		dems: "Developers"
	},

	"france": {
		// flag: "{{color: |unset|#0000ff}}{{color: |unset|#ffffff}}{{color: |unset|#ff0000}}",
		flag: flagColors("#0000ff","#ffffff","#ff0000"),
		color: "#0000ff",
		dem: "Frenchman",
		dems: "Frenchmen",
		adj: "French"
	},
	"poland": {
		background: "#ffffff",
		foreground: "#ff0000",
		template: "▀▀▀",
		color: "#ff0000",
		dem: "Pole",
		dems: "Poles",
		adj: "Polish"
	},
	"china": {
		background: "#ff0000",
		foreground: "#ffff00",
		template: "☼  ",
		color: "#ff0000",
		dem: "Chinese",
		dems: "Chinese",
		adj: "Chinese"
	},
	"prc": "=china",
	"japan": {
		background: "#ffffff",
		foreground: "#ff0000",
		template: " ⏺ ",
		color: "#BF1234",
		dem: "Japanese",
		dems: "Japanese",
		adj: "Japanese"
	},
	"mexico": {
		flag: flagColors("#126D4E")+"{{color:●|#844F26|#FFFFFF}}"+flagColors("#D01F2E"),
		color: "#126D4E",
		dem: "Mexican",
		dems: "Mexicans",
		adj: "Mexican"
	},
	"eu": {
		background: "#05318B",
		foreground: "#F3BA18",
		template: " ☼ ",
		color: "#05318B",
		dem: "European",
		dems: "Europeans",
		adj: "European"
	},
	"europe": "=eu",
	"european union": "=eu",
}

specialCurrencies = {
	"dollar": "$",
	"usd": "$",
	"peso": "$",
	"colon": "₡",
	"cruzeiro": "₢",
	"franc": "₣",
	"pound": "₤",
	"sterling": "₤",
	"naira": "₦",
	"peseta": "₧",
	"won": "₩",
	"shekel": "₪",
	"ruble": "₽",
	"tenge": "₸",
	"cent": "¢",
	"penny": "¢",
	"cedi": "₵",
	"euro": "€",
	"dong": "₫",
	"yen": "¥",
	"kip": "₭",
	"krone": "kr",
	"bitcoin": "₿",
	"btc": "₿",
	"bit": "₿",
	"simoleon": "§",
	"sporebuck": "§",
}