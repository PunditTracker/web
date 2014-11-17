/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');

var PredictionPage = React.createClass({

  getInitialState: function() {
    return {
      prediction: {}
    };
  },

  componentWillMount: function() {
    this.props.updatePageTitle(this.state.prediction.title);
  },

  render: function() {
    return (
      <div>
        Prediction page
      </div>
    );
  }

});

module.exports = React.createFactory(PredictionPage);