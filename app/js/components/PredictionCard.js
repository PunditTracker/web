/**
 * @jsx React.DOM
 */
'use strict';

var React      = require('react/addons');
var Link       = React.createFactory(require('react-router').Link);

var UserAvatar = require('./UserAvatar');

var PredictionCard = React.createClass({

  propTypes: {
    prediction: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      prediction: {}
    };
  },

  render: function() {
    var titleStyles = {
      'backgroundImage': 'url(' + this.props.prediction.imageUrl + ')'
    };
    var categoryClass = 'category' + ' ' + this.props.prediction.category.toLowerCase();

    return (
      <div className="prediction-card">

        <div className="title-container" style={titleStyles}>
          <div className={categoryClass}>{this.props.prediction.category}</div>
          <h2 className="title">{this.props.prediction.title}</h2>
          <div className="filter" />
          <div className="shadow" />
          <Link to="Prediction" params={{ category: this.props.prediction.category, id: this.props.prediction.id }} />
        </div>

        <div className="info-container">
          <div className="avatar-container">
            <UserAvatar user={this.props.prediction.user} />
          </div>
          <div className="user-container">
            <Link to="Profile"
                  params={{ id: this.props.prediction.user.id }}
                  className="user-name">
              {this.props.prediction.user.name}
            </Link>
            <a className="user-organization">{this.props.prediction.user.organization}</a>
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