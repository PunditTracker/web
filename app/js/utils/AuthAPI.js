 'use strict';

var APIUtils = require('./APIUtils');

var AuthAPI = {

  check: function() {
    return APIUtils.doGet('auth/check');
  },

  register: function(user) {
    return APIUtils.doPut('auth/register', user);
  },

  facebookRegister: function(user) {
    return APIUtils.doPost('auth/registerfb', user);
  },

  login: function(user) {
    return APIUtils.doPost('auth/login', user);
  },

  facebookLogin: function(user) {
    return APIUtils.doPost('auth/loginfb', user);
  },

  logout: function() {
    return APIUtils.doPost('auth/logout');
  }

};

module.exports = AuthAPI;