/*R74n Observer
  Don't worry, I'm harmless!*/
if (document.referrer && document.referrer.indexOf("r74n.") === -1) {
	const refdomain = document.referrer.replace(/^https?:\/\//g, "").replace(/\/$/g, "");
    document.cookie = "R74nRef="+document.referrer+";max-age=86400;path=/;domain=r74n.com";
}