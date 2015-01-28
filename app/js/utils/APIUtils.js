'use strict';

var request      = require('superagent');
var when         = require('when');
var humps        = require('humps');
var camelizeKeys = humps.camelizeKeys;

var APIUtils = {

  root: 'http://54.148.170.236:8080/v1/',

  normalizeResponse: function(response) {
    return camelizeKeys(response.body);
  },

  doGet: function(path) {
    var deferred = when.defer();

    request.get(APIUtils.root + path)
    .withCredentials()
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(APIUtils.normalizeResponse(res));
      } else {
        deferred.resolve(APIUtils.normalizeResponse(res));
      }
    });

    return deferred.promise;
  },

  doPost: function(path, body) {
    var deferred = when.defer();

    request.post(APIUtils.root + path, body)
    .withCredentials()
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(APIUtils.normalizeResponse(res));
      } else {
        deferred.resolve(APIUtils.normalizeResponse(res));
      }
    });

    return deferred.promise;
  },

  doPut: function(path, body) {
    var deferred = when.defer();

    request.put(APIUtils.root + path, body)
    .withCredentials()
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(APIUtils.normalizeResponse(res));
      } else {
        deferred.resolve(APIUtils.normalizeResponse(res));
      }
    });

    return deferred.promise;
  },

  doDelete: function(path) {
    var deferred = when.defer();

    request.del(APIUtils.root + path)
    .withCredentials()
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(APIUtils.normalizeResponse(res));
      } else {
        deferred.resolve(APIUtils.normalizeResponse(res));
      }
    });

    return deferred.promise;
  }

};

module.exports = APIUtils;