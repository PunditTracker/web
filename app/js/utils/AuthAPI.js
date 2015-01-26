 'use strict';

var when     = require('when');
var request  = require('superagent');

var APIUtils = require('./APIUtils');

var AuthAPI = {

  check: function() {
    var deferred = when.defer();

    request.get(APIUtils.root + 'auth/check').end(function(res) {
      if ( !res.ok ) {
        deferred.reject(APIUtils.normalizeResponse(res));
      } else {
        deferred.resolve(APIUtils.normalizeResponse(res));
      }
    });

    return deferred.promise;
  },

  register: function(user) {
    var deferred = when.defer();

    request.put(APIUtils.root + 'auth/register', user).end(function(res) {
      if ( !res.ok ) {
        deferred.reject(APIUtils.normalizeResponse(res));
      } else {
        deferred.resolve(APIUtils.normalizeResponse(res));
      }
    });

    return deferred.promise;
  },

  facebookRegister: function(user) {
    var deferred = when.defer();

    request.post(APIUtils.root + 'auth/registerfb', user).end(function(res) {
      if ( !res.ok ) {
        deferred.reject(APIUtils.normalizeResponse(res));
      } else {
        deferred.resolve(APIUtils.normalizeResponse(res));
      }
    });

    return deferred.promise;
  },

  login: function(user) {
    var deferred = when.defer();

    request.post(APIUtils.root + 'auth/login', user).end(function(res) {
      if ( !res.ok ) {
        deferred.reject(APIUtils.normalizeResponse(res));
      } else {
        deferred.resolve(APIUtils.normalizeResponse(res));
      }
    });

    return deferred.promise;
  },

  facebookLogin: function(user) {
    var deferred = when.defer();

    request.post(APIUtils.root + 'auth/loginfb', user).end(function(res) {
      if ( !res.ok ) {
        deferred.reject(APIUtils.normalizeResponse(res));
      } else {
        deferred.resolve(APIUtils.normalizeResponse(res));
      }
    });

    return deferred.promise;
  },

  logout: function() {
    var deferred = when.defer();

    request.post(APIUtils.root + 'auth/logout').end(function(res) {
      if ( !res.ok ) {
        deferred.reject(APIUtils.normalizeResponse(res));
      } else {
        deferred.resolve(APIUtils.normalizeResponse(res));
      }
    });

    return deferred.promise;
  }

};

module.exports = AuthAPI;