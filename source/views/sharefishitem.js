/**
 * Share fish item view
 */

var
  _ = require('underscore'),
  Backbone = require('backbone');

var templates = require('../templates/');

module.exports = Backbone.View.extend({

  template : templates.sharefishitem,
  tagName : 'li',

  render : function () {
    var tmpl = _.template(this.template, { variable : 'data' })
    this.$el.html(tmpl(this.model.toJSON()));
    return this;
  }
});
