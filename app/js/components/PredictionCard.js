/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');

var PredictionCard = React.createClass({

  propTypes: {
    prediction: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div className="prediction-card" />
    );
  }

});

module.exports = React.createFactory(PredictionCard);