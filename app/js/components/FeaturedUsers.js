/**
 * @jsx React.DOM
 */
'use strict';

var React              = require('react/addons');
var Reflux             = require('reflux');
var _                  = require('lodash');

var HomePageActions    = require('../actions/HomePageActions');
var FeaturedUsersStore = require('../stores/FeaturedUsersStore');
var User               = require('./User');

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
      this.setState({ featuredUsers: users });
    }
  },

  componentWillMount: function() {
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

module.exports = React.createFactory(FeaturedUsers);