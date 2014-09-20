/**
 * Home page view
 */

var
  L = require('../libs/leaflet'),
  _ = require('underscore'),
  Backbone = require('backbone');

var templates = require('../templates');

var FishingSpotView = require('./fishingspot');

// REMOVE
var ferryRoutesJSON = require('../data/ferryRoutes');

module.exports = Backbone.View.extend({

  template : templates.homepage,

  subviews : {},

  initialize : function (options) {
    options = options || {};

    this.spots = options.spots;

    // Styles for fishing spots circleMarker
    this.spotStyle = {
      fillColor : '#f03',
      fillOpacity : 0.7,
      stroke : false
    };

    // Styles for ferry routes polyline
    this.ferryStyle = {
      color : '#000',
      fillColor : '#000',
      weight : 10,
      fillOpacity : 0.5
    };

    // Form a content of ferry routes popup
    this.ferryPopup = function (feature) {
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
      .html(view.render().el);

    this.subviews.global = view;
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
    if(!this.map) this.initMap();

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
        return L.circleMarker(latlng, self.spotStyle);
      }
    }).addTo(self.map);


    // Read ferry routes from geoJSON and add to the map
    L.geoJson(ferryRoutesJSON, {
      style : function (feature) {
        return self.ferryStyle;
      },
      onEachFeature : function (feature, layer) {
        layer.bindPopup(self.ferryPopup(feature));
      }
    }).addTo(self.map);
  },

  remove : function() {
    _.invoke(this.subviews, 'remove');
    this.subviews = {};

    Backbone.View.prototype.remove.apply(this, arguments);
  }
});
