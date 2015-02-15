'use strict';

var request      = require('superagent');
var when         = require('when');
var humps        = require('humps');
var camelizeKeys = humps.camelizeKeys;
var config       = require('../config');

var APIUtils = {

  root: 'http://pundittracker-dev.elasticbeanstalk.com/v1/',

  titleCase: function(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  },

  normalizeResponse: function(response) {
    return camelizeKeys(response.body);
  },

  doGet: function(path) {
    var deferred = when.defer();

    request.get(this.root + path)
    .withCredentials()
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(this.normalizeResponse(res));
      } else {
        deferred.resolve(this.normalizeResponse(res));
      }
    }.bind(this));

    return deferred.promise;
  },

  doPost: function(path, body) {
    var deferred = when.defer();

    request.post(this.root + path, body)
    .withCredentials()
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(this.normalizeResponse(res));
      } else {
        deferred.resolve(this.normalizeResponse(res));
      }
    }.bind(this));

    return deferred.promise;
  },

  doPut: function(path, body) {
    var deferred = when.defer();

    request.put(this.root + path, body)
    .withCredentials()
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(this.normalizeResponse(res));
      } else {
        deferred.resolve(this.normalizeResponse(res));
      }
    }.bind(this));

    return deferred.promise;
  },

  doDelete: function(path) {
    var deferred = when.defer();

    request.del(this.root + path)
    .withCredentials()
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(this.normalizeResponse(res));
      } else {
        deferred.resolve(this.normalizeResponse(res));
      }
    }.bind(this));

    return deferred.promise;
  },

  uploadFile: function(path, file) {
    var deferred = when.defer();

    request.post(this.root + path)
    .attach('file', file)
    .withCredentials()
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(this.normalizeResponse(res));
      } else {
        deferred.resolve(this.normalizeResponse(res));
      }
    }.bind(this));

    return deferred.promise;
  },

  mailchimpSubscribe: function(listId, userEmail) {
    var deferred = when.defer();
    var zone = config.mailchimp.key.split('-')[1];
    var mailchimpRoot = 'https://' + zone + '.api.mailchimp.com/2.0/';
    var body = {
      apikey: config.mailchimp.key,
      id: listId,
      email: {
        email: userEmail
      },
      double_optin: false
    };

    request.post(mailchimpRoot + 'lists/subscribe.json', body)
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(this.normalizeResponse(res));
      } else {
        deferred.resolve(this.normalizeResponse(res));
      }
    }.bind(this));

    return deferred.promise;
  }

};

module.exports = APIUtils;