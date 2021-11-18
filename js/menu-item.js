const appName = 'CHEF-O-TRON';
const combinations = methods.full.length * modifiers.full.length * ingredients.full.length * products.full.length;

let methodsIndex = Math.floor((Math.random() * methods.full.length));
let modifiersIndex = Math.floor((Math.random() * modifiers.full.length));
let ingredientsIndex = Math.floor((Math.random() * ingredients.full.length));
let productsIndex = Math.floor((Math.random() * products.full.length));

let comboTextElement = document.getElementById('combinations');
comboTextElement.innerHTML = combinations.toLocaleString();

let zeitgeistRecipe = "Beans on toast";

let createNewItem = true;

function generateMenuIdea(history) {
    let method = methods.full[methodsIndex].toLowerCase();
    let modifier = modifiers.full[modifiersIndex].toLowerCase();
    let ingredient = ingredients.full[ingredientsIndex].toLowerCase();
    let product = products.full[productsIndex].toLowerCase();

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

function updateIndexes(){
    methodsIndex = Math.floor((Math.random() * methods.full.length));
    modifiersIndex = Math.floor((Math.random() * modifiers.full.length));
    ingredientsIndex = Math.floor((Math.random() * ingredients.full.length));
    productsIndex = Math.floor((Math.random() * products.full.length));
}

function updateIndexesFromQSParams(){
    let QSparams = Object.fromEntries(new URLSearchParams(location.search));
    methodsIndex = QSparams.a && QSparams.a < methods.full.length ? QSparams.a : 0;
    modifiersIndex = QSparams.b && QSparams.b < modifiers.full.length ? QSparams.b : 0;
    ingredientsIndex = QSparams.c && QSparams.c < ingredients.full.length ? QSparams.c : 0;
    productsIndex = QSparams.d && QSparams.d < products.full.length ? QSparams.d : 0;
    // If all indexes are 0 then re-create them randomly
    if(methodsIndex == 0 && modifiersIndex == 0 && ingredientsIndex == 0 && productsIndex == 0){
        updateIndexes();
    }
}

window.addEventListener('popstate', (event) => {
    methodsIndex = event.state.methodsIndex;
    modifiersIndex = event.state.modifiersIndex;
    ingredientsIndex = event.state.ingredientsIndex;
    productsIndex = event.state.productsIndex;
    generateMenuIdea(false);
});

updateIndexesFromQSParams();

generateMenuIdea(createNewItem);