var elm = [0, 2, 3, 4, 7, 8, 9, 14, 15, 16, 25];

function roundD(num) {
    return Math.ceil(num - 0.5);
}

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
    attack *= document.getElementById("slow-start").checked ? 0.5 : 1.0;
    attack *= document.getElementById("wild-might").checked ? 1.5 : 1.0;

    var defElb = Math.round((Math.sqrt(baseDefense) * elm[defEl > 10 || defEl < 0 ? 10 : defEl] + defLevel) / 2.5);
    var defense = Math.floor(Math.floor((defLevel/50 + 1) * baseDefense / 1.5) * defNature) + defElb
    defense *= document.getElementById("def-wild-might").checked ? 1.5 : 1.0;

    var hpElb = Math.round((Math.sqrt(baseHP) * elm[hpEl > 10 || hpEl < 0 ? 10 : hpEl] + defLevel) / 2.5);
    var hp = Math.floor((defLevel/100 + 1) * baseHP + defLevel) + hpElb;

    var eff = 1.0;
    eff *= document.getElementById("bad-eff-25").checked ? 0.4 : 1.0;
    eff *= document.getElementById("bad-eff-50").checked ? 0.5 : 1.0;
    eff *= document.getElementById("eff").checked ? 1.0 : 1.0;
    eff *= document.getElementById("very-eff-2").checked ? 2.0 : 1.0;
    eff *= document.getElementById("very-eff-4").checked ? 2.5 : 1.0;

    // DAMAGE CALC
    // Initial
    var initialAttSide = ((100 + attack) + (15 * level)) * basePower;
    var initialDefSide = 50 + defense;
    var initial = Math.floor(Math.floor(initialAttSide / initialDefSide) / 5);

    // a
    var attackStage = 0;
    if (document.getElementById("attack-boost-down").checked) attackStage = -1;
    if (document.getElementById("attack-boost-neutral").checked) attackStage = 0;
    if (document.getElementById("attack-boost-up").checked) attackStage = 1;

    var defenseStage = 0;
    if (document.getElementById("def-boost-down").checked) defenseStage = -1;
    if (document.getElementById("def-boost-neutral").checked) defenseStage = 0;
    if (document.getElementById("def-boost-up").checked) defenseStage = 1;
    
    var a = initial;

    if (attackStage != defenseStage)
    {
        var attackBoost = 1.0;
        attackBoost *= document.getElementById("attack-boost-down").checked ? 0.66 : 1.0;
        attackBoost *= document.getElementById("attack-boost-neutral").checked ? 1.0 : 1.0;
        attackBoost *= document.getElementById("attack-boost-up").checked ? 1.5 : 1.0;

        var defenseBoost = 1.0;
        defenseBoost *= document.getElementById("def-boost-down").checked ? 1.5 : 1.0;
        defenseBoost *= document.getElementById("def-boost-neutral").checked ? 1.0 : 1.0;
        defenseBoost *= document.getElementById("def-boost-up").checked ? 0.66 : 1.0;

        a = Math.floor((attackBoost * initial) * defenseBoost);
    }

    // b
    var b = roundD(a * (document.getElementById("rain").checked ? 0.75 : 1.0));

    // c
    var c = Math.floor(b * (document.getElementById("crit").checked ? 1.5 : 1.0));

    // d (Ranges)
    var ranges = [];
    for (var r=0; r<16; r++)
    {
        var d = Math.floor(c * ((r + 85) / 100));

        // e
        var e = roundD(d * (document.getElementById("stab").checked ? 1.25 : 1.0));

        // f
        var f = Math.floor(e * eff);

        // g
        var g = Math.floor(f * (document.getElementById("burn").checked ? 0.5 : 1.0));

        // h
        var h = Math.floor(g * (document.getElementById("drowsy").checked ? 1.33 : 1.0));

        // i
        var i = Math.floor(h * (document.getElementById("att-fixated").checked ? 1.5 : 1.0));

        // j
        var j = Math.floor(i * (document.getElementById("def-fixated").checked ? 1.33 : 1.0));

        // k
        var k = Math.floor(j * (document.getElementById("primed").checked ? 1.5 : 1.0));

        ranges[r] = k;
    }

    var killingRanges = 0;
    for (var i=0; i<16; i++)
    {
        if (ranges[i] >= hp) killingRanges++;
    }

    // Change labels
    var atkVsDef = document.getElementById("atk-vs-def");
    atkVsDef.textContent = "(" + attack + " Attack vs. " + defense + " Defense @ " + hp + " HP, before most multipliers)";

    var textRanges = document.getElementById("ranges");
    textRanges.textContent = "[" + ranges.join(", ") + "]";

    var result = document.getElementById("calc-result");
    result.textContent = ranges[0] + " - " + ranges[15] + " (" + killingRanges + "/16 to OHKO)";
}