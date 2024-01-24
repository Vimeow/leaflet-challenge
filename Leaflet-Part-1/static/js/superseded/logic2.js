// Part 1: Create the Earthquake Visualisation -------------------------

// Creating the map object
let myMap = L.map("map", {
    center: [40.7128, -74.0059],
    zoom: 2
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  // Use this link to get the GeoJSON data.
  let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

  // Function to determine maker color by the depth of the earthquake
function markerColor(depth) {
    if (depth < 10) return "#00FF00";
    else if (depth < 30) return "greenyellow";
    else if (depth < 50) return "yellow";
    else if (depth < 70) return "orange";
    else if (depth < 90) return "orangered";
    else return "#FF0000"
}

// Getting our GeoJSON data
d3.json(link).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
      // Styling each feature (in this case, a neighbourhood)
      style: function(feature) {
        return {
          color: "white",
          // Call the markerColor() function to decide which color to colour our neighbourhood. (The colour is based on the borough.)
          fillColor: markerColor(feature.properties.mag),
          fillOpacity: 0.5,
          weight: 1.5
        };
      },
      // This is called on each feature.
      onEachFeature: function(feature, layer) {
        // Giving each feature a popup with information that's relevant to it
        layer.bindPopup(`<h3>Location:</h4> ${feature.properties.place}, <h4>Date:</h4> ${new Date(feature.properties.time)}, <h4>Magnitude:</h4> ${feature.properties.mag}, <h4>Depth: ${feature.geometry.coordinates[2]}`);
      }
    }).addTo(myMap);
  });