/**
 * @jsx React.DOM
 */
 /* global FB */
'use strict';

var React                 = require('react/addons');
var Reflux                = require('reflux');

var UserActions           = require('../actions/UserActions');
var LayeredComponentMixin = require('./LayeredComponentMixin');
var Modal                 = require('../components/Modal');
var Spinner               = require('../components/Spinner');

var LoginModalMixin = {

  // NOTE: React.addons.LinkedStateMixin is also required, but is already included in Header.js where this mixin is used
  mixins: [Reflux.ListenerMixin, LayeredComponentMixin],

  getInitialState: function() {
    return {
      showLoginModal: false,
      loading: false,
      username: '',
      password: ''
    };
  },

  toggleLoginModal: function() {
    console.log('toggle login modal');
    this.setState({ showLoginModal: !this.state.showLoginModal });
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

    this.setState({ loading: true });

    loginFunction(user, function(err) {
      if ( err ) {
        console.log('error logging in:', err);
        this.setState({ error: err.message, loading: false });
      } else {
        console.log('successfully logged in, closing modal');
        this.toggleLoginModal();
      }
    }.bind(this));
  },

  renderSpinner: function() {
    var element = null;

    if ( this.state.loading ) {
      element = (
        <Spinner size={10} />
      );
    }

    return element;
  },

  renderError: function() {
    var element = null;

    if ( this.state.error ) {
      element = (
        <div className="error-container">
          {this.state.error}
        </div>
      );
    }

    return element;
  },

  renderLayer: function() {
    var element = (<span />);

    if ( this.state.showLoginModal ) {
      element = (
        <Modal className="login-modal" onRequestClose={this.toggleLoginModal}>

          <form id="login-form" className="island" onSubmit={this.handleSubmit}>
            <input type="text" id="username" valueLink={this.linkState('username')} placeholder="Username" required />
            <br />
            <input type="password" id="password" valueLink={this.linkState('password')} placeholder="Password" required />
            <br />
            {this.renderError()}
            <br />
            <input type="submit" value="Login" />
          </form>

          <div className="fb-login-container">
            <a onClick={this.fbLogin}>Login with Facebook</a>
          </div>

          <div>
            Don't have an account? <a href="/register">Sign up</a>
          </div>

        </Modal>
      );
    }

    return element;
  },

};

module.exports = LoginModalMixin;