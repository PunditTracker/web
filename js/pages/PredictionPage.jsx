'use strict';

var React                  = require('react/addons');
var ReactAsync             = require('react-async');
var Reflux                 = require('reflux');
var Navigation             = require('react-router').Navigation;
var DocumentTitle          = require('react-document-title');

var APIUtils               = require('../utils/APIUtils');
var GlobalActions          = require('../actions/GlobalActions');
var ViewingPredictionStore = require('../stores/ViewingPredictionStore');

var PredictionPage = React.createClass({

  mixins: [ReactAsync.Mixin, Reflux.ListenerMixin, Navigation],

  propTypes: {
    currentUser: React.PropTypes.object
  },

  getInitialStateAsync: function(cb) {
    GlobalActions.loadPrediction(this.props.params.identifier, function(err, prediction) {
      cb(null, {
        prediction: prediction,
        error: null
      });
    });
  },

  _onPredictionChange: function(err, prediction) {
    if ( err ) {
      this.setState({ error: err });
    } else {
      this.setState({ prediction: prediction, error: null });
    }
  },

  componentDidMount: function() {
    if ( !this.props.params.identifier ) {
      this.transitionTo('Home');
    } else {
      this.listenTo(ViewingPredictionStore, this._onPredictionChange);
    }
  },

  render: function() {
    return (
      <DocumentTitle title={APIUtils.buildPageTitle(this.state.prediction.title)}>
      <section className="content no-hero prediction">

        prediction page

      </section>
      </DocumentTitle>
    );
  }

});

module.exports = PredictionPage;