'use strict';

var APIUtils = require('./APIUtils');

var UserAPI = {

  get: function(identifier) {
    return APIUtils.get('user/' + identifier);
  },

  getPredictions: function(id) {
    return APIUtils.get('prediction/user/' + id);
  }

};

module.exports = UserAPI;