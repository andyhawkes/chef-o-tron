const combinations = countUnique(textComponents.methods[dataset]) * countUnique(textComponents.modifiers[dataset]) * countUnique(textComponents.ingredients[dataset]) * countUnique(textComponents.products[dataset]);

let indices = {
    "methods": 0,
    "modifiers": 0,
    "ingredients": 0,
    "products": 0
}
let recipeComponents = {}
let zeitgeistRecipe = "Beans on toast"

function randomiseRecipeComponents() {
    for (const component in datasets[dataset]) {
        let index = Math.floor((Math.random() * textComponents[component][datasets[dataset][component]].length))
        recipeComponents[component] = {
            "index": index,
            "value": textComponents[component][datasets[dataset][component]][index]
        }
        indices[component] = index;
    }
}

function getRandomRecipeComponents(component, count = 1) {
    let randomComponents = [];
    for (let step = 0; step < count; step++) {
        let index = Math.floor((Math.random() * textComponents[component][datasets[dataset][component]].length))
        randomComponents[step] = {
            "index": index,
            "value": textComponents[component][datasets[dataset][component]][index].toLowerCase()
        }
    }
    console.log(randomComponents);
    return randomComponents;
}

function restoreRecipeComponentsFromIndices() {
    for (const component in datasets[dataset]) {
        recipeComponents[component] = {
            "index": indices[component],
            "value": textComponents[component][datasets[dataset][component]][indices[component]]
        }
    }
}

function outputTastingMenu(newItem, count = 1) {
    if (newItem === true) {
        // randomiseRecipeComponents();
        resetMenu();
        updateHistory();
    }

    let textElement = document.getElementById('menuText');
    let menuItems = [];

    for (let step = 0; step < count; step++) {
        let method = getRandomRecipeComponents('methods');
        let modifier = getRandomRecipeComponents('modifiers');
        let ingredients = getRandomRecipeComponents('ingredients',3);
        let product = getRandomRecipeComponents('products');

        let rawText = `${method[0].value} ${ingredients[0].value} ${product[0].value}, ${modifier[0].value} ${ingredients[1].value}, ${ingredients[2].value}`;
        menuItems[count] = capitalizeFirstLetter(rawText.trim());

        var li = document.createElement("li");
        li.appendChild(document.createTextNode(capitalizeFirstLetter(rawText.trim())));
        textElement.appendChild(li);
    }
    // textElement.innerHTML = zeitgeistRecipe;

    updatePageTitle(zeitgeistRecipe);
    updateTwitterLink(twitterMessageText[dataset], zeitgeistRecipe);
}

function updateIndicesFromQSParams(){
    let QSparams = Object.fromEntries(new URLSearchParams(location.search));
    indices.methods = QSparams.a && QSparams.a < textComponents.methods[dataset].length ? QSparams.a : 0;
    indices.modifiers = QSparams.b && QSparams.b < textComponents.modifiers[dataset].length ? QSparams.b : 0;
    indices.ingredients = QSparams.c && QSparams.c < textComponents.ingredients[dataset].length ? QSparams.c : 1;
    indices.products = QSparams.d && QSparams.d < textComponents.products[dataset].length ? QSparams.d : 0;
}

function validateIndices() {
    // If all indexes are 0 then re-create them randomly
    if (indices.methods == 0 && indices.modifiers == 0 && indices.ingredients == 1 && indices.products == 0) {
        randomiseRecipeComponents();
    } else {
        restoreRecipeComponentsFromIndices();
    }
}

function updateComboText() {
    let comboTextElement = document.getElementById('combinations');
    comboTextElement.innerHTML = combinations.toLocaleString();
}

function resetMenu() {
    let element = document.getElementById("menuText");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function init(){
    updateComboText();
    updateIndicesFromQSParams();
    validateIndices();
    outputTastingMenu(false,7);
}

window.addEventListener('popstate', (event) => {
    indices.methods = event.state.methodsIndex;
    indices.modifiers = event.state.modifiersIndex;
    indices.ingredients = event.state.ingredientsIndex;
    indices.products = event.state.productsIndex;
    restoreRecipeComponentsFromIndices();
    outputTastingMenu(false);
});

init();