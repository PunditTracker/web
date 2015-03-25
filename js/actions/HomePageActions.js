'use strict';

var Reflux = require('reflux');

var HomePageActions = Reflux.createActions([

  'loadHeroFeatures',
  'loadPredictions',
  'loadFeaturedUsers',
  'loadRecentBlogPosts',
  'loadPredictionSets'

]);

module.exports = HomePageActions;