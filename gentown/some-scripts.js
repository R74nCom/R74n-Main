// Try to generate word (Freezes tab if fail)
let tries = 0;
while (true) {
    tries ++;
    let word = generateWord(randRange(1,2));
    if (word === "teto") {
        console.log("Got word in "+tries+" tries");
        break;
    }
}


// Test blurb
for (let i = 0; i < 10; i++) {
    console.log(blurber("A [town person] dressed as [animal] fools onlookers."))
}