'use strict';

var when     = require('when');
var request  = require('superagent');

var APIUtils = require('./APIUtils');

var HomePageAPI = {

  getLatestPredictions: function(subcategory) {
    var deferred = when.defer();
    var getUrl = APIUtils.root + 'predictions/latest';

    if ( subcategory ) {
      getUrl += ('/' + subcategory);
    }

    // request.get(getUrl).end(function(res) {
    //   if ( !res.ok ) {
    //     deferred.reject(res.text);
    //   } else {
    //     deferred.resolve(APIUtils.normalizeResponse(res));
    //   }
    // });

    deferred.resolve([
      {
        id: 1,
        category: 'finance',
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
        category: 'finance',
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
        category: 'finance',
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
        id: 4,
        category: 'finance',
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

  getFeaturedPredictions: function(subcategory) {
    var deferred = when.defer();
    var getUrl = APIUtils.root + 'predictions/featured';

    if ( subcategory ) {
      getUrl += ('/' + subcategory);
    }

    // request.get(getUrl).end(function(res) {
    //   if ( !res.ok ) {
    //     deferred.reject(res.text);
    //   } else {
    //     deferred.resolve(APIUtils.normalizeResponse(res));
    //   }
    // });

    deferred.resolve([
      {
        id: 1,
        category: 'finance',
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
        category: 'finance',
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
        category: 'finance',
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

  getFeaturedUsers: function(subcategory) {
    var deferred = when.defer();
    var getUrl = APIUtils.root + 'users/featured';

    if ( subcategory ) {
      getUrl += ('/' + subcategory);
    }

    // request.get(getUrl).end(function(res) {
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