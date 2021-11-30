const appNames = {
    "default": "CHEF-O-TRON",
    "xmas": "Xmas NPD bot | CHEF-O-TRON"
}

const twitterBaseURL = "https://twitter.com/intent/tweet?text=";
const twitterHashtag = "#chefotron";
const twitterUsername = "@chef_o_tron";
const twitterMessageText = {
    "default": `Loving this recipe idea from ${twitterUsername} - `,
    "xmas": `Loving this Christmas recipe idea from ${twitterUsername} - `
}

const datasets = {
    "default": {
        "methods": "default",
        "modifiers": "default",
        "ingredients": "default",
        "products": "default",
        "critiques": "default"
    },
    "xmas": {
        "methods": "xmas",
        "modifiers": "xmas",
        "ingredients": "xmas",
        "products": "xmas",
        "critiques": "default"
    },
    "bakeoff": {
        "methods": "bakeoff",
        "modifiers": "bakeoff",
        "ingredients": "bakeoff",
        "products": "bakeoff",
        "critiques": "bakeoff"
    }
}

const bingoSelections = {
    "default":{
        'methods': 4,
        'modifiers': 2,
        'ingredients': 8,
        'products': 6,
        'critiques': 5
    },
    "bakeoff": {
        'methods': 0,
        'modifiers': 2,
        'ingredients': 10,
        'products': 7,
        'critiques': 6
    },
}