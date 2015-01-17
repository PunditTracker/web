/**
 * @jsx React.DOM
 */
 /* global FB */
'use strict';

var React      = require('react/addons');
var Navigation = require('react-router').Navigation;

var DocumentTitle = require('../components/DocumentTitle');
var AuthAPI       = require('../utils/AuthAPI');

var RegisterPage = React.createClass({

  mixins: [React.addons.LinkedStateMixin, Navigation],

  getInitialState: function() {
    return {
      username: '',
      email: '',
      firstName: '',
      lastName: '',
      avatarUrl: '',
      password: '',
      error: null,
      isFacebookRegister: false
    };
  },

  checkFbState: function() {
    FB.getLoginStatus(function(response) {
      if ( response.status === 'connected' ) {
        console.log('logged in via Facebook!!');
        this.getUserInfoFb();
      } else if ( response.status === 'not_authorized' ) {
        this.setState({ error: 'You must authorize PunditTracker via Facebook to register using that method.' });
      } else {
        this.setState({ error: 'You must be logged in to Facebook to register using that method.' });
      }
    }.bind(this));
  },

  getUserInfoFb: function() {
    // Seemingly can't bind FB api calls to 'this'
    var component = this;

    FB.api('/me', { fields: 'email,first_name,last_name,id' }, function(response) {
      FB.api('/me/picture?width=180&height=180', function(imageResponse) {
        component.setState({
          email: response.email,
          firstName: response.first_name,
          lastName: response.last_name,
          avatarUrl: imageResponse.data.url,
          facebookId: response.id
        });
      });
    });
  },

  fbLogin: function() {
    this.setState({ isFacebookRegister: true });
    FB.login(this.checkFbState, { scope: 'public_profile,email' });
  },

  handleSubmit: function(evt) {
    var user = {
      username: this.state.username,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      avatarURL: this.state.avatarUrl,
      facebookId: this.state.facebookId,
      password: this.state.password
    };
    var registerFunction = this.state.isFacebookRegister ? AuthAPI.facebookRegister : AuthAPI.register;

    evt.stopPropagation();
    evt.preventDefault();

    registerFunction(user).then(function() {
      console.log('successfully registerd user, transitioning to login page');
      this.transitionTo('Login');
    }.bind(this)).catch(function(err) {
      console.log('error registering:', err);
      this.setState({ error: err.message });
    }.bind(this));
  },

  renderPasswordInput: function() {
    var element = null;

    if ( !this.state.isFacebookRegister ) {
      element = (
        <input type="password" id="password" valueLink={this.linkState('password')} placeholder="Password" required />
      );
    }

    return element;
  },

  render: function() {
    return (
      <section className="content no-hero register">

        <DocumentTitle title="Register" />

        <form id="register-form" className="island" onSubmit={this.handleSubmit}>
          <input type="text" id="username" valueLink={this.linkState('username')} placeholder="Username" required />
          <br />
          <input type="text" id="email" valueLink={this.linkState('email')} placeholder="Email address" required />
          <br />
          <input type="text" id="firstName" valueLink={this.linkState('firstName')} placeholder="First Name" required />
          <br />
          <input type="text" id="lastName" valueLink={this.linkState('lastName')} placeholder="Last Name" required />
          <br />
          <input type="text" id="avatarUrl" valueLink={this.linkState('avatarUrl')} placeholder="Avatar URL (optional)" />
          <br />
          {this.renderPasswordInput()}
          <br />
          <div className="error-container">{this.state.error}</div>
          <br />
          <input type="submit" value="Register" />
        </form>

        <div className="fb-register-container">
          <a onClick={this.fbLogin}>Register with Facebook</a>
        </div>

      </section>
    );
  }

});

module.exports = React.createFactory(RegisterPage);