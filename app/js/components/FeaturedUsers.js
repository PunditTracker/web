/**
 * @jsx React.DOM
 */
'use strict';

var React              = require('react/addons');
var Reflux             = require('reflux');
var _                  = require('underscore');

var HomePageActions    = require('../actions/HomePageActions');
var FeaturedUsersStore = require('../stores/FeaturedUsersStore');
var UserAvatar         = require('./UserAvatar');

var FeaturedUsers = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      featuredUsers: []
    };
  },

  _onFeaturedUsersChange: function(users) {
    if ( users ) {
      console.log('users change:', users);
      this.setState({
        featuredUsers: users
      });
    }
  },

  componentWillMount: function() {
    HomePageActions.loadFeaturedUsers(this._onFeaturedUsersChange);
    this.listenTo(FeaturedUsersStore, this._onFeaturedUsersChange);
  },

  renderUsers: function() {
    return _.map(this.state.featuredUsers, function(user, index) {
      return (
        <li key={index}>
          <div className="avatar-container">
            <UserAvatar user={user} />
          </div>
          <div className="user-container">
            <a className="user-name">{user.name}</a>
            <a className="user-organization">{user.organization}</a>
          </div>
          <div className="score-container">
            <h2 className="score">{user.score}</h2>
          </div>
        </li>
      );
    });
  },

  render: function() {
    return (
      <section className="featured-users">

        <h5 className="title">Featured Users</h5>

        <ul>
          {this.renderUsers()}
        </ul>

      </section>
    );
  }

});

module.exports = React.createFactory(FeaturedUsers);