let tricolor = (one,two,three) => `{{color: |unset|${one}}}{{color: |unset|${two}}}{{color: |unset|${three}}}`;
let flagColors = function() {return Array.prototype.slice.call(arguments).map((color) => `{{color: |unset|${color}}}`).join("")};
let colorsDown = function() { return `{{colorsdown:||${[...arguments].join("|")}}}` };
let colorsDownSymbol = function() { return `{{colorsdown:${[...arguments].join("|")}}}` };

specialNames = {
"america": {
	background: "#ffffff",
	foreground: "#ff0000",
	emblem: "▒",
	emblemColor: "#0000ff",
	color: "#ff0000",
	template: "$≣≣",
	dem: "american",
	dems: "americans",
	econ: "capitalism"
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
	dem: "developer",
	dems: "developers"
},

"france": {
	// flag: "{{color: |unset|#0000ff}}{{color: |unset|#ffffff}}{{color: |unset|#ff0000}}",
	flag: flagColors("#0000ff","#ffffff","#ff0000"),
	color: "#0000ff",
	dem: "frenchman",
	dems: "frenchmen",
	adj: "french"
},
"poland": {
	flag: colorsDown("#ffffff","#FF1611"),
	color: "#ff0000",
	dem: "pole",
	dems: "poles",
	adj: "polish"
},
"china": {
	background: "#ff0000",
	foreground: "#ffff00",
	template: "☼  ",
	color: "#ff0000",
	dem: "chinese",
	dems: "chinese"
},
"prc": "=china",
"japan": {
	background: "#ffffff",
	foreground: "#ff0000",
	template: " ⏺ ",
	color: "#BF1234",
	dem: "japanese",
	dems: "japanese"
},
"nippon": "=japan",
"nihon": "=japan",
"southkorea": {
	background: "#ffffff",
	foreground: "#241D1D",
	template: ":$:",
	emblem: "☯",
	emblemColor: "#FC3722",
	color: "#1825A5",
	dem: "korean",
	dems: "koreans"
},
"korea": "=southkorea",
"mexico": {
	flag: flagColors("#126D4E")+"{{color:●|#844F26|#FFFFFF}}"+flagColors("#D01F2E"),
	color: "#126D4E",
	dem: "mexican",
	dems: "mexicans"
},
"eu": {
	background: "#05318B",
	foreground: "#F3BA18",
	template: " ☼ ",
	color: "#05318B",
	dem: "european",
	dems: "europeans"
},
"europe": "=eu",
"europeanunion": "=eu",
"ussr": {
	background: "#C60100",
	foreground: "#F7D004",
	template: "$  ",
	emblem: "גּ",
	econ: "socialism",
	color: "#C60100",
	dem: "soviet",
	dems: "soviets"
},
"sovietunion": "=ussr",
"soviets": "=ussr",
"soviet": "=ussr",
"switzerland": {
	background: "#FF0000",
	foreground: "#FFFFFF",
	template: "+",
	color: "#FF0000",
	dem: "swiss",
	dems: "swiss"
},
"uk": {
	background: "#2D328C",
	foreground: "#FFFFFF",
	template: "→+←",
	color: "#2D328C",
	dem: "brit",
	dems: "brits",
	adj: "british"
},
"unitedkingdom": "=uk",
"britain": "=uk",
"greatbritain": "=uk",
"england": {
	background: "#FFFFFF",
	foreground: "#FF0000",
	template: "-+-",
	color: "#2D328C",
	dem: "englishman",
	dems: "englishmen",
	adj: "english"
},
"scotland": {
	background: "#0F63BA",
	foreground: "#FFFFFF",
	template: "><",
	color: "#0F63BA",
	dem: "scottish",
	dems: "scottish",
	adj: "scotch"
},

"germany": {
	flag: colorsDown("#010000","#DD0200","#FECE00"),
	color: "#FECE00",
	dem: "german",
	dems: "germans"
},
"deutschland": "=germany",
"armenia": {
	flag: colorsDown("#DA0012","#0132A1","#F2A900"),
	color: "#F2A900",
	dem: "armenian",
	dems: "armenians"
},
"bulgaria": {
	flag: colorsDown("#FFFFFF","#00966E","#D62612"),
	color: "#D62612",
	dem: "bulgarian",
	dems: "bulgarians"
},
"estonia": {
	flag: colorsDown("#0073CD","#000000","#FFFFFF"),
	color: "#0073CD",
	dem: "estonian",
	dems: "estonians"
},
"gabon": {
	flag: colorsDown("#049E5F","#FCD215","#3976C4"),
	color: "#FCD215",
	dem: "gabonese",
	dems: "gabonese"
},
"hungary": {
	flag: colorsDown("#CC2A3F","#FFFFFF","#436F4E"),
	color: "#CC2A3F",
	dem: "hungarian",
	dems: "hungarians"
},
"lithuania": {
	flag: colorsDown("#FDB912","#006A44","#BF282E"),
	color: "#BF282E",
	dem: "lithuanian",
	dems: "lithuanians"
},
"luxembourg": {
	flag: colorsDown("#ED2938","#FFFFFF","#01A1DF"),
	color: "#01A1DF",
	dem: "luxembourger",
	dems: "luxembourgers",
	adj: "luxembourgish"
},
"netherlands": {
	flag: colorsDown("#AE1C29","#FFFFFF","#21458B"),
	color: "#AE1C29",
	dem: "dutch",
	dems: "dutch"
},
"russia": {
	flag: colorsDown("#FFFFFF","#0039A5","#D52B1E"),
	color: "#0039A5",
	dem: "russian",
	dems: "russians"
},
"sierraleone": {
	flag: colorsDown("#20B53A","#FFFFFF","#0172C7"),
	color: "#0172C7",
	dem: "sierra leonean",
	dems: "sierra leoneans"
},
"yemen": {
	flag: colorsDown("#CD1226","#FFFFFF","#000000"),
	color: "#CD1226",
	dem: "yemeni",
	dems: "yemenis"
},
"india": {
	flag: colorsDown("#FF6821","#FFFFFF","#036A38"),
	color: "#FF6821",
	dem: "indian",
	dems: "indians"
},
"bharat": "=india",
"nigeria": {
	flag: flagColors("#008650","#ffffff","#008650"),
	color: "#008650",
	dem: "nigerian",
	dems: "nigerians"
},
"belgium": {
	flag: flagColors("#000000","#FBE043","#ED2938"),
	color: "#FBE043",
	dem: "belgian",
	dems: "belgians"
},
"chad": {
	flag: flagColors("#012665","#FFCB02","#C70E30"),
	color: "#C70E30",
	dem: "chadian",
	dems: "chadians"
},
"ireland": {
	flag: flagColors("#02A64D","#F7F7F7","#EF7E1F"),
	color: "#EF7E1F",
	dem: "irishman",
	dems: "irishmen",
	adj: "irish"
},
"guinea": {
	flag: flagColors("#CD1226","#FCD215","#049460"),
	color: "#EF7E1F",
	dem: "guinean",
	dems: "guineans"
},
"italy": {
	flag: flagColors("#009347","#FFFFFF","#CF2B36"),
	color: "#CF2B36",
	dem: "italian",
	dems: "italians"
},
"greece": {
	background: "#003A9E",
	foreground: "#ffffff",
	template: "+≣≣",
	color: "#003A9E",
	dem: "greek",
	dems: "greeks"
},
"mali": {
	flag: flagColors("#16B43A","#FCD215","#CD1226"),
	color: "#FCD215",
	dem: "malian",
	dems: "malians"
},
"romania": {
	flag: flagColors("#002B7F","#FCD215","#CD1226"),
	color: "#FCD215",
	dem: "romanian",
	dems: "romanians"
},
"sweden": {
	background: "#0169A8",
	foreground: "#F9CD01",
	template: "+--",
	color: "#0169A8",
	dem: "swede",
	dems: "swedes",
	adj: "swedish"
},
"norway": {
	background: "#DC2B19",
	foreground: "#025186",
	template: "+--",
	color: "#DC2B19",
	dem: "norwegian",
	dems: "norwegians"
},
"finland": {
	background: "#FFFFFF",
	foreground: "#003499",
	template: "+--",
	color: "#003499",
	dem: "finn",
	dems: "finns",
	adj: "finnish"
},
"iceland": {
	background: "#003897",
	foreground: "#D72729",
	template: "+--",
	color: "#FFFFFF",
	dem: "icelander",
	dems: "icelanders",
	adj: "icelandic"
},
"georgia": {
	background: "#FFFFFF",
	foreground: "#FE1512",
	template: "÷+÷",
	color: "#FE1512",
	dem: "georgian",
	dems: "georgians"
},
"pakistan": {
	background: "#01411C",
	foreground: "#FFFFFF",
	template: "▌(☼",
	color: "#01411C",
	dem: "pakistani",
	dems: "pakistanis"
},
"bangladesh": {
	background: "#006A4E",
	foreground: "#F32A40",
	template: "●  ",
	color: "#006A4E",
	dem: "bangladeshi",
	dems: "bangladeshis",
	adj: "bengali"
},
"brazil": {
	background: "#199747",
	foreground: "#FFCD1C",
	template: " ● ",
	color: "#FFCD1C",
	dem: "brazilian",
	dems: "brazilians"
},
"australia": {
	flag: "{{color:▀|#E51732|#08296E}}{{color:☼☼|#FFFFFF|#08296E}}",
	color: "#FECF1A",
	dem: "australian",
	dems: "australians"
},
"newzealand": {
	flag: "{{color:▀|#E51732|#08296E}}{{color: ☼|#CA1E35|#08296E}}",
	color: "#08296E",
	dem: "new zealander",
	dems: "new zealanders",
	adj: "kiwi"
},
"zealand": "=newzealand",
"nz": "=newzealand",
"niue": {
	flag: "{{color:▀|#E51732|#FFE500}}{{color:  |#FFFFFF|#FFE500}}",
	color: "#FECF1A",
	dem: "niuean",
	dems: "niueans"
},
"iran": {
	flag: colorsDownSymbol(" ₩ ", "#DC1510",  "#30A247", "#FFFFFF", "#DC1510"),
	color: "#01411C",
	dem: "iranian",
	dems: "iranians",
	adj: "persian"
},
"persia": "=iran",
"persianempire": "=iran",
"palestine": {
	flag: colorsDownSymbol("⏵  ", "#EE373F",  "#080808", "#FFFFFF", "#199940"),
	color: "#EE373F",
	dem: "palestinian",
	dems: "palestinians"
},
"israel": {
	flag: colorsDownSymbol(" · ", "#053FBA",  "#FFFFFF", "#053FBA","#053FBA", "#FFFFFF","#FFFFFF", "#053FBA","#053FBA", "#FFFFFF"),
	color: "#053FBA",
	dem: "israeli",
	dems: "israelis"
},
"idf": "=israel",
"nazi": { end: true },
"nazigermany": "=nazi",
"nazis": "=nazi",
"thirdreich": "=nazi",
"uae": {
	flag: colorsDownSymbol("▌  ", "#C1112C",  "#00803B", "#FFFFFF", "#080808"),
	color: "#C1112C",
	dem: "emirati",
	dems: "emiratis"
},
"unitedarabemirates": "=uae",
"unitedarabemirate": "=uae",
"emirates": "=uae",
"arabemirates": "=uae",
"indonesia": {
	flag: colorsDown("#FF1611","#FFFFFF"),
	color: "#FF1611",
	dem: "indonesian",
	dems: "indonesians"
},
"austria": {
	flag: colorsDown("#CA1E35","#FFFFFF","#CA1E35"),
	color: "#CA1E35",
	dem: "austrian",
	dems: "austrians"
},
"habsburg": {
	flag: colorsDown("#000000","#FFCC00"),
	color: "#FFCC00",
	dem: "habsburgian",
	dems: "habsburgians"
},
"habsburgmonarchy": "=habsburg",
"spain": {
	flag: colorsDownSymbol("Ā  ","#B02022","#B02022","#FABF19","#B02022"),
	color: "#FABF19",
	dem: "spaniard",
	dems: "spaniards",
	adj: "spanish"
},
"espana": "=spain",
"españa": "=spain",
"philippines": {
	flag: colorsDownSymbol("▶  ", "#F7F7F7",  "#0036A3","#C81325"),
	color: "#C81325",
	dem: "filipino",
	dems: "filipinos",
	adj: "philippine"
},
"philippine": "=philippines",
"ethiopia": {
	flag: colorsDownSymbol(" ● ", "#184DB2",  "#1A8D37","#FCDE22","#DC1F24"),
	color: "#FCDE22",
	dem: "ethiopian",
	dems: "ethiopians"
},
"egypt": {
	flag: colorsDownSymbol(" Ϯ ", "#C29714",  "#D01F2E","#FFFFFF","#080808"),
	color: "#FCDD39",
	dem: "egyptian",
	dems: "egyptians"
},
"singapore": {
	flag: colorsDownSymbol("‟  ", "#FFFFFF",  "#EE313F","#FFFFFF"),
	color: "#EE313F",
	dem: "singaporean",
	dems: "singaporeans"
},
"northkorea": {
	flag: colorsDownSymbol("☼  ", "#FFFFFF",  "#0F53A5","#ED282C","#0F53A5"),
	color: "#ED282C",
	dem: "korean",
	dems: "koreans",
	gov: "dictatorship"
},
"dprk": "=northkorea",
"angola": {
	flag: colorsDownSymbol(" גּ ", "#FFCD1C",  "#CE1A36","#080808"),
	color: "#CE1A36",
	dem: "angolan",
	dems: "angolans"
},
"argentina": {
	flag: colorsDownSymbol(" ☼ ", "#F6B40D",  "#74ACDF","#FFFFFF","#74ACDF"),
	color: "#74ACDF",
	dem: "argentinian",
	dems: "argentinians",
	adj: "argentine"
},
"azerbaijan": {
	flag: colorsDownSymbol(" c ", "#FFFFFF",  "#1EB7E3","#F03C47","#56A037"),
	color: "#F03C47",
	dem: "azerbaijani",
	dems: "azerbaijanis"
},
"ohio": {
	flag: colorsDownSymbol("⏵  ", "#011B57",  "#B90B2F","#FFFFFF","#B90B2F","#FFFFFF","#B90B2F"),
	color: "#011B57",
	dem: "ohioan",
	dems: "ohioans"
},
"onlyinohio": "=ohio",
"canada": {
	flag: `{{color: |unset|#CF2A1E}}{{color:ǃ|#CF2A1E|#F7F7F7}}{{color: |unset|#CF2A1E}}`,
	color: "#CF2A1E",
	dem: "canadian",
	dems: "canadians"
},
"unitednations": {
	background: "#17A1DC",
	foreground: "#FFFFFF",
	template: " ● ",
	color: "#17A1DC",
	dem: "earthling",
	dems: "earthlings",
	adj: "united"
},
"un": "=unitednations",
"glaggleland": {
	background: "#FFFFFF",
	foreground: "#EDFB1F",
	template: " $ ",
	emblem: "☻",
	color: "#EDFB1F",
	dem: "glaggle",
	dems: "glaggles"
},
"glagworld": "glaggleland",
"andorra": {
	flag: flagColors("#0F069A","#F6D606","#CE0230"),
	color: "#0F069A",
	dem: "andorran",
	dems: "andorrans"
},
"afghanistan": {
	flag: `{{color: |unset|#080808}}{{color:◦|#FFFFFF|#D52A1D}}{{color: |unset|#127E3D}}`,
	color: "#D52A1D",
	dem: "afghan",
	dems: "afghans"
},
"vatican": {
	flag: `{{color: |unset|#FFF21D}}{{color:x|#A71011|#FFFFFF}}`,
	color: "#FFF21D",
	dem: "vatican",
	dems: "vaticans",
	adj: "holy"
},
"holysee": "=vatican",
"vaticancity": "=vatican",
"thevatican": "=vatican",
"vaticano": "=vatican",
"cuba": {
	flag: colorsDownSymbol("⏵  ", "#CD221F",  "#063293", "#FFFFFF", "#063293", "#FFFFFF", "#063293"),
	color: "#CD221F",
	dem: "cuban",
	dems: "cubans"
},





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