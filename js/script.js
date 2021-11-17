const appName = 'Chef-o-tron';
const combinations = methods.length * modifiers.length * ingredients.length * products.length;

let methodsIndex = Math.floor((Math.random() * methods.length));
let modifiersIndex = Math.floor((Math.random() * modifiers.length));
let ingredientsIndex = Math.floor((Math.random() * ingredients.length));
let productsIndex = Math.floor((Math.random() * products.length));

let comboTextElement = document.getElementById('combinations');
comboTextElement.innerHTML = combinations.toLocaleString();

let zeitgeistRecipe = "Beans on toast";

let createNewItem = true;

Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function pimpMyMenu(history) {
    let method = methods[methodsIndex].toLowerCase();
    let modifier = modifiers[modifiersIndex].toLowerCase();
    let ingredient = ingredients[ingredientsIndex].toLowerCase();
    let product = products[productsIndex].toLowerCase();

    zeitgeistRecipe = method + " " + modifier + " " + ingredient + " " + product;
    zeitgeistRecipe = capitalizeFirstLetter(zeitgeistRecipe.trim());
    
    let textElement = document.getElementById('zeitgeistText');
    textElement.innerHTML = zeitgeistRecipe;
    if(history === true) {
        updateHistory();
    }
    updateIndexes();
    updatePageTitle(zeitgeistRecipe);
}

function updateHistory() {
    let state = {
        'methodsIndex': methodsIndex,
        'modifiersIndex': modifiersIndex,
        'ingredientsIndex': ingredientsIndex,
        'productsIndex': productsIndex
    };
    let title = zeitgeistRecipe;
    let url = `/?a=${methodsIndex}&b=${modifiersIndex}&c=${ingredientsIndex}&d=${productsIndex}`;
    history.pushState(state, title, url);
}

function updateIndexes(){
    methodsIndex = Math.floor((Math.random() * methods.length));
    modifiersIndex = Math.floor((Math.random() * modifiers.length));
    ingredientsIndex = Math.floor((Math.random() * ingredients.length));
    productsIndex = Math.floor((Math.random() * products.length));
}

function updateIndexesFromQSParams(){
    let QSparams = Object.fromEntries(new URLSearchParams(location.search));
    methodsIndex = QSparams.a && QSparams.a < methods.length ? QSparams.a : 0;
    modifiersIndex = QSparams.b && QSparams.b < modifiers.length ? QSparams.b : 0;
    ingredientsIndex = QSparams.c && QSparams.c < ingredients.length ? QSparams.c : 0;
    productsIndex = QSparams.d && QSparams.d < products.length ? QSparams.d : 0;
    if(methodsIndex == 0 && modifiersIndex == 0 && ingredientsIndex == 0 && productsIndex == 0){
        updateIndexes();
    }
}

function updatePageTitle(title){
    console.log(`${title} | ${appName}`);
}

window.addEventListener('popstate', (event) => {
    methodsIndex = event.state.methodsIndex;
    modifiersIndex = event.state.modifiersIndex;
    ingredientsIndex = event.state.ingredientsIndex;
    productsIndex = event.state.productsIndex;
    pimpMyMenu(false);
});

updateIndexesFromQSParams();

pimpMyMenu(createNewItem);