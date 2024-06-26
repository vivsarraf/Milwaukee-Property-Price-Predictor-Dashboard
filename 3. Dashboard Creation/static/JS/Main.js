// Initialize all the LayerGroups that we'll use. 4 total, 1 each for Stations, Attractions, Schools, and Properties. 
let layers = {
  // Stations: new L.LayerGroup(),
  // Attractions: new L.LayerGroup(),
  // Schools: new L.LayerGroup(),
  // Properties: new L.LayerGroup(), 
  AllProperties: new L.LayerGroup() 
};

// Add a base layer of the map from OpenStreetMap
let streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

let baseMaps = {
  Street: streetmap,
  Topography: topo
};

// Create the map with our layers.
let map = L.map("map", {
  //Center around Toronto and set zoom
  center: [43.06, -87.9065],
  zoom: 11.5,
  layers: [
    streetmap,
    // layers.Stations,
    // layers.Attractions,
    // layers.Schools,
    layers.AllProperties
  ]
});
// Add the streetmap to our map.
streetmap.addTo(map);

// Create a control for toggling our layers on and off, and add our overlays to it.
let overlays = {
  "All Properties": layers.AllProperties
};
// Add the layer control to our map.
L.control.layers(baseMaps, overlays).addTo(map);

// Attractions will use the default blue markers, so different markers will have to be creater for the other layers on the map.
// Create a yellow marker to be used for the schools' markers. 
// Defined properties include icon image, shadow image, size, anchor point, popup size when selected, and shadow size. 
var yellowIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Create a purple marker to be used for the properties' markers. 
// Defined properties include icon image, shadow image, size, anchor point, popup size when selected, and shadow size. 
var purpleIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


// Create a green marker to be used for the ttc subway stations' markers. 
// Defined properties include icon image, shadow image, size, anchor point, popup size when selected, and shadow size. 
var greenIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Create function to fetch properties data from the Flask App based on the filter criteria
function fetchProperties(filters) {
  console.log(filters)
  removeOverlayLayers()
  // Initialize the filter object
  // let filterObj = {};

  // // Validate and add the bedroom filter
  // if (filters["bdrms"]) {
  //   const bdrms = parseInt(filters["bdrms"]);
  //   if (!isNaN(bdrms)) {
  //     filterObj['bdrms'] = {'$gte': bdrms};
  //   } else {
  //     console.error('Invalid number of bedrooms:', filters["bdrms"]);
  //   }
  // }
  // Make a request to the Flask server to get properties data
  fetch('/api/PropertyListingsMilwaukee', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({'bdrms': {'$gte': parseInt(filters["bdrms"])}})
    // 'bathroom_full': {'$gte': parseInt(filters["bathroom_full"])}
  }) 
    // Parse the response as JSON
    .then(response => response.json()) 
    .then(data => {
      // Call the function to add markers for the filtered properties data
      addPropertyMarkers(data); 
      // Show the filtered data in the table below the map
      displayDataInTable(data);
    })
    // Logs errors, if any
    .catch(error => console.error('Error fetching data:', error)); 
}

// Create a global markers array for use in the below function to reset the markers whenever the property results filter critera is changed
var markers = [];

// Create function to add Property markers based on the data fetched from the Flask App
function addPropertyMarkers(data) {
  // Loop through existing markets and remove
  for (var i=0; i<markers.length; i++) {
    map.removeLayer(markers[i]);
  }
  // Initialize the markers array after it's been reset
  markers = []
  // Loop through each item in the JSON data
  for (var i = 0; i < data.length; i++) {
    // Assign the item to a variable
    var property = data[i];
    // Extract the latitude from the property information and assign it to a variable
    var lat = property.latitude;
    // Extract the longitude from the property information and assign it to a variable
    var long = property.longitude; 
    // Create a marker based on the latitude and longitude variables, 
    // Set the icon to the purple marker created above, and add the marker to the map
    var marker = L.marker([lat, long],{icon: purpleIcon}).addTo(map);
    // Add the markers to the markers array 
    markers.push(marker);
    // Add the property information to be shown in the pop-up when a marker is clicked
    marker.bindPopup("<b>" + "Address: " + "</b>" + property.address + "<br>" + "<b>" + "City: " + "</b>" + property.city + "<br>" + "<b>" + "Bedrooms: " + "</b>" + property.bdrms + 
                    "<br>" +  "<b>" + "Construction Year: " + "</b>" + property.year_built  + "<br>" + "<b>" + "Price: " + "</b>" + property.price);
  }
}

