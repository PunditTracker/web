'use strict';

var Reflux          = require('reflux');

var HomePageActions = require('../actions/HomePageActions');
var HomePageAPI     = require('../utils/HomePageAPI');

var HeroFeaturesStore = Reflux.createStore({

  init: function() {
    this.features = null;

    this.listenTo(HomePageActions.loadHeroFeatures, this.loadFeatures);
  },

  loadFeatures: function(cb) {
    cb = cb || function() {};

    console.log('get hero features');

    HomePageAPI.getHeroFeatures().then(function(features) {
      console.log('got hero features:', features);
      this.features = features;
      cb(null, this.features);
      this.trigger(null, this.features);
    }.bind(this)).catch(function(err) {
      cb(err);
      this.trigger(err);
    }.bind(this));
  }

});

module.exports = HeroFeaturesStore;