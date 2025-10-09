// Random Event
Mod.event("townTest", {
    random: true,
    subject: {
        reg: "player", id: 1
    },
    target: {
        reg: "town", random: true
    },
    value: {
      random: [ "happy", "sad" ]
    },

    // Other examples:

    // value: (subject, target) => {
    //     return colorChange(target.color);
    // },
    // check: (subject, target) => {
    //   return planet.day % 5 === 0;
    // },
    // func: (subject, target, args) => {
    //     return happen("Recolor", subject, target, args);
    // },
    // funcNo: (subject, target, args) => {},

    message: (subject, target, args) => `Should residents of {{regname:town|${target.id}}} be ${args.value}?`,
    messageDone: (subject, target, args) => `{{regname:town|${target.id}}} are ${args.value}.`,
    messageNo: (subject, target, args) => `{{regname:town|${target.id}}} are not ${args.value}.`,
    weight: $c.COMMON,

    // influences: {
    //     "happy": 0.5
    // }
})

// Daily Event
Mod.event("townKill", {
    daily: true,
    target: { reg: "town", all: true },
    func: (subject, target, args) => {
        // Kills 10 people in every town each day.
        happen("Death", subject, target, { count: 10 });
    }
})