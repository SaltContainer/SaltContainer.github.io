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
    var table = $('#results').DataTable({
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

    $('#results-body').on('click', 'tr', function () {
        var data = table.row(this).data();

        if (selectedLoot == null) {
            selectedLoot = data;
            selectedRow = this;
            $("#selected-item > img").prop("src", selectedLoot.img);
            $("#selected-item > img").prop("alt", selectedLoot.name);
            $("#selected-item").get(0).lastChild.nodeValue = " " + selectedLoot.name;
            $("#selected-item").css('display', '');
        } else {
            var clickedLoot = data;
            selectedLoot.drops = clickedLoot;
            clickedLoot.from = selectedLoot;
            table.row(selectedRow).data(selectedLoot).draw();
            table.row(this).data(clickedLoot).draw();
            selectedLoot = null;
            selectedRow = null;
            $("#selected-item").css('display', 'none');
        }
    });
}

function initialData(data) {
    for (var i = 0; i < data.length; i++) {
        var loot = new Loot(data[i].id, data[i].name, data[i].img, data[i].category, data[i].contents);
        tables.push(loot);
    }
}