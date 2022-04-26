var elm = [0, 2, 3, 4, 7, 8, 9, 14, 15, 16, 25];

function doCalc() {
    // Attack Stuff
    var baseAttack = parseInt(document.getElementById("attack").value);
    var el = parseInt(document.getElementById("e-level").value);
    var level = parseInt(document.getElementById("level").value);
    var basePower = parseInt(document.getElementById("base-power").value);

    var nature = 1.0;
    nature *= document.getElementById("nature-minus").checked ? 0.9 : 1.0;
    nature *= document.getElementById("nature-neutral").checked ? 1.0 : 1.0;
    nature *= document.getElementById("nature-plus").checked ? 1.1 : 1.0;

    // Defense Stuff
    var baseDefense = parseInt(document.getElementById("def").value);
    var defEl = parseInt(document.getElementById("def-e-level").value);
    var defLevel = parseInt(document.getElementById("def-level").value);

    var defNature = 1.0;
    defNature *= document.getElementById("def-nature-minus").checked ? 0.9 : 1.0;
    defNature *= document.getElementById("def-nature-neutral").checked ? 1.0 : 1.0;
    defNature *= document.getElementById("def-nature-plus").checked ? 1.1 : 1.0;

    // HP Stuff
    var baseHP = parseInt(document.getElementById("hp").value);
    var hpEl = parseInt(document.getElementById("hp-e-level").value);

    // Stat Calc
    var elb = Math.round((Math.sqrt(baseAttack) * elm[el > 10 || el < 0 ? 10 : el] + level) / 2.5);
    var attack = Math.floor(Math.floor((level/50 + 1) * baseAttack / 1.5) * nature) + elb

    var defElb = Math.round((Math.sqrt(baseDefense) * elm[defEl > 10 || defEl < 0 ? 10 : defEl] + defLevel) / 2.5);
    var defense = Math.floor(Math.floor((defLevel/50 + 1) * baseDefense / 1.5) * defNature) + defElb

    var hpElb = Math.round((Math.sqrt(baseHP) * elm[hpEl > 10 || hpEl < 0 ? 10 : hpEl] + defLevel) / 2.5);
    var hp = Math.floor((defLevel/100 + 1) * baseHP + defLevel) + hpElb;

    // Damage Calc
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

    // Final Calc with ranges
    var damageMax = baseMultiplier * basePower * eff * stab * attackBoost * crit * defenseBoost;
    var ranges = [];
    for (var i=0; i<16; i++)
    {
        ranges[i] = Math.floor(damageMax * (i + 85) / 100);
    }

    var killingRanges = 0;
    for (var i=0; i<16; i++)
    {
        if (ranges[i] >= hp) killingRanges++;
    }

    // Change labels
    var atkVsDef = document.getElementById("atk-vs-def");
    atkVsDef.textContent = "(" + attack + " Attack vs. " + defense + " Defense @ " + hp + " HP, before multipliers)";

    var textRanges = document.getElementById("ranges");
    textRanges.textContent = "[" + ranges.join(", ") + "]";

    var result = document.getElementById("calc-result");
    result.textContent = ranges[0] + " - " + ranges[15] + " (" + killingRanges + "/16 to OHKO)";
}