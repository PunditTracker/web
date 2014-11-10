'use strict';

var Reflux = require('reflux');

var HomePageActions = Reflux.createActions([

  'loadFeaturedPredictions',
  'loadFeaturedUsers',
  'loadRecentBlogPosts'

]);

module.exports = HomePageActions;