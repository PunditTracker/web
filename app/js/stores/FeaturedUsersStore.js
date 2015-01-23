'use strict';

var Reflux          = require('reflux');

var HomePageActions = require('../actions/HomePageActions');
var HomePageAPI     = require('../utils/HomePageAPI');

var FeaturedUsersStore = Reflux.createStore({

  init: function() {
    this.listenTo(HomePageActions.loadFeaturedUsers, this.loadUsers);
  },

  loadUsers: function(category, cb) {
    if ( typeof category === 'function' ) {
      cb = category;
      category = null;
    } else {
      cb = cb || function() {};
    }

    console.log('get featured users for:', category);

    HomePageAPI.getFeaturedUsers(category).then(function(users) {
      console.log('got users:', users);
      this.users = users;
      cb(null, this.users);
      this.trigger(null, this.users);
    }.bind(this)).catch(function(err) {
      cb(err);
      this.trigger(err);
    }.bind(this));
  }

});

module.exports = FeaturedUsersStore;