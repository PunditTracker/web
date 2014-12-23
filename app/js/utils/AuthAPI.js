'use strict';

var when     = require('when');
var request  = require('superagent');

var APIUtils = require('./APIUtils');

var AuthAPI = {

  check: function() {
    var deferred = when.defer();

    // request.get(APIUtils.root + 'auth/check').end(function(res) {
    //   if ( !res.ok ) {
    //     deferred.reject(JSON.parse(res));
    //   } else {
    //     deferred.resolve(APIUtils.normalizeResponse(res));
    //   }
    // });

    // deferred.resolve({
    //   id: 1,
    //   name: 'Jake Marsh',
    //   imageUrl: 'https://scontent-b-lga.xx.fbcdn.net/hphotos-xpf1/t31.0-8/1796992_10151957242618173_179336983_o.jpg'
    // });

    deferred.resolve(null);

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

    request.post(APIUtils.root + 'auth/loginfb', user).end(function(res) {
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