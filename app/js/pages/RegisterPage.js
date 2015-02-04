/**
 * @jsx React.DOM
 */
 /* global FB */
'use strict';

var React         = require('react/addons');
var _             = require('lodash');
var Navigation    = require('react-router').Navigation;

var DocumentTitle = require('../components/DocumentTitle');
var AuthAPI       = require('../utils/AuthAPI');
var FileInput     = require('../components/FileInput');

var RegisterPage = React.createClass({

  mixins: [React.addons.LinkedStateMixin, Navigation],

  getInitialState: function() {
    return {
      email: '',
      firstName: '',
      lastName: '',
      avatarUrl: '',
      password: '',
      confirmPassword: '',
      error: null,
      isFacebookRegister: false,
      submitDisabled: true
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    if ( !_.isEqual(this.state, prevState) && this.isMounted() ) {
      this.checkForm();
    }
  },

  checkForm: function() {
    var passwordSatisfied = this.state.isFacebookRegister || (this.state.password.length && this.state.password === this.state.confirmPassword);
    var formIsValid = this.state.email.length && this.state.firstName.length && this.state.lastName.length && passwordSatisfied;

    this.setState({ submitDisabled: !formIsValid });
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
    var component = this; // Seemingly can't bind FB api calls to 'this'

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

  updateImage: function(file) {
    this.setState({ image: file });
  },

  handleSubmit: function(evt) {
    var user = {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      avatarURL: this.state.avatarUrl,
      facebookId: this.state.facebookId,
      password: this.state.password
    };
    var registerFunction = this.state.isFacebookRegister ? AuthAPI.facebookRegister : AuthAPI.register;
    var passwordsMatch = this.state.isFacebookRegister || (this.state.password.length && this.state.password === this.state.confirmPassword);

    evt.stopPropagation();
    evt.preventDefault();

    if ( !passwordsMatch ) {
      this.setState({ error: 'Those passwords do not match!' });
    } else {
      this.setState({ error: null, loading: true });

      registerFunction(user).then(function() {
        console.log('successfully registerd user, transitioning to home page');
        this.transitionTo('Home');
      }.bind(this)).catch(function(err) {
        console.log('error registering:', err);
        this.setState({ error: err.message });
      }.bind(this));
    }
  },

  renderImageInput: function() {
    var element = null;

    if ( !this.state.isFacebookRegister ) {
      element = (
        <FileInput id="image-url"
                   className="nudge-half--bottom"
                   accept="image/x-png, image/gif, image/jpeg"
                   processFile={this.updateImage} />
      );
    }

    return element;
  },

  renderPasswordInput: function() {
    var element = null;

    if ( !this.state.isFacebookRegister ) {
      element = (
        <input type="password"
               id="password"
               className="nudge-half--bottom"
               valueLink={this.linkState('password')}
               placeholder="Password"
               required />
      );
    }

    return element;
  },

  renderConfirmInput: function() {
    var element = null;

    if ( !this.state.isFacebookRegister ) {
      element = (
        <input type="password"
               id="confirm-password"
               className="nudge-half--bottom"
               valueLink={this.linkState('confirmPassword')}
               placeholder="Confirm"
               required />
      );
    }

    return element;
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

  render: function() {
    return (
      <section className="content no-hero register">

        <DocumentTitle title="Register" />

        <div className="container slim">
          <div className="fb-register-container">
            <a className="btn fb text-center" onClick={this.fbLogin}>
              <i className="fa fa-facebook" /> Register with Facebook
            </a>
            <strong className="line-thru">or</strong>
          </div>

          <form id="register-form" onSubmit={this.handleSubmit}>
            <input type="text"
                   className="nudge-half--bottom"
                   id="email"
                   valueLink={this.linkState('email')}
                   placeholder="Email address"
                   required />
            <input type="text"
                   className="nudge-half--bottom"
                   id="firstName"
                   valueLink={this.linkState('firstName')}
                   placeholder="First Name"
                   required />
            <input type="text"
                   className="nudge-half--bottom"
                   id="lastName"
                   valueLink={this.linkState('lastName')}
                   placeholder="Last Name"
                   required />
            {this.renderImageInput()}
            {this.renderPasswordInput()}
            {this.renderConfirmInput()}
            {this.renderError()}
            <input type="submit" value="Register" className="btn block" disabled={this.state.submitDisabled ? 'true' : ''} />
          </form>
        </div>

      </section>
    );
  }

});

module.exports = React.createFactory(RegisterPage);