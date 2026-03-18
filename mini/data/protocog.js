SPA.data = {}

userActions = {
  "define": {
    templates: [
      ["en", "[word] is [def]"],
      ["en", "[word] are [def]"],
      ["en", "[word] means [def]"]
    ],
    func: (args) => {
      console.log(`${args.word} = ${args.def}`);
      args.word = args.word.replace(/^(an?|the) /g, "");
      args.def = args.def.replace(/^(an?|the) /g, "");

      let word = vocab(args.word);
      word.def = args.def;
      statAdd("definitions", 1);
    }
  }
};

questionWords = {
  "en": ["what", "why", "how", "are", "when", "who", "is", "will", "where", "were", "do"]
}
questionWords_all = [];
for (let key in questionWords) {
  questionWords_all = questionWords_all.concat(questionWords[key]);
}

protocogQuestions = {
  "define": {
    templates: [
      ["en", "what is [uncommon]"],
      ["en", "what does [uncommon] mean"],
      ["en", "who is [uncommon]"],
    ]
  },
  "camera": {
    templates: [
      ["en", "can i see you"]
    ],
    check: () => !protocog.askedCamera,
    func: () => {
      navigator.getUserMedia (
        // constraints
        {
          video: true
        },

        // successCallback
        function(localMediaStream) {
          respondIfPossible("[you|u] [look|appear|see|seem|are|r] [good|great|awesome|nice|like]");
          protocog.askedCamera = true;
        },

        // errorCallback
        function(err) {
          if(err === PERMISSION_DENIED) {
            logMessage(":(", {class:"other"});
          }
        }
      );
    }
  }
}

wordTemplates = {
  "uncommon": () => {
    let uses = {};
    for (let word in brain.vocabIndex) {
      if (!word.startsWith("[")) uses[brain.vocabIndex[word]] = 0;
    }
    for (let key in brain.b1) {
      key.split(",").forEach(word => {
        uses[word] = (uses[word]||0) + 1;
      })
      Object.keys(brain.b1[key]).forEach(word => {
        uses[word] = (uses[word]||0) + 1;
      })
    }

    return choose(Object.keys(uses).map(id => parseInt(id)).filter(id => !vocab(id).def && !vocab(id).t.startsWith("[")).sort((a,b) => uses[a] - uses[b]).slice(0,10).map(id => vocab(id).t));
  }
}