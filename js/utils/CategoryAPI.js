'use strict';

var APIUtils = require('./APIUtils');

var HomePageAPI = {

  getPredictions: function(categoryId) {
    return APIUtils.doGet('prediction/page/' + categoryId);
  }

};

module.exports = HomePageAPI;