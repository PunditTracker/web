/**
 * @jsx React.DOM
 */
'use strict';

var React      = require('react/addons');
var _          = require('underscore');
var $          = require('jquery');
var Navigation = require('react-router').Navigation;

var AuthAPI    = require('../utils/AuthAPI');

var RegisterPage = React.createClass({

  mixins: [React.addons.LinkedStateMixin, Navigation],

  getInitialState: function() {
    return {
      username: '',
      firstName: '',
      lastName: '',
      avatarUrl: '',
      password: '',
      submitDisabled: true,
      error: null
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    if ( !_.isEqual(this.state, prevState) ) {
      this.checkForm();
    }
  },

  checkForm: function() {
    var $form = $('#register-form');
    var formIsValid = !$form.checkValidity || $form.checkValidity();

    if ( formIsValid ) {
      this.setState({ submitDisabled: false });
    } else {
      this.setState({ submitDisabled: true });
    }
  },

  handleSubmit: function(evt) {
    var user = {
      Username: this.state.username,
      FirstName: this.state.firstName,
      LastName: this.state.LastName,
      Avatar_URL: this.state.avatarUrl,
      Password: this.state.password
    };

    evt.stopPropagation();
    evt.preventDefault();

    AuthAPI.register(user).then(function() {
      this.transitionTo('Login');
    }.bind(this)).catch(function(err) {
      this.setState({ error: err });
    }.bind(this));
  },

  render: function() {
    return (
      <section className="register-page">

        <form id="register-form" className="island" onSubmit={this.handleSubmit}>
          <input type="text" id="username" valueLink={this.linkState('username')} placeholder="Username" required />
          <br />
          <input type="text" id="firstName" valueLink={this.linkState('firstName')} placeholder="First Name" required />
          <br />
          <input type="text" id="lastName" valueLink={this.linkState('lastName')} placeholder="Last Name" required />
          <br />
          <input type="text" id="avatarUrl" valueLink={this.linkState('avatarUrl')} placeholder="Avatar URL (optional)" />
          <br />
          <input type="password" id="password" valueLink={this.linkState('password')} placeholder="Password" required />
          <br />
          <div className="error">{this.state.error}</div>
          <br />
          <input type="submit" value="Register" disabled={this.state.submitDisabled ? 'true' : ''} />
        </form>

      </section>
    );
  }

});

module.exports = React.createFactory(RegisterPage);