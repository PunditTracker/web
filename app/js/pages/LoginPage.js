/**
 * @jsx React.DOM
 */
 /* global FB */
'use strict';

var React            = require('react/addons');
var Reflux           = require('reflux');
var _                = require('underscore');
var $                = require('jquery');
var Navigation       = require('react-router').Navigation;

var DocumentTitle    = require('../components/DocumentTitle');
var UserActions      = require('../actions/UserActions');
var CurrentUserStore = require('../stores/CurrentUserStore');

var LoginPage = React.createClass({

  mixins: [React.addons.LinkedStateMixin, Reflux.ListenerMixin, Navigation],

  getInitialState: function() {
    return {
      username: '',
      password: '',
      facebookId: null,
      submitDisabled: true,
      isFacebookLogin: false,
      error: null
    };
  },

  _onUserChange: function(err, user) {
    if ( err ) {
      console.log('error setting current user:', err);
      this.setState({ error: err });
    } else if ( !_.isEmpty(user) ) {
      console.log('current user set:', user, 'transitioning to home page');
      this.transitionTo('Home');
    }
  },

  componentWillMount: function() {
    UserActions.check(this._onUserChange);
  },

  componentDidMount: function() {
    if ( CurrentUserStore.user ) {
      console.log('current user already exists, transitioning to home page');
      this.transitionTo('Home');
    } else {
      this.listenTo(CurrentUserStore, this._onUserChange);
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    if ( !_.isEqual(this.state, prevState) ) {
      this.checkForm();
    }
  },

  checkFbState: function() {
    FB.getLoginStatus(function(response) {
      if ( response.status === 'connected' ) {
        console.log('logged in via Facebook!!');
        this.getUserInfoFb();
      } else if ( response.status === 'not_authorized' ) {
        this.setState({ error: 'You must authorize PunditTracker via Facebook to log in using that method.' });
      } else {
        this.setState({ error: 'You must be logged in to Facebook to log in using that method.' });
      }
    }.bind(this));
  },

  getUserInfoFb: function() {
    FB.api('/me', { fields: 'id' }, function(response) {
      this.setState({ facebookId: response.id }, this.handleSubmit);
    }.bind(this));
  },

  fbLogin: function() {
    this.setState({ isFacebookLogin: true });
    FB.login(this.checkFbState, { scope: 'public_profile,email' });
  },

  checkForm: function() {
    var $form = $('#login-form');
    var formIsValid = !$form.checkValidity || $form.checkValidity();

    if ( formIsValid ) {
      this.setState({ submitDisabled: false });
    } else {
      this.setState({ submitDisabled: true });
    }
  },

  handleSubmit: function(evt) {
    var user = {
      username: this.state.username,
      password: this.state.password,
      facebookId: this.state.facebookId
    };
    var loginFunction = this.state.isFacebookLogin ? UserActions.facebookLogin : UserActions.login;

    if ( evt ) {
      evt.stopPropagation();
      evt.preventDefault();
    }

    this.setState({ error: null }, function() {
      loginFunction(user, function(err) {
        if ( err ) {
          console.log('error logging in:', err);
          this.setState({ error: err });
        } else {
          console.log('successfully logged in, transitioning to home page');
          this.transitionTo('Home');
        }
      }.bind(this));
    }.bind(this));
  },

  render: function() {
    return (
      <section className="login-page">

        <DocumentTitle title="Login" />

        <form id="login-form" className="island" onSubmit={this.handleSubmit}>
          <input type="text" id="username" valueLink={this.linkState('username')} placeholder="Username" required />
          <br />
          <input type="password" id="password" valueLink={this.linkState('password')} placeholder="Password" required />
          <br />
          <div className="error-container">{this.state.error}</div>
          <br />
          <input type="submit" value="Login" disabled={this.state.submitDisabled ? 'true' : ''} />
        </form>

        <div className="fb-login-container">
          <a onClick={this.fbLogin}>Login with Facebook</a>
        </div>

      </section>
    );
  }

});

module.exports = React.createFactory(LoginPage);