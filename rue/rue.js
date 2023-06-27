console.log("Rue by R74n is enabled on this page.")
var loadedRue = false;
function initRue() {
console.log("Rue's loadin'..")

var rueHTML = `<div id="rueBoxIn">
  <input type="text" id="rueInput" placeholder="Explore with Rue..." title="Type in your query!" autocomplete="off"><input type="button" id="rueButton" value="&nbsp;" title="Let's go!" aria-label="Search">
</div>`
var rueParent = document.body;
if (document.getElementById("rueBox")) {
    rueParent = document.getElementById("rueBox");
}
else {
    rueHTML = '<div id="rueBox">' + rueHTML + '</div>';
}
// add html to the end of the body
rueParent.insertAdjacentHTML("beforeend", rueHTML);

// add html to the end of the head
document.head.insertAdjacentHTML("beforeend", `<style>/* Rue */
#rueBox {
  height: 3em!important; display: table-cell!important; vertical-align: middle!important; top: 10px!important; right: 0!important; position: absolute!important; padding-right: 1em!important; padding-left: 1em!important; z-index:7474!important;font-size:22px!important;font-family: Arial, Helvetica, sans-serif!important;
}
#rueBoxIn {
  position: relative!important; top: 50%!important; transform: translateY(-50%)!important;
  background: rgb(0,255,0)!important;
  background: -moz-linear-gradient(37deg, rgba(0,255,0,1) 0%, rgba(0,255,255,1) 100%)!important;
  background: -webkit-linear-gradient(37deg, rgba(0,255,0,1) 0%, rgba(0,255,255,1) 100%)!important;
  background: linear-gradient(37deg, rgba(0,255,0,1) 0%, rgba(0,255,255,1) 100%)!important;
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#00ff00",endColorstr="#00ffff",GradientType=1)!important;
  padding: 0.2em!important; border-radius: 100px!important;
  transition: all 0.5s ease!important;
}
#rueInput {
  vertical-align: middle!important; height: 25px!important; border-radius: 100px!important; border-top-right-radius: 0!important; border-bottom-right-radius: 0!important;background-color: rgb(107,107,107)!important;color:white!important;outline: 0;padding: 10px;
}
#rueButton {
  vertical-align: middle!important; height: 45px!important; width: 45px!important; margin: 0!important; max-height: unset!important; box-shadow: none!important; border-radius: 100px!important; border-top-left-radius: 0!important; border-bottom-left-radius: 0!important; background: url("https://r74n.com/rue/ruemoji.png") no-repeat center; background-size: 30px!important; background-color: rgb(83, 83, 83)!important;
}
#rueButton:hover {
  background: url("https://r74n.com/rue/ruemoji.png") no-repeat center; background-size: 30px!important; background-color: rgb(83, 83, 83)!important;
}
#rueButton:active, .rueBlink {
  background: url("https://r74n.com/rue/rue-blink.png") no-repeat center!important; background-size: 30px!important; background-color: rgb(83, 83, 83)!important;
}
#rueMessageBox a {
  color: #00FF00!important;
  font-weight: bold!important;
}
#rueMessageBox a:hover { color: #89ff89!important; }
#rueMessageBox a:active { color: #c4ffc4!important; }
/* anything lower than 475 screen width, make rueBox block */
@media only screen and (max-width: 600px) {
  #rueBox { display: block!important; position: relative!important; padding-right: 0!important; padding-left: 0!important; width: 90%!important; margin-left: auto!important; margin-right: auto!important;}
  #rueBoxIn { margin-left: auto!important; margin-right: auto!important; width: 90%!important; text-align: center!important; }
  #rueInput { width: 76%!important;padding-left: 4%!important;padding-right: 0!important; }
  #rueButton { width: 20%!important;padding-left: 0!important;padding-right: 0!important; }
}
</style>`);

rueInput = document.getElementById("rueInput");
rueButton = document.getElementById("rueButton");
rueBox = document.getElementById("rueBox");

var rueData = {}

rueData.replacements = {
    "R74n": "R74n",
    "R74moji": "R74moji",
    "UniSearch": "UniSearch",
    "Mix-Up!": "Mix-Up!",
}
rueData.commands = {
    "say": function(args) {
        Rue.say(args.join(" "));
    },
    "args": function(args) {
        Rue.say(args.join(","));
    },
    "http": function(args) {
        // go to the url
        Rue.openLink("http:" + args.join(" "));
    },
    "https": function(args) {
        // go to the url
        Rue.openLink("https:" + args.join(" "));
    },
    "search": function(args) {
        var search = args.join(" ");
        search = search.replace(/^(for) /g, "");
        Rue.openLink("https://r74n.com/search/?q=" + encodeURIComponent(search) +"#gsc.tab=0&gsc.q="+encodeURIComponent(search)+"&gsc.sort=");
    },
    "google": function(args) {
        var search = args.join(" ");
        search = search.replace(/^(search )?(for) /g, "");
        Rue.openLink("https://www.google.com/search?q=" + encodeURIComponent(search));
    },
    "bing": function(args) {
        var search = args.join(" ");
        search = search.replace(/^(search )?(for) /g, "");
        Rue.openLink("https://www.bing.com/search?q=" + encodeURIComponent(search));
    },
    "csearch": function(args) {
        var search = args.join(" ");
        search = search.replace(/^(for) /g, "");
        Rue.openLink("https://c.r74n.com/search?q=" + encodeURIComponent(search) +"#gsc.tab=0&gsc.q="+encodeURIComponent(search)+"&gsc.sort=");
    },
    "wbsearch": function(args) {
        var search = args.join(" ");
        search = search.replace(/^(for) /g, "");
        Rue.openLink("https://data.r74n.com/w/index.php?search=" + encodeURIComponent(search));
    },
    "sbsearch": function(args) {
        var search = args.join(" ");
        search = search.replace(/^(for) /g, "");
        Rue.openLink("https://sandboxels.wiki.gg/index.php?search=" + encodeURIComponent(search));
    },
    "qr": function(args) {
        var data = args.join(" ");
        Rue.showMedia("https://chart.googleapis.com/chart?cht=qr&chs=256x256&chld=L|1&chl=" + encodeURIComponent(data||"https://R74n.com/"), "QR Code coming right up!");
    },
    "fox": function() {
        Rue.showMedia("https://randomfox.ca/images/" + Math.floor(Math.random()*123+1) + ".jpg", "Fox for you! 🦊", "Brought to you by RandomFox.ca");
    },
    "myimage": function(args) {
        var seed = normalizeL2(normalize(args.join(" ")));
        Rue.showMedia("https://picsum.photos/seed/"+seed+"/500/400", "This image is unique to "+args.join(" ")+"!", "Brought to you by Lorem Picsum");
    },
}
rueData.favorites = {
    "color": "neon lime (<span style='color:#00ff00'>#00ff00</span>)"
}
rueData.totalities = {
    "/\\w+\\.r74n\\.com(.+)?/": function(text) {
        Rue.openLink("https://" + text);
    },
    "/sandboxels\\.wiki\\.gg(.+)?/": function(text) {
        Rue.openLink("https://" + text);
    },
    "/Q\\d+(.+)?/": function(text) {
        Rue.openLink("https://data.R74n.com/wiki/Item:" + text);
    },
    "/P\\d+(.+)?/": function(text) {
        Rue.openLink("https://data.R74n.com/wiki/Property:" + text);
    },
    "/(wh?[au]t'?s? )?((yo)?u'?r'?e? )?fav(ou?rite)? ([\\w ]+)/": function(text) {
        var match = text.match(/(?:wh?at'?s? )?(?:(?:yo)?ur )?fav(?:ou?rite)? ([\w ]+)/i);
        console.log(match)
        var key = match[1];
        Rue.say("My favorite " + key + " is " + (rueData.favorites[key] || "[???]") + "!");
    },
}
rueData.subcommands = {
    c: {
        func: function(args) {
            if (args.length === 0) {return ""}
            if (args.length === 1) {
                args = args[0].split(/ ?, ?/);
            }
            return args[Math.floor(Math.random()*args.length)];
        }
    },
    r: {
        func: function(args) {
            return (rueData.responses[args[0]] || "[???]");
        }
    },
    kw: {
        func: function(args) {
            return (rueData.keywords[args[0]] || "[???]");
        }
    },
    link: { // {{link:url|text}}
        func: function(args) {
            return "<a href='"+args[0]+"'>"+(args[1] || args[0])+"</a>";
        }
    },
    i: { // italics {{i:text}}
        func: function(args) { return "<em>"+(args[0]||"")+"</em>"; }
    },
    b: { // bold {{b:text}}
        func: function(args) { return "<strong>"+(args[0]||"")+"</strong>"; }
    },
    bi: {text:`"{{b:{{i:"+args[0]+"}}}}"`},
    ib: {text:`"{{i:{{b:"+args[0]+"}}}}"`},
}
rueData.responses = {
    "[blank]": ["{{c:Well come on|Come on|What're ya' waiting for}}, {{c:spit it out|say somethin'}}!","{{c:Spit it out|Say somethin'}} already!"],
    "[unsure]": "Umm.. I'm not sure how to respond!",
    "[wait]": "Just a {{c:sec|second|moment}}.. :)",
    "[confirm]": "Press me or [Enter] again to confirm!",
    "[confirmsearch]": "Should I {{bi:run a search}}",
    "[newtab]": "Check out the tab that just opened!",
    "purpose": "I'm here to help {{c:ya' navigate|find ya' way around}} {{c:this place|R74n}}!",
    "intro": "{{c:Hi|Hey}} there, friend! {{r:purpose}}",
    "name": "Name's Rue!",
    "pronouns": "I use she/they pronouns!",
    "who": "{{r:name}} {{r:purpose}}",
    "rue": "That's me! {{r:purpose}}",
    "help": "Since I'm only in my {{c:open beta|testing}} stage, I haven't {{c:put together|written up}} a help page yet. Sorry!",
    "r74n": "{{link:https://r74n.com/|R74n}} is the place you're at!",
    "ryan": "My creator! Their Discord is @ryan.",
    "ryan#4755": "This user is now known as @ryan on Discord.",
    "@ryan": "This is a user on Discord, with the ID {{link:https://discord.com/users/101070932608561152|101070932608561152}}. Previously ryan#4755.",
    "test": "I think it's {{c:working|a success}}! There's also the R74n {{link:https://r74n.com/test/|Testing Zone}}.",
    "<3": "love>>>O-oh..",
    "why": "=purpose",
    "sandtiles": "Sandtiles is a top-down pixel art game that is on an indefinite hiatus.",
    "ontomata": "{{link:https://docs.google.com/document/d/1M8FExUFCsBLv9EeLke00VrdYpYQFPYN11uh9VFi_K10/edit?usp=sharing|Ontomata}} is an ontology and possibly a multiplayer video game slowly being developed.",
    "lang": "{{kw:language}}",
    "2023": "My birth year!",
    "june": "My birth month! (The 22nd, to be exact.) See the {{link:https://r74n.com/commons/calendar|calendar}} for more events in June.",
    
    "/(hello+|ha?i+|he+y+([ao]+)?|ho+la+|a?yo|howdy+|halacihae) ?(there+|rue|friend)?/": "=intro",
    "/(((good|gud|buh|bye|bai)?([ \\-]+)?(bye|bai))|(see|c) ?(you|ya'?|u) ?(later|l8e?r)?) ?(rue|friend)?/": "See ya' later, friend!",
    "/(who|what)( (are|r) (you|u)|is (this|rue))/": "=who",
    "/no+|nah+|nope+/": "No.. problem!",
    "/(yes+|ya+|yeah+|yep+|yas+)(sir)?/": "Noted!",
    "/(f[uv*#]ck|screw) ?(you|u|off)/": "angry>>>..Not {{c:cool|nice}}.",

    "/dirt ?[,+] ?water/": "You made Mud!",
    "/water ?[,+] ?dirt/": "You made Mud!",
    "ryan is a": "Ryan is a C",
    "otter": "🦦",
}
rueData.keywords = {
    "language": "I can only speak and respond to English right now! I was written in pure JavaScript.",
    "birthday": "My (Rue's) birthday is on June 22nd. The R74n website's is on May 2nd. The owner's is a secret!",
}
rueData.media = {
    "icon": "https://r74n.com/icons/favicon.png",
    "favicon": "=icon",
    "logo": "=icon",
    "qr": "https://imgur.com/ilim881",
}
rueData.links = {
    "main": "https://r74n.com/",
    "r74n": "=main",
    "/": "=main",
    "sandboxels": "https://sandboxels.r74n.com",
    "sbxls": "=sandboxels",
    "sandboxles": "=sandboxels",
    "sandboxel": "=sandboxels",
    "sandbox": "=sandboxels",
    "sboxels": "=sandboxels",
    "sandboxgame": "=sandboxels",
    "snadboxels": "=sandboxels",
    "sand boxels": "=sandboxels",
    "sandvoxels": "=sandboxels",
    "sandboxels:changes": "https://sandboxels.r74n.com/changelog",
    "sandboxels:changes.txt": "https://sandboxels.r74n.com/changelog.txt",
    "sb": "=sandboxels",
    "sblite": "https://sandboxels.r74n.com/lite",
    "sandboxels lite": "=sblite",
    "sbwiki": "https://sandboxels.wiki.gg/",
    "sbw": "=sbwiki",
    "sandboxels wiki": "=sbwiki",
    "sandboxelswiki": "=sbwiki",
    "wiki.gg": "=sbwiki",
    "wikigg": "=sbwiki",
    "cpd": "https://c.r74n.com/",
    "c": "=cpd",
    "copy": "=cpd",
    "oldcopy": "https://c.r74n.com/",
    "copyold": "https://c.r74n.com/",
    "copy paste dump": "=cpd",
    "copypastedump": "=cpd",
    "copy & paste dump": "=cpd",
    "copy and paste dump": "=cpd",
    "fonts": "https://c.r74n.com/fonts/?text=$1",
    "font": "https://c.r74n.com/fonts/?text=$1",
    "txt": "https://r74n.com/textviewer/?text=$1",
    "textviewer": "=txt",
    "text viewer": "=txt",
    "view text": "=txt",
    "hiew": "https://r74n.com/hello/",
    "hiew:changes": "https://r74n.com/hello/changelog",
    "hellos": "=hiew",
    "hello in every way": "=hiew",
    "convert": "https://r74n.com/convert/?",
    "converter": "=convert",
    "unit converter": "=convert",
    "convert units": "=convert",
    "moji": "https://r74n.com/moji/",
    "mojis": "=moji",
    "r74moji": "=moji",
    "r74mojis": "=moji",
    "share": "https://r74n.com/share/",
    "share buttons": "=share",
    "words": "https://r74n.com/words/",
    "words and definitions": "=words",
    "words & definitions": "=words",
    "word lists": "=words",
    "word list": "=words",
    "2020 word list": "https://r74n.com/words/2020",
    "2020 words": "=2020 word list",
    "2020 slang": "=2020 word list",
    "2021 word list": "https://r74n.com/words/2021",
    "2021 words": "=2021 word list",
    "2021 slang": "=2021 word list",
    "twitter word list": "https://r74n.com/words/twitter",
    "tone indicators": "https://r74n.com/words/twitter#Tone",
    "subtwt": "https://r74n.com/words/twitter#Communities",
    "subtwts": "https://r74n.com/words/twitter#Communities",
    "twitter words": "=twitter word list",
    "twitter slang": "=twitter word list",
    "twitter slang list": "=twitter word list",
    "tiktok word list": "https://r74n.com/words/tiktok",
    "tiktok words": "=tiktok word list",
    "tiktok slang": "=tiktok word list",
    "tiktok slang list": "=tiktok word list",
    "404": "https://r74n.com/404",
    "unisearch": "https://r74n.com/unisearch/",
    "us": "=unisearch",
    "uni": "=unisearch",
    "pixelflags": "https://r74n.com/pixelflags/#",
    "flags": "=pixelflags",
    "pixel flags": "=pixelflags",
    "country flags": "https://r74n.com/pixelflags/#country",
    "subdivision flags": "https://r74n.com/pixelflags/#subdivision",
    "political flags": "https://r74n.com/pixelflags/#political",
    "military flags": "https://r74n.com/pixelflags/#political",
    "political & military flags": "https://r74n.com/pixelflags/#political",
    "pride flags": "https://r74n.com/pixelflags/#pride",
    "racing flags": "https://r74n.com/pixelflags/#racing",
    "maritime flags": "https://r74n.com/pixelflags/#maritime",
    "misc flags": "https://r74n.com/pixelflags/#misc",
    "other flags": "https://r74n.com/pixelflags/#misc",
    "flagpoles": "https://r74n.com/pixelflags/#pole",
    "mix": "https://r74n.com/mix/",
    "mix up": "=mix",
    "mix-up": "=mix",
    "mixup": "=mix",
    "sml": "https://github.com/R74nCom/Social-Media-Lists/tree/main/",
    "social media lists": "=sml",
    "social-media-lists": "=sml",
    "mc": "https://r74n.com/mc/",
    "minecraft": "=mc",
    "minceraft": "=mc",
    "minecraft tools": "=mc",
    "mc tools": "=mc",
    "mctools": "=mc",
    "halacae": "https://docs.google.com/document/d/1mZ2IGrIbfYlUwfuZ53_S0n5O2ne9JUKV0yinIyNwLFU/edit?usp=sharing",
    "pogchamps": "https://r74n.com/PogChamp/",
    "pogchamp": "=pogchamps",
    "all twitch pogchamps": "=pogchamps",
    "pogchampening": "=pogchamps",
    "octopi": "https://r74n.com/octopi/",
    "octopuses": "=octopi",
    "octopus": "=octopi",
    "octopis": "=octopi",
    "types of octopi": "=octopi",
    "types of octopuses": "=octopi",
    "types of pi": "=octopi",
    "types of puses": "=octopi",
    "lore": "https://r74n.com/lore/",
    "r74n lore": "=lore",
    "lore map": "https://r74n.com/lore/map",
    "loremap": "=lore map",
    "emanations": "=lore map",
    "discord": "https://discord.gg/ejUc6YPQuS",
    "discord.gg": "=discord",
    "discord invite": "=discord",
    "server invite": "=discord",
    "discord server": "=discord",
    "r74n discord server": "=discord",
    "server": "=discord",
    "server page": "https://discord.com/servers/r74n-sandboxels-939255181474955331",
    "disgd": "=discord",
    "discd": "=discord",
    "discrd": "=discord",
    "discord.com": "https://discord.com/invite/ejUc6YPQuS",
    "discordapp.com": "https://discordapp.com/invite/ejUc6YPQuS",
    "discord canary": "https://canary.discord.com/invite/ejUc6YPQuS",
    "guestbook": "https://docs.google.com/document/d/1NeMxEPddvqALjupCl0svIUoeklgc973Ev90hI1HNu8s/edit?usp=sharing",
    "commons:doc": "=guestbook",
    "calendar": "https://r74n.com/commons/calendar",
    "events": "=calendar",
    "commons:calendar": "=calendar",
    "ical": "https://calendar.google.com/calendar/ical/ladcofi5bc79kluaighvhr817s%40group.calendar.google.com/public/basic.ics",
    "commons:earth": "https://earth.google.com/earth/d/1TaHFhh3mbqMrZCWXA3PGFsIAbVuNQSpO?usp=sharing",
    "commons:form": "https://forms.gle/HsgeY4EuYNRwaoP88",
    "commons:microsoftform": "https://forms.office.com/r/uvUZzNXtJM",
    "commons:sheet": "https://docs.google.com/spreadsheets/d/1y4saOt_ICnP7zxcMNG7E5IqkEAmzH1j2SGTIHGpP5BY/edit?usp=sharing",
    "commons:slides": "https://docs.google.com/presentation/d/1iXOiwnqJSIEuFfWfMPNPn3PccxohPteFFNrZ-XfyYcQ/edit?usp=sharing",
    "commons:university": "https://classroom.google.com/c/MjI1Mjg3ODIwNTI4?cjc=usi7ud6",
    "commons:painting": "https://pixelplace.io/33826-r74n-commons-painting",
    "commons:group": "https://groups.google.com/g/R74n",
    "commons:whiteboard": "https://jamboard.google.com/d/1nL0lNWQMkdh8RKc8Tmzr3vBHB_EvDK5ziSI1uxxj0Tk/edit?usp=sharing",
    "commons:todo": "https://to-do.microsoft.com/tasks/sharing?InvitationToken=WOup1zn_TzP5uTIX-DUngQe2iwEHi8htYn7Xe6Yrj4i1LgkCR_Uy0jMCa1WdmY9qY",
    "commons:microsoftlist": "https://lists.live.com/:l:/g/personal/dc19101fcc1d9097/FOpKZGNxtb5BjESKMBwMOW4Bb0awIV1A4OD9XkIS46bF3Q?e=eNM7D9",
    "ywot": "https://www.yourworldoftext.com/~R74n/",
    "commons:ywot": "=ywot",
    "your world of text": "=ywot",
    "yourworldoftext": "=ywot",
    "yourworldoftext.com": "=ywot",
    "~r74n": "=ywot",
    "view guestbook": "https://r74n.com/guestbook/",
    "doc": "=guestbook",
    "google doc": "=guestbook",
    "r74n guestbook": "=guestbook",
    "r74n google doc": "=guestbook",
    "docs.google.com": "=guestbook",
    "feedback": "https://r74n.com/ufbs/",
    "ufbs": "=feedback",
    "universal feedback system": "=feedback",
    "universal fb system": "=feedback",
    "feedback system": "=feedback",
    "fb": "=feedback",
    "suggest": "=feedback",
    "suggestion": "=feedback",
    "suggestions": "=feedback",
    "complaint": "=feedback",
    "complain": "=feedback",
    "/(where (can|do) i)? ?(i have|submit|post|ask)( a)? (suggestion|feedback|fb|complaint)/": "=feedback",
    "commons": "https://r74n.com/commons/",
    "common": "=commons",
    "r74n commons": "=commons",
    "more r74n commons": "=commons",
    "commons hub": "=commons",
    "social": "https://r74n.com/social/",
    "socials": "=social",
    "social media": "=social",
    "accounts": "=social",
    "profiles": "=social",
    "wikibase": "https://data.r74n.com/wiki/",
    "wb": "=wikibase",
    "data": "=wikibase",
    "r74n wikibase": "=wikibase",
    "special:recentchanges": "https://data.r74n.com/wiki/Special:RecentChanges?hideWikibase=1&hidelog=1&limit=50&days=7&enhanced=1&urlversion=2",
    "icons": "https://r74n.com/icons/",
    "logos": "=icons",
    "favicons": "=icons",
    "old": "https://r74n.com/old/",
    "time machine": "=old",
    "old site": "=old",
    "old r74n": "=old",
    "email": "mailto:contact@r74n.com",
    "939255181474955331": "https://discord.com/channels/939255181474955331/",
    "#general": "https://discord.com/channels/939255181474955331/939255181474955334",
    "#sandboxels": "https://discord.com/channels/939255181474955331/939348194880524338",
    "#sandboxels-feedback": "https://discord.com/channels/939255181474955331/939352388635066429",
    "#sandboxels-modding": "https://discord.com/channels/939255181474955331/939352271500738560",
    "#r74um": "https://discord.com/channels/939255181474955331/1019686599975505930",
    "r74um": "https://discord.com/channels/939255181474955331/1019686599975505930",
    "#announcements": "https://discord.com/channels/939255181474955331/939345813837066320",
    "#rules": "https://discord.com/channels/939255181474955331/939347812750082099",
    "sandboxels:modding": "https://sandboxels.wiki.gg/wiki/Modding_tutorial",
    "modding tutorial": "=sandboxels:modding",
    "sandboxels modding": "=sandboxels:modding",
    "sandboxels:mods": "https://docs.google.com/document/u/4/d/1YWPLKEvGeaaLuYWzObCyLK2Y09JPZgF1ODQQCbU3Sng/edit?usp=sharing",
    "sandboxels mod list": "=sandboxels:mods",
    "mod list": "=sandboxels:mods",
    "modded sandboxels": "=sandboxels:mods",
    "sandboxels mods": "=sandboxels:mods",
    "sandboxels:mod list": "=sandboxels:mods",
    "sandboxels:modlist": "=sandboxels:mods",
    "example_mod.js": "https://sandboxels.r74n.com/mods/example_mod.js",
    "eod": "https://discord.gg/jHeqgdM",
    "eode": "https://discord.com/api/oauth2/authorize?client_id=819076922867712031&permissions=3136&scope=bot%20applications.commands",
    "705084182673621033": "https://discord.com/channels/705084182673621033/",
    "elemental on discord": "=eod",
    "elementalondiscord": "=eod",
    "tiktok": "https://www.tiktok.com/@r74n.com",
    "@r74n.com": "=tiktok",
    "tt": "=tiktok",
    "twitter": "https://twitter.com/R74ncom",
    "@r74ncom": "=twitter",
    "twt": "=twitter",
    "twttr": "=twitter",
    "youtube": "https://www.youtube.com/channel/UCzS6ufDfiDxbHVL001GwFeA/",
    "yt": "=youtube",
    "uczs6ufdfidxbhvl001gwfea": "=youtube",
    "instagram": "https://www.instagram.com/r74ndev/",
    "insta": "=instagram",
    "ig": "=instagram",
    "@r74ndev": "=instagram",
    "pinterest": "https://www.pinterest.com/R74nCom/",
    "pins": "https://www.pinterest.com/R74nCom/_created/",
    "emojiartist": "https://twitter.com/CopyPasteDump",
    "emoji artist": "=emojiartist",
    "@copypastedump": "=emojiartist",
    "😊": "=emojiartist",
    "☺️": "=emojiartist",
    "giphy": "https://giphy.com/channel/R74n",
    "gifs": "=giphy",
    "picrew": "https://picrew.me/image_maker/1276358",
    "imgur": "https://imgur.com/user/R74ncom",
    "on google": "https://www.google.com/search?kgmid=/g/11m0q5kt97",
    "sketchfab": "https://sketchfab.com/R74n",
    "ios shortcut": "https://www.icloud.com/shortcuts/f78a979d937841eba4a290f922c3acc4",
    "authenticator": "otpauth://totp/R74n?secret=MRXWOUC2G5KFSQKYJM2VQ42TMQ3EWM22JJ2WSOKHJM3WG6KRHFJEMWDSPJIWC4RYLBJDQNSTIJHA&issuer=R74n",
    "u/r74ncom": "https://www.reddit.com/user/R74nCom",
    "/u/r74ncom": "=u/R74nCom",
    "user/r74ncom": "=u/R74nCom",
    "/user/r74ncom": "=u/R74nCom",
    "u/emoji_artist": "https://www.reddit.com/user/emoji_artist",
    "/u/emoji_artist": "=u/emoji_artist",
    "user/emoji_artist": "=u/emoji_artist",
    "/user/emoji_artist": "=u/emoji_artist",
    "r/74n": "https://www.reddit.com/r/74n/",
    "r/74ncom": "https://www.reddit.com/r/74ncom/",
    "r/sandboxels": "https://www.reddit.com/r/sandboxels/",
    "/r/sandboxels": "=r/sandboxels",
    "r/r74n": "=r/r74n",
    "/r/r74n": "=r/r74n",
    "r/emoticons": "https://www.reddit.com/r/emoticons/",
    "/r/emoticons": "=r/emoticons",
    "r/textarts": "https://www.reddit.com/r/textarts/",
    "/r/textarts": "=r/textarts",
    "r/copypastedump": "https://www.reddit.com/r/copypastedump/",
    "/r/copypastedump": "=r/copypastedump",
    "cashapp": "https://cash.app/$emojiartist",
    "$emojiartist": "=cashapp",
    "paypal": "https://www.paypal.com/donate/?hosted_button_id=GCX4VHQ7SZWTN",
    "donate": "=paypal",
    "pay": "https://www.paypal.com/paypalme/R74nCom",
    "send money": "=pay",
    "github": "https://github.com/R74nCom/",
    "gh": "=github",
    "git": "=github",
    "github:cpd": "https://github.com/R74nCom/CopyPasteDump",
    "github:c": "=github:cpd",
    "github:copy": "=github:cpd",
    "github:main": "https://github.com/R74nCom/R74n-Main",
    "r74moji-essentials": "https://github.com/R74nCom/R74moji-Essentials",
    "r74moji essentials": "=r74moji-essentials",
    "link": "https://link.r74n.com/",
    "hidden elements": "https://link.r74n.com/hidden-elements",
    "hidden sandboxels elements": "=hidden elements",
    "emoji__artist": "https://www.tiktok.com/@emoji__artist",
    "@emoji__artist": "=emoji__artist",
    "r74nwiki": "https://r74n.fandom.com/wiki/",
    "r74n wiki": "=r74nwiki",
    "eodwiki": "https://elemental-on-discord.fandom.com/wiki/",
    "elemental on discord wiki": "=eodwiki",
    "eod wiki": "=eodwiki",
    "user:r74n": "https://data.r74n.com/wiki/User:R74n",
    "twitch": "https://www.twitch.tv/R74n_com",
    "r74n_com": "=twitch",
    "ttv": "=twitch",
    "betterttv": "https://betterttv.com/users/615df8e4d442dd7e80e0d019",
    "bttv": "=betterttv",
    "frankerfacez": "https://www.frankerfacez.com/channel/r74n_com",
    "ffz": "=frankerfacez",
    "7tv": "https://7tv.app/users/62585504c2162b2c28623eb2",
    "social blade": "https://socialblade.com/tiktok/user/r74n.com",
    "facebook": "https://www.facebook.com/R74n-106371942050914",
    "spacehey": "https://spacehey.com/r74n",
    "mastodon": "https://mastodon.gamedev.place/@R74n",
    "tumblr": "https://r74n.tumblr.com/",
    "box": "https://r74n.com/box",
    "ryanuwu": "=box",
    "shulker box": "=box",
    "shulker boxes": "=box",
    "shulkers": "=box",
    "boxes": "=box",
    "/give": "=box",
    "itemcult": "https://discord.gg/8TsNvEy",
    "item cult": "=itemcult",
    "minecraft item cult": "=itemcult",
    "shorten": "https://r74n.com/shorten/?url=$1",
    "shorten link": "=shorten",
    "shorten url": "=shorten",
    "link shortener": "=shorten",
    "url shortener": "=shorten",
    "testing zone": "https://r74n.com/test/",
    "ads": "https://www.google.com/adsense/",
    "/twitter": "https://r74n.com/twitter",
    "/twitch": "https://r74n.com/twitch",
    "/tiktok": "https://r74n.com/tiktok",
    "/discord": "https://r74n.com/tiktok",
    "/test": "https://r74n.com/test",
    "emoji art canvas": "https://r74n.com/emojiart",
    "twitter dm": "https://twitter.com/messages/compose?recipient_id=1436857621827530753",
    "#r74n": "https://twitter.com/hashtag/R74n",
    "#copypastedump": "https://twitter.com/hashtag/CopyPasteDump",
    "#cpd": "=#copypastedump",
    "#emojiart": "https://twitter.com/hashtag/emojiart",
}

const whitespaceRegex = /[\s\uFEFF\u200B]+/g;
const punctuationRegex = /[`~!¡¿‼‽⁇⁈⁉！@#$¢£€¥%\^&\*\(\)\-‐‑‒–—―_\+×÷=\[\]\{\}\|\\;:：；'‘’"“”„＂＇‚‛❛❜❟‟«»<>,\.…\/⁄\?¶⁋❡§†‡°]+/g;
function normalize(text) {
    return text.toLowerCase().replace(whitespaceRegex, " ").trim();
}
function normalizeL2(text) {
    return text.replace(punctuationRegex, "").toLowerCase().trim();
}
function chooseValue(dict, key) {
    // if the first character of dict[key] is =, and dict[new key] exists, set key to new key
    if (dict[key] && dict[key][0] === "=") {
        var newKey = dict[key].slice(1);
        if (dict[newKey]) { key = newKey; }
    }
    return [chooseItem(dict[key]),key];
}
function chooseItem(array) {
    // if its an array, choose a random item, otherwise return the item
    if (Array.isArray(array)) {
        return array[Math.floor(Math.random() * array.length)];
    }
    return array;
}
function tryVariants(text, dict, func) {
    if (dict[text]) { func(...chooseValue(dict,text)); return true; }
    var n2 = normalizeL2(text);
    if (dict[n2]) { func(...chooseValue(dict,n2)); return true; }
    var ns = n2.replace(whitespaceRegex, "");
    if (dict[ns]) { func(...chooseValue(dict,ns)); return true; }
    for (var key in dict) {
        // if it starts and ends with /, test it as a regex
        if (key.charCodeAt(0) === 47 && key.charCodeAt(key.length-1) === 47 && key.length > 2) {
            var regex = new RegExp("^(" + key.slice(1,-1) + ")$", "gi");
            if (regex.test(text) || regex.test(n2)) { func(...chooseValue(dict,key)); return true; }
        }
    }
}


loadedRue = true;
rueInput.addEventListener("input", function() {
    var text = rueInput.value;
    // console.log(text)

    // replace text
    for (var key in rueData.replacements) {
        // make a case-insensitive regex for the key
        var regex = new RegExp(key, "gi");
        text = text.replace(regex, rueData.replacements[key]);
    }

    // get cursor position
    if (text !== rueInput.value) {
        var cursorPosition = rueInput.selectionStart;
        rueInput.value = text;
        rueInput.selectionStart = cursorPosition;
        rueInput.selectionEnd = cursorPosition;
    }
    // close message box if needed
    if (Rue.brain.speaking && !Rue.brain.asking) {
        Rue.hush();
    }
});
rueButton.onclick = function(e) {
    if (Rue.brain.confirming) {
        if (Rue.brain.confirming === rueInput.value) {
            Rue.brain.afterConfirm(e);
            Rue.brain.confirming = false;
            Rue.brain.afterConfirm = undefined;
            return
        }
        Rue.brain.confirming = false;
        Rue.brain.afterConfirm = undefined;
    }
    var text = rueInput.value.trim();
    var normalized = normalize(text);
    if (normalized.length === 0) { Rue.error(chooseItem(rueData.responses["[blank]"])); return }

    var done = false;

    // regex totalities
    done = tryVariants(text, rueData.totalities, function(func) {
        func(text);
    });

    // JS commands
    var commandBase = normalized.split(" ")[0];
    var argsArray = text.replace(whitespaceRegex, " ").split(" ").slice(1);
    // if the commandBase has a : in it, split it and put the rest at the beginning of argsArray
    if (commandBase.indexOf(":") !== -1) {
        var split = text.split(" ")[0].split(/:(.+)/);
        commandBase = split[0];
        argsArray.unshift(split[1]);
    }
    // group together args surrounded by quotes, keeping all other args separate
    if (text.indexOf('"') !== -1) {
        var args = [];
        var inQuote = false;
        var currentArg = "";
        // loop through argsArray
        for (var i = 0; i < argsArray.length; i++) {
            var arg = argsArray[i];
            if (arg[0] === '"') {
                if (arg[arg.length-1] === '"') {
                    args.push(arg.slice(1,-1));
                }
                else {
                    inQuote = true;
                    currentArg = arg.slice(1);
                }
            }
            else if (arg[arg.length-1] === '"') {
                inQuote = false;
                currentArg += " " + arg.slice(0,-1);
                args.push(currentArg);
                currentArg = "";
            }
            else if (inQuote) {
                currentArg += " " + arg;
            }
            else {
                args.push(arg);
            }
        }
        if (currentArg !== "") { args.push(currentArg); }
        argsArray = args;
    }
    if (!done) {
        done = tryVariants(commandBase, rueData.commands, function(func) {
            func(argsArray);
        });
    }
    if (!done) {
        // basic responses
        done = tryVariants(normalized, rueData.responses, function(response) {
            Rue.say(response);
        });
    }
    if (!done) {
        // media display
        done = tryVariants(normalized, rueData.media, function(link) {
            Rue.showMedia(link,"Check this out!");
        });
    }

    if (!done) { // links
        done = tryVariants(normalized, rueData.links, function(link) {
            // open link
            if (link.indexOf("$1") !== -1) {
                link = link.replace("$1", "");
            }
            Rue.openLink(link, e);
        });
        // split text only once by /[:\/]/g
        var split = text.split(/[:\/](.+)/);
        if (!done && split.length > 1) {
            // split once
            var base = normalize(split[0]);
            var rest = split[1];
            done = tryVariants(base, rueData.links, function(link, newbase) {
                if (rueData.links[newbase+":"+rest]) {
                    link = rueData.links[newbase+":"+rest];
                }
                else {
                    rest = encodeURIComponent(rest);
                    if (link.indexOf("$1") === -1) {
                        // if there is no / at the end, add one
                        if (link[link.length-1] !== "/" && link[link.length-1] !== "?" && link[link.length-1] !== "#") { link += "/"; }
                        rest = rest.replace(/%3F/g, "?");
                        // add rest to link
                        link += rest;
                    }
                    else {
                        // replace $1 with rest
                        link = link.replace("$1", rest);
                    }
                }
                Rue.openLink(link, e);
            });
        }
    }
    if (!done) {
        // last priority keywords
        for (keyword in rueData.keywords) {
            if (normalized.indexOf(keyword) !== -1) {
                Rue.say(chooseItem(rueData.keywords[keyword]));
                done = true;
                break;
            }
        }
    }

    if (!done) {
        Rue.confirm("{{r:[unsure]}}\n{{r:[confirmsearch]}}?", function(e) {
            Rue.openLink("https://r74n.com/search/?q=" + encodeURIComponent(text) +"#gsc.tab=0&gsc.q="+encodeURIComponent(text)+"&gsc.sort=", e);
        })
    }
};
rueInput.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) { // enter = click rueButton
        rueButton.onclick(e);
    }
    if (e.keyCode === 27 || e.keyCode === 9) { // escape or tab = hush
        Rue.hush();
    }
    if (e.keyCode === 8 && rueInput.value.length === 0) { // backspace
        Rue.hush();
    }
});
document.addEventListener("keydown", function(e) {
    // command + shift + r = focus on Rue
    if (e.key === "r" && e.shiftKey && e.metaKey) {
        rueInput.focus();
        Rue.blink();
        Rue.say("Hello! Type in certain commands to make me do things.");
        e.preventDefault();
    }
});
// hush if the screen width changes, but ignore the height
var screenWidth = window.innerWidth;
window.addEventListener("resize", function() {
    if (window.innerWidth !== screenWidth) {
        Rue.hush();
        screenWidth = window.innerWidth;
    }
});


Rue = {
    say: function(message, opt) {
        if (!opt) { opt = {} }
        if (message.indexOf(">>>") !== -1) {
            var split = message.split(">>>");
            if (split.length > 1 && Rue[split[0]]) {
                Rue[split[0]](split[1]);
                return;
            }
        }
        if (message.indexOf("{{") !== -1) {
            message = parseText(message);
        }
        message = message.replace(/\n/g, "<br>");
        var rueMessageBox = document.getElementById("rueMessageBox");
        if (!rueMessageBox) { // init message box
            rueMessageBox = document.createElement("div");
            rueMessageBox.id = "rueMessageBox";
            rueMessageBox.style.cssText = "color:white;display:none;position:absolute;background:#595959;padding:0.5em;padding-left:0.75em;padding-right:0.75em;clear:both;border:solid;overflow:hidden;transition:background 0.5s, border-color 0.5s;";
            document.body.appendChild(rueMessageBox);
        }
        // move message box to below rueBox
        rueMessageBox.style.top = (rueBox.offsetTop + rueBox.offsetHeight) + "px";
        rueMessageBox.style.left = (rueBox.offsetLeft) + "px";
        rueMessageBox.style.width = (rueInput.offsetWidth+20) + "px";
        rueMessageBox.innerHTML = message;
        rueMessageBox.style.borderColor = (opt.color || "white");
        rueMessageBox.style.background = (opt.bg || "#595959");
        rueMessageBox.style.display = "block";
        // set border-radius proportionate to height. more height = less border-radius, min 16px
        rueMessageBox.style.borderRadius = Math.max((100 - (rueMessageBox.offsetHeight / 1.4)),16) + "px";
        rueMessageBox.style.borderTopRightRadius = "0";
        Rue.brain.speaking = true;
        // if anywhere else is clicked, Rue.hush()
        if (!Rue.brain.closeMessageEvent) {
            Rue.brain.closeMessageEvent = function(e) {
                // if e.target is not inside rueBox element
                if (!rueBox.contains(e.target) && !rueMessageBox.contains(e.target)) {
                    Rue.hush();
                    // kill Rue.brain.closeMessageEvent
                    document.removeEventListener("click", Rue.brain.closeMessageEvent);
                    Rue.brain.closeMessageEvent = null;
                }
            }
            document.addEventListener("click", Rue.brain.closeMessageEvent);
        }
    },
    hush: function() {
        var rueMessageBox = document.getElementById("rueMessageBox");
        if (rueMessageBox) {
            rueMessageBox.style.display = "none";
            rueMessageBox.innerHTML = "";
        }
        Rue.brain.speaking = false;
    },
    error: function(errorMessage) {
        Rue.say(errorMessage, {color:"red",bg:"#7b5b5b"});
    },
    success: function(message) {
        Rue.say(message, {color:"lime",bg:"#5b7b5b"});
    },
    sad: function(message) {
        Rue.say(message, {color:"blue",bg:"#5b5b7b"});
    },
    angry: function(message) {
        Rue.say(message, {color:"red",bg:"#7b5b5b"});
    },
    love: function(message) {
        Rue.say(message, {color:"#ff00ff",bg:"#7b5b7b"});
    },
    flushed: function(message) {
        Rue.say(message, {color:"#ffff00",bg:"#7b7b5b"});
    },
    anxious: function(message) {
        Rue.say(message, {color:"#7900b5",bg:"#483b4e"});
    },
    official: function(message) {
        Rue.say(message, {color:"#00ffff",bg:"#5b7b7b"});
    },
    loading: function() {
        Rue.say("{{r:[wait]}}");
    },
    showMedia: function(url, message, caption) {
        Rue.say((message || "") + "<div style='text-align:center;display:block;height:200px;width:100%;margin-top:10px;margin-bottom:10px'><a style='vertical-align:middle' href='"+url+"'><img src='"+url+"' style='max-width:100%;max-height:100%;vertical-align:middle' alt='Displayed Image' title='Click to Open'></a>" + (caption ? "<span style='text-align:center;font-size:0.75em;display:block;vertical-align:bottom'>"+caption+"</span>" : "") + "</div>");
    },
    confirm: function(message, func, opts) {
        Rue.brain.confirming = rueInput.value;
        Rue.brain.afterConfirm = func;
        Rue.say(message+"\n{{r:[confirm]}}", {color:"#ffff00",bg:"#7b7b5b"});
    },
    openLink: function(url,e) {
        Rue.loading();
        if (!e || !e.metaKey) {
            window.open(url, "_self");
        }
        else {
            window.open(url, "_blank");
            Rue.say("{{r:[newtab]}}")
        }
    },
    // randomly add .rueBlink to rueButton at random intervals
    blink: function(loop) {
        // add .rueBlink
        var rueButton = document.getElementById("rueButton");
        rueButton.classList.add("rueBlink");
        // remove .rueBlink after 0.5 seconds
        setTimeout(function() {
            rueButton.classList.remove("rueBlink");
        }, 100);
        // call this function again after a random interval
        if (loop) { setTimeout(function(){Rue.blink(true)}, Math.random() * 3000); }
    },
    brain: {}
}
setTimeout(function(){Rue.blink(true)}, Math.random() * 3000);



// textviewer parser
function splitOnce(text,delim) {
    var parts = text.split(delim);
    var part1 = parts[0];
    var part2 = parts.slice(1).join(delim);
    return [part1,part2]
}
function parseText(text) {
    var tries = 0;
    while (text.indexOf("{{") !== -1) {
        var newtext = text;
        var parts = text.split("{{");
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            var newpart = part;
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
            if (!rueData.subcommands[command] || args.length < rueData.subcommands[command].minArgs) {
                result = "[???]"
            }
            else if (rueData.subcommands[command].func) { result = rueData.subcommands[command].func(args); }
            else { result = eval(rueData.subcommands[command].text); }
            newtext = newtext.replace("{{"+whole+"}}",result);
        }
        tries++;
        if (tries > 50 || (text.length===newtext.length && text===newtext)) {text = newtext;break}
        text = newtext;
    }
    return text
}




console.log("Rue's ready to go!")
}

// preload blink image
var img = new Image();
img.src = "https://r74n.com/rue/rue-blink.png";

document.addEventListener("DOMContentLoaded", function(){
    if (!loadedRue) { initRue() }
});
document.addEventListener("load", function(){
    if (!loadedRue) { initRue() }
});
// if the document is already loaded, initRue
if (document.readyState === "complete" || document.readyState === "interactive") {
    initRue();
}