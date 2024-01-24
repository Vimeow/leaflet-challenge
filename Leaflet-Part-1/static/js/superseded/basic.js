// // Create markers (each marker sitting on one layer)----------
// var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
//     denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
//     aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
//     golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');

// Create circles

var littleton = L.circle([39.61, -105.02], {color: 'red', fillColor: '#f03', fillOpacity: 0.5, radius: 500}).bindPopup('This is Littleton, CO.'),
    denver    = L.circle([39.74, -104.99], {color: 'red', fillColor: '#f03', fillOpacity: 0.5, radius: 500}).bindPopup('This is Denver, CO.'),
    aurora    = L.circle([39.73, -104.8], {color: 'red', fillColor: '#f03', fillOpacity: 0.5, radius: 500}).bindPopup('This is Aurora, CO.'),
    golden    = L.circle([39.77, -105.23], {color: 'red', fillColor: '#f03', fillOpacity: 0.5, radius: 500}).bindPopup('This is Golden, CO.');

// Group all the marker layers into one layer (this is like using pptx)

var cities = L.layerGroup([littleton, denver, aurora, golden]);

// Create base layers contain the maps we want to display----------

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
});

var osmHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France'
});

var openTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)'
});

// Add the default osm to the map----------
var map = L.map('map', {
    center: [39.73, -104.99],
    zoom: 10,
    layers: [osm]
});

// Create an object contain base layers----------

var baseMaps = {
    "OpenStreetMap": osm,
    "OpenStreetMap.HOT": osmHOT,
    "opentopomap": openTopoMap
};

// Create an object contain overlay layer----------
var overlayMaps = {
    "Cities": cities
};

// Create a layer control and add it to the map----------
var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);










// Store last-week-earthquake information api endpoint in a variable
let URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Connects to geojson API using D3 and console log the data
d3.json(URL).then(function (data) {console.log(data);

});
