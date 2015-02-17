/**
 * @jsx React.DOM
 */
'use strict';

var React     = require('react/addons');
var cx        = React.addons.classSet;
var validator = require('email-validator');

var APIUtils  = require('../utils/APIUtils');
var Spinner   = require('./Spinner');

var MarchMadnessCard = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  propTypes: {
    className: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      email: '',
      isValidEmail: false,
      loading: false,
      subscribed: false
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    if ( this.state.email !== prevState.email && this.isMounted() ) {
      this.setState({ isValidEmail: validator.validate(this.state.email) });
    }
  },

  handleSubmit: function(evt) {
    evt.preventDefault();

    if ( this.state.isValidEmail ) {
      this.setState({ loading: true });
      APIUtils.doPost('marchmadness/add', { email: this.state.email }).then(function() {
        this.setState({ loading: false, subscribed: true, error: null });
      }.bind(this)).catch(function(err) {
        this.setState({ loading: false, error: err.message });
      }.bind(this));
    }
  },

  renderInput: function() {
    var element = null;
    var inputClasses = cx({
      'email': true,
      'with-text': this.state.isValidEmail
    });

    if ( !this.state.subscribed ) {
      element = (
        <h4 className="fade-in-up animated">
          <input className={inputClasses} type="text" placeholder="Email address" valueLink={this.linkState('email')} />
          <button type="submit" className="button white-inverse">
            <Spinner loading={this.state.loading} />
            Go
          </button>
        </h4>
      );
    }

    return element;
  },

  render: function() {
    var classes = 'march-madness-card ' + this.props.className;

    return (
      <div className={classes}>

        <div className="background"><div className="scrim" /></div>

        <div className="pure-g card-grid">
          <div className="pure-u-1">
            <h2 className="header">Don't miss out on <br />the Madness.</h2>
            <form className="pick" onSubmit={this.handleSubmit}>
                <h2 className="h1">{this.state.subscribed ? 'You are signed up!' : 'Sign up for updates.'}</h2>
                {this.renderInput()}
            </form>
          </div>
        </div>

        <div className="mm-logo"><img src="../images/march_madness.png" /></div>

      </div>
    );
  }

});

module.exports = React.createFactory(MarchMadnessCard);