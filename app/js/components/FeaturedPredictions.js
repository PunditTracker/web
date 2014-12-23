/**
 * @jsx React.DOM
 */
'use strict';

var React                    = require('react/addons');
var Reflux                   = require('reflux');
var _                        = require('lodash');

var HomePageActions          = require('../actions/HomePageActions');
var FeaturedPredictionsStore = require('../stores/FeaturedPredictionsStore');
var PredictionCard           = require('./PredictionCard');

var FeaturedPredictions = React.createClass({

  mixins: [Reflux.ListenerMixin],

  propTypes: {
    subcategory: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      subcategory: null
    };
  },

  getInitialState: function() {
    return {
      featuredPredictions: []
    };
  },

  _onFeaturedPredictionsChange: function(predictions) {
    if ( predictions ) {
      console.log('predictions change:', predictions);
      this.setState({
        featuredPredictions: predictions
      });
    }
  },

  componentWillMount: function() {
    HomePageActions.loadFeaturedPredictions(this.props.subcategory, this._onFeaturedPredictionsChange);
    this.listenTo(FeaturedPredictionsStore, this._onFeaturedPredictionsChange);
  },

  renderFeaturedPredictions: function() {
    return _.map(this.state.featuredPredictions, function(prediction, index) {
      return (
        <PredictionCard prediction={prediction} key={index} />
      );
    });
  },

  render: function() {
    return (
      <section className="featured-predictions">

        {this.renderFeaturedPredictions()}

      </section>
    );
  }

});

module.exports = React.createFactory(FeaturedPredictions);