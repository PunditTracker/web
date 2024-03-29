'use strict';

var React                   = require('react/addons');
var ReactAsync              = require('react-async');
var when                    = require('when');
var _                       = require('lodash');
var DocumentTitle           = require('react-document-title');

var APIUtils                = require('../utils/APIUtils');
var UserActions             = require('../actions/UserActions');
var AuthenticatedRouteMixin = require('../mixins/AuthenticatedRouteMixin');
var FileInput               = require('../components/FileInput.jsx');
var Spinner                 = require('../components/Spinner.jsx');
var FixedSidebar            = require('../components/FixedSidebar.jsx');
var ProfileCard             = require('../components/ProfileCard.jsx');

var SettingsPage = React.createClass({

  mixins: [ReactAsync.Mixin, React.addons.LinkedStateMixin, AuthenticatedRouteMixin],

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

  getInitialStateAsync: function(cb) {
    cb(null, {
      email: this.props.currentUser.email || '',
      affiliation: this.props.currentUser.affiliation || '',
      firstName: this.props.currentUser.firstName || '',
      lastName: this.props.currentUser.lastName || '',
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
      newImage: null,
      error: null,
      loading: false,
      submitDisabled: true
    });
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
    var hasOldPassword = this.state.oldPassword && this.state.oldPassword.length;
    var newPasswordsMatch = this.state.newPassword === this.state.confirmNewPassword;

    if ( hasNewFirstName || hasNewLastName || hasNewImage || (hasNewPassword && hasOldPassword && newPasswordsMatch) ) {
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
    var hasOldPassword = this.state.oldPassword && this.state.oldPassword.length;
    var hasNewPassword = this.state.newPassword && this.state.newPassword.length;
    var newPasswordsMatch = this.state.newPassword === this.state.confirmNewPassword;
    var body = {
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword
    };

    if ( hasNewPassword && hasOldPassword && newPasswordsMatch ) {
      APIUtils.doPost('user/password', body).then(function() {
        deferred.resolve(avatarUrl);
      }).catch(function(err) {
        deferred.reject(err);
      });
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

  renderProfileCard: function() {
    var user = {
      email: this.state.email,
      affiliation: this.state.affiliation,
      firstName: this.state.firstName || this.props.currentUser.firstName,
      lastName: this.state.lastName || this.props.currentUser.lastName,
      avatarUrl: this.props.currentUser.avatarUrl || null,
      created: new Date().toISOString(),
      predictionsGraded: 0,
      predictionsCorrect: 0,
      predictions: [],
      score: 0
    };

    return (
      <ProfileCard user={user} />
    );
  },

  renderOldPasswordInput: function() {
    var hasNewPassword = this.state.newPassword && this.state.newPassword.length;
    var element = null;

    if ( hasNewPassword ) {
      element = (
        <input type="password"
               className="nudge-half--bottom"
               id="oldPassword"
               valueLink={this.linkState('oldPassword')}
               placeholder="Confirm Old Password" />
      );
    }

    return element;
  },

  render: function() {
    return (
      <DocumentTitle title={APIUtils.buildPageTitle('Account Settings')}>
      <section className="content no-hero settings full-page-form">

        <div className="container card-grid">
          <div className="content-with-sidebar left" style={{ 'minHeight': '610px' }}>
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
              {this.renderOldPasswordInput()}
              {this.renderError()}
              <button type="submit"
                      className="btn block full-width"
                      disabled={this.state.loading || this.state.submitDisabled ? 'true' : ''}>
                <Spinner loading={this.state.loading} />
                Update Account
              </button>
            </form>
          </div>

          <FixedSidebar className="right">
            {this.renderProfileCard()}
          </FixedSidebar>
        </div>

      </section>
      </DocumentTitle>
    );
  }

});

module.exports = SettingsPage;