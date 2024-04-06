/*
[Ingredient Properties]
name: override default name
type: inherits properties from specified ingredient
group: other(default), generic(hidden), dairy, mineral, carb, fruit, vegetable, meat, egg
shape: R74n Shapes file name, without .png
placedShape: Shape used instead when placed
behavior: 0=default, 1=liquid, 2=powder
adj: adjective to describe ingredient in dish
hidden: true=hidden from ingredient list
keywords: extra text to check when searching
short: short name for ingredient
dissolve: true=hides in liquid
delete: true=hides when dropped
height: hitbox height multiplier (e.g. 0.5 will halve it)
color: #hex or array of #hex
a: opacity from 0-1
h, s, l, r, g, b, rgb, hsl
*/

shapeMeta = {
    short: ["cylinder_short","pants_short","rectangle_thin_round","rectangle_thin","rectangle_thinner_round","rectangle_thinner","semicircle_top","semicircle_bottom"]
}

ingredients = {
liquid: {
    group:"generic",
    shape:"liquid",
    placedShape:"droplets_some",
    behavior:1
},
thick_liquid: {
    type:"liquid",
    group:"generic",
    shape:"liquid",
    placedShape:"droplets_some",
    behavior:2
},
powder: {
    group:"generic",
    shape:"powder",
    placedShape:"squares_some",
    behavior:2
},


water: {
    type:"liquid",
    color:"#bfd8df",
    adj:"soggy"
},
broth: {
    type:"liquid",
    color:"#dbcda6",
    dishName:"soup",
    dishWeight:1000
},
ice_cube: {
    color:"#b4efff",
    a:0.75,
    shape:"cube",
    adj:"iced",
    dishName:"ice"
},
ketchup: {
    type:"thick_liquid",
    color:"#ff2b2b",
    group:"vegetable",
    keywords: "catsup"
},
mayonnaise: {
    type:"thick_liquid",
    color:"#f9f5e5",
    group:"egg",
    short:"mayo"
},
oil: {
    type:"liquid",
    color:"#e7df97",
    a: 0.66
},
milk: {
    type:"liquid",
    group: "dairy",
    color:"#f3f3ec",
    keywords:"dairy"
},
yogurt: {
    group: "dairy",
    shape: "clumps",
    color:"#f3f3ec",
},
fat: {
    group: "meat",
    shape: "scoop",
    color:"#f3f3ec",
},
butter: {
    group: "dairy",
    shape: "scoop",
    color:"#ffff80",
},
ice_cream: {
    group: "dairy",
    shape: "scoop",
    color:"#fffdf4",
    keywords:"sundae"
},


salt: {
    type:"powder",
    group:"mineral",
    shape:"powder_rough",
    color:"#e3e3e3",
    dissolve:true,
    adj:"salted"
},
sugar: {
    type:"powder",
    group:"carb",
    color:"#f2f2f2",
    dissolve:true,
    adj:"sweet"
},
flour: {
    type:"powder",
    group:"carb",
    shape:"powder_rough",
    color:"#f4efe5",
},


egg: {
    shape:"ovoid",
    color:"#F0EAD6",
    group:"egg"
},
easter_egg: {
    shape:"ovoid",
    color:["#ffaaaa","#ffddaa","#aaffaa","#aaffff","#aaaaff","#ffaaff"],
    group:"egg"
},
cheese: {
    color:"#fec118",
    group:"dairy",
    shape:"wedge",
    adj:"cheesy"
},
blue_cheese: {
    color:"#dbdca9",
    type: "cheese"
},
provolone: {
    color:"#ffe291",
    type: "cheese"
},


apple: {
    color:["#ff1f40","#ffd20c","#5ad700"],
    group:"fruit",
    shape:"fruit_bipod_stem"
},
leaf_vegetable: {
    color:"#41d841",
    group:"vegetable",
    shape:"leaf_vegetable"
},
herb: {
    color:"#35b135",
    group:"vegetable",
    shape:"leaf",
    adj:"herbal"
},


pasta: {
    color:"#d2cdad",
    group:"carb",
    shape:"semitorus_thick_left"
},
noodles: {
    type:"pasta",
    shape:"noodles"
},
macaroni: {
    color:"#d2cdad",
    type:"pasta",
    shape:"semitorus_thick_left",
    short:"mac"
},
bread: {
    color:"#ddc69c",
    group:"carb",
    shape:"loaf"
},
bun: {
    type:"bread",
    shape:"rectangle_round"
},
bottom_bun: {
    type:"bun",
    shape:"rectangle_thin_round",
    dishName:"bun"
},
top_bun: {
    type:"bun",
    shape:"semicircle_top",
    height:0.75,
    dishName:"bun"
},


meat: {
    color:"#ff6e78",
    group:"meat",
    shape:"cutlet",
    hidden:true,
    reactions: {
        water: { "set2":"broth" }
    },
},
beef: {
    color:"#ff4d58",
    type:"meat",
    keywords:"meat steak"
},
beef_patty: {
    type:"beef",
    shape:"rectangle_thinner_round"
},
poultry: {
    color:"#ffdddf",
    type:"meat",
    shape:"poultry",
    keywords:"bird"
},
fish: {
    color:"#4edeff",
    type:"meat",
    shape:"fish",
    keywords:"seafood pescetarian"
},
crustacean: {
    color:"#f13851",
    type:"meat",
    shape:"crustacean",
    hidden:true
},
crab: {
    type:"crustacean",
    keywords:"crustacean seafood"
},
cephalopod: {
    color:"#ffadd1",
    type:"meat",
    shape:"cephalopod",
    hidden:true
},
squid: {
    type:"cephalopod",
    keywords:"cephalopod seafood"
},


dye: {
    color:["#ff0000","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"],
    type:"powder",
    hidden:true,
    stain:true,
    adj:"dyed",
    shape:"powder_rough",
    dishWeight:-1000,
    delete:true
},
red_dye: {
    color:"#ff0000",
    type:"dye",
    stain:true,
    adj:"red"
},



}


dishRecipes = {

"pasta+cheese": "mac and cheese",
"mac and cheese+bread": "breaded mac",
"bun+beef+bun": "hamburger",
"hamburger+cheese": "cheeseburger",
"meat+water": "broth",

}