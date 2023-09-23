// v1
multiplaneEntities = {
// Fundamentals //
  "0": "nothing",
  "1": "thing",
  "2": "action",
  "3": "information",
  "4": "data",
  "5": "online resource",
  "6": "project",
  "7": "physical object",

  "20": "test",
  "21": "error",
  "22": "unknown",
  "23": "true",
  "24": "false",
  
  "74": "[reserved]",

  "80": "text",
  "81": "text character",
  "82": "word",
  "83": "phrase",
  "84": "transformed text",
  "85": "language",
  "86": "program",
  "87": "webpage",
  "88": "website",
  "89": "video game",
  "8A": "image",
  "8B": "icon",
  "8C": "audio",
  "8D": "video",
  "8E": "user account",
  "8F": "social media post",
  "90": "form",
  "91": "form element",

// Projects //
  "100": "R74n",

// Particulars //
  "300": "living thing",
  "301": "fictional character",

// Resource Types //
  "400": "cloud document",
  "410": "Google Doc",


  "(∅)2": "actionless",
}
multiplanePlanes = {
  "R00000-R00FFF": "Foundation",
    "R00000-R000FF": "Fundamentals",
    "R00100-R002FF": "Projects",
    "R00300-R003FF": "Particulars",
    "R00400-R004FF": "Resource Types",
  "R01000-R0FFFF": "Project Spaces",
    "R01000-R010FF": "",
    "R01100-R011FF": "",
    "R01200-R012FF": "",
    "R01300-R013FF": "",
  "R10000-R10FFF": "",
  "R11000-R11FFF": "",
  "R12000-R12FFF": "",
  "RD0000-RDFFFF": "Wikibase Item Compatibility",
  "RE0000-REFFFF": "Ontomata Class Compatibility",
  "RF0000-RFFFFF": "Private Use Plane",
}
multiplaneDimensions = {
  "": "Default",
  "-": "Negative",
  "i": "Imaginary",
  "∅": "Null", // should be kept empty
  "∞": "Infinite",
  "↓": "Minimal",
  "↑": "Maximal",
  "½¹": "Half, First",
  "½²": "Half, Second",
  "∪": "Doublet",
  "†": "Graveyard",
}


multiplaneUnions = {
  "R00003+R00088": "reference website",
}