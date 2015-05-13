'use strict';

var Reflux        = require('reflux');

var GlobalActions = require('../actions/GlobalActions');
var UserAPI       = require('../utils/UserAPI');

var ViewingProfileStore = Reflux.createStore({

  init: function() {
    this.profile = null;

    this.listenTo(GlobalActions.loadProfile, this.loadUser);
    this.listenTo(GlobalActions.loadUserPredictions, this.loadUserPredictions);
  },

  loadUser: function(identifier, cb) {
    cb = cb || function() {};

    console.log('get user:', identifier);

    UserAPI.get(identifier).then(function(profile) {
      this.profile = profile;
      this.profile.predictions = [];
      cb(null, this.profile);
      this.trigger(null, this.profile);
    }.bind(this)).catch(function(err) {
      cb(err);
      this.trigger(err);
    }.bind(this));
  },

  loadUserPredictions: function(identifier, cb) {
    cb = cb || function() {};

    console.log('get user predictions for:', identifier);

    UserAPI.getPredictions(this.profile.id).then(function(predictions) {
      this.profile = this.profile || {};
      this.profile.predictions = predictions || [];
      cb(null, this.profile);
      this.trigger(null, this.profile);
    }.bind(this)).catch(function(err) {
      cb(err);
      this.trigger(err);
    }.bind(this));
  }

});

module.exports = ViewingProfileStore;