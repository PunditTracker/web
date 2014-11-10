'use strict';

var when     = require('when');
var request  = require('superagent');

var APIUtils = require('./APIUtils');

var HomePageAPI = {

  getFeaturedPredictions: function() {
    var deferred = when.defer();

    // request.get(APIUtils.root + 'predictions/featured').end(function(res) {
    //   if ( !res.ok ) {
    //     deferred.reject(res.text);
    //   } else {
    //     deferred.resolve(APIUtils.normalizeResponse(res));
    //   }
    // });

    deferred.resolve([1, 2, 3]);

    return deferred.promise;
  },

  getFeaturedUsers: function() {
    var deferred = when.defer();

    // request.get(APIUtils.root + 'users/featured').end(function(res) {
    //   if ( !res.ok ) {
    //     deferred.reject(res.text);
    //   } else {
    //     deferred.resolve(APIUtils.normalizeResponse(res));
    //   }
    // });

    deferred.resolve([
      {
        name: 'John Doe',
        organization: 'ESPN',
        score: 'C'
      },
      {
        name: 'John Doe',
        organization: 'ESPN',
        score: 'C'
      }
    ]);

    return deferred.promise;
  },

  getRecentBlogPosts: function() {
    var deferred = when.defer();

    // request.get(APIUtils.root + 'blog').end(function(res) {
    //   if ( !res.ok ) {
    //     deferred.reject(res.text);
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
  }

};

module.exports = HomePageAPI;