// Part 1: Create the Earthquake Visualisation -------------------------


// Connects to geojson API using D3 -------------------------
// Create a variable to store last-week-earthquake information api endpoint
let URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Connects to geojson API using D3 and console log the data
d3.json(URL).then(function (data) {console.log(data)});


// Function to create markers with size corresponding to earthquake magnitude -------------------------
function markerSizes(magnitude) {
    return magnitude*100;
}


// Function to determine maker color by the depth of the earthquake -------------------------
function markerColors(depth) {
    if (depth < 10) return "#00FF00";
    else if (depth < 30) return "greenyellow";
    else if (depth < 50) return "yellow";
    else if (depth < 70) return "orange";
    else if (depth < 90) return "orangered";
    else return "#FF0000";
} // Vy change the color!


// Function to create features ------------------------- Still thinking
function createFeatures(earthquakeData){
    // For each feature in the features array, create a pop-up that provide additional information about the earthquake when its associated marker is clicked (place, time, magnitude, depth)
    function onEachFeature(feature, layer){
        layer.bindPopup(`Location: ${feature.properties.place}, Date: ${new Date(feature.properties.time)}, Magnitude: ${feature.properties.mag}, Depth: ${feature.geometry.coordinates[2]}`);
    }

    // Create a geoJSON layer
    let earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature, 
        PointToLayer: function(feature, latlng) {
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
    });

    // Send our earthquakes layer to the createMap function/
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
    }).addTo(mymap);
}














// Requirement --------------------------
// Map (60 points)
// TileLayer loads without error (20 points) - done

// Connects to geojson API using D3 without error (20 points) - done




// Markers with size corresponding to earthquake magnitude (10 points) - done

// A legend showing the depth and their corresponding colour (10 points)

// Data Points (40 points)
// Data points scale with magnitude level (10 points)

// Data points colours change with depth level (10 points)

// Each point has a tooltip with the Magnitude, the location and depth (10 points)

// All data points load in the correct locations (10 points)