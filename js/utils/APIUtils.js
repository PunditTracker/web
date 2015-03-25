'use strict';

var request = require('superagent');
var when    = require('when');
var _       = require('lodash');
var humps   = require('humps');

var APIUtils = {

  root: 'http://api.dev.pundittracker.com/v1/',

  titleCase: function(str) {
    var newString = str;

    // Convert from camelCase
    newString = newString.replace(/([a-z](?=[A-Z]))/g, '$1 ');

    // Convert to Title Case
    newString = str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    return newString;
  },

  randomIntFromInterval: function(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  },

  getCategoryId: function(categoryName, categories) {
    var id = null;

    if ( categories && categories.length ) {
      id = _.find(categories, function(category) {
        return category.name.toUpperCase() === categoryName.toUpperCase();
      }).id;
    }

    return parseInt(id);
  },

  normalizeResponse: function(response) {
    return humps.camelizeKeys(response.body);
  },

  createRequest: function(verb, path, body) {
    var req;

    if ( typeof window !== 'undefined' ) {
      req = request[verb](path, body).withCredentials();
    } else {
      req = request[verb](path, body);
    }

    return req;
  },

  doGet: function(path) {
    var deferred = when.defer();

    this.createRequest('get', this.root + path)
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(this.normalizeResponse(res));
      } else {
        deferred.resolve(this.normalizeResponse(res));
      }
    }.bind(this));

    return deferred.promise;
  },

  doUnnormalizedGet: function(path) {
    var deferred = when.defer();

    this.createRequest('get', this.root + path)
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(res.body);
      } else {
        deferred.resolve(res.body);
      }
    }.bind(this));

    return deferred.promise;
  },

  doPost: function(path, body) {
    var deferred = when.defer();

    this.createRequest('post', this.root + path, body)
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

    this.createRequest('put', this.root + path, body)
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(this.normalizeResponse(res));
      } else {
        deferred.resolve(this.normalizeResponse(res));
      }
    }.bind(this));

    return deferred.promise;
  },

  doPatch: function(path, body) {
    var deferred = when.defer();

    this.createRequest('patch', this.root + path, body)
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

    this.createRequest('del', this.root + path)
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

    this.createRequest('post', this.root + path)
    .attach('file', file)
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