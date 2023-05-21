/*
{{bold|text}}

{{bold|{{italic|Super}} Formatting}}
*/


a = "{{bold|{{italic|Super}} Formatting}}";
// 1. {{bold|{{italic|Super}} Formatting}}
// 2. {{bold|*Super* Formatting}}
// 3. ***Super* Formatting**

a = "{{bold|{{italic|Super}} Formatting}}";
a = a.split("{{");

a[0] = "{{bold|"
// no }} so skip
a[1] = "{{italic|Super}} Formatting}}"
a[1] = a[1].split("}}")
a[1] = "{{italic|Super}}"
a[1] = "*Super*"
a = "{{bold|*Super* Formatting}}"

var subtags = {
    "italic": "*args[0]*",
    "bold": "**args[0]**"
}

function parseText(text) {
    var tries = 0;
    while (text.indexOf("{{") !== -1) {

        var newtext = "";
        var parts = text.split("{{");
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (part.indexOf("}}") === -1) {
                newtext += part;
                continue;
            }
            newtext += part;

        }

        text = newtext;
        tries++;
        if (tries > 50) {break}
    }
}