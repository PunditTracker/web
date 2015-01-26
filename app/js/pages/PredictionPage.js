/**
 * @jsx React.DOM
 */
'use strict';

var React                  = require('react/addons');
var Reflux                 = require('reflux');
var Navigation             = require('react-router').Navigation;

var GlobalActions          = require('../actions/GlobalActions');
var ViewingPredictionStore = require('../stores/ViewingPredictionStore');
var DocumentTitle          = require('../components/DocumentTitle');

var PredictionPage = React.createClass({

  mixins: [Reflux.ListenerMixin, Navigation],

  propTypes: {
    currentUser: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      prediction: {},
      error: null
    };
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
      GlobalActions.loadPrediction(this.props.params.identifier, this._onPredictionChange);
      this.listenTo(ViewingPredictionStore, this._onPredictionChange);
    }
  },

  render: function() {
    return (
      <section className="content no-hero prediction">

        <DocumentTitle title={this.state.prediction.title} />

        prediction page

      </section>
    );
  }

});

module.exports = React.createFactory(PredictionPage);