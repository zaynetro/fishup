/**
 * Router
 */

var Backbone = require('backbone');

// Views
var AppView = require('./views/app');
var HomePageView = require('./views/homepage');
var FishingSpotView = require('./views/fishingspot');

// Collections
var FishingSpots = require('./collections/fishingspots');

// Models


// JSON (to be changed in the Future with server communication)
//var ferryRoutesJSON = require('./data/ferryRoutes');
var fishingSpotsJSON = require('./data/fishingSpots');

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
    'share' : 'allFishes',
    'share/add' : 'newFish',
    'tips' : 'tips',
    '*other' : 'home',
  },

  allFishes : function () {
    console.log('all fishes');
  },

  newFish : function () {
    console.log('all fishes');
  },

  tips : function () {
    console.log('all fishes');
  },

  home : function () {
    if(this.view) this.view.remove();

    var fishingSpots = new FishingSpots();
    fishingSpots.fromGeoJSON(fishingSpotsJSON);

    this.view = new HomePageView({
      spots : fishingSpots
    });

    this.app.toContent(this.view.render().el);

    this.view.setMap();

  }
});
