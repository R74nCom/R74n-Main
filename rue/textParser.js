textParserSubcommands = {
    c: {
        func: function(args) {
            if (args.length === 0) {return ""}
            return args[Math.floor(Math.random()*args.length)];
        }
    },
    wc: {
        // choose argument with weight, top argument is most likely, weight decreases by 1 for each argument
        func: function(args) {
            if (args.length === 0) {return ""}
            var total = 0;
            for (var i = 0; i < args.length; i++) {
                total += args.length-i;
            }
            var choice = Math.floor(Math.random()*total);
            var count = 0;
            for (var i = 0; i < args.length; i++) {
                count += args.length-i;
                if (choice < count) {return args[i]}
            }
            return "";
        }
    },
    sc: {
        func: function(args) {
            if (args.length === 0) {return ""}
            if (args.length === 1) {return "[???]"}
            var choices = args.slice(1);
            return choices[Math.floor(seedRandom(args[0])*choices.length)];
        }
    },
    rng: {
        func: function() {
            return Math.floor(Math.random()*10);
        }  
    },
    randchar: {
        func: function() {
            // random character including numbers and symbols
            return chooseItem([..."abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*"]);
        }
    },
    cc: { // choose character
        func: function(args) {
            if (args.length === 0) {return ""}
            return chooseItem([...args.join("")]);
        }
    },
    today: {
        func: function() {
            return today();
        }
    },
    hour: {
        func: function() {
            var today = new Date();
            today.setMinutes(0,0,0);
            return today.getTime();
        }
    },
    link: { // {{link:url|text}}
        func: function(args) {
            if (args.length === 0) {return "[???]"}
            if (args[0].indexOf("javascript:") !== -1) {args[0] = ""}
            return "<a href='"+args[0]+"'>"+(args[1] || args[0])+"</a>";
        }
    },
    i: { // italics {{i:text}}
        func: function(args) { return "<em>"+(args[0]||"")+"</em>"; }
    },
    b: { // bold {{b:text}}
        func: function(args) { return "<strong>"+(args[0]||"")+"</strong>"; }
    },
    sup: { // superscript {{sup:text}}
        func: function(args) { return "<sup>"+(args[0]||"")+"</sup>"; }
    },
    sub: { // subscript {{sub:text}}
        func: function(args) { return "<sub>"+(args[0]||"")+"</sub>"; }
    },
    ul: { // underline {{ul:text}}
        func: function(args) { return "<span style='text-decoration:underline'>"+(args[0]||"")+"</span>"; }
    },
    strike: { // strikethrough {{strike:text}}
        func: function(args) { return "<span style='text-decoration:line-through'>"+(args[0]||"")+"</span>"; }
    },
    small: { // small {{small:text}}
        func: function(args) { return "<small>"+(args[0]||"")+"</small>"; }
    },
    big: { // big {{big:text}}
        func: function(args) { return "<span style='font-size:1.5em'>"+(args[0]||"")+"</span>"; }
    },
    code: { // code {{code:text}}
        func: function(args) { return "<code>"+(args[0]||"")+"</code>"; }
    },
    spoiler: { // spoiler {{spoiler:text}}
        func: function(args) { return "<span style='padding:5px;padding-left:10px;padding-right:10px;background-color:black;border-radius:50px;cursor:pointer' onclick='this.style=null;this.innerHTML=this.getAttribute(\"data-text\")' data-text='"+(args[0]||"").replaceAll("'","’")+"'>"+(args[1]||"Spoiler..")+"</span>"; }
    },
    red: { func: function(args) { return "<span style='color:#ff3636'>"+(args[0]||"")+"</span>"; } },
    orange: { func: function(args) { return "<span style='color:orange'>"+(args[0]||"")+"</span>"; } },
    yellow: { func: function(args) { return "<span style='color:yellow'>"+(args[0]||"")+"</span>"; } },
    green: { func: function(args) { return "<span style='color:#00a500'>"+(args[0]||"")+"</span>"; } },
    lime: { func: function(args) { return "<span style='color:lime'>"+(args[0]||"")+"</span>"; } },
    cyan: { func: function(args) { return "<span style='color:#00ffff'>"+(args[0]||"")+"</span>"; } },
    blue: { func: function(args) { return "<span style='color:#0000d7'>"+(args[0]||"")+"</span>"; } },
    purple: { func: function(args) { return "<span style='color:#7e007e'>"+(args[0]||"")+"</span>"; } },
    magenta: { func: function(args) { return "<span style='color:#ff00ff'>"+(args[0]||"")+"</span>"; } },
    pink: { func: function(args) { return "<span style='color:#ffa9ff'>"+(args[0]||"")+"</span>"; } },
    black: { func: function(args) { return "<span style='color:black'>"+(args[0]||"")+"</span>"; } },
    white: { func: function(args) { return "<span style='color:white'>"+(args[0]||"")+"</span>"; } },
    gray: { func: function(args) { return "<span style='color:#b4b4b4'>"+(args[0]||"")+"</span>"; } },
    brown: { func: function(args) { return "<span style='color:#b98226'>"+(args[0]||"")+"</span>"; } },
    invis: { func: function(args) { return "<span style='color:rgba(0,0,0,0)'>"+(args[0]||"")+"</span>"; } },
    highlight: { // highlight {{highlight:text}}
        func: function(args) { return "<span style='background-color:yellow;color:black'>"+(args[0]||"")+"</span>"; }
    },
    quote: { // quote {{quote:text}}
        func: function(args) { return "<span style='margin-left:1em;margin-top:5px;margin-bottom:5px;padding-left:5px;display:block;border-left:solid #858585 2px'>"+(args[0]||"")+"</span>"; }
    },
    color: { // color {{color:text|color}}
        func: function(args) {
            if (args.length === 0) {return ""}
            if (args.length === 1) {return args[0]}
            return "<span style='color:"+args[1]+"'>"+args[0]+"</span>";
        }
    },
    bg: { // background {{bg:text|color}}
        func: function(args) {
            if (args.length === 0) {return ""}
            if (args.length === 1) {return args[0]}
            return "<span style='background-color:"+args[1]+"'>"+args[0]+"</span>";
        }
    },
    header: {
        func: function(args) {
            if (args.length === 0) {return ""}
            return "<span style='display:block;font-size:1.75em'>"+args[0]+"</span>";
        }
    },
    emote: {
        func: function(args) {
            if (args.length === 0) {return ""}
            return "<img style='display:inline-block;height:1.5em;width:auto;vertical-align:middle' src='"+args[0]+"'>";
        }
    },
    bul: {text:`"•"`},
    unchk: {text:`"☐"`},
    chk: {text:`"☑"`},
    xchk: {text:`"☒"`},
    moji: {text:`"{{emote:https://r74n.com/moji/png/"+args[0]+".png}}"`},
    bi: {text:`"{{b:{{i:"+args[0]+"}}}}"`},
    ib: {text:`"{{i:{{b:"+args[0]+"}}}}"`},
    comment: {text:`""`},
    redact: {text:`"{{bg:{{color:"+args[0]+"|black}}|black}}"`},
    lower: { func: function(args) { return (args[0]||"").toLowerCase(); } },
    upper: { func: function(args) { return (args[0]||"").toUpperCase(); } },
    title: {
        func: function(args) {
            var text = args[0]||"";
            return text.toTitleCase();
        }
    },
    act: {text:`"{{i:*"+args[0]+"*}}"`},
    qbf: {text:`"The quick brown fox jumps over the lazy dog."`},
}
// textviewer parser
function splitOnce(text,delim) {
    var parts = text.split(delim);
    var part1 = parts[0];
    var part2 = parts.slice(1).join(delim);
    return [part1,part2]
}
function parseText(text) {
    var tries = 0;
    var count = 0;
    while (text.indexOf("{{") !== -1) {
        var newtext = text;
        var parts = text.split("{{");
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (part == "") { continue }
            if (part.indexOf("}}") === -1) {
                continue;
            }
            var whole = splitOnce(part,"}}")[0];
            if (whole.indexOf(":") !== -1) {
                var wholesplit = splitOnce(whole,":");
                var command = wholesplit[0];
                var args = wholesplit[1].split("|");
            }
            else {
                var wholesplit = whole.split("|");
                var command = wholesplit[0];
                var args = wholesplit.slice(1);
            }
            var result = null;
            command = command.toLowerCase();
            if (!textParserSubcommands[command] || args.length < textParserSubcommands[command].minArgs) {
                result = "[???]"
            }
            else if (textParserSubcommands[command].func) { result = textParserSubcommands[command].func(args); }
            else { result = eval(textParserSubcommands[command].text); }
            newtext = newtext.replace("{{"+whole+"}}",result);
            count++;
            if (count > 1000) { newtext = newtext.split("{{")[0]; break }
        }
        tries++;
        if (tries > 50 || (text.length===newtext.length && text===newtext)) {text = newtext;break}
        text = newtext;
    }
    return text
}