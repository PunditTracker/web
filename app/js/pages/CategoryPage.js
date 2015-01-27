/**
 * @jsx React.DOM
 */
'use strict';

var React                = require('react/addons');
var Reflux               = require('reflux');
var Navigation           = React.createFactory(require('react-router').Navigation);

var GlobalActions        = require('../actions/GlobalActions');
var ViewingCategoryStore = require('../stores/ViewingCategoryStore');
var DocumentTitle        = require('../components/DocumentTitle');
var PredictionCard       = require('../components/PredictionCard');

var CategoryPage = React.createClass({

  mixins: [Reflux.ListenerMixin, Navigation],

  getInitialState: function() {
    return {
      predictions: [],
      error: null
    };
  },

  _onPredictionsChange: function(err, predictions) {
    if ( err ) {
      this.setState({ error: err });
    } else {
      this.setState({ predictions: predictions || [], error: null });
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if ( !this.props.params.category ) {
      this.transitionTo('Home');
    } else if ( this.props.params.category !== nextProps.params.category ) {
      GlobalActions.loadCategory(nextProps.params.category, this._onPredictionsChange);
      this.listenTo(ViewingCategoryStore, this._onPredictionsChange);
    }
  },

  componentDidMount: function() {
    if ( !this.props.params.category ) {
      this.transitionTo('Home');
    } else {
      GlobalActions.loadCategory(this.props.params.category, this._onPredictionsChange);
      this.listenTo(ViewingCategoryStore, this._onPredictionsChange);
    }
  },

  render: function() {
    return (
      <section className="content no-hero category">

        <DocumentTitle title={this.props.params.category} />

        <div className="pure-g card-grid">
          <div className="pure-u-1-3">
            <PredictionCard currentUser={this.props.currentUser} prediction={this.state.predictions[0]} />
          </div>
          <div className="pure-u-1-3">
            <PredictionCard currentUser={this.props.currentUser} prediction={this.state.predictions[1]} />
          </div>
          <div className="pure-u-1-3">
            <PredictionCard currentUser={this.props.currentUser} prediction={this.state.predictions[2]} />
          </div>
        </div>

      </section>
    );
  }

});

module.exports = React.createFactory(CategoryPage);