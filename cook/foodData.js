/*
[Ingredient Properties]
name: override default name
type: inherits properties from specified ingredient
group: other(default), generic(hidden), dairy, mineral, carb, fruit
shape: R74n Shapes file name, without .png
behavior: 0=default, 1=liquid, 2=powder
adj: adjective to describe ingredient in dish
hidden: true=hidden from ingredient list
color, r, g, b, h, s, l, rgb, hsl
*/

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
},
ketchup: {
    type:"liquid",
    color:"#ff2b2b",
},
oil: {
    type:"liquid",
    color:"#e7df97",
},
egg: {
    shape:"ovoid",
    color:"#F0EAD6",
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
cheese: {
    color:"#fec118",
    group:"dairy",
    shape:"wedge",
    adj:"cheesy"
},
red_apple: {
    color:"#ff1f40",
    group:"fruit",
    shape:"fruit_bipod_stem"
},
}