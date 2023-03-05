var elements = document.getElementsByClassName("wordlist");
allwords = [];
for (var n in elements) {
    var element = elements[n]

    var content = element.innerHTML;
    if (content==undefined) {continue}
    var lines = content.split("\n");
    var newlines = [];
    for (var i in lines) {
        var line = lines[i];
        if (line.includes(" - ")) {
            var components = line.split(' - ');
            var word = components.shift();
            var wordtxts = [];
            var splitword = word.split(", ");
            for (var n in splitword) {
                var word2 = splitword[n];
                if (!(allwords.includes(word2))) {allwords.push(word2)}
                wordtxts.push('<span class="wordtxt" id="'+word2+'">'+word2+'</span>')
            }
            var wordtxt = wordtxts.join('<span class="wordcom">, </span>');
            var defin = components.join(' - ');
            newlines.push('<span class="wordline">'+wordtxt+'<span class="wordsep"> - </span><span class="worddef">'+defin+'</span></span>')
        }
        else {newlines.push(line)}
        
    }
    element.innerHTML = newlines.join("\n")

}

function randomChoice(l) {
    return l[Math.floor(Math.random() * l.length)];
  }

var InputsDiv = document.getElementById("InputsDiv");
InputsDiv.style.paddingBottom = "20px";
InputsDiv.innerHTML = "<form onsubmit='search();return false' style='padding-bottom:20px;'> \
<input type='text' placeholder='Search...' id='SearchBox' list='AllWordsDatalist'> \
<datalist id='AllWordsDatalist'></datalist>\
<input id='SearchButton' type='submit' value='Search'> \
</form> \
<span id='NoResults' style='display:none;padding-bottom:20px;'>No results found. If this term should be here, let me know!</span>\
<input id='LuckyButton' type='button' value='I‘m Feeling Lucky' onclick='var word=randomChoice(allwords);location.hash=word;''> \
"+InputsDiv.innerHTML;
var AllWordsDataList = document.getElementById("AllWordsDatalist");
allwords.sort(function (a, b) {
    return a.replaceAll(/[\-_\/\.,'"]|an? /g,"").toLowerCase().localeCompare(b.replaceAll(/[\-_\/\.,'"]|an? /g,"").toLowerCase());
});
var temphtml = "";
for (var i in allwords) {
    var tempword = allwords[i];
    temphtml += "<option value='"+tempword.replaceAll("'","&apos;")+"'>"
}
AllWordsDataList.innerHTML = temphtml;
document.getElementsByTagName("html")[0].style.scrollBehavior="smooth";

function search() {
    var SearchBox = document.getElementById("SearchBox");
    var NoResults = document.getElementById("NoResults");
    var word = SearchBox.value.toLowerCase();
    var wordsimple = word.replaceAll(" ","");
    for (var i in allwords) {
        var wordtemp = allwords[i];
        if (wordtemp.toLowerCase().replaceAll(" ","")==wordsimple){
            word = wordtemp;
            break
        }
    }
    if (allwords.includes(word)) {
        SearchBox.blur();
        NoResults.style.display = "none";
        location.hash = word;
    }
    else {
        NoResults.style.display = "block";
    }
    SearchBox.value = "";
    
    console.log(word)
}

function highlightHash() {
    var word = decodeURIComponent(location.hash.split("#")[1]);
    if (allwords.includes(word)) {
      var wordel=document.getElementById(word);wordel.style.backgroundColor='yellow';wordel.style.color='black';wordel.style.padding='5px';wordel.style.borderRadius='20px';
      setTimeout(function () {
        wordel.style.transition="3s";
        wordel.style.backgroundColor = "rgb(0,0,0,0.0)";
        wordel.style.removeProperty("color");
        wordel.style.removeProperty("padding");
      }, 3000);
    }
  }
  window.addEventListener("hashchange", highlightHash, false);
  window.onload = function(){location.hash=location.hash;highlightHash()}