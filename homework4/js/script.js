$(document).ready(function() {
})

function getLatestData() {
    var request = $.getJSON(
        "http://io.milowski.com/usgs/earthquakes/feed/v1.0/summary/all_hour.geojson",
        function(data) {
            buildTable(data);
        }
    );
}

function buildTable(data) {
    for (var i = 0; i < data.features.length; i++) {
        var record = $("<tr></tr>")
            .append("<td>" + data.features[i].properties.place + "</td>")
            .append("<td>" + new Date(data.features[i].properties.time).toLocaleString() + "</td>")
            .append("<td>" + data.features[i].properties.mag + "</td>")
            .append("<td>" + data.features[i].geometry.coordinates[2] + " km</td>")
            .append("<td>" + nullChecker(data.features[i].properties.felt) + "</td>")
            .append("<td>" + nullChecker(data.features[i].properties.alert) + "</td>")
            .append("<td>" + nullChecker(data.features[i].properties.tsunami) + "</td>")
        $(".table").append(record);
    }
}

// Check whether the given value is null or not
function nullChecker(value) {
    if (value) {
        return value;
    } else {
        return "-";
    }
}