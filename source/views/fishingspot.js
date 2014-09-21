/**
 * Fishing spot popup view
 */

var
  _ = require('underscore'),
  Backbone = require('backbone');

var templates = require('../templates');

var fishingSpotHelpers = require('../util/fishingspot');

module.exports = Backbone.View.extend({

  className : 'popup',

  template : templates.fishingspot,

  events : {
    'click #close' : 'close'
  },

  initialize : function () {
    this.model.loadWeather();

    this.model.on('all', this.render, this);
  },

  render : function () {
    var tmpl = _.template(this.template, { variable : 'data' });

    var data = this.model.toJSON();

    _.extend(data, fishingSpotHelpers);

    this
      .$el
      .html(tmpl(data));

    return this;
  },

  close : function () {
    this.$el.fadeOut();

    setTimeout((function () {
      Backbone.View.prototype.remove.apply(this, arguments);
    }).bind(this), 500);

  }

});
