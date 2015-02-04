/**
 * @jsx React.DOM
 */
'use strict';

var React     = require('react/addons');
var cx        = React.addons.classSet;
var validator = require('email-validator');

var MarchMadnessCard = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  propTypes: {
    className: React.PropTypes.string
  },

  getInitialState: function() {
    return {
      email: '',
      isValidEmail: false
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
      console.log('handle submit:', this.state.email);
    }
  },

  render: function() {
    var classes = 'march-madness-card ' + this.props.className;
    var inputClasses = cx({
      'email': true,
      'with-text': this.state.isValidEmail
    });

    return (
      <div className={classes}>

        <div className="background"><div className="scrim" /></div>

        <div className="pure-g card-grid">
          <div className="pure-u-1">
            <h2 className="header">Don't miss out on <br />the Madness.</h2>
            <form className="pick" onSubmit={this.handleSubmit}>
                <h2 className="h1">Sign up for updates.</h2>
                <h4 className="fade-in-up animated">
                    <input className={inputClasses} type="text" placeholder="Email address" valueLink={this.linkState('email')} />
                    <input type="submit" className="button white-inverse" value="Go" />
                </h4>
            </form>
          </div>
        </div>

        <div className="mm-logo"><img src="../images/march-madness.png" /></div>

      </div>
    );
  }

});

module.exports = React.createFactory(MarchMadnessCard);