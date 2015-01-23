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

    // deferred.resolve({
    //   id: 1,
    //   category: 'sports',
    //   title: 'Who will win the World Series?',
    //   imageUrl: 'http://mtv.mtvnimages.com/uri/mgid:uma:image:mtv.com:9677767'
    // });

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

    // deferred.resolve([
    //   {
    //     id: 1,
    //     category: 'finance',
    //     title: 'Dow Jones will fall below 6000 by March 2012',
    //     imageUrl: 'http://www.shedexpedition.com/wp-content/uploads/2013/04/Wall-Street-NYSE.jpg',
    //     user: {
    //       id: 1,
    //       name: 'John Doe',
    //       organization: 'ESPN'
    //     },
    //     score: 'C'
    //   },
    //   {
    //     id: 2,
    //     category: 'finance',
    //     title: 'Dow Jones will fall below 6000 by March 2012',
    //     imageUrl: 'http://www.shedexpedition.com/wp-content/uploads/2013/04/Wall-Street-NYSE.jpg',
    //     user: {
    //       id: 1,
    //       name: 'John Doe',
    //       organization: 'ESPN'
    //     },
    //     score: 'C'
    //   },
    //   {
    //     id: 3,
    //     category: 'finance',
    //     title: 'Dow Jones will fall below 6000 by March 2012',
    //     imageUrl: 'http://www.shedexpedition.com/wp-content/uploads/2013/04/Wall-Street-NYSE.jpg',
    //     user: {
    //       id: 1,
    //       name: 'John Doe',
    //       organization: 'ESPN'
    //     },
    //     score: 'C'
    //   }
    // ]);

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

    // deferred.resolve([
    //   {
    //     id: 1,
    //     name: 'John Doe',
    //     organization: 'ESPN',
    //     score: 'C'
    //   },
    //   {
    //     id: 1,
    //     name: 'John Doe',
    //     organization: 'ESPN',
    //     score: 'C'
    //   }
    // ]);

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