'use strict';

var Reflux        = require('reflux');

var GlobalActions = require('../actions/GlobalActions');
var UserAPI       = require('../utils/UserAPI');

var UserPredictionsStore = Reflux.createStore({

  init: function() {
    this.predictions = null;

    this.listenTo(GlobalActions.loadUserPredictions, this.loadUserPredictions);
  },

  loadUserPredictions: function(user, limit = 20, cb = function() {}) {
    var id = typeof user === 'object' ? user.id : user;

    console.log('get user predictions for:', id);

    UserAPI.getPredictions(id, limit).then(predictions => {
      this.predictions = predictions;
      cb(null, this.predictions);
      this.trigger(null, this.predictions);
    }).catch(err => {
      cb(err);
      this.trigger(err);
    });
  }

});

module.exports = UserPredictionsStore;