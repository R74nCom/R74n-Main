function textResolution(text) {
    var outElem = document.getElementById("resolveOutput");
    if (!outElem) { alert(text); return text; }
    outElem.innerHTML = text.replace(/\n/g, "<br/>");
    outElem.style.display = "block";
    return text;
}
function linkResolution(url,auto) {
    // redirect to the URL
    textResolution("Redirecting to "+url+"...");
    if (auto) { window.location.replace(url); }
    else { window.location.href = url }
    return url;
}
function fromPlanecode(code) {
    try {
        code = code.match(/R[0-9a-f]{5}/gi)[0].substring(1);
    }
    catch (e) {}
    var shortcode = parseInt(code,16).toString(16).toUpperCase();
    var value = multiplaneEntities[shortcode];
    if (value.indexOf("//") === -1) { return value }
    return value.split("//").slice(1).join("//");
}

urnResolvers = {
"main": (args) => {
    return "https://R74n.com/"+args.join("/");
},
"sandboxels": (args) => {
    if (args[0] === "mod") { return "https://sandboxels.R74n.com/mods/"+args[1]; }
    if (args[0] === "mods") { return "https://sandboxels.R74n.com/mod-list"; }
    if (args[0] === "v") { return "https://sandboxels.R74n.com/changelog#"+args[1]; }
    if (args[0] === "element" && args[1]) {
        return "https://data.r74n.com/query/embed.html#PREFIX%20p%3A%20%3Chttps%3A%2F%2Fdata.r74n.com%2Fprop%2F%3E%0APREFIX%20ps%3A%20%3Chttps%3A%2F%2Fdata.r74n.com%2Fprop%2Fstatement%2F%3E%0APREFIX%20wd%3A%20%3Chttps%3A%2F%2Fdata.r74n.com%2Fentity%2F%3E%0Aprefix%20wdt%3A%20%3Chttps%3A%2F%2Fdata.r74n.com%2Fprop%2Fdirect%2F%3E%0ASELECT%20%3Fitem%20%3FitemLabel%20WHERE%20%7B%0A%20%20%20%20%3Fitem%20p%3AP1%20%3Fstatement0.%0A%20%20%20%20%3Fstatement0%20%28ps%3AP1%2F%28wdt%3AP2%2a%29%29%20wd%3AQ59.%0A%20%20%20%20%3Fitem%20wdt%3AP26%20%27"+args[1]+"%27.%0A%20%20%20%20SERVICE%20wikibase%3Alabel%20%7B%20bd%3AserviceParam%20wikibase%3Alanguage%20%22%5BAUTO_LANGUAGE%5D%2Cen%22.%20%7D%0A%7D%0ALIMIT%201";
    }
    return "https://sandboxels.R74n.com/"+args.join("/");
},
"multiplane": (args) => {
    if (args[0]) {
        var arg = decodeURIComponent(args[0]);
        if (arg.match(/^(\(.+\))?R[0-9a-f]+$/i)) { return "https://R74n.com/multiplane/?code="+arg; }
        if (arg.match(/\+R/i)) { return "https://R74n.com/multiplane/?union="+arg; }
        if (arg.match(/-R/i)) { return "https://R74n.com/multiplane/?plane="+arg; }
        if (args[0] === "search" && args[1]) { return "https://R74n.com/multiplane/?search="+args[1]; }
        if (arg.match(/^(table|planes|unions|search)$/i)) { return "https://R74n.com/multiplane/?"+arg.toLowerCase(); }
        if (args[0] === "docs") { return "https://R74n.com/multiplane/concept.txt"; }
    }
    return "https://R74n.com/multiplane/"+args.join("/");
},
"moji": (args) => {
    if (args[0]) {
        if (args[0] === "all") { return "https://R74n.com/moji/all"; }
        if (args[0] === "docs") { return "https://R74n.com/moji/docs"; }
        if (args[0].match(/\.png$/)) { return "https://R74n.com/moji/png/"+args[0]; }
        if (args[0]) { return "https://R74n.com/moji/view?"+args[0]; }
    }
    return "https://R74n.com/moji/";
},
"pixelflags": (args) => {
    if (args.length === 2) {
        return "https://R74n.com/pixelflags/png/"+args[0]+"/"+args[1]+".png";
    }
    return "https://R74n.com/pixelflags/"+args.join("/");
},
"wikibase": (args) => {
    if (args[0] === "entity") {
        if (!args[1]) { return "https://data.R74n.com/" }
        return "https://data.R74n.com/entity/"+args[1];
    }
    if (args[0] === "user" || args[0] === "User") { return "https://data.R74n.com/wiki/User:"+args[1]; }
    if (args[0] === "query") { return "https://data.R74n.com/query/embed.html#"+args[1]; }
    if (args[0] === "pageid") { return "https://data.r74n.com/w/index.php?curid="+args[1]; }
    if (args[0] === "revision") { return "https://data.r74n.com/w/index.php?oldid="+args[1]; }
    if (args[0] === "userid") { return "https://data.r74n.com/wiki/Special:Redirect/user/"+args[1]; }
    if (args[0] === "log") { return "https://data.r74n.com/w/index.php?title=Special%3ALog&logid="+args[1]; }
    if (args[0] === "watchlist") { return "https://data.R74n.com/wiki/Special:Watchlist"; }
    if (args[0] === "recent") { return "https://data.R74n.com/wiki/Special:RecentChanges"; }
    return "https://data.R74n.com/wiki/"+args.join("/");
},
"cpd": (args) => {
    if (args[0] === "converter" && args[1]) {
        return "https://c.R74n.com/converter/"+args[1]+"?text="+(args[2]||"");
    }
    if (args[0] === "fonts") { return "https://c.R74n.com/fonts?text="+(args[1]||""); }
    if (args[0] === "search") { return "https://c.R74n.com/search?q="+(args[1]||""); }
    return "https://c.R74n.com/"+args.join("/");
},
"csearch": (args) => {
    return "urn:X-R74n:cpd:search:"+(args[0]||"");
},
"converters": (args) => {
    return "urn:X-R74n:cpd:converter:"+args.join(":");
},
"fonts": (args) => {
    return "urn:X-R74n:cpd:fonts:"+args.join(":");
},
"link": (args) => {
    return "https://link.R74n.com/"+args.join("/");
},
"ufbs": (args) => {
    if (args[0]) {
        if (!args[1] || args[1] === "q") { return "urn:X-R74n:link:"+args[0]+"-feedback"; }
        var ufbs = {
            "sandboxels":"R0A2A1","cpd":"R0A2A2","main":"R0A2A3","hello":"R0A2A4","convert":"R0A2A5","moji":"R0A2A6","words":"R0A2A7","unisearch":"R0A2A8","mix":"R0A2A9","pixelflags":"R0A2AA","icons":"R0A2AB","icons":"R0A2AE"
        }
        var link = fromPlanecode(ufbs[args[0]]);
        if (!link) { return "urn:X-R74n:link:ufbs-"+args[0]; }
        if (args[2]) {
            if (link.indexOf("#") === -1) { link += "#" }
            else { link += "&" }
            link += "range=A"+args[2];
        }
        return link;
    }
    return "https://R74n.com/ufbs/"+args.join("/");
},
"commons": (args) => {
    var commons = {
        "gdocs":"R0A110","gcal":"R0A111","gsheets":"R0A112","gslides":"R0A113","gearth":"R0A114","gforms":"R0A115","appt":"R0A116","gclassroom":"R0A117","ggroups":"R0A118","gjamboard":"R0A119","mforms":"R0A130","mtodo":"R0A131","mlists":"R0A132"
    }
    if (commons[args[0]]) {
        return fromPlanecode(commons[args[0]]);
    }
    return "https://R74n.com/commons/"+args.join("/");
},
"ants": (args) => {
    if (args[0] === "ant" && args[1]) { return "https://R74n.com/ants/?ant="+args[1]; }
    if (args[0] === "funerals") { return "https://R74n.com/ants/?funerals"; }
    if (args[0] === "challenges") { return "https://R74n.com/ants/?challenges"; }
    return "https://R74n.com/ants/"+args.join("/");
},
"rue": (args) => {
    if (args[0] === "ask") { return "https://R74n.com/rue/?rue="+(args[1]||"focus"); }
    if (args[0] === "focus") { return "https://R74n.com/rue/?rue=focus"; }
    return "https://R74n.com/rue/"+args.join("/");
},
"textviewer": (args) => {
    if (args[0] === "docs") { return "https://R74n.com/textviewer/docs"; }
    return "https://R74n.com/textviewer/?"+(args.join(":")||"");
},
"convert": (args) => {
    //https://r74n.com/convert/?length/5/inch/centimeter
    var url = "https://R74n.com/convert/?";
    if (args[0]) { url += args[0]; }
    if (args[1]) { url += "/"+args[1]; }
    if (args[2]) { url += "/"+args[2]; }
    if (args[3]) { url += "/"+args[3]; }
    return url;
},
"copy": (args) => {return "https://copy.R74n.com/"+args.join("/");},
// "eod": (args) => {return "urn:X-R74n:discord:eod:"+args.join(":");},
"halacae": (args) => {
    if (args[0] === "docs") { return fromPlanecode("A000"); }
    if (args[0] === "names") { return fromPlanecode("A001"); }
    if (args[0] === "numbers") { return fromPlanecode("A002"); }
    if (args[0] === "transcriptions") { return fromPlanecode("A003"); }
    if (args[0] === "view") { return "https://R74n.com/halacae/view?word="+(args[1]||"") }
    return "https://R74n.com/halacae/"+args.join("/");
},
"hello": (args) => {return "https://R74n.com/hello/"+args.join("/");},
"icons": (args) => {return "https://R74n.com/icons/"+args.join("/");},
"lore": (args) => {
    if (args[0] === "old") { return "https://R74n.com/lore/old"; }
    if (args[0] === "new") { return "https://R74n.com/lore/"; }
    if (args[0]) { return "https://R74n.com/lore/"+args.join("/"); }
    return "https://R74n.com/lore/old";
},
"meta": (args) => {
    return "https://R74n.com/meta/"+args.join("/");
},
"community": (args) => {
    return "https://R74n.com/community/"+args.join("/");
},
"mc": (args) => {return "https://R74n.com/mc/"+args.join("/");},
"mix": (args) => {return "https://R74n.com/mix/"+args.join("/");},
"octopi": (args) => {return "https://R74n.com/octopi";},
"old": (args) => {return "https://R74n.com/old/"+args.join("/");},
"sbwiki": (args) => {
    if (args[0] === "user" || args[0] === "User") { return "https://sandboxels.wiki.gg/wiki/User:"+args[1]; }
    return "https://sandboxels.wiki.gg/wiki/"+args.join("/");
},
// "eodwiki": (args) => {
//     if (args[0] === "user" || args[0] === "User") { return "https://elemental-on-discord.fandom.com/wiki/User:"+args[1]; }
//     return "https://elemental-on-discord.fandom.com/wiki/"+args.join("/");
// },
"search": (args) => {return "https://R74n.com/search/?q="+(args[0]||"");},
"sequence": (args) => {return "https://R74n.com/sequence/?"+(args[0]||"");},
"share": (args) => {return "https://R74n.com/share/"+args.join("/");},
"sml": (args) => {return "urn:X-R74n:gh:R74nCom:o:Social-Media-Lists:"+args.join(":");},
"social": (args) => {return "https://R74n.com/social/"+args.join("/");},
"supporters": (args) => {return "https://R74n.com/supporters/"+args.join("/");},
"translate": (args) => {return "https://R74n.com/translate/"+args.join("/");},
"unisearch": (args) => {return "https://R74n.com/unisearch/?"+(args[0]||"");},
"words": (args) => {return "https://R74n.com/words/"+args.join("/");},
"capitalize": (args) => {return "https://R74n.com/lore/old#Capitalize";},
"pogchamps": (args) => {return "https://R74n.com/PogChamp/"+args.join("/");},
"id": (args) => {
    if (args[0] === "request") { return "R0A230"; }
    if (args[0] === "why") { return "https://R74n.com/id/why"; }
    if (args[0] === "resolver") { return "https://R74n.com/id/"; }
    return "https://R74n.com/id/?"+(args[0]||"");
},
"projects": (args) => {return "urn:main";},
"alpha": (args) => {
    if (args[0]) { return args[0]; }
    return "https://R74n.com/id/alpha";
},
"alphamul": (args) => {
    if (args[0]) { return args[0]; }
    return "https://R74n.com/id/alpha#Alpha-M";
},
"alphatwo": (args) => {
    if (args[0]) { return args[0]; }
    return "https://R74n.com/id/alpha#Alpha-2";
},
"urn": (args) => { return "https://R74n.com/id/urn"; },
"uuid": (args) => {
    if (args[0]) { return "https://R74n.com/id/?"+args[0].join("-"); }
    return "https://R74n.com/id/uuid";
},
"oid": (args) => {
    if (args[0] === "txt") { return "https://R74n.com/oid.txt"; }
    if (args[0]) { return resolveOID(args[0]); }
    return "https://R74n.com/id/oid";
},
"ark": (args) => {
    if (args[0] === "txt") { return "https://R74n.com/id/ark.txt"; }
    if (args[0]) { return resolveARK("ark:"+decodeURIComponent(args.join("/"))); }
    return "https://R74n.com/id/ark";
},
"aid": (args) => {
    if (args[0] === "txt") { return "https://R74n.com/id/aid.txt"; }
    if (args[0]) { return resolveAID(args.join("")); }
    return "https://R74n.com/id/aid";
},
"oidplus": (args) => {
    return "https://oid.R74n.com/?goto="+args.join(":");
},
"schema": (args) => {
    if (args[0]) { return "https://R74n.com/schema/"+args[0]+".json"}
    return "https://R74n.com/schema/";
},

"twt": (args) => {
    var user = args[0];
    if (args.length === 1) { return "https://twitter.com/"+user; }
    if (args[1] === "p") { return "https://twitter.com/"+user+"/status/"+args[2]; }
    if (args[1] === "l") {
        if (!args[2]) { return "https://twitter.com/"+user+"/lists"; }
        if (args[2] === "self") { return "https://twitter.com/"+user+"/lists/memberships"; }
        return "https://twitter.com/"+user+"/lists/"+args[2];
    }
},
"tiktok": (args) => {
    var user = args[0];
    if (args.length === 1) { return "https://tiktok.com/@"+user; }
    if (args[1] === "p") { return "https://tiktok.com/@"+user+"/video/"+args[2]; }
    if (args[1] === "l") { return "https://tiktok.com/@"+user+"/playlist/"+args[2]; }
},
"discord": (args) => {
    var id = args[0];
    if (args[0] === "main") {
        if (args[1] === "browse") { return "https://R74n.com/discord/browse"; }
        id = "939255181474955331"
    }
    // else if (args[0] === "eod") { id = "705084182673621033" }
    else if (args[0] === "cpd") { id = "726709356984401920" }
    else if (args[0] === "mc") { id = "762484868898488321" }
    var url = "https://discord.com/channels/"+id;
    if (args[1] === "c") {
        url += "/"+args[2];
        if (args[3]) { url += "/"+args[3]; }
        return url;
    }
    if (args[1] === "e") {url = "https://cdn.discordapp.com/emojis/"+args[3]; return url;}
    if (args[1] === "r") {return "<@&"+args[2]+">";}
    if (args[1] === "j") {return "https://discord.gg/"+args[2];}
    return url;
},
"yt": (args) => {
    var user = args[0];
    if (args.length === 1) { return "https://www.youtube.com/@"+user; }
    if (args[1] === "p") { return "https://www.youtube.com/watch?v="+args[2]; }
    if (args[1] === "l") { return "https://www.youtube.com/playlist?list="+args[2]; }
    if (args[1] === "t") { return "https://www.youtube.com/post/"+args[2]; }
},
"ig": (args) => {
    var user = args[0];
    if (args.length === 1) { return "https://www.instagram.com/"+user; }
    if (args[1] === "p") { return "https://www.instagram.com/p/"+args[2]; }
    if (args[1] === "s") { return "https://www.instagram.com/stories/"+user+"/"+args[2]; }
    if (args[1] === "h") { return "https://www.instagram.com/stories/highlights/"+args[2]; }
},
"pin": (args) => {
    var user = args[0];
    if (args.length === 1) { return "https://www.pinterest.com/"+user; }
    if (args[1] === "p") { return "https://www.pinterest.com/pin/"+args[2]; }
    if (args[1] === "l") { return "https://www.pinterest.com/"+user+"/"+args[2]; }
},
"imgur": (args) => {
    var user = args[0];
    if (args.length === 1) { return "https://imgur.com/user/"+user+"/posts"; }
    if (args[1] === "i") { return "https://i.imgur.com/"+args[2]+".png"; }
},
"gh": (args) => {
    var user = args[0];
    if (args.length === 1) { return "https://github.com/"+user; }
    if (args[1] === "o") {
        if (!args[2]) { return "https://github.com/orgs/"+user+"/repositories"; }
        var repo = "https://github.com/"+user+"/"+args[2];
        if (args[3] === "pr") { return repo+"/pull/"+(args[4]||""); }
        if (args[3] === "issue") { return repo+"/issues"+(args[4]||""); }
        if (args[3] === "wiki") { return repo+"/wiki/"+args.slice(4).join("/"); }
        if (args[3] === "commit") { return repo+"/commit/"+args.slice(4).join("/"); }
        var raw = args[args.length-1] === "raw";
        if (raw) {
            args.pop();
        }
        return repo+"/"+(raw ? "raw" : "tree")+"/main/"+args.slice(3).join("/");
    }
},
"email": (args) => {
    return "mailto:"+(args[0]||"contact")+"@R74n.com";
},
"reddit": (args) => {
    if (args[0] === "g") {
        if (args[2] === "w") { return "https://www.reddit.com/r/"+args[1]+"/wiki/"+args[3]; }
        if (args[2] === "p") { return "https://www.reddit.com/r/"+args[1]+"/comments/"+args[3]; }
        return "https://www.reddit.com/r/"+args[1];
    }
    if (args[0] === "u") {
        if (args[2] === "l") { return "https://www.reddit.com/user/"+args[1]+"/m/"+args[3]; }
        return "https://www.reddit.com/user/"+args[1];
    }
},

"shapes": (args) => {
    if (args[0]) {
        if (args[0].match(/\.png$/)) { return "https://R74n.com/shapes/png/"+args[0]; }
        if (args[0] === "category") { return "https://R74n.com/shapes/#"+args[1]; }
        if (args[0]) { return "https://R74n.com/shapes#"+args[0]; }
    }
    return "https://R74n.com/shapes/";
},
"cook": (args) => {
    if (args[0] === "changelog") { return "https://R74n.com/cook/changelog.txt"; }
    return "https://R74n.com/cook/"+args.join("/");
},
"gentown": (args) => {
    if (args[0] === "changelog") { return "https://R74n.com/gentown/changelog.txt"; }
    return "https://R74n.com/gentown/"+args.join("/");
},
}
function resolveURN(urn) {
    var parts = urn.split(":");
    parts = parts.filter((x) => x);
    parts = parts.map((x) => encodeURIComponent(x));
    if (parts.length <= 1) { return false; }
    var namespace = parts[1];
    if (namespace.match(/^(X-)?R74n$/i)) { namespace = "X-R74n"; }
    if (urnResolvers[namespace]) {
        namespace = "X-R74n";
        parts.unshift(namespace);
    }
    if (namespace !== "X-R74n") { return false }
    if (parts.length <= 2) { return "https://R74n.com/" }
    var mainPart = parts[2];
    var args = parts.slice(3);
    // console.log(mainPart+"("+args.join(",")+")");
    if (urnResolvers[mainPart]) {
        try {
            var r = urnResolvers[mainPart](args);
            if (r && r.indexOf("undefined") !== -1) { throw "undefined" }
            return r;
        }
        catch (e) {
            console.log("Resolution Error: "+e)
            return false;
        }
    }
    return false;
}
function resolvePlanecode(decimal) {
    var hex = decimal.toString(16).toUpperCase();
    var hexFormatted = "R"+hex.padStart(5,"0");
    if (hexFormatted.match(/^R30[0-9A-F]{3}$/g)) { // Requested
        return findRequested("multiplane",hexFormatted);
    }
    var value = multiplaneEntities[hex];
    if (!value || value.indexOf("//") === -1) { return "https://R74n.com/multiplane?code="+hexFormatted }
    return value.split("//").slice(1).join("//");
}
function resolveOID(oid) {
    if (!oid.startsWith("1.3.6.1.4.1.61117")) { return "https://oid.R74n.com/?goto=oid%3A"+oid }
    oidRel = oid.split("1.3.6.1.4.1.")[1];
    var parts = oidRel.split(".");
    if (parts.length === 1) { return "https://R74n.com/id/oid" }
    parts = parts.map((x) => parseInt(x));
    if (parts[1] === 1) { // Multiplane
        if (parts[2] === undefined) { return "https://R74n.com/multiplane/" }
        return resolvePlanecode(parts[2]);
    }
    if (parts[1] === 3) { // Wikibase
        if (parts[2] === undefined) { return "https://data.R74n.com/" }
        return "https://data.R74n.com/entity/Q"+parts[2];
    }
    if (parts[1] === 9) { // Multiplane unions
        if (parts[2] === undefined) { return "https://R74n.com/multiplane/?unions" }
        return "#"+parts.slice(2).join("+#")
    }
    if (parts[1] === 10) { // Multiplane ranges
        if (parts[2] === undefined) { return "https://R74n.com/multiplane/?planes" }
        if (parts[3] === undefined) { parts.push(parts[2]) }
        return "#"+parts.slice(2).join("-#")
    }
    if (parts[1] === 11) { // Wikibase properties
        if (parts[2] === undefined) { return "https://data.R74n.com/wiki/Special:ListProperties" }
        return "https://data.R74n.com/entity/P"+parts[2];
    }
    if (parts[1] === 12) { // Wikibase lexemes
        if (parts[2] === undefined) { return "https://data.R74n.com/wiki/Special:AllPages/Lexeme:" }
        return "https://data.R74n.com/entity/L"+parts[2];
    }
    if (parts[1] === 13) { // Wikibase entity schemas
        if (parts[2] === undefined) { return "https://data.R74n.com/wiki/Special:AllPages/EntitySchema:" }
        return "https://data.R74n.com/wiki/EntitySchema:E"+parts[2];
    }
    if (parts[1] === 9000) { // Requested
        return findRequested("oid",oid)
    }
    return "https://oid.R74n.com/?goto=oid%3A"+oid;
}
function resolveARK(ark) {
    ark = ark.replace(/^\/|\/$|-/g,""); // trim slashes, remove dashes
    var form = ark.split(".").slice(1).join(".");
    var ark = ark.split(".")[0];
    var parts = ark.split(/ark:\/?/i)[1].split("/");
    if (parts.length === 0) { return "https://R74n.com/id/ark" }
    if (parts[0] !== "49595") { return "https://n2t.net/"+ark }
    if (parts[1] === undefined) { return "https://R74n.com/" }
    var prefix = parts[1].substring(0,2);
    var id = parts[1].substring(2);
    if (prefix === "mp") { return id; }
    if (prefix === "wb") { return "urn:wikibase:entity:"+(id||"") }
    if (prefix === "am") { return "urn:alphamul:"+(id||"") }
    if (prefix === "at") { return "urn:alphatwo:"+(id||"") }
    if (prefix === "rq") {
        if (!ark.startsWith("ark:/")) { ark = "ark:/"+ark.split("ark:")[1]; }
        return findRequested("ark",ark);
    }
}
function resolveAID(aid) {
    var r = null;
    aid = aid.replace(/ /g,"").split("D276000186F117")[1];
    // split every 2 chars
    aid = aid.match(/.{1,2}/g);
    if (!aid[2]) { r = "https://R74n.com/" }
    else if (aid[2] === "00") {
        if (!aid[3] || !aid[4]) { r = "urn:alphatwo" }
        else { r = String.fromCharCode(parseInt(aid[3],16)) + String.fromCharCode(parseInt(aid[4],16)); }
    }
    else if (aid[2] === "EE") { // Requested
        r = findRequested("aid","D276000186F1176FFFEE"+aid[3]);
    }
    return r;
}
let requestedIDs = null;
function requested() {
    if (requestedIDs === null) {
        requestedIDs = getJSON("https://R74n.com/id/requested.json");
    }
    return requestedIDs;
}
function findRequested(key, value) {
    var reqdata = requested();
    for (var k in reqdata) {
        if (reqdata[k][key] !== undefined && reqdata[k][key] === value) { return resolveRequested(k, value); }
    }
    return false;
}
function resolveRequested(namespace, value) {
    var data = requested()[namespace];
    if (!data) { return false; }
    if (data.resolver) {
        if (!value) { value = ""; }
        return data.resolver.replace(/\$id/g,value);
    }
    if (data.url) { return data.url; }
    if (data.multiplane) { return data.multiplane; }
    return false;
}

