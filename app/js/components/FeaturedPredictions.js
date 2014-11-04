/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');

var FeaturedPredictions = React.createClass({

  render: function() {
    return (
      <section className="featured-predictions" />
    );
  }

});

module.exports = React.createFactory(FeaturedPredictions);