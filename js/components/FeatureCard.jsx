'use strict';

var React = require('react/addons');
var Link  = require('react-router').Link;

var FeatureCard = React.createClass({

  propTypes: {
    feature: React.PropTypes.object.isRequired,
    className: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      feature: {
        title: '',
        buttonText: '',
        buttonUrl: '',
        imageUrl: ''
      },
      className: ''
    };
  },

  renderTitle: function() {
    var element = null;

    if ( this.props.feature.title && this.props.feature.title.length ) {
      element = (
        <h3 className="header">{this.props.feature.title}</h3>
      );
    }

    return element;
  },

  renderButton: function() {
    var hasButtonUrl = this.props.feature.buttonUrl && this.props.feature.buttonUrl.length;
    var hasButtonText = this.props.feature.buttonText && this.props.feature.buttonText.length;
    var buttonText = hasButtonText ? this.props.feature.buttonText : 'Go';
    var element = null;

    if ( hasButtonUrl ) {
      element = (
        <Link to={this.props.feature.buttonUrl} className="button">{buttonText}</Link>
      );
    }

    return element;
  },

  render: function() {
    var backgroundStyles = {
      'backgroundImage': this.props.feature.imageUrl ? 'url(' + this.props.feature.imageUrl + ')' : null
    };
    var classes = 'feature-card ' + this.props.className;

    return (
      <div className={classes}>
        <div className="background" style={backgroundStyles}>
            <div className="scrim" />
        </div>
        <div className="inner">
          {this.renderTitle()}
          <div className="go">
            {this.renderButton()}
          </div>
        </div>
      </div>
    );
  }

});

module.exports = FeatureCard;