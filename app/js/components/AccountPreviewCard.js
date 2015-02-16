/**
 * @jsx React.DOM
 */
'use strict';

var React     = require('react/addons');
var moment    = require('moment');
var cx        = React.addons.classSet;

var UserGrade = require('./UserGrade');

var AccountPreviewCard = React.createClass({

  propTypes: {
    user: React.PropTypes.object.isRequired,
    classes: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      user: {
        firstName: '',
        lastName: '',
        affiliation: '',
        score: 0,
        predictionGraded: 0,
        predictionCorrect: 0
      },
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
        <div className="pure-u-1-4">
          <div className="profile-image" style={imageStyles} />
        </div>
      );
    }

    return element;
  },

  render: function() {
    var nameContainerClasses = cx({
      'name-container': true,
      'islet': true,
      'pure-u-3-4': !!this.props.user.avatarUrl,
      'pure-u-1': !this.props.user.avatarUrl
    });
    var firstNameClass = this.props.user.firstName ? '' : 'placeholder';
    var lastNameClass = this.props.user.lastName ? '' : 'placeholder';
    var affiliationClass = 'flush ' + (this.props.user.affiliation ? '' : 'placeholder');

    return (
      <div className="account-preview-card nudge--bottom">
        <div className="pure-g">
          {this.renderUserImage()}
          <div className={nameContainerClasses}>
            <h2 className="flush--bottom">
              <span className={firstNameClass}>{this.props.user.firstName || 'First Name'}</span>
              <span> </span>
              <span className={lastNameClass}>{this.props.user.lastName || 'Last Name'}</span>
            </h2>
            <h4 className={affiliationClass}>{this.props.user.affiliation || 'Affiliation'}</h4>
          </div>
        </div>
        <div className="pure-g stats">
          <div className="pure-u-1-3">
            <h6>Predictions</h6>
            <h4>{this.props.user.predictionGraded || 0}</h4>
          </div>
          <div className="pure-u-1-3">
            <h6>Correct</h6>
            <h4>{this.props.user.predictionCorrect || 0}</h4>
          </div>
          <div className="pure-u-1-3">
            <h6>Wrong</h6>
            <h4>{this.props.user.predictionGraded - this.props.user.predictionCorrect}</h4>
          </div>
        </div>
        <div className="pure-g stats">
          <div className="pure-u-1-1 since">
            <h6>Predicting Since</h6>
            <h4>{moment(this.props.user.created).format('MMMM YYYY')}</h4>
            <UserGrade user={this.props.user} />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = React.createFactory(AccountPreviewCard);