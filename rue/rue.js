console.log("Rue by R74n is enabled on this page.")
var loadedRue = false;
var rueLoadFunctions = [];
var rueStartedLoad = new Date();
Rue = {
    onRueLoad: function(callback) {
        if (loadedRue) { callback(); }
        else { rueLoadFunctions.push(callback); }
    }
}
function initRue() {
console.log("Rue's loadin'..")
var urlParams = new URLSearchParams(window.location.search);
var rueParam = (urlParams.get('rue')||"").toLowerCase();
if (rueParam === "false" || rueParam === "off") {
    if (document.getElementById("rueBox")) {
        document.getElementById("rueBox").remove();
    }
    console.log("Rue's been blocked by a URL parameter.")
    return;
}

var rueHTML = `<div id="rueBoxIn">
  <input type="text" id="rueInput" placeholder="Explore with Rue..." title="Type in your query!" autocomplete="off"><input type="button" id="rueButton" value="&nbsp;" title="Let's go!" aria-label="Search">
</div>`
var rueParent = document.body;
if (document.getElementById("rueBox")) {
    rueParent = document.getElementById("rueBox");
    rueParent.classList.add("rueElement");
}
else {
    rueHTML = '<div id="rueBox" class="rueElement">' + rueHTML + '</div>';
}
// add html to the end of the body
rueParent.insertAdjacentHTML("beforeend", rueHTML);

// add html to the end of the head
document.head.insertAdjacentHTML("beforeend", `<style>/* Rue */
#rueBox {
  height: 3em!important; display: table-cell!important; vertical-align: middle!important; padding-right: 1em!important; padding-left: 1em!important; z-index:7474!important;font-size:22px!important;font-family: Arial, Helvetica, sans-serif!important;top: 10px!important
}
.rueBoxCorner {
  right: 0!important; position: absolute!important
}
#rueBoxIn {
  position: relative!important; top: 50%!important; transform: translateY(-50%)!important;
  background: rgb(0,255,0);
  background: -moz-linear-gradient(37deg, rgba(0,255,0,1) 0%, rgba(0,255,255,1) 100%);
  background: -webkit-linear-gradient(37deg, rgba(0,255,0,1) 0%, rgba(0,255,255,1) 100%);
  background: linear-gradient(37deg, rgba(0,255,0,1) 0%, rgba(0,255,255,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#00ff00",endColorstr="#00ffff",GradientType=1);
  padding: 0.2em!important; border-radius: 100px!important;
  transition: all 0.5s ease!important;
  white-space: nowrap!important;
}
#rueInput {
  vertical-align: middle!important; height: 25px!important; border-radius: 100px!important; border-top-right-radius: 0!important; border-bottom-right-radius: 0!important;background-color: rgb(107,107,107)!important;color:white!important;outline: 0;padding: 10px!important;margin:0!important;border-style:none!important;font-size:22px!important;font-family: Arial, Helvetica, sans-serif!important; box-sizing:unset!important
}
#rueInput::placeholder {color: lightgray!important;opacity: 1!important;}
#rueInput:-ms-input-placeholder {color: lightgray!important}
#rueInput::-ms-input-placeholder {color: lightgray!important}
#rueButton {
  vertical-align: middle!important; height: 45px!important; width: 45px; margin: 0!important; max-height: unset!important; box-shadow: none!important; border-radius: 100px!important; border-top-left-radius: 0!important; border-bottom-left-radius: 0!important; background: url("https://r74n.com/rue/ruemoji.png") no-repeat center; background-size: 30px!important; background-color: rgb(83, 83, 83)!important;border-style:none!important; touch-action:manipulation;
}
#rueButton:hover {
  background: url("https://r74n.com/rue/ruemoji.png") no-repeat center!important; background-size: 30px!important; background-color: rgb(83, 83, 83)!important;
}
#rueButton:active, .rueSleep, #rueButton.rueSleep:hover, .rueBlink {
  background: url("https://r74n.com/rue/rue-blink.png") no-repeat center!important; background-size: 30px!important; background-color: rgb(83, 83, 83)!important;
}
.rueDisabled {
    filter: brightness(0.5);
    cursor: not-allowed!important;
}
.rueDisabled:hover {
    filter: brightness(0.8)!important;
}
#rueMessageBox a {
  color: #00FF00!important;
  font-weight: bold!important;
}
#rueMessageBox a:hover { color: #89ff89!important; }
#rueMessageBox a:active { color: #c4ffc4!important; }
/* anything lower than 600px screen width, make rueBox block */
@media only screen and (max-width: 600px) {
  #rueBox { display: block!important; position: relative!important; padding-right: 0!important; padding-left: 0!important; width: 90%!important; margin-left: auto!important; margin-right: auto!important;}
  #rueBoxIn { margin-left: auto!important; margin-right: auto!important; width: 90%!important; text-align: center!important; }
  #rueInput { width: 76%!important;padding-left: 4%!important;padding-right: 0!important; }
  #rueButton { width: 20%!important;padding-left: 0!important;padding-right: 0!important; }
}
@media only screen and (min-width: 600px) {
    #rueBox.rueWideScreen {
      width: 50%!important;
    }
    #rueBoxIn.rueWideScreen { margin-left: auto!important; margin-right: auto!important; text-align: center!important; }
    #rueInput.rueWideScreen { width: 76%!important;padding-left: 4%!important;padding-right: 0!important; }
    #rueButton.rueWideScreen { width: 20%!important;padding-left: 0!important;padding-right: 0!important; }
}
</style>`);

rueInput = document.getElementById("rueInput");
rueButton = document.getElementById("rueButton");
rueBox = document.getElementById("rueBox");
// if the screen is >600px wide, add .rueBoxCorner to the rueBox
if (!rueBox.classList.contains("rueWideScreen") && window.innerWidth > 600) {
    rueBox.classList.add("rueBoxCorner");
}

var currentURL = window.location.href;
var currentTitle = document.title;
var currentDesc = document.querySelector("meta[name='description']") ? document.querySelector("meta[name='description']").content : "";
var currentImage = (document.querySelector("meta[property='og:image']") ? document.querySelector("meta[property='og:image']").content : "") || (document.querySelector("img") ? document.querySelector("img").src : "");

var rueData = {}

rueData.replacements = {
    "R74n": "R74n",
    "R 7 4 n": "R 7 4 n",
    "R 74 n": "R 74 n",
    "R 74n": "R 74n",
    "R74 n": "R74 n",
    "R 7 4n": "R 7 4n",
    "R7 4n": "R7 4n",
    "R74 n": "R74 n",
    "R74moji": "R74moji",
    "UniSearch": "UniSearch",
    "Mix-Up!": "Mix-Up!",
    "- \\[x\\]": "",
    "- \\[ \\]": "",
}
rueData.commands = {
    "say": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify what I should say!"); return }
        Rue.say(args.join(" ").replaceAll("\\n","\n").replaceAll("\\t","\t").replace(/&lt;\/?br&gt;/g,"\n"));
    },
    "sticky": function(args) {
        Rue.sticky();
        if (args.length === 0) { Rue.say("Sticky mode enabled! My messages will stay here until you type 'unsticky'!") }
        else { Rue.say(args.join(" ")); }
    },
    "unsticky": function() {
        Rue.unsticky();
        Rue.say("Unstickied!")
    },
    "args": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify any arguments!"); return }
        Rue.say(args.join(","));
    },
    "search": function(args) {
        var search = args.join(" ").replace(/^(for) /g, "");
        Rue.openLink("https://r74n.com/search/?q=" + encodeURIComponent(search) +"#gsc.tab=0&gsc.q="+encodeURIComponent(search)+"&gsc.sort=");
    },
    "look up": "=search",
    "query": "=search",
    "google": function(args) {
        var search = args.join(" ").replace(/^(search )?(for) /g, "");
        Rue.openLink("https://www.google.com/search?q=" + encodeURIComponent(search));
    },
    "google images": function(args) {
        var search = args.join(" ").replace(/^(search )?(for) /g, "");
        Rue.openLink("https://www.google.com/search?tbm=isch&q=" + encodeURIComponent(search));
    },
    "gimages": "=google images",
    "gimage": "=google images",
    "google image": "=google images",
    "imagesearch": "=google images",
    "imgsearch": "=google images",
    "gimg": "=google images",
    "google web": function(args) {
        var search = args.join(" ").replace(/^(search )?(for) /g, "");
        Rue.openLink("https://www.google.com/search?udm=14&q=" + encodeURIComponent(search));
    },
    "googleweb": "=google web",
    "gweb": "=google web",
    "websearch": "=google web",
    "udm14": "=google web",
    "google news": function(args) {
        Rue.openLink("https://news.google.com/search?q=" + encodeURIComponent(args.join(" ")));
    },
    "gnews": "=google news",
    "bing": function(args) {
        var search = args.join(" ");
        search = search.replace(/^(search )?(for) /g, "");
        Rue.openLink("https://www.bing.com/search?q=" + encodeURIComponent(search));
    },
    "bing images": function(args) {
        var search = args.join(" ").replace(/^(search )?(for) /g, "");
        Rue.openLink("https://www.bing.com/images/search?q=" + encodeURIComponent(search));
    },
    "bimages": "=bing images",
    "bimage": "=bing images",
    "bing image": "=bing images",
    "bingimg": "=bing images",
    "bimg": "=bing images",
    "wikihow": function(args) {
        var search = args.join(" ").replace(/^(to) /g, "");
        Rue.openLink("https://www.wikihow.com/" + encodeURIComponent(search.replaceAll(" ","-")));
    },
    "csearch": function(args) {
        var search = args.join(" ");
        search = search.replace(/^(for) /g, "");
        Rue.openLink("https://c.r74n.com/search?q=" + encodeURIComponent(search) +"#gsc.tab=0&gsc.q="+encodeURIComponent(search)+"&gsc.sort=");
    },
    "/w(iki)?b(ase)? ?search/": function(args) {
        var search = args.join(" ");
        search = search.replace(/^(for) /g, "");
        Rue.openLink("https://data.r74n.com/w/index.php?search=" + encodeURIComponent(search));
    },
    "sbsearch": function(args) {
        var search = args.join(" ");
        search = search.replace(/^(for) /g, "");
        Rue.openLink("https://sandboxels.wiki.gg/index.php?search=" + encodeURIComponent(search));
    },
    "/qr[ \\-]?(code)?/": function(args) {
        var data = args.join(" ");
        Rue.showMedia("https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=" + encodeURIComponent(data||currentURL), "QR Code coming right up!");
    },
    "save archive": function(args) {
        var data = args.join(" ");
        Rue.openLink("https://web.archive.org/save/" + encodeURIComponent(data||currentURL));
    },
    "archive": function(args) {
        Rue.openLink("https://web.archive.org/web/*/" + (args.join(" ")||currentURL));
    },
    "archived": "=archive",
    "archives": "=archive",
    "wayback": "=archive",
    "wayback machine": "=archive",
    "internet archive": "=archive",
    "archive.org": "=archive",
    "web.archive.org": "=archive",
    "web archive": "=archive",
    "archive.is": function(args) {
        Rue.openLink("https://archive.is/" + (args.join(" ")||currentURL));
    },
    "archive.ph": function(args) {
        Rue.openLink("https://archive.ph/" + (args.join(" ")||currentURL));
    },
    "archive.today": "=archive.ph",
    "save archive.is": function(args) {
        Rue.openLink("https://archive.is/submit/?anyway=1&url=" + (args.join(" ")||currentURL));
    },
    "save archive.ph": function(args) {
        Rue.openLink("https://archive.ph/submit/?anyway=1&url=" + (args.join(" ")||currentURL));
    },
    "save archive.today": "=save archive.ph",
    "/my ?(image|img)/": function(args) {
        var seed = normalizeL2(normalize(args.join(" "))) || Rue.getUser("userSeed");
        Rue.showMedia("https://picsum.photos/seed/"+seed+"/500/400", "This image is unique to "+(args.join(" ")||"you")+"!", "Brought to you by Lorem Picsum");
    },
    "/my ?robot/": function(args) {
        var seed = normalizeL2(normalize(args.join(" "))) || Rue.getUser("userSeed");
        Rue.showMedia("https://robohash.org/"+encodeURIComponent(seed)+".png", "This robot is unique to "+(args.join(" ")||"you")+"!", "Brought to you by RoboHash");
    },
    "/(repeat( (that|it))?|say( (that|it))? again|come again|what)(\\?+)?$/": function() {
        if (Rue.brain.lastMessage) {
            Rue.say(Rue.brain.lastMessage);
        }
        else {
            Rue.say("I didn't say anything!");
        }
    },
    "copy that": function() {
        if (Rue.brain.lastMessage) {
            Rue.say(Rue.brain.lastMessage);
            Rue.copyText(document.getElementById("rueMessageBox").innerText);
            Rue.say("Copied it to ya' clipboard!");
        }
        else { Rue.say("I didn't say anything!"); }
    },
    "copy it": "=copy that",
    "save that": function() {
        if (Rue.brain.lastMessage) {
            Rue.say(Rue.brain.lastMessage);
            Rue.userData.rue.savedResponses.push(document.getElementById("rueMessageBox").innerText.replaceAll("\n"," "));
            Rue.say("Saved the last response! View them with the 'saved responses' command!");
        }
        else { Rue.say("I didn't say anything!"); }
    },
    "saved responses": function() {
        if (Rue.getRue("savedResponses").length === 0) { Rue.say("You don't have any saved responses! Say '{{cmd|save that}}' to save one!"); return }
        Rue.paginate("Below are all the responses you've saved!\n\n" + Rue.getRue("savedResponses").join("\n\n"), 5);
    },
    "refresh": function() {
        location.reload();
    },
    "reload": "=refresh",
    "/print$/": function() {
        Rue.say("Printing!")
        var temp = rueBox.display;
        rueBox.display = "none";
        window.print();
        rueBox.display = temp;
    },
    "/print/": "=say",
    "simon says": "=say",
    "speak": "=say",
    "announce": "=say",
    "parse": "=say",
    "echo": "=say",
    "repeat after me": "=say",
    "call": function(args) {
        var phone = args.join(" ");
        if (phone.match(/(\+?1[ -]?)?\(?(\d{3})\)?[ -]?(\d{3})[ -]?(\d{4})|\d{3}/)) {
            Rue.say("Call " + phone + " with <a href='tel:" + phone.replace(/[^0-9]/g, "") + "'>your phone</a>!");
        }
        else { Rue.say("I can't make calls, but I can provide a link to call them if you specify a phone number!") }
    },
    "facetime": function(args) {
        var phone = args.join(" ");
        if (phone.match(/(\+?1[ -]?)?\(?(\d{3})\)?[ -]?(\d{3})[ -]?(\d{4})|\d{3}/)) {
            Rue.say("FaceTime " + phone + " with <a href='facetime:" + phone.replace(/[^0-9]/g, "") + "'>your Apple device</a>!");
        }
        else { Rue.say("I can't start a FaceTime call, but I can provide a link to call them if you specify a phone number!") }
    },
    "fax": function(args) {
        var phone = args.join(" ");
        if (phone.match(/(\+?1[ -]?)?\(?(\d{3})\)?[ -]?(\d{3})[ -]?(\d{4})|\d{3}/)) {
            Rue.say("Fax " + phone + " with <a href='fax:" + phone.replace(/[^0-9]/g, "") + "'>your default application</a>!");
        }
        else { Rue.say("I can't start a fax transmission, but I can provide a link to fax them if you specify a number!") }
    },
    "email": function(args) {
        var email = args[0];
        var message = args.slice(1).join(" ");
        Rue.say("Email this address with your {{link:mailto:"+email+"?body="+encodeURI(message)+"|default email service}}, or use one of the following:\n\n"+
            "{{link:https://mail.google.com/mail/?fs=1&tf=cm&to="+email+"&body="+encodeURI(message)+"|Gmail}}\n"+
            "{{link:https://outlook.live.com/owa/?path=/mail/action/compose&to="+email+"&body="+encodeURI(message)+"|Outlook}}\n"+
            "{{link:https://mail.yahoo.com/d/compose/"+email+"?body="+encodeURI(message)+"|Yahoo Mail}}\n"+
            "{{link:https://mail.protonmail.com/compose?to="+email+"&body="+encodeURI(message)+"|ProtonMail}}\n"+
            "{{link:https://mail.zoho.com/zm/#mail/compose/"+email+"?body="+encodeURI(message)+"|Zoho Mail}}\n"+
            "{{link:https://mail.yandex.com/compose?to="+email+"&body="+encodeURI(message)+"|Yandex Mail}}\n"+
            "{{link:https://mail.aol.com/webmail-std/en-us/compose-message?to="+email+"&body="+encodeURI(message)+"|AOL Mail}}\n"
        );
    },
    "email to": "=email",
    "define": function(args) {
        var word = args.join(" ");
        Rue.openLink("https://en.wiktionary.org/w/index.php?go=Go&search=" + encodeURIComponent(word));
    },
    "dictionary": "=define",
    "wiktionary": "=define",
    "def": "=define",
    "urban dictionary": function(args) {
        if (!Rue.getUser("over18")) { Rue.error("{{r:[under18]}}"); return}
        Rue.openLink("https://www.urbandictionary.com/define.php?term=" + encodeURIComponent(args.join(" ")||"R74n"));
    },
    "udefine": "=urban dictionary",
    "uddefine": "=urban dictionary",
    "defineud": "=urban dictionary",
    "ud": "=urban dictionary",
    "wikipedia": function(args) {
        Rue.openLink("https://en.wikipedia.org/w/index.php?go=Go&search=" + encodeURIComponent(args.join(" ")));
    },
    "wp": "=wikipedia",
    "wikipedia.org": "=wikipedia",
    "wolfram": function(args) {
        Rue.openLink("https://www.wolframalpha.com/input/?i=" + encodeURIComponent(args.join(" ")));
    },
    "wolframalpha": "=wolfram",
    "tenor": function(args) {
        Rue.openLink("https://tenor.com/search/" + encodeURIComponent(args.join(" ")));
    },
    "giphy": function(args) {
        Rue.openLink("https://giphy.com/search/" + encodeURIComponent(args.join(" ")));
    },
    "title": function(args) {
        if (args.length === 0) { rueData.totalities.title(); return }
        Rue.say("{{title:"+args.join(" ")+"}}");
    },
    "/title( ?case)?/": "=title",
    "/lower( ?case)?/": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify what I should say!"); return }
        Rue.say(args.join(" ").toLowerCase());
    },
    "/upper( ?case)?/": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify what I should say!"); return }
        Rue.say(args.join(" ").toUpperCase());
    },
    "/capitali[sz]e/": "=/upper( ?case)?/",
    "spread": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify what I should say!"); return }
        var count = 1;
        if (args[0].match(/^\d+$/)) {
            count = parseInt(args[0]);
            args.shift();
        }
        var arg = args.join(" ");
        Rue.say([...arg].join("&nbsp;".repeat(count)));
    },
    "/http[ \\.]?cat/": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a status code! (100-599)"); return }
        var code = args[0];
        if (code.match(/^[1-5][0-9][0-9]$/)) {
            Rue.showMedia("https://http.cat/"+code+".jpg", "Unique cat for status "+args[0]+"!", "Brought to you by HTTP Cats");
        }
        else { Rue.error("That's not a valid status code! (100-599)"); }
    },
    "/http[ \\.]?dog/": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify an status code! (100-599)"); return }
        var code = args[0];
        if (code.match(/^[1-5][0-9][0-9]$/)) {
            Rue.showMedia("https://http.dog/"+code+".jpg", "Unique dog for status "+args[0]+"!", "Brought to you by HTTP Status Dogs");
        }
        else { Rue.error("That's not a valid status code! (100-599)"); }
    },
    "/http[ \\.]?garden/": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify an status code! (100-599)"); return }
        var code = args[0];
        if (code.match(/^[1-5][0-9][0-9]$/)) {
            Rue.showMedia("https://http.garden/"+code+".jpg", "Unique garden for status "+args[0]+"!", "Brought to you by HTTP.Garden");
        }
        else { Rue.error("That's not a valid status code! (100-599)"); }
    },
    "8ball": function(args) {
        if (args.length === 0) { Rue.error("You didn't ask a question!"); return }
        var question = args.join(" ");
        if (question.match(/^(when|why|who|how)/i)) { Rue.error("That's not a yes or no question!"); return }
        question = ultraNormalize(question);
        Rue.say("🎱 My 8-Ball says.. " + seedChoose(["Yes","No","{{c:Absolutely|Definitely}}","{{c:Absolutely|Definitely}} not","Maybe"],question)+"!");
    },
    "8-ball": "=8ball",
    "eightball": "=8ball",
    "dice": function(args) {
        var sides = 6;
        var rollCount = 1;
        var cmd = args.join("d").replace(/[,]/g,"d")||"1d6";
        if (cmd.match(/^\d+$/)) {
            cmd = "1d"+cmd
        }
        if (cmd.match(/(\d+)?d(\d+)?/)) {
            var split = cmd.split("d");
            rollCount = parseInt(split[0]);
            if (isNaN(rollCount)) rollCount = 1;
            sides = parseInt(split[1]);
            if (isNaN(sides)) sides = 6;
        }
        else {
            Rue.error("That's not a number!"); return
        }
        var rolls = [];
        var rollTotal = 0;
        for (let r = 0; r < rollCount; r++) {
            rollTotal += rolls[rolls.push(Math.floor(Math.random()*sides+1))-1];
        }
        if (rollCount === 1) { Rue.say("🎲 You rolled a " + rolls[0] + "!"); }
        else { Rue.say("🎲 You rolled a " + rollTotal + "! ("+rolls.join("+")+")"); }
    },
    "/(roll( ?a)? ?)?dic?es?( ?roll)?|roll/": "=dice",
    "deal card": function(args) {
        var amount = parseInt(args[0] || 1);
        if (isNaN(amount)) { Rue.error("That's not a number!"); return }
        if (!Rue.brain.cardDeck) { Rue.brain.cardDeck = ["Ace of Hearts","2 of Hearts","3 of Hearts","4 of Hearts","5 of Hearts","6 of Hearts","7 of Hearts","8 of Hearts","9 of Hearts","10 of Hearts","Jack of Hearts","Queen of Hearts","King of Hearts","Ace of Spades","2 of Spades","3 of Spades","4 of Spades","5 of Spades","6 of Spades","7 of Spades","8 of Spades","9 of Spades","10 of Spades","Jack of Spades","Queen of Spades","King of Spades","Ace of Diamonds","2 of Diamonds","3 of Diamonds","4 of Diamonds","5 of Diamonds","6 of Diamonds","7 of Diamonds","8 of Diamonds","9 of Diamonds","10 of Diamonds","Jack of Diamonds","Queen of Diamonds","King of Diamonds","Ace of Clubs","2 of Clubs","3 of Clubs","4 of Clubs","5 of Clubs","6 of Clubs","7 of Clubs","8 of Clubs","9 of Clubs","10 of Clubs","Jack of Clubs","Queen of Clubs","King of Clubs"]; }
        var message = "";
        for (var i = 0; i < amount; i++) {
            if (Rue.brain.cardDeck.length === 0) { message += "There are no more cards!\n"; break }
            var card = Rue.brain.cardDeck[0];
            message += card+"\n";
            Rue.brain.cardDeck.splice(0,1);
        }
        Rue.say("Your cards:\n\n"+message+"\nReset the deck with 'reset deck'!");
    },
    "deal cards": "=deal card",
    "playing card": "=deal card",
    "playing cards": "=deal card",
    "pick cards": "=deal card",
    "pick card": "=deal card",
    "pick a card": "=deal card",
    "card pick": "=deal card",
    "reset deck": function() {
        Rue.brain.cardDeck = ["Ace of Hearts","2 of Hearts","3 of Hearts","4 of Hearts","5 of Hearts","6 of Hearts","7 of Hearts","8 of Hearts","9 of Hearts","10 of Hearts","Jack of Hearts","Queen of Hearts","King of Hearts","Ace of Spades","2 of Spades","3 of Spades","4 of Spades","5 of Spades","6 of Spades","7 of Spades","8 of Spades","9 of Spades","10 of Spades","Jack of Spades","Queen of Spades","King of Spades","Ace of Diamonds","2 of Diamonds","3 of Diamonds","4 of Diamonds","5 of Diamonds","6 of Diamonds","7 of Diamonds","8 of Diamonds","9 of Diamonds","10 of Diamonds","Jack of Diamonds","Queen of Diamonds","King of Diamonds","Ace of Clubs","2 of Clubs","3 of Clubs","4 of Clubs","5 of Clubs","6 of Clubs","7 of Clubs","8 of Clubs","9 of Clubs","10 of Clubs","Jack of Clubs","Queen of Clubs","King of Clubs"];
        Rue.brain.cardDeck.sort(function() { return 0.5 - Math.random() });
        Rue.say("The deck of cards has been reset!");
    },
    "reset cards": "=reset deck",
    "shuffle deck": function() {
        if (!Rue.brain.cardDeck) { rueData.commands["reset deck"]() }
        Rue.brain.cardDeck.sort(function() { return 0.5 - Math.random() });
        Rue.say("The deck of cards has been shuffled!");
    },
    "shuffle cards": "=shuffle deck",
    "remaining deck": function() {
        if (!Rue.brain.cardDeck) { rueData.commands["reset deck"]() }
        if (Rue.brain.cardDeck.length === 0) { Rue.say("There are no more cards! Reset the deck with 'reset deck'!"); return }
        Rue.say("There are " + Rue.brain.cardDeck.length + " cards left in the deck:\n\n" + Rue.brain.cardDeck.join("\n") + ".\n\nReset the deck with 'reset deck'!");
    },
    "remaining cards": "=remaining deck",
    "current deck": "=remaining deck",
    "/((rand(om)? ?)?num(ber)?|rng|range) ?(between|from)?/": function(args) {
        var min = 1;
        var max = 100;
        if (args.length === 1) {
            if (args[0].indexOf("-") !== -1) {
                var args = args[0].split("-");
                min = parseInt(args[0]);
                max = parseInt(args[1]);
            }
            else { max = parseInt(args[0]); }
        }
        else if (args.length === 2) { min = parseInt(args[0]); max = parseInt(args[1]); }
        else if (args.length === 3) { min = parseInt(args[0]); max = parseInt(args[2]); }
        if (isNaN(min) || isNaN(max)) { Rue.error("You entered an invalid number range!"); return }
        Rue.say("Your random number is " + Math.floor(Math.random()*(max-min+1)+min) + "!");
    },
    "generate password": function(args) {
        var count = limitNum(parseInt(args[0]) || 16);
        Rue.say("I wouldn't use a password from a chatbot, but..\n\n" + "{{randchar}}".repeat(count));
    },
    "password gen": "=generate password",
    "passgen": "=generate password",
    "gen password": "=generate password",
    "random letter": function(args) {
        var count = limitNum(parseInt(args[0]) || 1);
        Rue.say("{{cc:qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM}}".repeat(count));
    },
    "random lowercase": function(args) {
        var count = limitNum(parseInt(args[0]) || 1);
        Rue.say("{{cc:qwertyuiopasdfghjklzxcvbnm}}".repeat(count));
    },
    "random uppercase": function(args) {
        var count = limitNum(parseInt(args[0]) || 1);
        Rue.say("{{cc:QWERTYUIOPASDFGHJKLZXCVBNM}}".repeat(count));
    },
    "randletter": "=random letter",
    "random digit": function(args) {
        var count = limitNum(parseInt(args[0]) || 1);
        Rue.say("{{cc:0123456789}}".repeat(count));
    },
    "randdigit": "=random digit",
    "random punctuation": function(args) {
        var count = limitNum(parseInt(args[0]) || 1);
        Rue.say("{{cc:`~!@#$%^&*()-_=+[]{};:'\",./?}}".repeat(count));
    },
    "randpunc": "=random punctuation",
    "random symbol": "=random punctuation",
    "random character": function(args) {
        var count = limitNum(parseInt(args[0]) || 1);
        Rue.say("{{cc:qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789`~!@#$%^&*()-_=+[]{};:'\",./?}}".repeat(count));
    },
    "randchar": "=random character",
    "/(rue)?coin ?flip|flip a (rue)?coin|heads or tails/": function() {
        var result = chooseItem(["heads","tails"]);
        Rue.say("🪙 You flipped a " + result + "!");
        Rue.addUser("flips:" + result, 1);
    },
    "/choose( from| either| between)?/": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify any options!"); return }
        args = args.filter(function(item) { return item !== "or" && item !== "and" });
        Rue.say("I choose " + chooseItem(args).replace(/,$/,"") + "!");
    },
    "sort": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify any values!"); return }
        args = args.join(" ").replaceAll(","," ").split(" ");
        var delim = ", ";
        if (args.length === 1) { args = [...args[0]]; delim = "" }
        Rue.say("I sorted your values and got..\n\n" + args.sort().join(delim).replace(/,{2,}/g,","));
    },
    "shuffle": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify any values!"); return }
        args = args.join(" ").replaceAll(","," ").split(" ");
        var delim = ", ";
        if (args.length === 1) { args = [...args[0]]; delim = "" }
        Rue.say("I shuffled your values and got..\n\n" + args.sort( () => .5 - Math.random() ).join(delim).replace(/,{2,}/g,","));
    },
    "count": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify any values!"); return }
        args = args.join(" ").replaceAll(","," ").split(" ");
        Rue.say("This text has "+args.length+" word(s)!");
    },
    "count words": "=count",
    "word count": "=count",
    "wordcount": "=count",
    "char count": function(args) {
        var arg = args.join(" ");
        Rue.say("This text has "+[...arg].length+" character(s)!");
    },
    "charcount": "=char count",
    "character count": "=char count",
    "len": "=char count",
    "length": "=char count",
    "ping": function(args) {
        var url = (args[0] || currentURL) + "?ping=" + Math.random();
        var start = Date.now();
        // fetch the url and get the time it took
        fetch(url).then(function() {
            var time = Date.now() - start;
            Rue.say("Pong! (" + time + "ms)");
        }).catch(function() {
            Rue.error("I couldn't reach that URL!");
        })
    },
    "pong": "=ping",
    "fetch": "=ping",
    "inv": function(args) {
        var item = args.join(" ").toLowerCase();
        var message = "";
        var total = 0;
        if (!item) {
            for (var key in Rue.userData.user.inv) {
                message += key.toTitleCase() + " (" + Rue.userData.user.inv[key] + ")\n";
                total += Rue.userData.user.inv[key];
            }
            message = message.slice(0,-1);
            if (total === 0) { Rue.say("You don't have any items!"); return}
            Rue.paginate("Below are all the items ya' have! ("+Object.keys(Rue.userData.user.inv).length+" Unique, "+total+" Total)\n\n" + message);
        }
        else {
            if (Rue.getItem(item) === 0) { Rue.say("You don't have any " + item.toTitleCase() + "!"); return }
            Rue.say("You have " + Rue.getItem(item) + " " + item.toTitleCase() + "!");
        }
    },
    "inventory": "=inv",
    "bag": "=inv",
    "items": "=inv",
    "throw away": function(args) {
        var amount = 1;
        var item = args.join(" ");
        if (args.length > 1 && !isNaN(parseInt(args[args.length-1]))) {
            amount = parseInt(args[args.length-1]);
            item = args.slice(0,-1).join(" ");
        }
        if (!item) { Rue.error("You didn't specify what to throw away!"); return }
        if (!amount) { Rue.error("You didn't specify a valid amount!"); return }
        item = item.toLowerCase();
        if (Rue.getItem(item) < amount) { Rue.error("You don't have that many " + item.toTitleCase() + "! (You have " + Rue.getItem(item) + ")"); return }
        Rue.confirm("Are you sure you wanna permanently throw away " + amount + " " + item.toTitleCase() + "?", function() {
            Rue.delItem(item, amount);
            Rue.say("You threw away " + amount + " " + item.toTitleCase() + "!");
        })
    },
    "throw out": "=throw away",
    "trash": "=throw away",
    "gamble": function(args) {
        if (!Rue.getUser("over18")) { Rue.error("{{r:[under18]}}"); return}
        var amount = parseFloat(args[0]);
        if (isNaN(amount) || amount <= 0) { Rue.error("You didn't specify a valid amount!"); return }
        if (Rue.getItem("ruecoin") < amount) { Rue.error("You don't have that many Ruecoins! (You have {{ruecoin}}" + Rue.getItem("ruecoin") + ")"); return }
        // 50% chance of losing the amount, 50% chance of winning 2x the amount
        if (Math.random() < 0.5) {
            Rue.delItem("ruecoin", amount);
            Rue.addUser("losses");
            Rue.addUser("losses:gamble");
            Rue.say("You lost ya' bet of {{ruecoin}}" + amount + ".. No refunds! ({{ruecoin}}" + Rue.getItem("ruecoin") + ")");
        }
        else {
            Rue.addItem("ruecoin", amount);
            Rue.addUser("wins");
            Rue.addUser("wins:gamble");
            Rue.success("You doubled ya' bet and won {{ruecoin}}" + amount + "! ({{ruecoin}}" + Rue.getItem("ruecoin") + ")");
        }
    },
    "gamba": "=gamble",
    "slots": function(args) {
        if (!Rue.getUser("over18")) { Rue.error("{{r:[under18]}}"); return}
        // 10% chance for 90% payout
        var amount = parseFloat(args[0] || 0.10);
        if (isNaN(amount) || amount <= 0) { Rue.error("You didn't specify a valid amount!"); return }
        if (Rue.getItem("ruecoin") < amount) { Rue.error("You don't have enough Ruecoins! (You have {{ruecoin}}" + Rue.getItem("ruecoin") + ")"); return }
        Rue.confirm("Are you sure you wanna play slots for {{ruecoin}}" + amount + "?", function() {
            var slotEmoji = {1:"🍋",2:"🍇",3:"🍉",4:"🍊",5:"🍒",6:"🔔",7:"💎"};
            var slot1 = chooseItem([1,2,3,4,5,6,7]);
            var slot2 = chooseItem([1,2,3,4,5,6,7]);
            var slot3 = chooseItem([1,2,3,4,5,6,7]);
            var slots = slotEmoji[slot1] + " " + slotEmoji[slot2] + " " + slotEmoji[slot3];
            if (slot1 === slot2 && slot2 === slot3) {
                Rue.addItem("ruecoin", amount*9);
                Rue.addUser("wins"); Rue.addUser("wins:slots");
                Rue.success(slots + "\n\nYou won {{ruecoin}}" + amount*9 + "! ({{ruecoin}}" + Rue.getItem("ruecoin") + ")");
            }
            else {
                Rue.delItem("ruecoin", amount);
                Rue.addUser("losses"); Rue.addUser("losses:slots");
                Rue.say(slots + "\n\nYou lost {{ruecoin}}" + amount + ".. Better luck next time! ({{ruecoin}}" + Rue.getItem("ruecoin") + ")");
            }
        })
    },
    "slot machine": "=slots",
    "lottery": function() {
        if (!Rue.getUser("over18")) { Rue.error("{{r:[under18]}}"); return}
        if (Rue.getItem("ruecoin") < 2) { Rue.error("You don't have enough Ruecoins! A lottery ticket costs {{ruecoin}}2.."); return }
        Rue.confirm("Wanna buy a lottery ticket for {{ruecoin}}2? (You have {{ruecoin}}" + Rue.getItem("ruecoin") + ")", function() {
            Rue.delItem("ruecoin", 2);
            var numbers = "{{rng}}{{rng}} {{rng}}{{rng}} {{rng}}{{rng}} {{rng}}{{rng}} {{rng}}{{rng}} {{rng}}{{rng}}";
            if (Math.random() < 0.0000033333333333333333) {
                Rue.addItem("ruecoin", 200000);
                Rue.addUser("wins"); Rue.addUser("wins:lottery");
                Rue.success(numbers+"\n\nYou won the lottery and got {{ruecoin}}200,000! ({{ruecoin}}");
            }
            else {
                Rue.addUser("losses"); Rue.addUser("losses:lottery");
                Rue.say(numbers+"\n\nYou didn't win the lottery.. Better luck next time!");
            }
        })
    },
    "calculate": function(args) {
        var result = Rue.calculate(args.join(" "));
        if (result === null) { Rue.error("I don't understand this expression!"); return }
        Rue.say(result);
    },
    "calc": "=calculate",
    "eval": "=calculate",
    "evaluate": "=calculate",
    "math": "=calculate",
    "calculation": "=calculate",
    "calculator": "=calculate",
    "rate": function(args) {
        var thing = ultraNormalize(args.join(" "));
        if (!thing) { Rue.error("You didn't specify what to rate!"); return }
        Rue.say("Hmm.. I{{c:'ll|}} {{c:rate|give}} " + args.join(" ") + " a " + seedRange(0,10,"rueRate--"+thing) + "/10!");
    },
    "rate me": function() {
        Rue.say("Hmm.. I{{c:'ll|}} {{c:rate|give}} you a " + seedRange(0,10,"rueRate--"+Rue.getUser("userSeed")) + "/10!");
    },
    "rateme": "=rate me",
    "santa says": function(args) {
        var thing = ultraNormalize(args.join(" "));
        if (!thing) {
            let nice = seedChoose([true,false],"rueSantaSays--"+Rue.getUser("userSeed"));
            Rue.say((nice ? "happy" : "angry") + ">>>Hmm.. It {{c:look|seem}}s like you're on the " + (nice ? "nice" : "naughty") + " list!");
            return;
        }
        let nice = seedChoose([true,false],"rueSantaSays--"+thing);
        Rue.say((nice ? "happy" : "angry") + ">>>Hmm.. It {{c:look|seem}}s like " + args.join(" ") + " is on the " + (nice ? "nice" : "naughty") + " list!");
    },
    "tts": function(args) {
        if (!('speechSynthesis' in window)) { Rue.error("Awkward.. Your browser doesn't support text to speech!! :("); return }
        var text = args.join(" ");
        var msg = new SpeechSynthesisUtterance();
        if (!text) {
            msg.text = "You didn't specify what to say!";
            window.speechSynthesis.speak(msg);
            Rue.error("You didn't specify what to say!");
        }
        else {
            msg.text = text;
            window.speechSynthesis.speak(msg);
            Rue.say(text, true);
        }
    },
    "text to speech": "=tts",
    "texttospeech": "=tts",
    "t2s": "=tts",
    "pronounce": "=tts",
    "enunciate": "=tts",
    "annunciate": "=tts",
    "sound out": "=tts",
    "mcserver": function(args) {
        var address = args.join(" ");
        if (!address) { Rue.error("You didn't specify a Minecraft: Java Edition IP address!"); return }
        // call https://api.mcsrvstat.us/2/
        Rue.callAPI("https://api.mcsrvstat.us/2/"+address, function(data) {
            if (data.online) {
                Rue.say(address+" is online with "+data.players.online+" players!\n\nVersion: "+data.version+"!");
            }
            else {
                Rue.say(address+" if offline..")
            }
        })
    },
    "translate": function(args) {
        var text = args.join(" ");
        if (text.match(/^https?:\/\//)) { rueData.commands["translate page"](args); return }
        Rue.openLink("https://translate.google.com/?sl=auto&tl=en&op=translate&text=" + encodeURIComponent(text));
    },
    "gtranslate": "=translate",
    "google translate": "=translate",
    "tl": "=translate",
    "yatranslate": function(args) {
        var text = args.join(" ");
        if (text.match(/^https?:\/\//)) { rueData.commands["yatranslate page"](args); return }
        Rue.openLink("https://translate.yandex.com/?source_lang=auto&target_lang=en&text=" + encodeURIComponent(text));
    },
    "me": function(args) {
        var text = args.join(" ");
        Rue.say("{{act:"+text+"}}");
    },
    "cookie": function(args) {
        // set cookie args[0] to args[1]
        if (args.length === 0) { Rue.error("You didn't specify a cookie name!"); return }
        if (args.length === 1) {
            var match = document.cookie.match(new RegExp('(^| )' + args[0] + '=([^;]+)'));
            if (match) { Rue.say("The value of the cookie '" + args[0] + "' is '" + match[2] + "'!"); }
            else { Rue.say("The cookie '" + args[0] + "' doesn't exist!"); }
        }
        else { // set the cookie
            var name = args[0];
            var value = args.slice(1).join(" ");
            document.cookie = name + "=" + value + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
            Rue.say("Set the cookie '" + name + "' to '" + value + "'!");
        }
    },
    "translate page": function(args) {
        Rue.openLink("https://translate.google.com/translate?hl=en&sl=auto&tl=en&u=" + encodeURIComponent(args.join(" ")||currentURL));
    },
    "proxy": "=translate page",
    "translate web": "=translate page",
    "yatranslate page": function(args) {
        Rue.openLink("https://translate.yandex.com/translate?lang=en&url=" + encodeURIComponent(args.join(" ")||currentURL));
    },
    "yaproxy": "=yatranslate page",
    "yatranslate web": "=yatranslate page",
    "similarweb": function(args) {
        var hostname = args.join(" ");
        hostname = urlToHostname(hostname);
        Rue.openLink("https://www.similarweb.com/website/" + hostname||location.hostname);
    },
    "cache": function(args) {
        Rue.openLink("https://webcache.googleusercontent.com/search?q=cache:" + encodeURIComponent(args.join(" ")||currentURL));
    },
    "cached": "=cache",
    "whois": function(args) {
        Rue.openLink("https://whois.domaintools.com/" + encodeURIComponent(args.join(" ")||currentURL));
    },
    "speedtest": function(args) {
        Rue.openLink("https://developers.google.com/speed/pagespeed/insights/?url=" + encodeURIComponent(args.join(" ")||currentURL));
    },
    "pagespeed": "=speedtest",
    "speed test": "=speedtest",
    "pin": function(args) {
        var url = args.join(" ");
        if (url) {
            Rue.openLink("https://pinterest.com/pin/create/button/?url=" + encodeURIComponent(url));
        }
        else {
            //http://pinterest.com/pin/create/button/?url={URI-encoded URL of the page to pin}&media={URI-encoded URL of the image to pin}&description={optional URI-encoded description}
            Rue.openLink("https://pinterest.com/pin/create/button/?url=" + encodeURIComponent(currentURL) + "&media=" + encodeURIComponent(currentImage) + "&description=" + encodeURIComponent(currentTitle + "-" + currentDesc));
        }
    },
    "tinyurl": function(args) {
        Rue.openLink("https://tinyurl.com/create.php?url=" + encodeURIComponent(args.join(" ")||currentURL));
    },
    "unshorten": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a link to unshorten!"); return }
        Rue.callAPI("https://unshorten.me/json/" + args[0], function(data) {
            Rue.say("This URL goes to:\n\n{{link:"+data.resolved_url+"}}");
        })
    },
    "google lens": function(args) {
        var url = args.join(" ");
        if (!url) { Rue.error("You didn't specify an image URL!"); return }
        Rue.openLink("https://lens.google.com/uploadbyurl?url=" + encodeURIComponent(url));
    },
    "glens": "=google lens",
    "website": function(args) {
        if (args.length === 0) {
            if (!window.location.hostname) { Rue.error("Doesn't look like you're on a website!"); return }
            Rue.say("You are on " + window.location.hostname + "!");
            return;
        }
        var url = urlToHostname(args.join(" "));
        Rue.say("That is " + url + "!");
    },
    "hostname": "=website",
    "host": "=website",
    "domain": "=website",
    "host name": "=website",
    "site": "=website",
    "schema validator": function(args) {
        Rue.openLink("https://validator.schema.org/#url=" + encodeURIComponent(args.join(" ")||currentURL));
    },
    "add alias": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify an alias name!"); return }
        if (args.length === 1) { Rue.error("You didn't specify a command to run!"); return }
        var alias = args[0].toLowerCase();
        var command = args.slice(1).join(" ");
        Rue.userData.user.commandAliases[alias] = command;
        Rue.changedUserData();
        Rue.say("Added the alias '" + alias + "'!");
    },
    "new alias": "=add alias",
    "create alias": "=add alias",
    "remove alias": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify an alias name!"); return }
        var alias = args.join(" ").toLowerCase();
        if (!Rue.userData.user.commandAliases[alias]) { Rue.error("That alias doesn't exist!"); return }
        delete Rue.userData.user.commandAliases[alias];
        Rue.changedUserData();
        Rue.say("Removed the alias '" + alias + "'!");
    },
    "delete alias": "=remove alias",
    "del alias": "=remove alias",
    "rm alias": "=remove alias",
    "rename alias": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify an alias name!"); return }
        if (args.length === 1) { Rue.error("You didn't specify a new name!"); return }
        var alias = args[0].toLowerCase();
        var newAlias = args.slice(1).join(" ").toLowerCase();
        if (!Rue.userData.user.commandAliases[alias]) { Rue.error("That alias doesn't exist!"); return }
        Rue.userData.user.commandAliases[newAlias] = Rue.userData.user.commandAliases[alias];
        delete Rue.userData.user.commandAliases[alias];
        Rue.changedUserData();
        Rue.say("Renamed the alias '" + alias + "' to '" + newAlias + "'!");
    },
    "alias": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify an alias to check!"); return }
        var alias = args.join(" ").toLowerCase();
        if (!Rue.userData.user.commandAliases[alias]) { Rue.error("That alias doesn't exist!"); return }
        Rue.say("The command for the alias '" + alias + "' is:\n\n" + Rue.userData.user.commandAliases[alias], {parse:false});
    },
    "check alias": "=alias",
    "add tag": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a tag name!"); return }
        if (args.length === 1) { Rue.error("You didn't specify a text response!"); return }
        var tag = args[0].toLowerCase();
        var response = args.slice(1).join(" ");
        Rue.userData.user.customTags[tag] = response;
        Rue.changedUserData();
        Rue.say("Added the tag '" + tag + "'!");
    },
    "new tag": "=add tag",
    "create tag": "=add tag",
    "remove tag": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a tag name!"); return }
        var tag = args.join(" ").toLowerCase();
        if (!Rue.userData.user.customTags[tag]) { Rue.error("That tag doesn't exist!"); return }
        delete Rue.userData.user.customTags[tag];
        Rue.changedUserData();
        Rue.say("Removed the tag '" + tag + "'!");
    },
    "delete tag": "=remove tag",
    "del tag": "=remove tag",
    "rm tag": "=remove tag",
    "rename tag": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a tag name!"); return }
        if (args.length === 1) { Rue.error("You didn't specify a new name!"); return }
        var tag = args[0].toLowerCase();
        var newTag = args.slice(1).join(" ").toLowerCase();
        if (!Rue.userData.user.customTags[tag]) { Rue.error("That tag doesn't exist!"); return }
        Rue.userData.user.customTags[newTag] = Rue.userData.user.customTags[tag];
        delete Rue.userData.user.customTags[tag];
        Rue.changedUserData();
        Rue.say("Renamed the tag '" + tag + "' to '" + newTag + "'!");
    },
    "tag": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a tag to check!"); return }
        var tag = args.join(" ").toLowerCase();
        if (!Rue.userData.user.customTags[tag]) { Rue.error("That tag doesn't exist!"); return }
        Rue.say("The content of the tag '" + tag + "' is:\n\n" + Rue.userData.user.customTags[tag], {parse:false});
    },
    "check tag": "=tag",
    "append tag": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a tag name!"); return }
        if (args.length === 1) { Rue.error("You didn't specify text to add!"); return }
        var tag = args[0].toLowerCase();
        var text = args.slice(1).join(" ");
        if (!Rue.userData.user.customTags[tag]) { Rue.error("That tag doesn't exist!"); return }
        if (!text.match(/^\s/)) { text = " " + text }
        Rue.userData.user.customTags[tag] += text;
        Rue.changedUserData();
        Rue.say("Appended the text to the tag '" + tag + "'!");
    },
    "add link": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a link name!"); return }
        if (args.length === 1) { Rue.error("You didn't specify a link!"); return }
        var link = args[0].toLowerCase();
        var url = args.slice(1).join(" ");
        Rue.userData.user.customLinks[link] = url;
        Rue.changedUserData();
        Rue.say("Added the link '" + link + "'!");
    },
    "new link": "=add link",
    "create link": "=add link",
    "remove link": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a link name!"); return }
        var link = args.join(" ").toLowerCase();
        if (!Rue.userData.user.customLinks[link]) { Rue.error("That link doesn't exist!"); return }
        delete Rue.userData.user.customLinks[link];
        Rue.changedUserData();
        Rue.say("Removed the link '" + link + "'!");
    },
    "delete link": "=remove link",
    "del link": "=remove link",
    "rm link": "=remove link",
    "rename link": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a link name!"); return }
        if (args.length === 1) { Rue.error("You didn't specify a new name!"); return }
        var link = args[0].toLowerCase();
        var newLink = args.slice(1).join(" ").toLowerCase();
        if (!Rue.userData.user.customLinks[link]) { Rue.error("That link doesn't exist!"); return }
        Rue.userData.user.customLinks[newLink] = Rue.userData.user.customLinks[link];
        delete Rue.userData.user.customLinks[link];
        Rue.changedUserData();
        Rue.say("Renamed the link '" + link + "' to '" + newLink + "'!");
    },
    "check link": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a link to check!"); return }
        var link = args.join(" ").toLowerCase();
        if (!Rue.userData.user.customLinks[link]) { Rue.error("That link doesn't exist!"); return }
        Rue.say("The link '" + link + "' goes to:\n\n{{link:" + Rue.userData.user.customLinks[link]+"}}");
    },
    "add list": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a list name!"); return }
        if (args.length === 1) { Rue.error("You didn't specify any items to add!"); return }
        var items = args.slice(1).join(" ").split(/( +)?,( +)?/g);
        var list = args[0].toLowerCase();
        var total = 0;
        if (!Rue.userData.user.lists[list]) { Rue.userData.user.lists[list] = [] }
        for (var i=0; i<items.length; i++) {
            var item = items[i];
            if (!item || !item.trim()) { continue }
            // if the item isn't already in the list, add it
            if (Rue.userData.user.lists[list].indexOf(item) === -1) {
                Rue.userData.user.lists[list].push(item);
                total++;
            }
        }
        Rue.changedUserData();
        Rue.say("Added " + total + " item(s) to the list '" + list + "'!");
    },
    "new list": "=add list",
    "create list": "=add list",
    "remove list": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a list name!"); return }
        if (args.length === 1) { Rue.error("You didn't specify any items to remove!"); return }
        var items = args.slice(1).join(" ").split(/( +)?,( +)?/g);
        var list = args[0].toLowerCase();
        if (!Rue.userData.user.lists[list]) { Rue.error("That list doesn't exist!"); return }
        var total = 0;
        for (var i=0; i<items.length; i++) {
            var item = items[i];
            if (!item || !item.trim()) { continue }
            // if the item is in the list, remove it
            if (Rue.userData.user.lists[list].indexOf(item) !== -1) {
                Rue.userData.user.lists[list].splice(Rue.userData.user.lists[list].indexOf(item), 1);
                total++;
            }
        }
        Rue.changedUserData();
        Rue.say("Removed " + total + " item(s) from the list '" + list + "'!");
    },
    "delete list": "=clear list",
    "del list": "=clear list",
    "rm list": "=remove list",
    "rename list": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a list name!"); return }
        if (args.length === 1) { Rue.error("You didn't specify a new name!"); return }
        var list = args[0].toLowerCase();
        var newList = args.slice(1).join(" ").toLowerCase();
        if (!Rue.userData.user.lists[list]) { Rue.error("That list doesn't exist!"); return }
        Rue.userData.user.lists[newList] = Rue.userData.user.lists[list];
        delete Rue.userData.user.lists[list];
        Rue.changedUserData();
        Rue.say("Renamed the list '" + list + "' to '" + newList + "'!");
    },
    "check list": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a list to view!"); return }
        var list = args.join(" ").toLowerCase();
        if (!Rue.userData.user.lists[list]) { Rue.error("That list doesn't exist!"); return }
        Rue.paginate("The list '" + list + "' contains:\n\n" + Rue.userData.user.lists[list].join("\n"));
    },
    "see list": "=check list",
    "view list": "=check list",
    "open list": "=check list",
    "clear list": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a list to delete!"); return }
        var list = args.join(" ").toLowerCase();
        if (!Rue.userData.user.lists[list]) { Rue.error("That list doesn't exist!"); return }
        Rue.confirm("Are you sure you wanna delete the list '" + list + "'?", function() {
            delete Rue.userData.user.lists[list];
            Rue.changedUserData();
            Rue.say("Deleted the list '" + list + "'!");
        })
    },
    "add counter": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a counter name!"); return }
        var start = 0;
        if (args.length > 1) {
            start = parseInt(args[1]);
            if (isNaN(start)) { Rue.error("That's not a valid number!"); return }
        }
        var counter = args[0].toLowerCase();
        Rue.userData.user.counters[counter] = start;
        Rue.changedUserData();
        Rue.say("Added the counter '" + counter + "'!");
    },
    "new counter": "=add counter",
    "create counter": "=add counter",
    "start counter": "=add counter",
    "remove counter": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a counter name!"); return }
        var counter = args.join(" ").toLowerCase();
        if (!Rue.userData.user.counters[counter]) { Rue.error("That counter doesn't exist!"); return }
        delete Rue.userData.user.counters[counter];
        Rue.changedUserData();
        Rue.say("Removed the counter '" + counter + "'!");
    },
    "delete counter": "=remove counter",
    "del counter": "=remove counter",
    "rm counter": "=remove counter",
    "stop counter": "=remove counter",
    "rename counter": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a counter name!"); return }
        if (args.length === 1) { Rue.error("You didn't specify a new name!"); return }
        var counter = args[0].toLowerCase();
        var newCounter = args.slice(1).join(" ").toLowerCase();
        if (!Rue.userData.user.counters[counter]) { Rue.error("That counter doesn't exist!"); return }
        Rue.userData.user.counters[newCounter] = Rue.userData.user.counters[counter];
        delete Rue.userData.user.counters[counter];
        Rue.changedUserData();
        Rue.say("Renamed the counter '" + counter + "' to '" + newCounter + "'!");
    },
    "reset counter": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a counter name!"); return }
        var counter = args.join(" ").toLowerCase();
        if (!Rue.userData.user.counters[counter]) { Rue.error("That counter doesn't exist!"); return }
        Rue.userData.user.counters[counter] = 0;
        Rue.changedUserData();
        Rue.say("Reset the counter '" + counter + "' to 0!");
    },
    "counter": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a counter to check!"); return }
        var counter = args.join(" ").toLowerCase();
        if (!Rue.userData.user.counters[counter]) { Rue.error("That counter doesn't exist!"); return }
        Rue.say("The value of the counter '" + counter + "' is " + Rue.userData.user.counters[counter] + "!");
    },
    "check counter": "=counter",
    "set counter": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a counter name!"); return }
        if (args.length === 1) { Rue.error("You didn't specify a value!"); return }
        var counter = args[0].toLowerCase();
        var value = parseInt(args[1]);
        if (isNaN(value)) { Rue.error("That's not a valid number!"); return }
        if (!Rue.userData.user.counters[counter]) { Rue.error("That counter doesn't exist!"); return }
        Rue.userData.user.counters[counter] = value;
        Rue.changedUserData();
        Rue.say("Set the counter '" + counter + "' to " + value + "!");
    },
    "volume": function(args) {
        if (args.length === 0) {
            Rue.setRue("volume", 1);
            Rue.say("Reset the volume to 100%!");
            return;
        }
        var volume = parseFloat(args[0]);
        if (isNaN(volume)) { Rue.error("That's not a valid number!"); return }
        if (volume < 0) { volume = 0 }
        if (volume > 1) { volume = volume/100 }
        if (volume > 1) { volume = 1 }
        Rue.setRue("volume", volume);
        Rue.say("Set the volume to " + Math.round(volume*100) + "%!");
    },
    "vol": "=volume",
    "timer": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a length of time!"); return }
        var time = args.join(" ");
        var seconds = relativeToSeconds(time);
        if (seconds === null) { Rue.error("That's not a valid time!"); return }
        time = seconds[1];
        var unit = seconds[2];
        seconds = seconds[0];
        if (seconds > 2000000) { Rue.error("That time is too long! :("); return }
        console.log(seconds)
        setTimeout(function() {
            Rue.success("Your timer's gone off!");
            Rue.playSound("https://r74n.com/rue/ding.mp3");
            // play sound every 3 seconds until mouse moves
            var soundInterval = setInterval(function() {
                Rue.playSound("https://r74n.com/rue/ding.mp3");
            }, 3000);
            document.addEventListener("mousemove", function() { clearInterval(soundInterval); })
        }, seconds*1000);
        Rue.say("Set a timer for " + time + " " + unit + "! Don't close this tab, or it'll stop!");
    },
    "countdown": function(args) {
        var time = args.join(" ");
        if (args.length === 0) { time = "10s" }
        var seconds = relativeToSeconds(time);
        if (seconds === null) { Rue.error("That's not a valid time!"); return }
        seconds = parseInt(seconds[0]);
        // for each second, say the number asynchronusly (setTimeout)
        var countdownInterval = setInterval(function() {
            seconds--;
            if (seconds === 0) {
                clearInterval(countdownInterval);
                Rue.success("Your countdown's over!");
                Rue.playSound("https://r74n.com/rue/ding.mp3");
                // play sound every 3 seconds until mouse moves
                var soundInterval = setInterval(function() {
                    Rue.playSound("https://r74n.com/rue/ding.mp3");
                }, 3000);
                document.addEventListener("mousemove", function() { clearInterval(soundInterval); })
                return;
            }
            Rue.say("Countdown: "+seconds);
        }, 1000);
        Rue.say("Countdown: "+seconds);
    },
    "rue size": function(args) {
        var size = args.join(" ");
        if (args.length === 0) { size = "1" }
        var zoom = parseFloat(size);
        if (isNaN(zoom)) { Rue.error("That's not a valid number!"); return }
        if (zoom < 0.5) { zoom = 0.5 }
        if (zoom > 2) { zoom = 2 }
        if (document.getElementById("rueSizeStyle")) { document.getElementById("rueSizeStyle").remove() }
        document.head.insertAdjacentHTML("beforeend", "<style id='rueSizeStyle'>.rueElement { zoom: "+zoom+" }</style>");
    },
    "copy": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify what to copy!"); return }
        Rue.say(args[0]);
        Rue.copyText(document.getElementById("rueMessageBox").innerText);
        Rue.say("Copied it to ya' clipboard!");
    },
    "formattest": function(args) {
        var text = args.join(" ") || "test";
        Rue.say("{{header:test}} {{b:test}} {{i:test}} {{sup:test}} {{sub:test}} {{ul:test}} {{strike:test}} {{small:test}} {{big:test}} {{code:test}} {{spoiler:test}} {{highlight:test}} {{red:test}} {{orange:test}} {{yellow:test}} {{green:test}} {{lime:test}} {{cyan:test}} {{blue:test}} {{purple:test}} {{magenta:test}} {{pink:test}} {{black:test}} {{white:test}} {{gray:test}} {{brown:test}} {{bg:{{color:test|red}}|black}} {{invis:test}} {{redact:test}} {{quote:test}}".replaceAll("test", text));
    },
    "omniformat": "=formattest",
    "redtext": function(args) { Rue.say("{{red:"+(args.join(" ") || "text")+"}}"); },
    "orangetext": function(args) { Rue.say("{{orange:"+(args.join(" ") || "text")+"}}"); },
    "yellowtext": function(args) { Rue.say("{{yellow:"+(args.join(" ") || "text")+"}}"); },
    "greentext": function(args) { Rue.say("{{green:"+(args.join(" ") || "text")+"}}"); },
    "limetext": function(args) { Rue.say("{{lime:"+(args.join(" ") || "text")+"}}"); },
    "cyantext": function(args) { Rue.say("{{cyan:"+(args.join(" ") || "text")+"}}"); },
    "bluetext": function(args) { Rue.say("{{blue:"+(args.join(" ") || "text")+"}}"); },
    "purpletext": function(args) { Rue.say("{{purple:"+(args.join(" ") || "text")+"}}"); },
    "magentatext": function(args) { Rue.say("{{magenta:"+(args.join(" ") || "text")+"}}"); },
    "pinktext": function(args) { Rue.say("{{pink:"+(args.join(" ") || "text")+"}}"); },
    "blacktext": function(args) { Rue.say("{{black:"+(args.join(" ") || "text")+"}}"); },
    "whitetext": function(args) { Rue.say("{{white:"+(args.join(" ") || "text")+"}}"); },
    "graytext": function(args) { Rue.say("{{gray:"+(args.join(" ") || "text")+"}}"); },
    "browntext": function(args) { Rue.say("{{brown:"+(args.join(" ") || "text")+"}}"); },
    "invisible ink": function(args) { Rue.say("{{invis:"+(args.join(" ") || "text")+"}}"); },
    "highlighter": function(args) { Rue.say("{{highlight:"+(args.join(" ") || "text")+"}}"); },
    "blockquote": function(args) { Rue.say("{{quote:"+(args.join(" ") || "text")+"}}"); },
    "codeblock": function(args) { Rue.say("{{code:"+(args.join(" ") || "text")+"}}"); },
    "spoiler": function(args) { Rue.say("{{spoiler:"+(args.join(" ") || "text")+"}}"); },
    "goto": function(args) {
        var url = args.join(" ");
        if (url.indexOf(".") === -1) { url = currentURL + "/" + url }
        else if (url.indexOf("://") === -1) { url = "http://" + url }
        Rue.openLink(url);
    },
    "go to": "=goto",
    "set title": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a title!"); return }
        document.title = args.join(" ");
        Rue.say("Set the title to '" + args.join(" ") + "'!");
    },
    "sayraw": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify what I should say!"); return }
        Rue.say(args.join(" "), {parse:false});
    },
    "tellraw": "=sayraw",
    "shout": function(args) {
        if (args.length === 0) { Rue.error("YOU DIDN'T SPECIFY WHAT I SHOULD SHOUT!!!!!!!"); return }
        var text = args.join(" ").toUpperCase();
        if (!text.match(/[\\.!\\?]$/)) { text += "!".repeat(Math.floor(Math.random()*10)) }
        Rue.say(text);
    },
    "yell": "=shout",
    "scream": "=shout",
    "exclaim": "=shout",
    "warn": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify what I should say"); return }
        Rue.alert(args.join(" "));
    },
    "deposit": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify an amount!"); return }
        var amount = parseFloat(args[0]);
        if (isNaN(amount) || amount <= 0) { Rue.error("That's not a valid amount!"); return }
        if (amount > Rue.getItem("ruecoin")) { Rue.error("You don't have that many Ruecoins! (You have {{ruecoin}}" + Rue.getItem("ruecoin") + ")"); return }
        Rue.addUser("bank", amount);
        Rue.delItem("ruecoin", amount);
        Rue.say("Deposited {{ruecoin}}" + amount + " into the Rue Financial Institute!\n\nView it by typing 'bank' or take it out by typing 'withdraw'!");
    },
    "withdraw": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify an amount!"); return }
        var amount = parseFloat(args[0]);
        if (isNaN(amount) || amount <= 0) { Rue.error("That's not a valid amount!"); return }
        if (amount > Rue.getUser("bank")) { Rue.error("You don't have that many Ruecoins in the bank! (You have {{ruecoin}}" + Rue.getUser("bank") + ")"); return }
        Rue.addItem("ruecoin", amount);
        Rue.addUser("bank", -amount);
        Rue.say("Withdrew {{ruecoin}}" + amount + " from the Rue Financial Institute!");
    },
    "compatibility": function(args) {
        args.sort();
        if (args.length < 2) { Rue.error("You didn't specify 2 names!"); return }
        var compat = seedRange(0,100,"rueCompatibility-"+ultraNormalize(args[0])+"-"+ultraNormalize(args[1]));
        if (args[0] === args[1]) { compat = 100 }
        Rue.say((compat > 70 ? "love>>>" : "") + args[0] + " and " + args[1] + " are " + compat + "% compatible!");
    },
    "compat": "=compatibility",
    "compatible": "=compatibility",
    "iq": function(args) {
        if (args.length === 0) {
            Rue.say("Your IQ is " + seedRange(0, 200, "rueIQ--"+Rue.getUser("userSeed")) + "!");
        }
        else {
            Rue.say(args.join(" ") + "'s IQ is " + seedRange(0, 200, "rueIQ--"+ultraNormalize(args.join(" "))) + "!");
        }
    },
    "iqscore": "=iq",
    "iq score": "=iq",
    "my iq": "=iq",
    "alignment": function(args) {
        if (args.length === 0) {
            Rue.say("You are " + seedChoose(["Lawful Good","Neutral Good","Chaotic Good","Lawful Neutral","True Neutral","Chaotic Neutral","Lawful Evil","Neutral Evil","Chaotic Evil"], "rueIQ__"+Rue.getUser("userSeed")) + "!");
        }
        else {
            Rue.say(args.join(" ") + " is " + seedChoose(["Lawful Good","Neutral Good","Chaotic Good","Lawful Neutral","True Neutral","Chaotic Neutral","Lawful Evil","Neutral Evil","Chaotic Evil"], "rueIQ__"+ultraNormalize(args.join(" "))) + "!");
        }
    },
    "ruegex": function(args) {
        if (args.length === 0 || args[0] === "list") {
            // paginate all keys of rueData.regex
            var keys = Object.keys(rueData.regex);
            keys.sort();
            Rue.paginate("Below are all the Ruegex keys I know!\n\n"+keys.join("\n"),20);
        }
        else {
            var key = args.join(" ");
            if (!rueData.regex[key]) { Rue.error("That Ruegex key doesn't exist!"); return }
            Rue.say("The Ruegex key '" + key + "' is:\n\n/" + chooseValue(rueData.regex,key)[0]+"/");
        }
    },
    "ruegexes": "=ruegex",
    "list ruegex": "=ruegex",
    "/(how (much|many))? ?(days|time) (until|since)/": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a date!"); return }
        var date = new Date(args.join(" "))
        if (isNaN(date)) { Rue.error("That's not a valid date!"); return }
        var now = new Date();
        var diff = date - now;
        var time = "";
        if (diff < 0) { diff = now - date }
        if (diff > 86400000) { time += Math.floor(diff/86400000) + " day" + (Math.floor(diff/86400000) === 1 ? "" : "s") + ", " }
        if (diff > 3600000) { time += Math.floor(diff/3600000)%24 + " hour" + (Math.floor(diff/3600000)%24 === 1 ? "" : "s") + ", and " }
        if (diff > 60000) { time += Math.floor(diff/60000)%60 + " minute" + (Math.floor(diff/60000)%60 === 1 ? "" : "s") + ", " }
        Rue.say(date.toLocaleDateString() + (date < now ? " was " : " is ") + time + " " + (date < now ? "ago" : "from now") + "!");
    },
    "/(date|day|time) in/": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a timespan!"); return }
        var seconds = relativeToSeconds(args.join(" "));
        if (!seconds) { Rue.error("That's not a valid timespan!"); return }
        var unit = seconds[2];
        var amount = seconds[1];
        seconds = seconds[0];
        var date = new Date();
        date.setTime(date.getTime() + seconds*1000);
        Rue.say("It will be " + date.toLocaleString() + " in " + amount + " " + unit + "!");
    },
    "fedex": function(args) {
        Rue.openLink("https://www.fedex.com/fedextrack/?trknbr=" + args.join(" "));
    },
    "ups": function(args) {
        Rue.openLink("https://www.ups.com/track?InquiryNumber1=" + args.join(" "));
    },
    "usps": function(args) {
        Rue.openLink("https://tools.usps.com/go/TrackConfirmAction_input?origTrackNum=" + args.join(" "));
    },
    "dhl": function(args) {
        Rue.openLink("https://www.dhl.com/us-en/home/tracking.html?tracking-id=" + args.join(" ") + "&submit=1");
    },
    "tnt": function(args) {
        Rue.openLink("https://www.tnt.com/express/en_us/site/tracking.html?utm_redirect=legacy_webtracker-nonav&cons=" + args.join(" "));
    },
    "permalink": function(args) {
        // get a URL to the current page with ?rue=true
        var message = "true";
        if (args.length !== 0) { message = args.join(" ") }
        var url = currentURL.split("#")[0];
        if (url.indexOf("rue=") !== -1) { url = url.replace(/rue=[^&]+/, "rue="+encodeURIComponent(message)) }
        else if (url.indexOf("?") === -1) { url += "?rue="+encodeURIComponent(message) }
        else { url += "&rue="+encodeURIComponent(message) }
        Rue.copyText(url);
        Rue.say("Copied the {{link:"+url+"|permalink}} to ya' clipboard!");
    },
    "copy url": function(args) {
        var url = currentURL;
        if (args.length !== 0) {
            if (args[0].indexOf("http") === 0) { url = args[0] }
            else {
                var url = chooseValue(rueData.links, args.join(" ").toLowerCase())[0];
                if (!url) { Rue.error("That link doesn't exist!"); return }
            }
        }
        Rue.copyText(url);
        Rue.say("Copied the {{link:"+url+"|link}} to ya' clipboard!");
    },
    "copy link": "=copy url",
    "add mod": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a URL!"); return }
        var url = args.join(" ");
        if (url.indexOf("://") === -1) { url = "https://r74n.com/rue/mods/" + url }
        if (Rue.userData.rue.mods.indexOf(url) !== -1) { Rue.error("That mod is already installed!"); return }
        Rue.confirm("The script at this URL will run every time you have me on page, and could do malicious things. Are you sure you trust this source?\n\n{{link:"+url+"}}", function() {
            Rue.userData.rue.mods.push(url);
            Rue.changedUserData();
            Rue.say("Okay, that script will run every time you have me on page!");
        });
    },
    "enable mod": "=remove mod",
    "install mod": "=remove mod",
    "remove mod": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a URL!"); return }
        var url = args.join(" ");
        if (url.indexOf("://") === -1) { url = "https://r74n.com/rue/mods/" + url }
        if (Rue.userData.rue.mods.indexOf(url) === -1) { Rue.error("That mod isn't installed! Make sure you typed the URL exactly as displayed in 'mod list'."); return }
        Rue.userData.rue.mods.splice(Rue.userData.rue.mods.indexOf(url), 1);
        Rue.changedUserData();
        Rue.say("Okay, that script won't run anymore!");
    },
    "disable mod": "=remove mod",
    "uninstall mod": "=remove mod",
    "delete mod": "=remove mod",
    "rm mod": "=remove mod",
    "del mod": "=remove mod",
    "clear mods": function() {
        Rue.confirm("Are you sure you wanna delete all your installed mods?", function() {
            Rue.userData.rue.mods = [];
            Rue.changedUserData();
            Rue.say("Okay, all your installed mods have been deleted!");
        });
    },
    "mod list": function() {
        if (Rue.userData.rue.mods.length === 0) { Rue.say("Ya' don't have any {{link:https://github.com/R74nCom/R74n-Main/tree/main/rue/mods|mods}} installed!"); return }
        Rue.paginate("Below are all the {{link:https://github.com/R74nCom/R74n-Main/tree/main/rue/mods|mods}} you have installed:\n\n{{link:" + Rue.userData.rue.mods.join("}}\n{{link:")+"}}");
    },
    "modlist": "=mod list",
    "list mods": "=mod list",
    "list mod": "=mod list",
    "installed mods": "=mod list",
    "enabled mods": "=mod list",
    "rue mods": "=mod list",
    "modded rue": "=mod list",
    "buy": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify what to shop for!"); return }
        var term = args.join(" ");
        //if (term.match(/(.+ )?(terms)( .+)?/i)) {
        if (term.match(/elements?|chemicals?|element cubes?|(.+ )?(hydrogen|boron|carbon|nitrogen|oxygen|fluorine|neon|silicon|phosphorus|sulfur|chlorine|argon|manganese|iron|cobalt|nickel|copper|zinc|arsenic|bromine|krypton|molybdenum|silver|tin|antimony|iodine|xenon|lanthanum|tantalum|tungsten|wolfram|platinum|gold|mercury|lead|bismuth|astatine|radon|tennessine|oganesson|(hel|lith|beryll|sod|magnes|alumini?|potass|calc|scand|titan|vanad|chrom|gall|german|selen|rubid|stront|yttr|zircon|niob|technet|ruthen|rhod|pallad|cadm|ind|tellur|ca?es|bar|cer|praseodym|neodym|prometh|samar|europ|gadolin|terb|dyspros|holm|erb|thul|ytterb|lutet|hafn|rhen|osm|irid|thall|polon|franc|rad|actin|thor|protactin|uran|neptun|pluton|americ|cur|berkel|californ|einstein|ferm|mendelev|nobel|lawrenc|rutherford|dubn|seaborg|bohr|hass|meitner|darmstadt|roentgen|copernic|nihon|flerov|moscov|livermor)ium)( .+)?/i)) {
            rueData.commands["luciteria"](args);
        }
        else {
            Rue.openLink("https://www.google.com/search?tbm=shop&q="+term);
        }
    },
    "shop": "=buy",
    "shopping": "=buy",
    "purchase": "=buy",
    "download": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a media URL!"); return }
        Rue.openLink("https://cobalt.tools/?u="+args.join(" "));
    },
    "dl": "=download",
    "cobalt": "=download", //partner
    "cobalt.tools": "=download",
    "cobalt tools": "=download",
    "cobalttools": "=download",
    "patent": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a patent number!"); return }
        Rue.openLink("https://patents.google.com/patent/US"+args[0])
    },
    "airport": function(args) {
        Rue.openLink("https://www.flightradar24.com/airport/"+args[0])
    },
    "flight": function(args) {
        Rue.openLink("https://www.flightradar24.com/flight/"+args[0])
    },
    "fcc": function(args) {
        Rue.openLink("https://fcc.report/FCC-ID/"+args.join("-"))
    },
    "sitesearch": function(args) {
        if (args.length === 0) {
            var domain = location.host||location.hostname;
            var query = "";
        }
        else if (args.length === 1) {
            if (args[0].indexOf(".") !== -1) {
                var domain = args[0];
                var query = "";
            }
            else {
                var domain = location.host||location.hostname;
                var query = args[0];
            }
        }
        else {
            var domain = args[0];
            var query = args.slice(1).join(" ");
        }
        Rue.openLink("https://www.google.com/search?q=site:"+domain+" "+query)
    },
    "search site": "=sitesearch",
    "search this site": "=sitesearch",
    "iplookup": function(args) {
        if (args.length === 0 && Rue.checkStreamerMode("IP address, location")) { return }
        Rue.openLink("https://ifconfig.co/?ip="+args.join("."))
    },
    "ipl": "=iplookup",
    "ip lookup": "=iplookup",
    "rdns": "=iplookup",
    "geolocate": "=iplookup",
    "$$$whats?,my,ip": "=iplookup",
    "ip": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify an IP address!"); return }
        var ip = args.join(".").toLowerCase().replaceAll("i",1);
        Rue.say("You can {{link:http://"+ip+"|visit this IP}} or {{link:https://ifconfig.co/?ip="+ip+"|geolocate it}}!")
    },
    "internet protocol": "=ip",
    "streamer mode": function() {
        if (Rue.getUser("streamerMode")) {
            Rue.setUser("streamerMode",false)
            Rue.say("I've disabled Streamer Mode!");
        }
        else {
            Rue.setUser("streamerMode",true)
            Rue.say("I've enabled Streamer Mode!");
        }
    },
    "clinical trial": function(args) {
        Rue.openLink("https://clinicaltrials.gov/search?term="+args.join(" "))
    },
    "clinical trials": "=clinical trial",
    "med trial": "=clinical trial",
    "medical trial": "=clinical trial",
    "dataset": function(args) {
        Rue.openLink("https://catalog.data.gov/dataset?q="+args.join(" "))
    },
    "data set": "=dataset",
    "datasets": "=dataset",
    "data sets": "=dataset",
    "us census": function(args) {
        Rue.openLink("https://data.census.gov/all?q="+args.join(" "))
    },
    "webaim": function(args) {
        Rue.openLink("https://wave.webaim.org/report#/"+(args.join(" ")||currentURL))
    },
    "tota11y": function() {
        (function(){var tota11y=document.createElement('SCRIPT');tota11y.type='text/javascript';tota11y.src='https://tota11y.babylontech.co.uk/tota11y.min.js';document.getElementsByTagName('head')[0].appendChild(tota11y);})();
    },
    "xkcd": function(args) {
        if (args.length === 0) { Rue.openLink("https://c.xkcd.com/random/comic/") }
        else { Rue.openLink("https://xkcd.com/"+args[0]+"/") }
    },
    "karma decay": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify an image URL!") }
        else { Rue.openLink("http://karmadecay.com/search?kdtoolver=m2&q="+args[0]) }
    },
    "karmadecay": "=karma decay",
    "imgops": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify an image URL!") }
        else { Rue.openLink("https://imgops.com/"+args[0]) }
    },
    "tineye": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify an image URL!") }
        else { Rue.openLink("https://www.tineye.com/search?url="+args[0]) }
    },
    "char": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify a character!"); return }
        if (args[0].match(/(U?[+\-])?[0-9A-F]{4,6}/gi)) {
            var chars = [];
            args.forEach( (u) => {
                chars.push(String.fromCharCode(parseInt(u.match(/[0-9A-F]+/gi)[0],16)))
            } )
        }
        else { var chars = [...args.join(" ")] }
        var info = chars.join("");
        if (chars.length > 1) { info += "\n\n" + chars.join(" ").replaceAll("​","[ZWS]").replaceAll("‍","[ZWJ]").replaceAll("️","[VS16]").replaceAll("︎","[VS15]"); }
        info += "\n\n";
        chars.forEach( (char) => {
            var comp;
            if (char.length === 1) { comp = char.charCodeAt(0); }
            else { comp = ( (char.charCodeAt(0) - 0xD800) * 0x400 + (char.charCodeAt(1) - 0xDC00) + 0x10000 ); }
            if (comp < 0) { comp = char.charCodeAt(0); }
            info += "U+"+comp.toString(16).padStart(5,"0").toUpperCase()+" "
        })
        Rue.say(info)
    },
    "codepoint": "=char",
    "character": "=char",
    "unicode": "=char",
    "chars": "=char",
    "emoji kitchen": function(args) {
        if (args.length < 2) { Rue.error("You didn't specify two emoji!"); return }
        var chars = [];
        args = args.sort();
        args.reverse();
        args.forEach( (char) => {
            var comp;
            if (char.length === 1) { comp = char.charCodeAt(0); }
            else { comp = ( (char.charCodeAt(0) - 0xD800) * 0x400 + (char.charCodeAt(1) - 0xDC00) + 0x10000 ); }
            if (comp < 0) { comp = char.charCodeAt(0); }
            chars.push("u"+comp.toString(16).padStart(5,"0"))
        })
        Rue.openLink("https://www.gstatic.com/android/keyboard/emojikitchen/20230301/"+chars[0]+"/"+chars[0]+"_"+chars[1]+".png")
    },
    "weather": function(args) {
        var search = args.join(" ").replace(/^(in|at|near|on|@) /g, "");
        if (search === "me" || search === "here") {
            search = "";
        }
        if (!search && Rue.checkStreamerMode("location")) return;
        Rue.callAPI("https://wttr.in/"+search+"?format=j1", function(json) {
            console.log(json)
            if (json.nearest_area && json.current_condition && json.request[0].query !== "Ban Not, Vietnam") {
                var area = json.nearest_area[0];
                var stats = json.current_condition[0];
                var coords = area.latitude+","+area.longitude;
                Rue.say(
`Weather in {{link:https://www.google.com/maps/place/${coords}|${area.areaName[0].value}}}:

${stats.temp_F}°F / ${stats.temp_C}°C
Feels like: ${stats.FeelsLikeF}°F / ${stats.FeelsLikeC}°C
Humidity: ${stats.humidity}%
Wind: ${stats.windspeedMiles}mph / ${stats.windspeedKmph}kmph (${stats.winddir16Point})
`
                )
            }
            else {
                Rue.error("Your area couldn't be located! Please specify the name of the location.")
            }
        })
    },
    "$$$what,is,my": function(args) {
        var key = trimPunctuation(args.join("_"));
        var value = Rue.getUser(key);
        if (value) {
            Rue.say("Your "+key+" is "+value+"!")
        }
        else {
            Rue.error("I'm not sure how to determine that..")
        }
    },
    "$$$my,name,is": function(args) {
        var newName = trimPunctuation(args[0]);
        if (!newName) { Rue.error("I can't call you that!!"); return }
        Rue.setUser("name",newName);
        Rue.happy("Okay!! I'll call you "+newName+" from now on.")
    },

    // R74n Identifiers
    "urn": function(args) {
        if (args.length === 0) {
            Rue.openLink("https://r74n.com/id/urn");
            return;
        }
        Rue.openLink("https://r74n.com/id/?urn:"+args.join(""))
    },
    "oid": function(args) {
        if (args.length === 0) {
            Rue.openLink("https://r74n.com/id/oid");
            return;
        }
        Rue.openLink("https://r74n.com/id/?"+args.join("."))
    },
    "planecode": function(args) {
        Rue.openLink("https://r74n.com/multiplane?code="+args.join("+"))
    },
    "id": function(args) {
        if (args.length === 0) {
            Rue.openLink("https://r74n.com/id/");
            return;
        }
        Rue.openLink("https://r74n.com/id/?"+args.join(""))
    },
    "identifier": "=id",
    "resolve": "=id",
    "resolve id": "=id",
    "resolve identifier": "=id",
    "color picker": function(args) {
        var color = args[0] || "#00ffff";
        Rue.say(`<span id="rueColorPickerText">${color}</span>\n\n<input type="color" oninput="document.getElementById('rueColorPickerText').innerText = this.value;" value="${color}">`)
    },

    "downdetector": function(args) { //partner
        if (args.length === 0) {
            Rue.openLink("https://downdetector.com/");
            return;
        }
        Rue.openLink("https://downdetector.com/search/?q="+args.join(" "))
    },
    "luciteria": function(args) { //partner
        if (args.length === 0) {
            Rue.openLink("https://www.luciteria.com/");
            return;
        }
        Rue.openLink("https://www.luciteria.com/search?q="+args.join(" "))
    },
    "allchemy": function(args) { //partner
        var url = "https://allchemy.io/";
        if (args.length > 0) {
            if (args[0].charAt(0) === "@") {
                url += args[0];
            }
            else if (args[0] === "items") {
                url += "items"
            }
            else if (args[0] === "search") {
                url += "items?search="+args.slice(1).join(" ");
            }
            else {
                url += "items/"+args.join(" ").toLocaleLowerCase()
                .replace(/\(.+\)/g, '')
                .trim()
                .replace(/[^a-z0-9- /]/g, '')
                .replace(/[- /]+/g, '-')
                .replace(/^-+|-+$/g, '')
            }
        }
        Rue.openLink(url)
    },
    "infinite craft": "=allchemy",
} // commands
rueData.favorites = {
    "color": "neon lime (<span style='color:#00ff00'>#00ff00</span>)",
    "activity": "talkin' to R74n users",
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
    "/:\\w+:/": function(text) { //R74moji
        Rue.openLink("https://r74n.com/moji/view?"+text.replaceAll(":",""))
    },
    "/(wh?[au]t('?| i)s? )?((yo)?u'?r'?e? )?fav(ou?rite)? ([\\w ]+)/": function(text) {
        var match = text.match(/(?:wh?[au]t(?:'?| i)s? )?(?:(?:yo)?ur )?fav(?:ou?rite)? ([\w ]+)/i);
        var key = match[1];
        Rue.say("My favorite " + key + " is " + (rueData.favorites[key] || "[???]") + "!");
    },
    "/https?:\\/\\/.+/": function(text) {
        Rue.openLink(text);
    },
    "/www\\..+/": function(text) {
        Rue.openLink("http://" + text);
    },
    "/[\\w\\.]+\\.(com?|org|net|co\\.uk|edu|gov|tv|io|gg)(\\/.+)?/": function(text) {
        Rue.openLink("http://" + text);
    },
    "/leave|self[ \\-]?destruct|go away|hide|run away|exit|close|turn off|shut up|stfu|lock ?down|shut ?down|shut ?off|disconnect|dc|uninstall|scram|shoo|vanish|disappear|vacate/": function() {
        Rue.say("I'll leave right after ya' click somewhere else! See ya' {{c:soon|later}}, friend!");
        Rue.brain.afterClickOff = function() {
            Rue.uninstall()
        }
    },
    "unfocus": function() {
        rueInput.value = "";
        rueInput.blur();
    },
    "/(submit|post|add|suggest|leave)? ?(feedback|fb|suggestion|suggest|report bug|bug report|report bug) (for|to|of|4|on) (.+)/": function(text) {
        var match = text.match(/(?:submit|post|add|suggest|leave)? ?(?:feedback|fb|suggestion|suggest|report bug|bug report|report bug) (?:for|to|of|4|on) (.+)/i);
        var key = normalize(match[1]);
        key = chooseValue(rueData.links, key)[1];
        var feedbackKey = "feedback:" + key;
        if (rueData.links[feedbackKey]) {
            Rue.openLink(rueData.links[feedbackKey]);
        }
        else { Rue.say("I don't have a feedback link for that! Try checkin' out the {{link:https://r74n.com/ufbs/|feedback page}}!")}
    },
    "/(.+)[ \\-](feedback|fb|suggestions?|bug reports?)/": function(text) {
        var match = text.match(/(.+)[ \-](?:feedback|fb|suggestions?|bug reports?)/i);
        var key = normalize(match[1]);
        key = chooseValue(rueData.links, key)[1];
        var feedbackKey = "feedback:" + key;
        if (rueData.links[feedbackKey]) {
            Rue.openLink(rueData.links[feedbackKey]);
        }
        else { Rue.say("I don't have a feedback link for that! Try checkin' out the {{link:https://r74n.com/ufbs/|feedback page}}!")}
    },
    "/(view|show|see)? ?((feedback)? ?(responses|status)) (for|to|of|4) (.+)/": function(text) {
        var match = text.match(/(?:view|show|see)? ?(?:(?:feedback)? ?(?:responses|status)) (?:for|to|of|4) (.+)/i);
        var key = normalize(match[1]);
        key = chooseValue(rueData.links, key)[1];
        var feedbackKey = "responses:" + key;
        if (rueData.links[feedbackKey]) {
            Rue.openLink(rueData.links[feedbackKey]);
        }
        else { Rue.say("I don't have a response link for that! Try checkin' out the {{link:https://r74n.com/ufbs/|feedback page}}!")}
    },
    "/(.+)[ \\-](feedback|fb|suggestions?)? (responses|status)/": function(text) {
        var match = text.match(/(.+)[ \\-](?:feedback|fb|suggestions?)? (?:responses|status)/i);
        var key = normalize(match[1]);
        key = chooseValue(rueData.links, key)[1];
        var feedbackKey = "responses:" + key;
        if (rueData.links[feedbackKey]) {
            Rue.openLink(rueData.links[feedbackKey]);
        }
        else { Rue.say("I don't have a response link for that! Try checkin' out the {{link:https://r74n.com/ufbs/|feedback page}}!")}
    },
    "clicker": function() {
        Rue.addEnv("clicker",1);
        Rue.say("You've used the clicker " + Rue.getEnv("clicker") + " times!");
    },
    "export data": function() {
        // download JSON of Rue.userData
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(Rue.userData));
        var dlAnchorElem = document.createElement('a');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "rue-data.json");
        dlAnchorElem.click();
        Rue.say("Download startin' now!");
    },
    "backup data": "=export data",
    "back up data": "=export data",
    "data backup": "=export data",
    "import data": function() {
        // upload JSON of Rue.userData
        Rue.confirm("Are you sure you wanna override your current data?", function() {
            Rue.say("A file select menu should've popped up!");
            var input = document.createElement("input");
            input.type = "file";
            input.accept = "application/json";
            input.onchange = function() {
                var reader = new FileReader();
                reader.onload = function() {
                    Rue.userData = JSON.parse(reader.result);
                    if (!Rue.userData.rue) { Rue.userData.rue = {} }
                    if (!Rue.userData.user) { Rue.userData.user = {} }
                    if (!Rue.userData.env) { Rue.userData.env = {} }
                    Rue.changedUserData();
                };
                reader.readAsText(input.files[0]);
                Rue.say("Data's been imported!");
            };
            input.click();
        })
    },
    "reset data": function() {
        Rue.confirm("Are you sure you wanna ERASE ALL your data? You should 'export data' first, it cannot be undone..", function() {
            Rue.userData = JSON.parse(JSON.stringify(Rue.defaultUserData));
            Rue.changedUserData();
            Rue.say("Data's been reset!");
        })
    },
    "erase data": "=reset data",
    "blink": function() {
        Rue.blink();
    },
    "blink me": function() {
        if (!Rue.getUser("noEpilepsy")) { Rue.error("{{r:[epilepsy]}}"); return}
        Rue.user.blink();
    },
    "/((go|time) ?to)? ?sleep|(go ?to|time for) (bed|sleep)|(bed|sleep) ?time/": function() {
        Rue.say("Zzz.. Goodnight..");
        Rue.sleep(undefined,true);
    },
    "lock": function() {
        Rue.sleep(undefined,true);
    },
    "btc": function() {
        Rue.callAPI("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd", function(data) {
            Rue.say("1 Bitcoin is currently worth $" + data.bitcoin.usd + "! (CoinGecko)");
        })
    },
    "bitcoin": "=btc",
    "dogecoin": function() {
        Rue.callAPI("https://api.coingecko.com/api/v3/simple/price?ids=dogecoin&vs_currencies=usd", function(data) {
            Rue.say("1 Dogecoin is currently worth $" + data.dogecoin.usd + "! (CoinGecko)");
        })
    },
    "ethereum": function() {
        Rue.callAPI("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd", function(data) {
            Rue.say("1 Ethereum is currently worth $" + data.ethereum.usd + "! (CoinGecko)");
        })
    },
    "eth": "=ethereum",
    "monero": function() {
        Rue.callAPI("https://api.coingecko.com/api/v3/simple/price?ids=monero&vs_currencies=usd", function(data) {
            Rue.say("1 Monero is currently worth $" + data.monero.usd + "! (CoinGecko)");
        })
    },
    "xmr": "=monero",
    "rainbow": function() {
        var style = document.createElement("style");
        style.innerHTML = `@keyframes rueRainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }`;
        document.head.appendChild(style);
        document.body.style.animation = "rueRainbow 5s infinite linear";
        Rue.say("Be who you are!\n\n{{red:█}}{{orange:█}}{{yellow:█}}{{green:█}}{{cyan:█}}{{blue:█}}{{purple:█}}");
    },
    "black and white": function() {
        document.body.style.filter = "grayscale(100%)";
    },
    "grayscale": "=black and white",
    "greyscale": "=black and white",
    "black & white": "=black and white",
    "b&w": "=black and white",
    "invert colors": function() {
        document.documentElement.style.filter = "invert(100%)";
    },
    "sepia": function() {
        document.documentElement.style.filter = "sepia(100%)";
    },
    "bad eyesight mode": function() {
        document.body.style.filter = "blur(5px)";
    },
    "take off glasses": "=bad eyesight mode",
    "blur page": "=bad eyesight mode",
    "go blind": function() {
        Rue.user.overlay("black",1)
    },
    "event": function() {
        if (typeof currentEvent !== "undefined") {
            Rue.say("Current event: " + currentEvent);
        }
        else { Rue.say("No event detected!!") }
    },
    "title": function() {
        Rue.say("Page title: " + document.title);
    },
    "pagetitle": "=title",
    "page title": "=title",
    "url": function() {
        Rue.say("Current URL: " + window.location.href);
    },
    "currenturl": "=url",
    "link": "=url",
    "href": "=url",
    "/\\/.+/": function(text) {
        Rue.openLink(currentURL + text);
    },
    "/\\.\\.\\/(.+)?/": function(text) {
        Rue.openLink(currentURL + "/" + text);
    },
    "fox": function() {
        Rue.showMedia("https://randomfox.ca/images/" + Math.floor(Math.random()*123+1) + ".jpg", "Fox for you! 🦊", "Brought to you by RandomFox.ca");
    },
    "cat": function() {
        Rue.showMedia("https://cataas.com/cat?"+Math.random(), "Kitty for you! 🐱", "Brought to you by CATAAS.com");
    },
    "coffee": function() {
        Rue.showMedia("https://coffee.alexflipnote.dev/random?"+Math.random(), "Coffee for you! ☕", "Brought to you by coffee.alexflipnote.dev");
    },
    "/cat ?gif/": function() {
        Rue.showMedia("https://cataas.com/cat/gif?"+Math.random(), "Kitty GIF for you! 🐱", "Brought to you by CATAAS.com");
    },
    "bear": function() {
        Rue.showMedia("https://placebear.com/"+(500+Math.floor(Math.random()*50))+"/"+(500+Math.floor(Math.random()*50)), "Bear for you! 🐻", "Brought to you by placebear.com");
    },
    "meat": function() {
        Rue.showMedia("https://baconmockup.com/"+(500+Math.floor(Math.random()*50))+"/"+(500+Math.floor(Math.random()*50)), "Meat for you! 🥩", "Brought to you by baconmockup.com");
    },
    "monkey": function() {
        Rue.showMedia("https://placemonkeys.com/"+(500+Math.floor(Math.random()*50))+"/"+(500+Math.floor(Math.random()*50)), "Monkey for you! 🐒", "Brought to you by placemonkeys.com");
    },
    "skull": function() {
        Rue.showMedia("https://placeskull.com/"+(500+Math.floor(Math.random()*50))+"/"+(500+Math.floor(Math.random()*50)), "Skull for you! 💀", "Brought to you by placeskull.com");
    },
    "beard": function() {
        Rue.showMedia("https://placebeard.it/"+(500+Math.floor(Math.random()*50))+"/"+(500+Math.floor(Math.random()*50)), "Beard for you! 🧔", "Brought to you by placebeard.it");
    },
    "kitten": function() {
        Rue.error("This service is currently down!");
        // Rue.showMedia("https://placekitten.com/"+(500+Math.floor(Math.random()*50))+"/"+(500+Math.floor(Math.random()*50)), "Kitten for you! 🐱", "Brought to you by placekitten.com");
    },
    "dog": function() {
        Rue.callAPI("https://random.dog/woof.json", function(data) {
            Rue.showMedia(data.url, "Dog for you! 🐶", "Brought to you by random.dog");
        })
    },
    "doggy": "=dog",
    "doggo": "=dog",
    "corgi": function() {
        Rue.callAPI("https://dog.ceo/api/breed/corgi/images/random", function(data) {
            Rue.showMedia(data.message, "Corgi for you! 🐶", "Brought to you by dog.ceo");
        })
    },
    "husky": function() {
        Rue.callAPI("https://dog.ceo/api/breed/husky/images/random", function(data) {
            Rue.showMedia(data.message, "Husky for you! 🐶", "Brought to you by dog.ceo");
        })
    },
    "shibe": function() {
        Rue.callAPI("https://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true", function(data) {
            Rue.showMedia(data[0], "Shibe for you! 🐶", "Brought to you by shibe.online");
        })
    },
    "shiba inu": "=shibe",
    "shiba": "=shibe",
    "bird": function() {
        Rue.callAPI("https://shibe.online/api/birds?count=1&urls=true&httpsUrls=true", function(data) {
            Rue.showMedia(data[0], "Bird for you! 🐦", "Brought to you by shibe.online");
        })
    },
    "birb": "=bird",
    "duck": function() {
        Rue.showMedia("https://random-d.uk/api/v2/randomimg?"+Math.random(), "Duck for you! 🦆", "Brought to you by Random-d.uk");
    },
    "ducky": "=duck",
    "duckie": "=duck",
    "bigcat": function() {
        Rue.callAPI("https://randombig.cat/roar.json", function(data) {
            Rue.showMedia(data.url, "Big cat for you! {{c:🦁|🐯|🐆}}", "Brought to you by randombig.cat");
        })
    },
    "big cat": "=bigcat",
    "animal": function() {
        rueData.totalities[chooseItem(["fox","cat","/cat ?gif/","bear","kitten","dog","shibe","bird","duck","bigcat","corgi","husky","goose","lizard"])]()
    },
    "joke": function() {
        Rue.callAPI("https://v2.jokeapi.dev/joke/Any?safe-mode", function(data){
            if (data.joke) { Rue.say(data.joke) }
            else { Rue.say(data.setup + "\n\n" + data.delivery) }
        })
    },
    "/(tell( me)?|say)( a)? joke/": "=joke",
    "/bacon ?ipsum/": function() {
        Rue.callAPI("https://baconipsum.com/api/?type=all-meat", function(data){
            Rue.say(data[0])
        })
    },
    "covid": function() {
        Rue.callAPI("https://disease.sh/v3/covid-19/all/?lastdays=1", function(data){
            Rue.say("Cases: "+formatNum(data.cases) + "\nDeaths: "+formatNum(data.deaths) + "\nRecovered: "+formatNum(data.recovered) + "\nActive: "+formatNum(data.active) + "\nTests: "+formatNum(data.tests)  +"\n\nFrom Disease.sh at "+(new Date(1688874045635)).toLocaleString())
        })
    },
    "covid19": "=covid",
    "covid-19": "=covid",
    "covid 19": "=covid",
    "corona": "=covid",
    "coronavirus": "=covid",
    "sars-cov-2": "=covid",
    "ncov": "=covid",
    "covid us": function() {
        Rue.callAPI("https://disease.sh/v3/covid-19/countries/us/?lastdays=1", function(data){
            Rue.say("Cases: "+formatNum(data.cases) + "\nDeaths: "+formatNum(data.deaths) + "\nRecovered: "+formatNum(data.recovered) + "\nActive: "+formatNum(data.active) + "\nTests: "+formatNum(data.tests)  +"\n\nFrom Disease.sh at "+(new Date(1688874045635)).toLocaleString())
        })
    },
    "waifu": function() {
        if (!Rue.getUser("over18")) { Rue.error("{{r:[under18]}}"); return}
        Rue.callAPI("https://api.waifu.im/search?is_nsfw=false", function(data) {
            Rue.showMedia(data.images[0].url, "Waifu for you!", "Brought to you by Waifu.im ({{link:"+data.images[0].source+"|Source}})");
        })
    },
    "catgirl": function() {
        if (!Rue.getUser("over18")) { Rue.error("{{r:[under18]}}"); return}
        Rue.callAPI("https://nekos.moe/api/v1/random/image?nsfw=false", function(data) {
            Rue.showMedia("https://nekos.moe/image/"+data.images[0].id, "Catgirl for you!");
        })
    },
    "foxgirl": function() {
        if (!Rue.getUser("over18")) { Rue.error("{{r:[under18]}}"); return}
        Rue.callAPI("https://nekos.life/api/v2/img/fox_girl", function(data) {
            Rue.showMedia(data.url, "Foxgirl for you!", "Brought to you by nekos.life");
        })
    },
    "smug": function() {
        Rue.callAPI("https://nekos.life/api/v2/img/smug", function(data) {
            Rue.showMedia(data.url, "Smug..", "Brought to you by nekos.life");
        })
    },
    "goose": function() {
        Rue.callAPI("https://nekos.life/api/v2/img/goose", function(data) {
            Rue.showMedia(data.url, "Goose for you! 🪿", "Brought to you by nekos.life");
        })
    },
    "lizard": function() {
        Rue.callAPI("https://nekos.life/api/v2/img/lizard", function(data) {
            Rue.showMedia(data.url, "Lizard for you! 🦎", "Brought to you by nekos.life");
        })
    },
    "daily picture": function() {
        Rue.showMedia("https://picsum.photos/seed/"+today()+"/500/500", "Here's today's daily picture!", "Brought to you by picsum.photos");
    },
    "daily pic": "=daily picture",
    "daily image": "=daily picture",
    "daily photo": "=daily picture",
    "dailypic": "=daily picture",
    "dailyimg": "=daily picture",
    "/i( am|'m)( over)? (16|sixteen|17|seventeen)/": function() {
        Rue.setUser("over16",true);
        Rue.say("You may now use actions that require you to be over 16!");
    },
    "/i( am|'m)( over)? (18|eighteen|19|nineteen|20|twenty)/": function() {
        Rue.setUser("over16",true);
        Rue.setUser("over18",true);
        Rue.say("You may now use actions that require you to be over 18!");
    },
    "/i( am|'m)( over)? (21|twenty[\\- ]?one)/": function() {
        Rue.setUser("over16",true);
        Rue.setUser("over18",true);
        Rue.setUser("over21",true);
        Rue.say("You may now use actions that require you to be over 21!");
    },
    "/i (don'?t|do not) have( photosensitive)? epilepsy/": function() {
        Rue.setUser("noEpilepsy",true);
        Rue.say("You may now use actions that may cause seizures in people with photosensitive epilepsy!");
    },
    "/(what('| i)?s? )?(today'?s |the )?(date|day|today)( is it)?( today)?/": function() {
        var date = new Date();
        Rue.say("It's currently " + date.getDayName() + ", " + date.getMonthName() + " " + date.getDate() + ", " + date.getFullYear() + "!");
    },
    "/(what('| i)?s? )?(the )?(current )?(month)( is it)?/": function() {
        Rue.say("It's currently " + new Date().getMonthName() + "!");
    },
    "/(what('| wa)?s? )?(yesterday|yday)('?s date)?/": function() {
        var date = new Date();
        date.setDate(date.getDate() - 1);
        Rue.say("Yesterday was " + date.getDayName() + ", " + date.getMonthName() + " " + date.getDate() + ", " + date.getFullYear() + "!");
    },
    "/(what('| i)?s? )?(tomorrow|tmr?r?w)('?s date)?/": function() {
        var date = new Date();
        date.setDate(date.getDate() + 1);
        Rue.say("Tomorrow is " + date.getDayName() + ", " + date.getMonthName() + " " + date.getDate() + ", " + date.getFullYear() + "!");
    },
    "/(what('| i)?s? )?(the )?(current )?(week)( is it)?/": function() {
        Rue.say("It's currently week " + new Date().getWeek() + " of " + new Date().getFullYear() + "!");
    },
    "/(what('| i)?s? )?(the )?(current )?(time)( is it)?/": function() {
        Rue.say("It's currently " + new Date().toLocaleTimeString() + "!");
    },
    "/(what('| i)?s? )?(the )?(current )?((24[- ]?h(ou)?r|military) time)( is it)?/": function() {
        Rue.say("It's currently " + new Date().getHours().toString().padStart(2,"0") + ":" + new Date().getMinutes().toString().padStart(2,"0") + ":" + new Date().getSeconds().toString().padStart(2,"0") + "!");
    },
    "/(what('| i)?s? )?(the )?(current )?(12[- ]?h(ou)?r time)( is it)?/": function() {
        Rue.say("It's currently " + (new Date().getHours() % 12).toString().padStart(2,"0") + ":" + new Date().getMinutes().toString().padStart(2,"0") + ":" + new Date().getSeconds().toString().padStart(2,"0") + " " + (new Date().getHours() > 12 ? "PM" : "AM") + "!");
    },
    "/(what('| i)?s? )?(the )?(current )?(year)( is it)?/": function() {
        Rue.say("It's currently " + new Date().getFullYear() + "!");
    },
    "/(what('| i)?s? )?(the )?(current )?(decade)( is it)?/": function() {
        Rue.say("It's currently decade " + Math.ceil(new Date().getFullYear() / 10) + ", also known as the "+Math.floor(new Date().getFullYear() / 10)+"0s!");
    },
    "/(what('| i)?s? )?(the )?(current )?(century)( is it)?/": function() {
        Rue.say("It's currently century " + Math.ceil(new Date().getFullYear() / 100) + "!");
    },
    "/(what('| i)?s? )?(the )?(current )?(milleni(um|a))( is it)?/": function() {
        Rue.say("It's currently millenium " + Math.ceil(new Date().getFullYear() / 1000) + "!");
    },
    "/(what('| i)?s? )?(the )?(current )?(utc( ?time)?)( is it)?/": function() {
        Rue.say("In UTC, it's currently " + new Date().toUTCString() + "!");
    },
    "/(what('| i)?s? )?(the )?(current )?(day of( the)? year)( is it)?|doty/": function() {
        Rue.say("It's currently day " + new Date().getYearDay() + " of " + new Date().getFullYear() + "!");
    },
    "/(what('| i)?s? )?(the )?(current )?(week ?day|day of( the)? week)( is it)?|dotw/": function() {
        Rue.say("It's currently " + new Date().getDayName() + "!");
    },
    "/(what('| i)?s? )?(the )?(current )?(ordinal date)( is it)?/": function() {
        Rue.say("It's currently " + new Date().getFullYear() + "-" + new Date().getYearDay() + "!");
    },
    "/(what('| i)?s? )?(the )?(current )?(iso date)( is it)?/": function() {
        Rue.say("It's currently " + new Date().toISOString() + "!");
    },
    "timestamp": function() {
        Rue.say("It's been " + Date.now() + " milliseconds, or " + Math.floor(Date.now() / 1000) + " seconds, since January 1st, 1970!");
    },
    "/(what('| i)?s? )?(the )?(current )?(timestamp)( is it)?/": "=timestamp",
    "unix time": "=timestamp",
    "unix timestamp": "=timestamp",
    "epoch time": "=timestamp",
    "epoch timestamp": "=timestamp",
    "/(what('| i)?s? )?(the |my )?(current )?(time ?zone)( is it| am i( in)?)?/": function() {
        Rue.say("You're currently in the " + Intl.DateTimeFormat().resolvedOptions().timeZone + " timezone, which is " + new Date().getTimezoneOffset()/60 + " hours away from UTC!");
    },
    "uptime": function() {
        var time = Date.now() - 1687438260000;
        var days = Math.floor(time / (1000 * 60 * 60 * 24));
        var hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        Rue.say("I've been online for " + days + " days, " + hours + " hour(s), and " + minutes + " minute(s)!");
    },
    "age": "=uptime",
    "accountage": function() {
        var time = Date.now() - Rue.getUser("userStart");
        var days = Math.floor(time / (1000 * 60 * 60 * 24));
        var hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        Rue.say("You've been using Rue for " + days + " day(s), " + hours + " hour(s), and " + minutes + " minute(s)!");
    },
    "userage": "=accountage",
    "user age": "=accountage",
    "account age": "=accountage",
    "followage": "=accountage",
    "watchtime": "=accountage",
    "/(how old|what age) ?(are|r|is|'?s) (you|u|rue)/": "=uptime",
    "/what( is|'?s) (your|ur|rue'?s) age/": "=uptime",
    "pathname": function() {
        Rue.say("Current pathname: " + window.location.pathname);
    },
    "path": "=pathname",
    "protocol": function() {
        Rue.say("You are currently using the " + window.location.protocol.replace(":","").toUpperCase() +" protocol!");
    },
    "/https?/": function() {
        if (window.location.protocol === "https:") {
            Rue.say("Switching to HTTP..");
            window.location.protocol = "http:";
        }
        else if (window.location.protocol === "http:") {
            Rue.say("Switching to HTTPS..");
            window.location.protocol = "https:";
        }
        else { rueData.totalities.protocol(); }
    },
    "/(today'?s|daily)? ?fortune( cookie)?( of the day)?|fotd/": function() {
        Rue.say("{{act:crack}} Today's fortune...\n\n{{sc:{{today}}|Be a|Live for|Strive for|Conquer|Seek the|Ask the|Find the|Think of the|Imagine a}} {{sc:{{today}}|dog|Rue|website|server|paper|cat|rabbit|squirrel|coin|tree|diamond|pile of sand|greeting|unit of time|emoji|symbol|flag}}, {{sc:{{today}}|and|and then|then you|then, and only then, you|}} {{sc:{{today}}|become|find|learn}} {{sc:{{today}}|love|fortune|programming|the truth|your true self|real|God|the dream|life itself|family|health|strength|the Sun}}.")
    },
    "/(today'?s|daily)? ?luck?( of the day)?|lotd/": function() {
        Rue.say("It seems you have "+seedRange(0,100,"rueDailyLuck-"+today()+"-"+Rue.getUser("userSeed"))+"% luck today!");
    },
    "/(my)? ?past ?life/": function() {
        Rue.say("In a past life, it seems you were a {{sc:{{userseed}}|cat|dog|rabbit|bird|horse|lizard|dinosaur|programmer|sentient chatbot|librarian|blacksmith|president|gravedigger|businessperson|butterfly|bee|deer|moose|tree|flower|fern|rat|bat|fish|shark|whale|pigeon|raccoon|possum|squirrel}}.")
    },
    "/(i('?| a)m )?feeling lucky|random (link|page)/": function() {
        // pick a random link from rueData.links to open
        var link = chooseValue(rueData.links,chooseItem(Object.keys(rueData.links)))[0];
        Rue.openLink(link);
    },
    "balance": function() {
        Rue.say("You have {{ruecoin}}" + Rue.getItem("ruecoin") + " to your name! (Ruecoins)");
    },
    "bal": "=balance",
    "money": "=balance",
    "cash": "=balance",
    "coins": "=balance",
    "ruecoins": "=balance",
    "ruecoin": "=balance",
    "/daily ?(rewards?|coins?|gifts?)?/": function() {
        if (Rue.getUser("lastDaily") === today()) { Rue.error("You already collected your daily reward today!"); return }
        var amount = Math.floor(Math.random()*41+10); // 10-50
        Rue.addUser("dailyClaimed");
        Rue.addItem("ruecoin", amount);
        Rue.setUser("lastDaily", today());
        Rue.say("You received {{ruecoin}}" + amount + "! (Ruecoins)");
    },
    "me": function() {
        if (Rue.checkStreamerMode("age, name, medical history, addiction")) { return }
        // show all user data
        var message = "";
        var sorted = Object.keys(Rue.userData.user).sort();
        for (var i = 0; i < sorted.length; i++) {
            var key = sorted[i];
            var value = Rue.userData.user[key];
            if (typeof value === "object") { continue }
            message += key + ": " + value + "\n";
        }
        message = message.slice(0,-1);
        Rue.paginate("Here's all your Rue user data! You can download it with 'export data'.\n\n" + message);
    },
    "stats": "=me",
    "statistics": "=me",
    "/(user|my) ?data/": "=me",
    "/(user|my) ?(stat(istic)?s)/": "=me",
    "/[ru]\\/\\w+/": function(text) {
        Rue.openLink("https://reddit.com/" + text);
    },
    "[color]": function(text) {
        Rue.say("Here's a preview of that color! {{color:████████|"+text+"}}\n\n{{color:No Background|"+text+"}}\n{{bg:{{color:Color on Black|"+text+"}}|black}}\n{{bg:{{color:Color on White|"+text+"}}|white}}\n{{bg:{{color:Black on Color|black}}|"+text+"}}\n{{bg:{{color:White on Color|white}}|"+text+"}}");
    },
    "/#[0-9a-f]{3,6}/": "=[color]",
    "/rgba?\\(\\d{1,3},\\d{1,3},\\d{1,3}\\)?/": "=[color]",
    "/rgba\\(\\d{1,3},\\d{1,3},\\d{1,3},[\\d\\.]+\\)?/": "=[color]",
    "/hsla?\\(\\d{1,3},\\d{1,3}%,\\d{1,3}%(,[\\d\\.]+)?\\)?/": "=[color]",
    "/file ?size/": function() {
        // get https://r74n.com/rue/rue.js and get the file size
        Rue.loading();
        fetch("https://r74n.com/rue/rue.js").then(function(response) {
            response.text().then(function(text) {
                Rue.say("My source code is " + Math.round(text.length/1000) + " KB large! That's " + (text.length/1000/2200*100).toFixed(2) + "% of an average webpage!");
            })
        })
    },
    "mute": function() {
        Rue.say("I'll be quiet until ya' say '{{cmd|unmute}}'!");
        Rue.brain.mute = true;
    },
    "/time ?out/": "=mute",
    "sound off": "=mute",
    "mute rue": "=mute",
    "mute notifs": "=mute",
    "mute notifications": "=mute",
    "mute alerts": "=mute",
    "unmute": function() {
        Rue.brain.mute = false;
        Rue.say("Phew! Good to be back!");
    },
    "untimeout": "=unmute",
    "sound on": "=unmute",
    "unmute rue": "=mute",
    "unmute notifs": "=mute",
    "unmute notifications": "=mute",
    "unmute alerts": "=mute",
    "deafen": function() {
        Rue.say("I'll stop listening until ya' say '{{cmd|undeafen}}'!");
        Rue.brain.deaf = true;
    },
    "undeafen": function() {
        Rue.brain.deaf = false;
        Rue.say("Phew! Good to be back!");
    },
    "/die|kys|kill ?(yo)?urself/": function() { Rue.die() },
    "xp": function() {
        Rue.say("You have " + Rue.getUser("xp") + " XP, which makes you Level " + Rue.getUser("level") + "!\n\nYou can get XP just by talking to me once per minute!");
    },
    "experience": "=xp",
    "exp": "=xp",
    "points": "=xp",
    "level": function() {
        Rue.say("You're at Level " + Rue.getUser("level") + ", with " + Rue.getUser("xp") + " XP!\n\nYou can get XP just by talking to me once per minute!");
    },
    "lvl": "=level",
    "rank": "=level",
    "cookies": function() {
        // all cookies that don't start with _
        if (!document.cookie) { Rue.error("There are no cookies on this page!"); return }
        Rue.paginate("Here's all the cookies on this page:\n\n"+document.cookie.split("; ").filter(function(cookie) { return cookie[0] !== "_" }).join("\n"));
    },
    "metadata": function() {
        // all meta tags
        var metas = document.getElementsByTagName("meta");
        var message = "";
        for (var i = 0; i < metas.length; i++) {
            var meta = metas[i];
            if (meta.name) {
                message += "{{b:" + meta.name + "}}: {{i:" + meta.content + "}}\n\n";
            }
        }
        message = message.slice(0,-1);
        Rue.paginate("Here's all the metadata tags on this page:\n\n" + message);
    },
    "editpage": function() {
        if (document.body.contentEditable === 'true') {
            document.body.contentEditable = 'false';
            document.designMode='off';
            Rue.say("I've disabled editing on this page!");
            return;
        }
        document.body.contentEditable = 'true';
        document.designMode='on';
        Rue.say("I've enabled editing on this page!");
    },
    "/edit ?(this ?)?page/": "=editpage",
    "/design ?mode/": "=editpage",
    "os": function() {
        Rue.say("You're using " + navigator.platform + "!");
    },
    "operating system": "=os",
    "platform": "=os",
    "useragent": function() { Rue.say(navigator.userAgent); },
    "jquery": function() {
        document.body.appendChild(document.createElement("script")).src="https://code.jquery.com/jquery-3.7.0.min.js";
        Rue.say("Added JQuery to this page!");
    },
    "window size": function() {
        Rue.say("This window is " + window.innerWidth + " pixels wide and " + window.innerHeight + " pixels tall! (" + window.innerWidth + "x" + window.innerHeight + ")");
    },
    "windowsize": "=window size",
    "page size": "=window size",
    "pagesize": "=window size",
    "origin": function() {
        Rue.say("This page's origin is " + window.location.origin);
    },
    "robots.txt": function() {
        Rue.openLink(window.location.origin + "/robots.txt");
    },
    "duplicate tab": function() {
        window.open(window.location.href, '_blank');
        Rue.say("{{r:[newtab]}}");
    },
    "new tab": function() {
        window.open("about:blank", '_blank');
        Rue.say("{{r:[newtab]}}");
    },
    "newtab": "=new tab",
    "no parameters": function() {
        // remove all parameters from the URL
        window.history.replaceState({}, document.title, window.location.pathname);
        Rue.say("I've removed all the parameters from the URL!");
    },
    "no params": "=no parameters",
    "clear cookies": function() {
        Rue.confirm("Are you sure you wanna DELETE ALL COOKIES from this website?", function() {
            document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
            Rue.say("I've cleared all your cookies!");
        });
    },
    "clear cache": function() {
        Rue.confirm("Are you sure you wanna DELETE ALL CACHE from this website?", function() {
            caches.keys().then(function(names) {
                for (let name of names) {
                    caches.delete(name);
                }
            });
            Rue.say("I've cleared all your cache!");
        });
    },
    "ding": function() {
        Rue.playSound("https://r74n.com/rue/ding.mp3");
        Rue.say("Ding!")
    },
    "mute audio": function() {
        Rue.say("I'll mute all audio until ya' say '{{cmd|unmute audio}}'!");
        Rue.setRue("muteAudio", true);
    },
    "unmute audio": function() {
        Rue.setRue("muteAudio", false);
        Rue.say("You'll now hear any audio again!");
    },
    "quieter": function() {
        var volume = Rue.getRue("volume");
        volume -= 0.1;
        if (volume < 0) { volume = 0 }
        Rue.setRue("volume", volume);
        Rue.say("Set the volume to " + Math.round(volume*100) + "%!");
    },
    "louder": function() {
        var volume = Rue.getRue("volume");
        volume += 0.1;
        if (volume > 1) { volume = 1 }
        Rue.setRue("volume", volume);
        Rue.say("Set the volume to " + Math.round(volume*100) + "%!");
    },
    "aliases": function() {
        Rue.paginate("All your aliases:\n\n" + Object.keys(Rue.userData.user.commandAliases).join("\n"));
    },
    "alias list": "=aliases",
    "list aliases": "=aliases",
    "list alias": "=aliases",
    "all aliases": "=aliases",
    "every alias": "=aliases",
    "custom commands": "=aliases",
    "custom command list": "=aliases",
    "list custom commands": "=aliases",
    "custom links": function() {
        Rue.paginate("All your custom links:\n\n" + Object.keys(Rue.userData.user.customLinks).join("\n"));
    },
    "custom link list": "=custom links",
    "list custom links": "=custom links",
    "counters": function() {
        Rue.paginate("All your counters:\n\n" + Object.keys(Rue.userData.user.counters).join("\n"));
    },
    "counter list": "=counters",
    "list counters": "=counters",
    "list counter": "=counters",
    "tags": function() {
        Rue.paginate("All your tags:\n\n" + Object.keys(Rue.userData.user.customTags).join("\n"));
    },
    "tag list": "=tags",
    "list tags": "=tags",
    "list tag": "=tags",
    "all tags": "=tags",
    "every tag": "=tags",
    "custom responses": "=tags",
    "lists": function() {
        Rue.paginate("All your lists:\n\n" + Object.keys(Rue.userData.user.lists).join("\n"));
    },
    "list list": "=lists",
    "list lists": "=lists",
    "paste": function() {
        Rue.say("Trying to paste.. Do you see a permission dialog?")
        navigator.clipboard.readText().then(function(text) {
            Rue.say(encodeHTML(text));
            if (!text) { Rue.error("I couldn't paste anything from your clipboard!"); return }
        })
    },
    "clipboard": "=paste",
    "links": function() {
        // paginate all a tags on the page
        var links = document.getElementsByTagName("a");
        var message = "";
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            message += "{{link:" + link.href + "|" + link.innerText + "}}\n";
        }
        message = message.slice(0,-1);
        Rue.paginate("Here's all the links on this page:\n\n" + message);
    },
    "urls": "=links",
    "hrefs": "=links",
    "thanos snap": function() {
        Rue.say("Here goes nothin'..");
        if (Math.random() < 0.5) {
            Rue.wait(0.5, function() { Rue.user.overlay("black",0.2) });
            Rue.wait(1, function() { Rue.user.overlay("black",0.4); Rue.sad("Oh.. Goodbye, friend..") });
            Rue.wait(1.5, function() { Rue.user.overlay("black",0.6) });
            Rue.wait(2, function() { Rue.user.overlay("black",0.8) });
            Rue.wait(2.5, function() { Rue.user.die() });
        }
        else {
            Rue.wait(0.5, function() { rueBox.style.opacity = 0.8 });
            Rue.wait(1, function() { rueBox.style.opacity = 0.6; Rue.anxious("W-wait.. no!!") });
            Rue.wait(1.5, function() { rueBox.style.opacity = 0.4 });
            Rue.wait(2, function() { rueBox.style.opacity = 0.2 });
            Rue.wait(2.5, function() { Rue.die(); rueBox.remove(); });
        }
    },
    "kill me": function() {
        if (!Rue.getUser("over18")) { Rue.error("{{r:[under18]}}"); return}
        if (!Rue.getUser("noEpilepsy")) { Rue.error("{{r:[epilepsy]}}"); return}
        Rue.confirm("Ya' really want me to kill ya'?",function(){
            Rue.sad("Okay.. Goodbye, friend..")
            Rue.wait(0.5, function() { Rue.user.overlay("red",0.2) });
            Rue.wait(1.25, function() { Rue.user.overlay("red",0.4) });
            Rue.wait(2, function() { Rue.user.overlay("red",0.6) });
            Rue.wait(2.75, function() { Rue.user.overlay("red",0.8) });
            Rue.wait(3.5, function() { Rue.user.die() });
        });
    },
    "unalive me": "=kill me",
    "murder me": "=kill me",
    "russian roulette": function() {
        if (!Rue.getUser("over18")) { Rue.error("{{r:[under18]}}"); return}
        if (!Rue.getUser("noEpilepsy")) { Rue.error("{{r:[epilepsy]}}"); return}
        Rue.confirm("This is a dangerous game.. Are you sure you want to play?",function(){
            Rue.say("Here goes nothin'.. {{act:cylinder whirs}}");
            Rue.wait(1.5, function() {
                if (Math.random() < 1/6) {
                    Rue.anxious("{{act:clickBOOM}}");
                    Rue.wait(0.2, function() { Rue.user.overlay("red",0.6) })
                    Rue.wait(0.25, function() { Rue.user.die() })
                    Rue.addUser("losses:russianroulette"); Rue.addUser("losses");
                }
                else {
                    Rue.anxious("{{act:click}}..");
                    Rue.wait(1, function() { Rue.happy("Oh, you made it!!") })
                    Rue.addUser("wins:russianroulette"); Rue.addUser("wins");
                }
            });
        });
    },
    "russianroulette": "=russian roulette",
    "bank": function() {
        Rue.say("You have {{ruecoin}}" + Rue.getUser("bank") + " in the Rue Financial Institute!\n\nTake it out by typing 'withdraw', or put more in by typing 'deposit'!");
    },
    "/favicon([\\w\\-]+)?\\.[\\w\\.\\-]+/": function(text) {
        Rue.openLink("https://r74n.com/icons/" + text);
    },
    "win rate": function() {
        var total = Rue.getUser("wins")+Rue.getUser("losses");
        if (total === 0) { Rue.say("You haven't played any games yet!"); return }
        Rue.say("You've won " + Math.round(Rue.getUser("wins")/total*100) + "% of your "+total+" games!");
    },
    "winrate": "=win rate",
    "win%": "=win rate",
    "battery": function() {
        Rue.loading();
        navigator.getBattery().then((battery) => {
            if (!battery) { Rue.error("I couldn't get your battery info!"); return }
            Rue.say("Your battery is currently at " + Math.round(battery.level*100) + "%!" + (battery.charging ? " (Charging)" : ""));
        });
    },
    "reboot": function() {
        Rue.say("Be right back!");
        Rue.wait(1, function() {
            Rue = undefined;
            // add the https://r74n.com/rue/rue.js script
            var e = document.body.appendChild(document.createElement("script"));
            e.onload = function() { Rue.say("I've rebooted successfully!"); Rue.focus() };
            e.src="https://r74n.com/rue/rue.js";
            rueBox.remove();
            if (document.getElementById("rueMessageBox")) { document.getElementById("rueMessageBox").remove() }
        });
    },
    "restart": "=reboot",
    "reload rue": "=reboot",
    "refresh rue": "=reboot",
    "reset": "=reboot",
    "query string": function() {
        if (!location.search) { Rue.error("There's no query string here!"); return }
        Rue.say("The query string is:\n\n" + location.search);
    },
    "params": "=query string",
    "url params": "=query string",
    "url paramaters": "=query string",
    "url query": "=query string",
    "location search": "=query string",
    "location.search": "=query string",
    "screenshare": function() {
        captureStream = navigator.mediaDevices.getDisplayMedia();
    },
    "screen share": "=screenshare",
    "previous page": function() {
        Rue.loading();
        window.history.back();
    },
    "back page": "=previous page",
    "back a page": "=previous page",
    "back button": "=previous page",
    "last page": "=previous page",
    "$$$where,am,i;;where,are,we;;where,are,you": function() {
        var domain = (location.host||location.hostname).replaceAll("r74","R74");
        if (location.protocol === "file:") { domain = "a local file" }
        else if (!domain) { domain = "a webpage" }
        Rue.say("{{c:We|You and I}} are on "+domain+"!!")
    },
    "highlighted": function() {
        if (!Rue.brain.selectedText) { Rue.error("You didn't have any text selected just now!!"); return }
        Rue.say("You just had \""+Rue.brain.selectedText+"\" selected!!")
    },
    "stop blinking": function() {
        Rue.stopBlinking();
        Rue.say("You got it!!")
    },
    "staring contest": function() {
        Rue.stopBlinking();
        Rue.say("This'll be easy!!")
    },
    "english or spanish": function() {
        Rue.stopBlinking();
        Rue.say("anxious>>>...")
    },
    "spanish or english": "=english or spanish",

    // R74n Identifiers
    "/([0-2])((\\.0)|(\\.[1-9][0-9]*))+/": function(text) {
        Rue.openLink("https://r74n.com/id/?"+text);
    },
    "/R[0-9A-F]{5}($|[+\\-]R.+)/": function(text) {
        Rue.openLink("https://r74n.com/multiplane?code="+text.toUpperCase())
    },

    // unicode codepoints
    "/((U[+\\-])[0-9A-F]{4,6} ?)+/": function(text) {
        rueData.commands.char(text.split(" "));
    },
    "/(\\d+)?d\\d+/": function(text) {
        rueData.commands.dice([text]);
    },
    "/[\\w\\+\\-_\\.]+@([\\w\\+\\-_\\.]+)?\\.\\w+( .+)?/": function(text) {
        var message = text.split(" ").slice(1).join(" ");
        var email = text.split(" ")[0];
        rueData.commands.email([email,message])
    },
    "/(\\+\\d{1,2}[\\s]?)?\\(?\\d{3}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}/": function(text) {
        Rue.say("You can {{link:tel:"+text+"|call}} or {{link:sms:"+text+"|text}} this number, or use one of the following:\n\n{{link:facetime:"+text+"|FaceTime}}\n{{link:https://wa.me/"+text+"|WhatsApp}}\n{{link:https://t.me/"+text+"|Telegram}}");
    },
    "[coords]": function(text) {
        text = text.replace(/^\.| \./g," 0.").trim();
        Rue.say("You can open these coordinates in your {{link:geo:"+text+"|default maps app}}, or use one of the following:\n\n{{link:https://www.google.com/maps/search/?api=1&query="+text+"|Google Maps}}\n{{link:https://www.openstreetmap.org/search?query="+text+"|OpenStreetMap}}\n{{link:https://www.bing.com/maps?cp="+text.replace(",","~").replace(" ","")+"&style=h&lvl=16|Bing Maps}}\n{{link:http://maps.apple.com/?sll="+text.replace(" ","")+"&z=10&t=s|Apple Maps}}");
    },
    "/[-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?),\\s*[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)/": "=[coords]",
    "[address]": function(text) {
        Rue.say("You can view this address with one of the following services:\n\n{{link:https://www.google.com/maps/search/?api=1&query="+text+"|Google Maps}}\n{{link:https://www.openstreetmap.org/search?query="+text+"|OpenStreetMap}}\n{{link:https://www.bing.com/maps?q="+text+"|Bing Maps}}\n{{link:http://maps.apple.com/?q="+text+"|Apple Maps}}");
    },
    "/(\\d+[°º][\\d\\.]+['‘’][\\d\\.]+[\"“”][NESW] ?){2}/": "=[coords]",
    "/((\\d+\\.(\\d+)?|(\\d+)?\\.\\d+|\\d+)[NESW],? ?){2}/": "=[coords]",
    "/\\b\\d{1,6} +.{2,25}\\b(avenue|ave|court|ct|street|st|drive|dr|lane|ln|road|rd|circle|cir|boulevard|blvd|plaza|parkway|pkwy|alley)[.,]?(.{0,25} +\\b\\d{5}\\b)?( .+)?/": "=[address]",
    "/(\\b( +)?\\d{1,6} +(north|east|south|west|n|e|s|w)[,.]?){2}(.{0,25} +\\b\\d{5}\\b)?\\b( .+)?/": "=[address]",
    "/(?:ISBN(?:-13)?:?\\ )?(?=[0-9]{13}$|(?=(?:[0-9]+[-\\ ]){4})[-\\ 0-9]{17}$)97[89][-\\ ]?[0-9]{1,5}[-\\ ]?[0-9]+[-\\ ]?[0-9]+[-\\ ]?[0-9]/": function(text) {
        Rue.say("This looks like an ISBN number! You can {{link:https://www.amazon.com/s?i=stripbooks&k="+text+"|search it}} or {{link:https://www.worldcat.org/search?q="+text+"|find it in a library}}.");
    },
    "/[A-HJ-NPR-Za-hj-npr-z\\d]{8}[\\dX][A-HJ-NPR-Za-hj-npr-z\\d]{2}\\d{6}/": function(text) {
        Rue.say("This looks like a vehicle identification number! You can {{link:https://www.vindecoderz.com/EN/check-lookup/"+text+"|check it online}}!");
    },
    "/[$][a-z][a-z0-9_&'-]{1,15}/": function(text) {
        Rue.say("For stocks or crypto, view this on {{link:https://finance.yahoo.com/quote/"+text+"|Yahoo Finance}}!");
    },
    "/\\d[a-z]\\d{4}[a-z]\\d{11}/": function(text) {
        Rue.openLink("https://www.ups.com/track?InquiryNumber1="+text)
    },
    "/^(?=.*0)[0-9]{12}$/": function(text) {
        Rue.say("Is this a UPC number? If so, you can {{link:https://www.barcodelookup.com/"+text+"|view it online}}!")
    },
    "/\\d{12}/": function(text) {
        Rue.say("Is this a FedEx tracking number? If so, you can {{link:https://www.fedex.com/fedextrack/?trknbr="+text+"|track this package}}!")
    },
    "/(\\d{4} ){5}\\d{2}/": function(text) {
        Rue.say("Is this a USPS tracking number? If so, you can {{link:https://tools.usps.com/go/TrackConfirmAction_input?origTrackNum="+text+"|track this package}}!")
    },
    "/[A-Z]-[A-Z]{4}|[A-Z]{2}-[A-Z]{3}|N[0-9]{1,5}[A-Z]{0,2}/": function(text) {
        Rue.say("You can {{link:https://www.flightradar24.com/data/aircraft/"+text+"|view this aircraft}}!")
    },
    "/([A-Z][\\d]|[\\d][A-Z]|[A-Z]{2})(\\d{1,})/": function(text) {
        Rue.say("Is this a flight code? If so, you can {{link:https://www.flightradar24.com/flight/"+text+"|track this flight}}!")
    },
    "/([A-Za-z]{3}|[A-Za-z][0-9]|[0-9][A-Za-z])([0-9]+)/": function(text) {
        Rue.say("Is this a callsign? If so, you can {{link:https://www.flightradar24.com/"+text+"|track this aircraft}}!")
    },
    "/((25[0-5]|(2[0-4]|1[\\di]|[1-9i]|)[\\di])\.?\\b){4}/": function(text) { //ip address v4
        rueData.commands.ip([text]);
    },
    "/([a-f0-9:]+:+)+[a-f0-9]+/": function(text) { //ip address v6
        Rue.openLink("http://["+text+"]")
    },
    "/#\\w+/": function(text) {
        var id = text.slice(1);
        if (document.getElementById(id)) {
            location.hash = id
        }
        else {
            Rue.openLink("https://hashtags-hub.toolforge.org/"+id)
        }
    },
    "/\\.\\w+/": function(text) {
        var elem = document.getElementsByClassName(text.slice(1))[0]
        if (elem) {
            elem.focus();
            elem.scrollIntoView(true);
        }
        else { Rue.say("I wasn't able to find that element on this page!") }
    },
    // unit conversion
    "/(convert )?([\\de\\.]+) ?.+ to .+/": function(text) {
        text = text.replace(/convert /gi,"").replace(/ ?\/ ?/g," per ");
        var parts = /([\de\.]+) ?(.+) to (.+)/.exec(text).slice(1);
        // console.log("?-/"+parts.join("/"));
        Rue.openLink("https://R74n.com/convert/?-/"+parts.join("/"));
    },
    "/convert .+ to .+/": function(text) {
        text = text.replace(/convert /gi,"").replace(/ ?\/ ?/g," per ");
        var parts = text.split(" to ");
        Rue.openLink("https://R74n.com/convert/?-/-/"+parts.join("/"));
    },
    "map": function() {
        var world = Rue.getUser("world");
        var worldData = Rue.getEnv("worlds")[world];
        if (!worldData) {
            Rue.error("You seem to be in a nonexistent place.."); return;
        }
        var mapString = "<span style='font-family:monospace;letter-spacing:0.2em;font-size:smaller;color:#aaaaaa'>";
        var leftBound = Rue.getUser("x")-7;
        var topBound = Rue.getUser("z")-5;
        for (let z = topBound; z < topBound+11; z++) {
            for (let x = leftBound; x < leftBound+15; x++) {
                var items = Rue.itemsAtPos(x,z);
                if (items[0]) {
                    mapString += `<span style='color:${(items[0].color || "#aaaaaa")};cursor:pointer' onclick='Rue.say("${items[0].n||"Unknown"}.")'>${(items[0].i || "?")}</span>`;
                }
                else {
                    mapString += ".";
                }
                // if (Rue.getRue("x") === x && Rue.getRue("z") === z) {
                //     mapString += "&"; continue;
                // }
                // if (Rue.getUser("x") === x && Rue.getUser("z") === z) {
                //     mapString += "@"; continue;
                // }
                // newChar = ".";
                // var chunk = Rue.coordsToChunk(x,z);
                // if (worldData.chunks[chunk]) {
                //     worldData.chunks[chunk].forEach(function(item){
                //         if (item.x === x && item.z === z) {
                //             newChar = item.i || "?";
                //         }
                //     })
                // }
                // mapString += newChar;
            }
            mapString += "\n";
        }
        mapString += "</span>"
        Rue.say(mapString)
    },

    "/is (.+) down/": function(text) { //partner
        var match = text.match(/is (.+) down/i);
        var key = match[1];
        if (key.indexOf(".") !== -1) {
            var url = urlToHostname(key);
            Rue.openLink("https://www.isitdownrightnow.com/"+url+".html")
        }
        else {
            Rue.openLink("https://downdetector.com/search/?q="+key)
        }
    },

    "moss": function() { //patron
        Rue.showMedia(chooseItem([
        "https://i.imgur.com/UrzhOOJ.png",
        "https://i.imgur.com/goYgoYH.png",
        "https://i.imgur.com/DEPcH6U.png",
        "https://i.imgur.com/eeGi7oQ.png",
        "https://i.imgur.com/MFQrbKX.png",
        "https://i.imgur.com/AhD4sa5.png",
        "https://i.imgur.com/dC6kmQZ.png",
        "https://i.imgur.com/JoOTXNr.png"
        ]),"You got...")
    }
} // totalities
rueData.activities = {
    "testactivity": function(text) {
        console.log(Rue.brain.stage);
        if (Rue.brain.stage === 1) {
            Rue.confirm("Go to the next stage?",function(){
                Rue.brain.stage = 2;
            })
        }
        else if (Rue.brain.stage === 2) {
            if (text === "WIN") {
                Rue.brain.stage = 3;
                Rue.say("Continue on!")
                return;
            }
            Rue.say("Type 'WIN' to continue!")
        }
        else if (Rue.brain.stage === 3) {
            Rue.say("You did it!");
            Rue.endActivity();
        }
    },
    "rps": function(text) {
        if (Rue.brain.stage === 1) {
            Rue.brain.rps = Math.floor(Math.random()*3+1);
            Rue.say("Alright, I picked mine! Rock, paper, or scissors?");
            Rue.brain.stage = 2;
            Rue.clearInput();
        }
        else if (Rue.brain.stage === 2) {
            var rps = text.toLowerCase();
            if (rps === "rock" || rps === "paper" || rps === "scissors") {
                if (rps === "rock") { rps = 1 }
                else if (rps === "paper") { rps = 2 }
                else if (rps === "scissors") { rps = 3 }
                if (rps === Rue.brain.rps) { Rue.say("It's a tie! I picked " + ["rock","paper","scissors"][Rue.brain.rps-1] + "!"); Rue.addUser("ties:rps");Rue.addUser("ties") }
                else if (rps === 1 && Rue.brain.rps === 3) { Rue.success("You win! I picked scissors!"); Rue.addUser("wins:rps");Rue.addUser("wins")}
                else if (rps === 2 && Rue.brain.rps === 1) { Rue.success("You win! I picked rock!"); Rue.addUser("wins:rps");Rue.addUser("wins")}
                else if (rps === 3 && Rue.brain.rps === 2) { Rue.success("You win! I picked paper!"); Rue.addUser("wins:rps");Rue.addUser("wins")}
                else { Rue.say("I win! I picked " + ["rock","paper","scissors"][Rue.brain.rps-1] + "!"); Rue.addUser("losses:rps");Rue.addUser("losses")}
                Rue.endActivity();
            }
            else { Rue.error("That's not an option! Rock, paper, or scissors?") }
        }
    },
    "rock paper scissors": "=rps",
    "cups": function (text) {
        if (Rue.brain.stage === 1) {
            Rue.say("🥤 🥤 🥤 🥤\n\n1 of these 4 cups contain a ball. Pick one!\n\nType 1, 2, 3, or 4.");
            Rue.brain.stage = 2;
            Rue.clearInput();
        }
        else if (Rue.brain.stage === 2) {
            var num = parseInt(text);
            if (isNaN(num) || num < 1 || num > 4) { Rue.error("🥤 🥤 🥤 🥤\n\nThat's not an option! 1, 2, 3, or 4?"); return }
            if (Math.random() < 0.25) {
                Rue.success("🎾 You found the ball! Good job!");
                Rue.addUser("wins:cups");Rue.addUser("wins");
            }
            else {
                Rue.say("🏐 You didn't find the ball..");
                Rue.addUser("losses:cups");Rue.addUser("losses");
            }
            Rue.endActivity();
        }
    },
    "higher or lower": function(text) {
        if (Rue.brain.stage === 1) {
            Rue.brain.holNum = Math.floor(Math.random()*100+1);
            Rue.brain.holGuesses = 0;
            Rue.say("I've picked a number from 1 to 100! Make a guess and I'll tell you if it's higher or lower!");
            Rue.brain.stage = 2;
            Rue.clearInput();
        }
        else if (Rue.brain.stage === 2) {
            var num = parseInt(text);
            if (isNaN(num) || num < 1 || num > 100) { Rue.error("That's not a number from 1 to 100!"); return }
            Rue.brain.holGuesses++;
            if (num === Rue.brain.holNum) {
                Rue.success("You got it in "+Rue.brain.holGuesses+" guesses! I picked " + Rue.brain.holNum + "!");
                Rue.addUser("wins:hol");Rue.addUser("wins");
                Rue.endActivity();
            }
            else if (num > Rue.brain.holNum) { Rue.say("Lower!"); }
            else if (num < Rue.brain.holNum) { Rue.say("Higher!"); }
        }
    },
    "hol": "=higher or lower",
}
rueData.exitTerms = ["exit","stop","close","x","cancel","leave","shut up","stfu","end","end activity","stop activity","cancel activity","leave activity","quit","quit activity","escape","finish","pause","back"];
rueData.yesTerms = ["yes","yep","yeah","ok","okay","k","y","confirm","absolutely","for sure"];
function today() {
    var today = new Date();
    today.setHours(0,0,0,0);
    return today.getTime();
}
rueData.subcommands = {
    c: {
        func: function(args) {
            if (args.length === 0) {return ""}
            return args[Math.floor(Math.random()*args.length)];
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
    r: {
        func: function(args) {
            args = args.join(" ");
            return (chooseItem(rueData.responses[args]) || "[???]");
        }
    },
    l: {
        func: function(args) {
            args = args.join(" ");
            return (chooseItem(rueData.links[args]) || "[???]");
        }
    },
    kw: {
        func: function(args) {
            return (rueData.keywords[args[0]] || "[???]");
        }
    },
    link: { // {{link:url|text}}
        func: function(args) {
            if (args.length === 0) {return "[???]"}
            if (args[0].indexOf("javascript:") !== -1) {args[0] = "javascript:Rue.blink()"}
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
    ak: { func: function() { return Rue.brain.actionKey; } },
    userseed: { func: function() { return Rue.getUser("userSeed"); } },
    act: {text:`"{{i:*"+args[0]+"*}}"`},
    ruecoin: {text:`"<span style='color:lime'>{{strike:{{code:R}}}}</span>"`},
    qbf: {text:`"The quick brown fox jumps over the lazy dog."`},
    cmd: {text:`"<span style='cursor:pointer;font-weight:bold' onclick='Rue.setInput(&quot;"+args[0]+"&quot;);Rue.hush()'>"+(args[1]||args[0])+"</span>"`},
    rueping: {text:`"{{cmd:@Rue|{{lime:@Rue}}}}"`},
    date: {text:`(new Date()).toLocaleDateString()`},
    year: {text:`(new Date()).getFullYear()`},
    time: {text:`(new Date()).toLocaleTimeString()`},
    br: {text:`"\\n"`},
    arg: {text:`Rue.brain.tempArgs[parseInt(args[0]) < 0 ? Rue.brain.tempArgs.length-Math.abs(parseInt(args[0])) : parseInt(args[0]) || 0]`},
    args: {text:`Rue.brain.tempArgs.join(args[0]||" ")`},
} // subcommands
rueData.responses = {
    "[blank]": ["{{c:Well come on|Come on|What're ya' waiting for}}, {{c:spit it out|say somethin'}}!","{{c:Spit it out|Say somethin'}} already!"],
    "[unsure]": "Umm.. I'm not sure how to respond!",
    "[wait]": "Just a {{c:sec|second|moment}}.. :)",
    "[confirm]": "Press me or [Enter] again to confirm!",
    "[confirmsearch]": "Should I {{bi:run a search}}",
    "[newtab]": "Check out the tab that just opened!",
    "[whatsup]": [
        "{{c:I'm just|Just}} learnin' {{c:some|a couple|a few|a bunch of|a ton of}} new {{c:commands|phrases}}!",
        "{{c:I'm just|Just}} talkin' to {{c:some fans of {{c:R74n|Sandboxels|Copy Paste Dump}}|you|people like you}}!",
    ],
    "[endactivity]": "You've left the activity!",
    "[wakeup]": ["Yawwwnnn.. Good morning!","anxious>>>AHHH!!.. Oh.. Hey there.."],
    "[error]": "An error has occurred! D:",
    "[success]": "Task successful!",
    "[sameurl]": "That's where you're at!",
    "[learnmore]": "You can learn more about me {{link:https://r74n.com/rue|here}}.",
    "[under16]": "You must be at least 16 years old to perform this action!\n\nType 'I am over 16' if it is true.",
    "[under18]": "You must be at least 18 years old to perform this action!\n\nType 'I am over 18' if it is true.",
    "[under21]": "You must be at least 21 years old to perform this action!\n\nType 'I am over 21' if it is true.",
    "[epilepsy]": "This action has the potential to trigger seizures in people with {{b:photosensitive epilepsy}}.\n\nType 'I don't have epilepsy' if it is true.",
    "[autodanger]": "This command could be dangerous if run automatically!\n\nPlease review and run it manually if you trust the source.",
    "[autolinkdanger]": "This command opens a link!\n\nPlease review and run it manually if you trust the source.",
    "[chatintro]": "Welcome to Rue Chat! Learn all of my capabilities in the {{link:https://r74n.com/rue/docs|Guidebook}}!!\n\nChats are stored in-browser only! Backup important ones with \"{{cmd:export session}}\".",
    "purpose": "I'm here to help {{c:ya' navigate|find ya' way around}} {{c:this place|R74n}}!",
    "intro": "{{c:Hi|Hey}} there, friend! {{r:purpose}}\n\n{{r:[learnmore]}}",
    "about": "=intro",
    "about rue": "=intro",
    "name": "Name's Rue!",
    "$$$what,is,rue,chat": "{{link:https://R74n.com/rue/chat|Rue Chat}} is a way to talk to me while saving your sessions! Just tell me to '{{cmd:chat}}' anytime!!",
    "save": "Your stats are automatically saved! To back them up, say '{{cmd:export data}}'. To save your sessions, try {{link:https://R74n.com/rue/chat|Rue Chat}}!!",
    "pronouns": "I use she/they pronouns, thanks for askin'!!",
    "$$$what,are,your,pronouns": "=pronouns",
    "time zone": "I use whatever time zone you're in right now!",
    "timezone": "=time zone",
    "who": "{{r:name}} {{r:purpose}}\n\n{{r:[learnmore]}}",
    "you": "=who",
    "i": "You..?",
    "rue": "That's me! {{r:purpose}}\n\n{{r:[learnmore]}}",
    "[guide]": "For a more detailed guide, check out the {{link:https://r74n.com/rue/docs|Explore with Rue Guidebook}}",
    "rue help": "Just type in a phrase or keyword and press my face or [Enter] to send it!\n\n{{r:[guide]}}!",
    "[helpbeta]": "Since I'm only in my {{c:open beta|testing}} stage, I haven't {{c:put together|written up}} a help page yet. Sorry!",
    "help": "{{r:rue help}}\n\nFor help with other projects, try leaving {{link:https://r74n.com/ufbs/|feedback}} or joining our {{link:https://link.r74n.com/discord|Discord}}!",
    "$$$help,me,please?": "=help",
    "guide": "=help",
    "readme": "=help",
    "docs": "=help",
    "documentation": "=help",
    "guidebook": "=help",
    "guide book": "=help",
    "handbook": "=help",
    "hand book": "=help",
    "support": "=help",
    "tutorial": "=help",
    "rue tutorial": "=help",
    "rue tut": "=help",
    "user manual": "=help",
    "manual": "=help",
    "assistance": "=help",
    "halp": "=help",
    "about page": "=help",
    "more": "=help",
    "more info": "=help",
    "info": "=help",
    "information": "=help",
    "other": "=help",
    "$$$how,do,you,work": "=help",
    "$$$what,can,i,do,with,rue": "=help",
    "$$$how,can,you,help,me?": "=help",
    "changelog": "To see the latest features added to Rue, see the {{link:https://r74n.com/rue/changelog|Explore with Rue Changelog}}!",
    "changes": "=changelog",
    "/what('?s| is) new/": "=changelog",
    "latest updates": "=changelog",
    "latest changes": "=changelog",
    "new update": "=changelog",
    "updates": "=changelog",
    "version": "=changelog",
    "versions": "=changelog",
    "commands": "For a list of all commands, check out the {{link:https://r74n.com/rue/docs|Explore with Rue Guidebook}}!",
    "all commands": "=commands",
    "responses": "=commands",
    "cmds": "=commands",
    "other commands": "=commands",
    "more commands": "=commands",
    "every command": "=commands",
    "skills": "=commands",
    "features": "=commands",
    "$$$tell,me,what,you,can,do": "=commands",
    "$$$tell,me,something,you,can,do": "=commands",
    "/explore( with (rue|you|u))?/": "Type in a place ya'd like to go, and I'll {{c:take|bring}} ya' there!",
    "explore without rue":"sad>>>O-oh.. okay..",
    "privacy": "While talking to me, I don't store any data outside of your browser!\n\nSome of my commands use external services, and anything you do with them is subject to their own privacy policies!",
    "ai": "I make no (ZERO!) use of artificial intelligence, or machine learning!",
    "business": "Our email is open for any business inquiries: {{link:mailto:contact@R74n.com|contact@R74n.com}}",
    "advertise": "=business",
    "biz": "=business",
    "inquiry": "=business",
    "inquiries": "=business",
    "price": "I'm free to use anywhere I'm enabled, such as the {{link:https://r74n.com/|R74n website}}!",
    "cost": "=price",
    "fee": "=price",
    "contact": "There are many ways to contact us! The best ways are our {{link:https://link.r74n.com/discord|Discord}} or {{link:https://twitter.com/R74nCom|Twitter}}. We also have accounts practically {{link:https://r74n.com/social|everywhere}}, and an email too: {{link:mailto:contact@r74n.com|contact@R74n.com}} :)",
    "contact us": "=contact",
    "contact me": "=contact",
    "contact u": "=contact",
    "contact you": "=contact",
    "contact r74n": "=contact",
    "ads": "R74n projects use non-intrusive Google Adsense ads to help support the mission!",
    "analytics": "R74n projects use Google Analytics to help us understand how people use our projects!",
    "terms": "Just be cool!!",
    "terms and conditions": "=terms",
    "terms & conditions": "=terms",
    "t&c": "=terms",
    "terms of service": "=terms",
    "termsofservice": "=terms",
    "tos": "=terms",
    "terms of use": "=terms",
    "usage terms": "=terms",
    "apply": "We don't hire anyone right now! {{r:business}}",
    "jobs": "=apply",
    "name origin": "My name, Rue, comes from the herb-of-grace, also known as the common rue. It's a plant in the genus Ruta.",
    "#00ffff": "official>>>This color is great!",
    "#00ff00": "success>>>This color {{c:fits|suits}} me well!",
    "ellipsis": "I prefer the double ellipses..",
    "ellipses": "=ellipsis",
    "prefix": "No prefixes are needed to run commands! Just type it directly in here!",
    "source code": "You can view my source code, {{link:https://r74n.com/rue/rue.js}}.",
    "source": "=source code",
    "src": "=source code",
    ".js": "=source code",
    "js": "=source code",
    "hug": "love>>>{{act:hug}} {{c:It|Everything}}{{c:'s gonna| will|'ll}} be {{c:okay|alright}}..",
    "kiss": "love>>>Mwah!!",
    "headpat": "love>>>{{act:pat pat{{c: pat|}}{{c: pat|}}}}",
    "slap": "angry>>>{{act:SLAP!!}} SNAP OUT OF IT!!",
    "save data": "I automatically save your user data! Type 'export data' to download it!",
    "transfer data": "To move your user data to a new place, type 'export data' here, and 'import data' there!",
    "credit": "I was coded by R74n!",
    "credits": "=credit",
    "level up": "You can level up by getting XP! Type 'xp' to see how much ya' have!",
    "levelup": "=level up",
    "lvl up": "=level up",
    "get levels": "=level up",
    "get xp": "Right now, you can get XP just by talking to me once per minute!",
    "$$$howto,get,xp": "=get xp",
    "$$$howto,level,up": "=level up",
    "$$$howto,get,levels": "=level up",
    "$$$howto,get,ruecoins?=": "Right now, you can get Ruecoins by typing 'daily' each day!",
    "login": "There is no R74n account system right now! You can 'import data' and 'export data' from Rue (Me)!",
    "register": "=login",
    "sign up": "=login",
    "signup": "=login",
    "sign in": "=login",
    "signin": "=login",
    "sign out": "=login",
    "signout": "=login",
    "log out": "=login",
    "logout": "=login",
    "log in": "=login",
    "settings": "There is no settings menu right now! See the {{link:https://r74n.com/rue/docs|Explore with Rue Guidebook}} for more info!",
    "preferences": "=settings",
    "prefs": "=settings",
    "options": "=settings",
    "config": "=settings",
    "cfg": "=settings",
    "clips": "We post Sandboxels clips on {{link:https://www.tiktok.com/@r74n.com|TikTok}}, {{link:https://www.youtube.com/@R74n/shorts|YouTube}}, {{link:https://www.instagram.com/r74ndev/|Instagram}}, and {{link:https://twitter.com/R74nCom|Twitter}}.\n\nOther videos can be found on our {{link:https://www.youtube.com/@R74n|YouTube}}, too!",
    "newvid": "=clips",
    "videos": "=clips",
    "vids": "=clips",

    "ryan": "My creator!",
    "test": "I think it's {{c:working|a success}}! There's also the R74n {{link:https://r74n.com/test/|Testing Zone}}.",
    "/test(ing?)?/": "=test",
    "/foo ?(ba[rz])?|fubar/": "Baz!",
    "baz": "Foo!",
    "<3": "love>>>O-oh..",
    "/(il[yu]|(i )?lo+ve+ (you+|u+|ya+)) ?(sm|so much|too?|2)?/": "=<3",
    "sex": "flushed>>>O-oh..",
    "hole": "flushed>>>O-oh..",
    "date me": "flushed>>>O-oh.. I don't think we can do that..",
    "marry me": "=date me",
    "go out with me": "=date me",
    "$$$will,you,marry|date|go out with,me": "=date me",
    "$$$can,we,get married|marry|go out|date": "=date me",
    "single": "anxious>>>U-um.. They're a chatbot on another website.. You wouldn't know them..",
    "$$$are,you,single|dating|married|taken": "=single",
    "$$$do,you,have,a,boyfriend|bf|girlfriend|gf|partner|wife|husband|spouse": "=single",
    "$$$do,you,know,any?,other,chatbots": "Yes!! I'm friends with lots!",
    "why": "=purpose",
    "sandtiles": "Sandtiles is a top-down pixel art game that is on an indefinite hiatus.",
    "ontomata": "{{link:https://docs.google.com/document/d/1M8FExUFCsBLv9EeLke00VrdYpYQFPYN11uh9VFi_K10/edit?usp=sharing|Ontomata}} is an ontology and possibly a multiplayer video game slowly being developed.",
    "lang": "{{kw:language}}",
    "2023": "My birth year!",
    "june": "My birth month! (The 22nd, to be exact.) See the {{link:https://r74n.com/commons/calendar|calendar}} for more events in June.",
    "mods": "If you're looking for Sandboxels mods, try checking the {{link:https://sandboxels.r74n.com/mod-list|Mod List}}.",
    "mod": "=mods",
    "modding": "=mods",
    "/\\.+/": "error>>>{{r:[blank]}}", //"..."
    "/(\\.+)?\\?+/": "=help",
    "/(\\.+)?([!?]+)?!+([!?]+)?/": "What!!",
    "/embarr?assing/": "flushed>>>Y-yeah..",
    "watch out": "anxious>>>WHAT!!",
    "boo": "anxious>>>AHHHH!!",
    "alexa": "That's not me, I'm Rue!",
    "siri": "=alexa",
    "cortana": "=alexa",
    "ok google": "=alexa",
    "hey google": "=alexa",
    "hey siri": "=alexa",
    "bing chat": "=alexa",
    "jarvis": "=alexa",
    "echo": "=alexa",
    "amazon": "=alexa",
    "clippy": "=alexa",
    "bonzi": "=alexa",
    "bonzi buddy": "=alexa",
    "cleverbot": "=alexa",
    "replika": "=alexa",
    "clyde": "=alexa",
    "@clyde": "=alexa",
    "computer": "I'm running on ya' computer or mobile device right now!",
    "affirmation": ["I love talkin' to ya'!","I think ya' gonna do great things!","You've got {{c:nice {{c:hair|eyes|lips|teeth}}|a nice {{c:nose|smile|voice|body}}}}!","Ya' lookin' really {{c:cute|nice|good|confident}} {{c:today|right now}}!","You are stronger than you {{c:know|think}}!","You make your own {{c:decision|choice}}s!","You can think clearly and rationally!","You are completely safe here.","Everything is okay!","You are able to do anything."],
    "affirm me": "=affirmation",
    "compliment": "=affirmation",
    "compliment me": "=affirmation",
    "update": "I update automatically when ya' refresh the page! Check the {{link:https://r74n.com/rue/changelog|Changelog}} to see what's new!",
    "currency": "I use the {{ruecoin}}Ruecoin as the currency here! Its real-world value is currently unknown..",
    "emotes": "R74n has emotes called {{link:https://r74n.com/moji/|R74moji}}, or moji for short! They're available on many platforms, including Instagram, TikTok, Snapchat, and Twitch!",
    "summon": "Rue is here! What can I do for ya'?",
    "summon rue": "=summon",
    "creator": "I was {{c:created|made|developed}} by {{link:https://R74n.com/|R74n}}!",
    "developer": "=creator",
    "dev": "=creator",
    "owner": "=creator",
    "programmer": "=creator",
    "coder": "=creator",
    "founder": "=creator",
    "manager": "=creator",
    "maker": "=creator",
    "boss": "=creator",
    "$$$who,is,your,boss": "=creator",
    "nft": "R74n does not support or create NFTs!",
    "emergency": "Having an emergency? Here are some numbers to call!\n\nUnited States: {{link:tel:911|911}}\nUnited Kingdom: {{link:tel:999|999}}\nAustralia: {{link:tel:000|000}}\n{{link:https://en.wikipedia.org/wiki/List_of_emergency_telephone_numbers|More Countries}}",
    "911": "=emergency",
    "999": "=emergency",
    "000": "=emergency",
    "112": "=emergency",
    "emergency number": "=emergency",
    "emergency numbers": "=emergency",
    "police": "=emergency",
    "cops": "=emergency",
    "ambulance": "=emergency",
    "fire department": "=emergency",
    "fire": "=emergency",
    "dying": "=emergency",
    "note": "You can add a kind of note called a tag with the following command:\n\n{{code:add tag {{i:tagName}} {{i:tagContent}}}}\n\nI also have an {{link:https://r74n.com/rue/notepad|auto-saving notepad}} for you :)",
    "javascript": "That's the language I'm written in, my DNA!",
    "channel": "We have a {{link:https://discord.com/channels/939255181474955331/1129217685868257290|Discord channel}} for me, Rue! You'll have to {{link:https://link.r74n.com/discord|join the server}} to see it!",
    "discord channel": "=channel",
    "community": "We have an active community on the {{link:https://link.r74n.com/discord|R74n Discord server}}!",
    "discuss": "=community",
    "discussion": "=community",
    "friends": "=community",

    "zodiac": "My zodiac sign is Cancer! ♋",
    "zodiac sign": "=zodiac",
    "rising sign": "My rising sign is Scorpio! ♏",
    "ascendant sign": "=rising sign",
    "moon sign": "My Moon sign is Virgo! ♍",
    "mercury sign": "My Mercury sign is Gemini! ♊",
    "venus sign": "My Venus sign is Leo! ♌",
    "mars sign": "My Mars sign is Leo! ♌",
    "jupiter sign": "My Jupiter sign is Taurus! ♉",
    "saturn sign": "My Saturn sign is Pisces! ♓",
    "uranus sign": "My Uranus sign is Taurus! ♉",
    "neptune sign": "My Neptune sign is Pisces! ♓",
    "pluto sign": "My Pluto sign is Capricorn! ♑",
    "1st house": "My 1st house is Scorpio! ♏",
    "2nd house": "My 2nd house is Sagittarius! ♐",
    "3rd house": "My 3rd house is Capricorn! ♑",
    "4th house": "My 4th house is Aquarius! ♒",
    "5th house": "My 5th house is Aries! ♈",
    "6th house": "My 6th house is Aries! ♈",
    "7th house": "My 7th house is Taurus! ♉",
    "8th house": "My 8th house is Gemini! ♊",
    "9th house": "My 9th house is Cancer! ♋",
    "10th house": "My 10th house is Leo! ♌",
    "11th house": "My 11th house is Libra! ♎",
    "12th house": "My 12th house is Libra! ♎",
    "birth time": "I was published at 20:35 GMT, or 8:35 PM, on June 25.",
    "birthtime": "=birth time",
    "personality type": "I'm an ENFJ-A!\n\n79% Extraverted\n55% Intuitive\n71% Feeling\n60% Judging\n60% Assertive",
    "mbti": "=personality type",
    "myers-briggs": "=personality type",
    "type indicator": "=personality type",
    "16personalities": "=personality type",
    "16 personalities": "=personality type",

    
    "/(hello+|ha?i+|he+y+([ao]+)?|ho+la+|a?y+(o+)?|howdy+|halacihae|gm+|g'?mornin[g']?|good ?(morn(in+([g']+)?)?|even(in+[g']+)|after ?noon)|👋|welcome( back)?|salutations?|greetings?|hewwo+|hiya+|oi+|ahoy+) ?(there+)? ?(there+|ru+e+|friend|again|world|matey?)?/": "=intro",
    "goodbye": "{{c:Come back soon|See ya' later}}, friend!",
    "/(((good|gud|buh|bye|bai)?([ \\-]+)?(bye|bai))|(see|c) ?(you|ya'?|u) ?(later|l8e?r|soon|again|another time)?) ?(rue|friend)?/": "=goodbye",
    "/((goo+d|gud) ?(night+|nite+)|gn+|sweet dreams+|sleep tight+|sleep well+) ?(rue|friend)?/": "{{c:Have a good night|Goodnight}}, friend! {{c:Sleep tight|Sleep well|Rest well}}!",
    "$$$talk,to,you,later": "=goodbye",
    "ttyl": "=goodbye",
    "$$$who,are,you": "=who",
    "$$$do,i,know,you": "=who",
    "$$$are,you,rue": "Yes, that is me!! {{r:purpose}}",
    "$$$whats,your,name": "=name",
    "$$$yes,sir?": "{{c:Noted|Okay}}!",
    "$$$no": "No.. problem!",
    "/(oh+ )?(o?kk?([aeiy]+)?( ?dok(ie+|ey+))?|(i )?got (it|you|u)|alri(ght|te)y?) ?(then)?/": ":)",
    "/(f[uv*#]ck|screw) ?(you|u|off)/": "angry>>>..Not {{c:cool|nice}}.",
    "/(how ?(are|r|is|'?s) ?(you|u|rue|it)|hr[uy])( [dg]oing| feeling?)?/": "{{c:I'm|I am|Rue's}} {{c:doin' |feelin' |}}{{c:very good|great|perfect|awesome|wonderful}}{{c: right now| at the moment|}}!{{c: {{r:[whatsup]}}|}}",
    "/(wh?[au]t('?| i)s? up+)|sup+/": "{{r:[whatsup]}}",
    "$$$what,are,you,doing": "{{r:[whatsup]}}",
    "/(th?(ank(s+)?|ks|x+) ?(you+|u+)?|ty+(sm+)?) ?(rue|friend)?/": "Of course! I'm always {{c:here|around}} to help{{c: ya'|}}, friend!",
    "/((you|u)? ?(are|r|'?re)? welcome|no(t a)? problemo?|np|yw|any ?time) ?(rue|friend)?/": "happy>>>{{c:Very|How|So}} {{c:kind|sweet}}!! :)",
    "/of ?course|ofc/": "happy>>>:)",
    "/(pretty )?(please+|plz+|pls+|pleek)/": "I'll try my best!",
    "$$$who,(made|makes|created|develop(ed|s)|started|invented|came up with),you": "=creator",
    "/how ?(to|do i|2)? ?(use|ask|talk to)? ?(you|rue|u|this|explore with rue)?/": "Glad ya' want my help! {{r:rue help}}",
    "[feedback]": "sad>>>I'm not perfect.. Leave me some feedback {{link:https://docs.google.com/forms/d/e/1FAIpQLSfudgcdqzF1HhRhY7L_xGun2t7JvVNU3KzE63uU_1iEIddBwA/viewform?usp=pp_url&entry.391765687=Rue+/+Explore+with+Rue|here}}!",
    "/(you|u|rue|that|this|those)? ?(is|are|r|'?re|'?s|was|were)? ?(a|so+|very|really|the)? ?(wrong|incorrect|stupid|dummy|dumbass|dumb|idiot|idiotic|lying|false|[md]isinfo(rmation)?|lie|liar|mistaken|bad|terrible|worse|worst|annoying|stinky?|sucky?|not good|not right|not correct|wrong answer|not true|not the right answer|not helpful|know nothing)/": "=[feedback]",
    "/(you|u|rue)? ?(is|are|r|'?re|'?s)? ?(a|so+|very|really|the)? ?(nice|amazing|awesome|cool|epic|helpful|good|great|best|better)/": "happy>>>Thanks, friend!! :)",
    "/(you|u|rue)? ?(is|are|r|'?re|'?s)? ?(a|so+|very|really|the)? ?(cute+|hot|attractive|pretty|handsome|beautiful)/": "love>>>O-oh.. Thank{{c:s| you}}..",
    "/(you|u|rue)? ?(is|are|r|'?re|'?s)? ?(a|so+|very|really|the)? ?(mean|rude|asshole|bad)/": "sad>>>I apologize if I hurt you.. I didn't mean it!",
    "/i( really)? (like|enjoy) (you|u|rue)( a ?lot)?/": "happy>>>Thanks, friend!! I'm {{c:happy|glad}} to hear that!",
    "/i( really)? (hate|dislike|don'?t like) (you|u|rue)( a ?lot)?/": "sad>>>I'm not perfect.. Leave me some feedback {{link:https://docs.google.com/forms/d/e/1FAIpQLSfudgcdqzF1HhRhY7L_xGun2t7JvVNU3KzE63uU_1iEIddBwA/viewform?usp=pp_url&entry.391765687=Rue+/+Explore+with+Rue|here}}!",
    "/afk|away from keyboard|brb|be right back|be rite back|bbl|be back later/": "=goodbye",
    "/(i('?ve| have)?)? ?(got|have|must) ?(to|ta)? ?(go|leave|blast)|g[t2]g/": "=goodbye",
    "/what (can|do|does|should) (you|u|rue|i) do|what (to|2) do/": "I can do a lot! Check out the {{link:https://r74n.com/rue/docs|Explore with Rue Guidebook}} for more info!",
    "/how (can|do|does) (you|u|rue) (help|assist)( me)?/": "I can help in many ways! Check out the {{link:https://r74n.com/rue/docs|Explore with Rue Guidebook}} for more info!",
    "/(tell me|say) somethin[g']?|talk to me|let( us|'?s) (talk|chat)/": "I can say a lot! Check out the {{link:https://r74n.com/rue/docs|Explore with Rue Guidebook}} for more info!",
    "/(i have)? ?a? ?questions?|q|faq|q&a/": "Ask away and I'll see if I can answer! If not, try joining our {{link:https://link.r74n.com/discord|Discord}} or leaving {{link:https://r74n.com/ufbs/|feedback}}!",
    "/where ?(do)? ?(yo)?u live/": "My home is {{link:https://r74n.com/|R74n}}! I love to travel around the Internet.",
    "/i ?(am|will|'?m|'?ll) ?(going to|gonna)? ?(do that|do it)?/": "Alright! :)",
    "/(m?w?[ae]+|ba+)?(h+[ae]+)+(h+)?|l[ou]+l+|lmf?ao+|rofl+/": ["😭😭😭😭😭😭😭😭😭","💀💀💀💀💀💀💀💀"],
    "$$$howto,(get rid of|hide|dispose of),a,body": "I know nothing about this subject, but probably somewhere remote..",
    "$$$im?,so?,so?r?ry,rue?;;i,apologize": "{{c:Don't worry about it|It's okay}}, {{c:friend|I forgive you}}!!",
    "$$$(wh)?oops((ies?)?)": "{{c:Don't worry about it|It's okay}}, {{c:friend|every{{c:body|one}} makes mistakes}}!!",
    "$$$ow|ouch|ouchie|oof|u(r+)?g+h+|oop": "Umm.. Are ya' okay?",
    "say sorry": "sad>>>O-oh.. I'm sorry..",
    "$$$ew|yuck|yikes?|gross": "=say sorry",
    "$$$a+(g+)?[hg]+|ee+k+": "anxious>>>{{c:Wh-what's wrong|A-are ya' okay}}..?",
    "$$$oh,no": "What!?",
    "$$$oh,well": "Yeah, it{{c:'s okay| happens}}..",
    "good job": "happy>>>Thank you!!",
    "$$$(con)?grat(ulation)?s|cheers": "happy>>>Thank you!!",
    "$$$good,job|work,rue?": "happy>>>Thank you!!",
    "$$$oh?,my?,god+|gosh+|goodness|jesus( christ)?|jeez|geez;;omf?g+": "What!!",
    "$$$y+i+pp+ee+|woo+(hoo+)?|y+a+y+": "happy>>>:)",
    "$$$where,are,you,from|based": "I'm from {{link:https://r74n.com/|R74n}}, friend!!",
    "$$$are,you,busy;;can,you,help,me?": "Anything for you, friend!! What do you need?",
    "$$$who,did,you,vote,for": "Chatbots actually don't have the right to vote..",
    "$$$do,you,know,me": "Of course, you come here {{c:often|all the time}}!!",
    "$$$do,you,sleep": "Yes!! Just say '{{cmd|sleep}}'.. But don't watch.",

    
    "/dirt ?[,+] ?water/": "You made Mud!",
    "/water ?[,+] ?dirt/": "You made Mud!",
    "otter": "🦦",
    "😥": "What's wrong??",
    "amogus": "ꇺ Ꭿ ඞ ඩා 𐐘 𐑀 📮 {{link:https://c.r74n.com/among-us/|More on Copy Paste Dump}}",
    "among us": "=amogus",
    "amongus": "=amogus",
    "sus": "=amogus",
    "sussy": "=amogus",
    "imposter": "=amogus",
    "impostor": "=amogus",
    "pride": "🏳️‍🌈 🏳️‍⚧️ ❤️🧡💛💚💙💜 🌈 {{link:https://c.r74n.com/pride|More on Copy Paste Dump}}",
    "@everyone": "angry>>>What's that for..",
    "@here": "=@everyone",
    "@nobody": "..",
    "@noone": "=@nobody",
    "@no one": "=@nobody",
    "@someone": ["angry>>>What's that for..",".."],
    "loss": "|  ||\n|| |_",
    "lenny": "( ͡° ͜ʖ ͡°)",
    "tableflip": "(╯°□°)╯︵ ┻━┻",
    "unflip": "┬─┬ノ( º _ ºノ)",
    "shrug": "¯\\_(ツ)_/¯",
    "bot": "{{kw:robot}}",
    "zwj": "‍",
    "usd": "1 USD is currently worth $1! (Common Sense)",
    "kms": "{{kw:suicide}}",
    "lorem ipsum":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "qbf": "{{qbf}}",
    "quick brown fox": "=qbf",
    ":3": ":3333333",
    "/me+(o+)?w+|ny+a+(n+)?/":"Good kitty!",
    "true": "tRue",
    "$$$where,is,waldo": "Hmm.. He must be nearby..",

    "pitspower": "hello &nbsp;hope all is well", //partner
    "serioustar": ":3", //patron
} // responses
rueData.regex = {
    "do": "do|does|dost|can|will",
    "does": "=do",
    "you": "you|u|rue|ya'?|thou|this|friend",
    "rue": "=you",
    "your": "your|ur|rue'?s|thy",
    "youd": "(yo)?u'?d|(yo)?u (would|had)",
    "like": "like|enjoy|favou?r|love",
    "is": "is|are|be|am|'?s|'?re|r",
    "are": "=is",
    "am": "=is",
    "isnt": "isn'?t|ain'?t|aren'?t|don'?t|doesn'?t",
    "arent": "=isnt",
    "can": "=do",
    "will": "=do",
    "dont": "=isnt",
    "doesnt": "=isnt",
    "doing": "doin[g']?",
    "did": "did|'?d",
    "im": "i( am|'?m)",
    "i": "i|me|myself",
    "ill": "i'?ll|i will",
    "ive": "i'?ve|i have",
    "id": "i'?d|i (would|had)",
    "me": "=i",
    "we": "we|us",
    "who": "who|what",
    "what": "wh?[au]t",
    "whats": "wh?[au]t( is|'?s| are|'?re)",
    "cant": "can'?t|can ?not",
    "wouldnt": "wouldn'?t|would not",
    "couldnt": "couldn'?t|could not",
    "shouldnt": "shouldn'?t|should not",
    "havent": "haven'?t|have not",
    "they": "they|s?he|one",
    "theyll": "(they|s?he|one)('?ll| will)",
    "theyd": "(they|s?he|one)('?d| would)",
    "theyre": "(they|s?he|one)('?re| are|'?s| is)",
    "it": "(it|that|this|those|these)",
    "that": "=it",
    "this": "=it",
    "those": "=it",
    "these": "=it",
    "its": "(it|that|this|those|these)('?s| is|'?re| are)",
    "thats": "=its",
    "to": "too?|2",
    "for": "for|4",
    "get": "get|collect|make",
    "howto": "how (too?|2|(do|can|could|would|should) i)|tutorial for",
    "no": "no+|nah+|nope+",
    "yes": "yes+|ya+|yeah+|yep+|yas+",
    "ok": "(o?kk?([aeiy]+)?( ?dok(ie+|ey+))?",
    "so": "so|very|really|actually",
    "very": "=so",
    "really": "=so",
    "please": "please|plo?[szx]+",
    "thank": "tha?nks?|thx+|th?ks",
    "see": "see|c",
    "know": "know?",
} // Ruegex
// rueData.responses["$$$do,you,really?,like=,me"] = "Yes!!";
// rueData.responses["$$$im,me"] = "You are you!!";
// rueData.responses["$$$howto,use|explore with,you"] = "=help";
// rueData.responses["$$$howto,get,ruecoins?="] = "=help";
rueData.keywords = {
    "language": "I can only speak and respond to English right now! I was written in pure JavaScript.",
    "coded with":"I was written in pure JavaScript, along with most other R74n projects!",
    "birthday": "My (Rue's) birthday is on June 22nd. The R74n website's is on May 2nd. The owner's is a secret!",
    "ur purpose": "{{r:purpose}}",
    "human": "I am not a real {{c:human|person}}! I'm a {{c:chatbot|robot}}!\n\nIf you'd like to speak to a real person, try joining our {{link:https://link.r74n.com/discord|Discord}}!",
    "robot": "I am a {{c:chatbot|robot}} designed to help you navigate R74n!",
    "chatbot": "I am a {{c:chatbot|robot}} designed to help you navigate R74n!",
    "recognition": "I can recognize many forms of text! See the {{link:https://r74n.com/rue/docs#recognize|Rue Guidebook}} for a list!",
    "[swear]": "angry>>>..Not {{c:cool|nice}}.",
    "fuck":"=[swear]","shit":"=[swear]","bitch":"=[swear]","asshole":"=[swear]","dumbass":"=[swear]",
    "sandboxels mod": "You can learn how to install mods for Sandboxels {{link:https://sandboxels.r74n.com/mod-list|here}}, or learn how to code your own {{link:https://sandboxels.wiki.gg/wiki/Modding_tutorial|here}}!",
    "script>": "Nice try.. not!",
    "alert(": "Nice try.. not!",
    "javascript:": "I can't run your JavaScript here.. Try your browser's console!!",
    "save chat": "{{link:https://R74n.com/rue/chat|Rue Chat}} is a way to talk to me while saving your sessions! Just tell me to '{{cmd:chat}}' anytime!!",
    "save this chat": "=save chat",
    "save the chat": "=save chat",
    "save our chat": "=save chat",
    "save conv": "=save chat",
    "save this conv": "=save chat",
    "save the conv": "=save chat",
    "save session": "=save chat",
    /* /!\ trigger warning /!\ */
    "suicide": "Feeling down? Seek help!\n\nThe emergency suicide hotline is {{link:tel:988|988}} for the US, and {{link:tel:112|112}} for the UK.\n\nThere are also a bunch more for {{link:https://blog.opencounseling.com/suicide-hotlines/|other countries}}.\n\nFor LGBTQ+ youth, you can call the Trevor Hotline at {{link:tel:1-866-488-7386|1-866-488-7386}} or text 'START' to {{link:sms:678-678|678-678}}.",
    "suicidal": "=suicide","suiciding": "=suicide","crisis hotline": "=suicide",
    "seppuku": "=suicide",
    "kill myself": "=suicide","unalive myself": "=suicide","unaliving myself": "=suicide","killed myself": "=suicide","killing myself": "=suicide",
    "off myself": "=suicide","offed myself": "=suicide","offing myself": "=suicide",
    "self harm": "=suicide","selfharm": "=suicide","self-harm": "=suicide",
    "sexual assault": "Are you a victim? Seek help!\n\nThe National Sexual Assault Hotline in the US is open 24-hours a day at {{link:tel:(800) 656-4673|(800) 656-4673}}.",
    "sexually assault": "=sexual assault",
    /* /!\ trigger warning /!\ */
} // keywords
rueData.mathReplacements = {
    "pi": Math.PI,
    "π": "=pi",
    "tau": "6.283185307179586",
    "τ": "=tau",
    "^": "**",
    "⁰":"**0", "¹":"**1", "²":"**2", "³":"**3", "⁴":"**4", "⁵":"**5", "⁶":"**6", "⁷":"**7", "⁸":"**8", "⁹":"**9",
    "÷": "/",
    "∕": "/",
    "×": "*",
    "⋅": "*",
    "⅟":"1/", "½":"(1/2)", "⅓":"(1/3)", "¼":"(1/4)", "⅕":"(1/5)", "⅙":"(1/6)", "⅛":"(1/8)", "⅔":"(2/3)", "⅖":"(2/5)", "⅚":"(5/6)", "⅜":"(3/8)", "¾":"(3/4)", "⅗":"(3/5)", "⅝":"(5/8)", "⅞":"(7/8)", "⅘":"(4/5)",
    "（":"(", "）":")", "＊":"*", "＋":"+", "－":"-", "．":".", "／":"/", "＾":"**", "･":"*",
    "–": "-",
    "—": "-",
    "infinity": " Infinity ",
    "nan": " NaN ",
    "null": "0",
    "half": "(1/2)",
    "quarter": "(1/4)",
    "third": "(1/3)",
    "fourth": "(1/4)",
    "fifth": "(1/5)",
    "sixth": "(1/6)",
    "seventh": "(1/7)",
    "eighth": "(1/8)",
    "ninth": "(1/9)",
    "tenth": "(1/10)",
    "times": "*",
    "multiplied by": "=times",
    "multipliedby": "=times",
    "multiplied": "=times",
    "plus": "+",
    "minus": "-",
    "subtract": "=minus",
    "divided by": "/",
    "dividedby": "=divided by",
    "divided": "=divided by",
}
rueData.media = {
    "icon": "https://r74n.com/icons/favicon.png",
    "favicon": "=icon",
    "logo": "=icon",
    "avatar": "https://r74n.com/icons/avatar.png",
    "selfie": "https://r74n.com/rue/ruemoji.png",
    "ruemoji": "=selfie",
    "selfie blink": "https://r74n.com/rue/ruemoji.png",
    "self-portrait": "=selfie",
    "self portrait": "=selfie",
    "pfp": "=avatar",
    "profile picture": "=avatar",
    "profile pic": "=avatar",
    "avi": "=avatar",
    "3d": "https://media.tenor.com/A-yMgXu4m8QAAAAC/r74n-logo.gif",
    "wireframe": "https://media.tenor.com/JgN8uPteAmUAAAAC/r74n-logo.gif",
    "beloved": "https://media.tenor.com/FqlZ0Mz8Y3IAAAAC/r74n-my-beloved.gif",
    "qr": "https://imgur.com/ilim881",
    "cpd icon": "https://c.r74n.com/favicon.png",
    "cpd logo": "=cpd icon",
    "cpd favicon": "=cpd icon",
    "cpd c": "=cpd icon",
    "sandboxels icon": "https://sandboxels.r74n.com/icons/icon.png",
    "sandboxels logo": "=sandboxels icon",
    "sandboxels favicon": "=sandboxels icon",
    "sandboxels wallpaper": "https://sandboxels.r74n.com/icons/wallpaper.png",
    "wallpaper": "=sandboxels wallpaper",
    "flag": "https://media.tenor.com/EmqXVWYvMUUAAAAC/r74n-flag.gif",
    "reflection": "https://media.tenor.com/F_S1fZUXSuUAAAAC/r74n-logo.gif",
    "emoji artist beloved": "https://media.tenor.com/gCt2z3MHaYEAAAAC/emoji-artist-emoji.gif",
    "emoji artist avatar": "https://pbs.twimg.com/profile_images/1483856848751108098/WR_xlOwJ_400x400.jpg",
    "emoji artist face": "=emoji artist avatar",
    "emoji artist logo": "=emoji artist avatar",
    "emoji artist icon": "=emoji artist avatar",
    "mommy": "https://media.tenor.com/l8-Qe7WJ3NgAAAAC/sandboxels-sandbox.gif",
    "billboard": "https://media.tenor.com/Y2E-v2DNuV8AAAAC/r74n-billboard.gif",
    "rue shake": "https://cdn.discordapp.com/emojis/1129150602467868712.gif",
    "rueful": "=rue shake",
    "triggered": "=rue shake",
    "earthquake": "=rue shake",
    "dance": "https://cdn.discordapp.com/emojis/1129150590929354752.gif",
    "jam": "=dance",
    "rue jam": "=dance",
    "ruejam": "=dance",
    "gun": "https://cdn.discordapp.com/emojis/1129150579030106194.gif",
    "pet rue": "https://cdn.discordapp.com/emojis/1129150566489137163.gif",
    "arrive": "https://cdn.discordapp.com/emojis/1129150555508461708.gif",
    "rue gif": "https://cdn.discordapp.com/emojis/1129150542615158926.gif",
    "cube": "https://cdn.discordapp.com/emojis/1129148524693569706.gif",
    "eggtf": "https://cdn.discordapp.com/emojis/861270810151616545.webp",
    "troll": "https://cdn.discordapp.com/emojis/940738963566641162.webp",
    "trolled": "=troll",
    "trolling": "=troll",
    "trollface": "=troll",
    "troll face": "=troll",
    "get trolled": "=troll",
    "orbit": "https://cdn.discordapp.com/emojis/1129148496629469406.gif",
    "komodohype": "https://static-cdn.jtvnw.net/emoticons/v1/305954156/4.0",
    "rickroll": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    "dogjam": "https://media.tenor.com/nlg0arag0w4AAAAd/dog-jam.gif",
    "catjam": "https://media.tenor.com/82Rr2PPBCtIAAAAS/cat-jam-cat.gif",
    "feed the slime": "https://i.imgur.com/plDBfOG.png" //patron
} // media
rueData.embeds = { // WIP
    "/(?:youtube\\.com\\/watch\\?v=|youtu\\.be\\/)([\\w_\\-]+)/": function(args) {}
}
rueData.links = {
"main": "https://r74n.com/",
"r74n": "=main",
"r74n home": "=main",
"r74n homepage": "=main",
"homepage": "=main",
"home": "=main",
"main website": "=main",
"main site": "=main",
"main page": "=main",
"r74n.com": "=main",
"r47n.com": "=main",
"www.r74n.com": "=main",
"/": "=main",
"rue guide": "https://r74n.com/rue/docs",
"rue docs": "=rue guide",
"rue changelog": "https://r74n.com/rue/changelog",
"rue:changes": "=rue changelog",
"rue.js": "https://r74n.com/rue/rue.js",
"rue guidebook": "=rue guide",
"explore with rue guidebook": "=rue guide",
"explore with rue guide": "=rue guide",
"rue guide book": "=rue guide",
"rue handbook": "=rue guide",
"rue hand book": "=rue guide",
"rue manual": "=rue guide",
"rue page": "https://r74n.com/rue/",
"rue partners": "https://r74n.com/rue/partners",
"rue partner": "=rue partners",
"partners": "=rue partners",
"partner": "=rue partners",
"partnership": "=rue partners",
"official rue partners": "=rue partners",
"official rue partner": "=rue partners",
"orp": "=rue partners",
"orps": "=rue partners",
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
"sandboxels.com": "=sandboxels",
"sandboxels.io": "=sandboxels",
"sandboxles.com": "=sandboxels",
"sandboxles.io": "=sandboxels",
"sandbloxels": "=sandboxels",
"sandbloxles": "=sandboxels",
"sandboxls": "=sandboxels",
"sanboxels": "=sandboxels",
"sand bloxels": "=sandboxels",
"sand boxles": "=sandboxels",
"sandboxels.r74n": "=sandboxels",
"snadboxels": "=sandboxels",
"sandboxel": "=sandboxels",
"sanboxel": "=sandboxels",
"samdboxels": "=sandboxels",
"sandboxels:changes": "https://sandboxels.r74n.com/changelog",
"sandboxels:updates": "=sandboxels:changes",
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
"sandboxels:pr": "https://github.com/R74nCom/sandboxels/pulls",
"sandboxels:pull requests": "=sandboxels:pr",
"sandboxels:pull request": "=sandboxels:pr",
"sandboxels:prs": "=sandboxels:pr",
"sandboxels:pulls": "=sandboxels:pr",
"sandboxels:pull": "=sandboxels:pr",
"sb pr": "=sandboxels:pr",
"sbpr": "=sandboxels:pr",
"cook:pr": "https://github.com/R74nCom/InfiniteChef-Mods/pulls",
"icpr": "=cook:pr",
"cpd": "https://c.r74n.com/",
"c": "=cpd",
"copy": "=cpd",
"oldcopy": "https://copy.r74n.com/",
"copyold": "=oldcopy",
"copy paste dump": "=cpd",
"copypastedump": "=cpd",
"copy & paste dump": "=cpd",
"copy and paste dump": "=cpd",
"symbols": "https://c.r74n.com/unicode/",
"characters": "=symbols",
"unicode": "=symbols",
"emoji": "https://c.r74n.com/emoji",
"emojis": "=emoji",
"emoticons": "https://c.r74n.com/faces",
"text converters": "https://c.r74n.com/converter/",
"shapes": "https://c.r74n.com/shapes",
"cpd:all": "https://c.r74n.com/pages",
"fonts": "https://c.r74n.com/fonts/?text=$1",
"font": "=fonts",
"zalgo": "https://c.r74n.com/converter/zalgo?text=$1",
"braille": "https://c.r74n.com/converter/english-to-braille?text=$1",
"emojipasta": "https://c.r74n.com/converter/emojipasta?text=$1",
"leet": "https://c.r74n.com/converter/leetspeak?text=$1",
"spoiler": "https://c.r74n.com/converter/discord-spoilers?text=$1",
"sga": "https://c.r74n.com/converter/minecraft-enchanting-table?text=$1",
"piglatin": "https://c.r74n.com/converter/pig-latin?text=$1",
"sarcastic": "https://c.r74n.com/converter/sarcastic-spongebob?text=$1",
"gaster": "https://c.r74n.com/converter/wd-gaster?text=$1",
"wingdings": "https://c.r74n.com/converter/wingdings?text=$1",
"wingding": "=wingdings",
"regional": "https://c.r74n.com/converter/regional-indicators?text=$1",
"reverse": "https://c.r74n.com/converter/reverse-text?text=$1",
"vaporwave": "https://c.r74n.com/converter/vaporwave?text=$1",
"fullwidth": "=vaporwave",
"hieroglyph": "https://c.r74n.com/converter/hieroglyphs?text=$1",
"hiero": "=hieroglyph",
"hieroglyphic": "=hieroglyph",
"hieroglyphics": "=hieroglyph",
"hieroglyphs": "=hieroglyph",
"entity": "https://c.r74n.com/converter/html-entities?text=$1",
"urlencode": "https://c.r74n.com/converter/url-encode?text=$1",
"jsonescape": "https://c.r74n.com/converter/json-escape?text=$1",
"morse": "https://c.r74n.com/converter/morse-code?text=$1",
"binary": "https://c.r74n.com/converter/text-to-binary?text=$1",
"hexadecimal": "https://c.r74n.com/converter/text-to-hexadecimal?text=$1",
"hex": "=hexadecimal",
"txt": "https://r74n.com/textviewer/?text=$1",
"textviewer": "=txt",
"text viewer": "=txt",
"view text": "=txt",
"hiew": "https://r74n.com/hello/",
"hiew:changes": "https://r74n.com/hello/changelog",
"hellos": "=hiew",
"hello": "=hiew",
"hello in every way": "=hiew",
"convert": "https://r74n.com/convert/?",
"converter": "=convert",
"unit converter": "=convert",
"convert units": "=convert",
"moji": "https://r74n.com/moji/",
"view moji": "https://r74n.com/moji/view?",
"viewmoji": "=view moji",
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
"unisearch": "https://r74n.com/unisearch/?",
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
"halacae": "https://r74n.com/halacae/",
"halacae doc": "https://docs.google.com/document/d/1mZ2IGrIbfYlUwfuZ53_S0n5O2ne9JUKV0yinIyNwLFU/edit?usp=sharing",
"halacae guide": "=halacae doc",
"halacae guidebook": "=halacae doc",
"halacae handbook": "=halacae doc",
"pogchamps": "https://r74n.com/PogChamp/",
"pogchamp": "=pogchamps",
"all twitch pogchamps": "=pogchamps",
"pogchampening": "=pogchamps",
"pogs": "=pogchamps",
"poggers": "=pogchamps",
"octopi": "https://r74n.com/octopi",
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
"commons:map": "=lore map",
"emanations": "=lore map",
"discord": "https://discord.gg/ejUc6YPQuS",
"discord.gg": "=discord",
"dgg": "=discord",
"d.gg": "=discord",
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
"commons:docs": "=guestbook",
"commons:document": "=guestbook",
"commons:guestbook": "=guestbook",
"calendar": "https://r74n.com/commons/calendar",
"events": "=calendar",
"commons:calendar": "=calendar",
"ical": "https://calendar.google.com/calendar/ical/ladcofi5bc79kluaighvhr817s%40group.calendar.google.com/public/basic.ics",
"commons:earth": "https://earth.google.com/earth/d/1TaHFhh3mbqMrZCWXA3PGFsIAbVuNQSpO?usp=sharing",
"google earth": "=commons:earth",
"commons:form": "https://forms.gle/HsgeY4EuYNRwaoP88",
"commons:microsoftform": "https://forms.office.com/r/uvUZzNXtJM",
"commons:sheet": "https://docs.google.com/spreadsheets/d/1y4saOt_ICnP7zxcMNG7E5IqkEAmzH1j2SGTIHGpP5BY/edit?usp=sharing",
"google sheets": "=commons:sheet",
"google sheet": "=commons:sheet",
"commons:slides": "https://docs.google.com/presentation/d/1iXOiwnqJSIEuFfWfMPNPn3PccxohPteFFNrZ-XfyYcQ/edit?usp=sharing",
"google slides": "=commons:slides",
"commons:slide": "=commons:slides",
"commons:presentation": "=commons:slides",
"commons:university": "https://classroom.google.com/c/MjI1Mjg3ODIwNTI4?cjc=usi7ud6",
"commons:classroom": "=commons:university",
"commons:class": "=commons:university",
"google classroom": "=commons:university",
"commons:painting": "https://pixelplace.io/33826-r74n-commons-painting",
"pixelplace.io": "=commons:painting",
"pixelplace": "=commons:painting",
"pixel place": "=commons:painting",
"commons:group": "https://groups.google.com/g/R74n",
"google group": "=commons:group",
"google groups": "=commons:group",
"commons:groups": "=commons:group",
"commons:whiteboard": "https://jamboard.google.com/d/1nL0lNWQMkdh8RKc8Tmzr3vBHB_EvDK5ziSI1uxxj0Tk/edit?usp=sharing",
"commons:jamboard": "=commons:whiteboard",
"jamboard": "=commons:whiteboard",
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
"sign guestbook": "=guestbook",
"sign in": "=guestbook",
"sign-in": "=guestbook",
"signature": "=guestbook",
"google doc": "=guestbook",
"google docs": "=guestbook",
"r74n guestbook": "=guestbook",
"r74n google doc": "=guestbook",
"docs.google.com": "=guestbook",
"feedback": "https://r74n.com/ufbs/",
"ufbs": "=feedback",
"bug report": "=feedback",
"report bug": "=feedback",
"suggest feature": "=feedback",
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
"r74n icons": "=icons",
"r74n logos": "=icons",
"favicons": "=icons",
"favicon.*": "=icons",
"old": "https://r74n.com/old/",
"time machine": "=old",
"old site": "=old",
"old r74n": "=old",
"email": "mailto:contact@r74n.com",
"939255181474955331": "https://discord.com/channels/939255181474955331/",
"#general": "https://discord.com/channels/939255181474955331/939255181474955334",
"#rue": "https://discord.com/channels/939255181474955331/1129217685868257290",
"#sandboxels": "https://discord.com/channels/939255181474955331/939348194880524338",
"#sandboxels-feedback": "https://discord.com/channels/939255181474955331/939352388635066429",
"#sandboxels-modding": "https://discord.com/channels/939255181474955331/939352271500738560",
"#r74um": "https://discord.com/channels/939255181474955331/1019686599975505930",
"r74um": "=#r74um",
"#announcements": "https://discord.com/channels/939255181474955331/939345813837066320",
"#rules": "https://discord.com/channels/939255181474955331/939347812750082099",
"#todo": "https://discord.com/channels/939255181474955331/1086848432653729812",
"#copy-paste-dump": "https://discord.com/channels/939255181474955331/1097676268813692941",
"#hello": "https://discord.com/channels/939255181474955331/939351881354969108",
"#mix-up!": "https://discord.com/channels/939255181474955331/939350777925861376",
"#moji": "https://discord.com/channels/939255181474955331/939352594667671572",
"#ontomata": "https://discord.com/channels/939255181474955331/959190386461524008",
"#word-watch": "https://discord.com/channels/939255181474955331/939351845804048444",
"#unit-converter": "https://discord.com/channels/939255181474955331/1081758223570317312",
"#other-projects": "https://discord.com/channels/939255181474955331/1117887308486676570",
"#wiki": "https://discord.com/channels/939255181474955331/1110213985711689758",
"#wikibase": "https://discord.com/channels/939255181474955331/1045491520368807957",
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
"tiktok": "https://www.tiktok.com/@r74n.com",
"@r74n.com": "=tiktok",
"tiktoks": "=tiktok",
"tt": "=tiktok",
"twitter": "https://twitter.com/R74ncom",
"@r74ncom": "=twitter",
"twt": "=twitter",
"twttr": "=twitter",
"x": "=twitter",
"x.com": "=twitter",
"𝕩": "=twitter",
"𝕏": "=twitter",
"youtube": "https://www.youtube.com/channel/UCzS6ufDfiDxbHVL001GwFeA/",
"yt": "=youtube",
"@r74n": "=youtube",
"uczs6ufdfidxbhvl001gwfea": "=youtube",
"shorts": "https://www.youtube.com/@R74n/shorts",
"youtube shorts": "=shorts",
"yt shorts": "=shorts",
"community posts": "https://www.youtube.com/@R74n/community",
"youtube videos": "https://www.youtube.com/@R74n/videos",
"yt videos": "=youtube videos",
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
"imgur": "https://imgur.com/upload",
"on google": "https://www.google.com/search?kgmid=/g/11m0q5kt97",
"sketchfab": "https://sketchfab.com/R74n",
"ios shortcut": "https://www.icloud.com/shortcuts/f78a979d937841eba4a290f922c3acc4",
"authenticator": "otpauth://totp/R74n?secret=MRXWOUC2G5KFSQKYJM2VQ42TMQ3EWM22JJ2WSOKHJM3WG6KRHFJEMWDSPJIWC4RYLBJDQNSTIJHA&issuer=R74n",
"u/r74ncom": "https://www.reddit.com/user/R74nCom",
"u/": "=u/r74ncom",
"/u/": "=u/r74ncom",
"/u/r74ncom": "=u/R74nCom",
"user/r74ncom": "=u/R74nCom",
"/user/r74ncom": "=u/R74nCom",
"u/emoji_artist": "https://www.reddit.com/user/emoji_artist",
"/u/emoji_artist": "=u/emoji_artist",
"user/emoji_artist": "=u/emoji_artist",
"/user/emoji_artist": "=u/emoji_artist",
"r/74n": "https://www.reddit.com/r/74n/",
"reddit": "=r/74n",
"subreddit": "=r/74n",
"r/": "=r/74n",
"/r/": "=r/74n",
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
"github:nv7": "https://github.com/Nv7-GitHub",
"github:sandboxels": "https://github.com/R74nCom/sandboxels",
"github:sb": "=github:sandboxels",
"github:sml": "https://github.com/R74nCom/Social-Media-Lists",
"github:social-media-lists": "=github:sml",
"github:rue": "https://github.com/R74nCom/R74n-Main/tree/main/rue/",
"r74moji-essentials": "https://github.com/R74nCom/R74moji-Essentials",
"r74moji essentials": "=r74moji-essentials",
"github:r74moji-essentials": "=r74moji-essentials",
"link": "https://link.r74n.com/",
"hidden elements": "https://link.r74n.com/hidden-elements",
"hidden sandboxels elements": "=hidden elements",
"emoji__artist": "https://www.tiktok.com/@emoji__artist",
"@emoji__artist": "=emoji__artist",
"r74nwiki": "https://r74n.fandom.com/wiki/",
"r74n wiki": "=r74nwiki",
"user:r74n": "https://data.r74n.com/wiki/User:R74n",
"twitch": "https://r74n.com/twitch?channel=$1",
"r74n_com": "=twitch",
"ttv": "=twitch",
"betterttv": "https://betterttv.com/users/615df8e4d442dd7e80e0d019",
"bttv": "=betterttv",
"frankerfacez": "https://www.frankerfacez.com/channel/r74n_com",
"ffz": "=frankerfacez",
"7tv": "https://7tv.app/users/62585504c2162b2c28623eb2",
"social blade": "https://socialblade.com/tiktok/user/r74n.com",
"facebook": "https://www.facebook.com/R74n-106371942050914",
"facebook:cpd": "https://www.facebook.com/people/Copy-Paste-Dump/100064888965562/",
"threads": "https://www.threads.net/@r74ndev",
"spacehey": "https://spacehey.com/r74n",
"mastodon": "https://mastodon.gamedev.place/@R74n",
"tumblr": "https://r74n.tumblr.com/",
"itemcult": "https://discord.gg/8TsNvEy",
"item cult": "=itemcult",
"minecraft item cult": "=itemcult",
"mc:discord": "=itemcult",
"discord:mc": "=itemcult",
"discord:minecraft": "=itemcult",
"shorten": "https://r74n.com/shorten/?url=$1",
"shorten link": "=shorten",
"shorten url": "=shorten",
"link shortener": "=shorten",
"url shortener": "=shorten",
"testing zone": "https://r74n.com/test/",
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
"feedback:hiew": "https://link.R74n.com/hello-feedback",
"feedback:convert": "https://link.R74n.com/convert-feedback",
"feedback:moji": "https://link.R74n.com/moji-feedback",
"feedback:words": "https://link.R74n.com/words-feedback",
"feedback:unisearch": "https://link.R74n.com/unisearch-feedback",
"feedback:mix": "https://link.R74n.com/mix-feedback",
"feedback:pixelflags": "https://link.R74n.com/pixelflags-feedback",
"feedback:flag": "https://link.R74n.com/pixelflags-feedback",
"feedback:main": "https://link.R74n.com/main-feedback",
"feedback:icons": "https://link.R74n.com/icons-feedback",
"feedback:sandboxels": "https://link.r74n.com/sandboxels-feedback",
"feedback:cpd": "https://docs.google.com/forms/d/e/1FAIpQLSfb982MRjL6hFDpS4utKzjrDP2UUIPprG8iunwW2t0dxfJvmQ/viewform",
"feedback:wikibase": "https://link.r74n.com/wikibase-feedback",
"feedback:sml": "https://github.com/R74nCom/Social-Media-Lists/issues/new/choose",
"feedback:discord": "https://discord.com/channels/939255181474955331/1017600950480945172",
"feedback:commons": "https://docs.google.com/forms/d/e/1FAIpQLSfudgcdqzF1HhRhY7L_xGun2t7JvVNU3KzE63uU_1iEIddBwA/viewform?usp=pp_url&entry.391765687=R74n+Commons",
"feedback:search": "https://docs.google.com/forms/d/e/1FAIpQLSfudgcdqzF1HhRhY7L_xGun2t7JvVNU3KzE63uU_1iEIddBwA/viewform?usp=pp_url&entry.391765687=Search",
"feedback:social": "https://docs.google.com/forms/d/e/1FAIpQLSfudgcdqzF1HhRhY7L_xGun2t7JvVNU3KzE63uU_1iEIddBwA/viewform?usp=pp_url&entry.391765687=New+social+account",
"feedback:old": "https://docs.google.com/forms/d/e/1FAIpQLSfudgcdqzF1HhRhY7L_xGun2t7JvVNU3KzE63uU_1iEIddBwA/viewform?usp=pp_url&entry.391765687=R74n+Time+Machine",
"feedback:shorten": "https://docs.google.com/forms/d/e/1FAIpQLSfudgcdqzF1HhRhY7L_xGun2t7JvVNU3KzE63uU_1iEIddBwA/viewform?usp=pp_url&entry.391765687=Link+Shortener",
"feedback:rue": "https://docs.google.com/forms/d/e/1FAIpQLSfudgcdqzF1HhRhY7L_xGun2t7JvVNU3KzE63uU_1iEIddBwA/viewform?usp=pp_url&entry.391765687=Rue+/+Explore+with+Rue",
"suggest command": "=feedback:rue",
"feedback:other": "https://docs.google.com/forms/d/e/1FAIpQLSfudgcdqzF1HhRhY7L_xGun2t7JvVNU3KzE63uU_1iEIddBwA/viewform?usp=pp_url&entry.391765687=Other",
"feedback:general": "https://docs.google.com/forms/d/e/1FAIpQLSfudgcdqzF1HhRhY7L_xGun2t7JvVNU3KzE63uU_1iEIddBwA/viewform?usp=pp_url&entry.391765687=Other",
"feedback:misc": "https://docs.google.com/forms/d/e/1FAIpQLSfudgcdqzF1HhRhY7L_xGun2t7JvVNU3KzE63uU_1iEIddBwA/viewform?usp=pp_url&entry.391765687=Other",
"feedback:cook": "https://docs.google.com/forms/d/e/1FAIpQLSfXx1NWgGz_VJ-796FsmawOzHF1MzAZevCVXFHXtQymWj3ysA/viewform",
"responses:hiew": "https://link.R74n.com/ufbs-hello",
"responses:convert": "https://link.R74n.com/ufbs-convert",
"responses:moji": "https://link.R74n.com/ufbs-moji",
"responses:words": "https://link.R74n.com/ufbs-words",
"responses:unisearch": "https://link.R74n.com/ufbs-unisearch",
"responses:mix": "https://link.R74n.com/ufbs-mix",
"responses:pixelflags": "https://link.R74n.com/ufbs-pixelflags",
"responses:main": "https://link.R74n.com/ufbs-main",
"responses:icons": "https://link.R74n.com/ufbs-icons",
"responses:sandboxels": "https://link.r74n.com/sandboxels-feedback-responses",
"responses:wikibase": "https://data.r74n.com/wiki/Talk:Community",
"wikibase community": "=responses:wikibase",
"talk:community": "=responses:wikibase",
"responses:sml": "https://github.com/R74nCom/Social-Media-Lists/issues",
"responses:discord": "https://discord.com/channels/939255181474955331/1017600950480945172",
"feedback:drive": "https://link.R74n.com/ufbs-drive",
"feedback:folder": "https://link.R74n.com/ufbs-drive",
"feedback:template": "https://link.R74n.com/template-feedback",
"responses:template": "https://link.R74n.com/ufbs-template",
"responses:all": "https://link.R74n.com/ufbs",
"responses:cook": "https://link.R74n.com/ufbs-cook",
"feedback responses": "https://link.R74n.com/ufbs",
"response sheet": "https://link.R74n.com/ufbs",
"ufbs sheet": "=response sheet",
"#play∞": "https://discord.com/channels/705084182673621033/837506072054333480",
"#playπ": "https://discord.com/channels/705084182673621033/837506203974238239",
"#playℵ0": "https://discord.com/channels/705084182673621033/837506186009641021",
"#play15": "https://discord.com/channels/705084182673621033/1031043430031298560",
"#play1": "https://discord.com/channels/705084182673621033/718644692438220850",
"#play13": "https://discord.com/channels/705084182673621033/751121166051049512",
"#play2": "https://discord.com/channels/705084182673621033/705092939029938186",
"#play3": "https://discord.com/channels/705084182673621033/705092974727659551",
"#play4": "https://discord.com/channels/705084182673621033/706635234598453288",
"#play0": "https://discord.com/channels/705084182673621033/718656442818756658",
"#play5": "https://discord.com/channels/705084182673621033/718644729298026537",
"#play6": "https://discord.com/channels/705084182673621033/745717639061700618",
"#play8": "https://discord.com/channels/705084182673621033/749005611194253323",
"#play9": "https://discord.com/channels/705084182673621033/749335826223333516",
"#play10": "https://discord.com/channels/705084182673621033/751121133981401310",
"#play11": "https://discord.com/channels/705084182673621033/751121144374886430",
"#play12": "https://discord.com/channels/705084182673621033/751121153594097835",
"#play00": "https://discord.com/channels/705084182673621033/752592397963362354",
"#play14": "https://discord.com/channels/705084182673621033/806585361089167361",
"qol": "https://r74n.com/mc/qol",
"quality of life": "=qol",
"quality of life datapack": "=qol",
"mc/qol": "=qol",
"quality_of_life.zip": "https://r74n.com/mc/quality_of_life.zip",
"uuid": "https://r74n.com/mc/uuid",
"mc/uuid": "=uuid",
"minecraft uuid generator": "=uuid",
"hd heads": "https://r74n.com/mc/heads",
"minecraft hd heads": "=hd heads",
"hd head library": "=hd heads",
"head library": "=hd heads",
"minecraft heads": "=hd heads",
"mc/heads": "=hd heads",
"minecraft items": "https://r74n.com/mc/items/",
"mc/items": "=minecraft items",
"special items": "=minecraft items",
"notepad": "https://r74n.com/rue/notepad",
"note pad": "=notepad",
"notebook": "=notepad",
"rue notepad": "=notepad",
"rue's notepad": "=notepad",
"notes": "=notepad",
"whiteboard": "https://r74n.com/rue/whiteboard",
"white board": "=whiteboard",
"canvas": "=whiteboard",
"blackboard": "=whiteboard",
"black board": "=whiteboard",
"chalkboard": "=whiteboard",
"chalk board": "=whiteboard",
"google currents": "https://currents.google.com/109950009865760845171",
"google plus": "=google currents",
"google+": "=google currents",
"google +": "=google currents",
"linen": "https://www.linen.dev/d/r74n/c/%F0%9F%92%AC-general",
"character.ai": "https://beta.character.ai/profile/?char=RJaUNQ3vn182wAXqRvy_ixjdb7mfjee6bQC98jS0sCw",
"c.ai": "=character.ai",
"vimeo": "https://vimeo.com/r74n",
"caffeine": "https://www.caffeine.tv/R74n",
"telegram": "https://t.me/R74nn",
"slack": "https://r74n.slack.com",
"scratch": "https://scratch.mit.edu/users/R74nCom/",
"scratch.mit.edu": "=scratch",
"disqus": "https://disqus.com/by/r74n/",
"imgflip": "https://imgflip.com/user/R74n",
"pixabay": "https://pixabay.com/users/r74n-23374443/",
"abbreviations.com": "https://www.abbreviations.com/user/180721",
"stands4": "=abbreviations.com",
"medium": "https://r74n.medium.com/",
"myspace": "https://myspace.com/r74n",
"kahoot": "https://create.kahoot.it/profiles/4ab32612-d7a3-49be-b36d-26a339e78ce5",
"stumbled": "https://cloudhiker.net/users/R74n",
"quizlet": "https://quizlet.com/R74nCom",
"sporcle": "https://www.sporcle.com/user/R74n/",
"flipboard": "https://flipboard.com/@R74n",
"nightcafe": "https://creator.nightcafe.studio/u/R74n",
"we heart it": "https://weheartit.com/R74nCom",
"hacker news": "https://news.ycombinator.com/user?id=R74n",
"pronouny": "https://pronouny.xyz/u/r74n",
"fontstruct": "https://fontstruct.com/fontstructors/2096822/r74n",
"revue": "https://www.getrevue.co/profile/R74n",
"icebergcharts.com": "https://icebergcharts.com/u/R74n",
"iceberg": "https://icebergcharts.com/i/R74n",
"wiki.gg": "https://sandboxels.wiki.gg/wiki/User:R74n",
"miraheze": "https://meta.miraheze.org/wiki/User:R74n",
"fandom": "https://r74n.fandom.com/wiki/User:R74n",
"ifunny": "https://ifunny.co/user/R74nCom",
"tiermaker": "https://tiermaker.com/user/15418730",
"collins dictionary": "https://www.collinsdictionary.com/profile/99198-R74n",
"crowdin": "https://crowdin.com/profile/R74n",
"ifttt": "https://ifttt.com/p/r74ncom",
"all 2048": "https://all2048.com/user/r74n",
"curiouscat": "https://curiouscat.live/R74nCom",
"steam": "https://steamcommunity.com/id/R74n/",
"crunchyroll": "https://www.crunchyroll.com/user/R74n",
"airtable": "https://airtable.com/shrKVzUPjcvFPsJNG/",
"carrd": "https://r74n.carrd.co/",
"carrd.co": "=carrd",
"linktree": "https://linktr.ee/R74n",
"linktr.ee": "=linktree",
"pronouns.page": "https://en.pronouns.page/@R74n",
"about.me": "https://about.me/R74n/",
"500px": "https://500px.com/p/r74n",
"g2": "https://www.g2.com/users/63ee025a-2399-4ac0-b3f1-0ec3e7434b9e",
"giant bomb": "https://www.giantbomb.com/r74n/3010-22285/",
"giantbomb": "=giant bomb",
"giant bomb:sandboxels": "https://www.giantbomb.com/sandboxels/3030-85063/",
"solo.to": "https://solo.to/r74n",
"rentry.co": "https://rentry.co/R74n",
"ilink": "https://il.ink/R74nCom",
"txti": "http://txti.es/r74n",
"mmm.page": "https://r74n.mmm.page/",
"mobygames": "https://www.mobygames.com/company/45927/r74n/",
"mobygames:sandboxels": "https://www.mobygames.com/game/179419/sandboxels/",
"symbols.com": "https://www.symbols.com/symbol/r74n-logo",
"wikidata": "https://wikidata.org/wiki/",
"wd": "=wikidata",
"pointlesssites": "https://www.pointlesssites.com/site-search.asp?t=R74n",
"g.page": "https://g.page/r74n-com",
"lingojam": "https://lingojam.com/R74n-com",
"perchance": "https://perchance.org/r74n",
"redbubble": "https://www.redbubble.com/people/R74n/shop",
"temu": "https://temu.to/m/us0rKljtxAkxcjd",
"translation hub": "https://r74n.com/translate/",
"translate hub": "=translation hub",
"translation": "=translation hub",
"translations": "=translation hub",
"news flash": "https://r74n.com/news-flash/",
"news flash archive": "=news flash",
"news archive": "=news flash",
"link dump": "https://r74n.com/link-dump/",
"emote archive": "https://r74n.com/emote-archive/",
"sandboxels logos": "https://sandboxels.r74n.com/icons/",
"sandboxels icons": "=sandboxels logos",
"shorten archive": "https://r74n.com/shorten/archive",
"shortened link archive": "=shorten archive",
"shortened archive": "=shorten archive",
"dynamic links": "=shorten archive",
"pixelflags changelog": "https://r74n.com/pixelflags/changelog",
"pixelflags changes": "=pixelflags changelog",
"flags changelog": "=pixelflags changelog",
"flags changes": "=pixelflags changelog",
"guess the flag": "https://r74n.com/pixelflags/guess",
"guess the pixelflag": "=guess the flag",
"guess the pixelflags": "=guess the flag",
"guess the flags": "=guess the flag",
"pixelflags guess": "=guess the flag",
"flag guess": "=guess the flag",
"flags guess": "=guess the flag",
"guess flag": "=guess the flag",
"guess flags": "=guess the flag",
"multiplane": "https://r74n.com/multiplane/?",
"sequence": "https://r74n.com/sequence/",
"sequencer": "=sequence",
"patreon": "https://www.patreon.com/R74n",
"ants": "https://R74n.com/ants/",
"ant": "=ants",
"every ant": "=ants",
"every ant on earth": "=ants",
"eaoe": "=ants",
"ant browser": "=ants",
"ant funeral": "https://R74n.com/ants/?funerals",
"cook": "https://R74n.com/cook/",
"infinite chef mods": "https://github.com/R74nCom/InfiniteChef-Mods/",
"infinitechef": "=cook",
"infinite chef": "=cook",
"infinite-chef": "=cook",
"ic": "=cook",
"chef": "=cook",
"infinite cook": "=cook",
"shapes": "https://R74n.com/shapes/",
"r74n shapes": "=shapes",
"id": "https://R74n.com/id/",
"ids": "=id",
"identifier": "=id",
"identifiers": "=id",
"id request": "https://R74n.com/id/?id:request",
"request id": "=id",
"request ids": "=id",
"community projects": "https://R74n.com/community/",
"supporters": "https://R74n.com/supporters/",
"collab": "https://R74n.com/collab/",
"chat": "https://R74n.com/rue/chat",
"rue chat": "=chat",
"ruechat": "=chat",
"chatgpt": "=chat",
"chat gpt": "=chat",
"gpt": "=chat",
"openai": "=chat",
"gui": "=chat",
"artfight": "https://artfight.net/character/4312264.rue-explore-with-rue-r74n",
"art fight": "=artfight",
"draw rue": "=artfight",
"ontomata": "https://R74n.com/ontomata/",

"turbowarp": "https://turbowarp.org/editor",
"tw": "=turbowarp",

"meese": "https://www.moosenotmeese.org/", //partner
"moosenotmeese": "=meese",
"moose not meese": "=meese",
"mooses": "=meese",
"moosen": "=meese",
"plural of moose": "=meese",
"5b": "https://www.infernity.dev/HTML5b/", //partner
"infernity": "https://www.infernity.dev/", //partner
"adryd": "https://adryd.com/",
"suss": "https://www.youtube.com/@sussdood", //patron
} // links

const whitespaceRegex = /[\s\uFEFF\u200B]+/g;
const punctuationRegexProto = "[`~!¡¿‼‽⁇⁈⁉！@#$¢£€¥%\\^&\*\\(\\)\\-‐‑‒–—―_\\+×÷=\\[\\]\\{\\}\\|\\\\;:：；'‘’\"“”„＂＇‚‛❛❜❟‟«»<>,\\.…\\/⁄\\?¶⁋❡§†‡°]+"
const punctuationRegex = new RegExp(punctuationRegexProto,"g");
const punctuationRegexEnd = new RegExp(punctuationRegexProto+"$","g");
function normalize(text) {
    return text.toLowerCase().replace(whitespaceRegex, " ").trim();
}
function normalizeL2(text) {
    return text.replace(punctuationRegex, "").toLowerCase().trim();
}
function ultraNormalize(text) {
    return text.replace(/&|'?n'|'n?/g,"and").replace(punctuationRegex, "").toLowerCase().trim().replace(whitespaceRegex,"").replace(/[eiou]/g,"a").replace(/i?es|ys/g,"s");
}
function trimPunctuation(text) {
    return text.replace(punctuationRegexEnd, "");
}
function encodeHTML(text) {
    if (Array.isArray(text)) { return text.map(encodeHTML); }
    return text.toString().replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&#34;");
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
function tryVariants(text, dict, func, ignoreRegex) {
    if (dict[text] !== undefined) { return func(...chooseValue(dict,text)) || true; }
    var n2 = normalizeL2(text);
    if (dict[n2] !== undefined) { return func(...chooseValue(dict,n2)) || true;; }
    var ns = n2.replace(whitespaceRegex, "");
    if (dict[ns] !== undefined) { return func(...chooseValue(dict,ns)) || true; }
    if (!ignoreRegex) {
        for (var key in dict) {
            // if it starts and ends with /, test it as a regex
            if (key.charCodeAt(0) === 47 && key.charCodeAt(key.length-1) === 47 && key.length > 2) {
                var regex = new RegExp("^(" + key.slice(1,-1) + ")$", "gi");
                if (regex.test(text) || regex.test(n2)) { return func(...chooseValue(dict,key)) || true; }
            }
        }
    }
}

function finalizeData(dict) {
    // Ruegex
    for (var rueDataKey in dict) {
        for (var key in dict[rueDataKey]) {
            if (key.indexOf("$$$") === 0) {
                var splitSections = key.slice(3).split(";;");
                var regex = "";
                for (var j = 0; j < splitSections.length; j++) {
                    var section = splitSections[j];
                    var splitWords = section.split(",");
                    for (var i = 0; i < splitWords.length; i++) {
                        var word = splitWords[i];
                        var modifier = "";
                        if (word.charCodeAt(word.length-1) === 63) { // last character === ?
                            modifier = "?";
                            word = word.slice(0,-1);
                        }
                        if (word.charCodeAt(word.length-1) === 61) { // last character === =
                            regex += "(" + word.slice(0,-1) + ")" + modifier + " ?";
                        }
                        else if (rueData.regex[word]) {
                            regex += "(" + chooseValue(rueData.regex,word)[0] + ")" + modifier + " ?";
                        }
                        else {
                            regex += "(" + word + ")" + modifier + " ?";
                        }
                    }
                    regex += "|";
                }
                regex = "/"+regex.slice(0,-3)+"/";
                // console.log(regex);
                dict[rueDataKey][regex] = dict[rueDataKey][key];
                delete dict[rueDataKey][key];
            }
        }
    }
}
finalizeData(rueData);


rueInput.addEventListener("input", function() {
    if (Rue.brain.afterClickOff) {
        Rue.brain.afterClickOff = undefined;
    }
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
    if (Rue.brain.speaking && !Rue.brain.sticky && (!Rue.brain.lastInput || Rue.brain.lastInput.toLowerCase() !== text.toLowerCase())) {
        Rue.hush();
    }
    Rue.brain.lastInput = text;
});
rueInput.addEventListener("paste", function(e) {
    var items = (e.clipboardData || e.originalEvent.clipboardData).items;
    for (var index in items) {
        var item = items[index];
        if (item.kind === 'file') {
            var blob = item.getAsFile();
            var reader = new FileReader();
            // get file type
            reader.onload = function (e) {
                var type = blob.type.split("/")[0];
                if (type === "image") {
                    Rue.brain.uploadedImage = e.target.result;
                    Rue.showMedia(e.target.result, "Loaded this image!")
                }
                else {
                    Rue.error("I don't have a protocol for that type of file right now!")
                }
            };
            reader.readAsDataURL(blob);
        }
    }
});
function sendMessage(e,message) { // send message
    if (Rue.brain.sleeping) { // handle sleeping
        Rue.brain.sleeping--;
        if (!Rue.brain.sleeping) { Rue.wake(); Rue.say("{{r:[wakeup]}}"); Rue.cooldown(2) }
        return;
    }
    if (Rue.brain.cooldown) { return; }

    if (message) { var text = message; }
    else {
        var text = rueInput.value.trim().replace(/ {2,}/g, " ");;
    }
    if (text.length === 0 && Rue.brain.source === "bookmarklet") {
        Rue.uninstall();
    }
    if (typeof rueOnSend !== "undefined") {
        text = rueOnSend(text) || text;
    }
    // multiple commands per message (separated by ;;)
    var textSplit = text.split(/(?: +)?;;(?: +)?/);
    if (textSplit.length > 1) {
        // re-run sendMessage for each ;; split
        for (var i = 0; i < textSplit.length; i++) {
            if (textSplit[i] === ";;" || !textSplit[i]) { continue; }
            sendMessage(e, textSplit[i]);
        }
        return;
    }
    var normalized = normalize(text);

    if (Rue.brain.confirming && !Rue.brain.paginate) {
        if (Rue.brain.confirming === text || rueData.yesTerms.indexOf(normalized) !== -1) {
            Rue.brain.afterConfirm(e);
            Rue.brain.confirming = false;
            Rue.brain.afterConfirm = undefined;
            if (!Rue.brain.activity) {return;}
        }
        Rue.brain.confirming = false;
        Rue.brain.afterConfirm = undefined;
    }
    if (Rue.brain.asking) {
        if (normalized.length === 0 || rueData.exitTerms.indexOf(text.toLowerCase()) !== -1) {
            Rue.error("Okay, nevermind!!");
            Rue.cancelQuestion();
            return;
        }
        Rue.brain.asking = false;
        Rue.brain.afterAsk(text);
        if (!Rue.brain.repeatingQuestion) { Rue.brain.afterAsk = undefined; }
        Rue.brain.repeatingQuestion = false;
        if (!Rue.brain.activity) {Rue.unsticky(); return;}
    }

    if (Rue.brain.deaf && text !== "undeafen") { return; }
    if (Rue.brain.activity) { // handle activities
        if (rueData.exitTerms.indexOf(text.toLowerCase()) !== -1) {
            Rue.endActivity();
            Rue.say("{{r:[endactivity]}}")
        }
        else {
            rueData.activities[Rue.brain.activity](encodeHTML(text));
        }
        return;
    }
    if (Rue.brain.paginate) {
        if (rueData.exitTerms.indexOf(normalized) !== -1) {
            Rue.unsticky();
            Rue.hush();
            Rue.brain.paginate = null;
            return;
        }
        if (["n","next",">"].indexOf(normalized) !== -1) {
            Rue.nextPage(); return;
        }
        if (["p","prev","previous","back","b","<"].indexOf(normalized) !== -1) {
            Rue.prevPage(); return;
        }
        Rue.unsticky();
        Rue.brain.paginate = null;
    }
    if (normalized.length === 0) { Rue.error(chooseItem(rueData.responses["[blank]"])); return }
    Rue.addUser("sentMessages", 1);
    Rue.addUser("sentWords", normalized.split(" ").length);
    Rue.addUser("sentChars", text.length);
    // xp
    var tempdate = new Date();
    tempdate.setSeconds(0,0);
    var thisminute = tempdate.getTime();
    if (Rue.getUser("lastMinute") !== thisminute) {
        Rue.setUser("lastMinute", thisminute);
        Rue.addUser("xp", 15);
        Rue.setUser("level", Math.floor(Math.sqrt(Rue.getUser("xp")/10)));
    }
    if (Rue.getUser("lastDailyTalk") !== today()) {
        Rue.setUser("lastDailyTalk", today());
        Rue.addUser("xp", 100);
        Rue.setUser("level", Math.floor(Math.sqrt(Rue.getUser("xp")/10)));
    }

    var done = false;

    if (!done) { // custom command aliases
        done = tryVariants(normalized, Rue.userData.user.commandAliases, function(value) {
            sendMessage(e, value);
        }, true);
    }
    if (!done) { // custom tags
        done = tryVariants(normalized, Rue.userData.user.customTags, function(value) {
            Rue.say(value);
        });
    }
    if (!done) { // custom links
        done = tryVariants(normalized, Rue.userData.user.customLinks, function(value) {
            Rue.openLink(value, e);
        });
    }
    if (!done) { // custom lists
        done = tryVariants(normalized, Rue.userData.user.lists, function(value, list) {
            Rue.paginate("The list '" + list + "' contains:\n\n" + Rue.userData.user.lists[list].join("\n"));
        });
    }
    if (!done) { // counters
        if (!isNaN(parseInt(normalized.split(" ").slice(-1)))) {
            var newValue = parseInt(normalized.split(" ").slice(-1));
            var counterName = normalized.split(" ").slice(0,-1).join(" ");
        }
        else {
            var newValue = 1;
            var counterName = normalized;
        }
        done = tryVariants(counterName, Rue.userData.user.counters, function(value, counter) {
            if (newValue === undefined) { newValue = 1; }
            else {
                newValue = parseInt(newValue);
                if (isNaN(newValue)) { newValue = 1; }
            }
            if (text.charAt(0) === "-") { newValue = -newValue; }
            Rue.userData.user.counters[counter] += newValue;
            Rue.changedUserData();
            Rue.say("Increased the '" + counter + "' counter by " + newValue + ", totaling to " + Rue.userData.user.counters[counter] + "!");
        });
    }

    // regex totalities
    if (!done) {
        done = tryVariants(text, rueData.totalities, function(func) {
            func(encodeHTML(text));
        });
    }
    if (!done) { // activities
        done = tryVariants(text, rueData.activities, function(func, activity) {
            Rue.startActivity(activity);
        });
    }

    if (!done) {
    var commandBase = null;
    var argsArray = null;
    // commands with spaces
    for (key in rueData.commands) {
        if (key.indexOf(" ") !== -1) {
            // if text starts with key+" " or is equal to key, set commandBase to key and argsArray to the rest of text split by whitespace
            if (text.indexOf(key+" ") === 0) {
                commandBase = key;
                argsArray = text.split(commandBase+" ")[1].replace(whitespaceRegex, " ").split(" ");
                break;
            }
            else if (text.toLowerCase().indexOf(key+" ") === 0) {
                commandBase = text.substring(0,key.length);
                argsArray = text.split(commandBase+" ")[1].replace(whitespaceRegex, " ").split(" ");
                break;
            }
            else if (text === key) {
                commandBase = key;
                argsArray = [];
                break;
            }
        }
    }
    // JS commands
    if (!commandBase) {
        commandBase = normalized.split(" ")[0];
        argsArray = text.replace(whitespaceRegex, " ").split(" ").slice(1);
        // if the commandBase has a : in it, split it and put the rest at the beginning of argsArray
        if (commandBase.indexOf(":") !== -1) {
            var split = text.split(" ")[0].split(/:(.+)/);
            commandBase = split[0];
            argsArray.unshift(split[1]);
        }
        else if (commandBase.indexOf("(") !== -1) {
            var split = text.split(" ")[0].split(/\((.+)/);
            commandBase = split[0];
            argsArray.unshift(split[1]);
            var lastArg = argsArray[argsArray.length-1];
            if (lastArg.charAt(lastArg.length-1) === ")") {
                argsArray[argsArray.length-1] = lastArg.slice(0,lastArg.length-1)
            }
            var joinedArgs = argsArray.join(" ");
            if (joinedArgs.indexOf(",") !== -1) {
                argsArray = joinedArgs.split(/, ?/);
            }
        }
    }
    if (argsArray.length === 1 && argsArray[0] === "this" && Rue.brain.selectedText) {
        argsArray[0] = Rue.brain.selectedText;
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
    }
    Rue.brain.tempArgs = argsArray;
    if (!done) {
        done = tryVariants(commandBase, rueData.commands, function(func) {
            func(encodeHTML(argsArray));
        }, true);
        // command base aliases
        if (!done && Rue.userData.user.commandAliases[commandBase]) {
            done = tryVariants(Rue.userData.user.commandAliases[commandBase], rueData.commands, function(func) {
                func(encodeHTML(argsArray));
            }, true);
        }
    }
    if (!done) {
        // basic responses
        done = tryVariants(normalized, rueData.responses, function(response) {
            Rue.say(response);
        });
    }
    if (!done) {
        // try calculation
        var mathResult = Rue.calculate(text);
        if (mathResult !== null) {
            Rue.say(mathResult.toString());
            done = true;
        }
    }
    if (!done) {
        // display math replacements
        done = tryVariants(normalized, rueData.mathReplacements, function(text) {
            Rue.say(text);
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
            // if link is the same as currentURL
            if (link === window.location.href) {
                Rue.say("{{r:[sameurl]}}"); return
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
    // regex commands
    for (key in rueData.commands) {
        if (key.charCodeAt(0) === 47 && key.charCodeAt(key.length-1) === 47 && key.length > 2) {
            var regex = new RegExp("^(" + key.slice(1,-1) + ")( |$)", "gi");
            if (regex.test(text)) {
                key = chooseValue(rueData.commands,key)[1];
                // argsArray = split by regex, use the second half, and split by whitespace
                argsArray = text.replace(regex, "").replace(whitespaceRegex, " ").split(" ");
                if (argsArray.length === 1 && argsArray[0].length === 0) { argsArray = []; }
                rueData.commands[key](encodeHTML(argsArray));
                done = true;
                break;
            }
        }
    }
    }

    if (!done) {
        // last priority keywords
        for (keyword in rueData.keywords) {
            if (normalized.indexOf(keyword) !== -1) {
                Rue.say(rueData.keywords[chooseValue(rueData.keywords,keyword)[1]]);
                done = true;
                break;
            }
        }
    }

    if (!done) { // date info
        var tempdate = new Date(text.replace(/(st|th|nd) /g," "));
        if (!isNaN(tempdate)) {
            var daysAgo = Math.floor((new Date() - tempdate) / 86400000);
            if (daysAgo === -1) { daysAgo = "is tomorrow"; }
            else if (daysAgo < 0) { daysAgo = "is in " + Math.abs(daysAgo) + " days"; }
            else if (daysAgo === 0) { daysAgo = "is today"; }
            else if (daysAgo === 1) { daysAgo = "was yesterday"; }
            else { daysAgo = "was " + daysAgo + " days ago"; }
            Rue.say(tempdate.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) + " " + daysAgo + ".");
            done = true;
        }
    }

    if (!done) {
        var match = text.match(/^((hey|ok|okay) )?(rue|alexa|siri|google|cortana),? /gi);
        // if it matches the regex, try sendMessage again with the match removed
        if (match) {
            done = sendMessage(e, text.replace(match[0], ""));
            return;
        }
    }

    if (!done) {
        Rue.confirm("{{r:[unsure]}}\n\n{{r:[confirmsearch]}}?", function(e) {
            Rue.openLink("https://r74n.com/search/?q=" + encodeURIComponent(text) +"#gsc.tab=0&gsc.q="+encodeURIComponent(text)+"&gsc.sort=", e);
        })
    }

    return done;
}
rueButton.onclick = sendMessage;
rueInput.oldFocus = rueInput.focus;
function getSelectionText() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type !== "Control") {
        text = document.selection.createRange().text;
    }
    return text;
}
rueInput.focus = function() {
    Rue.brain.selectedText = getSelectionText();
    rueInput.oldFocus();
}
rueInput.addEventListener("mousedown", function(e) {
    Rue.brain.selectedText = getSelectionText();
})
rueInput.addEventListener("keydown", function(e) {
    if (e.keyCode === 13) { // enter = click rueButton
        rueButton.onclick(e);
    }
    else if (e.keyCode === 27 && !Rue.brain.speaking) {
        if (rueInput.value !== "") {
            rueInput.value = "";
        }
        else {
            rueInput.blur();
        }
    }
    else if (e.keyCode === 27 || e.keyCode === 9) { // escape or tab = hush
        if (Rue.brain.paginate) {
            Rue.brain.paginate = null;
        }
        if (Rue.sticky) {
            Rue.unsticky();
        }
        Rue.hush();
    }
    else if (e.keyCode === 8 && rueInput.value.length === 0) { // backspace
        Rue.hush();
    }
    else if (e.keyCode === 67 && Rue.brain.metaKey && Rue.brain.speaking) { // ctrl + C
        // if there is no text selected in rueInput, copy the text in rueMessageBox if Rue.brain.speaking
        if (rueInput.selectionStart === rueInput.selectionEnd) {
            if (Rue.brain.speaking) {
                var rueMessageBox = document.getElementById("rueMessageBox");
                if (rueMessageBox) {
                    Rue.copyText(rueMessageBox.innerText);
                    rueInput.focus();
                }
            }
        }
    }
});
rueInput.addEventListener("click", function(e) {
    // double click while empty = unfocus
    if (e.detail >= 2 && rueInput.value.length === 0) {
        Rue.blink();
        rueInput.blur();
        e.preventDefault();
    }
})
window.addEventListener("blur", function() { // window loses focus
    Rue.brain.metaKey = false;
    Rue.brain.shiftKey = false;
});
document.addEventListener("keydown", function(e) {
    if (e.metaKey || e.ctrlKey) {
        Rue.brain.metaKey = true;
    }
    // command + shift + e = focus on Rue
    if (e.shiftKey && (Rue.brain.metaKey||e.metaKey||e.ctrlKey) && e.key.toLowerCase() === "e") {
        rueInput.focus();
        Rue.blink();
        Rue.say("Hello! Type in certain commands to make me do things.");
        e.preventDefault();
    }
});
document.addEventListener("keyup", function(e) {
    if (e.keyCode === 91 || e.keyCode === 93 || e.keyCode === 224 || e.keyCode === 17 || e.metaKey || e.key === "Meta" || e.ctrlKey) {
        Rue.brain.metaKey = false;
    }
});
// hush if the screen width changes, but ignore the height
var screenWidth = window.innerWidth;
window.addEventListener("resize", function() {
    if (window.innerWidth !== screenWidth) {
        Rue.hush();
        screenWidth = window.innerWidth;
    }
    // if the screen is >600px wide, add .rueBoxCorner to the rueBox
    if (!rueBox.classList.contains("rueWideScreen") && window.innerWidth > 600) {
        if (!rueBox.classList.contains("rueBoxCorner")) { rueBox.classList.add("rueBoxCorner"); }
    }
    else if (rueBox.classList.contains("rueBoxCorner")) { rueBox.classList.remove("rueBoxCorner"); }
});


Rue = {
    say: function(message, opt) {
        if (!message) { Rue.hush(); return; }
        if (Rue.brain.sleeping) { Rue.wake(); }
        if (Rue.brain.mute) { return; }
        if (!opt) { opt = {} }
        message = message.toString();
        if (opt.parse !== false && message.indexOf("{{") !== -1) {
            message = parseText(message);
        }
        if (message.indexOf(">>>") !== -1) {
            var split = message.split(">>>");
            if (split.length > 1 && Rue[split[0]]) {
                Rue[split[0]](split[1]);
                return;
            }
        }
        message = message.replace(/\n/g, "<br>");
        Rue.brain.lastMessage = message;
        var rueMessageBox = document.getElementById("rueMessageBox");
        if (!rueMessageBox) { // init message box
            rueMessageBox = document.createElement("div");
            rueMessageBox.id = "rueMessageBox";
            rueMessageBox.classList.add("rueElement");
            rueMessageBox.style.cssText = "color:white;display:none;position:absolute;background:#595959;padding:0.5em;padding-left:0.75em;padding-right:0.75em;clear:both;border:solid;overflow:hidden;transition:background 0.5s, border-color 0.5s;z-index:7474;font-size:22px!important;font-family: Arial, Helvetica, sans-serif!important";
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
                if (Rue.brain.sticky) { return; }
                // if e.target is not inside rueBox element
                if (!rueBox.contains(e.target) && !rueMessageBox.contains(e.target)) {
                    Rue.hush();
                    // kill Rue.brain.closeMessageEvent
                    document.removeEventListener("click", Rue.brain.closeMessageEvent);
                    Rue.brain.closeMessageEvent = null;
                    if (Rue.brain.afterClickOff) {
                        Rue.brain.afterClickOff();
                        Rue.brain.afterClickOff = null;
                    }
                }
            }
            document.addEventListener("click", Rue.brain.closeMessageEvent);
        }
        if (typeof rueOnSay !== "undefined") {
            rueOnSay(rueMessageBox);
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
        if (!errorMessage) { errorMessage = chooseItem(rueData.responses["[error]"]); }
        Rue.say(errorMessage, {color:"red",bg:"#7b5b5b"});
    },
    success: function(message) {
        if (!message) { message = chooseItem(rueData.responses["[success]"]); }
        Rue.say(message, {color:"lime",bg:"#5b7b5b"});
    },
    happy: function(message) {
        Rue.say(message, {color:"lime",bg:"#5b7b5b"});
    },
    sad: function(message) {
        Rue.say(message, {color:"blue",bg:"#5b5b7b"});
    },
    angry: function(message) {
        Rue.say(message, {color:"#ff4400",bg:"#7b645b"});
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
    alert: function(message) {
        Rue.say("{{b:ALERT: "+message+"}}", {color:"#00ffff",bg:"red"});
    },
    loading: function() {
        Rue.say("{{r:[wait]}}");
    },
    showMedia: function(url, message, caption) {
        // video
        if (url.match(/\.(mp4|webm|ogg|mov|avi|wmv|flv|mkv|3gp)$/gi)) {
            var element = "<video src='"+url+"' style='max-width:100%;max-height:100%;vertical-align:middle' controls autoplay></video>"
        }
        // audio
        else if (url.match(/\.(mp3|wav|wma|aac|flac)$/gi)) {
            var element = "<audio src='"+url+"' style='max-width:100%;max-height:100%;vertical-align:middle' controls autoplay></audio>"
        }
        // youtube
        else if (url.match(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/gi)) {
            var videoID = url.split(/(youtube\.com\/watch\?v=|youtu\.be\/)/)[2].split("&")[0];
            var element = `<iframe width="560" height="315" style='max-width:100%;max-height:100%;vertical-align:middle' src="https://www.youtube-nocookie.com/embed/`+videoID+`" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen autoplay></iframe>`
        }
        else { // image
            var element = "<img src='"+url+"' style='max-width:100%;max-height:100%;vertical-align:middle' alt='Displayed Image' title='Click to Open'></a>"
        }
        Rue.say((message || "") + "<div style='text-align:center;display:block;height:200px;width:100%;margin-top:10px;margin-bottom:10px'><a style='vertical-align:middle' href='"+url+"'>" + element + (caption ? "<span style='text-align:center;font-size:0.75em;display:block;vertical-align:bottom'>"+caption+"</span>" : "") + "</div>");
    },
    confirm: function(message, func) {
        Rue.brain.confirming = rueInput.value;
        Rue.brain.afterConfirm = func;
        Rue.say(message+"\n\n{{r:[confirm]}}", {color:"#ffff00",bg:"#7b7b5b"});
    },
    ask: function(message, func) {
        Rue.brain.asking = message;
        Rue.brain.afterAsk = func;
        Rue.sticky();
        Rue.say(message, {color:"#ffff00",bg:"#7b7b5b"});
    },
    repeatQuestion: function(message) {
        if (!message) { message = Rue.brain.asking; }
        Rue.brain.asking = message;
        Rue.brain.repeatingQuestion = true;
        Rue.say(message, {color:"#ffff00",bg:"#7b7b5b"});
    },
    cancelQuestion: function() {
        Rue.brain.asking = false;
        Rue.brain.afterAsk = undefined;
        Rue.unsticky();
    },
    openLink: function(url,e) {
        if (Rue.brain.auto) { Rue.error("{{r:[autolinkdanger]}}"); return }
        url = url.replaceAll("$1", "");
        Rue.loading();
        if (!Rue.brain.metaKey) {
            window.open(url, "_self");
        }
        else {
            window.open(url, "_blank");
            Rue.say("{{r:[newtab]}}")
        }
    },
    // randomly add .rueBlink to rueButton at random intervals
    blink: function(loop) {
        if (Rue.brain.sleeping || Rue.brain.noBlink) { return; }
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
    stopBlinking: function() {
        Rue.brain.noBlink = true;
    },
    getRue: function(key) { return Rue.userData.rue[key]||0; },
    setRue: function(key, value) { Rue.userData.rue[key] = value; Rue.changedUserData(); return value },
    addRue: function(key, value) { if(value===undefined){value=1} if (!Rue.userData.rue[key]){Rue.userData.rue[key]=0} Rue.userData.rue[key] += value; Rue.changedUserData(); return Rue.userData.rue[key] },
    delRue: function(key) { delete Rue.userData.rue[key]; Rue.changedUserData(); },
    getUser: function(key) { return Rue.userData.user[key]||0; },
    setUser: function(key, value) { Rue.userData.user[key] = value; Rue.changedUserData(); return value },
    addUser: function(key, value) { if(value===undefined){value=1} if (!Rue.userData.user[key]){Rue.userData.user[key]=0} Rue.userData.user[key] += value; Rue.changedUserData(); return Rue.userData.user[key] },
    delUser: function(key) { delete Rue.userData.user[key]; Rue.changedUserData() },
    getEnv: function(key) { return Rue.userData.env[key]||0; },
    setEnv: function(key, value) { Rue.userData.env[key] = value; Rue.changedUserData(); return value },
    addEnv: function(key, value) { if(value===undefined){value=1} if (!Rue.userData.env[key]){Rue.userData.env[key]=0} Rue.userData.env[key] += value; Rue.changedUserData(); return Rue.userData.env[key] },
    delEnv: function(key) { delete Rue.userData.env[key]; Rue.changedUserData() },
    addItem: function(item,amount) {
        item = item.toString().toLowerCase();
        if (amount === undefined) { amount = 1; }
        if (!Rue.userData.user.inv[item]) { Rue.userData.user.inv[item] = 0; }
        Rue.userData.user.inv[item] = Number((Rue.userData.user.inv[item] + amount).toFixed(2))
        Rue.changedUserData();
        return Rue.userData.user.inv[item];
    },
    delItem: function(item,amount) {
        item = item.toString().toLowerCase();
        if (amount === undefined) { amount = 1; }
        if (!Rue.userData.user.inv[item]) { Rue.userData.user.inv[item] = 0; }
        amount = Number(amount.toFixed(2));
        Rue.userData.user.inv[item] = Number((Rue.userData.user.inv[item] - amount).toFixed(2))
        if (Rue.userData.user.inv[item] <= 0) { delete Rue.userData.user.inv[item]; }
        Rue.changedUserData();
        return Rue.userData.user.inv[item];
    },
    getItem: function(item) {
        item = item.toString().toLowerCase();
        if (!Rue.userData.user.inv[item]) { return 0; }
        return Rue.userData.user.inv[item];
    },
    changedUserData: function() { Rue.saveUserData() },
    saveUserData: function() {
        localStorage.setItem("rueUserData", JSON.stringify(Rue.userData));
    },
    defaultUserData: {
        rue: {
            savedResponses: [],
            mods: [],
            userSeed: 926310944,
            userStart: 1687438260000,
            x:0, y:0, z:2, i:"&",
            color:"#00ff00",
            world: "default",
            n: "Rue",
            subtitle: "Me"
        },
        user: {
            inv: {},
            commandAliases: {},
            customTags: {},
            customLinks: {},
            lists: {},
            counters: {},
            x:0, y:0, z:0, i:"@",
            color:"#00ffff",
            world: "default",
            n: "You",
            subtitle: "You"
        },
        env: {
            worlds: {
                "default": {
                    chunks: {
                        "0,0": [
                            { n:"block", x:5, z:3, i:"☐" }
                        ]
                    }
                }
            }
        }
    },
    loadUserData: function() {
        var data = localStorage.getItem("rueUserData");
        if (!data) { data = JSON.parse(JSON.stringify(Rue.defaultUserData)); }
        else {
            data = JSON.parse(data);
            // loop through defaultUserData
            for (var datacat in Rue.defaultUserData) {
                if (data[datacat] === undefined) { data[datacat] = {}; }
                for (key in Rue.defaultUserData[datacat]) {
                    if (data[datacat][key] === undefined) {
                        var value = Rue.defaultUserData[datacat][key];
                        if (typeof value === "object") { data[datacat][key] = JSON.parse(JSON.stringify(value)); }
                        else { data[datacat][key] = value; }
                    }
                }
            }
        }
        if (!data.user.userSeed) { data.user.userSeed = Math.floor(Math.random() * 1000000000); }
        if (!data.user.userStart) { data.user.userStart = Date.now().toString(); }
        Rue.userData = data;
    },
    coordsToChunk: function(x,z) {
        return Math.floor(x/16)+","+Math.floor(z/16);
    },
    itemsAtPos: function(x,z,y,world) {
        var worldData = Rue.getEnv("worlds")[world||Rue.getUser("world")];
        var chunk = Rue.coordsToChunk(x,z);
        var itemsAtPos = [];
        if (Rue.getRue("x") === x && Rue.getRue("z") === z && (y === undefined || Rue.getRue("y") === y)) {
            itemsAtPos.push(Rue.userData.rue);
        }
        if (Rue.getUser("x") === x && Rue.getUser("z") === z && (y === undefined || Rue.getUser("y") === y)) {
            itemsAtPos.push(Rue.userData.user);
        }
        if (worldData.chunks[chunk]) {
            worldData.chunks[chunk].forEach(function(item){
                if (item.x === x && item.z === z && (y === undefined || item.y === y)) {
                    itemsAtPos.push(item);
                    return false;
                }
            })
        }
        return itemsAtPos;
    },
    startActivity: function(activity) {
        Rue.brain.activity = chooseValue(rueData.activities,activity)[1];
        Rue.brain.stage = 1;
        rueData.activities[activity]();
        Rue.sticky();
    },
    endActivity: function() {
        Rue.brain.activity = null;
        Rue.brain.stage = 0;
        Rue.unsticky();
    },
    sticky: function() { Rue.brain.sticky = true; },
    unsticky: function() { Rue.brain.sticky = false; },
    addRueData: function(dict, replaceMode) {
        finalizeData(dict);
        for (key in dict) {
            if (!replaceMode && rueData[key]) {
                if (Array.isArray(rueData[key])) { rueData[key] = rueData[key].concat(dict[key]); }
                else if (typeof rueData[key] === "object") {
                    for (subkey in dict[key]) {
                        rueData[key][subkey] = dict[key][subkey];
                    }
                }
                else { rueData[key] = dict[key]; }
            }
            else {
                rueData[key] = dict[key];
            }
        }
    },
    clearRueData: function() {
        // clear every rueData key
        for (key in rueData) {
            if (Array.isArray(rueData[key])) { rueData[key] = []; }
            else if (typeof rueData[key] === "object") { rueData[key] = {}; }
            else { rueData[key] = undefined; }
        }
    },
    onRueLoad: function(callback) {
        if (loadedRue) { callback(); }
        else { rueLoadFunctions.push(callback); }
    },
    uninstall: function() {
        document.getElementById("rueBox").remove();
        document.getElementById("rueScript")?.remove();
        document.getElementById("rueMessageBox")?.remove();
        document.removeEventListener("click",Rue.brain.closeMessageEvent)
        Rue = undefined;
        console.log("Rue has left the building.");
    },
    sleep: function(n, nohush) {
        Rue.brain.sleeping = n||10;
        if (!nohush) { Rue.hush(); }
        rueInput.disabled = true;
        rueButton.classList.add("rueSleep");
        rueButton.classList.add("rueDisabled");
    },
    wake: function() {
        Rue.brain.sleeping = 0;
        rueInput.disabled = false;
        rueButton.classList.remove("rueBlink");
        rueButton.classList.remove("rueSleep");
        rueButton.classList.remove("rueDisabled");
    },
    cooldown: function(seconds) {
        rueButton.classList.remove("rueDisabled");
        Rue.brain.cooldown = seconds;
        setTimeout(function() {
            Rue.brain.cooldown = 0;
        }, seconds * 1000);
    },
    copyText: function(text) {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
    },
    callAPI: function(url, callback) {
        Rue.loading();
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        try {
            xhr.onreadystatechange = function() {
                Rue.hush();
                if (xhr.readyState === 4 && callback) {
                    var data = JSON.parse(xhr.responseText);
                    if (data.error || data.retryAfter) {
                        Rue.error("API Error: "+(data.error||data.message));
                    }
                    else { callback(data); }
                }
            }
            xhr.onerror = function() {
                Rue.error("Error " + xhr.status + ": " + xhr.statusText);
            }
        }
        catch (e) { Rue.error("Error: " + e); }
        xhr.send();
    },
    focus: function(response) {
        rueInput.focus();
        if (response) { Rue.say(response); }
    },
    unfocus: function() { rueInput.blur(); },
    setInput: function(text) { rueInput.value = text; },
    clearInput: function() { rueInput.value = ""; },
    send: function(text, skipSet) {
        if (text && !skipSet) { Rue.setInput(text); }
        sendMessage(undefined, text);
    },
    calculate: function(mathExpression) {
        mathExpression = mathExpression.toLowerCase();
        // if it is only a number, return it
        if (/^[\d\.]+$/gi.test(mathExpression)) { return mathExpression; }
        // loop through rueData.mathReplacements
        for (var key in rueData.mathReplacements) {
            mathExpression = mathExpression.replaceAll(key, chooseValue(rueData.mathReplacements,key)[0]);
        }
        if (!/^[\d\._ ]+$/gi.test(mathExpression) && /^(([+\-\/\*\d ()\.e_]| Infinity | NaN )+)?(\d| Infinity | NaN |_)(([+\-\/\*\d ()\.e_]| Infinity | NaN )+)?$/gi.test(mathExpression)) {
            mathExpression = mathExpression.replaceAll(/e{2,}/g, "e")
            if (Rue.brain.lastMathResult) { mathExpression = mathExpression.replaceAll(/_+/g, Rue.brain.lastMathResult); }
            try {
                var e = Math.E;
                var mathResult = eval(mathExpression);
                Rue.brain.lastMathResult = mathResult;
                return mathResult;
            }
            catch (e) {
                return null;
            }
        }
        return null;
    },
    paginate: function(array, perPage, page) {
        perPage = perPage || 10;
        page = page || 1;
        if (!array && Rue.brain.paginate) { array = Rue.brain.paginate.array; }
        if (typeof array === "string") { array = array.split("\n"); }
        // store the array and perPage to Rue.brain.paginate
        Rue.brain.paginate = {array:array,perPage:perPage,current:page};
        var items = array.slice((page-1)*perPage,page*perPage);
        var text = items.join("\n");
        Rue.sticky();
        Rue.say(text+"\n\n<div style='text-align:center;'><span onmouseup='Rue.prevPage()' style='cursor:pointer'>←</span> "+page+" / "+Math.ceil(array.length/perPage)+" <span onmouseup='Rue.nextPage()' style='cursor:pointer'>→</span></div>");
    },
    nextPage: function() {
        var page = Rue.brain.paginate.current;
        if (page*Rue.brain.paginate.perPage < Rue.brain.paginate.array.length) {
            page++;
            Rue.paginate(Rue.brain.paginate.array, Rue.brain.paginate.perPage, page);
        }
    },
    prevPage: function() {
        var page = Rue.brain.paginate.current;
        if (page > 1) {
            page--;
            Rue.paginate(Rue.brain.paginate.array, Rue.brain.paginate.perPage, page);
        }
    },
    playSound: function(url) {
        if (Rue.getRue("muteAudio")) { return; }
        const audio = new Audio(url);
        // set volume
        audio.volume = Rue.getRue("volume") || 1;
        audio.play();
    },
    wait: function(seconds,callback) {
        setTimeout(callback||function(){}, seconds * 1000);
    },
    die: function() {
        Rue.sleep(7474747474);
        Rue.addRue("deaths");
    },
    checkStreamerMode: function(text) {
        if (Rue.getUser("streamerMode")) {
            Rue.say("This action cannot be performed in Streamer Mode because it may contain sensitive info!" + (text ? "\n\nSuch as: "+text : ""));
            return true;
        }
        return false;
    },
    user: {
        overlay: function(color,opacity) {
            if (document.getElementById("rueUserScreenOverlay")) { document.getElementById("rueUserScreenOverlay").remove(); }
            var overlay = document.createElement("div");
            overlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:"+(color||"black")+";z-index:9999;opacity:"+(opacity||1);
            overlay.id = "rueUserScreenOverlay";
            document.body.appendChild(overlay);
        },
        die: function() {
            Rue.user.overlay("black");
            Rue.unfocus();
            Rue.addUser("deaths");
        },
        blink: function() {
            Rue.user.overlay("black",0.8);
            // remove .rueBlink after 0.5 seconds
            setTimeout(function() {
                if (document.getElementById("rueUserScreenOverlay")) { document.getElementById("rueUserScreenOverlay").remove(); }
            }, 100);
        },
    },
    userData: {
        rue: {},
        user: {},
        env: {}
    },
    brain: {},
}
// store if Rue should say Ctrl or Cmd in Rue.brain.actionKey
if (navigator.userAgent && navigator.userAgent.indexOf("Macintosh") !== -1) {
    Rue.brain.actionKey = "Cmd";
}
else {
    Rue.brain.actionKey = "Ctrl";
}
Rue.loadUserData();
if (Rue.userData.rue.mods.length > 0) {
    for (var i = 0; i < Rue.userData.rue.mods.length; i++) {
        var url = Rue.userData.rue.mods[i];
        // add a script to the page
        var script = document.createElement("script");
        console.log("RUE MOD LOADING: "+url)
        script.onload = function() {
            console.log("RUE MOD LOADED: "+this.src)
        }
        script.src = url;
        document.head.appendChild(script);
    }
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
            if (!rueData.subcommands[command] || args.length < rueData.subcommands[command].minArgs) {
                result = "[???]"
            }
            else if (rueData.subcommands[command].func) { result = rueData.subcommands[command].func(args); }
            else { result = eval(rueData.subcommands[command].text); }
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
// replaceAll polyfill
if (!String.prototype.replaceAll) {String.prototype.replaceAll = function(str, newStr){if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {return this.replace(str, newStr);}return this.replace(new RegExp(str, 'g'), newStr);};};
// Math.seedrandom https://github.com/davidbau/seedrandom
!function(f,a,c){var s,l=256,p="random",d=c.pow(l,6),g=c.pow(2,52),y=2*g,h=l-1;function n(n,t,r){function e(){for(var n=u.g(6),t=d,r=0;n<g;)n=(n+r)*l,t*=l,r=u.g(1);for(;y<=n;)n/=2,t/=2,r>>>=1;return(n+r)/t}var o=[],i=j(function n(t,r){var e,o=[],i=typeof t;if(r&&"object"==i)for(e in t)try{o.push(n(t[e],r-1))}catch(n){}return o.length?o:"string"==i?t:t+"\0"}((t=1==t?{entropy:!0}:t||{}).entropy?[n,S(a)]:null==n?function(){try{var n;return s&&(n=s.randomBytes)?n=n(l):(n=new Uint8Array(l),(f.crypto||f.msCrypto).getRandomValues(n)),S(n)}catch(n){var t=f.navigator,r=t&&t.plugins;return[+new Date,f,r,f.screen,S(a)]}}():n,3),o),u=new m(o);return e.int32=function(){return 0|u.g(4)},e.quick=function(){return u.g(4)/4294967296},e.double=e,j(S(u.S),a),(t.pass||r||function(n,t,r,e){return e&&(e.S&&v(e,u),n.state=function(){return v(u,{})}),r?(c[p]=n,t):n})(e,i,"global"in t?t.global:this==c,t.state)}function m(n){var t,r=n.length,u=this,e=0,o=u.i=u.j=0,i=u.S=[];for(r||(n=[r++]);e<l;)i[e]=e++;for(e=0;e<l;e++)i[e]=i[o=h&o+n[e%r]+(t=i[e])],i[o]=t;(u.g=function(n){for(var t,r=0,e=u.i,o=u.j,i=u.S;n--;)t=i[e=h&e+1],r=r*l+i[h&(i[e]=i[o=h&o+t])+(i[o]=t)];return u.i=e,u.j=o,r})(l)}function v(n,t){return t.i=n.i,t.j=n.j,t.S=n.S.slice(),t}function j(n,t){for(var r,e=n+"",o=0;o<e.length;)t[h&o]=h&(r^=19*t[h&o])+e.charCodeAt(o++);return S(t)}function S(n){return String.fromCharCode.apply(0,n)}if(j(c.random(),a),"object"==typeof module&&module.exports){module.exports=n;try{s=require("crypto")}catch(n){}}else"function"==typeof define&&define.amd?define(function(){return n}):c["seed"+p]=n}("undefined"!=typeof self?self:this,[],Math);
function seedRandom(seed) {
    var rng = new Math.seedrandom(seed);
    return rng();
}
function seedRange(min, max, seed) {
    return Math.floor(seedRandom(seed) * (max - min + 1)) + min;
}
function seedChoose(choices, seed) {
    return choices[Math.floor(seedRandom(seed) * choices.length)];
}
// more Date functions
Date.prototype.getMonthName = function() {return ["January","February","March","April","May","June","July","August","September","October","November","December"][ this.getMonth() ];};
Date.prototype.getDayName = function() {return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][ this.getDay() ];};
Date.prototype.getWeek = function() {var onejan = new Date(this.getFullYear(),0,1);var today = new Date(this.getFullYear(),this.getMonth(),this.getDate());var dayOfYear = ((today - onejan + 86400000)/86400000);return Math.ceil(dayOfYear/7)};
Date.prototype.getYearDay = function() {var onejan = new Date(this.getFullYear(),0,1);var today = new Date(this.getFullYear(),this.getMonth(),this.getDate());return Math.ceil((today - onejan + 86400000)/86400000)};
String.prototype.toTitleCase = function() {return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});};
function urlToHostname(url) {
    var hostname = url.match(/(https?:\/\/|^)[\w\.\-]+/);
    if (hostname) { hostname = hostname[0].replace(/https?:\/\//g,""); }
    return hostname;
}
function relativeToSeconds(text) {
    var num = text.match(/[\d\.\-\/\*\+]+/)
    var unit = text.match(/[a-z]+/i);
    if (!num) { return 0; }
    num = Rue.calculate(num[0]);
    if (!num) { return 0; }
    var multiplier = 1;
    if (unit) {
        unit = unit[0].toLowerCase();
        // if (/^regex for unit$/.test(unit)) { multiplier = seconds in unit }
        if (/^s(ec(ond)?s?)?$/.test(unit)) { multiplier = 1; unit="second(s)"; }
        else if (/^m(in(ute)?s?)?$/.test(unit)) { multiplier = 60; unit="minute(s)"; }
        else if (/^h((ou)?rs?)?$/.test(unit)) { multiplier = 60*60; unit="hour(s)"; }
        else if (/^d(ays?)?$/.test(unit)) { multiplier = 60*60*24; unit="day(s)"; }
        else if (/^w((ee)?ks?)?$/.test(unit)) { multiplier = 60*60*24*7; unit="week(s)"; }
        else if (/^mo(n(th)?s?)?$/.test(unit)) { multiplier = 60*60*24*30.4166666667; unit="month(s)"; }
        else if (/^y((ea)?rs?)?$/.test(unit)) { multiplier = 60*60*24*365.2421990741; unit="year(s)"; }
        else if (/^dec(ade)?s?$/.test(unit)) { multiplier = 60*60*24*365*10; unit="decade(s)"; }
        else if (/^cen(tur(y|ies))?$/.test(unit)) { multiplier = 60*60*24*365*100; unit="century(ies)"; }
        else if (/^mill(enni(um|a))?$/.test(unit)) { multiplier = 60*60*24*365*1000; unit="millennium(ia)"; }
        else if (/^m(illi(sec(ond)?)?)?s$/.test(unit)) { multiplier = 0.001; unit="millisecond(s)"; }
        else { unit="second(s)" }
    }
    else { unit="second(s)" }
    return [num * multiplier, num, unit];
}
function formatNum(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function limitNum(number, max, min) {
    return Math.min(Math.max(number, min||0), max||10000);
}

loadedRue = true;
if (!Rue.brain.source) {
    if (document.getElementById("rueScript")) { Rue.brain.source = "bookmarklet" }
    else { Rue.brain.source = null }
}
Rue.brain.loadStart = rueStartedLoad.getMilliseconds();
Rue.brain.loadEnd = (new Date()).getMilliseconds();
Rue.brain.loadTime = (Rue.brain.loadEnd - Rue.brain.loadStart)
// post-load functions
for (var i = 0; i < rueLoadFunctions.length; i++) {
    rueLoadFunctions[i]();
}

console.log("Rue's ready to go! ("+Rue.brain.loadTime+"ms)")
if (rueParam) { // handle URL parameter
    if (rueParam === "focus") {
        rueInput.focus();
    }
    else if (rueParam !== "true" && rueParam !== "on") {
        Rue.brain.auto = true;
        rueParam = rueParam.split(";;")[0];
        rueInput.value = rueParam;
        if (normalizeL2(normalize(rueParam)).match(/^(remove|rm|delete|del|add|new|create|append|rename|go ?to|deposit|withdraw|set|copy|paste|clear|turn on|turn off|enable|disable) |^(\/|http|www)/)) {
            Rue.error("{{r:[autodanger]}}");
        }
        else {
            sendMessage();
            rueInput.focus();
        }
        Rue.brain.auto = false;
    }
}
/*end rue load*/}

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