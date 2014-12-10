/**
 * @jsx React.DOM
 */
'use strict';

var React         = require('react/addons');

var DocumentTitle = require('../../components/DocumentTitle');

var PredictionPage = React.createClass({

  getInitialState: function() {
    return {
      prediction: {}
    };
  },

  render: function() {
    return (
      <div>

        <DocumentTitle title={this.state.prediction.title} />

        Prediction page

      </div>
    );
  }

});

module.exports = React.createFactory(PredictionPage);