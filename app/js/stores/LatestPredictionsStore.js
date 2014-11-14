'use strict';

var Reflux          = require('reflux');

var HomePageActions = require('../actions/HomePageActions');
var HomePageAPI     = require('../utils/HomePageAPI');

var LatestPredictionsStore = Reflux.createStore({

  init: function() {
    this.listenTo(HomePageActions.loadLatestPredictions, this.loadPredictions);
  },

  loadPredictions: function(subcategory, cb) {
    HomePageAPI.getLatestPredictions(encodeURIComponent(subcategory)).then(function(predictions) {
      console.log('got latest predictions:', predictions);
      this.predictions = predictions;
      this.trigger(predictions);
      cb();
    }.bind(this)).catch(function(e) {
      // TODO: deal with error
      console.log('error loading latest predictions:', e);
    });
  }

});

module.exports = LatestPredictionsStore;