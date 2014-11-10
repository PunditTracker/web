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

    deferred.resolve([
      {
        id: 1,
        category: 'Finance',
        title: 'Dow Jones will fall below 6000 by March 2012',
        imageUrl: 'http://www.shedexpedition.com/wp-content/uploads/2013/04/Wall-Street-NYSE.jpg',
        user: {
          id: 1,
          name: 'John Doe',
          organization: 'ESPN'
        },
        score: 'C'
      },
      {
        id: 2,
        category: 'Finance',
        title: 'Dow Jones will fall below 6000 by March 2012',
        imageUrl: 'http://www.shedexpedition.com/wp-content/uploads/2013/04/Wall-Street-NYSE.jpg',
        user: {
          id: 1,
          name: 'John Doe',
          organization: 'ESPN'
        },
        score: 'C'
      },
      {
        id: 3,
        category: 'Finance',
        title: 'Dow Jones will fall below 6000 by March 2012',
        imageUrl: 'http://www.shedexpedition.com/wp-content/uploads/2013/04/Wall-Street-NYSE.jpg',
        user: {
          id: 1,
          name: 'John Doe',
          organization: 'ESPN'
        },
        score: 'C'
      }
    ]);

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
        id: 1,
        name: 'John Doe',
        organization: 'ESPN',
        score: 'C'
      },
      {
        id: 1,
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