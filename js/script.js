const zeitgeist = "Oui chef"

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