/**
 * @jsx React.DOM
 */
'use strict';

var React             = require('react/addons');
var Reflux            = require('reflux');
var _                 = require('lodash');

var HomePageActions   = require('../actions/HomePageActions');
var HeroFeaturesStore = require('../stores/HeroFeaturesStore');
var FeatureCard       = require('../components/FeatureCard');
var MarchMadnessCard  = require('../components/MarchMadnessCard');

var Hero = React.createClass({

  mixins: [Reflux.ListenerMixin],

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

  getInitialState: function() {
    return {
      features: []
    };
  },

  _onFeaturesChange: function(err, features) {
    if ( err ) {
      this.setState({ error: err.message });
    } else {
      this.setState({ features: features || [], error: null });
    }
  },

  componentDidMount: function() {
    HomePageActions.loadHeroFeatures(this._onFeaturesChange);
    this.listenTo(HeroFeaturesStore, this._onFeaturesChange);
  },

  getFeatureAtLocation: function(locationNum) {
    return _.find(this.state.features, function(feature) {
      return feature.locationNum === locationNum;
    });
  },

  render: function() {
    var classes = 'hero ' + this.props.className;

    return (
      <div className={classes}>

        <div className="pure-g card-grid">
          <div className="pure-u-2-3">
            <FeatureCard className="left large" feature={this.getFeatureAtLocation(1)} />
          </div>
          <div className="pure-u-1-3">
            <div className="pure-g card-grid">
              <div className="pure-u-1 hard--bottom">
                <FeatureCard className="right" feature={this.getFeatureAtLocation(2)} />
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