// Function to fetch properties and add them to the map
function fetchAllProperties() {
  // Make a request to the Flask server to get all properties data
  fetch('/api/AllPropertyListings')
    // Parse the response as JSON
    .then(response => response.json()) 
    .then(data => {
      // Call the function to add markers for the properties data
      addAllPropertyMarkers(data); 
    })
    // Logs errors, if any
    .catch(error => console.error('Error fetching data:', error)); 
}

// Create function to add property markers based on the data fetched from the Flask App
function addAllPropertyMarkers(data) {
  // Loop through each item in the JSON data
  for (var i = 0; i < data.length; i++) {
    // Assign the item to a variable
    var property = data[i];
    // Extract the latitude from the property information and assign it to a variable
    var lat = property.latitude; 
    // Extract the longitude from the property information and assign it to a variable
    var long = property.longitude;
    // Create a marker based on the latitude and longitude variables, 
    // Set the icon to the purple marker created above, and
    // Add the property information to be shown in the pop-up when a marker is clicked
    // Add the markers to the All Properties layer
    var propertyMarker = L.marker([lat, long],{icon: purpleIcon}).addTo(layers.AllProperties); 
    propertyMarker.bindPopup("<b>" + "Address: " + "</b>" + property.address + "<br>" + "<b>" + "City: " + "</b>" + property.city + "<br>" + "<b>" + "Bedrooms: " + "</b>" + property.bdrms + 
                    "<br>" +  "<b>" + "Construction Year: " + "</b>" + property.year_built  + "<br>" + "<b>" + "Price: " + "</b>" + property.price);
  }
}

// Create a helper function to format the popup content
function getPopupContent(properties) {
  // Define the layout and information to return
  return `<b>${properties.NAME}</b><br>
          Address: ${properties.Address}<br>
          Category: ${properties.CATEGORY}<br>
          Phone: ${properties.PHONE}<br>
          <a href="${properties.WEBSITE}" target="_blank">Website</a>`;
}

// Create a function to add the 4 layers (Schools, Stations, Attractions, and All Properties) 
// by calling their respective functions
map.on('overlayadd', function (eventLayer) {
  // if (eventLayer.name === 'Schools') {
  //   fetchSchools();
  // }
  // if (eventLayer.name === 'Stations') {
  //   fetchStations();
  // }
  // if (eventLayer.name === 'Attractions') {
  //   fetchAttractions();
  // }
  if (eventLayer.name === 'All Properties') {
    fetchAllProperties();
  }
});

// Call the properties function upon initial load
//document.addEventListener('DOMContentLoaded', fetchProperties);

// Create a function to remove the overlays so only the properties are shown upon initial load
function removeOverlayLayers() {
  Object.values(overlays).forEach(layer => {
    map.removeLayer(layer);
  });
}

// Call the function to remove overlay layers when the DOM content is loaded
document.addEventListener('DOMContentLoaded', removeOverlayLayers);

// Create a function to display the property data in the table based on the filter criteria
function displayDataInTable(data) {
  // Select the table element from the HTML file
  var tbody = document.querySelector('#property-table tbody');
  // Clear previous data
  tbody.innerHTML = ''; 

  let propertyIds = new Set();
  // Populate the table information
  data.forEach(property => {
    if (!propertyIds.has(property._id)) {
      propertyIds.add(property._id);
    console.log(data)
      var row = tbody.insertRow();
      var addressCell = row.insertCell(0);
      var cityCell = row.insertCell(1);
      var stateCell = row.insertCell(2);
      var zipcodeCell = row.insertCell(3);
      var finishedsqftCell = row.insertCell(4);
      var bdrmsCell = row.insertCell(5);
      var priceCell = row.insertCell(6);
      // Populate the table with the property information
      addressCell.textContent = property.address;
      cityCell.textContent = property.city;
      stateCell.textContent = property.state;
      zipcodeCell.textContent = property.zipcode;
      finishedsqftCell.textContent = property.finishedsqft;
      bdrmsCell.textContent = property.bdrms;
      priceCell.textContent = property.price;
      // Call the functions to display additional information based on the clicked row
      row.addEventListener('click', function() {
          selectRow(this,property);
          displayPropertyDetails(property);
      });
    }
  });
}

