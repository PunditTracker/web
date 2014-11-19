/**
 * @jsx React.DOM
 */
'use strict';

var React               = require('react/addons');

var Header              = require('../components/header/Header');
var FeaturedPredictions = require('../components/FeaturedPredictions');
var FeaturedUsers       = require('../components/FeaturedUsers');
var RecentBlogPosts     = require('../components/home/RecentBlogPosts');

var HomePage = React.createClass({

  propTypes: {
    updatePageTitle: React.PropTypes.func
  },

  componentDidMount: function() {
    this.props.setCategory(null);
    this.props.updatePageTitle('Home');
  },

  render: function() {
    return (
      <section className="home-page">

        <Header isHome={true} setCategory={this.props.setCategory} category={this.props.category} />

        <div className="wrapper">
          <h2 className="dark-grey nudge-half--top">Featured Predictions</h2>
        </div>

        <div className="wrapper">
          <div className="col-8">
              <FeaturedPredictions />
          </div>
          <div className="col-4">
              <FeaturedUsers />
              <RecentBlogPosts />
          </div>
        </div>

      </section>
    );
  }

});

module.exports = React.createFactory(HomePage);