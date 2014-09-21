/**
 * Fishing spot model
 */

var
  $ = require('jquery'),
  Backbone = require('backbone');

module.exports = Backbone.Model.extend({

  loadWeather : function () {
    var coords = this.get('geometry').coordinates;

    $.get('http://api.openweathermap.org/data/2.5/weather?lat=' +
          coords[1] +
          '&lon=' +
          coords[0], (function (data) {
      this.set('weather', data);
    }).bind(this));
  }
});
