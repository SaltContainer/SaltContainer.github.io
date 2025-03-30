var healthRange = [850, 1100];
var strengthRange = [1200, 2000];
var rangeRange = [1200, 2000];
var staminaRange = [300, 450];
var speedRange = [1200, 2000];
var mapRange = [2000, 3000];
var jumpRange = [2000, 3000];
var tumbleRange = [850, 1100];

var hpSmallRange = [500, 750];
var hpMediumRange = [1000, 1500];
var hpLargeRange = [2000, 3000];

var crystalRange = [1200, 2000];

function roundD(num) {
    return Math.ceil(num - 0.5);
}

function calcUpgrade(price, count) {
    var adjusted = price * 4.0;

    if (adjusted < 1000.0)
        adjusted = 1000.0;

    var thousands = 0.0;
    if (adjusted >= 1000.0)
        thousands = Math.ceil(adjusted / 1000.0);

    return Math.floor(thousands + (thousands * 0.5 * count));
}

function calcHP(price, levels) {
    var adjusted = price * 4.0;

    if (adjusted < 1000.0)
        adjusted = 1000.0;

    var thousands = 0.0;
    if (adjusted >= 1000.0)
        thousands = Math.ceil(adjusted / 1000.0);

    return Math.floor(thousands + (thousands * 0.05 * levels));
}

function calcCrystal(price, levels) {
    var adjusted = price * 4.0;

    if (adjusted < 1000.0)
        adjusted = 1000.0;

    var thousands = 0.0;
    if (adjusted >= 1000.0)
        thousands = Math.ceil(adjusted / 1000.0);

    return Math.floor(thousands + (thousands * 0.2 * levels));
}

function doCalc() {
    var levelsBeaten = parseInt(document.getElementById("levels-beaten").value);

    var healthCount = parseInt(document.getElementById("health").value);
    var strengthCount = parseInt(document.getElementById("strength").value);
    var rangeCount = parseInt(document.getElementById("range").value);
    var staminaCount = parseInt(document.getElementById("stamina").value);
    var speedCount = parseInt(document.getElementById("speed").value);
    var mapCount = parseInt(document.getElementById("map").value);
    var jumpCount = parseInt(document.getElementById("jump").value);
    var tumbleCount = parseInt(document.getElementById("tumble").value);

    var item = "";
    if (document.getElementById("item-health").checked) item = "health";
    if (document.getElementById("item-strength").checked) item = "strength";
    if (document.getElementById("item-range").checked) item = "range";
    if (document.getElementById("item-stamina").checked) item = "stamina";
    if (document.getElementById("item-speed").checked) item = "speed";
    if (document.getElementById("item-map").checked) item = "map";
    if (document.getElementById("item-jump").checked) item = "jump";
    if (document.getElementById("item-tumble").checked) item = "tumble";
    if (document.getElementById("item-hp-small").checked) item = "hp-small";
    if (document.getElementById("item-hp-medium").checked) item = "hp-medium";
    if (document.getElementById("item-hp-large").checked) item = "hp-large";
    if (document.getElementById("item-crystal").checked) item = "crystal";

    var ranges = [];
    switch (item) {
        case "health":
            ranges[0] = calcUpgrade(healthRange[0], healthCount);
            ranges[1] = calcUpgrade(healthRange[1], healthCount);
            break;

        case "strength":
            ranges[0] = calcUpgrade(strengthRange[0], strengthCount);
            ranges[1] = calcUpgrade(strengthRange[1], strengthCount);
            break;

        case "range":
            ranges[0] = calcUpgrade(rangeRange[0], rangeCount);
            ranges[1] = calcUpgrade(rangeRange[1], rangeCount);
            break;

        case "stamina":
            ranges[0] = calcUpgrade(staminaRange[0], staminaCount);
            ranges[1] = calcUpgrade(staminaRange[1], staminaCount);
            break;

        case "speed":
            ranges[0] = calcUpgrade(speedRange[0], speedCount);
            ranges[1] = calcUpgrade(speedRange[1], speedCount);
            break;

        case "map":
            ranges[0] = calcUpgrade(mapRange[0], mapCount);
            ranges[1] = calcUpgrade(mapRange[1], mapCount);
            break;

        case "jump":
            ranges[0] = calcUpgrade(jumpRange[0], jumpCount);
            ranges[1] = calcUpgrade(jumpRange[1], jumpCount);
            break;

        case "tumble":
            ranges[0] = calcUpgrade(tumbleRange[0], tumbleCount);
            ranges[1] = calcUpgrade(tumbleRange[1], tumbleCount);
            break;

        case "hp-small":
            ranges[0] = calcHP(hpSmallRange[0], levelsBeaten);
            ranges[1] = calcHP(hpSmallRange[1], levelsBeaten);
            break;

        case "hp-medium":
            ranges[0] = calcHP(hpMediumRange[0], levelsBeaten);
            ranges[1] = calcHP(hpMediumRange[1], levelsBeaten);
            break;

        case "hp-large":
            ranges[0] = calcHP(hpLargeRange[0], levelsBeaten);
            ranges[1] = calcHP(hpLargeRange[1], levelsBeaten);
            break;

        case "crystal":
            ranges[0] = calcCrystal(crystalRange[0], levelsBeaten);
            ranges[1] = calcCrystal(crystalRange[1], levelsBeaten);
            break;
    }

    // Change labels
    var textRanges = document.getElementById("values");
    textRanges.textContent = "[" + ranges.join(", ") + "]";

    var result = document.getElementById("calc-result");
    result.textContent = "$" + ranges[0] + "K - $" + ranges[1] + "K";
}