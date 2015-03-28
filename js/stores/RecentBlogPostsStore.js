'use strict';

var Reflux          = require('reflux');

var HomePageActions = require('../actions/HomePageActions');
var HomePageAPI     = require('../utils/HomePageAPI');

var RecentBlogPostsStore = Reflux.createStore({

  init: function() {
    this.listenTo(HomePageActions.loadRecentBlogPosts, this.loadBlogPosts);
  },

  loadBlogPosts: function(cb) {
    cb = cb || function() {};

    console.log('get blog posts');

    HomePageAPI.getRecentBlogPosts().then(function(posts) {
      console.log('successfully got posts');
      this.posts = posts;
      cb(null, this.posts);
      this.trigger(null, this.posts);
    }.bind(this)).catch(function(err) {
      cb(err);
      this.trigger(err);
    }.bind(this));
  }

});

module.exports = RecentBlogPostsStore;