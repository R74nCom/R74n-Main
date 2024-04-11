/*
[Ingredient Properties]
name: override default name
type: inherits properties from specified ingredient
group: other(default), generic(hidden), dairy, mineral, carb, fruit, vegetable, meat, protein_other, protein_plant
shape: R74n Shapes file name, without .png
placedShape: Shape used instead when placed
behavior: 0=default, 1=liquid, 2=powder, 3=gas
adj: adjective to describe ingredient in dish
dishName: name used in dish name (null=skip)
hidden: true=hidden from ingredient list
keywords: extra text to check when searching
short: short name for ingredient
dissolve: true=hides in liquid
delete: true=hides when dropped
height: hitbox height multiplier (e.g. 0.5 will halve it)
scale: overall size multiplier
dropInto: ingredient to change into when fallen
dropIntoV: vertical velocity required to change into dropInto
broken: ingredient to change into when broken (unused)
boilPoint: temperature to boil at, in celsius
boilInto: ingredient to change into when boiled (default 'gas')
meltPoint: temperature to melt at, in celsius
meltInto: ingredient to change into when melted (optional)
freezePoint: temperature to freeze at, in celsius
freezeInto: ingredient to change into when frozen (required)
pin: when true, show when search is empty
color: #hex or array of #hex
a: opacity from 0-1
h, s, l, r, g, b, rgb, hsl
r: initial rotation when placed, in degrees
cookColor: color of maximum cookedness (#hex), cannot be cooked otherwise
glow: color to glow when placed
*/

// opinion, size, age, shape, colour, origin, material, purpose
// sweet salty spicy red cheesy chocolate ranch apple lettuce peanut beef soup
//  -80   -75   -70  -60   -55     -52     -50   -40    -30    -20   -10  +100
// sugar salt  spice dye dairy  chocolate drsng fruit vegetbl nt/leg meat dish

