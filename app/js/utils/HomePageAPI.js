'use strict';

var when     = require('when');
var request  = require('superagent');

var APIUtils = require('./APIUtils');

var HomePageAPI = {

  getHeroPrediction: function() {
    var deferred = when.defer();

    request.get(APIUtils.root + 'homepage/hero').end(function(res) {
      if ( !res.ok ) {
        deferred.reject(APIUtils.normalizeResponse(res));
      } else {
        deferred.resolve(APIUtils.normalizeResponse(res));
      }
    });

    return deferred.promise;
  },

  getFeaturedPredictions: function(category) {
    var deferred = when.defer();
    var getUrl = APIUtils.root + 'prediction/featured';

    if ( category ) {
      getUrl += ('/' + category);
    }

    getUrl += '?limit=24'; // Need exactly 24 predictions for current home page orientation

    request.get(getUrl).end(function(res) {
      if ( !res.ok ) {
        deferred.reject(APIUtils.normalizeResponse(res));
      } else {
        deferred.resolve(APIUtils.normalizeResponse(res));
      }
    });

    return deferred.promise;
  },

  getFeaturedUsers: function(category) {
    var deferred = when.defer();
    var getUrl = APIUtils.root + 'user/featured';

    if ( category ) {
      getUrl += ('/' + category);
    }

    request.get(getUrl).end(function(res) {
      if ( !res.ok ) {
        deferred.reject(APIUtils.normalizeResponse(res));
      } else {
        deferred.resolve(APIUtils.normalizeResponse(res));
      }
    });

    return deferred.promise;
  },

  getRecentBlogPosts: function() {
    var deferred = when.defer();

    // request.get(APIUtils.root + 'blog').end(function(res) {
    //   if ( !res.ok ) {
    //     deferred.reject(APIUtils.normalizeResponse(res));
    //   } else {
    //     deferred.resolve(APIUtils.normalizeResponse(res));
    //   }
    // });

    deferred.resolve([
      {
        category: 'Sports',
        timestamp: new Date(),
        title: 'Which experts predicted a Royals vs. Giants World Series?',
        url: 'http://www.google.com'
      },
      {
        category: 'Sports',
        timestamp: new Date(),
        title: 'Which experts predicted a Royals vs. Giants World Series?',
        url: 'http://www.google.com'
      },
      {
        category: 'Sports',
        timestamp: new Date(),
        title: 'Which experts predicted a Royals vs. Giants World Series?',
        url: 'http://www.google.com'
      }
    ]);

    return deferred.promise;
  },

  getPredictionSet: function(category) {
    var deferred = when.defer();
    var getUrl = APIUtils.root + 'homepage/predictionSet';

    // if ( category ) {
    //   getUrl += ('/' + category);
    // }

    request.get(getUrl).end(function(res) {
      if ( !res.ok ) {
        deferred.reject(APIUtils.normalizeResponse(res));
      } else {
        deferred.resolve(APIUtils.normalizeResponse(res));
      }
    });

    return deferred.promise;
  }

};

module.exports = HomePageAPI;