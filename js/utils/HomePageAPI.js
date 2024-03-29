'use strict';

var when     = require('when');
var request  = require('superagent');
var xml2js   = require('xml2js');

var APIUtils = require('./APIUtils');

var HomePageAPI = {

  getCategories: function() {
    return APIUtils.doGet('category');
  },

  getHeroFeatures: function() {
    return APIUtils.doGet('hero');
  },

  getPredictions: function() {
    return APIUtils.doGet('prediction/page/0');
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
    var parser = new xml2js.Parser();

    request.get('http://blog.pundittracker.com/feed').end(function(res) {
      if ( !res.ok ) {
        deferred.reject(APIUtils.normalizeResponse(res));
      } else {
        parser.parseString(res.text, function(err, data) {
          if ( err ) {
            deferred.reject(err);
          } else {
            deferred.resolve(data.rss.channel[0].item);
          }
        });
      }
    });

    return deferred.promise;
  },

  getPredictionSet: function() {
    return APIUtils.doGet('predictionSet');
  }

};

module.exports = HomePageAPI;