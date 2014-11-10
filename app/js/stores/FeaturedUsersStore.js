'use strict';

var Reflux          = require('reflux');

var HomePageActions = require('../actions/HomePageActions');
var HomePageAPI     = require('../utils/HomePageAPI');

var FeaturedUsersStore = Reflux.createStore({

  init: function() {
    this.listenTo(HomePageActions.loadFeaturedUsers, this.loadUsers);
  },

  loadUsers: function(cb) {
    HomePageAPI.getFeaturedUsers().then(function(users) {
      console.log('got users:', users);
      this.users = users;
      this.trigger(users);
      cb();
    }.bind(this)).catch(function(e) {
      // TODO: deal with error
      console.log('error loading featured users:', e);
    });
  }

});

module.exports = FeaturedUsersStore;