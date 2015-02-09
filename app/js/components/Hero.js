/**
 * @jsx React.DOM
 */
'use strict';

var React            = require('react/addons');

var MarchMadnessCard = require('../components/MarchMadnessCard');
var SmallFeatureCard = require('../components/SmallFeatureCard');

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
            <MarchMadnessCard className="large-with-small-feature" />
          </div>
          <div className="pure-u-1-3">
            <div className="pure-g card-grid">
              <div className="pure-u-1 hard--bottom">
                <SmallFeatureCard feature={{ text: 'Draft smarter with Pundit Tracker', buttonText: 'Launch Draft Hub' }}
                                  backgroundImage="../images/draft.jpg" />
              </div>
            </div>
            <div className="pure-g card-grid">
              <div className="pure-u-1">
                <SmallFeatureCard feature={{ text: 'Take charge this playoff season', buttonText: 'View Predictions', buttonUrl: '/sports' }}
                                  backgroundImage="../images/playoffs.jpg" />
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