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

  forgotPassword: function(email) {
    return APIUtils.doPost('auth/forgot', { email: email });
  },

  resetPassword: function(userId, resetKey, newPassword) {
    return APIUtils.doPost('auth/reset/' + userId + '/' + resetKey, { password: newPassword });
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