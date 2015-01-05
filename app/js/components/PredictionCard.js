/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');

var User  = require('./User');

var PredictionCard = React.createClass({

  propTypes: {
    prediction: React.PropTypes.object.isRequired,
    className: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      prediction: {},
      className: ''
    };
  },

  render: function() {
    var classes = 'prediction-card ' + this.props.className;

    return (
      <div className={classes}>

        <div className="background"><div className="scrim" /></div>

        <h4 className="text">{this.props.prediction.text}</h4>

        <div className="voting">
          <div className="prompt">
            <p><i className="fa fa-bar-chart"></i></p>
          </div>
          <ul className="options">
            <li><a href="#">
              <span className="option">No Way</span>
            </a></li>
            <li><a href="#">
              <span className="option">Unlikely</span>
            </a></li>
            <li><a href="#">
              <span className="option">Likely</span>
            </a></li>
            <li><a href="#">
              <span className="option">Definitely</span>
            </a></li>
          </ul>
        </div>

        <User user={this.props.prediction.user} />

      </div>
    );
  }

});

module.exports = React.createFactory(PredictionCard);