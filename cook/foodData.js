/*
[Ingredient Properties]
name: override default name
type: inherits properties from specified ingredient
group: other(default), generic(hidden), dairy, mineral, carb, fruit, vegetable, meat, egg
shape: R74n Shapes file name, without .png
behavior: 0=default, 1=liquid, 2=powder
adj: adjective to describe ingredient in dish
hidden: true=hidden from ingredient list
color, r, g, b, h, s, l, rgb, hsl
*/

shapeMeta = {
    short: ["cylinder_short","pants_short","rectangle_thin_round","rectangle_thin","rectangle_thinner_round","rectangle_thinner","semicircle_top","semicircle_bottom"]
}

ingredients = {
liquid: {
    group:"generic",
    shape:"liquid",
    behavior:1
},
powder: {
    group:"generic",
    shape:"powder",
    behavior:2
},


water: {
    type:"liquid",
    color:"#bfd8df",
    adj:"soggy"
},
ketchup: {
    type:"liquid",
    color:"#ff2b2b",
    group:"vegetable",
    keywords: "catsup"
},
mayonnaise: {
    type:"liquid",
    color:"#f9f5e5",
    group:"egg",
    short:"mayo"
},
oil: {
    type:"liquid",
    color:"#e7df97",
},
milk: {
    type:"liquid",
    group: "dairy",
    color:"#f3f3ec",
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
},


salt: {
    type:"powder",
    group:"mineral",
    shape:"powder_rough",
    color:"#e3e3e3",
},
sugar: {
    type:"powder",
    group:"carb",
    color:"#f2f2f2",
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
    shape:"leaf"
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
    shape:"rectangle_thin_round"
},
top_bun: {
    type:"bun",
    shape:"semicircle_top",
    height:0.75
},


meat: {
    color:"#ff6e78",
    group:"meat",
    shape:"cutlet"
},
beef: {
    color:"#ff4d58",
    type:"meat"
},
beef_patty: {
    type:"beef",
    shape:"rectangle_thinner_round"
},
poultry: {
    color:"#ffdddf",
    type:"meat",
    shape:"poultry"
},
fish: {
    color:"#4edeff",
    type:"meat",
    shape:"fish"
},
crustacean: {
    color:"#f13851",
    type:"meat",
    shape:"crustacean"
},
cephalopod: {
    color:"#ffadd1",
    type:"meat",
    shape:"cephalopod"
},
}


dishRecipes = {

"pasta+cheese": "mac and cheese",
"mac and cheese+bread": "breaded mac",
"bun+beef+bun": "hamburger",
"hamburger+cheese": "cheeseburger",

}