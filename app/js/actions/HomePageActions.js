'use strict';

var Reflux = require('reflux');

var HomePageActions = Reflux.createActions([

  'loadLatestPredictions',
  'loadFeaturedPredictions',
  'loadFeaturedUsers',
  'loadRecentBlogPosts'

]);

module.exports = HomePageActions;