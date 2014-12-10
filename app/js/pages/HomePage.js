/**
 * @jsx React.DOM
 */
'use strict';

var React               = require('react/addons');

var DocumentTitle       = require('../components/DocumentTitle');
var Header              = require('../components/header/Header');
var FeaturedPredictions = require('../components/FeaturedPredictions');
var FeaturedUsers       = require('../components/FeaturedUsers');
var RecentBlogPosts     = require('../components/home/RecentBlogPosts');

var HomePage = React.createClass({

  componentDidMount: function() {
    this.props.setCategory(null);
  },

  render: function() {
    return (
      <section className="home-page">

        <DocumentTitle title="Home" />

        <Header isHome={true} setCategory={this.props.setCategory} category={this.props.category} />

        <div className="wrapper">
          <h2 className="dark-grey nudge-half--top">Featured Predictions</h2>
        </div>

        <div className="wrapper">
          <div className="content-container">
              <FeaturedPredictions />
          </div>
          <div className="sidebar-container">
              <FeaturedUsers />
              <RecentBlogPosts />
          </div>
        </div>

      </section>
    );
  }

});

module.exports = React.createFactory(HomePage);