console.log("Rue by R74n is enabled on this page.")
var loadedRue = false;
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
}
else {
    rueHTML = '<div id="rueBox">' + rueHTML + '</div>';
}
// add html to the end of the body
rueParent.insertAdjacentHTML("beforeend", rueHTML);

// add html to the end of the head
document.head.insertAdjacentHTML("beforeend", `<style>/* Rue */
#rueBox {
  height: 3em!important; display: table-cell!important; vertical-align: middle!important; padding-right: 1em!important; padding-left: 1em!important; z-index:7474!important;font-size:22px!important;font-family: Arial, Helvetica, sans-serif!important;
}
.rueBoxCorner {
  top: 10px!important; right: 0!important; position: absolute!important
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
  vertical-align: middle!important; height: 25px!important; border-radius: 100px!important; border-top-right-radius: 0!important; border-bottom-right-radius: 0!important;background-color: rgb(107,107,107)!important;color:white!important;outline: 0;padding: 10px!important;margin:0!important;border-style:none!important;font-size:22px!important;font-family: Arial, Helvetica, sans-serif!important;
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

var rueData = {}

rueData.replacements = {
    "R74n": "R74n",
    "R74moji": "R74moji",
    "UniSearch": "UniSearch",
    "Mix-Up!": "Mix-Up!",
}
rueData.commands = {
    "say": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify what I should say!"); return }
        Rue.say(args.join(" ").replaceAll("\\n","\n").replaceAll("\\t","\t"));
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
        var search = args.join(" ");
        search = search.replace(/^(for) /g, "");
        Rue.openLink("https://r74n.com/search/?q=" + encodeURIComponent(search) +"#gsc.tab=0&gsc.q="+encodeURIComponent(search)+"&gsc.sort=");
    },
    "look up": "=search",
    "query": "=search",
    "google": function(args) {
        var search = args.join(" ");
        search = search.replace(/^(search )?(for) /g, "");
        Rue.openLink("https://www.google.com/search?q=" + encodeURIComponent(search));
    },
    "google images": function(args) {
        var search = args.join(" ");
        search = search.replace(/^(search )?(for) /g, "");
        Rue.openLink("https://www.google.com/search?tbm=isch&q=" + encodeURIComponent(search));
    },
    "gimages": "=google images",
    "imagesearch": "=google images",
    "imgsearch": "=google images",
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
        Rue.showMedia("https://chart.googleapis.com/chart?cht=qr&chs=256x256&chld=L|1&chl=" + encodeURIComponent(data||currentURL), "QR Code coming right up!");
    },
    "save archive": function(args) {
        var data = args.join(" ");
        Rue.openLink("https://web.archive.org/save/" + encodeURIComponent(data||currentURL));
    },
    "/my ?image/": function(args) {
        if (args.length === 0) {
            Rue.say("You need to provide a seed, like your name!")
            return;
        }
        var seed = normalizeL2(normalize(args.join(" ")));
        Rue.showMedia("https://picsum.photos/seed/"+seed+"/500/400", "This image is unique to "+args.join(" ")+"!", "Brought to you by Lorem Picsum");
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
    "save that": function() {
        if (Rue.brain.lastMessage) {
            Rue.say(Rue.brain.lastMessage);
            Rue.userData.rue.savedResponses.push(document.getElementById("rueMessageBox").innerText.replaceAll("\n"," "));
            Rue.say("Saved the last response! View them with the 'saved responses' command!");
        }
        else { Rue.say("I didn't say anything!"); }
    },
    "saved responses": function() {
        if (Rue.getRue("savedResponses").length === 0) { Rue.say("You don't have any saved responses! Say 'save that' to save one!"); return }
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
    "call": function(args) {
        var phone = args.join(" ");
        if (phone.match(/(\+?1[ -]?)?\(?(\d{3})\)?[ -]?(\d{3})[ -]?(\d{4})|\d{3}/)) {
            Rue.say("Call " + phone + " with <a href='tel:" + phone.replace(/[^0-9]/g, "") + "'>your phone</a>!");
        }
        else { Rue.say("I can't make calls, but I can provide a link to call them if you specify a phone number!") }
    },
    "facetime": "=call",
    "define": function(args) {
        var word = args.join(" ");
        Rue.openLink("https://en.wiktionary.org/w/index.php?go=Go&search=" + encodeURIComponent(word));
    },
    "dictionary": "=define",
    "wiktionary": "=define",
    "urban dictionary": function(args) {
        var word = args.join(" ");
        if (!word) {word = "R74n"}
        Rue.openLink("https://www.urbandictionary.com/define.php?term=" + encodeURIComponent(word));
    },
    "udefine": "=urban dictionary",
    "uddefine": "=urban dictionary",
    "defineud": "=urban dictionary",
    "ud": "=urban dictionary",
    "wikipedia": function(args) {
        var word = args.join(" ");
        Rue.openLink("https://en.wikipedia.org/w/index.php?go=Go&search=" + encodeURIComponent(word));
    },
    "wp": "=wikipedia",
    "wikipedia.org": "=wikipedia",
    "wolfram": function(args) {
        var text = args.join(" ");
        Rue.openLink("https://www.wolframalpha.com/input/?i=" + encodeURIComponent(text));
    },
    "wolframalpha": "=wolfram",
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
    "8ball": function(args) {
        if (args.length === 0) { Rue.error("You didn't ask a question!"); return }
        var question = args.join(" ");
        if (question.match(/^(when|why|who|how)/i)) { Rue.error("That's not a yes or no question!"); return }
        question = ultraNormalize(question);
        Rue.say("🎱 My 8-Ball says.. " + seedChoose(["Yes","No","{{c:Absolutely|Definitely}}","{{c:Absolutely|Definitely}} not","Maybe"],question)+"!");
    },
    "8-ball": "=8ball",
    "eightball": "=8ball",
    "/(roll( a)? )?dic?es?( ?roll)?/": function(args) {
        var sides = parseInt(args[0] || 6);
        if (isNaN(sides)) { Rue.error("That's not a number!"); return }
        var roll = Math.floor(Math.random()*sides+1);
        Rue.say("🎲 You rolled a " + roll + "!");
    },
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
            Rue.paginate("Below are all the items ya' have! ("+total+" Total)\n\n" + message);
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
        var amount = parseInt(args[0]);
        if (isNaN(amount)) { Rue.error("You didn't specify a valid amount!"); return }
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
            Rue.say("You doubled ya' bet and won {{ruecoin}}" + amount + "! ({{ruecoin}}" + Rue.getItem("ruecoin") + ")");
        }
    },
    "gamba": "=gamble",
    "lottery": function() {
        if (Rue.getItem("ruecoin") < 2) { Rue.error("You don't have enough Ruecoins! A lottery ticket costs {{ruecoin}}2.."); return }
        Rue.confirm("Wanna buy a lottery ticket for {{ruecoin}}2? (You have {{ruecoin}}" + Rue.getItem("ruecoin") + ")", function() {
            Rue.delItem("ruecoin", 2);
            var numbers = "{{rng}}{{rng}} {{rng}}{{rng}} {{rng}}{{rng}} {{rng}}{{rng}} {{rng}}{{rng}} {{rng}}{{rng}}";
            if (Math.random() < 0.0000033333333333333333) {
                Rue.addItem("ruecoin", 200000);
                Rue.say(numbers+"\n\nYou won the lottery and got {{ruecoin}}200,000! ({{ruecoin}}");
            }
            else {
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
    "tts": function(args) {
        if (!('speechSynthesis' in window)) { Rue.error("Awkward.. Your browser doesn't support text to speech!! :("); return }
        var text = args.join(" ");
        if (!text) { Rue.error("You didn't specify what to say!"); return }
        var msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
        Rue.say(text, true);
    },
    "text to speech": "=tts",
    "texttospeech": "=tts",
    "t2s": "=tts",
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
        Rue.openLink("https://translate.google.com/?sl=auto&tl=en&op=translate&text=" + encodeURIComponent(text));
    },
    "gtranslate": "=translate",
    "google translate": "=translate",
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
} // commands
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
        var key = match[1];
        Rue.say("My favorite " + key + " is " + (rueData.favorites[key] || "[???]") + "!");
    },
    "/https?:\\/\\/.+/": function(text) {
        Rue.openLink(text);
    },
    "/www\\..+/": function(text) {
        Rue.openLink("http://" + text);
    },
    "/[\\w\\.]+\\.(com?|org|net|co\\.uk|edu|gov|tv|io)(\\/.+)?/": function(text) {
        Rue.openLink("http://" + text);
    },
    "/leave|self[ \\-]?destruct|go away|hide|run away|exit|close|turn off|shut up|stfu|lock ?down/": function() {
        Rue.say("I'll leave right after ya' click somewhere else! See ya' {{c:soon|later}}, friend!");
        Rue.brain.afterClickOff = function() {
            document.getElementById("rueBox").remove();
            delete Rue;
            if (document.getElementById("rueScript")) {
                document.getElementById("rueScript").remove();
            }
            console.log("Rue has left the building.");
        }
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
    "/((go|time) ?to)? ?sleep|(go ?to|time for) (bed|sleep)|(bed|sleep) ?time/": function() {
        Rue.say("Zzz.. Goodnight..");
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
    "rainbow": function() {
        var style = document.createElement("style");
        style.innerHTML = `@keyframes rueRainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }`;
        document.head.appendChild(style);
        document.body.style.animation = "rueRainbow 5s infinite";
        Rue.say("Be who you are!")
    },
    "black and white": function() {
        document.body.style.filter = "grayscale(100%)";
    },
    "grayscale": "=black and white",
    "greyscale": "=black and white",
    "black & white": "=black and white",
    "b&w": "=black and white",
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
    "kitten": function() {
        Rue.showMedia("https://placekitten.com/"+(500+Math.floor(Math.random()*50))+"/"+(500+Math.floor(Math.random()*50)), "Kitten for you! 🐱", "Brought to you by placekitten.com");
    },
    "dog": function() {
        Rue.callAPI("https://random.dog/woof.json", function(data) {
            Rue.showMedia(data.url, "Dog for you! 🐶", "Brought to you by random.dog");
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
    "animal": function() {
        rueData.totalities[chooseItem(["fox","cat","/cat ?gif/","bear","kitten","dog","shibe","bird"])]()
    },
    "/(what('| i)?s? )?(today'?s |the )?(date|day|today)( is it)?/": function() {
        var date = new Date();
        Rue.say("It's currently " + date.getDayName() + ", " + date.getMonthName() + " " + date.getDate() + ", " + date.getFullYear() + "!");
    },
    "/(what('| i)?s? )?(the )?(month)( is it)?/": function() {
        Rue.say("It's currently " + new Date().getMonthName() + "!");
    },
    "/(what('| i)?s? )?(the )?(week)( is it)?/": function() {
        Rue.say("It's currently week " + new Date().getWeek() + " of " + new Date().getFullYear() + "!");
    },
    "/(what('| i)?s? )?(the )?(time)( is it)?/": function() {
        Rue.say("It's currently " + new Date().toLocaleTimeString() + "!");
    },
    "/(what('| i)?s? )?(the )?(utc( ?time)?)( is it)?/": function() {
        Rue.say("In UTC, it's currently " + new Date().toUTCString() + "!");
    },
    "/(what('| i)?s? )?(the )?(day of( the)? year)( is it)?/": function() {
        Rue.say("It's currently day " + new Date().getYearDay() + " of " + new Date().getFullYear() + "!");
    },
    "/(what('| i)?s? )?(the )?(week ?day|day of( the)? week)( is it)?/": function() {
        Rue.say("It's currently " + new Date().getDayName() + "!");
    },
    "uptime": function() {
        var time = Date.now() - 1687725300000;
        var days = Math.floor(time / (1000 * 60 * 60 * 24));
        var hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        Rue.say("I've been online for " + days + " days, " + hours + " hours, and " + minutes + " minutes!");
    },
    "age": "=uptime",
    "pathname": function() {
        Rue.say("Current pathname: " + window.location.pathname);
    },
    "path": "=pathname",
    "protocol": function() {
        Rue.say("You are currently using the " + window.location.protocol.replace(":","").toUpperCase() +" protocol!");
    },
    "/https?/": "=protocol",
    "website": function() {
        if (!window.location.hostname) { Rue.error("Doesn't look like you're on a website!"); return }
        Rue.say("You are on " + window.location.hostname + "!");
    },
    "hostname": "=website",
    "host": "=website",
    "domain": "=website",
    "host name": "=website",
    "site": "=website",
    "/(today'?s|daily)? ?fortune( cookie)?( of the day)?|fotd/": function() {
        Rue.say("{{act:crack}} Today's fortune...\n\n{{sc:{{today}}|Be a|Live for|Strive for|Conquer|Seek the|Ask the|Find the|Think of the|Imagine a}} {{sc:{{today}}|dog|Rue|website|server|paper|cat|rabbit|squirrel|coin|tree|diamond|pile of sand|greeting|unit of time|emoji|symbol|flag}}, {{sc:{{today}}|and|and then|then you|then, and only then, you|}} {{sc:{{today}}|become|find|learn}} {{sc:{{today}}|love|fortune|programming|the truth|your true self|real|God|the dream|life itself|family|health|strength|the Sun}}.")
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
        Rue.paginate("Here's all your user data! You can download it with 'export data'.\n\n" + message);
    },
    "stats": "=me",
    "statistics": "=me",
    "/(user|my) ?data/": "=me",
    "/(user|my) ?(stat(istic)?s)/": "=me",
    "/[ru]\\/\\w+/": function(text) {
        Rue.openLink("https://reddit.com/" + text);
    },
    "/#[0-9a-f]{3,6}/": function(text) {
        Rue.say("Here's a preview of that color!", {bg:text});
    },
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
        Rue.say("I'll be quiet until ya' say 'unmute'!");
        Rue.brain.mute = true;
    },
    "/time ?out/": "=mute",
    "unmute": function() {
        Rue.brain.mute = false;
        Rue.say("Phew! Good to be back!");
    },
    "untimeout": "=unmute",
    "deafen": function() {
        Rue.say("I'll stop listening until ya' say 'undeafen'!");
        Rue.brain.deaf = true;
    },
    "undeafen": function() {
        Rue.brain.deaf = false;
        Rue.say("Phew! Good to be back!");
    },
    "/die|kys|kill ?(yo)?urself/": function() { Rue.sleep(7474747474) },
    "xp": function() {
        Rue.say("You have " + Rue.getUser("xp") + " XP, which makes you Level " + Rue.getUser("level") + "!\n\nYou can get XP just by talking to me once per minute!");
    },
    "experience": "=xp",
    "exp": "=xp",
    "level": function() {
        Rue.say("You're at Level " + Rue.getUser("level") + ", with " + Rue.getUser("xp") + " XP!\n\nYou can get XP just by talking to me once per minute!");
    },
    "lvl": "=level",
    "rank": "=level",
    "cookies": function() {
        // all cookies that don't start with _
        Rue.paginate("Cookies on this page:\n\n"+document.cookie.split("; ").filter(function(cookie) { return cookie[0] !== "_" }).join("\n"));
    },
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
                else if (rps === 1 && Rue.brain.rps === 3) { Rue.say("You win! I picked scissors!"); Rue.addUser("wins:rps");Rue.addUser("wins")}
                else if (rps === 2 && Rue.brain.rps === 1) { Rue.say("You win! I picked rock!"); Rue.addUser("wins:rps");Rue.addUser("wins")}
                else if (rps === 3 && Rue.brain.rps === 2) { Rue.say("You win! I picked paper!"); Rue.addUser("wins:rps");Rue.addUser("wins")}
                else { Rue.say("I win! I picked " + ["rock","paper","scissors"][Rue.brain.rps-1] + "!"); Rue.addUser("losses:rps");Rue.addUser("losses")}
                Rue.endActivity();
            }
            else { Rue.say("That's not an option! Rock, paper, or scissors?") }
        }
    },
    "rock paper scissors": "=rps",
}
rueData.exitTerms = ["exit","stop","close","x","cancel","leave","shut up","stfu","end","end activity","stop activity","cancel activity","leave activity","quit","quit activity","escape","finish","pause"];
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
    // say {{b:test}} {{i:test}} {{sup:test}} {{sub:test}} {{ul:test}} {{strike:test}} {{small:test}} {{big:test}} {{code:test}}
    bi: {text:`"{{b:{{i:"+args[0]+"}}}}"`},
    ib: {text:`"{{i:{{b:"+args[0]+"}}}}"`},
    lower: { func: function(args) { return (args[0]||"").toLowerCase(); } },
    upper: { func: function(args) { return (args[0]||"").toUpperCase(); } },
    title: {
        func: function(args) {
            var text = args[0]||"";
            return text.toTitleCase();
        }
    },
    ak: { func: function() { return Rue.brain.actionKey; } },
    act: {text:`"{{i:*"+args[0]+"*}}"`},
    ruecoin: {text:`"<span style='color:lime'>{{strike:{{code:R}}}}</span>"`},

}
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
    "purpose": "I'm here to help {{c:ya' navigate|find ya' way around}} {{c:this place|R74n}}!",
    "intro": "{{c:Hi|Hey}} there, friend! {{r:purpose}}\n\n{{r:[learnmore]}}",
    "name": "Name's Rue!",
    "pronouns": "I use she/they pronouns!",
    "who": "{{r:name}} {{r:purpose}}\n\n{{r:[learnmore]}}",
    "rue": "That's me! {{r:purpose}}\n\n{{r:[learnmore]}}",
    "[guide]": "For a more detailed guide, check out the {{link:https://r74n.com/rue/docs|Explore with Rue Guidebook}}",
    "rue help": "Just type in a phrase or keyword and press my face or [Enter] to send it!\n\n{{r:[guide]}}!",
    "[helpbeta]": "Since I'm only in my {{c:open beta|testing}} stage, I haven't {{c:put together|written up}} a help page yet. Sorry!",
    "help": "{{r:rue help}}\n\nFor help with other projects, try leaving {{link:https://r74n.com/ufbs/|feedback}} or joining our {{link:https://link.r74n.com/discord|Discord}}!",
    "help me": "=help",
    "guide": "=help",
    "readme": "=help",
    "docs": "=help",
    "documentation": "=help",
    "guidebook": "=help",
    "guide book": "=help",
    "handbook": "=help",
    "hand book": "=help",
    "tutorial": "=help",
    "rue tutorial": "=help",
    "rue tut": "=help",
    "user manual": "=help",
    "manual": "=help",
    "assistance": "=help",
    "halp": "=help",
    "commands": "For a list of all commands, check out the {{link:https://r74n.com/rue/docs|Explore with Rue Guidebook}}!",
    "all commands": "=commands",
    "responses": "=commands",
    "cmds": "=commands",
    "/explore( with (rue|you|u))?/": "Type in a place ya'd like to go, and I'll {{c:take|bring}} ya' there!",
    "privacy": "While talking to me, no outside connection is made, and all data is stored right here in your browser!",
    "ai": "I make no (ZERO!) use of artificial intelligence, or machine learning!",
    "gpt": "=ai",
    "chatgpt": "=ai",
    "business": "Our email is open for any business inquiries: {{link:mailto:contact@R74n.com|contact@R74n.com}}",
    "advertise": "=business",
    "biz": "=business",
    "inquiry": "=business",
    "inquiries": "=business",
    "price": "I'm free to use anywhere I'm enabled, such as the {{link:https://r74n.com/|R74n website}}!",
    "cost": "=price",
    "fee": "=price",
    "contact": "There are many ways to contact us! The best ways are our {{link:https://link.r74n.com/discord|Discord}} or {{link:https://twitter.com/R74nCom|Twitter}}. We also have accounts practically {{link:https://r74n.com/social|everywhere}}, and an email too: {{link:mailto:contact@r74n.com|contact@R74n.com}} :)",
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
    "credit": "I was coded by R74n!",
    "credits": "=credit",
    "level up": "You can level up by getting XP! Type 'xp' to see how much ya' have!",
    "levelup": "=level up",
    "lvl up": "=level up",
    "get levels": "=level up",
    "get xp": "Right now, you can get XP just by talking to me once per minute!",

    "ryan": "My creator! Their Discord is @ryan.",
    "ryan#4755": "This user is now known as @ryan on Discord.",
    "@ryan": "This is a user on Discord, with the ID {{link:https://discord.com/users/101070932608561152|101070932608561152}}. Previously ryan#4755.",
    "/test(ing?)?/": "I think it's {{c:working|a success}}! There's also the R74n {{link:https://r74n.com/test/|Testing Zone}}.",
    "<3": "love>>>O-oh..",
    "/il[yu]|(i )?lo+ve+ (you+|u+|ya+)/": "=<3",
    "sex": "flushed>>>O-oh..",
    "why": "=purpose",
    "sandtiles": "Sandtiles is a top-down pixel art game that is on an indefinite hiatus.",
    "ontomata": "{{link:https://docs.google.com/document/d/1M8FExUFCsBLv9EeLke00VrdYpYQFPYN11uh9VFi_K10/edit?usp=sharing|Ontomata}} is an ontology and possibly a multiplayer video game slowly being developed.",
    "lang": "{{kw:language}}",
    "2023": "My birth year!",
    "june": "My birth month! (The 22nd, to be exact.) See the {{link:https://r74n.com/commons/calendar|calendar}} for more events in June.",
    "mods": "If you're looking for Sandboxels mods, try checking the {{link:https://link.r74n.com/sandboxels-mods|Mod List}}.",
    "mod": "=mods",
    "modding": "=mods",
    "/\\.+/": "error>>>{{r:[blank]}}", //"..."
    "/(\\.+)?\\?+/": "What..",
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
    "computer": "I'm running on ya' computer or mobile device right now!",
    "affirmation": ["I love talkin' to ya'!","I think ya' gonna do great things!","You've got {{c:nice {{c:hair|eyes|lips|teeth}}|a nice {{c:nose|smile|voice|body}}}}!","Ya' lookin' really {{c:cute|nice|good|confident}} {{c:today|right now}}!","You are stronger than you {{c:know|think}}!","You make your own {{c:decision|choice}}s!","You can think clearly and rationally!","You are completely safe here.","Everything is okay!","You are able to do anything."],
    "affirm me": "=affirmation",
    "compliment": "=affirmation",
    "compliment me": "=affirmation",
    "update": "I update automatically when ya' refresh the page!",
    "currency": "I use the {{ruecoin}}Ruecoin as the currency here! Its real-world value is currently unknown..",

    
    "/(hello+|ha?i+|he+y+([ao]+)?|ho+la+|a?y+(o+)?|howdy+|halacihae|gm+|g'?mornin[g']?|good ?(morn(in+([g']+)?)?|even(in+[g']+)|after ?noon)|👋|welcome( back)?|salutations?|greetings?|hewwo+|hiya+|oi+|ahoy+) ?(there+)? ?(there+|rue|friend|again|world|matey?)?/": "=intro",
    "/(((good|gud|buh|bye|bai)?([ \\-]+)?(bye|bai))|(see|c) ?(you|ya'?|u) ?(later|l8e?r)?) ?(rue|friend)?/": "See ya' later, friend!",
    "/((goo+d|gud) ?(night+|nite+)|gn+|sweet dreams+|sleep tight+|sleep well+) ?(rue|friend)?/": "{{c:Have a good night|Goodnight}}, friend! {{c:Sleep tight|Sleep well|Rest well}}!",
    "/(who|what)( (are|r) (you|u)|is (this|rue))/": "=who",
    "/no+|nah+|nope+/": "No.. problem!",
    "/(yes+|ya+|yeah+|yep+|yas+)(sir)?/": "Noted!",
    "/(o?kk?([aeiy]+)?( ?dok(ie+|ey+))?|(i )?got (it|you|u)|alri(ght|te)y?) ?(then)?/": ":)",
    "/(f[uv*#]ck|screw) ?(you|u|off)/": "angry>>>..Not {{c:cool|nice}}.",
    "/(how (are|r|is) ?(you|u|rue)|hr[uy])( [dg]oing)?/": "{{c:I'm|I am|Rue's}} {{c:doin' |feelin' |}}{{c:very good|great|perfect|awesome|wonderful}}{{c: right now| at the moment|}}!{{c: {{r:[whatsup]}}|}}",
    "/(wh?[au]t('?| i)s? up+)/": "{{r:[whatsup]}}",
    "/(th?(ank(s+)?|ks|x+) ?(you+|u+)?|ty+(sm+)?) ?(rue|friend)?/": "Of course! I'm always {{c:here|around}} to help{{c: ya'|}}, friend!",
    "/(pretty )?(please+|plz+|pls+|pleek)/": "I'll try my best!",
    "/who (made|created|develop(ed|s)|started|invented|came up with) (you|u|ya|rue)/": "I was {{c:created|made|developed}} by {{link:https://R74n.com/|R74n}}!",
    "/how ?(to|do i|2)? ?(use|ask|talk to)? ?(you|rue|u|this|explore with rue)?/": "Glad ya' want my help! {{r:rue help}}",
    "/(you|u|rue|that|this)? ?(is|are|r|'?re|'?s)? ?(a|so+|very|really|the)? ?(wrong|incorrect|stupid|dummy|dumbass|dumb|idiot|idiotic|lying|false|[md]isinfo(rmation)?|lie|liar|mistaken|bad|terrible|worse|worst)/": "I'm not perfect! Leave me some feedback {{link:https://docs.google.com/forms/d/e/1FAIpQLSfudgcdqzF1HhRhY7L_xGun2t7JvVNU3KzE63uU_1iEIddBwA/viewform?usp=pp_url&entry.391765687=Rue+/+Explore+with+Rue|here}}!",
    "/(you|u|rue)? ?(is|are|r|'?re|'?s)? ?(a|so+|very|really|the)? ?(nice|amazing|awesome|cool|epic|helpful|good|great|best|better)/": "happy>>>:)",
    "/(you|u|rue)? ?(is|are|r|'?re|'?s)? ?(a|so+|very|really|the)? ?(cute+|hot|attractive|pretty|handsome)/": "love>>>O-oh.. Thank{{c:s| you}}..",
    "/(you|u|rue)? ?(is|are|r|'?re|'?s)? ?(a|so+|very|really|the)? ?(mean|rude|asshole|bad)/": "sad>>>I apologize if I hurt you.. I didn't mean it!",
    
    "/dirt ?[,+] ?water/": "You made Mud!",
    "/water ?[,+] ?dirt/": "You made Mud!",
    "ryan is a": "Ryan is a C",
    "otter": "🦦",
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
    "shrug": "¯\_(ツ)_/¯",
} // responses
rueData.keywords = {
    "language": "I can only speak and respond to English right now! I was written in pure JavaScript.",
    "birthday": "My (Rue's) birthday is on June 22nd. The R74n website's is on May 2nd. The owner's is a secret!",
    "human": "I am not a real {{c:human|person}}! I'm a {{c:chatbot|robot}}!",
    "robot": "I am a {{c:chatbot|robot}} designed to help you navigate R74n!",
    "[swear]": "angry>>>..Not {{c:cool|nice}}.",
    "fuck":"=[swear]","shit":"=[swear]","bitch":"=[swear]","asshole":"=[swear]","dumbass":"=[swear]",
}
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
    "eod icon": "https://r74n.com/EoD.png",
    "eod logo": "=eod icon",
    "eod gif": "https://media.tenor.com/UHocSNQ-Pu8AAAAC/eod-elemental.gif",
    "3d": "https://media.tenor.com/A-yMgXu4m8QAAAAC/r74n-logo.gif",
    "wireframe": "https://media.tenor.com/JgN8uPteAmUAAAAC/r74n-logo.gif",
    "beloved": "https://media.tenor.com/FqlZ0Mz8Y3IAAAAC/r74n-my-beloved.gif",
    "qr": "https://imgur.com/ilim881",
    "cpd icon": "https://c.r74n.com/favicon.png",
    "cpd logo": "=cpd icon",
    "cpd favicon": "=cpd icon",
    "cpd c": "=cpd icon",
    "flag": "https://media.tenor.com/EmqXVWYvMUUAAAAC/r74n-flag.gif",
    "reflection": "https://media.tenor.com/F_S1fZUXSuUAAAAC/r74n-logo.gif",
    "emoji artist beloved": "https://media.tenor.com/gCt2z3MHaYEAAAAC/emoji-artist-emoji.gif",
    "emoji artist avatar": "https://pbs.twimg.com/profile_images/1483856848751108098/WR_xlOwJ_400x400.jpg",
    "emoji artist face": "=emoji artist avatar",
    "emoji artist logo": "=emoji artist avatar",
    "emoji artist icon": "=emoji artist avatar",
    "mommy": "https://media.tenor.com/l8-Qe7WJ3NgAAAAC/sandboxels-sandbox.gif",
    "billboard": "https://media.tenor.com/Y2E-v2DNuV8AAAAC/r74n-billboard.gif",
    "komodohype": "https://static-cdn.jtvnw.net/emoticons/v1/305954156/4.0",
    "rickroll": "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
}
rueData.links = {
"main": "https://r74n.com/",
"r74n": "=main",
"main website": "=main",
"r74n.com": "=main",
"r47n.com": "=main",
"www.r74n.com": "=main",
"/": "=main",
"rue guide": "https://r74n.com/rue/docs",
"rue docs": "=rue guide",
"rue.js": "https://r74n.com/rue/rue.js",
"rue guidebook": "=rue guide",
"explore with rue guidebook": "=rue guide",
"explore with rue guide": "=rue guide",
"rue guide book": "=rue guide",
"rue handbook": "=rue guide",
"rue hand book": "=rue guide",
"rue manual": "=rue guide",
"rue page": "https://r74n.com/rue/",
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
"halacae": "https://docs.google.com/document/d/1mZ2IGrIbfYlUwfuZ53_S0n5O2ne9JUKV0yinIyNwLFU/edit?usp=sharing",
"pogchamps": "https://r74n.com/PogChamp/",
"pogchamp": "=pogchamps",
"all twitch pogchamps": "=pogchamps",
"pogchampening": "=pogchamps",
"pogs": "=pogchamps",
"poggers": "=pogchamps",
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
"eodwiki": "https://elemental-on-discord.fandom.com/wiki/",
"elemental on discord wiki": "=eodwiki",
"eod wiki": "=eodwiki",
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
"mc:discord": "=itemcult",
"discord:mc": "=itemcult",
"discord:minecraft": "=itemcult",
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
"feedback responses": "https://link.R74n.com/ufbs",
"response sheet": "https://link.R74n.com/ufbs",
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
"archive": "https://web.archive.org/web/2023062320274974747474/https://r74n.com/",
"archived": "=archive",
"wayback": "=archive",
"wayback machine": "=archive",
"internet archive": "=archive",
"archive.org": "=archive",
"web.archive.org": "=archive",
"web archive": "=archive",
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
"giant bomb:eod": "https://www.giantbomb.com/elemental-on-discord/3030-83072/",
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
"nv7": "https://nv7haven.com/",
"nv7:eod": "https://nv7haven.com/eod",
"pointlesssites": "https://www.pointlesssites.com/site-search.asp?t=R74n",
} // links

const whitespaceRegex = /[\s\uFEFF\u200B]+/g;
const punctuationRegex = /[`~!¡¿‼‽⁇⁈⁉！@#$¢£€¥%\^&\*\(\)\-‐‑‒–—―_\+×÷=\[\]\{\}\|\\;:：；'‘’"“”„＂＇‚‛❛❜❟‟«»<>,\.…\/⁄\?¶⁋❡§†‡°]+/g;
function normalize(text) {
    return text.toLowerCase().replace(whitespaceRegex, " ").trim();
}
function normalizeL2(text) {
    return text.replace(punctuationRegex, "").toLowerCase().trim();
}
function ultraNormalize(text) {
    return text.replace(/&|'?n'|'n?/g,"and").replace(punctuationRegex, "").toLowerCase().trim().replace(whitespaceRegex,"").replace(/[eiou]/g,"a").replace(/i?es|ys/g,"s");
}
function encodeHTML(text) {
    if (Array.isArray(text)) { return text.map(encodeHTML); }
    return text.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&#34;");
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
    if (dict[text]) { return func(...chooseValue(dict,text)) || true; }
    var n2 = normalizeL2(text);
    if (dict[n2]) { return func(...chooseValue(dict,n2)) || true;; }
    var ns = n2.replace(whitespaceRegex, "");
    if (dict[ns]) { return func(...chooseValue(dict,ns)) || true; }
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


loadedRue = true;
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
    if (Rue.brain.speaking && !Rue.brain.sticky) {
        Rue.hush();
    }
});
rueButton.onclick = function(e) { // send message
    if (Rue.brain.sleeping) { // handle sleeping
        Rue.brain.sleeping--;
        if (!Rue.brain.sleeping) { Rue.wake(); Rue.say("{{r:[wakeup]}}"); Rue.cooldown(2) }
        return;
    }
    if (Rue.brain.cooldown) { return; }
    if (Rue.brain.confirming && !Rue.brain.paginate) {
        if (Rue.brain.confirming === rueInput.value) {
            Rue.brain.afterConfirm(e);
            Rue.brain.confirming = false;
            Rue.brain.afterConfirm = undefined;
            if (!Rue.brain.activity) {return;}
        }
        Rue.brain.confirming = false;
        Rue.brain.afterConfirm = undefined;
    }
    var text = rueInput.value.trim().replace(/ {2,}/g, " ");;
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
    var normalized = normalize(text);
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

    var done = false;

    // regex totalities
    done = tryVariants(text, rueData.totalities, function(func) {
        func(encodeHTML(text));
    });
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
                argsArray = text.split(key+" ")[1].replace(whitespaceRegex, " ").split(" ");
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
    if (!done) {
        done = tryVariants(commandBase, rueData.commands, function(func) {
            func(encodeHTML(argsArray));
        }, true);
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
            Rue.say(mathResult);
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
    else if (e.keyCode === 67 && (e.metaKey||e.ctrlKey) && Rue.brain.speaking) { // ctrl + C
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
document.addEventListener("keydown", function(e) {
    // command + shift + r = focus on Rue
    if (e.key === "r" && e.shiftKey && (e.metaKey||e.ctrlKey)) {
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
        if (Rue.brain.sleeping) { Rue.wake(); }
        if (Rue.brain.mute) { return; }
        if (!opt) { opt = {} }
        message = message.toString();
        if (message.indexOf("{{") !== -1) {
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
        Rue.say(message+"\n{{r:[confirm]}}", {color:"#ffff00",bg:"#7b7b5b"});
    },
    openLink: function(url,e) {
        url = url.replaceAll("$1", "");
        Rue.loading();
        if (!e || !(e.metaKey||e.ctrlKey)) {
            window.open(url, "_self");
        }
        else {
            window.open(url, "_blank");
            Rue.say("{{r:[newtab]}}")
        }
    },
    // randomly add .rueBlink to rueButton at random intervals
    blink: function(loop) {
        if (Rue.brain.sleeping) { return; }
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
    getRue: function(key) { return Rue.userData.rue[key]; },
    setRue: function(key, value) { Rue.userData.rue[key] = value; Rue.changedUserData(); return value },
    addRue: function(key, value) { if(value===undefined){value=1} if (!Rue.userData.rue[key]){Rue.userData.rue[key]=0} Rue.userData.rue[key] += value; Rue.changedUserData(); return Rue.userData.rue[key] },
    delRue: function(key) { delete Rue.userData.rue[key]; Rue.changedUserData(); },
    getUser: function(key) { return Rue.userData.user[key]; },
    setUser: function(key, value) { Rue.userData.user[key] = value; Rue.changedUserData(); return value },
    addUser: function(key, value) { if(value===undefined){value=1} if (!Rue.userData.user[key]){Rue.userData.user[key]=0} Rue.userData.user[key] += value; Rue.changedUserData(); return Rue.userData.user[key] },
    delUser: function(key) { delete Rue.userData.user[key]; Rue.changedUserData() },
    getEnv: function(key) { return Rue.userData.env[key]; },
    setEnv: function(key, value) { Rue.userData.env[key] = value; Rue.changedUserData(); return value },
    addEnv: function(key, value) { if(value===undefined){value=1} if (!Rue.userData.env[key]){Rue.userData.env[key]=0} Rue.userData.env[key] += value; Rue.changedUserData(); return Rue.userData.env[key] },
    delEnv: function(key) { delete Rue.userData.env[key]; Rue.changedUserData() },
    addItem: function(item,amount) {
        item = item.toString().toLowerCase();
        if (amount === undefined) { amount = 1; }
        if (!Rue.userData.user.inv[item]) { Rue.userData.user.inv[item] = 0; }
        Rue.userData.user.inv[item] += amount;
        Rue.changedUserData();
        return Rue.userData.user.inv[item];
    },
    delItem: function(item,amount) {
        item = item.toString().toLowerCase();
        if (amount === undefined) { amount = 1; }
        if (!Rue.userData.user.inv[item]) { Rue.userData.user.inv[item] = 0; }
        Rue.userData.user.inv[item] -= amount;
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
        },
        user: {
            inv: {},
        },
        env: {}
    },
    loadUserData: function() {
        var data = localStorage.getItem("rueUserData");
        if (!data) { data = JSON.parse(JSON.stringify(Rue.defaultUserData)); }
        else {
            data = JSON.parse(data);
            // loop through defaultUserData
            for (var datacat in Rue.defaultUserData) {
                if (!data[datacat]) { data[datacat] = {}; }
                for (key in Rue.defaultUserData[datacat]) {
                    if (!data[datacat][key]) {
                        var value = Rue.defaultUserData[datacat][key];
                        if (typeof value === "object") { data[datacat][key] = JSON.parse(JSON.stringify(value)); }
                        else { data[datacat][key] = value; }
                    }
                }
            }
        }
        if (!data.user.userSeed) { data.user.userSeed = Math.floor(Math.random() * 1000000000); }
        Rue.userData = data;
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
        xhr.onreadystatechange = function() {
            Rue.hush();
            if (xhr.readyState === 4 && callback) {
                callback(JSON.parse(xhr.responseText));
            }
        }
        xhr.onerror = function() {
            Rue.error("Error " + xhr.status + ": " + xhr.statusText);
        }
        xhr.send();
    },
    focus: function(response) {
        rueInput.focus();
        if (response) { Rue.say(response); }
    },
    setInput: function(text) { rueInput.value = text; },
    clearInput: function() { rueInput.value = ""; },
    calculate: function(mathExpression) {
        mathExpression = mathExpression.toLowerCase();
        // loop through rueData.mathReplacements
        for (var key in rueData.mathReplacements) {
            mathExpression = mathExpression.replaceAll(key, chooseValue(rueData.mathReplacements,key)[0]);
        }
        if (!/^[\d\. ]+$/gi.test(mathExpression) && /^(([+\-\/\*\d ()\.e]| Infinity | NaN )+)?(\d| Infinity | NaN )(([+\-\/\*\d ()\.e]| Infinity | NaN )+)?$/gi.test(mathExpression)) {
            mathExpression = mathExpression.replaceAll(/e{2,}/g, "e");
            try {
                var e = Math.E;
                var mathResult = eval(mathExpression);
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
    userData: {
        rue: {},
        user: {},
        env: {}
    },
    brain: {
        "lastResponse": "",
    },
}
// store if Rue should say Ctrl or Cmd in Rue.brain.actionKey
if (navigator.userAgent && navigator.userAgent.indexOf("Macintosh") !== -1) {
    Rue.brain.actionKey = "Cmd";
}
else {
    Rue.brain.actionKey = "Ctrl";
}
Rue.loadUserData();
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


console.log("Rue's ready to go!")
if (rueParam) {
    if (rueParam === "focus") {
        rueInput.focus();
    }
    else if (rueParam !== "true" && rueParam !== "on") {
        rueInput.value = encodeHTML(rueParam);
        rueButton.onclick();
        rueInput.focus();
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