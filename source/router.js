/**
 * Router
 */

var Backbone = require('backbone');

// Views
var AppView = require('./views/app');
var HomePageView = require('./views/homepage');
var TipsPageView = require('./views/tipspage');
var ShareFishView = require('./views/sharefish');
var AboutPageView = require('./views/aboutpage');

// Collections
var FishingSpots = require('./collections/fishingspots');
var FerryRoutes = require('./collections/ferryroutes');
var ShareFishes = require('./collections/sharefishes');

// Models

var api = require('./util/api');

module.exports = Backbone.Router.extend({

  initialize : function () {
    this.view = null;

    // Init app
    this.app = new AppView({
      el : '#app'
    });

    this.app.render();
  },

  routes : {
    'share' : 'shareFish',
    'tips' : 'tips',
    'about' : 'about',
    '*other' : 'home',
  },

  shareFish : function () {
    if(this.view) this.view.remove();

    var shareFishes = new ShareFishes();
    shareFishes.fetch({
      headers : api.parseHeader
    });

    this.view = new ShareFishView({
      collection : shareFishes
    });
    this.app.toContent(this.view.render().el);
  },

  tips : function () {
    if(this.view) this.view.remove();

    this.view = new TipsPageView();
    this.app.toContent(this.view.render().el);
  },

  about : function () {
    if(this.view) this.view.remove();

    this.view = new AboutPageView();
    this.app.toContent(this.view.render().el);
  },

  home : function () {
    if(this.view) this.view.remove();

    var fishingSpots = new FishingSpots();
    fishingSpots.fetch({
      headers : api.parseHeader
    });

    var ferryRoutes = new FerryRoutes();
    ferryRoutes.fetch({
      headers : api.parseHeader
    });

    this.view = new HomePageView({
      spots : fishingSpots,
      ferries : ferryRoutes
    });

    this.app.toContent(this.view.render().el);
    this.view.setMap();
  }
});
