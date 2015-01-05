'use strict';

var Reflux      = require('reflux');

var UserActions = require('../actions/UserActions');
var AuthAPI     = require('../utils/AuthAPI');

var CurrentTrackStore = Reflux.createStore({

  init: function() {
    this.user = null;

    this.listenTo(UserActions.check, this.checkLoginStatus);
    this.listenTo(UserActions.login, this.loginUser);
    this.listenTo(UserActions.facebookLogin, this.doFacebookLogin);
    this.listenTo(UserActions.logout, this.logoutUser);
  },

  checkLoginStatus: function(cb) {
    cb = cb || function() {};

    AuthAPI.check().then(function(user) {
      console.log('checked:', user);
      this.user = user;
      cb(null, this.user);
      this.trigger(this.user);
    }.bind(this)).catch(function(err) {
      cb(err);
      this.trigger(null);
      console.log('error checking login status:', err);
    }.bind(this));
  },

  loginUser: function(user, cb) {
    cb = cb || function() {};

    console.log('login user');

    AuthAPI.login(user).then(function(loggedInUser) {
      console.log('logged in user:', loggedInUser);
      this.user = loggedInUser;
      cb(null, this.user);
      this.trigger(null, this.user);
    }.bind(this)).catch(function(err) {
      console.log('error logging in:', err);
      cb(err);
      this.trigger(err);
    }.bind(this));
  },

  doFacebookLogin: function(user, cb) {
    cb = cb || function() {};

    console.log('facebook login user');

    AuthAPI.facebookLogin(user).then(function(loggedInUser) {
      this.user = loggedInUser;
      cb(null, this.user);
      this.trigger(null, this.user);
    }.bind(this)).catch(function(err) {
      cb(err);
      this.trigger(err);
    });
  },

  logoutUser: function(cb) {
    cb = cb || function() {};

    console.log('logout user');

    AuthAPI.logout(this.user).then(function() {
      this.user = null;
      cb();
      this.trigger(null);
    }.bind(this)).catch(function(err) {
      cb(err);
      console.log('error logging out:', err);
    });
  }

});

module.exports = CurrentTrackStore;