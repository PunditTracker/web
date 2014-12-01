/**
 * @jsx React.DOM
 */
'use strict';

var React            = require('react/addons');
var Reflux           = require('reflux');
var _                = require('underscore');
var $                = require('jquery');
var Navigation       = require('react-router').Navigation;

var UserActions      = require('../actions/UserActions');
var CurrentUserStore = require('../stores/CurrentUserStore');

var LoginPage = React.createClass({

  mixins: [React.addons.LinkedStateMixin, Reflux.ListenerMixin, Navigation],

  getInitialState: function() {
    return {
      username: '',
      password: '',
      submitDisabled: true,
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
      password: this.state.password
    };

    evt.stopPropagation();
    evt.preventDefault();

    this.setState({ error: null }, function() {
      UserActions.login(user, function(err) {
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

        <form id="login-form" className="island" onSubmit={this.handleSubmit}>
          <input type="text" id="username" valueLink={this.linkState('username')} placeholder="Username" required />
          <br />
          <input type="password" id="password" valueLink={this.linkState('password')} placeholder="Password" required />
          <br />
          <div className="error">{this.state.error}</div>
          <br />
          <input type="submit" value="Login" disabled={this.state.submitDisabled ? 'true' : ''} />
        </form>

      </section>
    );
  }

});

module.exports = React.createFactory(LoginPage);