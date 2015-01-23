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
      cb(null, this.predictions);
      this.trigger(null, this.predictions);
    }.bind(this)).catch(function(err) {
      cb(err);
      this.trigger(err);
    }.bind(this));
  }

});

module.exports = FeaturedPredictionsStore;