const squares = 25;
const selections = bingoSelections[dataset];
const cardElement = document.getElementById('bingoCard');
const fanfareDuration = 3000;

let bingo = false;
let corners = false;
let increment = 0;

function generateCard(){
    let selected = [];
    let options = {};

    removeCard();

    options.methods = textComponents.methods[datasets[dataset].methods].map((x) => x);
    options.modifiers = textComponents.modifiers[datasets[dataset].modifiers].map((x) => x);
    options.ingredients = textComponents.ingredients[datasets[dataset].ingredients].map((x) => x);
    options.products = textComponents.products[datasets[dataset].products].map((x) => x);
    options.critiques = textComponents.critiques[datasets[dataset].critiques].map((x) => x);

    // Remove items from arrays where it is an empty string
    for (const prop in options) {
        for (i = 0; i < options[prop].length; i++) {
            if (options[prop][i].trim() == ''){
                options[prop].splice(i, 1);
            }
        }
    }

    // Grab random items based on the counts set in the selections object
    for (const property in selections) {
        for (i = 0; i < selections[property]; i++) {
            let randomIndex = Math.floor((Math.random() * options[property].length));
            selected.push(options[property][randomIndex]);
            options[property].splice(randomIndex, 1);
        }
    }

    // Randomise the selected options
    selected = selected.sort((a, b) => 0.5 - Math.random());

    // Create tiles for each selected option and append to the bingo card
    for (s = 0; s < selected.length; s++){
        let div = document.createElement("div");
        let span = document.createElement("span");
        div.classList.add('bingoSquare');
        if (selected[s] == ''){
            span.append('🃏');
            div.classList.add('joker');
        } else {
            span.append(selected[s]);
        }
        div.append(span);
        cardElement.append(div);
    }

    // Watch for tiles being checked off
    const tiles = document.querySelectorAll('.bingoSquare');
    tiles.forEach(el => el.addEventListener('click', event => {
        el.classList.toggle('checked');
        checkScore(el);
    }));
}

function checkScore(el){
    const checkedIndex = [...el.parentElement.children].indexOf(el);
    const checkedStatus = el.classList.contains("checked");
    const tiles = document.querySelectorAll('.bingoSquare');
    const tileCount = document.querySelectorAll('.bingoSquare').length;
    const checked = document.querySelectorAll('.bingoSquare.checked');
    const checkedCount = document.querySelectorAll('.bingoSquare.checked').length;
    const cornerIndices = [0, 4, 20, 24];

    let checkedIndices = [];
    for (t = 0; t < tiles.length; t++) {
        if(tiles[t].classList.contains("checked")){
            checkedIndices.push(t);
        }
    };

    corners = cornerIndices.every((val) => checkedIndices.includes(val));
    bingo = (tileCount == checkedCount) ? true : false;

    if (bingo){
        showFanfare("BINGO!!!", false);
        bingo = true;
        corners = true;
    } else {
        removeFanfare();
        if (corners == true && cornerIndices.includes(checkedIndex) == true && checkedStatus == true ){
            showFanfare("YOU GOT THE CORNERS!!!", true);
        }
    }
}

function removeCard(){
    cardElement.innerHTML = '';
    removeFanfare();
}

function removeFanfare() {
    let fanfare  = document.getElementById('fanfare');
    if (fanfare) {
        fanfare.remove();
    }
}

function updateFanfare(remainingTime){
    let countdown = document.getElementById('countdown');
    if (countdown) {
        countdown.innerHTML = `${remainingTime}...`;
    }
}

function showFanfare(messageText, isTemporary){
    removeFanfare();
    let div = document.createElement("div");
    let span = document.createElement("span");
    let counter = document.createElement("span");

    div.id = 'fanfare';
    span.classList.add('advisory');
    span.append(messageText);
    div.append(span);

    if(isTemporary == true){
        counter.id = "countdown";
        div.append(counter);
    }

    div.addEventListener('click', removeFanfare);
    document.body.append(div);

    if(isTemporary == true){
        increment = fanfareDuration / 1000;
        updateFanfare(increment);
        setTimeout(function(){ removeFanfare() }, fanfareDuration);
        let ticker = setInterval(function(){
            increment--;
            updateFanfare(increment);
            if(increment <=0 ) {
                clearInterval(ticker);
                increment = 0;
            }
        }, 1000);
    }
}

generateCard();