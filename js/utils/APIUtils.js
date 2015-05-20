'use strict';

var request = require('superagent');
var when    = require('when');
var _       = require('lodash');
var humps   = require('humps');

/* ====================================================== */

function normalizeResponse(response) {
  response = !_.isEmpty(response.body) ? response.body : response;
  response = (typeof response === 'string') ? JSON.parse(response) : response;

  return humps.camelizeKeys(response);
}

/* ====================================================== */

function createRequest(verb, path, body) {
  var req;

  if ( typeof window !== 'undefined' ) {
    req = request[verb](path, body).withCredentials();
  } else {
    req = request[verb](path, body);
  }

  return req;
}

/* ====================================================== */

var APIUtils = {

  root: 'http://api.dev.pundittracker.com/v1/',

  env: process.env && process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : 'dev',

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

  buildPageTitle: function(title) {
    return title ? title + ' \u2014 PunditTracker' : 'PunditTracker';
  },

  buildAssetUrl: function(url) {
    return this.env === 'production' ? '//assets.pundittracker.com/' + url : url;
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

  doGet: function(path) {
    var deferred = when.defer();

    createRequest('get', this.root + path)
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(normalizeResponse(res.text));
      } else {
        deferred.resolve(normalizeResponse(res.text));
      }
    }.bind(this));

    return deferred.promise;
  },

  doUnnormalizedGet: function(path) {
    var deferred = when.defer();

    createRequest('get', this.root + path)
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

    createRequest('post', this.root + path, body)
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(normalizeResponse(res));
      } else {
        deferred.resolve(normalizeResponse(res));
      }
    }.bind(this));

    return deferred.promise;
  },

  doPut: function(path, body) {
    var deferred = when.defer();

    createRequest('put', this.root + path, body)
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(normalizeResponse(res));
      } else {
        deferred.resolve(normalizeResponse(res));
      }
    }.bind(this));

    return deferred.promise;
  },

  doPatch: function(path, body) {
    var deferred = when.defer();

    createRequest('patch', this.root + path, body)
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(normalizeResponse(res));
      } else {
        deferred.resolve(normalizeResponse(res));
      }
    }.bind(this));

    return deferred.promise;
  },

  doDelete: function(path) {
    var deferred = when.defer();

    createRequest('del', this.root + path)
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(normalizeResponse(res));
      } else {
        deferred.resolve(normalizeResponse(res));
      }
    }.bind(this));

    return deferred.promise;
  },

  uploadFile: function(path, file) {
    var deferred = when.defer();

    createRequest('post', this.root + path)
    .attach('file', file)
    .end(function(res) {
      if ( !res.ok ) {
        deferred.reject(normalizeResponse(res));
      } else {
        deferred.resolve(normalizeResponse(res));
      }
    }.bind(this));

    return deferred.promise;
  }

};

module.exports = APIUtils;