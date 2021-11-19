Array.prototype.random = function () {
    return this[Math.floor((Math.random() * this.length))];
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateHistory() {
    let state = {
        'methodsIndex': indices.methods,
        'modifiersIndex': indices.modifiers,
        'ingredientsIndex': indices.ingredients,
        'productsIndex': indices.products
    };
    let title = zeitgeistRecipe;
    let url = `${window.location.pathname}?a=${indices.methods}&b=${indices.modifiers}&c=${indices.ingredients}&d=${indices.products}`;
    history.pushState(state, title, url);
}

function updatePageTitle(title) {
    title = (title != null) ? `${title} | ${appNames[dataset]}` : `${appNames[dataset]}`;
    document.title = title;
    document.getElementsByTagName('meta').namedItem('twitter:title').setAttribute('content', title);
}

function updateTwitterLink(introText, messageText) {
    let tweetText = (introText != null) ? introText : '';
    tweetText += (messageText != null) ? messageText : '';
    let url = window.location;
    let message = `${tweetText} - ${url} ${twitterHashtag}`;
    let encodedMessage = encodeURIComponent(message);
    let tweetURL = twitterBaseURL + encodedMessage;
    let tweetButtons = document.querySelectorAll('.tweetButton');
    tweetButtons.forEach(el => el.setAttribute("href", tweetURL));
}
