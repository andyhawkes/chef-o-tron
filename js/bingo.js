const squares = 25;
const selections = {
    'methods': 4,
    'modifiers': 2,
    'ingredients': 8,
    'products': 6,
    'critiques': 5
}

const cardElement = document.getElementById('bingoCard');

function generateCard(){
    let selected = [];
    let options = {};

    removeCard();

    options.methods = methods.map((x) => x);
    options.modifiers = modifiers.map((x) => x);
    options.ingredients = ingredients.map((x) => x);
    options.products = products.map((x) => x);
    options.critiques = critiques.map((x) => x);

    // Remove empty first items from arrays
    options.methods.shift();
    options.modifiers.shift();
    options.ingredients.shift();

    for (const property in selections) {
        for (i = 0; i < selections[property]; i++) {
            let randomIndex = Math.floor((Math.random() * options[property].length));
            console.log(randomIndex);
            selected.push(options[property][randomIndex]);
            options[property].splice(randomIndex, 1);
        }
    }
    selected = selected.sort((a, b) => 0.5 - Math.random());
    for(s=0;s<selected.length;s++){
        let div = document.createElement("div");
        let span = document.createElement("span");
        div.classList.add('bingoSquare');
        span.append(selected[s]);
        div.append(span);
        cardElement.append(div);
    }

    const tiles = document.querySelectorAll('.bingoSquare');

    tiles.forEach(el => el.addEventListener('click', event => {
        el.classList.toggle('checked');
        checkScore();
    }));

}

function checkScore(){
    const tiles = document.querySelectorAll('.bingoSquare').length;
    const checked = document.querySelectorAll('.bingoSquare.checked').length;
    if(tiles == checked){
        alert("BINGO!!!");
    } else {
        console.log (`${checked} of ${tiles} squares checked off`);
    }
}

function removeCard(){
    cardElement.innerHTML = '';
}

generateCard();