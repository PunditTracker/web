/**
 * @jsx React.DOM
 */
'use strict';

var React                = require('react/addons');
var Reflux               = require('reflux');
var _                    = require('lodash');
var Navigation           = React.createFactory(require('react-router').Navigation);

var APIUtils             = require('../utils/APIUtils');
var GlobalActions        = require('../actions/GlobalActions');
var ViewingCategoryStore = require('../stores/ViewingCategoryStore');
var DocumentTitle        = require('../components/DocumentTitle');
var MasonryContainer     = require('../components/MasonryContainer');
var PredictionCard       = require('../components/PredictionCard');

var CategoryPage = React.createClass({

  mixins: [Reflux.ListenerMixin, Navigation],

  getInitialState: function() {
    return {
      title: APIUtils.titleCase(this.props.params.category),
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
      this.setState({ title: APIUtils.titleCase(nextProps.params.category) });
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

  renderFeaturedPredictions: function() {
    return _.map(this.state.featuredPredictions, function(prediction, index) {
      return (
        <PredictionCard className="pur-u-1-3" prediction={prediction} key={index} />
      );
    });
  },

  render: function() {
    var featuredStyles = {
      'backgroundImage': null
    };

    return (
      <section className="content no-hero category">

        <DocumentTitle title={this.state.title} />

        <div className="pure-g card-grid">
          <div className="pure-u-1 full-width-outer flush--bottom">
            <div className="prediction-set-card" style={featuredStyles}>
              <div className="background"><div className="scrim" /></div>
              <h3 className="question">Featured {this.state.title} Predictions</h3>
              <div className="pure-g card-grid">
                {this.renderFeaturedPredictions()}
              </div>
            </div>
          </div>
        </div>

        <MasonryContainer className="card-grid">
          <div className="masonry-item w-1-3">
            <PredictionCard currentUser={this.props.currentUser} prediction={this.state.predictions[0]} />
          </div>
          <div className="masonry-item w-1-3">
            <PredictionCard currentUser={this.props.currentUser} prediction={this.state.predictions[1]} />
          </div>
          <div className="masonry-item w-1-3">
            <PredictionCard currentUser={this.props.currentUser} prediction={this.state.predictions[2]} />
          </div>
          <div className="masonry-item w-1-3">
            <PredictionCard className="tall-3-2" currentUser={this.props.currentUser} prediction={this.state.predictions[3]} />
          </div>
          <div className="masonry-item w-2-3">
            <PredictionCard currentUser={this.props.currentUser} prediction={this.state.predictions[4]} />
          </div>
          <div className="masonry-item w-2-3">
            <PredictionCard currentUser={this.props.currentUser} prediction={this.state.predictions[5]} />
          </div>
          <div className="masonry-item w-1-3">
            <PredictionCard currentUser={this.props.currentUser} prediction={this.state.predictions[6]} />
          </div>
          <div className="masonry-item w-1-3">
            <PredictionCard currentUser={this.props.currentUser} prediction={this.state.predictions[7]} />
          </div>
          <div className="masonry-item w-1-3">
            <PredictionCard currentUser={this.props.currentUser} prediction={this.state.predictions[8]} />
          </div>
        </MasonryContainer>

      </section>
    );
  }

});

module.exports = React.createFactory(CategoryPage);