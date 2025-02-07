/*
[Ingredient Properties]
name: override default name
type: inherits properties from specified ingredient
group: other(default), generic(hidden), dairy, mineral, carb, fruit, vegetable, meat, protein_other, protein_plant
shape: R74n Shapes file name, without .png
placedShape: Shape used instead when placed
stackShape: Shape used instead only in Stack Mode
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
broken: ingredient to change into when broken
brokenShape: shape to change into when broken
whipped: ingredient to change into when whisked
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
cookName: name used in dish name when cooked
innerColor: color of the inside of the ingredient (unused)
glow: color to glow when placed
onSelect: run function(id) when ingredient is selected
onDeselect: run function(id) when ingredient is deselected
onPlace: run function(placed) after ingredient is placed
onMouseDown: run function(id) before ingredient is placed
onCollide: run function(placed,other) when ingredients collide
props: give ingredient properties when placed
*/

// opinion, size, age, shape, colour, origin, material, purpose
// sweet salty spicy red cheesy chocolate ranch apple lettuce peanut beef soup
//  -80   -75   -70  -60   -55     -52     -50   -40    -30    -20   -10  +100
// sugar salt  spice dye dairy  chocolate drsng fruit vegetbl nt/leg meat dish

shapeMeta = {
    short: ["cylinder_short","pants_short","rectangle_thin_round","rectangle_thin","rectangle_thinner_round","rectangle_thinner","semicircle_top","semicircle_bottom","bean","blob_short","oval_horizontal","circle_ms","circle_s","helix_strand","rod_rough_thin","rod_thin","rod_thin_splits","rod_flared","needle","liquid_splat","foliage_bar","rectangle_thinner_tablet","rectangle_thinner_ring","squares_some_flat","squares_some","beans_some","beans_some_flat","dots_some","dots_some_flat","rectangle_thinner_ridged","rectangle_thinner_round_porous","rod","rod_bumpy","rod_flared_leafy","torus_side"],
    colorsNeon: ["#ff0000","#ff8000","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"],
    colorsPastel: ["#ffaaaa","#ffddaa","#aaffaa","#aaffff","#aaaaff","#ffaaff"],
    quadRotation: [0,90,180,270],
    octRotation: [0,45,90,135,180,225,270,315],
}

adjReactions = {
    "red": {
        "blue": "purple",
        "yellow": "orange",
    },
    "yellow": {
        "blue": "green",
    }
}


