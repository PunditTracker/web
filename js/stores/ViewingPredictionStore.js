'use strict';

var Reflux        = require('reflux');

var GlobalActions = require('../actions/GlobalActions');
var PredictionAPI = require('../utils/PredictionAPI');

var ViewingPredictionStore = Reflux.createStore({

  init: function() {
    this.prediction = null;

    this.listenTo(GlobalActions.loadPrediction, this.loadPrediction);
  },

  loadPrediction: function(identifier, cb = function() {}) {
    console.log('get prediction:', identifier);

    PredictionAPI.get(identifier).then(prediction => {
      this.prediction = prediction;
      cb(null, this.prediction);
      this.trigger(null, this.prediction);
    }).catch(err => {
      cb(err);
      this.trigger(err);
    });
  }

});

module.exports = ViewingPredictionStore;