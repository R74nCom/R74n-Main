window.addEventListener("load",function(){
var elements = document.getElementsByClassName("cw");
for (var i = 0; i < elements.length; i++) {
    var element = elements.item(i);
    var warning = element.getAttribute("value");
    var content = element.innerHTML;
    if (element.getAttribute("open")==null) {element.setAttribute("open","false")}
    if (element.getAttribute("open")=="false") {
        element.setAttribute("onclick","this.innerHTML=`"+content.replace('"','\\"')+"`;this.setAttribute('open','true');this.removeAttribute('onclick')")
        element.innerHTML = warning;
    }
    //console.log(elements.item(i).getAttribute("open"));
}
})