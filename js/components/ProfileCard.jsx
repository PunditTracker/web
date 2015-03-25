'use strict';

var React     = require('react/addons');
var moment    = require('moment');

var UserGrade = require('./UserGrade.jsx');

var ProfileCard = React.createClass({

  propTypes: {
    user: React.PropTypes.object.isRequired,
    usePlaceholders: React.PropTypes.bool,
    classes: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      user: {
        firstName: '',
        lastName: '',
        affiliation: '',
        score: 0,
        predictionsGraded: 0,
        predictionsCorrect: 0
      },
      usePlaceholders: true,
      classes: {
        firstName: '',
        lastName: ''
      }
    };
  },

  renderUserImage: function() {
    var element = null;
    var imageStyles;
    var imageUrl;

    if ( this.props.user.avatarUrl ) {
      imageUrl = this.props.user.avatarUrl + '#' + new Date().getTime(); // Append date for cache-busting
      imageStyles = {
        'backgroundImage': 'url(' + imageUrl + ')'
      };

      element = (
        <div className="profile-image" style={imageStyles} />
      );
    }

    return element;
  },

  renderBio: function() {
    var element = null;

    if ( this.props.user.bio && this.props.user.bio.length ) {
      element = (
        <div className="text">
          <p>{this.props.user.bio}</p>
        </div>
      );
    }

    return element;
  },

  renderSecondRowStats: function() {
    var element = null;

    if ( false ) {
      element = (
        <div className="pure-g stats">
          <div className="pure-u-1-3">
            <h6>Hit Rate</h6>
            <h4>{this.calculateHitRate()}%</h4>
          </div>
          <div className="pure-u-1-3">
            <h6>Yield</h6>
            <h4>$0.84</h4>
          </div>
          <div className="pure-u-1-3">
            <h6>Coolness</h6>
            <h4>Max</h4>
          </div>
        </div>
      );
    }

    return element;
  },

  renderFirstName: function() {
    var element = null;
    var firstNameClass = this.props.user.firstName ? '' : 'placeholder';

    if ( this.props.user.firstName || this.props.usePlaceholders ) {
      element = (
        <span className={firstNameClass}>{this.props.user.firstName || 'First Name'}</span>
      );
    }

    return element;
  },

  renderLastName: function() {
    var element = null;
    var lastNameClass = this.props.user.lastName ? '' : 'placeholder';

    if ( this.props.user.lastName || this.props.usePlaceholders ) {
      element = (
        <span className={lastNameClass}>{this.props.user.lastName || 'Last Name'}</span>
      );
    }

    return element;
  },

  renderAffiliation: function() {
    var element = null;
    var affiliationClass = 'flush ' + (this.props.user.affiliation ? '' : 'placeholder');

    if ( this.props.user.affiliation || this.props.usePlaceholders ) {
      element = (
        <h5 className={affiliationClass}>{this.props.user.affiliation || 'Affiliation'}</h5>
      );
    }

    return element;
  },

  render: function() {
    return (
      <div className="profile-card">
        <div className="user-info">
          {this.renderUserImage()}
          <div className="text dark">
            <h3>
              {this.renderFirstName()}
              <span> </span>
              {this.renderLastName()}
            </h3>
            {this.renderAffiliation()}
          </div>
          {this.renderBio()}
          <div className="pure-g stats">
            <div className="pure-u-1-3">
              <h6>Predictions</h6>
              <h4>{this.props.user.predictions.length || 0}</h4>
            </div>
            <div className="pure-u-1-3">
              <h6>Correct</h6>
              <h4>{this.props.user.predictionsCorrect || 0}</h4>
            </div>
            <div className="pure-u-1-3">
              <h6>Wrong</h6>
              <h4>{this.props.user.predictionsGraded - this.props.user.predictionsCorrect}</h4>
            </div>
          </div>
          {this.renderSecondRowStats()}
          <div className="pure-g stats">
            <div className="pure-u-1-1 since">
              <h6>Predicting Since</h6>
              <h4>{moment(this.props.user.created).format('MMMM YYYY')}</h4>
              <UserGrade user={this.props.user} />
            </div>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = ProfileCard;