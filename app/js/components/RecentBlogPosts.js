/**
 * @jsx React.DOM
 */
'use strict';

var React                = require('react/addons');
var Reflux               = require('reflux');
var _                    = require('underscore');
var moment               = require('moment');

var HomePageActions      = require('../actions/HomePageActions');
var RecentBlogPostsStore = require('../stores/RecentBlogPostsStore');

var RecentBlogPosts = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      recentBlogPosts: []
    };
  },

  _onBlogPostsChange: function(posts) {
    if ( posts ) {
      console.log('posts change:', posts);
      this.setState({
        recentBlogPosts: posts
      });
    }
  },

  componentWillMount: function() {
    HomePageActions.loadRecentBlogPosts(this._onBlogPostsChange);
    this.listenTo(RecentBlogPostsStore, this._onBlogPostsChange);
  },

  renderBlogPosts: function() {
    return _.map(this.state.recentBlogPosts, function(post, index) {
      return (
        <li key={index}>
          <div>
            <span className="category">{post.category}</span>
            <span className="time">{moment(post.timestamp).fromNow()}</span>
          </div>
          <div>
            <a href={post.url} target="_blank">{post.title}</a>
          </div>
        </li>
      );
    });
  },

  render: function() {
    return (
      <section className="recent-blog-posts">

        <h5 className="title">Recent Blog Posts</h5>

        <ul>
          {this.renderBlogPosts()}
        </ul>

      </section>
    );
  }

});

module.exports = React.createFactory(RecentBlogPosts);