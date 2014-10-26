/**
 * Home page view
 */

var
  L = require('leaflet'),
  _ = require('underscore'),
  Backbone = require('backbone');

var templates = require('../templates');

var FishingSpotView = require('./fishingspot');

var markerStyles = require('../util/markerstyles');

// REMOVE
var ferryRoutesJSON = require('../data/ferryRoutes');

module.exports = Backbone.View.extend({

  template : templates.homepage,

  subviews : {},
  location : null,

  events : {
    'click .my-location-btn' : 'showMyLocation'
  },

  initialize : function (options) {
    options = options || {};
    this.spots = options.spots;
    this.spots.on('sync', this.setSpots, this);
  },

  render : function () {
    this.$el.html(_.template(this.template));
    return this;
  },

  toGlobal : function (view) {
    if(this.subviews.global) this.subviews.global.remove();

    this
      .$el
      .find('#global')
      .html(view.render().$el.fadeIn());

    this.subviews.global = view;
  },

  // Form a content of ferry routes popup
  ferryPopup : function (feature) {
    var str = '<b>Nimi:</b> ' +
      feature.properties.NIMI;

    if(feature.properties.LINK) {
      str += '<br>'           +
      '<b><a href='           +
      feature.properties.LINK +
      ' target="_blank">Schedule</a></b>';
    }

    return str;
  },

  /**
   * Initialize map
   */
  initMap : function () {
    var map = L.map('map', { zoomControl:false }).setView([60.42, 22.14], 10);

    // create the tile layer with correct attribution
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

    // Load tiles from OpenStreetMap
    L.tileLayer(osmUrl, {
      attribution : osmAttrib,
      minZoom : 2,
      maxZoom : 18
    }).addTo(map);

    this.map = map;
  },

  /**
   * Add point to map
   */
  setMap : function () {
    var
      w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      y = w.innerHeight|| e.clientHeight|| g.clientHeight;

    /*console.log(y);
    console.log(this.$('#topBar'));
    console.log(this.$('#topBar').height());*/

    this.$el.find('#map').height(y-68);

    if(!this.map) this.initMap();

    var self = this;
    // Read ferry routes from geoJSON and add to the map
    L.geoJson(ferryRoutesJSON, {
      style : function (feature) {
        return markerStyles.ferryStyle;
      },
      onEachFeature : function (feature, layer) {
        layer.bindPopup(self.ferryPopup(feature));
      }
    }).addTo(self.map);
  },

  // Update fishing spots on the map
  setSpots : function () {
    var self = this;
    // Read fishing spots from geoJSON and add to the map
    L.geoJson(self.spots.toGeoJSON(), {
      onEachFeature: function (feature, layer) {

        var fishingSpot = self.spots.where(feature);

        if(!Array.isArray(fishingSpot)) return;

        fishingSpot = fishingSpot[0];

        layer.addEventListener('click', function () {
          var fishingSpotView = new FishingSpotView({
            model : fishingSpot
          });

          self.toGlobal(fishingSpotView);
        }, false);

      },
      pointToLayer : function (feature, latlng) {
        return L.circleMarker(latlng, markerStyles.spotStyle);
      }
    }).addTo(self.map);
  },

  showMyLocation : function () {
    var self = this;

    if ("geolocation" in navigator) {
      /* geolocation is available */
      navigator.geolocation.getCurrentPosition(function(position) {
        var latlng = L.latLng(position.coords.latitude, position.coords.longitude);
        if(self.location) self.map.removeLayer(self.location);
        self.location = L.circleMarker(latlng, markerStyles.myLocationStyle).addTo(self.map);
      });
    }
  },

  remove : function() {
    _.invoke(this.subviews, 'remove');
    this.subviews = {};

    Backbone.View.prototype.remove.apply(this, arguments);
  }
});
