'use strict';

import React                  from 'react/addons';
import ReactAsync             from 'react-async';
import Reflux                 from 'reflux';
import _                      from 'lodash';
import {Navigation}           from 'react-router';
import DocumentTitle          from 'react-document-title';

import APIUtils               from '../utils/APIUtils';
import GlobalActions          from '../actions/GlobalActions';
import ViewingPredictionStore from '../stores/ViewingPredictionStore';
import UserPredictionsStore   from '../stores/UserPredictionsStore';
import MasonryContainer       from '../components/MasonryContainer.jsx';
import Spinner                from '../components/Spinner.jsx';
import PredictionVotesChart   from '../components/PredictionVotesChart.jsx';
import PredictionCard         from '../components/PredictionCard.jsx';

var PredictionPage = React.createClass({

  mixins: [ReactAsync.Mixin, Reflux.ListenerMixin, Navigation],

  shouldUseCachedElements: false,
  cachedElements: null,

  propTypes: {
    currentUser: React.PropTypes.object
  },

  getInitialStateAsync: function(cb) {
    GlobalActions.loadPrediction(this.props.params.identifier, (err, prediction) => {
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
      this.setState({ prediction: prediction, error: null }, () => {
        GlobalActions.loadUserPredictions(this.state.prediction.creator, 12);
      });
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
      GlobalActions.loadUserPredictions(this.state.prediction.creator, 12);
    }
  },

  componentWillReceiveProps: function(nextProps) {
    let hasNewPrediction = this.props.params.identifier !== nextProps.params.identifier;

    if ( !nextProps.params.identifier ) {
      this.transitionTo('Home');
    } else if ( hasNewPrediction ) {
      this.setState({
        loading: true
      }, () => {
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
          <div className="pure-u-1-6 hard--bottom" />
          <div className="pure-u-2-3 hard--bottom">
            <div className="pure-g card-grid">
              <div className="pure-u-1">
                <PredictionCard prediction={this.state.prediction} className="single" />
              </div>
            </div>
          </div>
          <div className="pure-u-1-6 hard--bottom" />
        </div>
      );
    }
  },

  renderVisualization: function() {
    if ( !_.isEmpty(this.state.prediction) && !_.isEmpty(this.state.prediction.voteHistory) ) {
      return (
        <div className="container">
          <div className="visualization-container islet nudge-half--bottom">
            <h3 className="text-center">What have other users been saying?</h3>
            <PredictionVotesChart prediction={this.state.prediction} />
          </div>
        </div>
      );
    }
  },

  renderMorePredictionsHeader: function() {
    let firstName = this.state.prediction && this.state.prediction.creator ? this.state.prediction.creator.firstName : '';
    let lastName = this.state.prediction && this.state.prediction.creator ? this.state.prediction.creator.lastName : '';

    if ( this.state.loading || (this.state.userPredictions && this.state.userPredictions.length) ) {
      return (
        <h4 className="flush--top">More from {firstName} {lastName}</h4>
      );
    }
  },

  renderUserPredictions: function() {
    let element = null;

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

export default PredictionPage;