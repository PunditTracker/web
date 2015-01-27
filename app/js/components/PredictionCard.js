/**
 * @jsx React.DOM
 */
'use strict';

var React           = require('react/addons');
var _               = require('lodash');
var cx              = React.addons.classSet;

var PredictionAPI   = require('../utils/PredictionAPI');
var LoginModalMixin = require('../mixins/LoginModalMixin');
var User            = require('./User');

var PredictionCard = React.createClass({

  // React.addons.LinkedStateMixin is for LoginModalMixin
  mixins: [React.addons.LinkedStateMixin, LoginModalMixin],

  propTypes: {
    currentUser: React.PropTypes.object.isRequired,
    prediction: React.PropTypes.object.isRequired,
    className: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      currentUser: {},
      prediction: {},
      className: ''
    };
  },

  getInitialState: function() {
    return {
      userVote: null
    };
  },

  doVote: function(vote) {
    if ( _.isEmpty(this.props.currentUser) ) {
      this.toggleLoginModal();
    } else if ( vote.toLowerCase() !== this.state.userVote ) {
      this.setState({ userVote: vote });
      PredictionAPI.doVote(this.props.prediction, vote);
    }
  },

  renderTags: function() {
    var element = null;

    if ( !_.isEmpty(this.props.prediction.tags) ) {
      element = _.map(this.props.prediction.tags, function(tag, index) {
        return (
          <li key={index}>{tag}</li>
        );
      });
    }

    return element;
  },

  render: function() {
    var classes = 'prediction-card ' + this.props.className;
    var noWayClasses = cx({
      'active': this.state.userVote === 'No Way'
    });
    var unlikelyClasses = cx({
      'active': this.state.userVote === 'Unlikely'
    });
    var likelyClasses = cx({
      'active': this.state.userVote === 'Likely'
    });
    var definitelyClasses = cx({
      'active': this.state.userVote === 'Definitely'
    });

    return (
      <div className={classes}>

        <div className="background"><div className="scrim" /></div>

        <div className="tags">
          <ul className="inner">
            <li className="category">{this.props.prediction.subcat ? this.props.prediction.subcat.name : ''}</li>
            {this.renderTags()}
          </ul>
        </div>

        <h4 className="text">{this.props.prediction.title}</h4>

        <div className="voting">
          <div className="prompt">
            <p><i className="fa fa-bar-chart"></i></p>
          </div>
          <ul className="options">
            <li className={noWayClasses}>
              <span className="option" onClick={this.doVote.bind(null, 'No Way')}>No Way</span>
            </li>
            <li className={unlikelyClasses}>
              <span className="option" onClick={this.doVote.bind(null, 'Unlikely')}>Unlikely</span>
            </li>
            <li className={likelyClasses}>
              <span className="option" onClick={this.doVote.bind(null, 'Likely')}>Likely</span>
            </li>
            <li className={definitelyClasses}>
              <span className="option" onClick={this.doVote.bind(null, 'Definitely')}>Definitely</span>
            </li>
          </ul>
        </div>

        <User user={this.props.prediction.creator} />

      </div>
    );
  }

});

module.exports = React.createFactory(PredictionCard);