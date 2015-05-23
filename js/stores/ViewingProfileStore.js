'use strict';

var Reflux        = require('reflux');

var GlobalActions = require('../actions/GlobalActions');
var UserAPI       = require('../utils/UserAPI');

var ViewingProfileStore = Reflux.createStore({

  init: function() {
    this.profile = null;

    this.listenTo(GlobalActions.loadProfile, this.loadUser);
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
  }

});

module.exports = ViewingProfileStore;