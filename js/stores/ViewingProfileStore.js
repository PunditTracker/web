'use strict';

var Reflux        = require('reflux');

var GlobalActions = require('../actions/GlobalActions');
var UserAPI       = require('../utils/UserAPI');

var ViewingProfileStore = Reflux.createStore({

  init: function() {
    this.profile = null;

    this.listenTo(GlobalActions.loadProfile, this.loadUser);
  },

  loadUser: function(identifier, cb = function() {}) {
    console.log('get user:', identifier);

    UserAPI.get(identifier).then(profile => {
      this.profile = profile;
      this.profile.predictions = [];
      cb(null, this.profile);
      this.trigger(null, this.profile);
    }).catch(err => {
      cb(err);
      this.trigger(err);
    });
  }

});

module.exports = ViewingProfileStore;