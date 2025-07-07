// This module is for infernity.dev stuff!! :D 
Rue.addRueData({
    links: {
        "5b": "https://whirling.infernity.dev/HTML5b/",
        "html5b": "https://whirling.infernity.dev/HTML5b/",
        "infernologin": "https://login.infernity.dev/",
        "inferno login": "https://login.infernity.dev/",
        "infernity": "https://www.infernity.dev/",
        "infernity.dev": "https://www.infernity.dev/",
        "whirl": "https://whirling.infernity.dev/",
        "whirling": "https://whirling.infernity.dev/",
        "digi": "https://digi.infernity.dev/",
        "digin": "https://digi.infernity.dev/",
    },
    commands: {
        "(join )?mpmap": function(args) {
            if (args.length == 0) {
                Rue.openLink("https://mpmap.infernity.dev/app/")
                return
            }
            // Since there were arguments provided, use the last arg as index 
            Rue.openLink("https://mpmap.infernity.dev/app/?r=" + args[args.length - 1])
        }
    }
});