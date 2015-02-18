/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');

var FeatureCard = React.createClass({

  propTypes: {
    header: React.PropTypes.string.isRequired,
    buttonText: React.PropTypes.string,
    buttonUrl: React.PropTypes.string,
    backgroundImage: React.PropTypes.string,
    className: React.PropTypes.string
  },

  render: function() {
    var backgroundStyles = {
      'backgroundImage': this.props.backgroundImage ? 'url(' + this.props.backgroundImage + ')' : null
    };
    var classes = 'feature-card ' + this.props.className;

    return (
      <div className={classes}>
        <div className="background" style={backgroundStyles}>
            <div className="scrim" />
        </div>
        <div className="inner">
          <h3 className="header">{this.props.header}</h3>
          <div className="go">
            <a href={this.props.buttonUrl} className="button">{this.props.buttonText}</a>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = React.createFactory(FeatureCard);