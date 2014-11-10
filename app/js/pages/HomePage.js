/**
 * @jsx React.DOM
 */
'use strict';

var React               = require('react/addons');

var FeaturedPredictions = require('../components/FeaturedPredictions');
var FeaturedUsers       = require('../components/FeaturedUsers');
var RecentBlogPosts     = require('../components/RecentBlogPosts');

var HomePage = React.createClass({

  propTypes: {
    updatePageTitle: React.PropTypes.func
  },

  componentDidMount: function() {
    this.props.updatePageTitle('Home');
  },

  render: function() {
    return (
      <section className="home-page">

        <div className="hero">
          <div className="wrapper">
          </div>
        </div>

        <div className="wrapper">
          <h2 className="dark-grey nudge-half--top">Featured Predictions</h2>
          <div className="col-8">
            <div className="wrapper">
              <FeaturedPredictions />
            </div>
          </div>
          <div className="col-4">
            <div className="wrapper">
              <FeaturedUsers />
              <RecentBlogPosts />
            </div>
          </div>
        </div>

      </section>
    );
  }

});

module.exports = React.createFactory(HomePage);