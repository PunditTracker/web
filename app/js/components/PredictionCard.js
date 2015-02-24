/**
 * @jsx React.DOM
 */
'use strict';

var React           = require('react/addons');
var _               = require('lodash');
var cx              = require('classnames');

var APIUtils        = require('../utils/APIUtils');
var PredictionAPI   = require('../utils/PredictionAPI');
var CategoriesStore = require('../stores/CategoriesStore');
var LoginModalMixin = require('../mixins/LoginModalMixin');
var ListLink        = require('./ListLink');
var User            = require('./User');

var PredictionCard = React.createClass({

  // React.addons.LinkedStateMixin is for LoginModalMixin
  mixins: [React.addons.LinkedStateMixin, LoginModalMixin],

  propTypes: {
    currentUser: React.PropTypes.object.isRequired,
    prediction: React.PropTypes.object.isRequired,
    className: React.PropTypes.string,
    renderGrade: React.PropTypes.bool
  },

  getDefaultProps: function() {
    return {
      currentUser: {},
      prediction: {},
      className: '',
      renderGrade: true
    };
  },

  getInitialState: function() {
    return {
      userVote: this.props.prediction.curUserVote === -1 ? null : this.mapIntToVote(this.props.prediction.curUserVote)
    };
  },

  componentDidUpdate: function(prevProps) {
    if ( !_.isEqual(prevProps.prediction, this.props.prediction) ) {
      this.setState(this.getInitialState());
    }
  },

  hasDeadlinePassed: function() {
    return new Date(this.props.prediction.deadline) < new Date();
  },

  mapIntToVote: function(voteInt) {
    var returnVote;

    switch (voteInt) {
      case 0:
        returnVote = 'No Way';
        break;
      case 1:
        returnVote = 'Unlikely';
        break;
      case 2:
        returnVote = 'Likely';
        break;
      case 3:
        returnVote = 'Definitely';
        break;
      default:
        returnVote = null;
    }

    return returnVote;
  },

  mapVoteToInt: function(vote) {
    var returnInt;

    switch (vote) {
      case 'No Way':
        returnInt = 0;
        break;
      case 'Unlikely':
        returnInt = 1;
        break;
      case 'Likely':
        returnInt = 2;
        break;
      case 'Definitely':
        returnInt = 3;
        break;
      default:
        returnInt = 0;
    }

    return returnInt;
  },

  getCategoryName: function() {
    var categoryIdentifier = this.props.prediction.category || this.props.prediction.categoryId;
    var match;
    var name;

    if ( categoryIdentifier % 1 === 0 ) { // is an integer, needs to be mapped to name
      match = _.find(CategoriesStore.categories, function(category) {
        return category.id === categoryIdentifier;
      });
      name = match ? match.name : null;
    } else {
      name = categoryIdentifier;
    }

    return APIUtils.titleCase(name || '');
  },

  doVote: function(vote) {
    if ( !this.hasDeadlinePassed() ) {
      if ( _.isEmpty(this.props.currentUser) ) {
        this.toggleLoginModal();
      } else if ( vote.toLowerCase() !== this.state.userVote ) {
        this.setState({ userVote: vote });
        PredictionAPI.doVote(this.props.prediction, this.mapVoteToInt(vote));
      }
    }
  },

  renderTitle: function() {
    var element = null;

    // Any larger cards should use <h3 />
    if ( this.props.className && this.props.className.length ) {
      element = (
        <h3 className="text">{this.props.prediction.title}</h3>
      );
    } else {
      element = (
        <h4 className="text">{this.props.prediction.title}</h4>
      );
    }

    return element;
  },

  renderTags: function() {
    var element = null;

    if ( !_.isEmpty(this.props.prediction.tags) ) {
      element = _.map(this.props.prediction.tags, function(tag, index) {
        return (
          <ListLink to="Search" query={{ q: tag }} key={index}>{tag}</ListLink>
        );
      });
    }

    return element;
  },

  renderStateIcon: function() {
    var containerClasses = 'state-icon-container';
    var iconClasses = 'fa';
    var title;

    switch ( this.props.prediction.state ) {
      case ( 0 ):
        title = 'Awaiting Grading';
        containerClasses += ' ungraded';
        iconClasses += ' fa-ellipsis-h';
        break;
      case ( 1 ):
        title = 'Awaiting Grading';
        containerClasses += ' ungraded';
        iconClasses += ' fa-ellipsis-h';
        break;
      case ( 2 ):
        title = 'Correct';
        containerClasses += ' correct';
        iconClasses += ' fa-check';
        break;
      case ( 3 ):
        title = 'Incorrect';
        containerClasses += ' incorrect';
        iconClasses += ' fa-remove';
        break;
    }

    return (
      <div className={containerClasses} title={title}>
        <i className={iconClasses} />
      </div>
    );
  },

  renderVotingOptions: function() {
    var element = null;
    var noWayClasses = cx({ 'active': this.state.userVote === 'No Way' });
    var unlikelyClasses = cx({ 'active': this.state.userVote === 'Unlikely' });
    var likelyClasses = cx({ 'active': this.state.userVote === 'Likely' });
    var definitelyClasses = cx({ 'active': this.state.userVote === 'Definitely' });

    if ( this.props.prediction.state === 0 ) {
      element = (
        <div className="voting">
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
      );
    }

    return element;
  },

  render: function() {
    var backgroundStyles = { 'backgroundImage': 'url(' + (this.props.prediction.imageUrl || '') + ')' };
    var classObject = {
      'prediction-card': true,
      'deadline-passed': this.hasDeadlinePassed()
    };
    var classes;

    classObject[this.props.className] = true;
    classes = cx(classObject);

    return (
      <div className={classes}>

        <div className="background" style={backgroundStyles}>
          <div className="scrim" />
        </div>

        <div className="tags">
          <ul className="inner">
            <ListLink to="Category"
                      params={{ category: this.getCategoryName().toLowerCase() }}
                      className="category">
              {this.getCategoryName()}
            </ListLink>
            {this.renderTags()}
          </ul>
        </div>

        {this.renderTitle()}

        {this.renderVotingOptions()}

        {this.renderStateIcon()}

        <User user={this.props.prediction.creator} renderGrade={this.props.renderGrade} />

      </div>
    );
  }

});

module.exports = React.createFactory(PredictionCard);