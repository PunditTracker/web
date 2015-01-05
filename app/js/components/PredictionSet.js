/**
 * @jsx React.DOM
 */
'use strict';

var React          = require('react/addons');
var _              = require('lodash');

var PredictionCard = require('./PredictionCard');

var PredictionSet = React.createClass({

  propTypes: {
    category: React.PropTypes.string.isRequired,
    predictions: React.PropTypes.array.isRequired
  },

  getDefaultProps: function() {
    return {
      category: '',
      predictions: [],
    };
  },

  renderPredictions: function() {
    var classes = 'pur-u-1-3';

    return _.map(this.props.predictions, function(prediction, index) {
      return (
        <PredictionCard className={classes} prediction={prediction} key={index} />
      );
    });
  },

  render: function() {
    return (
      <div className="prediction-set-card">

          <div className="background"><div className="scrim" /></div>

          <h3 className="question">The latest sports predictions</h3>

          <div className="pure-g card-grid">
            {this.renderPredictions()}
          </div>

      </div>
    );
  }

});

module.exports = React.createFactory(PredictionSet);