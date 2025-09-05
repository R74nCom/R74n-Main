// Text Viewer Parser - Standalone
// Based on Explore with Rue, which is based on Text Viewer
// Developed by R74n (https://R74n.com/)
// Available at https://r74n.com/textviewer/standalone.js

textParserCommands = {}
textParserConfig = {
  escapeHTML: false //escapes HTML in command arguments, often breaks nested commands
}

function addParserCommand(key,handler) {
  if (!key || !handler) return;
  textParserCommands[key] = {
    func: handler
  }
}

addParserCommand("c", function(args) {
  if (args.length === 0) {return ""}
  return args[Math.floor(Math.random()*args.length)];
})

function splitOnce(text,delim) {
  var parts = text.split(delim);
  var part1 = parts[0];
  var part2 = parts.slice(1).join(delim);
  return [part1,part2]
}
function parseText(text) {
  if (!text) return "";
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
      if (textParserConfig.escapeHTML) {
        for (let j = 0; j < args.length; j++) {
            args[j] = escapeHTML(args[j]);
        }
      }
      var result = null;
      command = command.toLowerCase();
      if (!textParserCommands[command] || args.length < textParserCommands[command].minArgs) {
        result = "[???]"
      }
      else if (textParserCommands[command].func) { result = textParserCommands[command].func(args); }
      // else { result = eval(textParserCommands[command].text); }
      newtext = newtext.replace("{{"+whole+"}}",result.replace ? result.replace(/\$/g,"$$$$") : result);
      count++;
      if (count > 1000) { newtext = newtext.split("{{")[0]; break }
    }
    tries++;
    if (tries > 50 || (text.length===newtext.length && text===newtext)) {text = newtext;break}
    text = newtext;
  }
  return text
}

function escapeHTML(unsafe) {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}