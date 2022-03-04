function doCalc() {
    var attack = parseInt(document.getElementById("attack").value);
    var level = parseInt(document.getElementById("level").value);
    var basePower = parseInt(document.getElementById("base-power").value);
    var defense = parseInt(document.getElementById("def").value);

    var baseMultiplier = (attack * 0.2 + level * 3 + 20) / (defense + 50);

    var eff = 1.0;
    eff *= document.getElementById("bad-eff-25").checked ? 0.4 : 1.0;
    eff *= document.getElementById("bad-eff-50").checked ? 0.5 : 1.0;
    eff *= document.getElementById("eff").checked ? 1.0 : 1.0;
    eff *= document.getElementById("very-eff-2").checked ? 2.0 : 1.0;
    eff *= document.getElementById("very-eff-4").checked ? 2.5 : 1.0;

    var stab = 1.0;
    stab *= document.getElementById("stab").checked ? 1.25 : 1.0;

    var attackBoost = 1.0;
    attackBoost *= document.getElementById("attack-boost").checked ? 1.5 : 1.0;

    var crit = 1.0;
    crit *= document.getElementById("crit").checked ? 1.5 : 1.0;

    var defenseBoost = 1.0;
    defenseBoost *= document.getElementById("def-boost").checked ? 2/3 : 1.0;

    var damageMax = baseMultiplier * basePower * eff * stab * attackBoost * crit * defenseBoost;
    var damageMin = damageMax * 0.85;

    var result = document.getElementById("calc-result");
    result.textContent = damageMin + " - " + damageMax;
}