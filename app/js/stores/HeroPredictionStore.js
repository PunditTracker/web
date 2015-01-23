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
      cb(null, this.prediction);
      this.trigger(null, this.prediction);
    }.bind(this)).catch(function(err) {
      cb(err);
      this.trigger(err);
    }.bind(this));
  }

});

module.exports = HeroPredictionStore;