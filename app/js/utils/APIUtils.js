'use strict';

var request           = require('superagent');
var when              = require('when');
var humps             = require('humps');
var camelizeKeys      = humps.camelizeKeys;
var normalizeResponse = function(response) {
  return camelizeKeys(response.body);
};

var APIUtils = {

  root: 'http://pundittracker-dev.elasticbeanstalk.com/v1/',

  doGet: function(path) {
    var deferred = when.defer();

    request.get(this.root + path)
    .withCredentials()
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(normalizeResponse(res));
      } else {
        deferred.resolve(normalizeResponse(res));
      }
    });

    return deferred.promise;
  },

  doPost: function(path, body) {
    var deferred = when.defer();

    request.post(this.root + path, body)
    .withCredentials()
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(normalizeResponse(res));
      } else {
        deferred.resolve(normalizeResponse(res));
      }
    });

    return deferred.promise;
  },

  doPut: function(path, body) {
    var deferred = when.defer();

    request.put(this.root + path, body)
    .withCredentials()
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(normalizeResponse(res));
      } else {
        deferred.resolve(normalizeResponse(res));
      }
    });

    return deferred.promise;
  },

  doDelete: function(path) {
    var deferred = when.defer();

    request.del(this.root + path)
    .withCredentials()
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(normalizeResponse(res));
      } else {
        deferred.resolve(normalizeResponse(res));
      }
    });

    return deferred.promise;
  },

  uploadFile: function(path, file) {
    var deferred = when.defer();

    request.post(this.root + path)
    .attach('file', file)
    .withCredentials()
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(normalizeResponse(res));
      } else {
        deferred.resolve(normalizeResponse(res));
      }
    });

    return deferred.promise;
  }

};

module.exports = APIUtils;