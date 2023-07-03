class Weather {
    constructor(date, rolling, dappled, watchtower, westLake, eastLake, eye, southLake, seat, northLake, motostoke, bridge, stony, mirror, bowl, cap, outrage, hammerlocke) {
        this.date = date;
        this.rolling = rolling;
        this.dappled = dappled;
        this.watchtower = watchtower;
        this.westLake = westLake;
        this.eastLake = eastLake;
        this.eye = eye;
        this.southLake = southLake;
        this.seat = seat;
        this.northLake = northLake;
        this.motostoke = motostoke;
        this.bridge = bridge;
        this.stony = stony;
        this.mirror = mirror;
        this.bowl = bowl;
        this.cap = cap;
        this.outrage = outrage;
        this.hammerlocke = hammerlocke;
    }
}

var beforeHammerlocke = [];
var hammerlocke = [];
var postChampion = [];

var table;

fetch('minecraft-rando-tracker/weather-data.json')
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

radioButtonEvents();
selectEvents();

function radioButtonEvents() {
    $('input[type=radio][name=progress]').change(function() {
        if (this.id == "progress-pre-hammerlocke") {
            onUpdateRows(beforeHammerlocke);
        }
        else if (this.id == "progress-post-hammerlocke") {
            onUpdateRows(hammerlocke);
        }
        else if (this.id == "progress-post-champion") {
            onUpdateRows(postChampion);
        }
    });
}

function initTable() {
    table = $('#results').DataTable({
        "data": beforeHammerlocke,
        "columns": [
            { "data": "date", "defaultContent": "-----" },
            { "data": "rolling", "defaultContent": "-----" },
            { "data": "dappled", "defaultContent": "-----" },
            { "data": "watchtower", "defaultContent": "-----" },
            { "data": "westLake", "defaultContent": "-----" },
            { "data": "eastLake", "defaultContent": "-----" },
            { "data": "eye", "defaultContent": "-----" },
            { "data": "southLake", "defaultContent": "-----" },
            { "data": "seat", "defaultContent": "-----" },
            { "data": "northLake", "defaultContent": "-----" },
            { "data": "motostoke", "defaultContent": "-----" },
            { "data": "bridge", "defaultContent": "-----" },
            { "data": "stony", "defaultContent": "-----" },
            { "data": "mirror", "defaultContent": "-----" },
            { "data": "bowl", "defaultContent": "-----" },
            { "data": "cap", "defaultContent": "-----" },
            { "data": "outrage", "defaultContent": "-----" },
            { "data": "hammerlocke", "defaultContent": "-----" }
        ],
        "columnDefs": [
            {
                "render": function (data, type, row) {
                    if (type == "display") return renderRow(row);
                    else if (type == "filter") return filterRow(row);
                    else return data;
                },
                "targets": 0
            }
        ],
        "initComplete": function () {
            this.api()
                .columns()
                .every(function () {
                    var column = this;
                    if (column.index() != 0)
                    {
                        var select = $('<select><option value=""></option></select>')
                            .appendTo($(column.footer()).empty())
                            .on('change', function () {
                                var val = DataTable.util.escapeRegex($(this).val());
        
                                column.search(val ? '^' + val + '$' : '', true, false).draw();
                            });

                            select.append('<option value="Blizzard">Blizzard</option>');
                            select.append('<option value="Clear">Clear</option>');
                            select.append('<option value="Cloudy">Cloudy</option>');
                            select.append('<option value="Fog">Fog</option>');
                            select.append('<option value="Harsh sunlight">Harsh sunlight</option>');
                            select.append('<option value="Rain">Rain</option>');
                            select.append('<option value="Sandstorm">Sandstorm</option>');
                            select.append('<option value="Snow">Snow</option>');
                            select.append('<option value="Thunderstorm">Thunderstorm</option>');
                    }
                });
        },
    });
}

function onUpdateRows(rows) {
    table.clear();
    table.rows.add(rows);
    table.draw();
}

function renderRow(row) {
    if (row == null) return "-----";
    else return row.date;
}

function filterRow(row) {
    if (row == null) return "~";
    else return row.date;
}

function initialData(data) {
    var beforeHammerlockeData = data.beforeHammerlocke;
    for (var i = 0; i < beforeHammerlockeData.length; i++) {
        var item = beforeHammerlockeData[i];
        var weather = new Weather(item.date, item.rollingFields, item.dappledGrove, item.watchtowerRuins, item.westLakeAxewell, item.eastLakeAxewell, item.axewsEye, item.southLakeMiloch, item.giantsSeat, item.northLakeMiloch, item.motostokeRiverbank, item.bridgeField, item.stonyWilderness, item.giantsMirror, item.dustyBowl, item.giantsCap, item.lakeOfOutrage, item.hammerlockeHills);
        beforeHammerlocke.push(weather);
    }

    var hammerlockeData = data.beforeChampion;
    for (var i = 0; i < hammerlockeData.length; i++) {
        var item = hammerlockeData[i];
        var weather = new Weather(item.date, item.rollingFields, item.dappledGrove, item.watchtowerRuins, item.westLakeAxewell, item.eastLakeAxewell, item.axewsEye, item.southLakeMiloch, item.giantsSeat, item.northLakeMiloch, item.motostokeRiverbank, item.bridgeField, item.stonyWilderness, item.giantsMirror, item.dustyBowl, item.giantsCap, item.lakeOfOutrage, item.hammerlockeHills);
        hammerlocke.push(weather);
    }

    var postChampionData = data.afterChampion;
    for (var i = 0; i < postChampionData.length; i++) {
        var item = postChampionData[i];
        var weather = new Weather(item.date, item.rollingFields, item.dappledGrove, item.watchtowerRuins, item.westLakeAxewell, item.eastLakeAxewell, item.axewsEye, item.southLakeMiloch, item.giantsSeat, item.northLakeMiloch, item.motostokeRiverbank, item.bridgeField, item.stonyWilderness, item.giantsMirror, item.dustyBowl, item.giantsCap, item.lakeOfOutrage, item.hammerlockeHills);
        postChampion.push(weather);
    }
}