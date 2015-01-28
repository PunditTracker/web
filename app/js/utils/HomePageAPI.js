'use strict';

var when     = require('when');
var request  = require('superagent');

var APIUtils = require('./APIUtils');

var HomePageAPI = {

  getHeroPrediction: function() {
    return APIUtils.doGet('homepage/hero');
  },

  getFeaturedPredictions: function(category) {
    var getUrl = 'prediction/featured';

    if ( category ) {
      getUrl += ('/' + category);
    }

    getUrl += '?limit=24'; // Need exactly 24 predictions for current home page orientation

    return APIUtils.doGet(getUrl);
  },

  getFeaturedUsers: function(category) {
    var getUrl = 'user/featured';

    if ( category ) {
      getUrl += ('/' + category);
    }

    return APIUtils.doGet(getUrl);
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

  getPredictionSet: function() {
    return APIUtils.doGet('homepage/predictionSet');
  }

};

module.exports = HomePageAPI;