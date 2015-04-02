 /* global FB */
'use strict';

var React                 = require('react/addons');
var Reflux                = require('reflux');
var _                     = require('lodash');

var UserActions           = require('../actions/UserActions');
var LayeredComponentMixin = require('./LayeredComponentMixin');
var Modal                 = require('../components/Modal.jsx');
var Spinner               = require('../components/Spinner.jsx');

var LoginModalMixin = {

  // NOTE: React.addons.LinkedStateMixin is also required, but is already included in Header.js where this mixin is used
  mixins: [Reflux.ListenerMixin, LayeredComponentMixin],

  getInitialState: function() {
    return {
      showLoginModal: false,
      loggingIn: false,
      email: '',
      password: '',
      facebookId: null,
      isFacebookLogin: false,
      submitDisabled: true
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    if ( !_.isEqual(this.state, prevState) && this.isMounted() ) {
      this.checkForm();
    } else if ( !_.isEmpty(this.props.currentUser) && this.state.showLoginModal ) {
      // Hide modal if user is updated while open
      this.setState({ showLoginModal: false });
    }
  },

  checkForm: function() {
    var formIsValid = this.state.email.length && this.state.password.length;

    this.setState({ submitDisabled: !formIsValid });
  },

  toggleLoginModal: function() {
    this.setState({
      showLoginModal: !this.state.showLoginModal
    });
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
      email: this.state.email,
      password: this.state.password,
      facebookId: this.state.facebookId
    };
    var loginFunction = this.state.isFacebookLogin ? UserActions.facebookLogin : UserActions.login;

    if ( evt ) {
      evt.stopPropagation();
      evt.preventDefault();
    }

    this.setState({ loggingIn: true });

    loginFunction(user, function(err) {
      if ( err ) {
        console.log('error logging in:', err);
        this.setState({ error: err.message, loggingIn: false });
      } else {
        console.log('successfully logged in, closing modal');
        this.toggleLoginModal();
      }
    }.bind(this));
  },

  renderSpinner: function() {
    var element = null;

    if ( this.state.loggingIn ) {
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
        <div className="error-container text-center nudge-half--bottom">
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

          <div className="fb-login-container">
            <a className="btn fb" onClick={this.fbLogin}><i className="fa fa-facebook" /> Login with Facebook</a>
            <strong className="line-thru">or</strong>
          </div>

          <form id="login-form" className="nudge-half--bottom" onSubmit={this.handleSubmit}>
            <input type="text"
                   id="email"
                   className="nudge-half--bottom"
                   valueLink={this.linkState('email')}
                   placeholder="Email"
                   required />
            <input type="password"
                   id="password"
                   className="nudge-half--bottom"
                   valueLink={this.linkState('password')}
                   placeholder="Password"
                   required />
            {this.renderError()}
            <button type="submit"
                   className="btn block full-width"
                   disabled={this.state.loggingIn || this.state.submitDisabled ? 'true' : ''}>
              <Spinner loading={this.state.loggingIn} />
              Login
            </button>
          </form>

          <div className="nudge-half--bottom">
            <a href="/forgot">Forgot your password?</a>
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