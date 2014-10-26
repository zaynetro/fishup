/**
 * Fishing spots collection
 */

var Backbone = require('backbone');
var FishingSpot = require('../models/fishingspot');
var api = require('../util/api');

module.exports = Backbone.Collection.extend({
  model : FishingSpot,

  url : api.parseBaseUrl + 'FishingSpot',

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
  },

  parse : function (data) {
    return data.results;
  }
});
