class Loot {
    constructor(id, name, img, contents) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.contents = contents;
        this.from = null;
        this.drops = null;
    }
}

fetch('minecraft-rando-tracker/loot_tables.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        initialData(data);
    })
    .catch(function (err) {
        console.log('Error while loading JSON: ' + err);
    });

function selectLoot() {
    
}

function updateSearch() {
    var input = document.getElementById("loot-search");
    var filter = input.value.toUpperCase();
    var table = document.getElementById("results-body");
    var items = table.getElementsByTagName("tr");

    for (i = 0; i < items.length; i++) {
        var loot = items[i].getElementsByTagName("td")[0];
        var result = items[i].getElementsByTagName("td")[1];
        var lootValue = loot.textContent || loot.innerText;
        var resultValue = result.textContent || result.innerText;

        if (lootValue.toUpperCase().indexOf(filter) > -1 || resultValue.toUpperCase().indexOf(filter) > -1) {
            items[i].style.display = "";
        } else {
            items[i].style.display = "none";
        }
    }
}

function initialData(data) {
    for (var i = 0; i < data.length; i++) {
        var loot = new Loot(data[i].id, data[i].name, data[i].img, data[i].contents);
        tables.push(loot);

        var tr = document.createElement("tr");
        
        var td1 = document.createElement("td");
        var img1 = document.createElement("img");
        img1.src = loot.img;
        img1.alt = loot.name;
        img1.className = "loot-icon";
        td1.appendChild(img1);

        var text1 = document.createTextNode(" " + loot.name);
        td1.appendChild(text1);

        var td2 = document.createElement("td");
        var img2 = document.createElement("img");
        img2.src = "minecraft-rando-tracker/chest.png"
        img2.alt = "Unknown";
        img2.className = "loot-icon";
        td2.appendChild(img2);

        var text2 = document.createTextNode("-----");
        td2.appendChild(text1);

        tr.appendChild(td1);
        tr.appendChild(td2);
    
        resultsBody.appendChild(tr);
    }
}