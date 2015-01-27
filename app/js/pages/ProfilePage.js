/**
 * @jsx React.DOM
 */
'use strict';

var React               = require('react/addons');
var Reflux              = require('reflux');
var Navigation          = require('react-router').Navigation;

var GlobalActions       = require('../actions/GlobalActions');
var ViewingProfileStore = require('../stores/ViewingProfileStore');
var DocumentTitle       = require('../components/DocumentTitle');
var PredictionCard      = require('../components/PredictionCard');

var ProfilePage = React.createClass({

  mixins: [Reflux.ListenerMixin, Navigation],

  propTypes: {
    currentUser: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      profile: {},
      error: null
    };
  },

  _onProfileChange: function(err, profile) {
    if ( err ) {
      this.setState({ error: err });
    } else {
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

  render: function() {
    return (
      <section className="content no-hero profile">

        <DocumentTitle title={this.state.profile.firstName + ' ' + this.state.profile.lastName} />

        <div className="container card-grid">
          <div className="sidebar left">
            <div className="inner">
              <div className="user-info">
                <img src={this.state.profile.avatarUrl} />
                <div className="text dark">
                  <h1 className="h3">Joseph Pundit</h1>
                  <h5>ABC: This Week</h5>
                </div>
                <div className="text">
                  <p>George Will is a syndicated columnist for The Washington Post and contributing analyst with ABC News.</p>
                </div>
                <div className="pure-g stats">
                  <div className="pure-u-1-3">
                    <h6>Predictions</h6>
                    <h4>15</h4>
                  </div>
                  <div className="pure-u-1-3">
                    <h6>Correct</h6>
                    <h4>10</h4>
                  </div>
                  <div className="pure-u-1-3">
                    <h6>Wrong</h6>
                    <h4>5</h4>
                  </div>
                </div>
                <div className="pure-g stats">
                  <div className="pure-u-1-3">
                    <h6>Hit Rate</h6>
                    <h4>66.66%</h4>
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
                <div className="pure-g stats">
                  <div className="pure-u-1-1 since">
                    <h6>Predicting Since</h6>
                    <h4>January 2011</h4>
                    <UserGrade user={this.state.profile} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="content-with-sidebar right">
            <div className="pure-g card-grid">
              <div className="pure-u-1-2">
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><PredictionCard prediction={{}} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><PredictionCard className="tall-2" prediction={{}} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><PredictionCard prediction={{}} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><PredictionCard prediction={{}} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><PredictionCard className="tall-3-2" prediction={{}} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><PredictionCard prediction={{}} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><PredictionCard prediction={{}} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><PredictionCard className="tall-3-2" prediction={{}} /></div>
                </div>
              </div>
              <div className="pure-u-1-2">
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><PredictionCard className="tall-3-2" prediction={{}} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><PredictionCard prediction={{}} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><PredictionCard prediction={{}} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><PredictionCard className="tall-3-2" prediction={{}} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><PredictionCard prediction={{}} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><PredictionCard className="tall-2" prediction={{}} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><PredictionCard prediction={{}} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><PredictionCard prediction={{}} /></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>
    );
  }

});

module.exports = React.createFactory(ProfilePage);