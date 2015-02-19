/**
 * @jsx React.DOM
 */
'use strict';

var React            = require('react/addons');

var MarchMadnessCard = require('../components/MarchMadnessCard');
var FeatureCard      = require('../components/FeatureCard');

var Hero = React.createClass({

  propTypes: {
    featuredPrediction: React.PropTypes.object.isRequired,
    className: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      featuredPrediction: {},
      className: ''
    };
  },

  render: function() {
    var classes = 'hero ' + this.props.className;

    return (
      <div className={classes}>

        <div className="pure-g card-grid">
          <div className="pure-u-2-3">
            <FeatureCard className="left large"
                         header="Who's winning big at the Oscars?"
                         buttonText="Make Your Predictons"
                         buttonUrl="/oscars"
                         backgroundImage="../images/oscars_trophies.jpg" />
          </div>
          <div className="pure-u-1-3">
            <div className="pure-g card-grid">
              <div className="pure-u-1 hard--bottom">
                <FeatureCard className="right"
                             header="The Association is heating up"
                             buttonText="See Hot NBA Predictions"
                             buttonUrl="/sports"
                             backgroundImage="../images/nba.jpg" />
              </div>
            </div>
            <div className="pure-g card-grid">
              <div className="pure-u-1">
                <MarchMadnessCard className="feature-card right" />
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }

});

module.exports = React.createFactory(Hero);

// <div className="background" style={backgroundStyles} />

// <div className="pure-g full">
//   <div className="pure-u-1-2" />
//   <div className="pure-u-1-2 right full">
//     <PredictionCard className="featured" prediction={this.props.featuredPrediction} />
//   </div>
// </div>