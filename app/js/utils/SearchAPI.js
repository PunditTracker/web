 'use strict';

var when     = require('when');
var request  = require('superagent');

var APIUtils = require('./APIUtils');

var SearchAPI = {

  search: function(query) {
    var deferred = when.defer();

    // request.get(APIUtils.root + 'search').end(function(res) {
    //   if ( !res.ok ) {
    //     deferred.reject(APIUtils.normalizeResponse(res));
    //   } else {
    //     deferred.resolve(APIUtils.normalizeResponse(res));
    //   }
    // });

    deferred.resolve([]);

    return deferred.promise;
  }

};

module.exports = SearchAPI;