function detectID(id,auto) {
  var r = null;
  if (id.match(/^https?:\/\//i) && !auto) { // URL
    r = id;
  }
  else if (id.match(/^urn:/i)) { // URN
    r = resolveURN(id);
  }
  else if (id.match(/^\/?ark:\/?/i)) { // ARK
    r = resolveARK(id);
  }
  else if (id.match(/^weid:pen:.+/i)) { // WEID
    var parts = id.split(":");
    parts = parts[2].split("-");
    parts = parts.map((x) => parseInt(x,36)); // convert to base10
    parts.pop(); // remove check digit
    var oid = "1.3.6.1.4.1."+parts.join(".");
    r = resolveOID(oid);
  }
  else if (id.match(/^guid:+/i)) { // OIDplus GUID
    var guid = id.split(":")[1];
    r = "https://oid.r74n.com/?goto=guid%3A"+guid.toLowerCase();
  }
  else if (id.match(/^fourcc:+/i)) { // OIDplus FourCC
    var fourcc = id.split(":")[1];
    r = "https://oid.r74n.com/?goto=fourcc%3A"+fourcc;
  }
  else if (id.match(/^domain:+/i)) { // OIDplus Domain
    var domain = id.split(":")[1];
    r = "https://oid.r74n.com/?goto=domain%3A"+domain;
  }
  else if (id.match(/^10\..+\//i)) { // DOI
    r = "https://doi.org/"+id;
  }
  else if (id.match(/^\/?ISO\/Identified-Organization\/.+/i)) { // WEID
    // /ISO/Identified-Organization/
    var parts = id.toLowerCase().split("identified-organization/")[1].split("/");
    var oid = "1.3."+parts.join(".");
    r = resolveOID(oid);
  }
  else if (id.match(/^X-R74n:/i)) { // URN shorthand
    id = "urn:"+id;
    r = resolveURN(id);
  }
  else if (id.match(/^R74n:/i)) { // URN shorthand
    id = "urn:X-"+id;
    r = resolveURN(id);
  }
  else if (id.match(/^[\w-]+:/i)) { // URN shorthand fallback
    id = "urn:X-R74n:"+id;
    r = resolveURN(id);
  }
  else if (urnResolvers[id]) { // URN namespace-only fallback
    id = "urn:X-R74n:"+id;
    r = resolveURN(id);
  }
  else if (id.match(/^R[0-9a-f]{1,5}$/i)) { // Multiplane hex planecode
    r = resolvePlanecode(parseInt(id.substring(1),16));
  }
  else if (id.match(/^#\d{1,7}$/i)) { // Multiplane decimal planecode
    r = resolvePlanecode(parseInt(id.substring(1)));
  }
  else if (id.match(/^R[0-9a-f]{1,5}(\+R[0-9a-f]{1,5})+$/i)) { // Multiplane hex union
    var split = id.split("+");
    var first = split[0];
    var base = first.substring(0,4)+"00";
    var end = first.substring(0,4)+"FF";
    var range = base+"-"+end;
    if (multiplaneUnionResolution[range]) {
        var decimals = split.map( function(hex) {return parseInt(hex.substring(1),16)} );
        r = multiplaneUnionResolution[range](decimals);
    }
    else {
        r = "urn:X-R74n:multiplane:"+id;
    }
  }
  else if (id.match(/^#\d{1,7}(\+#\d{1,7})+$/i)) { // Multiplane decimal union
    var split = id.split("+");
    r = split.map( function(hex) {return "R"+parseInt(hex.substring(1)).toString(16).padStart(5,0).toUpperCase()} ).join("+");
  }
  else if (id.match(/^R[0-9a-f]{1,5}-R[0-9a-f]{1,5}$/i)) { // Multiplane hex range
    r = "urn:X-R74n:multiplane:"+id;
  }
  else if (id.match(/^#\d{1,7}-#\d{1,7}$/i)) { // Multiplane decimal range
    var split = id.split("-");
    r = split.map( function(hex) {return "R"+parseInt(hex.substring(1)).toString(16).padStart(5,0).toUpperCase()} ).join("-");
  }
  else if (id.match(/^[QPL]\d+$/i)) { // Wikibase entity ID
    r = "https://data.R74n.com/entity/"+id.toUpperCase();
  }
  else if (id.match(/^[QPL]\d+\$[0-9a-f\-]+$/i)) { // Wikibase statement ID
    var entityid = id.split("$")[0].toUpperCase();
    r = "https://data.R74n.com/entity/"+entityid+"#"+entityid+"$"+id.split("$")[1].toLowerCase();
  }
  else if (id.match(/^L\d+-[SF]\d+$/i)) { // Wikibase lexeme sense/form ID
    r = "https://data.R74n.com/entity/"+id.toUpperCase().replace("-","#");
  }
  else if (id.match(/^L\d+-[SF]\d+\$[0-9a-f\-]+$/i)) { // Wikibase lexeme sense/form statement ID
    var entityid = id.split("-")[0].toUpperCase();
    var subid = id.split("$")[0].toUpperCase();
    r = "https://data.R74n.com/entity/"+entityid+"#"+subid+"$"+id.split("$")[1].toLowerCase();
  }
  else if (id.match(/^[E]\d+$/i)) { // Wikibase entity schema ID
    r = "https://data.r74n.com/wiki/EntitySchema:"+id.toUpperCase();
  }
  else if (id.match(/^([0-2])((\.0)|(\.[1-9][0-9]*))*$/i)) { // OID
    r = resolveOID(id);
  }
  else if (id.match(/^61117((\.0)|(\.[1-9][0-9]*))*$/i)) { // OID shorthand
    r = resolveOID("1.3.6.1.4.1."+id);
  }
  else if (id.startsWith("{") && id.endsWith("}")) { // ASN.1 Notation
    r = resolveOID(id.match(/\(\d+\)|(?: |^)\d+|\d+(?: |$)/g).join(".").replace(/[\(\) ]/g,""))
  }
  else if (id.match(/^\.?([a-z0-9\.]+)?(R74n\.com|purl\.org\/r74n)(\/.+)?\.?$/i)) { // URL without scheme
    r = "https://"+id.replace(/^\.|\.$/g,"");
  }
  else if (id.match(/^D2 ?76 ?00 ?01 ?86 ?F1 ?17 ?6F([ 0-9a-f]+)?$/i)) { // AID
    r = resolveAID(id);
  }
  else if (id.match(/(\/)?(\w+=\w+)(\/)?/i) && id.indexOf("=us") !== -1) { // X.500DN
    // split by / and = into a dictionary
    var dn = id.split(/[\/.,]/g);
    dn = dn.filter((x) => x);
    dn = dn.map((x) => x.split("="));
    var dnObj = {};
    dn.forEach((x) => { dnObj[x[0].toUpperCase()] = x[1] });
    dn = dnObj;
    if (dn.C.toLowerCase() === "us" && (dn.O === "R74n" || dn.EEMAIL.toLowerCase() === "contact@r74n.com" || dn.DC.toLowerCase() === "r74n")) {
        if (!dn.OU) { r = "https://R74n.com/" }
        else { r = dn.OU.toLowerCase() }
    }
  }
  else if (id.match(/^'?\\\d+/i)) { // Domain Wire
    var domain = id.replace(/'/g,"").replace(/\\\d+/g,".");
    r = domain;
  }
  else if (id.match(/^[a-z]{2}$/i)) { // Alpha-2
    id = id.toLowerCase();
    var row = alphaCodes.filter((x) => x[1] === id);
    if (row.length) { r = row[0][2] }
  }
  else if (id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) { // UUID
    id = id.toLowerCase();
    var key = Object.keys(UUIDs).find(key => UUIDs[key] === id);
    if (key) { r = "urn:"+key }
    if (id === R74nUUID) { r = "urn:main" }
  }
  else if (id.match(/^CVE-\d{4,}-\d{4,7}$/i)) { // CVE
    r = "https://www.cve.org/CVERecord?id="+id.toUpperCase();
  }
  else if (id.match(/^AVD-\d{4,}-\d{4,7}$/i)) { // CVE
    r = "https://avd.aliyun.com/detail?id="+id.toUpperCase();
  }
  else if (id.match(/^GHSA(-[a-z0-9]{4}){3}$/i)) { // GHSA
    r = "https://github.com/advisories/GHSA-"+id.split(/GHSA-/i)[1].toLowerCase();
  }
  else {
    return [null,id]
  }
  return [r,id]
}

function resolveID(id,auto,mode) {
  // mode 0 = text no redirect, 1 = redirect, 2 = just return value
  id = id.trim();
  if (!id) { return mode===2 ? null : textResolution("No ID provided!"); }
  var r = detectID(id,auto);
  id = r[1];
  r = r[0];

  if (!r) {
    // if first character is "/", try resolving without it
    if (id.startsWith("/")) {
        return resolveID(id.substring(1),auto,mode);
    }
    return textResolution(mode===2 ? id : "Could not resolve ID:\n"+id);
  }
  if (typeof r === "string") {
    if (r.match(/^https?:\/\/|^mailto:|^tel:/i) && mode && mode !== 2) {
        return linkResolution(r,auto);
    }
    var r2 = detectID(r,auto);
    if (r2[0] !== null) {
        return resolveID(decodeURIComponent(r2[1]),auto,mode);
    }
    if (mode !== 2) { return textResolution(id+"\n↓\n"+r); }
  }
  return r;
}