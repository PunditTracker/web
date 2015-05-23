'use strict';

var Reflux        = require('reflux');

var GlobalActions = require('../actions/GlobalActions');
var UserAPI       = require('../utils/UserAPI');

var UserPredictionsStore = Reflux.createStore({

  init: function() {
    this.predictions = null;

    this.listenTo(GlobalActions.loadUserPredictions, this.loadUserPredictions);
  },

  loadUserPredictions: function(user, cb) {
    var id = typeof user === 'object' ? user.id : user;

    cb = cb || function() {};

    console.log('get user predictions for:', id);

    UserAPI.getPredictions(id).then(function(predictions) {
      this.predictions = predictions;
      cb(null, this.predictions);
      this.trigger(null, this.predictions);
    }.bind(this)).catch(function(err) {
      cb(err);
      this.trigger(err);
    }.bind(this));
  }

});

module.exports = UserPredictionsStore;