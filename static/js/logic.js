// Create a map object.
let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});

const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson'

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);


// Perform a GET request to the query URL.
d3.json(url).then(function (data) {
    // console.log(data.features);

    createFeatures(data.features);

}); // json


    // Loop to Create each circle per earthquakeData inclued in the Jason data response.

function createFeatures(earthquakeData) {

        for (let i = 0; i < earthquakeData.length; i++) {

            L.circle([earthquakeData[i].geometry.coordinates[1],
                earthquakeData[i].geometry.coordinates[0]], {
                fillOpacity: 0.75,
                fillColor: setColor(earthquakeData[i].geometry.coordinates[2]),
                color: setColor(earthquakeData[i].geometry.coordinates[2]),
                // Setting our circle's radius to equal the output of our markerSize() function:
                // This will make our marker's size proportionate to its population.
                radius: earthquakeData[i].properties.mag * 12000
            }).bindPopup(`<h1>${earthquakeData[i].properties.place}</h1> <hr> 
            <p>Date: ${new Date(earthquakeData[i].properties.time)}</p>
            <p>Depth: ${earthquakeData[i].geometry.coordinates[2]}</p>
            <p>Magnitude: ${earthquakeData[i].properties.mag}</p>`
            ).addTo(myMap);

        } // for

    } // createFeatures



    // this function returns a specified color based on the depth property 

  function setColor(depth) {

        let selection = "";

        if (depth<=10) {selection = "#30BB0A"}
        else if (depth<=20) {selection = "#A5978B"}
        else if (depth<=60) {selection = "#5C4742"}
        else if (depth<=80) {selection = "#A5978B"}
        else if (depth<=100) {selection = "#5C4742"}
        else selection = "";

        return selection;

    } // setColor

