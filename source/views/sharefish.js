/**
 * Share fish page view
 */

var
  _ = require('underscore'),
  Backbone = require('backbone');

var templates = require('../templates/');
var api = require('../util/api');

var ShareFish = require('../models/sharefish');
var ShareFishView = require('./sharefishitem');

module.exports = Backbone.View.extend({

  template : templates.sharefishpage,

  events : {
    'change #take-picture' : 'shootPic'
  },

  initialize : function () {
    this.collection.on('sync', this.renderPics, this);
    this.collection.on('add', this.renderPics, this);
  },

  render : function () {
    this.$el.html(_.template(this.template, { variable : 'data' }));
    return this;
  },

  renderPics : function () {
    $list = this.$el.find('#imagesList');
    $list.empty();

    _.each(this.collection.models, function (model) {
      var shareFishView = new ShareFishView({
        model : model
      });
      $list.append(shareFishView.render().el);
    }, this);
  },

  shootPic : function (e) {
    var $showPic = this.$el.find('#show-picture');

    // Get a reference to the taken picture or chosen file
    var files = e.target.files,
        file;

    if (files && files.length > 0) {
      file = files[0];

      var shareFish = new ShareFish();
      shareFish.upload(file, (function () {
        this.collection.add(shareFish);
      }).bind(this));
    }
  }
});
