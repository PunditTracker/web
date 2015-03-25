'use strict';

var Reflux          = require('reflux');

var HomePageActions = require('../actions/HomePageActions');
var HomePageAPI     = require('../utils/HomePageAPI');

var HomePagePredictionsStore = Reflux.createStore({

  init: function() {
    this.predictions = null;

    this.listenTo(HomePageActions.loadPredictions, this.loadPredictions);
  },

  loadPredictions: function(cb) {
    cb = cb || function() {};

    console.log('get home page predictions');

    HomePageAPI.getPredictions().then(function(predictions) {
      console.log('got home page predictions:', predictions);
      this.predictions = predictions;
      cb(null, this.predictions);
      this.trigger(null, this.predictions);
    }.bind(this)).catch(function(err) {
      cb(err);
      this.trigger(err);
    }.bind(this));
  }

});

module.exports = HomePagePredictionsStore;