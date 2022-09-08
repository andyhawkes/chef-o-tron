const combinations = countUnique(textComponents.methods[dataset]) * countUnique(textComponents.modifiers[dataset]) * countUnique(textComponents.ingredients[dataset]) * countUnique(textComponents.products[dataset]) * countUnique(textComponents.ingredients[dataset]) * countUnique(textComponents.ingredients[dataset]);

let indices = []
let recipeComponents = {}
let zeitgeistRecipe = "7 course tasting menu"
let newMenu = true;

function getRandomRecipeComponents(component, count = 1) {
    let randomComponents = [];
    for (let step = 0; step < count; step++) {
        let index = Math.floor((Math.random() * textComponents[component][datasets[dataset][component]].length))
        randomComponents[step] = {
            "i": index,
            "v": textComponents[component][datasets[dataset][component]][index].toLowerCase()
        }
    }
    return randomComponents;
}

function generateMenuItems(count = 1){
    for (let step = 0; step < count; step++) {
        let method = getRandomRecipeComponents('methods');
        let modifier = getRandomRecipeComponents('modifiers');
        let ingredients = getRandomRecipeComponents('ingredients', 3);
        let product = getRandomRecipeComponents('products');
        let params = {};
        params.method = method[0].i;
        params.product = product[0].i;
        params.modifier = modifier[0].i;
        params.ingredients = [ingredients[0].i, ingredients[1].i, ingredients[2].i];

        indices[step] = params;
    }
}

function outputTastingMenu() {
    resetMenu();

    let textElement = document.getElementById('menuText');

    for (let step = 0; step < indices.length; step++) {
        let method = textComponents.methods[datasets[dataset]['methods']][indices[step].method]
        let modifier = textComponents.modifiers[datasets[dataset]['modifiers']][indices[step].modifier]
        let ingredients = [
            textComponents.ingredients[datasets[dataset]['ingredients']][indices[step].ingredients[0]],
            textComponents.ingredients[datasets[dataset]['ingredients']][indices[step].ingredients[1]],
            textComponents.ingredients[datasets[dataset]['ingredients']][indices[step].ingredients[2]]
        ]
        let product = textComponents.products[datasets[dataset]['products']][indices[step].product];

        let rawText = `${method} ${ingredients[0]} ${product}, ${modifier} ${ingredients[1]}, ${ingredients[2]}`;

        var li = document.createElement("li");
        li.appendChild(document.createTextNode(capitalizeFirstLetter(rawText.trim().toLowerCase())));
        textElement.appendChild(li);
    }

    if (newMenu === true) {
        console.log('newMenu is true - updating history');
        updateMenuHistory();
    }

    updatePageTitle(zeitgeistRecipe);
    updateTwitterLink(twitterMessageText["tasting menu"], zeitgeistRecipe);
}

function updateMenuHistory(replace) {
    console.log('Updating menu history');
    let state = {
        'methodsIndex': indices.methods,
        'modifiersIndex': indices.modifiers,
        'ingredientsIndex': indices.ingredients,
        'productsIndex': indices.products
    };
    let title = zeitgeistRecipe;
    console.log(indices);
    console.log('Encoding menu to Base64');
    let menu = btoa(JSON.stringify(indices));
    console.log(menu);
    let url = `${window.location.pathname}?m=${menu}`;
    if (replace == true) {
        history.replaceState(state, title, url);
    } else {
        history.pushState(state, title, url);
    }
}

function updateIndicesFromQSParams(){
    console.log('Getting menu from QS');
    let QSparams = Object.fromEntries(new URLSearchParams(location.search));

    // try {
    //     parsedMenu = JSON.parse(atob(QSparams.m));
    // } catch (e) {
    //     console.log("m is not valid JSON");
    //     generateMenuItems(7);
    //     // throw new Error('Error occured: ', e);
    // }

    let menu = QSparams.m ? JSON.parse(atob(QSparams.m)) : {};
    console.log(menu);
    let indicesAreValid = validateIndices(menu);
    if( indicesAreValid == true ){
        for (let step = 0; step < menu.length; step++) {
            let params = {};
            params.method = menu[step].method ? menu[step].method : 0;
            params.product = menu[step].product ? menu[step].product : 0;
            params.modifier = menu[step].modifier ? menu[step].modifier : 0;
            params.ingredients = menu[step].ingredients ? menu[step].ingredients : 1;

            indices[step] = params;
            newMenu = false;
        }
    } else {
        generateMenuItems(7);
    }
}

function validateIndices(menu) {
    // just check that it's a non-sero length?
    if (typeof menu === 'object' && menu !== null && Array.isArray(menu) && menu.length > 0) {
        newMenu = false;
        console.log("Indices are valid");
        return true;
    }
    console.log("indices are not valid");
    return false;
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

function generateNewMenu() {
    newMenu = true;
    generateMenuItems(7);
    outputTastingMenu();
}

function init(){
    updateComboText();
    updateIndicesFromQSParams();
    outputTastingMenu();
}

window.addEventListener('popstate', (event) => {
    indices.methods = event.state.methodsIndex;
    indices.modifiers = event.state.modifiersIndex;
    indices.ingredients = event.state.ingredientsIndex;
    indices.products = event.state.productsIndex;
    updateIndicesFromQSParams();
    outputTastingMenu();
});

init();