'use strict';

var Reflux = require('reflux');

var HomePageActions = Reflux.createActions([

  'loadHeroFeatures',
  'loadFeaturedPredictions',
  'loadFeaturedUsers',
  'loadRecentBlogPosts',
  'loadPredictionSets'

]);

module.exports = HomePageActions;