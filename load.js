if (!String.prototype.replaceAll) {
	String.prototype.replaceAll = function(str, newStr){
		if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
			return this.replace(str, newStr);
		}
		return this.replace(new RegExp(str, 'g'), newStr);
	};
}


window.addEventListener("load",function(){

console.log("%c WELCOME TO R74n ","position: absolute; top: 50%; right: 50%; transform: translate(50%,-50%); font-family: Arial; font-size: 3em; font-weight: 700; color: #00ffff; text-shadow: 1px 1px 1px #14c9c9, 1px 2px 1px #14c9c9, 1px 3px 1px #14c9c9, 1px 4px 1px #14c9c9, 1px 5px 1px #14c9c9, 1px 13px 6px rgba(16,16,16,0.4), 1px 22px 10px rgba(16,16,16,0.2), 1px 25px 35px rgba(16,16,16,0.2), 1px 30px 60px rgba(16,16,16,0.4);padding:10px")



})
