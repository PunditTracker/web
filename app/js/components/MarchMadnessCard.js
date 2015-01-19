/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');

var MarchMadnessCard = React.createClass({

  propTypes: {
    className: React.PropTypes.string
  },

  render: function() {
    var classes = 'march-madness-card ' + this.props.className;

    return (
      <div className={classes}>

        <div className="background"><div className="scrim" /></div>

        <div className="pure-g card-grid">
          <div className="pure-u-1">
            <h2 className="header">Don't miss out on <br />the Madness.</h2>
            <h2 className="pick animated fade-in-up">
              <a href="#" className="button">Pick your bracket today</a>
            </h2>
          </div>
        </div>

        <div className="mm-logo"><img src="../images/march-madness.png" /></div>

      </div>
    );
  }

});

module.exports = React.createFactory(MarchMadnessCard);