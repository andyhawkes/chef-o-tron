const combinations = countUnique(textComponents.methods[dataset]) * countUnique(textComponents.modifiers[dataset]) * countUnique(textComponents.ingredients[dataset]) * countUnique(textComponents.products[dataset]) * countUnique(textComponents.ingredients[dataset]) * countUnique(textComponents.ingredients[dataset]) * countUnique(textComponents.ingredients[dataset]) * countUnique(textComponents.ingredients[dataset]);

let indices = [];
let recipeComponents = {};
let courses = 7;
let zeitgeistRecipe = `${courses} course tasting menu`;
let maxIngredients = 5;
let newMenu = true;

function getRandomRecipeComponents(component, count = 1) {
    let randomComponents = [];
    for (let step = 0; step < count; step++) {
        let index = Math.floor((Math.random() * textComponents[component][datasets[dataset][component]].length))
        randomComponents[step] = index;
    }
    return randomComponents;
}

function generateMenuItems(count = 1){
    indices = [];
    for (let step = 0; step < count; step++) {
        let randomIngredientCount = Math.ceil(Math.random() * maxIngredients);
        let method = getRandomRecipeComponents('methods');
        let modifier = getRandomRecipeComponents('modifiers');
        let ingredients = getRandomRecipeComponents('ingredients', randomIngredientCount);
        let product = getRandomRecipeComponents('products');
        let params = {};
        params.method = method[0];
        params.product = product[0];
        params.modifier = modifier[0];
        params.ingredients = [ingredients][0];

        indices[step] = params;
    }
}

function outputTastingMenu() {
    resetMenu();

    let textElement = document.getElementById('menuText');

    for (let step = 0; step < indices.length; step++) {
        let method = textComponents.methods[datasets[dataset]['methods']][indices[step].method]
        let modifier = textComponents.modifiers[datasets[dataset]['modifiers']][indices[step].modifier]
        let ingredients = []
        for (let i = 0; i < indices[step].ingredients.length; i++) {
            if (textComponents.ingredients[datasets[dataset]['ingredients']][indices[step].ingredients[i]] !== ""){
                //Exclude empty ingredient strings
                ingredients[i] = textComponents.ingredients[datasets[dataset]['ingredients']][indices[step].ingredients[i]];
            }
        }
        let product = textComponents.products[datasets[dataset]['products']][indices[step].product];

        let rawText = "";
        switch (ingredients.length){
            case 0:
                rawText = `${method} ${modifier} ${product}`;
                break;
            case 1:
                rawText = `${method} ${modifier} ${ingredients[0]} ${product}`;
                break;
            default:
                rawText = `${method} ${ingredients[0]} ${product}, ${modifier} ${ingredients[1]}`;
                for (let i = 2; i < ingredients.length; i++) {
                    rawText += `, ${ingredients[i]}`
                }
        }
        
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(capitalizeFirstLetter(rawText.trim().toLowerCase())));
        textElement.appendChild(li);
    }

    if (newMenu === true) {
        updateMenuHistory();
    }

    updatePageTitle(zeitgeistRecipe);
    updateTwitterLink(twitterMessageText["tasting menu"], zeitgeistRecipe);
}

function updateMenuHistory(replace) {
    let state = {
        'methodsIndex': indices.methods,
        'modifiersIndex': indices.modifiers,
        'ingredientsIndex': indices.ingredients,
        'productsIndex': indices.products
    };
    let title = zeitgeistRecipe;
    let menu = btoa(JSON.stringify(indices));
    let url = `${window.location.pathname}?m=${menu}`;
    if (replace == true) {
        history.replaceState(state, title, url);
    } else {
        history.pushState(state, title, url);
    }
}

function updateIndicesFromQSParams(){
    let QSparams = Object.fromEntries(new URLSearchParams(location.search));

    // try {
    //     parsedMenu = JSON.parse(atob(QSparams.m));
    // } catch (e) {
    //     console.log("m is not valid JSON");
    //     generateMenuItems(courses);
    //     // throw new Error('Error occured: ', e);
    // }

    let menu = QSparams.m ? JSON.parse(atob(QSparams.m)) : {};
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
        generateMenuItems(courses);
    }
}

function validateIndices(menu) {
    // just check that it's a non-zero length?
    if (typeof menu === 'object' && menu !== null && Array.isArray(menu) && menu.length > 0) {
        newMenu = false;
        return true;
    }
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
    generateMenuItems(courses);
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