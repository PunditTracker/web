/**
 * @jsx React.DOM
 */
'use strict';

var React          = require('react/addons');

var PredictionCard = require('./PredictionCard');

var FaceoffCard = React.createClass({

  propTypes: {
    faceoff: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      faceoff: {}
    };
  },

  render: function() {
    return (
      <div className="faceoff-card">

        <div className="background"><div className="scrim" /></div>

        <h3 className="question">{this.props.faceoff.question}</h3>

        <div className="pure-g">
          <div className="pure-u-1-2">
            <PredictionCard classNameName="left" prediction={this.props.faceoff.predictionOne} />
          </div>
          <div className="pure-u-1-2">
            <PredictionCard className="right" prediction={this.props.faceoff.predictionTwo} />
          </div>
        </div>

      </div>
    );
  }

});

module.exports = React.createFactory(FaceoffCard);