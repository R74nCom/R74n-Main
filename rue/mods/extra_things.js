Rue.addRueData(
	{
		favorites: {
			
		},
		commands: {
			"happily say": function(args) {
				if (args.length === 0) { Rue.error("You didn't specify what I should say!"); return }
        Rue.happy(args.join(" ").replaceAll("\\n","\n").replaceAll("\\t","\t").replace(/&lt;\/?br&gt;/g,"\n"))
			},
			"sadly say": function(args) {
				if (args.length === 0) { Rue.error("You didn't specify what I should say!"); return }
        Rue.sad(args.join(" ").replaceAll("\\n","\n").replaceAll("\\t","\t").replace(/&lt;\/?br&gt;/g,"\n"))
			},
			"angrily say": function(args) {
				if (args.length === 0) { Rue.error("You didn't specify what I should say!"); return }
        Rue.angry(args.join(" ").replaceAll("\\n","\n").replaceAll("\\t","\t").replace(/&lt;\/?br&gt;/g,"\n"))
			},
			"lovely say": function(args) {
				if (args.length === 0) { Rue.error("You didn't specify what I should say!"); return }
        Rue.love(args.join(" ").replaceAll("\\n","\n").replaceAll("\\t","\t").replace(/&lt;\/?br&gt;/g,"\n"))
			},
			"flushly say": function(args) {
				if (args.length === 0) { Rue.error("You didn't specify what I should say!"); return }
        Rue.flushed(args.join(" ").replaceAll("\\n","\n").replaceAll("\\t","\t").replace(/&lt;\/?br&gt;/g,"\n"))
			},
			"anxiously say": function(args) {
				if (args.length === 0) { Rue.error("You didn't specify what I should say!"); return }
        Rue.anxious(args.join(" ").replaceAll("\\n","\n").replaceAll("\\t","\t").replace(/&lt;\/?br&gt;/g,"\n"))
			},
			"officially say": function(args) {
				if (args.length === 0) { Rue.error("You didn't specify what I should say!"); return }
        Rue.official(args.join(" ").replaceAll("\\n","\n").replaceAll("\\t","\t").replace(/&lt;\/?br&gt;/g,"\n"))
			},
			"take on glasses": function() {
        document.body.style.filter = "";
      },
      "/i (do) have( photosensitive)? epilepsy/": function() {
        Rue.setUser("noEpilepsy", false);
        
    },
      "throw": function(args) {
        if (args.length === 0) { Rue.error("You didn't specify what I should throw!"); return }
        Rue.error(args.join(" ").replaceAll("\\n","\n").replaceAll("\\t","\t").replace(/&lt;\/?br&gt;/g,"\n"))
        
      },
      
		},
		responses: {
			
		}
	}
);
