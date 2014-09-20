/**
 * Set up map
 */

var L = require('./libs/leaflet');

module.exports = function () {
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

  return map;
}();
