'use strict';

var React                = require('react/addons');
var ReactAsync           = require('react-async');
var Reflux               = require('reflux');
var _                    = require('lodash');
var moment               = require('moment');

var HomePageActions      = require('../actions/HomePageActions');
var RecentBlogPostsStore = require('../stores/RecentBlogPostsStore');

var RecentBlogPosts = React.createClass({

  mixins: [ReactAsync.Mixin, Reflux.ListenerMixin],

  getInitialStateAsync: function(cb) {
    HomePageActions.loadRecentBlogPosts(function(err, posts) {
      cb(null, {
        recentBlogPosts: posts ? posts.slice(0,3) : [],
        error: null
      });
    });
  },

  _onBlogPostsChange: function(err, posts) {
    if ( err ) {
      this.setState({ error: err });
    } else {
      console.log('posts change:', posts);
      this.setState({
        recentBlogPosts: posts ? posts.slice(0, 3) : [],
        error: null
      });
    }
  },

  componentDidMount: function() {
    this.listenTo(RecentBlogPostsStore, this._onBlogPostsChange);
  },

  renderBlogPosts: function() {
    var categories;

    return _.map(this.state.recentBlogPosts, function(post, index) {
      categories = post.category.slice(0,3).join(', ');

      return (
        <li className="blog-post" key={index}>
          <a href={post.link} target="_blank">
            <h4>{post.title}</h4>
            <h6>{moment(post.pubDate, 'EEE, dd MMM yyyy HH:mm:ss zzz').format('MMMM DD, YYYY')} | {categories}</h6>
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

module.exports = RecentBlogPosts;