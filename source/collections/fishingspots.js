/**
 * Fishing spots collection
 */

var Backbone = require('backbone');

var FishingSpot = require('../models/fishingspot');

module.exports = Backbone.Collection.extend({
  model : FishingSpot
});
