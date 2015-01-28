'use strict';

var APIUtils = require('./APIUtils');

var UserAPI = {

  get: function(identifier) {
    return APIUtils.doGet('user/' + identifier);
  },

  getPredictions: function(id) {
    return APIUtils.doGet('prediction/user/' + id);
  }

};

module.exports = UserAPI;