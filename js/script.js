const zeitgeist = "Oui chef"

let methods = [
    '',
    'Raw',
    'Pickled',
    'Compressed',
    'Sous-vide',
    'Freeze-dried',
    'Deconstructed',
    'Beer-battered',
    'Tempura',
    'Blowtorched',
    'Dehydrated',
    'Triple-cooked',
    'Gluten-free',
    'Spiralised',
    'Caramelised',
    'Hot-smoked',
    'Cold-smoked',
    'Salt-baked',
    'Vegetarian',
    'Vegan',
]

let modifiers = [
    '',
    'Heritage',
    'Heirloom',
    'Rare-breed',
    'Organic',
    'Grass-fed',
    'Foraged',
    'Hand-dived',
    'New season',
    'Dry-aged'
]

let ingredients = [
    '',
    'Salted caramel',
    'Candied bacon',
    'Pornstar martini',
    'Espresso martini',
    'Prosecco',
    'Blonde caramel',
    'White chocolate',
    'Cucumber',
    'Green tomato',
    'Sea herb',
    'Black truffle',
    'Oyster',
    'Oxtail',
    'Cod cheek',
    'Wagyu beef',
    'Pumpkin spice',
    'Rainbow carrot',
    'Locust',
    'Scallop',
    'Squid',
    'Guinea fowl',
    'Bloody mary',
    'Egg yolk',
    'Duck egg',
    'Market fish',
]

let products = [
    'Popcorn',
    'Sourdough',
    'Wensleydale',
    'Nachos',
    'Pigs in blankets',
    'Crème brûlée',
    'Panna cotta',
    'Crisps',
    'French fries',
    'Chips',
    'Souffle',
    'Fondant',
    'Ketchup',
    'Mayonaise',
    'Fondue',
    'Tartare',
    'Ceviche',
    'Ravioli',
    'Raviolo',
    'Pie',
    'Ice cream',
    'Sorbet',
    'Consommé',
    'Reduction',
    'Jus',
    'Sauce',
    'En-croute',
    'En papillote',
    'Mille-feuille'
]

Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function pimpMyMenu() {
    let method = methods.random().toLowerCase();
    let modifier = modifiers.random().toLowerCase();
    let ingredient = ingredients.random().toLowerCase();
    let product = products.random().toLowerCase();

    let zeitgeistRecipe = method + " " + modifier + " " + ingredient + " " + product;
    zeitgeistRecipe = capitalizeFirstLetter(zeitgeistRecipe.trim());
    
    let startText = zeitgeist.padEnd(zeitgeistRecipe.length, ".");

    // reels.default({ el:'.zeitgeist', from: startText, to: zeitgeistRecipe, animationDelay: 500 })

    let textElement = document.getElementById('zeitgeistText');
    textElement.innerHTML = zeitgeistRecipe;

}

pimpMyMenu();