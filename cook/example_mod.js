// More info about enabling, testing, and submitting mods: https://R74ncom.github.io/InfiniteChef-Mods/

// Add a basic ingredient using the 'fruit' ingredient as a base
addIngredient("apple",{
    color:"#ff1f40", //red
    type:"fruit" //will inherit all properties of the 'fruit' ingredient
});

// Add a detailed ingredient with custom Shape and other properties
// All Shape IDs can be found here: https://R74n.com/shapes/
// A list of properties can be found at the top of: https://R74n.com/cook/foodData.js
addIngredient("finished_apple",{ //ID should be lowercase with underscores
    color:"#ff1f40", //red
    innerColor:"#ffeda4", //beige
    type:"apple", ///type can be any other ingredient
    shape:"fruit_bipod_stem"
});

// Add ingredient with reactions
addIngredient("water",{
    type:"liquid",
    color:"#bfd8df",
    reactions: {
        meat: { set1:"broth" },
        vegetable: { set1:"broth", tempMin:60 }
    }
});

// Change attributes of existing ingredients
editIngredient("apple",{
    color:"#06b000" //green
});

// Add a simple recipe
addRecipe("batter+sugar","cake");

// Add a recipe only in Stack Mode
addRecipe("&stack:batter+sugar","pancake");

// Add a recipe that can't have any other ingredients
addRecipe("=bread+bread","nothing sandwich");

// Add a recipe with an optional ingredient
addRecipe("cake+sprinkles?+chocolate","chocolate cake");

// Sort after adding recipes for improved name generation
sortRecipes();

// Add a simple tool to interact with ingredients
addTool("red_dyer", {
    func: function(placed) { placed.h = 0; },
    shape:"liquid"
})

// Add a tool with more properties
addTool("green_dyer", {
    func: function(placed) { placed.h = 44; },
    onSelect: function() { alert("Use on an ingredient to dye it green!"); },
    whileOn: function() { console.log("Dyer selected."); },
    onDeselect: function() { alert("Goodbye!"); },
    onMouseUp: function() { console.log("Stopped dragging."); },
    onClick: function(x,y) { console.log(x,y) },
    shape:"liquid",
    color:"#00b900", //green
    spin: true
})