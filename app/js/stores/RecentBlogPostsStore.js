'use strict';

var Reflux          = require('reflux');

var HomePageActions = require('../actions/HomePageActions');
var HomePageAPI     = require('../utils/HomePageAPI');

var RecentBlogPostsStore = Reflux.createStore({

  init: function() {
    this.listenTo(HomePageActions.loadRecentBlogPosts, this.loadBlogPosts);
  },

  loadBlogPosts: function(cb) {
    HomePageAPI.getRecentBlogPosts().then(function(posts) {
      console.log('got posts:', posts);
      this.posts = posts;
      this.trigger(posts);
      cb();
    }.bind(this)).catch(function(e) {
      // TODO: deal with error
      console.log('error loading recent blog posts:', e);
    });
  }

});

module.exports = RecentBlogPostsStore;