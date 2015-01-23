/**
 * @jsx React.DOM
 */
'use strict';

var React              = require('react/addons');
var Reflux             = require('reflux');
var _                  = require('lodash');

var HomePageActions    = require('../actions/HomePageActions');
var PredictionSetStore = require('../stores/PredictionSetStore');
var PredictionCard     = require('./PredictionCard');

var PredictionSet = React.createClass({

  mixins: [Reflux.ListenerMixin],

  propTypes: {
    category: React.PropTypes.string.isRequired
  },

  getInitialState: function() {
    return {
      predictions: []
    };
  },

  _onPredictionSetChange: function(err, predictions) {
    if ( err ) {
      this.setState({ error: err });
    } else {
      this.setState({ predictions: predictions, error: null });
    }
  },

  componentDidMount: function() {
    HomePageActions.loadPredictionSet(this.props.category, this._onPredictionSetChange);
    this.listenTo(PredictionSetStore, this._onPredictionSetChange);
  },

  renderPredictions: function() {
    var classes = 'pur-u-1-3';

    return _.map(this.state.predictions, function(prediction, index) {
      return (
        <PredictionCard className={classes} prediction={prediction} key={index} />
      );
    });
  },

  render: function() {
    return (
      <div className="prediction-set-card">

          <div className="background"><div className="scrim" /></div>

          <h3 className="question">The latest {this.props.category} predictions</h3>

          <div className="pure-g card-grid">
            {this.renderPredictions()}
          </div>

      </div>
    );
  }

});

module.exports = React.createFactory(PredictionSet);