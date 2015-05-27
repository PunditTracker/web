'use strict';

var APIUtils = require('./APIUtils');

var UserAPI = {

  get: function(identifier) {
    return APIUtils.doGet('user/' + identifier);
  },

  getPredictions: function(id, limit = 20) {
    return APIUtils.doGet('prediction/user/' + id + '?limit=' + limit);
  },

  update: function(updates) {
    return APIUtils.doPatch('user', updates);
  },

  updatePassword: function(newPassword) {
    return APIUtils.doPost();
  }

};

module.exports = UserAPI;