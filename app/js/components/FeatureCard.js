/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');

var Link  = React.createFactory(require('react-router').Link);

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
          <h3 className="header">{this.props.feature.title}</h3>
          <div className="go">
            <Link to={this.props.feature.buttonUrl || '/'} className="button">{this.props.feature.buttonText}</Link>
          </div>
        </div>
      </div>
    );
  }

});

module.exports = React.createFactory(FeatureCard);