ingredients = {

liquid: {
    group:"generic",
    shape:"liquid",
    placedShape:"droplets_some",
    behavior:1,
    height:0.2,
    landedShape:"liquid_splat"
},
thick_liquid: {
    type:"liquid",
    group:"generic",
    shape:"liquid",
    placedShape:"droplets_some",
    landedShape:"liquid_splat",
    behavior:2,
    height:0.4,
    dissolve:true
},
powder: {
    group:"generic",
    shape:"powder",
    placedShape:"squares_some",
    stackShape:"squares_some_flat",
    behavior:2,
    height:0.5
},
gas: {
    group:"generic",
    shape:"gas",
    a: 0.25,
    behavior:3,
    dishName:null
},
air: {
    type:"gas",
    a: 0
},
energy: {
    color:"#ffff80",
    group:"generic",
    shape:"gas",
    placedShape:"gas",
    a: 0.75,
    adj:"imbued",
    dishName:"essence",
    keywords:"magic",
    behavior:2,
    delete:true,
    dissolve:true
},
unknown: {
    group:"generic",
    shape:"unknown",
    adj:"glitched"
},
utensil: {
    group:"generic",
    shape:"fork_down",
    dishName:null
},

fork: {
    type:"utensil",
    shape:"fork_down",
    hidden:true
},
skewer: {
    type:"utensil",
    shape:"rectangle_vertical_thinnest_tb",
    scale:2,
    color:"#9a7960",
    keywords:"stick,kebab,kabob,kebap,kabab,popsicle stick",
    width:0.2
},
straw: {
    type:"utensil",
    shape:"rectangle_vertical_thinnest_tb",
    scale:4,
    color:"#c6dadc",
    width:0.2
},
decor: {
    group:"generic",
    shape:"astroid",
    dishName:null,
    dishWeight:-200
},
random: {
    shape:"assorted",
    onSelect: function() {
        var choices = Object.keys(ingredients);
        currentIngredientProps.id = choices[Math.floor(Math.random()*choices.length)];
    },
    onMouseDown: function() {
        var choices = Object.keys(ingredients);
        currentIngredientProps.id = choices[Math.floor(Math.random()*choices.length)];
    },
    color:"#00ffff"
},


steam: {
    type:"gas",
    color:"#bfd8df",
    keywords:"water vapor,water vapour"
},
carbon_dioxide: {
    type:"gas",
    color:"#575757",
    keywords:"co2",
    hidden:true
},
smoke: {
    type:"gas",
    color:"#575757",
    hidden:true
},
water: {
    type:"liquid",
    color:"#bfd8df",
    reactions: {
        meat: { set1:"broth" },
        vegetable: { set1:"broth", tempMin:60 },
        bone: { set1:"broth", tempMin:60 },
        bouillon_cube: { set1:"broth", set2:null }
    },
    adj:"soggy",
    pin:true,
    boilPoint:100,
    boilInto:"steam",
    freezePoint:0,
    freezeInto:"ice_cube",
    keywords:"liquid,wet,h2o,h20,aqua"
},
seltzer: {
    type:"water",
    color:"#cbe2e9",
    reactions: {
        sugar: { set1:"soda", set2:null },
        vinegar: { set1:"soda", set2:null }
    },
    adj:"fizzy",
    boilPoint:100,
    boilInto:["steam","carbon_dioxide"],
    keywords:"carbonated water,soda water,sparkling"
},
broth: {
    type:"liquid",
    color:"#dbcda6",
    dishName:"soup",
    dishWeight:1000,
    boilPoint:100,
    boilInto:"steam",
    parts:null,
    keywords:"chicken stock"
},
bouillon_cube: {
    color:"#dbcda6",
    shape:"cube",
    parts:["broth"],
    keywords:"stock cube",
    dishName:null
},
ice_cube: {
    color:"#b4efff",
    a:0.75,
    shape:"cube",
    adj:"iced",
    dishName:"ice",
    dishWeight:-35,
    meltPoint:30,
    meltInto:"water",
    broken:"shaved_ice",
    temp:0
},
shaved_ice: {
    color:"#b4efff",
    type:"powder",
    adj:"iced",
    meltPoint:30,
    meltInto:"water",
    keywords:"crushed ice,snow,slush,slushie,smoothie"
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
        "meat": { set1:"meat_sauce" }
    },
    keywords:"marinara sauce,red sauce,pizza sauce",
    adj:"tomato"
},
meat_sauce: {
    type:"tomato_sauce",
    color:"#b03a20",
    adj:"meat"
},
gravy: {
    type:"sauce",
    color:"#9a643b"
},
paste: {
    type:"thick_liquid",
    color:"#9e935f",
    hidden:true,
    dishWeight:-50,
    keywords:"spread,puree"
},
nut_butter: {
    type:"paste",
    color:"#b08e60",
    group:"protein_plant",
    parts:["nut"],
    adj:"nutty"
},
peanut_butter: {
    type:"nut_butter",
    color:"#B4885B",
    parts:["peanut"],
    dishWeight:-51,
    short:"=PB="
},
jam: {
    type:"paste",
    color:"#d94f78",
    keywords:"jelly"
},
jelly: {
    type:"jam",
    color:"#b82e7f",
    keywords:"jam,grape jelly",
    parts:null
},
marmalade: {
    type:"paste",
    color:"#f7a313"
},
fruit_curd: {
    type:"paste",
    color:"#efc53b"
},
cookie_butter: {
    type:"paste",
    color:"#b8691b",
    group:"carb"
},
guacamole: {
    type:"paste",
    color:"#A1B03E",
    group:"vegetable",
    short:"guac"
},
pesto: {
    type:"paste",
    color:"#75a833",
    group:"vegetable"
},
barbecue_sauce: {
    type:"sauce",
    color:"#8b1b1b",
    group:"vegetable",
    adj:"barbecue",
    keywords:"bbq sauce"
},
worcestershire_sauce: {
    type:"sauce",
    color:"#5B2A25",
    group:"protein_other",
    adj:"fishy",
},
miso: {
    type:"paste",
    color:"#F1A748",
    group:"protein_plant"
},
hummus: {
    type:"paste",
    color:"#CEC09B",
    group:"protein_plant",
    keywords:"hommus,houmous"
},
honey: {
    type:"paste",
    color:"#D45502",
    group:"carb",
    parts:["sugar"],
    dissolve:true
},
dressing: {
    type:"thick_liquid",
    color:"#8b4f1b",
    hidden:true,
    dishWeight:-50
},
ranch_dressing: {
    type:"dressing",
    color:"#f2f2f2",
    adj:"ranch"
},
juice: {
    type:"liquid",
    color:"#ddd784",
    hidden:true,
    boilPoint:100,
    boilInto:["steam","sugar"]
},
fruit_juice: {
    type:"juice",
    hidden:true,
    reactions: {
        "icing": { set1:"jam", set2:null, tempMin:100 },
        "sugar": { set1:"jam", set2:null, tempMin:100 }
    },
    group:"fruit",
    adj:"fruit"
},
vegetable_juice: {
    type:"juice",
    hidden:true,
    group:"vegetable",
    adj:"vegetable"
},
alcohol: {
    type:"liquid",
    color:"#d0cead",
    reactions: {
        "rice": { set1:"sake" },
        "grape": { set1:"wine" },
        "cereal_plant": { set1:"beer" }
    },
    boilPoint:78.37,
    dishWeight:-55,
    keywords:"ethanol",
    group:"carb"
},
sake: {
    name:"saké",
    type:"alcohol",
    color:"#f2f2f2",
    reactions:null
},
wine: {
    type:"alcohol",
    color:"#8b1b1b",
    reactions: {
        vegetable: { set1:"broth", tempMin:60 }
    },
    parts:null
},
beer: {
    type:"alcohol",
    color:"#ecd3a1",
    reactions:null
},
vodka: {
    type:"alcohol",
    color:"#bfd5d5",
    reactions:null,
    parts:["water"]
},
liquor: {
    type:"alcohol",
    color:"#b1c5c3",
    keywords:"distilled beverage,distilled alcohol,spirit"
},
rum: {
    type:"liquor",
    color:"#B95711"
},
whiskey: {
    type:"liquor",
    color:"#D28C23"
},
soda: {
    type:"liquid",
    color:"#501c00",
    boilPoint:100,
    boilInto:["steam","carbon_dioxide","sugar"],
    keywords:"cola,pop,soda pop,soft drink,coke"
},
root_beer: {
    type:"soda",
    color:"#8e5e43"
},
coffee: {
    type:"liquid",
    color:"#7f402b",
    boilPoint:100,
    boilInto:"steam",
    keywords:"caffeine,black coffee,decaf,joe"
},
tea: {
    type:"liquid",
    color:"#5f592b",
    boilPoint:100,
    boilInto:"steam",
    keywords:"green tea"
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
relish: {
    type:"sauce",
    color:"#b5a424",
    group:"vegetable"
},
soy_sauce: {
    type:"sauce",
    color:"#750F02",
    group:"protein_other",
    short:"soy",
    adj:"soy",
    keywords:"soya sauce",
    reactions: {
        salt: { set1:"miso", set2:null },
        water: { set1:"soy_milk", set2:null },
    }
},
hoisin_sauce: {
    type:"sauce",
    color:"#511e09",
    group:"protein_other",
    adj:"hoisin",
    parts:["soy_sauce"]
},
sweet_and_sour: {
    type:"sauce",
    color:"#c73611",
    adj:"sweet and sour",
    keywords:"sweet and sour sauce"
},
soy_milk: {
    type:"milkoid",
    color:"#f3f1ec",
    group:"protein_plant"
},
tofu: {
    color:"#FBFAF2",
    group:"protein_plant",
    shape:"rectangle",
    height:0.75
},
almond_milk: {
    type:"milkoid",
    color:"#D7D1C5",
    group:"protein_plant"
},
oil: {
    type:"liquid",
    color:"#e7df97",
    pin:true,
    dishName:null,
    keywords:"cooking oil",
    reactions: { // frying
        meat: { adj2:"fried", tempMin:80, create:"gas", chance:0.005 },
        yolk: { adj2:"fried", tempMin:80, create:"gas", chance:0.005 },
        rice: { adj2:"fried", tempMin:80, create:"gas", chance:0.005 },
        mushroom: { adj2:"fried", tempMin:80, create:"gas", chance:0.005 },
        breadcrumbs: { adj2:"fried", tempMin:80, create:"gas", chance:0.005 },
        potato: { set2:"fry", tempMin:80, create:"gas", chance:0.005 },
        mashed_potato: { set2:"fry", tempMin:80, create:"gas", chance:0.005 },
        chicken: { set2:"chicken_nugget", tempMin:80, create:"gas", chance:0.005 },
    }
},
vegetable_oil: {
    type:"oil",
    keywords:"cooking oil"
},
olive_oil: {
    type:"vegetable_oil"
},
milkoid: {
    type:"liquid",
    color:"#f3f3ec",
    hidden:true,
    dishWeight:-55
},
milk: {
    type:"milkoid",
    group:"dairy",
    color:"#f3f3ec",
    keywords:"dairy",
    reactions: {
        chocolate: { set1:"chocolate_milk" },
        chocolate_powder: { set1:"chocolate_milk" },
        fat: { set1:"cream" },
        bacteria: { set1:"cheese" }
    },
    pin:true
},
chocolate_milk: {
    type:"milk",
    color:"#946132",
    keywords:"choccy milk"
},
cream: {
    type:"milkoid",
    group:"dairy",
    color:"#f3f3ec",
    adj:"creamy",
    keywords:"dairy creme kreme creamer",
    whipped:"whipped_cream",
    freezePoint:0,
    freezeInto:"ice_cream"
},
buttermilk: {
    type:"milkoid",
    group:"dairy",
    color:"#f3f3ec"
},
whipped_cream: {
    group:"dairy",
    shape:"clumps",
    parts:["cream"],
    color:"#f3f1ec",
    adj:"creamy",
    keywords:"miracle whip,cool whip"
},
yogurt: {
    group:"dairy",
    shape:"clumps",
    color:"#f3f3ec",
    dishWeight:-55,
    freezePoint:0,
    freezeInto:"frozen_yogurt",
    keywords:"yoghurt,yogourt,yoghourt"
},
frozen_yogurt: {
    type:"yogurt",
    color:"#f8fffd",
    freezePoint:null,
    meltPoint:30,
    meltInto:"yogurt",
    keywords:"frogurt,froyo,frozen yoghurt,frozen yogourt,frozen yoghourt"
},
sour_cream: {
    type:"cream",
    behavior:0,
    placedShape:null,
    landedShape:null,
    height:1,
    shape:"clumps",
    color:"#f3f1ec",
    keywords:"soured cream"
},
fat: {
    group:"meat",
    shape:"scoop",
    color:"#f3f3ec",
    meltPoint:40,
    meltInto:"grease",
    brokenShape:"liquid_splat",
},
grease: {
    type:"liquid",
    group:"meat",
    reactions: {
        flour: { set1:null, set2:"roux" }
    },
    adj:"greasy",
    color:"#cbac72",
    freezePoint:40,
    freezeInto:"fat"
},
roux: {
    type:"thick_liquid",
    color:"#e3d9c0",
    adj:"thick",
    reactions: {
        meat: { set1:"gravy" }
    }
},
margarine: {
    type:"fat",
    shape:"scoop",
    color:"#fafaac",
    dishWeight:-55,
    meltPoint:35,
    whipped:"whipped_butter",
    parts:["vegetable_oil"]
},
butter: {
    type:"fat",
    group:"dairy",
    shape:"scoop",
    placedShape:"rectangle_thin",
    color:"#ffff80",
    adj:"buttered",
    dishWeight:-55,
    meltPoint:35,
    meltInto:"melted_butter",
    whipped:"whipped_butter",
    pin:true
},
whipped_butter: {
    type:"butter",
    color:"#ffffbe",
    shape:"clumps",
    placedShape:"clumps",
},
melted_butter: {
    type:"liquid",
    group:"dairy",
    color:"#ffff1c",
    adj:"buttered",
    dishWeight:-55,
    freezePoint:15,
    freezeInto:"butter"
},
ice_cream: {
    group:"dairy",
    shape:"scoop",
    color:"#fffdf4",
    keywords:"sundae,frozen,iced cream",
    dishWeight:90,
    meltPoint:30,
    meltInto:"cream"
},
waffle_cone: {
    type:"utensil",
    color:"#cd9422",
    shape:"trapezoid_full_down",
    keywords:"ice cream cone",
    dishName:null,
    height:1.1
},


salt: {
    type:"powder",
    group:"mineral",
    shape:"powder_rough",
    color:"#e3e3e3",
    dissolve:true,
    adj:"salted",
    dishWeight:-75,
    pin:true,
    keywords:"table salt,nacl,sodium chloride,salty"
},
himalayan_salt: {
    color:"#EB907F",
    type:"salt",
    keywords:"pink salt,rock salt"
},
leavener: {
    type:"powder",
    hidden:true,
    shape:"powder_rough",
    adj:"fluffy"
},
baking_powder: {
    type:"leavener",
    color:"#e3e3e3",
    parts:["baking_soda"]
},
yeast: {
    type:"leavener",
    color:"#cbb58b",
    reactions: {
        "juice": { set2:"alcohol" }
    },
},
baking_soda: {
    type:"salt",
    dishName:null,
    keywords:"sodium bicarbonate,bicarbonate of soda",
    reactions: {
        vinegar: { set1:"carbon_dioxide", set2:"water" }
    }
},
msg: {
    type:"salt",
    keywords:"sodium glutamate,monosodium glutamate,E621",
    name:"=MSG=",
    adj:"savory"
},
citric_acid: {
    type:"salt",
    keywords:"citrate",
    adj:"sour"
},
sugar: {
    type:"powder",
    group:"carb",
    color:"#f2f2f2",
    dissolve:true,
    adj:"sweet",
    dishWeight:-80,
    pin:true,
    meltPoint:170,
    meltInto:"caramel",
    keywords:"carbohydrate,glucose,fructose,sucrose,powdered sugar",
    broken:"icing",
    reactions: {
        water: { set1:"icing", noHidden:true },
        milk: { set1:"icing", noHidden:true },
        fat: { set1:"buttercream", set2:null, noHidden:true }
    }
},
caramel: {
    type:"thick_liquid",
    color:"#E05F01",
    adj:"candied",
    freezePoint:5,
    freezeInto:"candy",
    group:"carb"
},
candy: {
    color:"#e1a478",
    shape:"circle_scored",
    adj:"candy",
    meltPoint:170,
    meltInto:"caramel",
    group:"carb",
    parts:["sugar"],
    scale: 0.5
},
jelly_bean: {
    color: shapeMeta.colorsPastel,
    shape:"bean",
    type:"candy",
},
gummy_worm: {
    color: shapeMeta.colorsPastel,
    shape:"worm",
    type:"candy",
    scale:1
},
gumdrop: {
    color: shapeMeta.colorsPastel,
    shape:"blob",
    type:"candy",
    scale:1
},
bubblegum: {
    color: "#FFC1CC",
    shape:"rectangle_thin",
    type:"candy",
    keywords:"chewing gum",
    scale:1,
    meltPoint:51,
    meltInto:null,
    adj:null
},
gumball: {
    color: "#ffa7c0",
    shape:"circle_ms",
    type:"bubblegum"
},
sprinkles: {
    type:"powder",
    shape:"squares_some",
    color: shapeMeta.colorsNeon,
    adj:"sprinkled",
    parts:["sugar"],
    keywords:"candy"
},
icing: {
    type:"sauce",
    color:"#f2f2f2",
    reactions: {
        chocolate: { set1:"chocolate_icing" }
    },
    adj:"glazed",
    keywords:"frosting,filling,iced"
},
buttercream: {
    type:"icing",
    color:"#f2efd6"
},
butterscotch: {
    type:"icing",
    color:"#e5b700"
},
chocolate_icing: {
    type:"icing",
    color:"#95592e",
    keywords:"chocolate frosting,nutella,chocolate spread"
},
brown_sugar: {
    type:"sugar",
    color:"#d2b48c",
    reactions: {
        water: { set1:"icing", noHidden:true },
        milk: { set1:"icing", noHidden:true },
        butter: { set1:"butterscotch", set2:null, noHidden:true }
    }
},
marshmallow: {
    color:"#e1d4be",
    shape:"rectangle_vertical_thick_round",
    stackShape:"rectangle_thick_round",
    parts:["sugar","gelatin"],
    broken:"fluff",
    group:"carb",
    cookColor:"#bb7c49"
},
fluff: {
    type:"paste",
    color:"#fffcf7",
    group:"carb",
    keywords:"marshmallow creme,marshmallow fluff,marshmallow spread"
},
molasses: {
    type:"thick_liquid",
    group:"carb",
    color:"#5a2b0d",
    reactions: {
        sugar: { set1:null, set2:"brown_sugar" }
    },
    parts:["sugar"]
},
syrup: {
    type:"thick_liquid",
    group:"carb",
    color:"#ffc973",
    dissolve:true,
    adj:"sweet",
    dishWeight:-80,
    parts:["sugar"]
},
maple_syrup: {
    type:"syrup",
    color:"#ff7300",
    adj:"maple"
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
    adj:"peppered",
    pin:true
},
allspice: {
    type:"spice",
    color:"#46231f",
    keywords:"pimento,pimenta"
},
chocolate: {
    color:"#924b00",
    shape:"rectangle",
    stackShape:"rectangle_thin",
    dishWeight:-52,
    meltPoint:45,
    broken:"chocolate_powder",
    keywords:"cocoa,milk chocolate,choccy"
},
white_chocolate: {
    type:"chocolate",
    color:"#fff3db"
},
dark_chocolate: {
    type:"chocolate",
    color:"#522a00",
    keywords:"black chocolate"
},
chocolate_powder: {
    color:"#924b00",
    type:"powder",
    shape:"powder_rough",
    adj:"chocolate",
    dishWeight:-52,
    meltPoint:45,
    meltInto:"chocolate",
    dissolve:true
},
chocolate_chip: {
    color:"#924b00",
    type:"powder",
    shape:"cusp_round_up",
    placedShape:"triangles_some",
    stackShape:"triangles_some_flat",
    adj:"chocolate",
    dishWeight:-52,
    meltPoint:45,
    meltInto:"chocolate",
    parts:["chocolate"]
},
flour: {
    type:"powder",
    reactions: {
        yolk: { set1:"batter", set2:null },
        water: { set1:"dough", set2:null }
    },
    group:"carb",
    shape:"powder_rough",
    color:"#f4efe5",
    pin:true,
    parts:null,
    dissolve:true
},
cornstarch: {
    type:"flour",
    keywords:"cornflour,maize starch"
},
corn_syrup: {
    type:"syrup",
    color:"#EAE1AA",
    parts:["cornstarch"]
},
rice_flour: {
    type:"flour",
    keywords:"rice powder"
},


egg: {
    shape:"ovoid",
    color:["#F0EAD6","#be8b31"],
    reactions: {
        water: { set1:"boiled_egg", tempMin:80 }
    },
    group:"protein_other",
    dropInto:"yolk",
    dropIntoV:10,
    dishWeight:-50,
    broken:"yolk",
    pin:true
},
ostrich_egg: {
    type:"egg",
    color:"#e5d59d",
    scale:1.75,
    broken:"yolk"
},
quail_egg: {
    type:"egg",
    color:"#9c9f71",
    scale:0.75,
    broken:"yolk"
},
boiled_egg: {
    type:"egg",
    color:"#F0EAD6",
    innerColor:"#eac335",
    dropInto:null,
    broken:null,
    parts:null,
    brokenShape:"circle_ms",
    name:"Hard-Boiled Egg",
    keywords:"hard boiled egg"
},
roe: {
    shape:"dots_some",
    stackShape:"dots_some_flat",
    name:"fish roe",
    color:["#ff5e00","#2a100a"],
    dropInto:null,
    broken:null,
    parts:null,
    dishName:"caviar",
    keywords:"fish eggs,ikura,tobiko,caviar"
},
yolk: {
    name:"egg yolk",
    shape:"egg_yolk",
    reactions: {
        juice: { set1:null, set2:"fruit_curd" }
    },
    placedShape:"egg_yolk",
    type:"thick_liquid",
    color:"#ffd95b",
    cookColor:"#fff6d9",
    group:"protein_other",
    dishName:"egg",
    dissolve:true,
    dishWeight:-50,
    parts:null,
    meltPoint:65,
    meltInto:"cooked_yolk",
},
cooked_yolk: {
    type:"yolk",
    color:"#fff6d9",
    name:"fried egg",
    dishName:"fried egg",
    adj:"egg",
    hidden:true
},
batter: {
    color:"#ead295",
    type:"liquid",
    group:"carb",
    dishName:"cake",
    meltPoint:100,
    meltInto:"cake"
},
cake: {
    group:"carb",
    shape:"wedge",
    color:"#ede4b2",
    stackShape:"cylinder_short",
    brokenShape:"squares_some",
    scale:1.5
},
brownie: {
    type:"cake",
    color:"#7d401c",
    parts:["chocolate"],
    shape:"rectangle",
    stackShape:"rectangle",
    scale:1,
    height:0.75
},
dough: {
    color:"#f4e8d7",
    type:"liquid",
    group:"carb",
    shape:"blob_short",
    keywords:"pizza dough",
    meltPoint:100,
    meltInto:"bread"
},
mochi: {
    color:"#e8e3dc",
    type:"dough",
    keywords:"mochi dough",
    placedShape:"droplets_some",
    landedShape:"blob_short",
    behavior:2,
    dissolve:true
},
easter_egg: {
    type:"egg",
    color:["#ffaaaa","#ffddaa","#aaffaa","#aaffff","#aaaaff","#ffaaff"],
    broken:"yolk"
},
cheese: {
    color:"#fec118",
    group:"dairy",
    shape:"wedge",
    adj:"cheesy",
    dishWeight:-55,
    broken:"cheese_powder",
    meltPoint:60,
    stackShape:"rectangle_thinner",
    parts:null
},
cheese_wheel: {
    color:"#fec118",
    group:"dairy",
    shape:"circle_porous",
    adj:"cheesy",
    dishWeight:-55,
    broken:"cheese_powder",
    meltPoint:60,
    stackShape:null,
},
cheese_wheel: {
    type:"cheese",
    shape:"circle_porous",
    stackShape:null,
    keywords:"wheel of cheese",
    scale:1.5
},
swiss_cheese: {
    color:"#e1d5a6",
    type:"cheese",
    shape:"wedge_porous",
    stackShape:"rectangle_thinner_round_porous",
    keywords:"emmental cheese"
},
cream_cheese: {
    color:"#E6E4E2",
    type:"cheese",
    broken:null,
    brokenShape:"liquid_splat",
    stackShape:"liquid_splat",
    shape:"scoop",
    adj:"cream cheese"
},
cheese_powder: {
    color:"#fec118",
    type:"powder",
    shape:"powder_rough",
    meltPoint:60,
    meltInto:"cheese",
    keywords:"shredded cheese,pizza cheese,cut cheese",
    adj:"cheesy",
    group:"dairy"
},
cheese_sauce: {
    color:"#fec118",
    type:"sauce",
    meltPoint:60,
    meltInto:"cheese",
    keywords:"cheese paste",
    adj:"cheesy",
    group:"dairy",
    parts:["cheese"]
},
cheeseball: {
    color:"#fe8b18",
    group:"carb",
    shape:"circle_ms",
    width:0.5,
    broken:"cheese_powder"
},
blue_cheese: {
    color:"#dbdca9",
    type:"cheese",
    keywords:"bleu cheese",
    shape: "wedge_rough"
},
provolone: {
    color:"#ffe291",
    type:"cheese"
},
parmesan: {
    color:"#fff0c8",
    type:"cheese",
    keywords:"Parmigiano Reggiano"
},
cheddar: {
    color:"#feb118",
    type:"cheese"
},
mozzarella: {
    color:"#e1d9ca",
    type:"cheese",
    shape:"blob_short",
    keywords:"mozarella,mozzarela,mozzarella cheese",
    parts:null
},
mozzarella_stick: {
    color:"#a35d11",
    innerColor:"#e1d9ca",
    broken:"mozzarella",
    shape:"rod_bumpy",
    keywords:"mozz stick",
    group:"dairy",
    parts:["mozzarella"]
},
feta: {
    color:"#F2F0EA",
    type:"cheese",
    shape:"wedge_porous",
    stackShape:"rectangle_thinner_round_porous",
    keywords:"feta cheese"
},
american_cheese: {
    color:"#ffbf00",
    type:"cheese",
    shape:"rectangle_thinner",
    keywords:"processed cheese"
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
    dishWeight:-40,
    broken:"fruit_juice"
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
    hidden:true
},
vegetable: {
    color:"#41d841",
    type:"plant",
    group:"vegetable",
    shape:"leaf_vegetable",
    hidden:true,
    dishWeight:-30,
    broken:"vegetable_juice"
},
mushroom: {
    color:"#d8b377",
    type:"vegetable",
    shape:"fungus",
    broken:null,
    brokenShape:"squares_some_flat"
},
shiitake: {
    color:"#c39142",
    type:"mushroom",
    keywords:"shitake"
},
portabella: {
    color:"#a6895b",
    type:"mushroom",
    keywords:"portobello,portabello,portobella"
},
white_button: {
    color:"#ded2bf",
    type:"mushroom",
    keywords:"white button mushroom"
},
truffle: {
    color:"#524C4E",
    type:"mushroom",
    shape:"fluffy"
},
morel: {
    color:"#d3b672",
    type:"mushroom",
    shape:"fungus_pointy_porous"
},
enoki: {
    color:"#e4d6ab",
    type:"mushroom",
    shape:"fungus_splayed"
},
seaweed: {
    color:"#2b8e2b",
    type:"vegetable",
    shape:"algae",
    stackShape:"rectangle_thinner",
    keywords:"algae,kelp,nori"
},
seed: {
    color:"#bcff82",
    type:"vegetable",
    group:"protein_plant",
    shape:"beans_some",
    placedShape:"beans_some",
    stackShape:"beans_some_flat",
    behavior:2,
    hidden:true,
    broken:null
},
sunflower_seed: {
    color:"#969078",
    type:"seed"
},
bean: {
    color:"#944e29",
    type:"seed",
    shape:"bean",
    behavior:0,
    hidden:true,
    scale:0.75,
    placedShape:"beans_some",
    stackShape:"beans_some_flat"
},
pine_nut: {
    type:"seed",
    color:"#e4d37c"
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
    scale:0.75,
    broken:"ground_peanut"
},
nut: {
    color:"#a0220e",
    type:"plant",
    shape:"fruit_nub",
    group:"protein_plant",
    hidden:true,
    dishWeight:-20,
    scale:0.75,
    broken:"ground_nut"
},
ground_nut: {
    color:"#a9663c",
    type:"powder",
    shape:"powder_rough",
    group:"protein_plant",
    hidden:true,
    dishWeight:-20,
    adj:"nut",
    meltPoint:70,
    meltInto:"nut_butter"
},
ground_peanut: {
    color:"#dcac7c",
    type:"ground_nut",
    adj:"peanut",
    meltPoint:70,
    meltInto:"peanut_butter"
},
ground_almond: {
    color:"#efdecd",
    type:"ground_nut",
    adj:"almond",
    reactions: {
        "water": { set1:"almond_milk", set2:null }
    }
},
cereal_plant: {
    color:"#e7bb42",
    type:"plant",
    group:"carb",
    broken:"flour",
    hidden:true
},
wheat: {
    type:"cereal_plant",
    keywords:"grain,cereal,plant,grass"
},
barley: {
    type:"cereal_plant"
},
sorghum: {
    type:"cereal_plant",
    keywords:"broomcorn"
},
rye: {
    type:"cereal_plant"
},
oat: {
    type:"cereal_plant",
    broken:"oat_seed",
    color:"#DDB88B"
},
oat_seed: {
    type:"seed",
    group:"carb",
    color:"#DDB88B",
    dishName:"oat",
    keywords:"oatmeal,oats"
},
apple: {
    color:["#ff1f40","#ffd20c","#5ad700"],
    innerColor:"#ffeda4",
    type:"fruit",
    shape:"fruit_bipod_stem",
    broken:"apple_juice"
},
apple_juice: {
    type:"fruit_juice",
    color:"#fffb91"
},
banana: {
    color:"#ffe135",
    innerColor:"#fffbc9",
    type:"fruit",
    shape:"curve_thick",
    broken:"mashed_banana"
},
mashed_banana: {
    color:"#fffbc9",
    type:"banana",
    shape:"liquid_splat",
    keywords:"banana mash",
    adj:"banana"
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
    shape:"circle"
},
pomelo: {
    color:"#F2E176",
    innerColor:"#EF8F7B",
    scale:1.5,
    type:"citrus",
    shape:"circle"
},
citron: {
    color:"#F2E176",
    innerColor:"#fae699",
    scale:1.5,
    type:"citrus",
    shape:"fruit_nubs_rough"
},
buddhas_hand: {
    name:"Buddha's Hand",
    type:"citron",
    shape:"four_splay",
    adj:"buddhist"
},
watermelon_slice: {
    color:"#ff6666",
    shape:"circle_chord",
    name:"watermelon",
    type:"watermelon"
},
breadfruit: {
    color:"#7ebf60",
    innerColor:"#e5c8ab",
    scale:1.5,
    r:-90,
    type:"fruit",
    shape:"buds"
},
jackfruit: {
    color:"#b3ba6e",
    innerColor:"#F1C234",
    scale:2,
    r:-90,
    type:"fruit",
    shape:"buds"
},
orange: {
    color:"#FFA500",
    innerColor:"#FFD700",
    type:"citrus",
    shape:"circle",
    broken:"orange_juice"
},
mandarin_orange: {
    color:"#ff8800",
    type:"orange",
    scale:0.75,
},
tangerine: {
    color:"#ff6a00",
    innerColor:"#ff9500",
    type:"citrus",
    shape:"oval_thick_horizontal"
},
orange_slice: {
    type:"orange",
    shape:"circle_chord",
    name:"orange"
},
orange_juice: {
    type:"fruit_juice",
    color:"#FFD700",
    adj:"orange",
    short:"=OJ=",
    reactions: {
        water: { tempMin:95, set2:"marmalade", set1:null }
    }
},
pineapple: {
    color:"#e6ae25",
    type:"fruit",
    shape:"oval_leafy",
    adj:"hawaiian",
    scale:1.5
},
mango: {
    color:["#F4BB44","#FF8040"],
    type:"fruit",
    shape:"oval_thick_horizontal"
},
avocado: {
    color:"#568203",
    innerColor:"#B2C248",
    type:"fruit",
    shape:"fruit_extrude",
    broken:"guacamole"
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
    shape:"fruit_extrude",
    keywords:"pawpaw"
},
quince: {
    color:"#C0B91B",
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
    shape:"pick",
    keywords:"litchi",
    innerColor:"#E1DECD"
},
ackee: {
    color:"#e8764c",
    type:"fruit",
    shape:"oval_bi",
    scale:0.75,
    keywords:"acki,akee,ackee apple"
},
blueberry: {
    color:["#4f86f7","#312581","#492581"],
    type:"berry",
    shape:"circle_ms_calyx",
},
huckleberry: {
    color:["#0b0052","#244da6","#a93e09"],
    type:"berry",
    shape:"circle_ms_calyx",
},
currant: {
    color:["#202034","#B6012E","#D9C4A6"],
    type:"berry"
},
acai: {
    color:"#604654",
    type:"berry",
    name:"açaí"
},
elderberry: {
    color:"#3F3C66",
    type:"berry"
},
gooseberry: {
    color:"#8DA415",
    type:"berry"
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
    keywords:"dry grape,dried grape,dehydrated grape"
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
blue_raspberry: {
    color:"#0b19e3",
    type:"raspberry"
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
cloudberry: {
    color:"#ec8748",
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
    scale:0.6
},
olive: {
    color:"#808000",
    type:"berry",
    shape:"oval_thick_hole",
    scale:0.75,
    broken:"olive_oil"
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
    type:"plum"
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
    stackShape:"rectangle_thinner_tablet",
    broken:"tomato_sauce"
},
yellow_tomato: {
    color:"#ffcb3c",
    type:"tomato",
    innerColor:"#ffcb3c"
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
citrus_juice: {
    type:"fruit_juice",
    color:"#fbf9c2",
    hidden:true,
    adj:"citric"
},
lemon_juice: {
    type:"citrus_juice",
    color:"#fbf9c2",
    reactions: {
        water: { set1:null, set2:"lemon_water" }
    },
    adj:"lemon"
},
lemon_water: {
    type:"lemon_juice",
    color:"#c2f8e6",
    reactions: {
        sugar: { set1:"lemonade", set2:null }
    },
    adj:"lemon"
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
    broken:"lime_juice",
},
lime_juice: {
    type:"citrus_juice",
    color:"#ccfbc2",
    adj:"lime",
    keywords:"limeade"
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
rambutan: {
    color:"#AD2523",
    innerColor:"#C2B49A",
    type:"fruit",
    shape:"fruit_long_thorny"
},
coconut: {
    color:"#965A3E",
    innerColor:"#e9edf6",
    type:"fruit",
    shape:"circle_rough",
    scale:1.25,
    broken:"coconut_milk"
},
coconut_milk: {
    type:"fruit_juice",
    color:"#e9edf6"
},
durian: {
    color:"#a88c45",
    innerColor:"#e1bd27",
    type:"fruit",
    shape:"circle_thorny_ml",
    scale:1.25
},
passionfruit: {
    color:"#5A4223",
    innerColor:"#E29B2B",
    type:"fruit",
    shape:"circle_rough",
    scale:1.25,
    keywords:"passion fruit"
},
mangosteen: {
    color:"#78323B",
    innerColor:"#dcd7dc",
    type:"fruit",
    shape:"oval_thick_horizontal",
    keywords:"purple mangosteen"
},
rose_apple: {
    color:"#E96F6E",
    innerColor:"#e3dcd5",
    type:"fruit",
    shape:"fruit",
    keywords:"wax jambu"
},


leaf_vegetable: {
    color:"#41d841",
    type:"vegetable",
    shape:"leaf_vegetable",
    hidden:true,
    broken:null,
    brokenShape:"foliage_bar"
},
root_vegetable: {
    color:"#CC8D57",
    type:"vegetable",
    shape:"root",
    hidden:true,
    broken:null,
    brokenShape:"squares_some"
},
carrot: {
    color:"#ED9121",
    type:"root_vegetable",
    shape:"needle"
},
bamboo_shoot: {
    color:"#B3AC10",
    innerColor:"#D0E3CF",
    type:"vegetable",
    shape:"needle",
    adj:"bamboo",
    keywords:"bamboo chute",
    broken:null
},
artichoke: {
    color:"#338844",
    innerColor:"#d1d768",
    type:"vegetable",
    shape:"buds"
},
eggplant: {
    color:"#9b0cb0",
    innerColor:"#EFDEA9",
    type:"vegetable",
    shape:"curve_plump",
    keywords:"aubergine"
},
asparagus: {
    color:"#83b020",
    type:"vegetable",
    shape:"rod_flared_leafy"
},
celery: {
    color:"#b9de6f",
    type:"vegetable",
    shape:"rod_flared_leafy"
},
broccoli: {
    color:"#5b9c3f",
    type:"vegetable",
    shape:"leaf_vegetable"
},
broccolini: {
    type:"broccoli",
    shape:"rod_flared_leafy",
    keywords:"aspabroc,baby broccoli"
},
cabbage: {
    color:"#7f9f3f",
    type:"leaf_vegetable",
    shape:"circle_leafed",
    stackShape:"foliage_bar"
},
lettuce: {
    color:"#a7e42d",
    type:"leaf_vegetable",
    shape:"circle_leafed",
    stackShape:"foliage_bar",
    keywords:"salad"
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
    shape:"spiral_s"
},
red_cabbage: {
    color:"#7f3f7f",
    type:"cabbage",
    keywords:"purple cabbage"
},
kohlrabi: {
    color:"#EAE5AA",
    type:"cabbage",
    keywords:"German turnip,turnip cabbage"
},
brussels_sprout: {
    color:"#7ca52a",
    type:"cabbage",
    keywords:"brussel sprouts,brussels sprouts",
    scale:0.75
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
    adj:"chicory",
},
ginseng: {
    color:"#e7ca60",
    type:"root_vegetable"
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
    shape:"bulb_down",
    short:"beet",
    broken:"vegetable_juice"
},
sugar_beet: {
    color:"#e0d895",
    innerColor:"#e6e2c3",
    type:"beetroot",
    broken:"brown_sugar"
},
sugar_cane: {
    color:"#b1cf5d",
    type:"plant",
    shape:"rod_flared_leafy",
    broken:"brown_sugar"
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
    type:"bean",
    keywords:"adzuki bean,red bean"
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
    keywords:"garbanzo bean,ceci bean",
    broken:"hummus"
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
    shape:"curve"
},
pea: {
    color:"#6f9f3f",
    type:"vegetable",
    shape:"circle_s"
},
soybean: {
    color:"#d3ce71",
    type:"bean",
    shape:"bean_eyed",
    keywords:"soya bean,soy bean",
    broken:"soy_sauce"
},
coffee_bean: {
    color:"#7f402b",
    type:"bean",
    broken:"coffee_ground",
    reactions: {
        water: { set2:"coffee" }
    }
},
coffee_ground: {
    color:"#7f402b",
    type:"powder",
    shape:"powder_rough",
    adj:"coffee",
    reactions: {
        water: { set1:null, set2:"coffee" }
    },
    dissolve:true
},
cocoa_bean: {
    color:"#a84221",
    type:"bean",
    broken:"chocolate_powder",
    keywords:"cacao bean"
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
basil: {
    color:"#19aa40",
    type:"herb"
},
cress: {
    color:"#6cbe4c",
    type:"herb",
    keywords:"garden cress"
},
bay_leaf: {
    color:"#9a851e",
    type:"herb"
},
curry_leaf: {
    color:"#297920",
    type:"herb"
},
dill: {
    color:"#0b903e",
    type:"herb"
},
lavender: {
    color:"#be5cb7",
    type:"herb"
},
sakura: {
    color:["#ffbadc","#ff90c8","#ff71b8"],
    type:"decor",
    shape:"spheroid_prolate",
    scale:0.5,
    r:shapeMeta.quadRotation,
    keywords:"cherry blossom,petal,flower",
    brokenShape:"squares_some_flat"
},
mint: {
    color:"#1a9e16",
    type:"herb",
    adj:"minty"
},
oregano: {
    color:"#5d9a0e",
    type:"herb"
},
parsley: {
    color:"#00ca47",
    type:"herb"
},
rosemary: {
    color:"#1d9000",
    type:"herb"
},
rue: {
    color:"#84a819",
    type:"herb"
},
sage: {
    color:"#38934a",
    type:"herb"
},
peppermint: {
    color:"#00c728",
    type:"herb"
},
thyme: {
    color:"#6eb867",
    type:"herb"
},
tea_leaf: {
    color:"#63B343",
    type:"herb",
    shape:"leaf",
    keywords:"tea leaves,tea plant",
    reactions: {
        water: { set2:"tea" }
    },
    broken:"matcha"
},
matcha: {
    color:"#7dd15b",
    type:"powder",
    shape:"powder_rough",
    keywords:"matcha powder,compressed tea powder",
    reactions: {
        water: { set2:"tea" }
    },
    dissolve:true
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
    shape:"bulb",
    stackShape:"rectangle_thinner_ring",
    broken:"onion_powder"
},
onion_powder: {
    color:"#f3dabe",
    type:"spice",
    adj:"onion"
},
shallot: {
    color:"#7e5172",
    type:"onion"
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
chili_powder: {
    type:"spice",
    reactions: {
        "water": { set1:null, set2:"chili_sauce" },
        "vinegar": { set1:null, set2:"hot_sauce" },
        "tomato_sauce": { set1:null, set2:"salsa" }
    },
    color:"#d04314",
    adj:"spicy"
},
hot_sauce: {
    type:"sauce",
    color:"#d01414",
    adj:"spicy"
},
chili_sauce: {
    type:"sauce",
    color:"#a10000",
    adj:"spicy"
},
salsa: {
    type:"sauce",
    color:"#a10000",
    adj:"spicy",
    keywords:"salsa roja"
},
chili_pepper: {
    type:"pepper",
    adj:"spicy",
    shape:"hook_stem",
    keywords:"chilli pepper,chile pepper",
    broken:"chili_powder"
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
ghost_pepper: {
    color:"#e31515",
    type:"chili_pepper",
    shape:"fruit_pick_stem",
    adj:"ultra spicy"
},
pepper_x: {
    color:"#C6C52F",
    type:"chili_pepper",
    shape:"fruit_pick_stem",
    adj:"ultra spicy"
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
    broken:"wasabi",
    adj:"wasabi"
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
    type:"tuber",
    broken:"mashed_potato",
    cookName:"baked potato",
},
chip: {
    color:"#ecdb8f",
    cookColor:"#625026",
    broken:"crumbs",
    shape:"bean_l",
    keywords:"potato chip,lays,potato crisp",
    name:"potato chip",
    dishName:"chip",
    scale:0.8,
    r:shapeMeta.octRotation
},
corn_chip: {
    color:"#dfcb6a",
    type:"chip",
    shape:["triangle_diagonal","triangle_diagonal_barbed"],
    keywords:"tortilla chip,doritos,nacho,corn crisp"
},
fry: {
    color:"#dfcb6a",
    name:"french fry",
    dishName:"fries",
    shape:"rectangle_vertical_thinnest",
    keywords:"chip,chips,steak fry",
    scale:1.5,
    width:0.1,
    height:0.7
},
purple_potato: {
    color:"#61696A",
    innerColor:"#513768",
    type:"potato"
},
mashed_potato: {
    color:"#ecddcd",
    type:"potato",
    shape:"liquid_splat"
},
sweet_potato: {
    color:"#c47e2e",
    innerColor:"#ffa646",
    type:"tuber",
    broken:null,
    brokenShape:"liquid_splat"
},
yam: {
    color:"#876e52",
    innerColor:"#f1d9a4",
    type:"tuber"
},
ube: {
    color:"#875c52",
    innerColor:"#ae55b9",
    type:"yam",
    keywords:"purple yam,ube halaya,halayang ube"
},
cassava: {
    color:"#6E3924",
    innerColor:"#E9EAED",
    type:"tuber",
    keywords:"manioc,yuca,tapioca",
    broken:"tapioca_pearl"
},
tapioca_pearl: {
    color:"#2c170e",
    group:"vegetable",
    shape:"circle_ms",
    keywords:"tapioca ball,boba,bubble tea",
    a:0.75
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
    type:"root_vegetable",
    reactions: {
        water: { set2:"tea", tempMin:70 }
    },
    adj:"ginger",
},
corn: {
    color:"#e8d525",
    type:"vegetable",
    group:"carb",
    shape:"rod_bumpy",
    keywords:"maize",
    meltPoint:180,
    meltInto:"popcorn",
    broken:"cornstarch"
},
blue_corn: {
    color:"#3D394C",
    type:"corn"
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
    adj:"garlic"
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
    keywords:"jack-o'-lantern,jack o'lantern,jackolantern,jack-o-lantern",
    broken:["pumpkin_mash","pumpkin_seed"]
},
pumpkin_mash: {
    type:"paste",
    color:"#ffdd9d",
    adj:"pumpkin",
    shape:"liquid_splat"
},
pumpkin_seed: {
    type:"seed",
    color:"#ffdd9d",
    adj:"pumpkinseed",
    shape:"spheroid_prolate",
    placedShape:"spheroid_prolate"
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
    reactions: {
        "vinegar": { set1:"pickle" }
    },
    shape:"rod_bumpy",
    stackShape:"rectangle_thinner_tablet",
    keywords:"cuke"
},
pickle: {
    color:"#5e790c",
    innerColor:"#b5a424",
    type:"cucumber",
    keywords:"pickled cucumber,gherkin",
    broken:"relish"
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
    shape:"leaf_rough"
},
anise: {
    type:"spice",
    color:"#b38e45",
    keywords:"aniseed,anix"
},
star_anise: {
    type:"spice",
    color:"#b1662f",
    placedShape:"stars_some",
    stackShape:"stars_some_flat",
    keywords:"star aniseed,star of anise,badian"
},
cardamom: {
    type:"spice",
    color:"#DCB593",
    keywords:"cardamon,cardamum"
},
cinnamon_strip: {
    type:"plant",
    color:"#E49961",
    shape:"rod_flared",
    broken:"cinnamon"
},
cinnamon: {
    type:"spice",
    color:"#E49961"
},
licorice_root: {
    type:"root_vegetable",
    color:"#b59983",
    broken:"licorice",
    keywords:"liquorice root",
    adj:"licorice"
},
licorice: {
    type:"spice",
    color:"#64442C",
    keywords:"liquorice"
},
cinnamon: {
    type:"spice",
    color:"#E49961"
},
clove: {
    type:"spice",
    color:"#6d4035",
    placedShape:"rods_some"
},
cumin: {
    type:"spice",
    color:"#CA7B42"
},
nutmeg: {
    type:"spice",
    color:"#826A41"
},
poppy_seed: {
    type:"spice",
    color:"#393A45",
    keywords:"poppyseed",
    adj:"poppyseed"
},
saffron: {
    type:"spice",
    color:"#DD5549"
},
sesame: {
    type:"spice",
    color:"#DFE1A4",
    keywords:"sesame seeds,benne,gingelly"
},
szechuan_pepper: {
    type:"spice",
    color:"#753234",
    keywords:"Sichuan pepper,Szechwan pepper,scecuan,scezuan"
},
sumac: {
    type:"spice",
    color:"#622128"
},
tamarind: {
    type:"spice",
    color:"#9F7C66"
},
turmeric: {
    type:"spice",
    color:"#F89717",
    keywords:"tumeric"
},
vanilla_bean: {
    type:"bean",
    color:"#442921",
    shape:"curve",
    broken:"vanilla",
    adj:"vanilla"
},
vanilla: {
    type:"spice",
    color:"#442921",
    reactions: {
        water: { set1:"vanilla_extract", set2:null },
        alcohol: { set1:"vanilla_extract", set2:null }
    },
    adj:"vanilla"
},
vanilla_extract: {
    type:"liquid",
    color:"#442921",
    parts:["vanilla"],
    adj:"vanilla"
},

herb: {
    color:"#35b135",
    type:"vegetable",
    reactions: {
        water: { set2:"tea", tempMin:70 }
    },
    shape:"leaf_rough",
    adj:"herbal",
    hidden:true,
    broken:null,
    brokenShape:"squares_some",
    stackShape:"squares_some_flat"
},

acorn: {
    color:"#915111",
    type:"nut",
    shape:"nut_cap"
},
chestnut: {
    color:"#962800",
    type:"nut",
    shape:"bulb"
},
hazelnut: {
    color:"#a06e28",
    type:"nut"
},
walnut: {
    color:"#b7833a",
    type:"nut",
    shape:"circle_rough"
},
almond: {
    color:"#aa6c3b",
    innerColor:"#efdecd",
    type:"nut",
    shape:"spheroid_prolate",
    broken:"ground_almond"
},
cashew_nut: {
    name:"cashew",
    color:"#cdb816",
    type:"nut",
    shape:"semitorus_thick_left"
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
    shape:"semitorus_thick_left",
    dishWeight:100
},
rice: {
    color:"#d2cdad",
    group:"carb",
    shape:"beans_some",
    placedShape:"beans_some",
    stackShape:"beans_some_flat",
    type:"powder",
    pin:true,
    broken:"rice_flour",
    keywords:"white rice",
    whipped:"mochi"
},
brown_rice: {
    type:"rice",
    color:"#c89a65"
},
black_rice: {
    type:"rice",
    color:"#37252f"
},
noodles: {
    type:"pasta",
    shape:"noodles",
    keywords:"spaghetti,ramen noodles,vermicelli,worm pasta"
},
rice_noodles: {
    color:"#d4d2c6",
    type:"noodles",
    parts:["rice"],
    keywords:"pho"
},
macaroni: {
    type:"pasta",
    shape:"semitorus_thick_left",
    short:"mac"
},
bread: {
    color:"#ddc69c",
    cookColor:"#a5700d",
    group:"carb",
    shape:"loaf",
    broken:"breadcrumbs",
    stackShape:"rectangle_thinner",
    cookName:"toast",
    keywords:"sandwich"
},
flatbread: {
    type:"bread",
    shape:"rectangle_thinnest",
    stackShape:null,
    scale:2,
    height:0.3,
    width:1,
    keywords:"pita,naan,roti,pizza bread,tortilla,corn wrap,tortilla wrap"
},
baguette: {
    type:"bread",
    shape:"rod",
    stackShape:"rectangle_thinner_round",
    scale:2,
    keywords:"french bread,breadstick,bread stick"
},
pretzel: {
    type:"bread",
    color:"#cf9f4c",
    shape:"pretzel"
},
chocolate_wafer: {
    type:"bread",
    color:"#4f2d1f",
    shape:"rectangle_thinnest",
    stackShape:null,
    scale:2,
    height:0.4,
    width:1,
    keywords:"oreo,ice cream sandwich",
    parts:["chocolate"]
},
chocolate_cup: {
    type:"bread",
    color:"#4f2d1f",
    shape:"angle_bracket_up_thin_top",
    stackShape:null,
    scale:2,
    height:0.4,
    width:1,
    keywords:"reeses",
    dishName:"cup",
    parts:["chocolate"]
},
taco_shell: {
    type:"bread",
    shape:"square_u_thin_top",
    stackShape:null,
    scale:2,
    height:0.4,
    width:1,
    dishName:"taco"
},
cupcake_wrapper: {
    type:"utensil",
    color:shapeMeta.colorsPastel,
    shape:"angle_bracket_up_thin_top",
    stackShape:null,
    scale:2,
    height:0.4,
    width:1,
    keywords:"cupcake cup,muffin wrapper,muffin cup",
    dishName:"cupcake"
},
crouton: {
    type:"bread",
    color:"#bd8336",
    shape:"rectangle_round_rough",
    stackShape:null,
    scale:0.75,
    dishName:null
},
crumbs: {
    color:"#c4bba9",
    type:"powder",
    shape:"powder_rough",
    hidden:true
},
breadcrumbs: {
    color:"#ddc69c",
    type:"crumbs",
    keywords:"bread crumbs",
    adj:"breaded"
},
granola: {
    color:"#9C6624",
    type:"powder",
    shape:"powder_rough",
    keywords:"oats",
    parts:["oat_seed"]
},
bun: {
    type:"bread",
    shape:"rectangle_round",
    height:0.75,
    stackShape:null
},
bottom_bun: {
    type:"bun",
    shape:"rectangle_thin_round",
    dishName:"bun",
    height:0.5,
    keywords:"hamburger bun"
},
top_bun: {
    type:"bun",
    shape:"semicircle_top",
    height:0.6,
    dishName:"bun",
    keywords:"hamburger bun"
},
bagel: {
    type:"bread",
    shape:"torus_thick",
    stackShape:"torus_side"
},
pastry: {
    color:"#d9ad61",
    shape:"torus_side",
    hidden:true
},
donut: {
    type:"pastry",
    color:"#eaa52f",
    shape:"torus_thick",
    stackShape:"torus_side",
    keywords:"doughnut"
},
cookie: {
    color:"#b67f26",
    group:"carb",
    shape:"circle_porous",
    stackShape:"rectangle_thinner_round_porous",
    broken:"cookie_butter"
},
gingerbread_man: {
    color:"#BD7129",
    type:"cookie",
    shape:"figure",
    stackShape:null
},
pancake: {
    type:"cake",
    color:"#f9dc7a",
    shape:"circle",
    scale:1.25,
    stackShape:"rectangle_thinner_round"
},
waffle: {
    type:"cake",
    color:"#ffb950",
    shape:"circle_lattice",
    scale:1.25,
    stackShape:"rectangle_thinner_ridged"
},
cracker: {
    color:"#eaac4a",
    group:"carb",
    shape:"square_ridged",
    stackShape:"rectangle_thinner_ridged",
    broken:"breadcrumbs"
},
graham_cracker: {
    type:"cracker",
    color:"#ae722d"
},
corn_flake: {
    color:"#e2c374",
    group:"carb",
    shape:["polygon_irregular","hexagon","lens","semiheart"],
    dishName:"cereal",
    r:shapeMeta.quadRotation
},


meat: {
    color:"#ff6e78",
    cookColor:"#5b2a20",
    group:"meat",
    shape:"cutlet",
    hidden:true,
    dishWeight:-10,
    broken:"ground_meat"
},
shellfish: {
    type:"meat"
},
ground_meat: {
    type:"meat",
    shape:"powder_rough",
    stackShape:"squares_some_flat",
    behavior:2,
    adj:"meat"
},
sausage: {
    type:"meat",
    shape:"rectangle_thinner_round",
    scale:1.25,
    keywords:"hotdog"
},
beef: {
    color:"#ff4d58",
    type:"meat",
    keywords:"meat,beef steak,cow,cattle,bull,buffalo",
    cookName:"steak",
    pin:true
},
beef_patty: {
    type:"beef",
    shape:"rectangle_thinner_round",
    keywords:"hamburger,borger",
    dishName:"burger",
    cookName:null,
    height:0.5
},
plant_patty: {
    type:"beef_patty",//not really
    color:"#ff8b4d",
    shape:"rectangle_thinner_round",
    keywords:"vegan patty,vegetarian patty,plant meat,vegan meat,vegan beef,impossible burger,beyond meat burger,beyond burger",
    dishName:"vegan burger",
    cookName:null,
    height:0.5
},
meatball: {
    type:"meat",
    color: "#72543c",
    shape:"circle_ms",
    cookName:null,
    scale: 0.75
},
veal: {
    color:"#c37c81",
    type:"beef",
    keywords:"calf,baby cow,beef"
},
calf_brain: {
    color:"#e06069",
    type:"beef",
    shape:"brain",
    stackShape:"brain",
    keywords:"brain,cow brain"
},
beef_tongue: {
    color:"#e060a6",
    type:"beef",
    shape:"rectangle_thin_round",
    stackShape:"rectangle_thin_round",
    dishName:"tongue",
    keywords:"tounge,toungue"
},
mutton: {
    color:"#d83a44",
    type:"meat",
    keywords:"sheep,ewe,ram"
},
lamb: {
    color:"#eb666f",
    type:"mutton",
    keywords:"baby sheep,mutton"
},
pork: {
    color:"#f79ea4",
    type:"meat",
    keywords:"pig,swine,boar,hog,sow,porkchop",
    stackShape:"rectangle_thinner_round"
},
ham: {
    color:"#eda2a7",
    type:"pork"
},
spam: {
    color:"#DA9797",
    type:"ham",
    shape:"square_round"
},
salami: {
    color:"#e47883",
    type:"pork",
    shape:"circle_rough",
    stackShape:"rectangle_thinner_round",
    scale:0.8
},
pepperoni: {
    color:"#de4252",
    type:"pork",
    shape:"circle_rough",
    stackShape:"rectangle_thinner_tablet",
    scale:0.7
},
pork_liver: {
    color:"#b76e5b",
    type:"pork",
    short:"liver",
    shape:"bean_l"
},
bacon: {
    color:"#c67f75",
    type:"pork",
    shape:"rod_rough_thin",
    stackShape:"rectangle_thinner"
},
venison: {
    color:"#782d32",
    type:"meat",
    keywords:"deer,doe,buck,elk"
},
rabbit: {
    color:"#cba3a5",
    type:"meat",
    keywords:"bunny"
},
goat: {
    color:"#df7e85",
    type:"meat",
    keywords:"sheep,ewe,ram"
},
kangaroo: {
    color:"#8e2444",
    type:"meat",
    keywords:"deer,doe,buck,elk"
},
horse: {
    color:"#C05966",
    type:"meat",
    keywords:"horse meat"
},
clam: {
    color:"#857f66",
    type:"shellfish",
    shape:"clam"
},
mussel: {
    color:"#686876",
    type:"shellfish",
    shape:"clam"
},
oyster: {
    color:"#886c4b",
    type:"shellfish",
    shape:"clam"
},
scallop: {
    color:"#9b5b5b",
    type:"shellfish",
    shape:"clam"
},
snail: {
    color:"#6e3124",
    type:"shellfish",
    shape:"snail",
    keywords:"escargot,nerite"
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
chicken_patty: {
    type:"chicken",
    shape:"rectangle_thinner_round",
    keywords:"chicken burger",
    height:0.5
},
chicken_foot: {
    type:"chicken",
    shape:"talon",
    stackShape:"talon",
    color:"#dec69b",
},
chicken_nugget: {
    type:"chicken",
    shape:"foliage",
    stackShape:"foliage",
    color:"#ba7836",
    keywords:"chicken nuggie"
},
turkey: {
    color:"#ffd3d6",
    type:"poultry"
},
duck: {
    color:"#f5a8ad",
    type:"poultry"
},
balut: {
    color:"#142337",
    type:"duck",
    shape:"embryo",
    stackShape:"embryo",
    scale:0.75,
},
goose: {
    color:"#f5a8ad",
    type:"poultry"
},
fish: {
    color:"#4edeff",
    innerColor:"#daafaf",
    cookColor:"#d0891f",
    type:"meat",
    shape:"fish",
    keywords:"seafood,pescetarian",
    pin:true
},
tuna: {
    color:"#005982",
    type:"fish"
},
mackerel: {
    color:"#2177a0",
    type:"fish"
},
salmon: {
    color:"#c74949",
    type:"fish"
},
cod: {
    color:"#d1bf7f",
    type:"fish"
},
eel: {
    color:"#ba8b0b",
    type:"fish",
    shape:"worm"
},
herring: {
    color:"#8fa4b9",
    type:"fish"
},
red_herring: {
    color:"#c92424",
    type:"fish",
    props: {
        vr: 1000
    },
    hidden: true
},
anchovy: {
    color:"#aebfd0",
    type:"fish"
},
sardine: {
    color:"#aed0c3",
    type:"fish"
},
jellyfish: {
    color:["#e87997","#b879e8","#8479e8","#79b2e8"],
    shape:"jellyfish",
    broken:"jelly",
    group:"meat"
},
frog_leg: {
    color:"#ffdddf",
    shape:"leaf_stem",
    type:"meat",
    r:90,
    height: 0.5
},
shellfish: {
    type:"meat",
    hidden:true
},
crustacean: {
    color:"#f13851",
    cookColor:"#ff6523",
    type:"shellfish",
    shape:"crustacean",
    hidden:true
},
crab: {
    color:"#f14d38",
    type:"crustacean",
    keywords:"crustacean,seafood"
},
blue_crab: {
    color:"#584491",
    type:"crab"
},
lobster: {
    color:"#e41732",
    type:"crustacean",
    keywords:"crustacean,seafood",
    shape:"lobster"
},
blue_lobster: {
    color:"#584491",
    type:"lobster"
},
crayfish: {
    color:"#c1653e",
    type:"crustacean",
    keywords:"crustacean,seafood",
    keywords:"crawfish,crawdads",
    shape:"lobster"
},
prawn: {
    color:"#e99073",
    type:"crustacean",
    keywords:"crustacean,seafood",
    shape:"shrimp"
},
shrimp: {
    color:"#e99073",
    type:"crustacean",
    keywords:"crustacean,seafood",
    shape:"shrimp",
    scale:0.75
},
cephalopod: {
    color:"#ffadd1",
    cookColor:"#ffe2ce",
    type:"shellfish",
    shape:"cephalopod",
    hidden:true
},
squid: {
    type:"cephalopod",
    keywords:"cephalopod,seafood"
},
octopus: {
    color:"#cd3b7a",
    type:"cephalopod",
    keywords:"cephalopod,seafood"
},
bone: {
    color:"#ebebeb",
    group:"protein_other",
    shape:"bone",
    broken:"gelatin"
},
gelatin: {
    type:"powder",
    color:"#ebebeb",
    a:0.2,
    group:"protein_other",
    keywords:"gelatin",
    adj:"thick"
},
bacteria: {
    color:"#a9d623",
    reactions: {
        "juice": { set2:"alcohol" }
    },
    shape:"microbe",
    placedShape:"beans_some",
    stackShape:"beans_some_flat",
    adj:"stinky",
    scale:0.75,
    dishWeight:-10,
    keywords:"bacterium,germs,starter culture,fermentation,microbe,virus,bug",
    boilPoint:73,
    boilInto:null,
},
bug_juice: {
    type:"liquid",
    color:"#6fa663",
    adj:"exterminated",
    hidden:true
},
insect: {
    color:"#6cb528",
    shape:"bug",
    scale:0.75,
    dishWeight:-10,
    keywords:"bug,beetle",
    broken:"bug_juice"
},
spider: {
    color:"#301111",
    shape:["arachnid","arachnid","arachnid","arachnid","arachnid","arachnid","arachnid_venomous"],
    scale:0.75,
    adj:"scary",
    dishWeight:-10,
    keywords:"bug,arachnid",
    broken:"bug_juice"
},
worm: {
    color:"#b84444",
    shape:"worm",
    scale:0.75,
    dishWeight:-10,
    keywords:"earthworm,bug",
    broken:"bug_juice",
    r:shapeMeta.octRotation
},
maggot: {
    color:"#c9b47d",
    shape:"larva",
    scale:0.75,
    dishWeight:-10,
    keywords:"grub,bug,worm,larva",
    broken:"bug_juice",
    r:shapeMeta.octRotation
},


yoyleberry: {
    type:"berry",
    color:"#9901FF",
    shape:"circle_ms_leafed",
    reactions: {
        doll: { adj2:"steel", color2:"#969696" }
    }
},
dreamberry: {
    type:"yoyleberry",
    color:"#bc5fdb",
    keywords:"yoyleberry"
},


dye: {
    color:["#ff0000","#ffff00","#00ff00","#00ffff","#0000ff","#ff00ff"],
    type:"powder",
    hidden:true,
    stain:true,
    adj:"dyed",
    shape:"powder_rough",
    dishWeight:-60,
    delete:true,
    name:"random dye"
},
red_dye: {
    name:"red 40",
    color:"#ff0000",
    type:"dye",
    stain:true,
    adj:"red",
    keywords:"carmine,red 3,red no 3"
},
blue_dye: {
    name:"blue 1",
    color:"#0000ff",
    type:"dye",
    stain:true,
    adj:"blue"
},
indigo_dye: {
    name:"blue 2",
    color:"#8a008a",
    type:"dye",
    stain:true,
    adj:"purple",
    keywords:"purple dye,violet dye,blue dye"
},
yellow_dye: {
    name:"yellow 5",
    color:"#ffff00",
    type:"dye",
    stain:true,
    adj:"yellow"
},
orange_dye: {
    name:"yellow 6",
    color:"#ffa500",
    type:"dye",
    stain:true,
    adj:"orange"
},
green_dye: {
    name:"green 3",
    color:"#00ff00",
    type:"dye",
    stain:true,
    adj:"green"
},
squid_ink: {
    color:"#292929",
    type:"dye",
    stain:true,
    adj:"inky",
    landedShape:"liquid_splat",
    delete:false,
    keywords:"black dye"
},
pandan_extract: {
    color:"#75e169",
    type:"juice",
    stain:true,
    adj:"green",
    keywords:"green dye,pandan juice",
    // delete:true,
    dishWeight:-60
},


rock: {
    shape:"rock",
    color:"#676767",
    adj:"crunchy",
    hidden:true,
    keywords:"stone,earth",
    broken:"sand",
    meltPoint:300,
    meltInto:"lava"
},
lava: {
    type:"thick_liquid",
    color:"#ff8800",
    adj:"hot",
    hidden:true,
    temp:300,
    glow:"#ff0000",
    freezePoint:100,
    freezeInto:"rock",
    keywords:"magma,molten rock"
},
uranium: {
    type:"rock",
    color:"#526752",
    glow:"#00ff00",
    adj:"glowy",
    hidden:true,
    keywords:"plutonium"
},
boulder: {
    type:"rock",
    shape:"rock_ball",
    scale:3,
    hidden:true,
    broken:"sand"
},
sand: {
    type:"powder",
    shape:"powder_rough",
    color:"#e6d577",
    adj:"sandy",
    hidden:true
},
gallium: {
    shape:"trapezoid",
    color:"#cccccc",
    meltPoint:29.76,
    height:0.75,
    hidden:true,
    adj:"metallic"
},
acid: {
    type:"thick_liquid",
    hidden:true,
    color:"#70bd13",
    onCollide: (self, other) => {
        if (other.id === "acid") return;
        // deleteIngredient(other);
        // uncontainAll();
        changeIngredient(other,["acid","steam"]);
        self.skipContain = true;
    },
    adj: "corrosive"
},
knife: {
    type:"utensil",
    shape:"knife",
    hidden:true,
    height:0.5,
    r:[90,135],
    onCollide: (self, other) => {
        var reactions = ingredientAttr(other.id,"reactions");
        if (reactions && reactions.knife) return;
        toolData.blend.func(other);
    }
},
microplastic: {
    color:"#d0bfce",
    type:"powder",
    shape:"powder_rough",
    hidden:true,
    dishName:null
},
eye: {
    name:"googly eye",
    adj:"pet",
    color:"#ffffff",
    shape:"fisheye_dark",
    type:"decor",
    scale:0.4,
    keywords:"eyeball",
    broken:"microplastic",
    width:1
},
hat: {
    name:"top hat",
    adj:"dapper",
    color:"#303030",
    shape:"hat",
    type:"decor",
    scale:0.75,
    dishWeight:-205
},
doll: {
    color:["#9f9f9f","#f6ede4","#f3e7db","#f7ead0","#eadaba","#d7bd96","#a07e56","#825c43","#604134","#3a312a","#292420"],
    innerColor:"#ff7f7f",
    reactions: {
        knife: { shape1:"sus", color1:"#ff0000" },
        leek: { color1:"#00ffff" }
    },
    type:"meat",
    shape:"figure",
    adj:"human",
    dishName:"human salad",
    keywords:"human,person,guy",
    hidden:true,
    cookName:"horrors"
},
baby_doll: {
    type:"doll",
    scale:0.5,
    hidden:true
},
giant: {
    type:"doll",
    scale:2,
    hidden:true
},
r74n: {
    color:"#00ffff",
    type:"doll",
    shape:"figure",
    adj:"developer",
    dishName:"developer salad",
    cookColor:"#ff0000",
    hidden:true,
    reactions: {
        "rue": { color1:"#ffff00", shape2:"bowtie", color2:"#00ff00" }
    }
},
glue: {
    color:"#ffffff",
    type:"paste",
    hidden:true,
    adj:"sticky"
},
poison: {
    color:"#00ff00",
    type:"liquid",
    adj:"suspicious",
    hidden:true
},
support: {
    color:"#9a7960",
    type:"generic",
    shape:"rectangle_thinner",
    hidden:true,
    width:1,
    movable:false,
    dishName:null
},



}


dishRecipes = {

// generic
"pasta+cheese":"mac and cheese",
"mac and cheese+bread":"breaded mac",
"sausage+flour":"corndog",
"taco_shell":"taco",
"bread+sausage+bread?":"hotdog",
"hotdog+cheese":"cheesedog",
"bun+beef+bread":"hamburger",
"bread+beef_patty+bread":"hamburger",
"bread+chicken_patty+bread":"chicken burger",
"bread+lobster":"lobster roll",
"=top_bun+bottom_bun":"nothing burger",
"hamburger+cheese":"cheeseburger",
"hamburger+pizza":"cheeseburger",
"cheeseburger+lettuce+tomato+onion+ketchup+mustard+pickle":"krabby @patty@",
"krabby @patty@+dye":"pretty patty",
"bun+meat+bun":"meat burger",
"chicken_patty+bun+bun":"chicken burger",
"&bowl:~leaf_vegetable+vegetable":"vegetable salad",
"&bowl:~fruit+fruit+vegetable?+juice-":"fruit salad",
"batter+sugar":"cake",
"chocolate+gummy_worm":"mud pie",
"cheese+yolk+sugar":"cheesecake",
"cake+cheese":"cheesecake",
"flour+flour+flour+fat+fat+water":"pie",
"dough+vegetable":"vegetable pie",
"dough+fruit":"fruit pie",
"dough+meat":"meat pot pie",
"dough+sauce+cheese":"pizza",
"flatbread+sauce+cheese":"pizza",
"&stack:bread+sauce+cheese+bun-+taco_shell-":"pizza",
"pizza+pepperoni+bacon+sausage":"meatlover's pizza",
"pizza+salt+beef+cabbage":"reuben sandwich",
"pizza+basil":"pizza margherita",
"rice+fish+seaweed?":"sushi",
"rice+crab+cucumber+avocado":"california roll",
"=bread+bread":"nothing sandwich",
"=bread+bread+bread":"toast sandwich",
"=taco_shell":"nothing taco",
"garlic+bread":"garlic bread",
"garlic bread+cheese":"cheesy garlic bread",
"chocolate_wafer+ice_cream":"ice cream sandwich",
"bread+peanut_butter+fluff":"fluffernutter",
"bread+icing+sprinkles":"fairy bread",
"bread+butter+sprinkles":"fairy bread",
"bean+bread":"beans on toast",
"chocolate_wafer+marshmallow":"s'more",
"cracker+marshmallow":"s'more",
"cracker+cheese+cracker":"cheese and crackers",
"cracker+cheese":"cheese and cracker",
"&stack:peanut_butter+jam+bread+bread":"peanut butter jam sandwich",
"&stack:bread+bread+pizza-+beef_patty-":"sandwich",
"sandwich+beef+cheese+beef_patty-":"cheesesteak",
"sandwich+ground_meat":"sloppy joe",
"sandwich+meat_sauce":"sloppy joe",
"sloppy joe+mayonnaise+bacon+lettuce+tomato":"club sandwich",
"sandwich+ham+cheese":"ham and cheese sandwich",
"sandwich+bacon+lettuce+tomato":"=BLT=",
"sandwich+meatball":"meatball sub",
"bread+cheese+butter":"grilled cheese",
"&stack:yolk+batter-":"omelette",
"flour+flour+liquid+liquid+yolk+fat":"bread",
"flour+liquid+yolk+fat":"bread",
"flour+butter+sugar+yolk":"pound cake",
"flour+flour+flour+liquid+liquid+fat":"biscuit",
"flour+liquid+fat":"biscuit",
"flour+flour+liquid+yolk+fat":"muffin",
"&stack:~batter":"pancake",
"sugar+butter+milk":"fudge",
"chocolate+cream":"ganache",
"ice_cream+sauce":"sauce sundae",
"ice_cream+syrup":"syrup sundae",
"milkoid+cooked_yolk+sugar+vanilla?":"custard",
"custard+chocolate":"chocolate pudding",
"custard+banana":"banana pudding",
"cabbage+vinegar+oil?+salt?":"coleslaw",
"gelatin+sugar+water":"jello",
"chicken+hot_sauce":"buffalo wing",
"corn_flake+milkoid":"cereal",
"cereal_plant+bread":"plant bread",
"beef+pork":"churrasco",
"pork+flour":"pork saute",
"pork+flour+yolk":"tonkatsu",
"pork+cabbage":"twice-cooked pork",
"pork+garlic+bean":"feijoada",
"chicken+rice+spice":"khao man kai",
"flour+bean+onion":"black bean burger",
"hummus+flour":"falafel",
"pasta+yolk+cheese+spice?":"carbonara",
"broth+pasta+vegetable":"minestrone",
"&bowl:potato+oil":"fry",
"flour+onion+potato+spice":"samosa",
"cheese+wine":"fondue",
"tofu+broth":"miso soup",
"miso+broth":"miso soup",
"waffle_cone+shaved_ice":"snow cone",
"oat_seed+water":"oatmeal",
"&stack:cheese+cheese+cracker+meat":"cheese platter",
"dill+pickle":"dill pickle",
"rice+soy_sauce":"fried rice",
"fish+oil":"fried fish",
"beef+mashed_potato":"shepherd's pie",
"ground_meat+mashed_potato":"shepherd's pie",
"salt+black_pepper":"salt and pepper",
"cabbage+bacteria":"sauerkraut",
"rice+broth":"rice ball",
"brownie+sprinkles":"cosmic brownie",
"brownie+cookie":"brookie",
"skewer+meat":"meat kebab",
"skewer+vegetable":"vegetable kebab",
"skewer+candy":"lollipop",
"skewer+cake":"cake pop",
"skewer+ice":"popsicle",
"=skewer+skewer":"chopsticks",
"skewer+marshmallow":"camper's delight",
"skewer+carrot":"carrot on a stick",
"skewer+mochi":"dango",
"acai+granola":"açaí bowl",
"corn_chip+corn_chip":"nachos",
"fry+fish":"fish and chips",
"dough+banana":"banana bread",
"tea+tapioca_pearl":"boba",
"boba+milk":"milk tea",
"coffee+milk":"latte",
"squid":"calamari",
"cupcake_wrapper+batter":"cupcake",
"cupcake_wrapper+cake":"cupcake",
"&cup:cake":"cupcake",
"&cup:batter":"cupcake",
"fry+cheese+gravy":"poutine",
"cheese+maggot":"casu marzu",
"~flatbread+oil":"focaccia",
"~dough+oil":"focaccia",

// liquid combos
"milk+soda":"pilk",
"milk+cream?+sugar+yolk":"eggnog",
"soda+eggnog":"pilknog",
"milk+ice_cream+sugar?":"milkshake",
"milk+icing+sugar?":"milkshake",
"soda+milkshake":"pilkshake",
"root_beer+ice_cream":"root beer float",
"milk+vanilla+sugar":"angel milk",
"shaved_ice+milk":"smoothie",
"shaved_ice+water":"slushie",
"shaved_ice+juice":"slushie",
"caramel+soda+seltzer":"diet soda",
// cocktails
"orange_juice+alcohol":"screwdriver",
"tomato_sauce+alcohol":"bloody mary",

// br*nds
"chocolate_wafer+icing":"oreo",
"chocolate_wafer+cream":"oreo",
"lemonade+lime+seltzer":"sprite",
"chip+red_dye":"doritos",

// funny
"fish+chocolate":"le fishe au chocolat",
"eggplant+peach":"sussy",
"doll+doll+doll+doll":"friends",
"sandwich+doll":"idiot sandwich",
"doll+knife":"suspect",
"doll+fork":"chef",
"doll+sand":"sandman",
"sandman+energy":"pharaoh's curse",
"doll+uranium":"oppenheimer",
"uranium+water":"reactor",
"doll+boulder":"sisyphus",
"doll+fish":"marine biologist",
"=doll+eye":"cyclops",
"doll+doll+baby_doll+baby_doll?+baby_doll?":"family",
"doll+doll+baby_doll+baby_doll+baby_doll+baby_doll+baby_doll+baby_doll+baby_doll":"=WOAH!!=",
"black_eyed_pea+black_eyed_pea":"black eyed peas",
"sand+bread+bread":"sand-wich",
"rue+r74n":"explore with rue",
"spider+donut":"spider donut",
"&bowl:sand+water":"Sandboxels stew",
"&stack:sand+water":"beach",
"sand+water+fish":"ocean",
"egg+ham+pandan_extract":"green eggs and ham",
"&stack:=eye+eye":"pet plate",
"lettuce+chicken_foot":"number 15",
"hat+octopus":"dapperpus",
"pumpkin+knife":"jack-o'-lantern",
"&bowl:=leek":"leaky pot",
"&bowl:=leek":"leaky glass",
"=tomato+cucumber":"=V=eggie=T=ales",
"ice_cube+date":"cold shoulder",
"ice_cube+bone":"chilled bone",
"ice_cube+pepper":"chilly pepper",
"ice_cube+spice":"ice spice",
"dough+eye+eye":"pou",
"gumdrop+eye+eye":"shiny pou",
"beef+eye+eye":"charlie the steak",
"chicken_nugget+eye+eye":"gadagadigadagado",
"sandwich+energy":"sand-witch",
"corn_chip+hat":"bill cipher",
"chip+hat":"pringle",
"ice_cube+ice_cube+hat":"snowman",
"~ice_cube+ice_cube+baby_doll":"ice@ @ice@ baby",

// fandoms
"batter+yoyleberry":"yoylecake",
"cake+yoyleberry":"yoylecake",
"juice+yoyleberry":"yoylestew",
"water+yoyleberry":"yoylestew",
"broth+yoyleberry":"yoylestew",
"cheese_wheel+uranium":"@cheese@ orb",
"cheeseball+uranium":"@cheese@ orb",
"seltzer+sugar+citrus_juice+spice":"nuka cola",
"doll+leek":"miku",
"miku+sakura":"sakura miku",
"miku+red_dye":"teto",
"milk+yam+vanilla":"yam jam",
"coffee+orange_juice":"orange joe",

// sauces and soups
"tomato_sauce+chili_sauce+spice+salt?":"salsa",
"oil+garlic+basil+salt?+cheese?+seed?":"pesto",
"vinegar+mayonnaise?+onion+spice+sugar":"barbecue sauce",
"sauce+meat+bean+tomato?":"chili",
"broth+oil+spice":"curry",
"noodles+sauce":"spaghetti",
"noodles+coconut_milk":"laksa",
"noodles+broth":"ramen",
"pasta+sauce+cheese+cheese_sauce-":"lasagna",
"broth+meat+vegetable":"meat stew",
"broth+mushroom":"mushroom stew",
"milkoid+roux+shellfish":"shellfish chowder",
"milkoid+roux+fish":"fish chowder",
"milkoid+roux+vegetable":"vegetable chowder",
"poultry+pasta+broth+noodles-":"poultry noodle soup",
"beetroot+broth":"borscht",
"broth+rice_noodles+chicken":"chicken pho",
"broth+rice_noodles+beef":"beef pho",
"pasta+butter+parmesan":"fettuccine alfredo",
"butter+cayenne+vinegar":"buffalo sauce",
"mayonnaise+ketchup":"mayochup",
"~mayonnaise+mustard":"mayomust",
"~ketchup+mustard":"mustketch",
"meatball+spaghetti":"spaghetti and meatball",

}