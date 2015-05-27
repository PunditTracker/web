'use strict';

var React                = require('react/addons');
var ReactAsync           = require('react-async');
var Reflux               = require('reflux');
var _                    = require('lodash');
var Navigation           = require('react-router').Navigation;
var DocumentTitle        = require('react-document-title');

var APIUtils             = require('../utils/APIUtils');
var GlobalActions        = require('../actions/GlobalActions');
var ViewingProfileStore  = require('../stores/ViewingProfileStore');
var UserPredictionsStore = require('../stores/UserPredictionsStore');
var MasonryContainer     = require('../components/MasonryContainer.jsx');
var FixedSidebar         = require('../components/FixedSidebar.jsx');
var ProfileCard          = require('../components/ProfileCard.jsx');
var PredictionCard       = require('../components/PredictionCard.jsx');
var Spinner              = require('../components/Spinner.jsx');

var ProfilePage = React.createClass({

  mixins: [ReactAsync.Mixin, Reflux.ListenerMixin, Navigation],

  shouldUseCachedElements: false,
  cachedElements: null,

  propTypes: {
    currentUser: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      currentUser: {}
    };
  },

  getInitialStateAsync: function(cb) {
    console.log('get initial state profile page');
    GlobalActions.loadProfile(this.props.params.identifier, (err, profile) => {
      cb(null, {
        profile: profile || {},
        predictions: [],
        loading: true,
        error: null
      });
    });
  },

  _onProfileChange: function(err, profile) {
    if ( err ) {
      this.setState({ loading: false, error: err.message });
    } else {
      this.setState({
        profile: profile || {},
        error: null
      }, () => {
        GlobalActions.loadUserPredictions(this.state.profile);
      });
    }
  },

  _onUserPredictionsChange: function(err, predictions) {
    if ( err ) {
      this.setState({ loading: false, error: err.message });
    } else {
      this.setState({
        loading: false,
        predictions: predictions,
        error: null
      });
    }
  },

  componentDidMount: function() {
    if ( !this.props.params.identifier ) {
      this.transitionTo('Home');
    } else {
      this.listenTo(ViewingProfileStore, this._onProfileChange);
      this.listenTo(UserPredictionsStore, this._onUserPredictionsChange);
      GlobalActions.loadUserPredictions(this.state.profile);
    }
  },

  componentDidUpdate: function(prevProps, prevState) {
    this.shouldUseCachedElements = _.isEqual(this.state.predictions, prevState.predictions);
  },

  calculateHitRate: function() {
    var percentage = parseFloat(this.state.profile.predictionsCorrect)/parseFloat(this.state.profile.predictionsGraded || 1);

    return percentage.toFixed(2);
  },

  renderProfileImage: function() {
    var element;

    if ( this.state.profile.avatarUrl ) {
      element = (
        <div className="profile-image" style={{ 'backgroundImage': 'url(' + this.state.profile.avatarUrl + ')' }} />
      );
    }

    return element;
  },

  renderUserPredictions: function() {
    var randomInt;
    var classes;
    var element = null;

    if ( this.state.loading ) {
      element = (
        <div className="text-center island">
          <Spinner loading={this.state.loading} size={75} />
        </div>
      );
    } else if ( this.shouldUseCachedElements && this.cachedElements ) {
      // Use cached version of result elements to prevent masonry flashing on any update
      element = this.cachedElements;
    } else if ( this.state.predictions && this.state.predictions.length ) {
      element = _.map(this.state.predictions, function(prediction, index) {
        randomInt = APIUtils.randomIntFromInterval(1, 3);

        if ( randomInt === 3 ) {
          classes = 'tall-3-2';
        } else {
          classes = null;
        }

        return (
          <div className="masonry-item w-1-2" key={index}>
            <PredictionCard currentUser={this.props.currentUser}
                            prediction={prediction}
                            className={classes}
                            renderGrade={false} />
          </div>
        );
      }.bind(this));

      this.cachedElements = element;
    } else {
      element = (
        <h3 className="text-center">This user has not made any predictions yet.</h3>
      );
    }

    return element;
  },

  render: function() {
    return (
      <DocumentTitle title={APIUtils.buildPageTitle(this.state.profile.firstName + ' ' + this.state.profile.lastName)}>
      <section className="content no-hero profile">

        <div className="container card-grid">
          <FixedSidebar className="left">
            <ProfileCard user={this.state.profile} usePlaceholders={false} />
          </FixedSidebar>

          <div className="content-with-sidebar right" style={{ 'minHeight': '610px' }}>
            <MasonryContainer className="card-grid" columnWidth="50%">
              {this.renderUserPredictions()}
            </MasonryContainer>
          </div>
        </div>

      </section>
      </DocumentTitle>
    );
  }

});

module.exports = ProfilePage;