/**
 * Ferry routes collection
 */

var Backbone = require('backbone');

var FerryRoute = require('../models/ferryroute');

module.exports = Backbone.Collection.extend({
  model : FerryRoute
});
