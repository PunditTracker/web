'use strict';

var React               = require('react/addons');
var ReactAsync          = require('react-async');
var Reflux              = require('reflux');
var _                   = require('lodash');
var Navigation          = require('react-router').Navigation;
var DocumentTitle       = require('react-document-title');

var APIUtils            = require('../utils/APIUtils');
var GlobalActions       = require('../actions/GlobalActions');
var ViewingProfileStore = require('../stores/ViewingProfileStore');
var MasonryContainer    = require('../components/MasonryContainer.jsx');
var FixedSidebar        = require('../components/FixedSidebar.jsx');
var ProfileCard         = require('../components/ProfileCard.jsx');
var PredictionCard      = require('../components/PredictionCard.jsx');

var ProfilePage = React.createClass({

  mixins: [ReactAsync.Mixin, Reflux.ListenerMixin, Navigation],

  propTypes: {
    currentUser: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      currentUser: {}
    };
  },

  getInitialStateAsync: function(cb) {
    GlobalActions.loadProfile(this.props.params.identifier, function(err, profile) {
      cb(null, {
        profile: profile || {},
        loading: false,
        error: null
      });
    });
  },

  _onProfileChange: function(err, profile) {
    if ( err ) {
      this.setState({ error: err.message });
    } else {
      profile = profile || {};
      profile.predictions = profile.predictions || [];
      this.setState({ profile: profile, error: null });
    }
  },

  componentDidMount: function() {
    if ( !this.props.params.identifier ) {
      this.transitionTo('Home');
    } else {
      this.listenTo(ViewingProfileStore, this._onProfileChange);
    }
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

    if ( this.state.profile.predictions && this.state.profile.predictions.length ) {
      element = _.map(this.state.profile.predictions, function(prediction, index) {
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
    } else if ( !this.state.loading ) {
      element = (
        <h3 className="text-center">This user has not made any predictions yet.</h3>
      );
    }

    return element;
  },

  render: function() {
    return (
      <DocumentTitle title={this.state.profile.firstName + ' ' + this.state.profile.lastName}>
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