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
width: hitbox width multiplier (e.g. 0.5 will halve it)
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
innerColor: color of the inside of the ingredient (unused)
glow: color to glow when placed
*/

// opinion, size, age, shape, colour, origin, material, purpose
// sweet salty spicy red cheesy chocolate ranch apple lettuce peanut beef soup
//  -80   -75   -70  -60   -55     -52     -50   -40    -30    -20   -10  +100
// sugar salt  spice dye dairy  chocolate drsng fruit vegetbl nt/leg meat dish

shapeMeta = {
    short: ["cylinder_short","pants_short","rectangle_thin_round","rectangle_thin","rectangle_thinner_round","rectangle_thinner","semicircle_top","semicircle_bottom","bean","blob_short","oval_horizontal","circle_ms","circle_s","helix_strand","rod_rough_thin","rod_thin","rod_thin_splits","rod_flared","needle"]
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
    landedShape:"liquid_splat",
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
utensil: {
    group:"generic",
    shape:"fork",
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
    keywords:"liquid,wet,h2o,h20"
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
tomato_sauce: {
    type:"sauce",
    behavior:1,
    color:"#a42626",
    reactions: {
        "sugar": { set1:"ketchup", set2:null },
        "vinegar": { set1:"ketchup", set2:null },
    }
},
dressing: {
    type:"thick_liquid",
    color:"#8b4f1b",
    hidden:true,
    dishWeight:-50
},
juice: {
    type:"liquid",
    color:"#ddd784",
    hidden:true
},
vinegar: {
    type:"liquid",
    color:"#dad7b0"
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
        chocolate: { set1:"chocolate_milk", set2:null },
        fat: { set1:"cream" },
    }
},
chocolate_milk: {
    type:"milk",
    color:"#946132",
},
cream: {
    type:"liquid",
    group:"dairy",
    color:"#f3f3ec",
    adj:"creamy",
    keywords:"dairy creme kreme creamer",
    dishWeight:-55,
    reactions: {
        chocolate: { set1:"chocolate_milk", set2:null }
    }
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
    meltPoint:40,
    meltInto:"grease"
},
grease: {
    type:"liquid",
    group:"meat",
    adj:"greasy",
    color:"#cbac72",
    freezePoint:40,
    freezeInto:"fat"
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
    meltInto:"cream"
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
    shape:"egg_yolk",
    placedShape:"egg_yolk",
    type:"thick_liquid",
    color:"#ffd95b",
    cookColor:"#fff6d9",
    group:"protein_other",
    dishName:"egg",
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
    type:"cheese",
    keywords:"bleu cheese"
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
berry: {
    // culinary berry
    color:"#bd310a",
    type:"fruit",
    shape:"circle_ms",
    hidden:true,
    width:0.5
},
citrus: {
    // culinary berry
    color:"#dddd2e",
    type:"fruit",
    shape:"fruit_nubs",
    hidden:true,
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
    scale:0.75,
    placedShape:"beans_some"
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
    scale:0.75
},
nut: {
    color:"#a0220e",
    type:"fruit",
    shape:"fruit_nub",
    group:"protein_plant",
    hidden:true,
    dishWeight:-20,
    scale:0.75
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
    keywords:"grain,cereal,plant,grass"
},
apple: {
    color:["#ff1f40","#ffd20c","#5ad700"],
    innerColor:"#ffeda4",
    type:"fruit",
    shape:"fruit_bipod_stem"
},
banana: {
    color:"#ffe135",
    innerColor:"#fffbc9",
    type:"fruit",
    shape:"curve_thick"
},
plantain: {
    color:"#97c628",
    innerColor:"#ebffc9",
    type:"fruit",
    shape:"curve_thick"
},
melon: {
    color:"#FDBCB4",
    innerColor:"#FDBCB4",
    scale:1.5,
    type:"fruit",
    shape:"oval_thick_horizontal",
    short:"melon"
},
cantaloupe: {
    color:"#D9C58A",
    innerColor:"#fdb57c",
    type:"melon",
    keywords:"muskmelon"
},
honeydew: {
    color:"#CFBF88",
    innerColor:"#B8C868",
    type:"melon",
    keywords:"honey melon,green melon"
},
watermelon: {
    color:["#38b91c","#247612"],
    innerColor:"#ff6666",
    type:"melon",
    short:"melon"
},
grapefruit: {
    color:"#F1C234",
    innerColor:"#F73D3E",
    scale:1.5,
    type:"citrus",
    shape:"circle",
},
pomelo: {
    color:"#F2E176",
    innerColor:"#EF8F7B",
    scale:1.5,
    type:"citrus",
    shape:"circle",
},
watermelon_slice: {
    color:"#ff6666",
    shape:"circle_chord",
    name:"watermelon"
},
orange: {
    color:"#FFA500",
    type:"citrus",
    shape:"circle",
},
orange_slice: {
    type:"orange",
    shape:"circle_chord",
    name:"orange"
},
pineapple: {
    color:"#e6ae25",
    type:"fruit",
    shape:"oval_leafy",
    adj:"hawaiian",
},
mango: {
    color:["#F4BB44","#FF8040"],
    type:"fruit",
    shape:"oval_thick_horizontal",
},
avocado: {
    color:"#568203",
    innerColor:"#B2C248",
    type:"fruit",
    shape:"fruit_extrude"
},
pear: {
    color:"#C9CC3F",
    innerColor:"#faf691",
    type:"fruit",
    shape:"fruit_extrude"
},
guava: {
    color:"#57c432",
    innerColor:"#ff6057",
    type:"fruit",
    shape:"fruit_extrude"
},
papaya: {
    color:"#F98E1D",
    type:"fruit",
    shape:"fruit_extrude"
},
kiwi: {
    color:"#91631D",
    innerColor:"#90C825",
    type:"fruit",
    shape:"oval_thick_horizontal",
    keywords:"kiwifruit,kiwi fruit"
},
kumquat: {
    color:"#FFB75A",
    type:"fruit",
    shape:"ovoid",
    keywords:"cumquat"
},
lychee: {
    color:"#E84C5A",
    type:"fruit",
    shape:"pick"
},
blueberry: {
    color:["#4f86f7","#312581","#492581"],
    type:"berry",
},
currant: {
    color:["#202034","#B6012E","#D9C4A6"],
    type:"berry",
},
acai: {
    color:"#604654",
    type:"berry",
    name:"açaí"
},
elderberry: {
    color:"#3F3C66",
    type:"berry",
},
gooseberry: {
    color:"#8DA415",
    type:"berry",
},
grape: {
    color:"#6f2da8",
    type:"berry",
    meltPoint:80,
    meltInto:"raisin"
},
raisin: {
    color:"#462119",
    type:"grape",
},
cherry: {
    color:["#ce2020","#9c0805"],
    type:"berry"
},
cherries: {
    type:"cherry",
    shape:"circle_bi_stem",
    dishName:"cherry"
},
blackberry: {
    color:"#2b0521",
    type:"berry",
    shape:"bunch",
    scale:0.75
},
raspberry: {
    color:"#E30B5D",
    type:"berry",
    shape:"bunch",
    scale:0.75
},
boysenberry: {
    color:"#7c182c",
    type:"berry",
    shape:"bunch",
    scale:0.75
},
mulberry: {
    color:"#770737",
    type:"berry",
    shape:"bunch",
    scale:0.75
},
cranberry: {
    color:"#9F000F",
    type:"berry",
    shape:"oval_thick",
    scale:0.75
},
strawberry: {
    color:"#F81F3C",
    type:"berry",
    shape:"pick",
    scale:0.75
},
date: {
    color:"#BE3A0E",
    type:"berry",
    shape:"fruit_long",
    scale:0.75
},
peach: {
    color:["#ffb07c","#ff885d"],
    type:"fruit",
    shape:"fruit_bi",
    keywords:"nectarine"
},
plum: {
    color:"#673147",
    type:"fruit",
    shape:"fruit_bi",
    meltPoint:80,
    meltInto:"prune"
},
prune: {
    color:"#2b0f0f",
    type:"plum",
},
apricot: {
    color:"#ffb16d",
    type:"fruit",
    shape:"fruit_bi"
},
fig: {
    color:"#605B6F",
    innerColor:"#A94227",
    type:"fruit",
    shape:"bulb"
},
pomegranate: {
    color:"#C0392B",
    type:"fruit",
    shape:"bulb"
},
starfruit: {
    color:"#d2ce6c",
    type:"fruit",
    shape:"star",
    keywords:"carambola"
},
tomato: {
    color:"#ff573a",
    type:"vegetable",
    shape:"fruit_wide",
    broken:"tomato_sauce"
},
persimmon: {
    color:"#E65F1D",
    type:"fruit",
    shape:"fruit_wide"
},
lemon: {
    color:"#fff700",
    type:"citrus",
    shape:"fruit_nubs",
    broken:"lemon_juice",
    reactions: {
        water: { set2:"lemon_water" }
    }
},
lemon_juice: {
    type:"juice",
    color:"#fbf9c2",
    reactions: {
        water: { set1:null, set2:"lemon_water" }
    }
},
lemon_water: {
    type:"lemon_juice",
    color:"#c2f8e6",
    reactions: {
        sugar: { set1:"lemonade", set2:null }
    }
},
lemonade: {
    type:"lemon_juice",
    color:"#fffa8b",
    parts:["lemon"]
},
lime: {
    color:"#32CD32",
    type:"citrus",
    shape:"fruit_nubs",
},
prickly_pear: {
    color:"#E44367",
    type:"fruit",
    shape:"fruit_long",
    keywords:"cactus pear"
},
dragonfruit: {
    color:"#f35d8b",
    innerColor:"#F3E4E9",
    type:"fruit",
    shape:"fruit_long_thorny",
    keywords:"pitaya fruit,pitahaya fruit,dragon fruit"
},
coconut: {
    color:"#965A3E",
    innerColor:"#e9edf6",
    type:"fruit",
    shape:"circle_rough",
    scale:1.25,
},
durian: {
    color:"#a88c45",
    innerColor:"#e1bd27",
    type:"fruit",
    shape:"circle_thorny_ml",
    scale:1.25,
},
passionfruit: {
    color:"#5A4223",
    innerColor:"#E29B2B",
    type:"fruit",
    shape:"circle_rough",
    scale:1.25,
    keywords:"passion fruit"
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
    shape:"root",
    hidden:true
},
carrot: {
    color:"#ED9121",
    type:"root_vegetable",
    shape:"needle"
},
artichoke: {
    color:"#53e770",
    type:"vegetable",
    shape:"ovoid_scaly"
},
eggplant: {
    color:"#9b0cb0",
    type:"vegetable",
    shape:"curve_plump",
    keywords:"aubergine"
},
asparagus: {
    color:"#83b020",
    type:"vegetable",
    shape:"rod_flared_leafy",
},
celery: {
    color:"#b9de6f",
    type:"vegetable",
    shape:"rod_flared_leafy",
},
broccoli: {
    color:"#5b9c3f",
    type:"vegetable",
    shape:"leaf_vegetable",
},
cabbage: {
    color:"#7f9f3f",
    type:"leaf_vegetable",
    shape:"circle_leafed",
},
lettuce: {
    color:"#a7e42d",
    type:"leaf_vegetable",
    shape:"circle_leafed",
},
endive: {
    color:"#8bbf24",
    type:"leaf_vegetable",
    shape:"circle_leafed",
    keywords:"frisee"
},
fiddlehead: {
    color:"#638e0b",
    type:"vegetable",
    shape:"spiral_s",
},
red_cabbage: {
    color:"#7f3f7f",
    type:"cabbage",
    keywords:"purple cabbage"
},
brussels_sprout: {
    color:"#7ca52a",
    type:"cabbage",
    keywords:"brussel sprouts,brussels sprouts"
},
cauliflower: {
    color:"#ebe6b3",
    type:"cabbage",
    shape:"leaf_vegetable"
},
bok_choy: {
    color:"#7f9f3f",
    innerColor:"#ebe6b3",
    type:"cabbage",
    keywords:"pak choi,boc choy,pok choi"
},
chicory_root: {
    color:"#d2a45a",
    type:"root_vegetable",
},
cilantro: {
    type:"herb",
    keywords:"coriander Chinese,parsley dhania"
},
fennel_seed: {
    color:"#b08e60",
    type:"spice"
},
mustard_greens: {
    color:"#849612",
    type:"leaf_vegetable",
    shape:"leaf_rough",
    keywords:"Indian mustard,Chinese mustard,Kai Choi,leaf mustard"
},
mustard_seed: {
    color:"#cf9d40",
    type:"spice"
},
beetroot: {
    color:"#7a1f3d",
    innerColor:"#cf2d71",
    type:"root_vegetable",
    shape:"bulb_down"
},
spinach: {
    color:"#4b8e3f",
    type:"leaf_vegetable",
    shape:"leaf_rough"
},
chard: {
    color:"#448439",
    type:"leaf_vegetable",
    shape:"leaf_rough",
    keywords:"silverbeet,perpetual spinach,mangold"
},
collards: {
    color:"#4da53d",
    type:"leaf_vegetable",
    shape:"leaf_rough",
    keywords:"collard greens"
},
kale: {
    color:"#3f8e54",
    type:"leaf_vegetable",
    shape:"leaf_rough"
},
alfalfa_sprout: {
    color:"#d3f4dc",
    type:"vegetable",
    shape:"helix_strand"
},
bean_sprout: {
    color:"#f0f4d3",
    type:"vegetable",
    shape:"helix_strand",
    keywords:"beansprout"
},
azuki_bean: {
    color:"#942929",
    type:"bean"
},
black_bean: {
    color:"#2c1f1f",
    type:"bean",
    keywords:"black turtle bean"
},
black_eyed_pea: {
    name:"black-eyed pea",
    color:"#d5bf67",
    type:"bean",
    shape:"bean_eyed",
    keywords:"black-eyed bean,cowpea"
},
fava_bean: {
    color:"#85cf80",
    type:"bean",
    keywords:"broad bean,faba bean,tick bean,horse bean"
},
chickpea: {
    color:"#d9b856",
    type:"bean",
    keywords:"garbanzo bean,ceci bean"
},
lima_bean: {
    color:"#d9c59c",
    type:"bean",
    keywords:"butter bean"
},
mung_bean: {
    color:"#858f31",
    type:"bean",
    keywords:"mungo bean"
},
pinto_bean: {
    color:["#d7b587","#815a35"],
    type:"bean"
},
kidney_bean: {
    color:["#812121","#721515"],
    type:"bean"
},
lentil: {
    color:["#DA7837","#9FA442","#333B0C"],
    type:"bean",
    keywords:"daal,pulse"
},
green_bean: {
    color:"#4f8e3f",
    type:"vegetable",
    shape:"curve",
},
pea: {
    color:"#6f9f3f",
    type:"vegetable",
    shape:"circle_s",
},
soybean: {
    color:"#d3ce71",
    type:"bean",
    shape:"bean_eyed",
    keywords:"soya bean,soy bean"
},
okra: {
    color:"#7f9f3f",
    type:"vegetable",
    shape:"curve_thick"
},
chive: {
    color:"#7f9f3f",
    type:"herb",
    shape:"rod_rough_thin"
},
leek: {
    color:"#abcd69",
    type:"root_vegetable",
    shape:"rod_thin_splits"
},
scallion: {
    color:"#86b723",
    type:"vegetable",
    shape:"rod_thin_splits",
    keywords:"spring onion,green onion"
},
onion: {
    color:"#f6bf81",
    type:"root_vegetable",
    shape:"bulb"
},
shallot: {
    color:"#7e5172",
    type:"onion",
},
pepper: {
    color:["#d01414","#d0a714","#309900"],
    type:"vegetable",
    shape:"fruit_bipod_thin_stem",
    hidden:true
},
bell_pepper: {
    type:"pepper",
    keywords:"capsicum,sweet pepper",
    broken:"paprika"
},
paprika: {
    type:"spice",
    color:"#d01414",
    adj:"spicy"
},
hot_sauce: {
    type:"sauce",
    color:"#d01414",
    adj:"spicy"
},
chili_pepper: {
    type:"pepper",
    adj:"spicy",
    shape:"hook_stem",
    keywords:"chilli pepper,chile pepper",
    broken:"hot_sauce"
},
jalapeno: {
    color:"#309900",
    type:"chili_pepper",
    name:"jalapeño",
    keywords:"jalapeno chili pepper"
},
habanero: {
    color:"#d01414",
    type:"chili_pepper",
    shape:"fruit_pick_stem",
    keywords:"habanero chili pepper"
},
tabasco: {
    color:"#d01414",
    type:"chili_pepper",
    shape:"fruit_pick_stem",
    keywords:"tabasco chili pepper"
},
cayenne: {
    color:"#ff1717",
    type:"chili_pepper",
    keywords:"cayenne chili pepper"
},
rhubarb: {
    color:"#ea415d",
    innerColor:"#bde1c0",
    type:"vegetable",
    shape:"rod_flared"
},
water_chestnut: {
    color:"#754737",
    innerColor:"#eadfd3",
    type:"vegetable",
    shape:"bulb_down",
    scale:0.5,
    keywords:"Chinese water chestnut"
},
parsnip: {
    color:"#edcf99",
    type:"root_vegetable",
    shape:"fruit_long"
},
rutabaga: {
    color:"#b66e81",
    type:"root_vegetable",
    shape:"bulb_down",
    keywords:"swede"
},
radish: {
    color:"#aa2370",
    type:"root_vegetable",
    shape:"bulb_down"
},
turnip: {
    color:"#df58bd",
    type:"root_vegetable",
    shape:"bulb_down"
},
daikon: {
    color:"#dcc19f",
    type:"radish"
},
horseradish: {
    color:"#cea26b",
    type:"root_vegetable"
},
wasabi_root: {
    color:"#556e31",
    type:"root_vegetable",
    broken:"wasabi"
},
wasabi: {
    color:"#6aa01f",
    type:"spice"
},
tuber: {
    color:"#af8b3c",
    type:"root_vegetable",
    shape:"bean_l"
},
potato: {
    color:"#b79268",
    type:"tuber"
},
sweet_potato: {
    color:"#c47e2e",
    type:"tuber"
},
yam: {
    color:"#876e52",
    innerColor:"#f1d9a4",
    type:"tuber"
},
jicama: {
    name:"jícama",
    color:"#af8b3c",
    type:"tuber",
    shape:"bulb_down",
    keywords:"Mexican yam bean,Mexican turnip"
},
ginger_root: {
    color:"#bca67c",
    innerColor:"#f1e7a4",
    type:"root_vegetable"
},
corn: {
    color:"#e8d525",
    type:"vegetable",
    group:"carb",
    shape:"rod_bumpy",
    keywords:"maize",
    meltPoint:180,
    meltInto:"popcorn"
},
popcorn: {
    color:"#f2e9d2",
    group:"carb",
    shape:"fluffy",
    keywords:"popped corn pop corn"
},
garlic: {
    color:"#f2e9d2",
    type:"root_vegetable",
    shape:"bulb",
    broken:"garlic_powder"
},
garlic_powder: {
    color:"#f2e9d2",
    type:"spice",
    adj:"garlic",
    parts:["garlic"],
},
squash: {
    color:"#efb410",
    type:"vegetable",
    shape:"fruit_extrude"
},
pumpkin: {
    color:"#f2a71d",
    innerColor:"#ffdd9d",
    type:"squash",
    shape:"fruit_wide_stem",
    scale:1.5,
    keywords:"jack-o'-lantern,jack o'lantern,jackolantern,jack-o-lantern"
},
zucchini: {
    color:"#3f7930",
    innerColor:"#6fb75b",
    type:"squash",
    shape:"rod_bumpy",
    keywords:"courgette"
},
cucumber: {
    color:"#509240",
    innerColor:"#abd3a0",
    type:"squash",
    shape:"rod_bumpy",
    keywords:"cuke"
},
acorn_squash: {
    color:"#293027",
    innerColor:"#f3b711",
    type:"squash",
    shape:"fruit_bipod",
    keywords:"pepper squash,Des Moines squash"
},
butternut_squash: {
    color:"#e9bf70",
    innerColor:"#f3b711",
    type:"squash",
    shape:"fruit_bipod",
    keywords:"butternut pumpkin,gramma"
},
watercress: {
    color:"#07700c",
    type:"leaf_vegetable",
    shape:"leaf_rough",
},

herb: {
    color:"#35b135",
    type:"vegetable",
    shape:"leaf_rough",
    adj:"herbal",
    hidden:true
},

acorn: {
    color:"#915111",
    type:"nut",
    shape:"nut_cap",
},
chestnut: {
    color:"#962800",
    type:"nut",
    shape:"bulb",
},
hazelnut: {
    color:"#a06e28",
    type:"nut",
},
walnut: {
    color:"#b7833a",
    type:"nut",
    shape:"circle_rough",
},
cashew_nut: {
    name:"cashew",
    color:"#cdb816",
    type:"nut",
    shape:"semitorus_thick_left",
},
pistachio: {
    color:"#d7b56c",
    innerColor:"#b2c535",
    type:"nut"
},
brazil_nut: {
    color:"#b83d00",
    type:"nut"
},
macadamia: {
    color:"#b15614",
    type:"nut"
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
        water: { set2:"broth" }
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
    keywords:"meat,steak",
    pin:true
},
beef_patty: {
    type:"beef",
    shape:"rectangle_thinner_round",
    keywords:"hamburger"
},
poultry: {
    color:"#ffdddf",
    cookColor:"#df9e6d",
    type:"meat",
    shape:"poultry",
    keywords:"bird",
    hidden:true
},
chicken: {
    type:"poultry",
    keywords:"poultry,bird"
},
fish: {
    color:"#4edeff",
    cookColor:"#d0891f",
    type:"meat",
    shape:"fish",
    keywords:"seafood,pescetarian"
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
    keywords:"crustacean,seafood"
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
    keywords:"cephalopod,seafood"
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
    shape:"rock_ball",
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
"leaf_vegetable+vegetable":"vegetable salad",
"fruit+fruit+vegetable?":"fruit salad",
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