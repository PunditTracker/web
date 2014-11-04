/**
 * @jsx React.DOM
 */
'use strict';

var React      = require('react/addons');

var UserAvatar = require('./UserAvatar');

var PredictionCard = React.createClass({

  propTypes: {
    prediction: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    // TODO: don't hardcode this
    return {
      prediction: {
        category: 'Finance',
        title: 'Dow Jones will fall below 6000 by March 2012',
        image_url: 'http://www.shedexpedition.com/wp-content/uploads/2013/04/Wall-Street-NYSE.jpg',
        user: {
          name: 'John Doe',
          organization: 'ESPN'
        },
        score: 'C'
      }
    };
  },

  render: function() {
    var titleStyles = {
      'background-image': 'url(' + this.props.prediction.image_url + ')'
    };

    return (
      <div className="prediction-card">

        <div className="title-container" style={titleStyles}>
          <div className="category">{this.props.prediction.category}</div>
          <h2 className="title">{this.props.prediction.title}</h2>
          <div className="filter" />
        </div>

        <div className="info-container">
          <div className="avatar-container">
            <UserAvatar user={this.props.prediction.user} />
          </div>
          <div className="user-container">
            <h4 className="user-name">{this.props.prediction.user.name}</h4>
            <h5 className="user-organization">{this.props.prediction.user.organization}</h5>
          </div>
          <div className="score-container">
            <h6 className="descriptor">Score</h6>
            <h2 className="score">{this.props.prediction.score}</h2>
          </div>
        </div>

      </div>
    );
  }

});

module.exports = React.createFactory(PredictionCard);