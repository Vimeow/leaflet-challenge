// Connects to geojson API using D3 -------------------------

// Store the API endpoint in URL variable
let URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Retrive the geoJSON data using d3.json() function
d3.json(URL).then(function (data) {
    // Code to handle the GeoJSON data goes here

    // Console log data 
    console.log(data);
    console.log(data.features);
    console.log(data.features.length);
    console.log(data.features[1]);

    // Access features
    const features = data.features;
    console.log(features);

    // Create function for circle size base of earthquake magnitude
    function circleSize(magnitude) {
        return magnitude*40000;
    };

    // Create function for circle color base of earthquake depth
    function circleColor(depth) {
        if (depth < 10) return "#ff9900";
        else if (depth < 30) return "#e07a0a";
        else if (depth < 50) return "#ba5417";
        else if (depth < 70) return "#942e24";
        else if (depth < 90) return "#6e0830";
        else return "#000066"
    };

    // Create a circle layer group
    const circleLayerGroup = L.layerGroup();

    // Access each GeoJson features and create circle
    features.forEach(function(feature){
        
        // Getting coordinates of the earthquake, location, time, magnitude and depth
        const longitude = feature.geometry.coordinates[1];
        const latitude= feature.geometry.coordinates[0];
        const location = feature.properties.place;
        const date = new Date(feature.properties.time);
        const magnitude = feature.properties.mag;
        const depth = feature.geometry.coordinates[2];

        // Create a circle for each feature
        const circle = L.circle([longitude,latitude], {
            color: circleColor(depth),
            fillColor: circleColor(depth),
            fillOpacity: 0.5,
            radius: circleSize(magnitude)
        }).bindPopup(`<h4>Location: </h4>${location}<br><h4>Date: </h4>${date}<br><h4>Magnitude: </h4>${magnitude}<br><h4>Depth: </h4>${depth}`);

        // Add the circle to the layer group
        circleLayerGroup.addLayer(circle);
    });

    // Create base layers contain the maps we want to display

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

    // Add the default osm and circleLayerGroup to the map

    var map = L.map('map', {
    center: [40, 10],
    zoom: 2,
    layers: [osm, circleLayerGroup]
    });

    // Create an object contain base layers

    var baseMaps = {
    "OpenStreetMap": osm,
    "OpenStreetMap.HOT": osmHOT,
    "opentopomap": openTopoMap
    };

    // Create an object contain overlay layer
    var overlayMaps = {
    "Earthquakes": circleLayerGroup
    };

    // Create a layer control and add it to the map
    var layerControl = L.control.layers(baseMaps, overlayMaps, {collapsed: false}).addTo(map);

    // Before create a legend, first
    // create a list of values to feed in the circleColor() function
    // The generateIntervalList() function takes a start value, an end value, and a step size as parameters and generates an array of intervals.
    function generateIntervalList(start, end, step) {
    const intervalList = [];
    for (let i = start; i <= end; i += step) {
        const interval = i === end ? `${i}+` : i;
        intervalList.push(interval);
    }
    return intervalList;
    } 
    
    const generatedList = generateIntervalList(-10, 110, 20);
    console.log(generatedList)
    
    // Create a legend
    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = function (map) {
        const div = L.DomUtil.create('div', 'legend');
        const grades = generatedList; // Customize the legend values
        const labels = [];
        
        // Loop through color intervals and generate labels
        for (let i = 0; i < grades.length - 1; i++) {
            div.innerHTML += '<i style="background:' + circleColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }     
        
        return div;
    };   
    
    legend.addTo(map);

});
