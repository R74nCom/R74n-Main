SPA.data = {}

userActions = {
  "rename": {
    templates: [
      ["en", "your name is [word]"],
      ["en", "ur is [word]"],
      ["en", "you are named [word]"],
      ["en", "ur named [word]"],
      ["en", "youre named [word]"],
      ["en", "you're named [word]"],
      ["en", "[word] is your name"],
      ["en", "[word] is ur name"],
      ["en", "i will name you [word]"],
      ["en", "i'll name you [word]"],
    ],
    func: (args) => {
      protocog.name = args.word;

      let word = vocab(args.word.toLowerCase());
      word.def = "your name";
      statAdd("definitions", 1);
    }
  },
  "define": {
    templates: [
      ["en", "[word] is [def]"],
      ["en", "[word] are [def]"],
      ["en", "[word] means [def]"],
      ["en", "[word] = [def]"],
      ["en", "[word] will be [def]"]
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

pronounSwaps = {
  "en": [
    ["are you","am i"],
    ["you are","i am"],
    ["u are","i am"],
    ["are u","am i"],
    ["to you","to me"],
    ["for you","to me"],
    ["with you","with me"],
    ["to u","to me"],
    ["for u","to me"],
    ["with u","with me"],
    ["you$","me$"],
    ["you","i"],
    ["you","me"],
    ["your","my"],
    ["yours","mine"],
    ["you're","i'm"],
    ["youre","im"],
    ["yourself","myself"],
    ["u","me"],
    ["ur","my"],
    ["ure","im"],
    ["u're","i'm"],
    ["yuo","me"],
    ["urself","myself"],
  ]
}
pronounSwaps_all = []
for (let lang in pronounSwaps) {
  pronounSwaps_all = pronounSwaps_all.concat(pronounSwaps[lang]);
}