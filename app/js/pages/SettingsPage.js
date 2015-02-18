/**
 * @jsx React.DOM
 */
'use strict';

var React                   = require('react/addons');
var when                    = require('when');
var _                       = require('lodash');

var APIUtils                = require('../utils/APIUtils');
var UserActions             = require('../actions/UserActions');
var AuthenticatedRouteMixin = require('../mixins/AuthenticatedRouteMixin');
var DocumentTitle           = require('../components/DocumentTitle');
var FileInput               = require('../components/FileInput');
var Spinner                 = require('../components/Spinner');
var AccountPreviewCard      = require('../components/AccountPreviewCard');

var SettingsPage = React.createClass({

  mixins: [React.addons.LinkedStateMixin, AuthenticatedRouteMixin],

  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      currentUser: {
        firstName: '',
        lastName: '',
        predictionsGraded: 0,
        predictionsCorrect: 0
      }
    };
  },

  getInitialState: function() {
    return {
      email: this.props.currentUser.email || '',
      affiliation: this.props.currentUser.affiliation || '',
      firstName: this.props.currentUser.firstName || '',
      lastName: this.props.currentUser.lastName || '',
      newPassword: '',
      confirmNewPassword: '',
      newImage: null,
      error: null,
      loading: false,
      submitDisabled: true
    };
  },

  componentWillReceiveProps: function(nextProps) {
    if ( !_.isEqual(this.props.currentUser, nextProps.currentUser) ) {
      this.setState({
        email: nextProps.currentUser.email,
        firstName: nextProps.currentUser.firstName,
        lastName: nextProps.currentUser.lastName,
        newPassword: '',
        confirmNewPassword: '',
        newImage: null
      }, this.checkForm);
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    if ( !_.isEqual(this.state, prevState) ) {
      this.checkForm();
    }
  },

  checkForm: function() {
    var hasNewFirstName = this.state.firstName && this.state.firstName !== this.props.currentUser.firstName;
    var hasNewLastName = this.state.lastName && this.state.lastName !== this.props.currentUser.lastName;
    var hasNewImage = !!this.state.newImage;
    var hasNewPassword = this.state.newPassword && this.state.newPassword.length;
    var newPasswordsMatch = this.state.newPassword === this.state.confirmNewPassword;

    if ( hasNewFirstName || hasNewLastName || hasNewImage || (hasNewPassword && newPasswordsMatch) ) {
      this.setState({ error: null, submitDisabled: false });
    } else {
      this.setState({ submitDisabled: true });
    }
  },

  updateImage: function(file) {
    this.setState({ newImage: file });
  },

  uploadImage: function() {
    var deferred = when.defer();

    if ( this.state.newImage ) {
      APIUtils.uploadFile('putprofpic', this.state.newImage).then(function(res) {
        deferred.resolve(res.link);
      }).catch(function(err) {
        console.log('error uploading user image:', err);
        deferred.reject(err);
      });
    } else {
      deferred.resolve();
    }

    return deferred.promise;
  },

  updatePassword: function(avatarUrl) {
    var deferred = when.defer();
    var hasNewPassword = this.state.newPassword && this.state.newPassword.length;
    var newPasswordsMatch = this.state.newPassword === this.state.confirmNewPassword;

    if ( hasNewPassword && newPasswordsMatch ) {
      // TODO: make actual API call
      deferred.resolve(avatarUrl);
    } else {
      deferred.resolve(avatarUrl);
    }

    return deferred.promise;
  },

  updateUser: function(avatarUrl) {
    var deferred = when.defer();
    var hasNewAffiliation = this.state.affiliation && this.state.affiliation !== this.props.currentUser.affiliation;
    var hasNewFirstName = this.state.firstName && this.state.firstName !== this.props.currentUser.firstName;
    var hasNewLastName = this.state.lastName && this.state.lastName !== this.props.currentUser.lastName;
    var hasNewPassword = this.state.newPassword && this.state.newPassword.length;
    var newPasswordsMatch = this.state.newPassword === this.state.confirmNewPassword;
    var updates = {};

    if ( avatarUrl ) {
      updates.avatarUrl = avatarUrl;
    }

    if ( hasNewAffiliation ) {
      updates.affiliation = this.state.affiliation;
    }

    if ( hasNewFirstName ) {
      updates.firstName = this.state.firstName;
    }

    if ( hasNewLastName ) {
      updates.lastName = this.state.lastName;
    }

    if ( hasNewPassword && newPasswordsMatch ) {
      updates.password = this.state.newPassword;
    }

    UserActions.update(updates).then(function() {
      deferred.resolve();
    }).catch(function(err) {
      deferred.reject(err);
    });

    return deferred.promise;
  },

  handleSubmit: function(evt) {
    var hasNewPassword = this.state.newPassword && this.state.newPassword.length;
    var newPasswordsMatch = this.state.newPassword === this.state.confirmNewPassword;

    evt.preventDefault();

    if ( hasNewPassword && !newPasswordsMatch ) {
      this.setState({ error: 'Those passwords do not match.' });
    } else {
      this.setState({ loading: true });
      this.uploadImage().then(this.updatePassword).then(this.updateUser).then(function() {
        this.setState({
          loading: false,
          error: null,
          newPassword: '',
          confirmNewPassword: '',
          image: null
        });
      }.bind(this)).catch(function(err) {
        this.setState({ error: err.message.toString(), loading: false });
      }.bind(this));
    }
  },

  renderError: function() {
    var element = null;

    if ( this.state.error ) {
      element = (
        <div className="error-container text-center nudge-half--bottom">
          {this.state.error}
        </div>
      );
    }

    return element;
  },

  renderAccountPreviewCard: function() {
    var user = {
      email: this.state.email,
      affiliation: this.state.affiliation,
      firstName: this.state.firstName || this.props.currentUser.firstName,
      lastName: this.state.lastName || this.props.currentUser.lastName,
      avatarUrl: this.props.currentUser.avatarUrl || null,
      created: new Date().toISOString(),
      predictionsGraded: 0,
      predictionsCorrect: 0,
      score: 0
    };

    return (
      <AccountPreviewCard user={user} />
    );
  },

  render: function() {
    return (
      <section className="content no-hero settings full-page-form">

        <DocumentTitle title="Account Settings" />

        <div className="container slim">
          {this.renderAccountPreviewCard()}
          <form id="settings-form" onSubmit={this.handleSubmit}>
            <input type="email"
                   className="nudge-half--bottom"
                   id="email"
                   valueLink={this.linkState('email')}
                   placeholder="Email address"
                   disabled />
            <input type="text"
                   className="nudge-half--bottom"
                   id="firstName"
                   valueLink={this.linkState('firstName')}
                   placeholder="First Name" />
            <input type="text"
                   className="nudge-half--bottom"
                   id="lastName"
                   valueLink={this.linkState('lastName')}
                   placeholder="Last Name" />
            <input type="text"
                   className="nudge-half--bottom"
                   id="affiliation"
                   valueLink={this.linkState('affiliation')}
                   placeholder="Affiliation" />
            <FileInput id="image-url"
                       className="nudge-half--bottom"
                       accept="image/x-png, image/gif, image/jpeg"
                       processFile={this.updateImage} />
            <input type="password"
                   className="nudge-half--bottom"
                   id="lastName"
                   valueLink={this.linkState('newPassword')}
                   placeholder="New Password" />
            <input type="password"
                   className="nudge-half--bottom"
                   id="lastName"
                   valueLink={this.linkState('confirmNewPassword')}
                   placeholder="Confirm New Password" />
            {this.renderError()}
            <button type="submit" className="btn block full-width" disabled={this.state.submitDisabled ? 'true' : ''}>
              <Spinner loading={this.state.loading} />
              Update Account
            </button>
          </form>
        </div>

      </section>
    );
  }

});

module.exports = React.createFactory(SettingsPage);