/**
 * App
 */

var Backbone = require('backbone');
var $ = require('jquery');

window.jQuery = $;
require('./libs/slick.min');

Backbone.$ = $;

var Router = require('./router');

$(document).ready(function () {

  window.router = new Router();

  Backbone.history.start({
    pushState : true
  });

  /**
   * Bind events to all local links
   */
  $(document).on('click', 'a[data-local]', function (e) {
    var href = $(this).attr('href');
    var protocol = this.protocol + '//';

    if(href.slice(protocol.length) !== protocol) {
      e.preventDefault();
      window.router.navigate(href, true);
    }
  });

});


  /**
   * Map events
   */

  /*
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
  });*/

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
