/**
 * @jsx React.DOM
 */
'use strict';

var React         = require('react/addons');
var _             = require('lodash');
var Link          = React.createFactory(require('react-router').Link);
var validator     = require('email-validator');

var DocumentTitle = require('../components/DocumentTitle');
var AuthAPI       = require('../utils/AuthAPI');
var Spinner       = require('../components/Spinner');

var ForgotPasswordPage = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  getInitialState: function() {
    return {
      email: '',
      formSubmitted: false,
      loading: false,
      error: null,
      submitDisabled: true
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    if ( !_.isEqual(this.state, prevState) && this.isMounted() ) {
      this.setState({ submitDisabled: !validator.validate(this.state.email) });
    }
  },

  handleSubmit: function(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    this.setState({ error: null, loading: true });

    AuthAPI.forgotPassword(this.state.email).then(function() {
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
        <input type="text"
               id="email"
               className="nudge-half--bottom block full-width"
               valueLink={this.linkState('email')}
               placeholder="Email address"
               required />
        {this.renderError()}
        <button type="submit"
                className="btn block full-width"
                disabled={this.state.submitDisabled ? 'true' : ''}>
          <Spinner loading={this.state.loading} />
          Send Reset Email
        </button>
      </form>
    );
  },

  renderSuccessMessage: function() {
    return (
      <div>
        <p className="nudge-half--bottom flush--top">An email has been sent to the address associated with your username. It will contain instructions on resetting your password.</p>
        <Link to="Home" className="btn block full-width text-center">Back to Home</Link>
      </div>
    );
  },

  render: function() {
    return (
      <section className="content no-hero forgot">

        <DocumentTitle title="Forgot Password" />

        <div className="container slim">
          <h4 className="text-center nudge-half--bottom flush--top">Forget your password?</h4>
          {this.state.formSubmitted ? this.renderSuccessMessage() : this.renderForm()}
        </div>

      </section>
    );
  }

});

module.exports = React.createFactory(ForgotPasswordPage);