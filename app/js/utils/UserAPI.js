'use strict';

var when     = require('when');
var request  = require('superagent');

var APIUtils = require('./APIUtils');

var UserAPI = {

  get: function(identifier) {
    var deferred = when.defer();

    request.get(APIUtils.root + 'user/' + identifier).end(function(res) {
      if ( !res.ok ) {
        deferred.reject(APIUtils.normalizeResponse(res));
      } else {
        deferred.resolve(APIUtils.normalizeResponse(res));
      }
    });

    return deferred.promise;
  }

};

module.exports = UserAPI;