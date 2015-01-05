/**
 * @jsx React.DOM
 */
'use strict';

var React          = require('react/addons');

var PredictionCard = require('./PredictionCard');

var Hero = React.createClass({

  propTypes: {
    featuredPrediction: React.PropTypes.object.isRequired,
    className: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      featuredPrediction: {},
      className: ''
    };
  },

  render: function() {
    var classes = 'hero ' + this.props.className;
    var backgroundStyles = {
      'background-image': ''
    };

    return (
      <div className={classes}>

        <div className="background" style={backgroundStyles} />

        <div className="pure-g full">
          <div className="pure-u-1-2" />
          <div className="pure-u-1-2 right full">
            <PredictionCard className="featured" prediction={this.props.featuredPrediction} />
          </div>
        </div>

      </div>
    );
  }

});

module.exports = React.createFactory(Hero);