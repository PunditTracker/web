 'use strict';

var APIUtils = require('./APIUtils');

var SearchAPI = {

  search: function(query) {
    return APIUtils.get('prediction/search/' + query);
  }

};

module.exports = SearchAPI;