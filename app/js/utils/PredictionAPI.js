 'use strict';

var when     = require('when');
var request  = require('superagent');

var APIUtils = require('./APIUtils');

var PredictionAPI = {

  get: function(identifier) {
    var deferred = when.defer();

    request.get(APIUtils.root + 'prediction/' + identifier).end(function(res) {
      if ( !res.ok ) {
        deferred.reject(APIUtils.normalizeResponse(res));
      } else {
        deferred.resolve(APIUtils.normalizeResponse(res));
      }
    });

    return deferred.promise;
  },

  postPrediction: function(prediction) {
    var deferred = when.defer();

    request.post(APIUtils.root + 'prediction/add', prediction).end(function(res) {
      if ( !res.ok ) {
        deferred.reject(APIUtils.normalizeResponse(res));
      } else {
        deferred.resolve(APIUtils.normalizeResponse(res));
      }
    });

    return deferred.promise;
  },

  doVote: function(prediction, vote) {
    var deferred = when.defer();

    request.post(APIUtils.root + 'prediction/vote/' + prediction.id, vote).end(function(res) {
      if ( !res.ok ) {
        deferred.reject(APIUtils.normalizeResponse(res));
      } else {
        deferred.resolve(APIUtils.normalizeResponse(res));
      }
    });

    return deferred.promise;
  }

};

module.exports = PredictionAPI;