shapeMeta = {
    short: ["cylinder_short","pants_short","rectangle_thin_round","rectangle_thin","rectangle_thinner_round","rectangle_thinner","semicircle_top","semicircle_bottom","bean","blob_short"]
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
gas: {
    group:"generic",
    shape:"gas",
    a: 0.25,
    behavior:3,
    dishName:null
},


steam: {
    type:"gas",
    color:"#bfd8df"
},
water: {
    type:"liquid",
    color:"#bfd8df",
    adj:"soggy",
    pin:true,
    boilPoint:100,
    boilInto:"steam",
    freezePoint:0,
    freezeInto:"ice_cube",
    keywords:"liquid wet h2o h20"
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
    dishName:"ice",
    meltPoint:30,
    meltInto:"water",
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
    keywords:"catsup"
},
mustard: {
    type:"sauce",
    color:"#FFDB58",
    group:"vegetable"
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
    pin:true
},
milk: {
    type:"liquid",
    group:"dairy",
    color:"#f3f3ec",
    keywords:"dairy",
    dishWeight:-55,
    reactions: {
        chocolate: { set1:"chocolate_milk", set2:null }
    }
},
chocolate_milk: {
    type:"milk",
    color:"#946132",
},
yogurt: {
    group:"dairy",
    shape:"clumps",
    color:"#f3f3ec",
    dishWeight:-55
},
fat: {
    group:"meat",
    shape:"scoop",
    color:"#f3f3ec",
    meltPoint:40
},
butter: {
    type:"fat",
    group:"dairy",
    shape:"scoop",
    color:"#ffff80",
    adj:"buttered",
    dishWeight:-55,
    meltPoint:35
},
ice_cream: {
    group:"dairy",
    shape:"scoop",
    color:"#fffdf4",
    keywords:"sundae",
    dishWeight:90,
    meltPoint:30,
},


salt: {
    type:"powder",
    group:"mineral",
    shape:"powder_rough",
    color:"#e3e3e3",
    dissolve:true,
    adj:"salted",
    dishWeight:-75,
    pin:true
},
sugar: {
    type:"powder",
    group:"carb",
    color:"#f2f2f2",
    dissolve:true,
    adj:"sweet",
    dishWeight:-80,
    pin:true,
    meltPoint:186,
    meltInto:"syrup"
},
syrup: {
    type:"thick_liquid",
    group:"carb",
    color:"#ffc973",
    dissolve:true,
    adj:"sweet",
    dishWeight:-80,
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
black_pepper: {
    type:"spice",
    color:"#231e1d",
    keywords:"peppercorn",
    dishName:"pepper",
    adj:"pepper",
    pin:true
},
chocolate: {
    color:"#924b00",
    shape:"rectangle",
    dishWeight:-52,
    meltPoint:45
},
flour: {
    type:"powder",
    reactions: {
        yolk: { set1:"batter", set2:null },
        water: { set1:"dough", set2:null },
    },
    group:"carb",
    shape:"powder_rough",
    color:"#f4efe5",
    pin:true
},


egg: {
    shape:"ovoid",
    color:"#F0EAD6",
    group:"protein_other",
    dropInto:"yolk",
    dropIntoV:10,
    broken:"egg",
    pin:true
},
yolk: {
    name:"egg yolk",
    shape:"splat_yolk",
    placedShape:"splat_yolk",
    type:"thick_liquid",
    color:"#ffd95b",
    cookColor:"#fff6d9",
    group:"protein_other",
    dishName:"egg",
    short:"yolk",
    dissolve:true
},
batter: {
    color:"#ead295",
    type:"liquid",
    group:"carb",
},
dough: {
    color:"#f4e8d7",
    type:"liquid",
    group:"carb",
    shape:"blob_short"
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
    dishWeight:-55,
    broken:"cheese_powder",
    meltPoint:60,
},
cheese_powder: {
    type:"cheese",
    behavior:2,
    shape:"powder_rough",
},
blue_cheese: {
    color:"#dbdca9",
    type:"cheese"
},
provolone: {
    color:"#ffe291",
    type:"cheese"
},


plant: {
    color:"#30e230",
    cookColor:"#d5a010",
    group:"fruit",
    shape:"sprout",
    hidden:true,
    dishWeight:-35
},
fruit: {
    color:"#d3a637",
    cookColor:"#c24f08",
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
mushroom: {
    color:"#d8b377",
    type:"vegetable",
    shape:"fungus",
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
    hidden:true,
    scale:0.75
},
legume: {
    color:"#d3ce71",
    type:"vegetable",
    shape:"bean",
    group:"protein_plant",
    hidden:true,
    dishWeight:-20
},
peanut: {
    color:"#dcac7c",
    type:"legume",
    shape:"peanut",
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
wheat: {
    type:"cereal_plant",
    dropInto:"flour",
    keywords:"grain cereal plant grass"
},
apple: {
    color:["#ff1f40","#ffd20c","#5ad700"],
    type:"fruit",
    shape:"fruit_bipod_stem"
},
watermelon: {
    color:["#38b91c","#1c5c0e"],
    innerColor:"#ff6666",
    scale:1.5,
    type:"fruit",
    shape:"oval_thick",
    short:"melon"
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
garlic: {
    color:"#f2e9d2",
    type:"root_vegetable",
    shape:"fruit_extrude",
    broken:"garlic_powder"
},
garlic_powder: {
    color:"#f2e9d2",
    type:"spice",
    adj:"garlic",
    parts:["garlic"],
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
rice: {
    color:"#d2cdad",
    group:"carb",
    shape:"beans_some",
    type:"powder",
    pin:true
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
    cookColor:"#a5700d",
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
    cookColor:"#5b2a20",
    group:"meat",
    shape:"cutlet",
    hidden:true,
    reactions: {
        water: { "set2":"broth" }
    },
    dishWeight:-10,
    broken:"ground_meat"
},
ground_meat: {
    type:"meat",
    shape:"powder_rough",
    behavior:2,
},
beef: {
    color:"#ff4d58",
    type:"meat",
    keywords:"meat steak",
    pin:true
},
beef_patty: {
    type:"beef",
    shape:"rectangle_thinner_round"
},
poultry: {
    color:"#ffdddf",
    cookColor:"#df9e6d",
    type:"meat",
    shape:"poultry",
    keywords:"bird"
},
chicken: {
    type:"poultry",
},
fish: {
    color:"#4edeff",
    cookColor:"#d0891f",
    type:"meat",
    shape:"fish",
    keywords:"seafood pescetarian"
},
crustacean: {
    color:"#f13851",
    cookColor:"#ff6523",
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
    cookColor:"#ffe2ce",
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


boulder: {
    shape:"dodecahedron",
    scale:3,
    adj:"crunchy",
    hidden:true
},



}


dishRecipes = {

"pasta+cheese":"mac and cheese",
"mac and cheese+bread":"breaded mac",
"bun+beef+bun":"hamburger",
"hamburger+cheese":"cheeseburger",
"flour+yolk+sugar":"cake",
"flour+water+yeast?":"bread",
"flour+flour+flour+fat+fat+water":"pie",
"flour+flour+liquid+liquid+yolk+fat":"bread",
"flour+liquid+yolk+fat":"bread",
"flour+butter+sugar+yolk":"pound cake",
"flour+flour+flour+liquid+liquid+fat":"biscuit",
"flour+liquid+fat":"biscuit",
"flour+flour+liquid+yolk+fat":"muffin",

}