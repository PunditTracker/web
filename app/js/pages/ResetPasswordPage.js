/**
 * @jsx React.DOM
 */
'use strict';

var React         = require('react/addons');
var _             = require('lodash');
var Link          = React.createFactory(require('react-router').Link);

var DocumentTitle = require('../components/DocumentTitle');
var AuthAPI       = require('../utils/AuthAPI');

var ResetPasswordPage = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      password: '',
      confirmPassword: '',
      formSubmitted: false,
      submitDisabled: true,
      loading: false,
      error: null
    };
  },

  componentDidMount: function() {
    if ( !this.props.params.userId ) {
      this.setState({ error: 'A valid user ID must be present in order to reset your password.' });
    } else if ( !this.props.params.resetKey ) {
      this.setState({ error: 'A valid reset key must be present in order to reset your password.' });
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    if ( !_.isEqual(this.state, prevState) && this.isMounted() ) {
      this.checkForm();
    }
  },

  checkForm: function() {
    var formIsValid = this.state.password.length && this.state.password === this.state.confirmPassword;

    this.setState({ submitDisabled: !formIsValid });
  },

  handleSubmit: function(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    this.setState({ error: null, loading: true });

    AuthAPI.resetPassword(this.props.params.userId, this.props.params.resetKey, this.state.password).then(function() {
      this.setState({ formSubmitted: true, error: null, loading: false });
    }.bind(this)).catch(function(err) {
      this.setState({ error: err.message || err, loading: false });
    }.bind(this));
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

  renderForm: function() {
    return (
      <form id="forgot-password-form" onSubmit={this.handleSubmit}>
        <input type="password"
               id="password"
               className="nudge-half--bottom block full-width"
               valueLink={this.linkState('password')}
               placeholder="New password"
               required />
        <input type="password"
               id="confirm-password"
               className="nudge-half--bottom block full-width"
               valueLink={this.linkState('confirmPassword')}
               placeholder="Confirm"
               required />
        {this.renderError()}
        <input type="submit"
               value="Reset Password"
               className="btn block full-width"
               disabled={this.state.submitDisabled || this.state.error ? 'true' : ''} />
      </form>
    );
  },

  renderSuccessMessage: function() {
    return (
      <div>
        <p className="nudge-half--bottom flush--top">Your password has been successfully reset!</p>
        <Link to="Home" className="btn block full-width text-center">Back to Home</Link>
      </div>
    );
  },

  render: function() {
    return (
      <section className="content no-hero reset">

        <DocumentTitle title="Reset Password" />

        <div className="container slim">
          <h4 className="text-center nudge-half--bottom flush--top">Reset your password</h4>
          {this.state.formSubmitted ? this.renderSuccessMessage() : this.renderForm()}
        </div>

      </section>
    );
  }

});

module.exports = React.createFactory(ResetPasswordPage);