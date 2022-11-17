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
                    if (type == "display") return renderRow(row);
                    else if (type == "filter") return filterRow(row);
                    else return data;
                },
                "targets": 0
            },
            {
                "visible": false,
                "targets": 2
            },
            {
                "render": function (data, type, row) {
                    if (type == "display") return renderRow(row.drops);
                    else if (type == "filter") return filterRow(row.drops);
                    else if (row.drops) return row.drops.name;
                    else return "~";
                },
                "targets": 1
            }
        ]
    });

    $('#results-body').on('click', 'tr', function () {
        var data = table.row(this).data();

        if (selectedLoot == null) {
            selectedLoot = data;
            selectedRow = this;
            $("#selected-item > img").prop("src", selectedLoot.img);
            $("#selected-item > img").prop("alt", selectedLoot.name);
            $("#selected-item").get(0).lastChild.nodeValue = " " + selectedLoot.name;
            $("#selected-item").css('opacity', '1');
        } else {
            var clickedLoot = data;
            var order = $("#order-checked").prop("checked");
            if (order) {
                selectedLoot.drops = clickedLoot;
                clickedLoot.from = selectedLoot;
            } else {
                clickedLoot.drops = selectedLoot;
                selectedLoot.from = clickedLoot;
            }
            table.row(selectedRow).data(selectedLoot).draw();
            table.row(this).data(clickedLoot).draw();
            selectedLoot = null;
            selectedRow = null;
            $("#selected-item").css('opacity', '0');
        }
    });
}

function renderRow(row) {
    if (row == null) return "<img src=\"minecraft-rando-tracker/chest.png\"> -----";
    var image = "<img src=\"" + row.img + "\">";
    if (row.contents.length > 0)
    {
        var qIcon = "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-question-square\" viewBox=\"0 0 16 16\"><path d=\"M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z\"/><path d=\"M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z\"/></svg>"
        var contents = row.contents.map(i => [
                "<img src=\"" + i.img + "\">",
                (i.min == i.max) ? i.min : (i.min + "-" + i.max),
                i.name,
                ... i.percent < 1 || i.condition ? [
                    "(" + [
                        ... i.percent < 1 ? [Number(i.percent).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2})] : [],
                        ... i.condition ? [i.condition] : []
                    ].join(" - ") + ")"
                ] : []
            ].join(" ")
        );
        var contentsStr = contents.join("</br>");
        var tooltip = "<div class=\"contents-tooltip\">" + qIcon + "<span class=\"contents-tooltip-text\">" + contentsStr + "</span></div>";
        return tooltip + image + " " + row.name;
    }
    else return image + " " + row.name;
}

function filterRow(row) {
    if (row == null) return "~";
    else if (row.contents.length > 0) return [row.name].concat(row.contents.map(c => c.name)).join(",");
    else return row.name;
}

function initialData(data) {
    for (var i = 0; i < data.length; i++) {
        var loot = new Loot(data[i].id, data[i].name, data[i].img, data[i].category, data[i].contents);
        tables.push(loot);
    }
}