'use strict';

var Reflux        = require('reflux');

var GlobalActions = require('../actions/GlobalActions');
var CategoryAPI = require('../utils/CategoryAPI');

var ViewingCategoryStore = Reflux.createStore({

  init: function() {
    this.predictions = null;

    this.listenTo(GlobalActions.loadCategory, this.loadPredictions);
  },

  loadPredictions: function(category, cb) {
    cb = cb || function() {};

    console.log('get predictions for category:', category);

    CategoryAPI.getPredictions(category).then(function(predictions) {
      this.predictions = predictions;
      cb(null, this.predictions);
      this.trigger(null, this.predictions);
    }.bind(this)).catch(function(err) {
      cb(err);
      this.trigger(err);
    }.bind(this));
  }

});

module.exports = ViewingCategoryStore;