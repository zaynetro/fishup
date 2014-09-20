var L = require('./libs/leaflet');

var Backbone = require('backbone');
var $ = require('jquery');

Backbone.$ = $;

var ferryRoutesJSON = require('./data/ferryRoutes');

var fishingSpotsJSON = require('./data/fishingSpots');


var FishingSpot = require('./models/fishingspot');

var FishingSpots = require('./collections/fishingspots');

var FishingSpotView = require('./views/fishingspot');

var AppView = require('./views/app.js');

document.onload = function () {

  // Init app
  var app = new AppView({
    el : '#app'
  });

  app.render();

  var fishingSpots = new FishingSpots();

  // Make map full-screen
  //var mapDom = document.getElementById('map');
  //mapDom.style.height = document.body.clientHeight;

  // Init map
  var map = require('./map.js');


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
  L.geoJson(fishingSpotsJSON, {
    onEachFeature: function (feature, layer) {

      var fishingSpot = new FishingSpot(feature);
      fishingSpots.add(fishingSpot);

      layer.addEventListener('click', function () {
        console.log('go');
        var fishingSpotView = new FishingSpotView({
          model : fishingSpot
        });

        app.toGlobal(fishingSpotView);
      }, false);

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
  L.geoJson(ferryRoutesJSON, {
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
  /*var addedPoints = [];

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
  }, false);*/


  /*var myLocBtn = document.getElementById('myLocBtn');

  myLocBtn.addEventListener('click', function () {
    // Get current location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {

        console.log(position);

      }, function () {
        console.log('Failed to determine location');
      });
    }
  }, false);*/

}();
