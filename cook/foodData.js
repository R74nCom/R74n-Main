/*
[Ingredient Properties]
name: override default name
type: inherits properties from specified ingredient
group: other(default), generic(hidden), dairy, mineral, carb, fruit, vegetable, meat, protein_other, protein_plant
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

// opinion, size, age, shape, colour, origin, material, purpose
// sweet salty spicy red cheesy chocolate ranch apple lettuce peanut beef soup
//  -80   -75   -70  -60   -55     -52     -50   -40    -30    -20   -10  +100
// sugar salt  spice dye dairy  chocolate drsng fruit vegetbl nt/leg meat dish

shapeMeta = {
    short: ["cylinder_short","pants_short","rectangle_thin_round","rectangle_thin","rectangle_thinner_round","rectangle_thinner","semicircle_top","semicircle_bottom","bean"]
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
sauce: {
    type:"thick_liquid",
    color:"#8b1b1b",
    hidden:true,
    dishWeight:-50
},
dressing: {
    type:"thick_liquid",
    color:"#8b4f1b",
    hidden:true,
    dishWeight:-50
},
ketchup: {
    type:"sauce",
    color:"#ff2b2b",
    group:"vegetable",
    keywords: "catsup"
},
mayonnaise: {
    type:"sauce",
    color:"#f9f5e5",
    group:"protein_other",
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
    keywords:"dairy",
    dishWeight:-55
},
yogurt: {
    group: "dairy",
    shape: "clumps",
    color:"#f3f3ec",
    dishWeight:-55
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
    adj:"buttered",
    dishWeight:-55
},
ice_cream: {
    group: "dairy",
    shape: "scoop",
    color:"#fffdf4",
    keywords:"sundae",
    dishWeight:90
},


salt: {
    type:"powder",
    group:"mineral",
    shape:"powder_rough",
    color:"#e3e3e3",
    dissolve:true,
    adj:"salted",
    dishWeight:-75
},
sugar: {
    type:"powder",
    group:"carb",
    color:"#f2f2f2",
    dissolve:true,
    adj:"sweet",
    dishWeight:-80
},
spice: {
    type:"powder",
    group:"protein_plant",
    color:"#923323",
    dissolve:true,
    adj:"spiced",
    shape:"powder_rough",
    hidden:true,
    dishWeight:-70
},
chocolate: {
    color:"#924b00",
    shape:"rectangle",
    dishWeight:-52
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
    group:"protein_other"
},
easter_egg: {
    type:"egg",
    color:["#ffaaaa","#ffddaa","#aaffaa","#aaffff","#aaaaff","#ffaaff"],
},
cheese: {
    color:"#fec118",
    group:"dairy",
    shape:"wedge",
    adj:"cheesy",
    dishWeight:-55
},
blue_cheese: {
    color:"#dbdca9",
    type: "cheese"
},
provolone: {
    color:"#ffe291",
    type: "cheese"
},


plant: {
    color:"#30e230",
    group:"fruit",
    shape:"sprout",
    hidden:true,
    dishWeight:-35
},
fruit: {
    color:"#d3a637",
    type:"plant",
    group:"fruit",
    shape:"fruit",
    hidden:true,
    dishWeight:-40
},
vegetable: {
    color:"#41d841",
    type:"plant",
    group:"vegetable",
    shape:"leaf_vegetable",
    hidden:true,
    dishWeight:-30
},
seed: {
    color:"#bcff82",
    type:"vegetable",
    group:"protein_plant",
    shape:"beans_some",
    behavior:2,
    hidden:true
},
bean: {
    color:"#944e29",
    type:"seed",
    shape:"bean",
    behavior:0,
    hidden:true
},
legume: {
    color:"#d3ce71",
    type:"vegetable",
    shape:"bean",
    group:"protein_plant",
    hidden:true,
    dishWeight:-20
},
nut: {
    color:"#a0220e",
    type:"fruit",
    shape:"fruit_nub",
    group:"protein_plant",
    hidden:true,
    dishWeight:-20
},
cereal_plant: {
    color:"#e7bb42",
    type:"plant",
    group:"grain",
    hidden:true
},
apple: {
    color:["#ff1f40","#ffd20c","#5ad700"],
    type:"fruit",
    shape:"fruit_bipod_stem"
},
leaf_vegetable: {
    color:"#41d841",
    type:"vegetable",
    shape:"leaf_vegetable",
    hidden:true
},
root_vegetable: {
    color:"#CC8D57",
    type:"vegetable",
    shape:"rod_rough",
    hidden:true
},
carrot: {
    color:"#ED9121",
    type:"root_vegetable",
    shape:"needle"
},
herb: {
    color:"#35b135",
    type:"vegetable",
    shape:"leaf",
    adj:"herbal",
    hidden:true
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
    dishWeight:-10
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
    dishWeight:-60,
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