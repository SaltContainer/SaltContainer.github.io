function doCalc() {
    var attack = parseInt(document.getElementById("attack").value);
    var level = parseInt(document.getElementById("level").value);
    var basePower = parseInt(document.getElementById("base-power").value);
    var defense = parseInt(document.getElementById("def").value);

    var baseMultiplier = (attack * 0.2 + level * 3 + 20) / (defense + 50);
    
    var damageMax = baseMultiplier * basePower;
    var damageMin = baseMultiplier * basePower * 0.85;

    var result = document.getElementById("calc-result");
    result.textContent = damageMin + " - " + damageMax;
}