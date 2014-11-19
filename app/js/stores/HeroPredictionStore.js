'use strict';

var Reflux          = require('reflux');

var HomePageActions = require('../actions/HomePageActions');
var HomePageAPI     = require('../utils/HomePageAPI');

var HeroPredictionStore = Reflux.createStore({

  init: function() {
    this.listenTo(HomePageActions.loadHeroPrediction, this.loadPrediction);
  },

  loadPrediction: function(subcategory, cb) {
    cb = cb || function() {};

    console.log('get hero prediction');

    HomePageAPI.getHeroPrediction().then(function(prediction) {
      console.log('got hero prediction:', prediction);
      this.prediction = prediction;
      this.trigger(prediction);
      cb();
    }.bind(this)).catch(function(e) {
      // TODO: deal with error
      console.log('error loading hero prediction:', e);
    });
  }

});

module.exports = HeroPredictionStore;