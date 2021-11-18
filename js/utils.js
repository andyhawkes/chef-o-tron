Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateHistory() {
    let state = {
        'methodsIndex': methodsIndex,
        'modifiersIndex': modifiersIndex,
        'ingredientsIndex': ingredientsIndex,
        'productsIndex': productsIndex
    };
    let title = zeitgeistRecipe;
    let url = `${window.location.pathname}?a=${methodsIndex}&b=${modifiersIndex}&c=${ingredientsIndex}&d=${productsIndex}`;
    history.pushState(state, title, url);
}

function updatePageTitle(title) {
    title = (title != null) ? `${title} | ${appName}` : `${appName}`;
    document.title = title;
    document.getElementsByTagName('meta').namedItem('twitter:title').setAttribute('content', title);
}