// Create a variable to see if a previous row was selected in order to reset the selection
var previousSelected = null;
// Create a function to identify the selected row and show the marker on the map
function selectRow(row,property) {
  // Reset the previous marker change
  resetMarker();
  // Select the table element from the HTML file
  var rows = document.querySelectorAll('#propertyTable tbody tr');
  // Reset the previous selection if applicable
  rows.forEach(r => r.classList.remove('selected'));
  row.classList.add('selected');
  if (previousSelected !== null) {
    resetMarker(previousSelected);
}
  // Change the colour of the marker of the selected property on the map
  var selectedProperty = property;
    console.log("Selected property:", property);
    map.eachLayer(function (layer) {
      if (layer instanceof L.Marker) {
          var markerProperty = layer.getLatLng();
          if (Math.abs(markerProperty.lat - selectedProperty.latitude) < 0.0001 &&
              Math.abs(markerProperty.lng - selectedProperty.longitude) < 0.0001) {
              layer.setIcon(L.icon({
                  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                  popupAnchor: [1, -34],
              }));
              previousSelected = layer;
          }
      }
  });
}

// Create a function to reset the marker colour of a previously selected row back to purple for properties
function resetMarker(marker){
  if (marker !== undefined && marker !== null) {
    // Changing to reset colour to purple to represent properties
    marker.setIcon(L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
            }));
  }
}

// Create a function to display additional property information based on the selected row
function displayPropertyDetails(property) {
  var tbody = document.querySelector('#propertyDetails tbody');
  tbody.innerHTML = ''; // Clear previous data
  var row = tbody.insertRow();
  var addressCell = row.insertCell(0);
  var cityCell = row.insertCell(1);
  var stateCell = row.insertCell(2);
  var zipcodeCell = row.insertCell(3);
  var styleCell = row.insertCell(4);
  var extwallCell = row.insertCell(5);
  var yearbuiltCell = row.insertCell(6);
  var finishedsqftCell = row.insertCell(7);
  var lotsizeCell = row.insertCell(8);
  var bdrmsCell = row.insertCell(9);
  var bathroomsCell = row.insertCell(10);
  var priceCell = row.insertCell(11);
  var predictionCell = row.insertCell(12);

  // Populate the table with the property information
  addressCell.textContent = property.address;
  cityCell.textContent = property.city;
  stateCell.textContent = property.state;
  zipcodeCell.textContent = property.zipcode;
  styleCell.textContent = property.style;
  extwallCell.textContent = property.extwall;
  yearbuiltCell.textContent = property.year_built;
  finishedsqftCell.textContent = property.finishedsqft;
  lotsizeCell.textContent = property.lotsize;
  bdrmsCell.textContent = property.bdrms;
  bathroomsCell.textContent = property.baths_total;
  priceCell.textContent = property.price;
  predictionCell.textContent = property.predictions_2025;
}

// Create a function to get form data from the HTML form element
function getData(form) {
  var formData = new FormData(form);
  var filters = Object.fromEntries(formData);
  console.log("Form Data:", filters);
  // Call the function to get property information based on the HTML form filter
  fetchProperties(Object.fromEntries(formData));
}

// Get the data by calling the function when the submit button is clicked
document.getElementById("myForm").addEventListener("submit", function (e) {
  e.preventDefault();
  getData(e.target);
});



// // Create function to fetch school data from the Flask App
// function fetchSchools() {
//   // Make a request to the Flask server to get the schools data
//   fetch('/api/toronto_schools') 
//     // Parse the response as JSON
//     .then(response => response.json())
//     .then(data => {
//       // Call the function to add markers for the schools data
//       addSchoolMarkers(data); 
//     })
//     // Logs errors, if any
//     .catch(error => console.error('Error fetching data:', error)); 
// }

