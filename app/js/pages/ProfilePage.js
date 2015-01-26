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

        profile page

      </section>
    );
  }

});

module.exports = React.createFactory(ProfilePage);