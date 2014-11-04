/**
 * About page view
 */

var
  _ = require('underscore'),
  Backbone = require('backbone');

var templates = require('../templates/');

module.exports = Backbone.View.extend({

  className : 'aboutpage',

  template : templates.aboutpage,

  render : function () {
    this.$el.html(_.template(this.template, { variable : 'data' }));
    return this;
  }

});
