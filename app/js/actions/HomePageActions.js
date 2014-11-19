'use strict';

var Reflux = require('reflux');

var HomePageActions = Reflux.createActions([

  'loadHeroPrediction',
  'loadLatestPredictions',
  'loadFeaturedPredictions',
  'loadFeaturedUsers',
  'loadRecentBlogPosts'

]);

module.exports = HomePageActions;