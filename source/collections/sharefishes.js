/**
 * Share fish collection
 */

var Backbone = require('backbone');
var ShareFish = require('../models/sharefish');
var api = require('../util/api');

module.exports = Backbone.Collection.extend({
  model : ShareFish,

  url : api.parseBaseUrl + 'ShareFish',

  parse : function (data) {
    return data.results;
  }
});
