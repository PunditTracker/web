/**
 * @jsx React.DOM
 */
'use strict';

var React          = require('react/addons');
var _              = require('lodash');

var PredictionCard = require('./PredictionCard');

var PredictionSet = React.createClass({

  propTypes: {
    set: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      set: {
        category: '',
        predictions: []
      }
    };
  },

  renderPredictions: function() {
    return _.map(this.props.set.predictions, function(prediction, index) {
      return (
        <PredictionCard className="pure-u-1-3" prediction={prediction} key={index} />
      );
    });
  },

  render: function() {
    var setStyles = {
      'backgroundImage': this.props.set.imageUrl ? 'url(' + this.props.set.imageUrl + ')' : null
    };

    return (
      <div className="prediction-set-card" style={setStyles}>

          <div className="background"><div className="scrim" /></div>

          <h3 className="question">{this.props.set.title}</h3>

          <div className="pure-g card-grid">
            {this.renderPredictions()}
          </div>

      </div>
    );
  }

});

module.exports = React.createFactory(PredictionSet);