// Part 1: Create the Earthquake Visualisation -------------------------

// Store last-week-earthquake information api endpoint in a variable
let URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Connects to geojson API using D3 and console log the data
d3.json(URL).then(function (data) {console.log(data)});

// Function to create markers with size corresponding to earthquake magnitude -------------------------
function markerSizes(magnitude) {
    return magnitude*50000;
}

// Function to determine maker color by the depth of the earthquake -------------------------
function markerColors(depth) {
    if (depth < 10) return "#ff9900";
    else if (depth < 30) return "#e07a0a";
    else if (depth < 50) return "#ba5417";
    else if (depth < 70) return "#942e24";
    else if (depth < 90) return "#6e0830";
    else return "#000066";
} // Vy change the color!

// Connects to geojson API using D3 and send the features object to the createFeature()
d3.json(URL).then(function (data) {createFeatures(data.features)});

// Define createFeatures()
function createFeatures(earthquakeData){
    // Define a function to be run for each feature in the feature array
    // For each feature in the features array, create a pop-up that provide additional information about the earthquake when its associated marker is clicked (place, time, magnitude, depth)
    function onEachFeature(feature, layer){
        layer.bindPopup(`<h4>Location: </h4>${feature.properties.place}<br>
        <h4>Date: </h4>${new Date(feature.properties.time)}<br>
        <h4>Magnitude: </h4>${feature.properties.mag}<br>
        <h4>Depth: </h4>${feature.geometry.coordinates[2]}`);
    }

    // Create a geoJSON layer
    let earthquakes = L.geoJSON(earthquakeData,{
        onEachFeature: onEachFeature,
        pointToLayer: function(feature, latlng){
            // Define marker properties
            let markers = {
                radius: markerSizes(feature.properties.mag),
                fillColor: markerColors(feature.geometry.coordinates[2]),
                fillOpacity: 0.7,
                color: "black",
                stroke: true,
                weight: 0.5
            }
            return L.circle(latlng, markers);
        }   
    })
    
    //Send the earthquake layer to the createMap Function
    createMap(earthquakes);
}

// Function to create a map -------------------------
function createMap(earthquakes) {
    // Create a tile layer that will be the background map
    let backgroundMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // Create a baseMaps object to hold the background map layer
    let baseMaps = {
    "Background Map": backgroundMap
    };

    // Create an overlayMaps object to hold the earthquakes layer
    let overlayMaps = {
    "Earthquakes": earthquakes
    };

    // Create the map object with options to the background map layer and the earthquakes layer
    let myMap = L.map("map", {
        center: [40, 10],
        zoom: 3,
        layer: [baseMaps, overlayMaps]
    });

    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
    }).addTo(myMap);

    // Create a legend
    let legend = L.control({
        position: 'bottomright'
    });

    legend.onAdd = function () {

        var div = L.DomUtil.create('div', 'info legend'),
            magnitude = [-10, 10, 30, 50, 70, 90];
    
        for (var i = 0; i < magnitude.length; i++) {
          div.innerHTML +=
            '<i style="background:' + markerColors(magnitude[i] + 1) + '"></i> ' +
            magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
        }
    
        return div;
      };
    
      legend.addTo(myMap);
    
}