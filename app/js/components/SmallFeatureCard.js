/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');

var SmallFeatureCard = React.createClass({

  propTypes: {
    feature: React.PropTypes.object.isRequired,
    backgroundImage: React.PropTypes.string
  },

  render: function() {
    var backgroundStyles = {
      'backgroundImage': this.props.backgroundImage ? 'url(' + this.props.backgroundImage + ')' : null
    };

    return (
      <div className="small-feature-card">
        <div className="background" style={backgroundStyles}>
            <div className="scrim" />
        </div>
        <div className="inner">
          <h3 className="header">{this.props.feature.text}</h3>
          <div className="go">
            <a href={this.props.feature.buttonUrl} className="button">{this.props.feature.buttonText}</a>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = React.createFactory(SmallFeatureCard);