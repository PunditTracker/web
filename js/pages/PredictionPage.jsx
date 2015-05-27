'use strict';

var React                       = require('react/addons');
var ReactAsync                  = require('react-async');
var Reflux                      = require('reflux');
var _                           = require('lodash');
var Navigation                  = require('react-router').Navigation;
var DocumentTitle               = require('react-document-title');

var APIUtils                    = require('../utils/APIUtils');
var GlobalActions               = require('../actions/GlobalActions');
var ViewingPredictionStore      = require('../stores/ViewingPredictionStore');
var UserPredictionsStore        = require('../stores/UserPredictionsStore');
var MasonryContainer            = require('../components/MasonryContainer.jsx');
var Spinner                     = require('../components/Spinner.jsx');
var PredictionDataVisualization = require('../components/PredictionDataVisualization.jsx');
var PredictionCard              = require('../components/PredictionCard.jsx');

var PredictionPage = React.createClass({

  mixins: [ReactAsync.Mixin, Reflux.ListenerMixin, Navigation],

  shouldUseCachedElements: false,
  cachedElements: null,

  propTypes: {
    currentUser: React.PropTypes.object
  },

  getInitialStateAsync: function(cb) {
    GlobalActions.loadPrediction(this.props.params.identifier, function(err, prediction) {
      cb(null, {
        loading: true,
        prediction: prediction,
        userPredictions: [],
        error: null
      });
    });
  },

  _onPredictionChange: function(err, prediction) {
    if ( err ) {
      this.setState({ error: err });
    } else {
      this.setState({ prediction: prediction, error: null }, function() {
        GlobalActions.loadUserPredictions(this.state.prediction.creator);
      }.bind(this));
    }
  },

  _onUserPredictionsChange: function(err, predictions) {
    if ( err ) {
      this.setState({ loading: false, error: err.message });
    } else {
      this.setState({
        loading: false,
        error: null,
        userPredictions: predictions
      });
    }
  },

  componentDidMount: function() {
    if ( !this.props.params.identifier ) {
      this.transitionTo('Home');
    } else {
      this.listenTo(ViewingPredictionStore, this._onPredictionChange);
      this.listenTo(UserPredictionsStore, this._onUserPredictionsChange);
      GlobalActions.loadUserPredictions(this.state.prediction.creator);
    }
  },

  componentWillReceiveProps: function(nextProps) {
    var hasNewPrediction = this.props.params.identifier !== nextProps.params.identifier;

    if ( !nextProps.params.identifier ) {
      this.transitionTo('Home');
    } else if ( hasNewPrediction ) {
      this.setState({
        loading: true
      }, function() {
        GlobalActions.loadPrediction(nextProps.params.identifier);
      });
    }
  },

  componentDidUpdate: function(prevState) {
    this.shouldUseCachedElements = _.isEqual(this.state.userPredictions, prevState.userPredictions);
  },

  renderPrediction: function() {
    if ( !_.isEmpty(this.state.prediction) ) {
      return (
        <div className="pure-g card-grid flush--bottom">
          <div className="pure-u-1-6" />
          <div className="pure-u-2-3">
            <div className="pure-g card-grid">
              <div className="pure-u-1">
                <PredictionCard prediction={this.state.prediction} className="single" />
              </div>
            </div>
          </div>
          <div className="pure-u-1-6" />
        </div>
      );
    }
  },

  renderVisualization: function() {
    if ( !_.isEmpty(this.state.prediction) && !_.isEmpty(this.state.prediction.voteHistory) ) {
      return (
        <div className="container">
          <div className="visualization-container islet nudge-half--bottom">
            <PredictionDataVisualization prediction={this.state.prediction} />
          </div>
        </div>
      );
    }
  },

  renderMorePredictionsHeader: function() {
    var firstName = this.state.prediction && this.state.prediction.creator ? this.state.prediction.creator.firstName : '';
    var lastName = this.state.prediction && this.state.prediction.creator ? this.state.prediction.creator.lastName : '';

    if ( this.state.loading || (this.state.userPredictions && this.state.userPredictions.length) ) {
      return (
        <h4>More from {firstName} {lastName}</h4>
      );
    }
  },

  renderUserPredictions: function() {
    var element = null;

    if ( this.state.loading ) {
      return (
        <div className="island text-center">
          <Spinner loading={this.state.loading} size={75} />
        </div>
      );
    } else if ( this.shouldUseCachedElements && this.cachedElements ) {
      // Use cached version of result elements to prevent masonry flashing on any update
      element = this.cachedElements;
    } else if ( this.state.userPredictions && this.state.userPredictions.length ) {
      element = (
        <MasonryContainer className="card-grid">
          {
            _.map(this.state.userPredictions, function(prediction, index) {
              return (
                <div className="masonry-item w-1-3" key={index}>
                  <PredictionCard currentUser={this.props.currentUser}
                                  prediction={prediction}
                                  renderGrade={false} />
                </div>
              );
            }.bind(this))
          }
        </MasonryContainer>
      );
    }

    this.cachedElements = element;

    return element;
  },

  render: function() {
    return (
      <DocumentTitle title={APIUtils.buildPageTitle(this.state.prediction.title)}>
      <section className="content no-hero prediction">

        {this.renderPrediction()}

        {this.renderVisualization()}

        <div className="container">
          {this.renderMorePredictionsHeader()}
          {this.renderUserPredictions()}
        </div>

      </section>
      </DocumentTitle>
    );
  }

});

module.exports = PredictionPage;