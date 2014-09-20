/**
 * App view
 */

var
  _ = require('underscore'),
  Backbone = require('backbone');

var templates = require('../templates/');

var TopBarView = require('./topbar.js');

module.exports = Backbone.View.extend({

  template : templates.app,

  subviews : {},

  initialize : function () {
    this.subviews.topbar = new TopBarView();
  },

  render : function () {
    this.$el.html(_.template(this.template, {}, { variable : 'data' }));

    this.$el.find('#topBar').html(this.subviews.topbar.render().el);

    return this;
  },

  assign : function (view, selector, options) {
    view.setElement(this.$(selector)).render(options);
  },

  toGlobal : function (view) {
    if(this.subviews.global) this.subviews.global.remove();

    this
      .$el
      .find('#global')
      .html(view.render().el);

    this.subviews.global = view;
  },

  remove : function() {
    _.invoke(this.subviews, 'remove');
    this.subviews = {};

    Backbone.View.prototype.remove.apply(this, arguments);
  }
});
