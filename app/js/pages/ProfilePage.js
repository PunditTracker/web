/**
 * @jsx React.DOM
 */
'use strict';

var React               = require('react/addons');
var Reflux              = require('reflux');
var moment              = require('moment');
var Navigation          = require('react-router').Navigation;

var GlobalActions       = require('../actions/GlobalActions');
var ViewingProfileStore = require('../stores/ViewingProfileStore');
var DocumentTitle       = require('../components/DocumentTitle');
var MasonryContainer    = require('../components/MasonryContainer');
var FixedSidebar        = require('../components/FixedSidebar');
var UserGrade           = require('../components/UserGrade');
var PredictionCard      = require('../components/PredictionCard');

var ProfilePage = React.createClass({

  mixins: [Reflux.ListenerMixin, Navigation],

  propTypes: {
    currentUser: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      currentUser: {}
    };
  },

  getInitialState: function() {
    return {
      profile: {
        firstName: '',
        lastName: '',
        predictionGraded: 0,
        predictionCorrect: 0,
        predictions: []
      },
      error: null
    };
  },

  _onProfileChange: function(err, profile) {
    if ( err ) {
      this.setState({ error: err });
    } else {
      profile = profile || {};
      profile.predictions = profile.predictions || [];
      console.log('profile:', profile);
      this.setState({ profile: profile, error: null });
    }
  },

  componentDidMount: function() {
    if ( !this.props.params.identifier ) {
      this.transitionTo('Home');
    } else {
      GlobalActions.loadProfile(this.props.params.identifier, this._onProfileChange);
      this.listenTo(ViewingProfileStore, this._onProfileChange);
    }
  },

  calculateHitRate: function() {
    var percentage = parseFloat(this.state.profile.predictionCorrect)/parseFloat(this.state.profile.predictionGraded || 1);

    return percentage.toFixed(2);
  },

  renderProfileImage: function() {
    var element;

    if ( this.state.profile.avatarURL ) {
      element = (
        <div className="profile-image" style={{ 'backgroundImage': 'url(' + this.state.profile.avatarURL + ')' }} />
      );
    }

    return element;
  },

  renderBio: function() {
    var element = null;

    if ( this.state.profile.bio && this.state.profile.bio.length ) {
      element = (
        <div className="text">
          <p>{this.state.profile.bio}</p>
        </div>
      );
    }

    return element;
  },

  renderSecondRowStats: function() {
    var element = null;

    if ( false ) {
      element = (
        <div className="pure-g stats">
          <div className="pure-u-1-3">
            <h6>Hit Rate</h6>
            <h4>{this.calculateHitRate()}%</h4>
          </div>
          <div className="pure-u-1-3">
            <h6>Yield</h6>
            <h4>$0.84</h4>
          </div>
          <div className="pure-u-1-3">
            <h6>Coolness</h6>
            <h4>Max</h4>
          </div>
        </div>
      );
    }

    return element;
  },

  render: function() {
    return (
      <section className="content no-hero profile">

        <DocumentTitle title={this.state.profile.firstName + ' ' + this.state.profile.lastName} />

        <div className="container card-grid">
          <FixedSidebar className="left">
            <div className="inner">
              <div className="user-info">
                {this.renderProfileImage()}
                <div className="text dark">
                  <h3>{this.state.profile.firstName + ' ' + this.state.profile.lastName}</h3>
                  <h5 className="flush">{this.state.profile.affiliation}</h5>
                </div>
                {this.renderBio()}
                <div className="pure-g stats">
                  <div className="pure-u-1-3">
                    <h6>Predictions</h6>
                    <h4>{this.state.profile.predictionGraded || 0}</h4>
                  </div>
                  <div className="pure-u-1-3">
                    <h6>Correct</h6>
                    <h4>{this.state.profile.predictionCorrect || 0}</h4>
                  </div>
                  <div className="pure-u-1-3">
                    <h6>Wrong</h6>
                    <h4>{this.state.profile.predictionGraded - this.state.profile.predictionCorrect}</h4>
                  </div>
                </div>
                {this.renderSecondRowStats()}
                <div className="pure-g stats">
                  <div className="pure-u-1-1 since">
                    <h6>Predicting Since</h6>
                    <h4>{moment(this.state.profile.created).format('MMMM YYYY')}</h4>
                    <UserGrade user={this.state.profile} />
                  </div>
                </div>
              </div>
            </div>
          </FixedSidebar>

          <div className="content-with-sidebar right">
            <MasonryContainer className="card-grid" columnWidth="50%">
              <div className="masonry-item w-1-2">
                <PredictionCard currentUser={this.props.currentUser} prediction={this.state.profile.predictions[0]} />
              </div>
              <div className="masonry-item w-1-2">
                <PredictionCard currentUser={this.props.currentUser} prediction={this.state.profile.predictions[2]} />
              </div>
              <div className="masonry-item w-1-2">
                <PredictionCard currentUser={this.props.currentUser} prediction={this.state.profile.predictions[3]} />
              </div>
                <div className="masonry-item w-1-2">
                <PredictionCard currentUser={this.props.currentUser} className="tall-3-2" prediction={this.state.profile.predictions[4]} />
              </div>
              <div className="masonry-item w-1-2">
                <PredictionCard currentUser={this.props.currentUser} prediction={this.state.profile.predictions[5]} />
              </div>
              <div className="masonry-item w-1-2">
                <PredictionCard currentUser={this.props.currentUser} prediction={this.state.profile.predictions[6]} />
              </div>
              <div className="masonry-item w-1-2">
                <PredictionCard currentUser={this.props.currentUser} className="tall-3-2" prediction={this.state.profile.predictions[7]} />
              </div>
              <div className="masonry-item w-1-2">
                <PredictionCard currentUser={this.props.currentUser} className="tall-3-2" prediction={this.state.profile.predictions[8]} />
              </div>
                <div className="masonry-item w-1-2">
                  <PredictionCard currentUser={this.props.currentUser} prediction={this.state.profile.predictions[9]} />
                </div>
                <div className="masonry-item w-1-2">
                  <PredictionCard currentUser={this.props.currentUser} prediction={this.state.profile.predictions[10]} />
                </div>
                <div className="masonry-item w-1-2">
                  <PredictionCard currentUser={this.props.currentUser} className="tall-3-2" prediction={this.state.profile.predictions[11]} />
                </div>
                <div className="masonry-item w-1-2">
                  <PredictionCard currentUser={this.props.currentUser} prediction={this.state.profile.predictions[12]} />
                </div>
                <div className="masonry-item w-1-2">
                  <PredictionCard currentUser={this.props.currentUser} prediction={this.state.profile.predictions[14]} />
                </div>
                <div className="masonry-item w-1-2">
                  <PredictionCard currentUser={this.props.currentUser} prediction={this.state.profile.predictions[15]} />
                </div>
              </MasonryContainer>
            </div>
          </div>

      </section>
    );
  }

});

module.exports = React.createFactory(ProfilePage);