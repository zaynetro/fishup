/**
 * Fishing spots collection
 */

var Backbone = require('backbone');

var FishingSpot = require('../models/fishingspot');

module.exports = Backbone.Collection.extend({
  model : FishingSpot,

  fromGeoJSON : function (geoJSON) {
    this.add(geoJSON.features);
    return this;
  },

  toGeoJSON : function () {
    return {
      "type": "FeatureCollection",
      "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
      "features" : this.toJSON()
    };
  }
});
