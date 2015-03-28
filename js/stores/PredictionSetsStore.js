'use strict';

var Reflux          = require('reflux');

var HomePageActions = require('../actions/HomePageActions');
var HomePageAPI     = require('../utils/HomePageAPI');

var PredictionSetsStore = Reflux.createStore({

  init: function() {
    this.sets = null;

    this.listenTo(HomePageActions.loadPredictionSets, this.loadSets);
  },

  loadSets: function(cb) {
    cb = cb || function() {};

    console.log('get prediction sets');

    HomePageAPI.getPredictionSet().then(function(predictionSets) {
      console.log('successfully got prediction sets');
      this.sets = predictionSets;
      cb(null, this.sets);
      this.trigger(null, this.sets);
    }.bind(this)).catch(function(err) {
      cb(err);
      this.trigger(err);
    }.bind(this));
  }

});

module.exports = PredictionSetsStore;