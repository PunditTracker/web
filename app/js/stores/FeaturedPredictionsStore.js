'use strict';

var Reflux          = require('reflux');

var HomePageActions = require('../actions/HomePageActions');
var HomePageAPI     = require('../utils/HomePageAPI');

var FeaturedPredictionsStore = Reflux.createStore({

  init: function() {
    this.listenTo(HomePageActions.loadFeaturedPredictions, this.loadPredictions);
  },

  loadPredictions: function(cb) {
    HomePageAPI.getFeaturedPredictions().then(function(predictions) {
      console.log('got predictions:', predictions);
      this.predictions = predictions;
      this.trigger(predictions);
      cb();
    }.bind(this)).catch(function(e) {
      // TODO: deal with error
      console.log('error loading featured predictions:', e);
    });
  }

});

module.exports = FeaturedPredictionsStore;