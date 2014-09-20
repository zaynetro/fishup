/**
 * Tips page view
 */

var
  _ = require('underscore'),
  Backbone = require('backbone');

var templates = require('../templates/');

module.exports = Backbone.View.extend({

  className : 'tipspage',

  template : templates.tipspage,


  render : function () {
    this.$el.html(_.template(this.template, { variable : 'data' }));

    setTimeout((function () {
      this.$el.slick({
        dots: true
      });
    }).bind(this), 1);

    return this;
  }

});
