// Make map full-screen
var mapDom = document.getElementById('map');
mapDom.style.height = document.body.clientHeight;

// Navigate to Turku area
var map = L.map('map').setView([60.42, 22.14], 10);

// create the tile layer with correct attribution
var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

// Load tiles from OpenStreetMap
L.tileLayer(osmUrl, {
  attribution: osmAttrib,
  minZoom: 2,
  maxZoom: 18
}).addTo(map);


// Styles for fishing spots circleMarker
var fishSpotStyle = {
  fillColor : '#f03',
  fillOpacity : 0.7,
  stroke : false
};

// Form a content of fishing spot popup
var fishSpotPopup = function (feature) {
  return '<b>Paikka:</b> '    +
    feature.properties.Paikka +
    '<br>'                    +
    '<b>Kuvaus</b> '          +
    feature.properties.Kuvaus;
};

// Read fishing spots from geoJSON and add to the map
L.geoJson(data, {
  onEachFeature: function (feature, layer) {
    layer.bindPopup(fishSpotPopup(feature));
  },
  pointToLayer : function (feature, latlng) {
    return L.circleMarker(latlng, fishSpotStyle);
  }
}).addTo(map);


// Styles for ferry routes polyline
var ferryStyle = {
  color : '#000',
  fillColor : '#000',
  weight : 10,
  fillOpacity : 0.5
};

// Form a content of ferry routes popup
var ferryPopup = function (feature) {
  var str = '<b>Nimi:</b> ' +
    feature.properties.NIMI;

  if(feature.properties.LINK) {
    str += '<br>'           +
    '<b><a href='           +
    feature.properties.LINK +
    ' target="_blank">Schedule</a></b>';
  }

  return str;
};

// Read ferry routes from geoJSON and add to the map
L.geoJson(ferries, {
  style : function (feature) {
    return ferryStyle;
  },
  onEachFeature : function (feature, layer) {
    layer.bindPopup(ferryPopup(feature));
  }
}).addTo(map);

/**
 * Map events
 */

var curClick = null;

var coordField = document.getElementById('coordinates');
var descField = document.getElementById('description');
var addBtn = document.getElementById('addBtn');

map.on('click', function (e) {

  // Represent cirle on the map
  if(!curClick) {
    curClick = L.circleMarker(e.latlng, {
      color : '#39C44C'
    }).addTo(map);
  } else {
    curClick.setLatLng(e.latlng);
  }

  coordField.value = e.latlng.lat + ', ' + e.latlng.lng;
});

// Handle adding new points to the map
var addedPoints = [];

addBtn.addEventListener('click', function () {
  var desc = descField.value;
  if(!desc.length) return;

  var latlng = new L.latLng(coordField
                              .value
                              .split(',')
                              .map(function (el) { return el.trim(); }));

  var point = L.circleMarker(latlng, fishSpotStyle).addTo(map);

  point.bindPopup('<b>Description: </b>' + desc);
  descField.value = '';
  addedPoints.push(point);
}, false);
