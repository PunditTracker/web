'use strict';

var Reflux      = require('reflux');

var UserActions = require('../actions/UserActions');
var AuthAPI     = require('../utils/AuthAPI');
var UserAPI     = require('../utils/UserAPI');

var CurrentTrackStore = Reflux.createStore({

  init: function() {
    this.user = null;
    this.hasBeenChecked = false;

    this.listenTo(UserActions.set, this.setUser);
    this.listenTo(UserActions.check, this.checkLoginStatus);
    this.listenTo(UserActions.login, this.loginUser);
    this.listenTo(UserActions.facebookLogin, this.doFacebookLogin);
    this.listenTo(UserActions.update, this.updateUser);
    this.listenTo(UserActions.logout, this.logoutUser);
  },

  setUser: function(user, cb) {
    cb = cb || function() {};

    this.user = user;
    cb(null, this.user);
    this.trigger(null, this.user);
  },

  checkLoginStatus: function(cb) {
    cb = cb || function() {};

    AuthAPI.check().then(function(user) {
      this.hasBeenChecked = true;
      this.setUser(user, cb);
    }.bind(this)).catch(function(err) {
      this.hasBeenChecked = true;
      cb(err);
      this.trigger(err);
    }.bind(this));
  },

  loginUser: function(user, cb) {
    cb = cb || function() {};

    console.log('login user');

    AuthAPI.login(user).then(function(loggedInUser) {
      this.setUser(loggedInUser, cb);
    }.bind(this)).catch(function(err) {
      cb(err);
      this.trigger(err);
    }.bind(this));
  },

  doFacebookLogin: function(user, cb) {
    cb = cb || function() {};

    console.log('facebook login user');

    AuthAPI.facebookLogin(user).then(function(loggedInUser) {
      this.setUser(loggedInUser, cb);
    }.bind(this)).catch(function(err) {
      cb(err);
      this.trigger(err);
    }.bind(this));
  },

  updateUser: function(updates, cb) {
    cb = cb || function() {};

    console.log('update user');

    UserAPI.update(updates).then(function(updatedUser) {
      this.setUser(updatedUser, cb);
    }.bind(this)).catch(function(err) {
      cb(err);
    }.bind(this));
  },

  logoutUser: function(cb) {
    cb = cb || function() {};

    console.log('logout user');

    AuthAPI.logout(this.user);

    this.setUser(null, cb);
  }

});

module.exports = CurrentTrackStore;