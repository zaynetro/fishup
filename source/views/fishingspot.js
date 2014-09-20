/**
 * Fishing spot popup view
 */

var
  _ = require('underscore'),
  Backbone = require('backbone');

var templates = require('../templates');

module.exports = Backbone.View.extend({

  className : 'popup',

  template : templates.fishingspot,

  events : {
    'click #close' : 'close'
  },

  render : function () {
    var tmpl = _.template(this.template, { variable : 'data' });

    this
      .$el
      .html(tmpl(this.model.toJSON()))
      .fadeIn();

    return this;
  },

  close : function () {
    this.$el.fadeOut();

    setTimeout((function () {
      Backbone.View.prototype.remove.apply(this, arguments);
    }).bind(this), 500);

  }

});
