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

var tables = [
];

const input = document.getElementById('loot-search');
const results = document.getElementById('results');
const resultsBody = document.getElementById('results-body');

input.addEventListener('input', updateSearch);

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

function updateSearch(e) {
}

function initialData(data) {
    for (var i = 0; i < data.length; i++) {
        var loot = new Loot(data[i].id, data[i].name, data[i].img, data[i].contents);
        tables.push(loot);

        var tr = document.createElement("tr");
        
        var td1 = document.createElement("td");
        var img = document.createElement("img");
        img.src = loot.img;
        img.alt = loot.name;
        img.className = "loot-icon";
        td1.appendChild(img);

        var text = document.createTextNode(" " + loot.name);
        td1.appendChild(text);

        var td2 = document.createElement("td");

        tr.appendChild(td1);
        tr.appendChild(td2);
    
        resultsBody.appendChild(tr);
    }
}