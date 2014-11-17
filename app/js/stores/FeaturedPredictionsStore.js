'use strict';

var Reflux          = require('reflux');

var HomePageActions = require('../actions/HomePageActions');
var HomePageAPI     = require('../utils/HomePageAPI');

var FeaturedPredictionsStore = Reflux.createStore({

  init: function() {
    this.listenTo(HomePageActions.loadFeaturedPredictions, this.loadPredictions);
  },

  loadPredictions: function(subcategory, cb) {
    if ( typeof subcategory === 'function' ) {
      cb = subcategory;
      subcategory = null;
    } else {
      cb = cb || function() {};
    }

    console.log('get featured predictions for:', subcategory);

    HomePageAPI.getFeaturedPredictions(subcategory).then(function(predictions) {
      console.log('got featured predictions:', predictions);
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