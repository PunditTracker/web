'use strict';

var React              = require('react/addons');
var ReactAsync         = require('react-async');
var Reflux             = require('reflux');
var _                  = require('lodash');

var HomePageActions    = require('../actions/HomePageActions');
var FeaturedUsersStore = require('../stores/FeaturedUsersStore');
var User               = require('./User.jsx');

var FeaturedUsers = React.createClass({

  mixins: [ReactAsync.Mixin, Reflux.ListenerMixin],

  propTypes: {
    category: React.PropTypes.string
  },

  getInitialStateAsync: function(cb) {
    HomePageActions.loadFeaturedUsers(function(err, users) {
      cb(null, {
        error: null,
        users: users || []
      });
    });
  },

  _onFeaturedUsersChange: function(err, users) {
    if ( err ) {
      this.setState({ error: err });
    } else {
      console.log('users change:', users);
      this.setState({ featuredUsers: users, error: null });
    }
  },

  componentDidMount: function() {
    HomePageActions.loadFeaturedUsers(this._onFeaturedUsersChange);
    this.listenTo(FeaturedUsersStore, this._onFeaturedUsersChange);
  },

  renderUsers: function() {
    return _.map(this.state.featuredUsers, function(user, index) {
      return (
        <User user={user} tag="li" key={index} />
      );
    });
  },

  render: function() {
    return (
      <div className="list-card featured-users">

        <div className="title-wrapper">
            <h2 className="title">Featured Users</h2>
        </div>

        <ul>
          {this.renderUsers()}
        </ul>

      </div>
    );
  }

});

module.exports = FeaturedUsers;