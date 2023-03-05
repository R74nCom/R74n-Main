function setText(e,text) {document.getElementById(e).innerHTML = text;}

function setValue(e,text) {
  if (!(e=="CopyButton")) {setValue("CopyButton","Copy");}
  document.getElementById(e).value = text;
}

function show() {
  document.getElementById("GeneratedDiv").style.display = "block";
}

function randomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomChoice(l) {
  return l[Math.floor(Math.random() * l.length)];
}

function downloadFile(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function getSelected(id) {
var element = document.getElementById(id);
return element.options[element.selectedIndex]
}