// // Create function to add school markers based on the data fetched from the Flask App
// function addSchoolMarkers(response) {
//   // Loop through each item in the JSON data
//   for (let index = 0; index < response.length; index++) {
//     // Assign the item to a variable
//     var school = response[index];
//     // Extract the latitude from the school information and assign it to a variable
//     var lat = school.LAT; 
//     // Extract the longitude from the school information and assign it to a variable
//     var long = school.LONG;
//     // Create a marker based on the latitude and longitude variables, 
//     // Set the icon to the yellow marker created above, and
//     // Add the school information to be shown in the pop-up when a marker is clicked
//     // Add the markers to the Schools layer
//     var schoolMarker = L.marker([lat, long],{icon: yellowIcon}).bindPopup("<b>" + "School: " + "</b>" + school.NAME + "</b>" + "<br>" + "<b>" + "Address: " + "</b>" + school.SOURCE_ADDRESS + "<br>" + "<b>" + "City: " + "</b>" + school.CITY + "</b>" + 
//       "<br>" + "<b>" + "Postal Code: " + "</b>" + school.POSTAL_CODE + "<br>"+"<b>" + "Municipality: "+ "</b>"  + school.MUNICIPALITY ).addTo(layers.Schools); 
//   }
// }

// // Create function to fetch subway stations data from the Flask App
// function fetchStations() {
//   // Make a request to the Flask server to get the stations data
//   fetch('/api/subway_stations') 
//     // Parse the response as JSON
//     .then(response => response.json()) 
//     .then(data => {
//       // Call the function to add markers for the stations data
//       addStationMarkers(data);
//     })
//     // Logs errors, if any
//     .catch(error => console.error('Error fetching data:', error)); 
// }

// // Create function to add station markers based on the data fetched from the Flask App
// function addStationMarkers(data) {
//   // Loop through each item in the JSON data
//     for (let i = 0; i < data.length; i++) {
//       // Assign the item to a variable
//       var station = data[i];
//       // Extract the latitude from the station information and assign it to a variable
//       var latitude = station.LAT; 
//       // Extract the longitude from the station information and assign it to a variable
//       var longitude = station.LON; 
//       // Create a marker based on the latitude and longitude variables, 
//       // Set the icon to the green marker created above, and
//       // Add the station information to be shown in the pop-up when a marker is clicked
//       // Add the markers to the Stations layer
//       var marker = L.marker([latitude, longitude],{icon: greenIcon}).addTo(layers.Stations);
//       marker.bindPopup("<b>" + "Station: " + "</b>" + station.Station + "</b>" + "<br>" + "<b>" + "Address: " + "</b>" + station.Address + "<br>" + "<b>" + "City: " + "</b>" + station.City + "</b>" + 
//       "<br>" + "<b>" + "Accessibility: " + "</b>" + station.Accessibility + "<br>" + "<b>" + "Parking Spaces: "+ "</b>" + station.Parking_Spaces + "<br>" + "<b>" + "Average Weekly Ridership: " + "</b>" + station.Ridership_Weekly_Average);
//   };
// }

// // Create function to fetch attractions data from the Flask App
// function fetchAttractions() {
//   // Make a request to the Flask server to get the attractions data
//   fetch('/api/attractions')
//     // Parse the response as JSON
//     .then(response => response.json()) 
//     .then(data => {
//       // Call the function to add markers for the attractions data
//       addMarkersToMap(data); 
//     })
//     // Logs errors, if any
//     .catch(error => console.error('Error fetching data:', error)); 
// }

// // Create function to add attractions markers using GeoJSON data
// function addMarkersToMap(data) {
//   L.geoJSON(data,  {
//     onEachFeature: function (feature, layer) {
//        // Extract the coordinates and call the function to add the pop-up information details
//       if (feature.geometry && feature.geometry.coordinates[0]) {
//         // Extract the latitude and longitude from the GeoJSON coordinates
//         const [longitude, latitude] = feature.geometry.coordinates[0];
//         // Bind a popup with the attraction details by calling the function
//         layer.bindPopup(getPopupContent(feature.properties));
//       }
//     }
//   // Add the markers to the Attractions layer
//   }).addTo(layers.Attractions);
// }
