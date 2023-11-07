var xml = "";
for (var hex in multiplaneEntities) {
    if (hex.indexOf("(") !== -1) { continue }
    var value = multiplaneEntities[hex];
    var decimal = parseInt(hex, 16);
    var planecode = "R"+decimal.toString(16).toUpperCase().padStart(5,"0");
    if (value.indexOf("//") !== -1) {
        var plainName = value.split("//")[0].replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll("&","&amp;");
        var id = value.split("//").slice(1).join("//");
        var url = resolveID(id,false,2);
        if (url.indexOf("Could not resolve") !== -1) {
            var displayName = plainName;
        }
        else {
            var displayName = '<a href="' + url + '">' + plainName + '</a>';
        }
    }
    else {
        var plainName = value.replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll("&","&amp;");;
        var displayName = plainName;
    }
    // find alphaCodes row with row[0] == decimal
    var alphaCodesF = alphaCodes.filter(function(row) { return row[0] == decimal; });
    if (alphaCodesF.length == 0) {
        var alphaM = "";
        var alpha2 = "";
    }
    else {
        var alphaM = alphaCodesF[0][2];
        var alpha2 = alphaCodesF[0][1];
        if (alpha2 === "  ") { alpha2 = "" }
    }
    xml += ` <oid>
   <asn1-notation>{iso(1) identified-organization(3) dod(6) internet(1) private(4) enterprise(1) 61117 multiplane(1)
                   `+
   (alphaM ? `${alphaM}(${decimal})` : decimal) +
   `}</asn1-notation>\n`+
   (alphaM ? `   <identifier>${alphaM}</identifier>\n` : "")+
   (alpha2 ? `   <synonymous-identifier>${alpha2}</synonymous-identifier>\n` : "")+
`   <description>
      ${displayName}
   </description>
   <information>${plainName} is ${planecode} (#${decimal}) in the <a href="https://r74n.com/multiplane/?code=${planecode}">Multiplane</a>.</information>
 </oid>
`
}
console.log(xml);