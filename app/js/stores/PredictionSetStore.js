'use strict';

var Reflux          = require('reflux');

var HomePageActions = require('../actions/HomePageActions');
var HomePageAPI     = require('../utils/HomePageAPI');

var FeaturedUsersStore = Reflux.createStore({

  init: function() {
    this.listenTo(HomePageActions.loadPredictionSet, this.loadUsers);
  },

  loadUsers: function(category, cb) {
    if ( typeof category === 'function' ) {
      cb = category;
      category = null;
    } else {
      cb = cb || function() {};
    }

    console.log('get prediction set for:', category);

    HomePageAPI.getPredictionSet(category).then(function(predictions) {
      console.log('got prediction set:', predictions);
      this.predictions = predictions;
      cb(null, this.predictions);
      this.trigger(null, this.predictions);
    }.bind(this)).catch(function(err) {
      cb(err);
      this.trigger(err);
    }.bind(this));
  }

});

module.exports = FeaturedUsersStore;