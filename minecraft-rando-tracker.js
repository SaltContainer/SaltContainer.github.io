class Loot {
    constructor(id, name, img, category, contents) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.category = category
        this.contents = contents;
        this.from = null;
        this.drops = null;
    }
}

var tables = [];
var selectedLoot = null;

fetch('minecraft-rando-tracker/loot_tables.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        initialData(data);
    })
    .then(initTable)
    .catch(function (err) {
        console.log('Error while loading JSON: ' + err);
    });

function initTable() {
    $('#results').DataTable({
        "data": tables,
        "columns": [
            { "data": "name", "defaultContent": "-----" },
            { "data": "from.name", "defaultContent": "-----" },
            { "data": "category", "defaultContent": "block" }
        ],
        "columnDefs": [
            {
                "render": function (data, type, row) {
                    return "<img src=\"" + row.img + "\"> " + data;
                },
                "targets": 0
            },
            {
                "visible": false,
                "targets": 2
            },
            {
                "render": function (data, type, row) {
                    if (row.from == null) return "<img src=\"minecraft-rando-tracker/chest.png\"> -----";
                    return "<img src=\"" + row.from.img + "\"> " + data;
                },
                "targets": 1
            }
        ],
        initComplete: function () {
            var column = this.api().column(0);
            var categoryColumn = this.api().column(2);
            var select = $('<select></select>')
                .appendTo($(column.header()))
                .on('change', function () {
                    if ($(this).val() == "all") {
                        categoryColumn.search('', true, false).draw();
                    } else {
                        var val = $.fn.dataTable.util.escapeRegex($(this).val());
                        categoryColumn.search(val ? '^' + val + '$' : '', true, false).draw();
                    }
                });

            [["all","All"], ["block", "Blocks"], ["chest", "Chests"], ["entity", "Entities"], ["gameplay", "Gameplay"]].forEach(function (id, index) {
                select.append('<option value="' + id[0] + '">' + id[1] + '</option>');
            });
        },
    });
}

function selectLoot() {
    var selectedDiv = document.getElementById("selected-item");
    var img = selectedDiv.getElementsByTagName("img")[0];
    if (selectedLoot == null) {
        selectedLoot = tables.get(this.id);
        img.src = selectLoot.img;
        img.alt = " " + selectLoot.name;
        selectedDiv.style.display = "";
    } else {
        var clickedLoot = tables.get(this.id);
        selectedLoot.drops = clickedLoot;
        clickedLoot.from = selectedLoot;
        updateResult(this, selectedLoot);
        selectedLoot = null;
        selectedDiv.style.display = "none";
    }
}

function updateResult(tr, loot) {
    var td2 = tr.getElementsByTagName("td")[1];
    var img = td2.getElementsByClassName("loot-icon")[0];
    img.src = loot.img;
    img.alt = loot.name;
    img.nextSibling.nodeValue = " " + loot.name;
}

function initialData(data) {
    var resultsBody = document.getElementById("results-body");
    for (var i = 0; i < data.length; i++) {
        var loot = new Loot(data[i].id, data[i].name, data[i].img, data[i].category, data[i].contents);
        tables.push(loot);
    }
}