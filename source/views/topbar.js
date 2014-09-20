/**
 * Top bar view
 */

var
  _ = require('underscore'),
  Backbone = require('backbone');

var templates = require('../templates');

module.exports = Backbone.View.extend({

  tagName : 'header',

  events : {
    'click #pull' : 'toggleMenu'
  },

  template : templates.topbar,

  render : function () {
    this.$el.html(_.template(this.template, { variable : 'data' }));

    return this;
  },

  toggleMenu : function () {
    this.$el.find('.menu > ul').slideToggle();
  },

  hideMenu : function () {
    this.$el.find('.menu > ul').slideUp();
  }

});
