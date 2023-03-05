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

function generateNumber() {
  return randomRange(1000000,99999999)*randomChoice([1,-1]);
}

function generateUUID() {
  return "[I;"+generateNumber()+","+generateNumber()+","+generateNumber()+","+generateNumber()+"]"
}

function isChecked(e) {
  return document.getElementById(e).checked;
}

function copyText(){
  ResultBox = document.getElementById("GeneratedText");
  ResultBox.select();
  document.execCommand('copy',false);
  setValue("CopyButton","Copied");
}

