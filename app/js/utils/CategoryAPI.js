'use strict';

var when     = require('when');
var request  = require('superagent');

var APIUtils = require('./APIUtils');

var HomePageAPI = {

  getPredictions: function(category) {
    var deferred = when.defer();

    request.get(APIUtils.root + 'prediction/category/' + category).end(function(res) {
      if ( !res.ok ) {
        deferred.reject(APIUtils.normalizeResponse(res));
      } else {
        deferred.resolve(APIUtils.normalizeResponse(res));
      }
    });

    return deferred.promise;
  },

  getSubcategory: function(subcategory) {
    var deferred = when.defer();

    // request.get(APIUtils.root + 'subcategory/' + subcategory).end(function(res) {
    //   if ( !res.ok ) {
    //     deferred.reject(APIUtils.normalizeResponse(res));
    //   } else {
    //     deferred.resolve(APIUtils.normalizeResponse(res));
    //   }
    // });

    deferred.resolve({
      id: 1,
      title: 'NFL',
      featuredPrediction: {
        id: 1,
        category: 'sports',
        title: 'Which team will make it to the Super Bowl?'
      },
      currentEvent: {
        id: 1,
        location: {
          name: 'Gilette Stadium',
          imageUrl: 'http://prod.static.patriots.clubs.nfl.com//assets/images/imported/NE/photos/Centerpiece-650x350/CP_Gillette_650x350_litho.gif'
        },
        teamOne: {
          location: 'New England',
          name: 'Patriots',
          logoUrl: '',
          imageUrl: '',
          wins: 7,
          losses: 2,
          score: {
            q1: 7,
            q2: 3,
            q3: null,
            q4: null,
            total: 10
          }
        },
        teamTwo: {
          location: 'Detroit',
          name: 'Lions',
          logoUrl: '',
          imageUrl: '',
          wins: 7,
          losses: 2,
          score: {
            q1: 7,
            q2: 3,
            q3: null,
            q4: null,
            total: 10
          },
        },
        highlights: [1, 2, 3, 4],
        relatedPredictions: [
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
          }
        ]
      },
      featuredPredictions: [],
      featuredUsers: []
      });

    return deferred.promise;
  }

};

module.exports = HomePageAPI;