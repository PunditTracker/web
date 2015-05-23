'use strict';

var React = require('react/addons');
var rd3   = require('react-d3');

var PredictionDataVisualization = React.createClass({

  propTypes: {
    prediction: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      prediction: {}
    };
  },

  render: function() {
    return (
      <div>
        visualization
      </div>
    );
  }

});

module.exports = PredictionDataVisualization;