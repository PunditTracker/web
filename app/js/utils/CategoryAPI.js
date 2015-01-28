'use strict';

var APIUtils = require('./APIUtils');

var HomePageAPI = {

  getPredictions: function(category) {
    return APIUtils.doGet('prediction/category/' + category);
  },

  getSubcategory: function(subcategory) {
    return APIUtils.doGet('subcategory/' + subcategory);
  }

};

module.exports = HomePageAPI;