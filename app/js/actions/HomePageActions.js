'use strict';

var Reflux = require('reflux');

var HomePageActions = Reflux.createActions([

  'loadHeroPrediction',
  'loadFeaturedPredictions',
  'loadFeaturedUsers',
  'loadRecentBlogPosts',
  'loadPredictionSet'

]);

module.exports = HomePageActions;