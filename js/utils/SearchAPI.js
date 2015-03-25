 'use strict';

var APIUtils = require('./APIUtils');

var SearchAPI = {

  search: function(query) {
    return APIUtils.doGet('prediction/search/' + query);
  }

};

module.exports = SearchAPI;