function startViewer() {
  ViewerDiv = document.getElementById("ViewerDiv");
  if (params.has("url")) {
    var url = params.get("url");
    
    if (url.includes("youtube.com/watch")||url.includes("youtu.be/")) {
      changeParam("yt",url.replace(".be/","v=").split("v=")[1].split("?")[0].split("&")[0])
      changeParam("url","")
    }
    else if (url.includes("tenor.com/")) {
      mode = "tenor"
      var gifid = url.split("-")[url.split("-").length-1].split("/")[0];
      var gifname = url.split("view/")[1].split("/")[0];
      ViewerDiv.innerHTML = '<div class="tenor-gif-embed" data-postid="'+gifid+'" data-share-method="host" data-width="100%" data-aspect-ratio="1.0"><a href="https://tenor.com/view/'+gifname+'"></a></div>';
      var newscript = scriptSrc("https://tenor.com/embed.js");
      console.log(gifname)
    }
    else if (url.includes("twitter.com/")) { //supports tweets, profiles, timelines, likes, moments
      if (url.includes("/moments/")) {ViewerDiv.innerHTML = '<a class="twitter-moment" data-dnt="true" data-theme="dark" href="'+url+'"></a>'}
      else if (url.includes("/status/")) {ViewerDiv.innerHTML = '<blockquote class="twitter-tweet" data-dnt="true" data-theme="dark"><p lang="en" dir="ltr"><a href="'+url+'"></a></blockquote>'}
      else {ViewerDiv.innerHTML = '<a class="twitter-timeline" data-dnt="true" data-theme="dark" href="'+url+'"></a>'}
      var newscript = scriptSrc("https://platform.twitter.com/widgets.js",async=true,charset="utf-8");
    }
    else if (url.includes("instagram.com/")) { //supports posts
      ViewerDiv.innerHTML = '<blockquote style="width:100%" class="instagram-media" data-instgrm-permalink="'+url+'" data-instgrm-version="12"></blockquote>';
      var newscript = scriptSrc("https://www.instagram.com/embed.js",async=true)
    }
    else {
      ImageExts = ["png","jpg","jpeg","tiff","tif","gif","apng","bmp","webp","heif","svg"];
      VideoExts = ["mp4","webm","ogg"];
      AudioExts = ["mp3","mpeg","ogg","wav"];
      var ext = url.split(".")[url.split(".").length-1].toLowerCase();
      console.log(ext);
      if (ImageExts.includes(ext)) {
        var newelement = document.createElement("img");
        newelement.setAttribute("src",url)
      }
      else if (VideoExts.includes(ext)) {
        var newelement = document.createElement("video");
        newelement.setAttribute("controls",true);
        newelement.setAttribute("autoplay",true);
        if (params.has("loop")) {
          if (params.get("loop")==1){newelement.setAttribute("loop",params.get("loop"));}}
        var sourceelement = document.createElement("source");
        newelement.innerHTML = "Video tag not supported in your browser.";
        sourceelement.setAttribute("src",url);
        sourceelement.setAttribute("type","audio/"+ext)
        newelement.appendChild(sourceelement);
      }
      else if (AudioExts.includes(ext)) {
        var newelement = document.createElement("audio");
        newelement.setAttribute("controls",true);
        newelement.setAttribute("autoplay",true);
        if (params.has("loop")) {
          if (params.get("loop")==1){newelement.setAttribute("loop",params.get("loop"));}}
        var sourceelement = document.createElement("source");
        newelement.innerHTML = "Audio tag not supported in your browser.";
        sourceelement.setAttribute("src",url);
        if (ext=="mp3") {sourceelement.setAttribute("type","audio/mpeg")}
        else {sourceelement.setAttribute("type","audio/"+ext)}
        newelement.appendChild(sourceelement);
      }
    }

  }
  if (params.has("yt")) {
    console.log("a");
    var newelement = document.createElement("iframe");
    var videoid = params.get("yt");
    mode = "youtube";
    var videourl = "https://www.youtube.com/embed/"+videoid+"?modestbranding=1&";
    if (params.has("cc")) {
      videourl += "&cc_load_policy="+params.get("cc")+"&cc_lang_pref=en"
    }
    if (params.has("loop")) {
      if (params.get("loop")==1){videourl += "&loop=1&playlist="+videoid}
    }
    if (params.has("start")) {videourl += "&start="+params.get("start")}
    if (params.has("end")) {videourl += "&end="+params.get("end")}
    newelement.setAttribute("src",videourl);
    newelement.setAttribute("height",String(document.documentElement.scrollHeight-85))
    newelement.setAttribute("allowfullscreen",1)
  }

  if (!(newscript==undefined)) {
    document.head.appendChild(newscript);
  }
  if (!(newelement==undefined)) {
    newelement.setAttribute("class","MediaViewer");
    ViewerDiv.appendChild(newelement);
  }

}