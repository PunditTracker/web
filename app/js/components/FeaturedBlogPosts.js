/**
 * @jsx React.DOM
 */
'use strict';

var React                = require('react/addons');
var Reflux               = require('reflux');
var _                    = require('lodash');
var moment               = require('moment');

var HomePageActions      = require('../actions/HomePageActions');
var RecentBlogPostsStore = require('../stores/RecentBlogPostsStore');

var FeaturedBlogPosts = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      featuredBlogPosts: []
    };
  },

  _onBlogPostsChange: function(posts) {
    if ( posts ) {
      console.log('posts change:', posts);
      this.setState({
        featuredBlogPosts: posts
      });
    }
  },

  componentWillMount: function() {
    HomePageActions.loadRecentBlogPosts(this._onBlogPostsChange);
    this.listenTo(RecentBlogPostsStore, this._onBlogPostsChange);
  },

  renderBlogPosts: function() {
    return _.map(this.state.featuredBlogPosts, function(post, index) {
      return (
        <li className="blog-post" key={index}>
          <a href={post.url}>
            <h4>{post.title}</h4>
            <h6>{moment(post.timestamp).fromNow()} | {post.category}</h6>
          </a>
        </li>
      );
    });
  },

  render: function() {
    return (
      <div className="list-card featured-blog-posts">

        <div className="title-wrapper">
            <h2 className="title">From our Blog</h2>
        </div>

        <ul>
          {this.renderBlogPosts()}
        </ul>

      </div>
    );
  }

});

module.exports = React.createFactory(FeaturedBlogPosts);