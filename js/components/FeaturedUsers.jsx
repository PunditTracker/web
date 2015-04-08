'use strict';

var React              = require('react/addons');
var Reflux             = require('reflux');
var _                  = require('lodash');

var HomePageActions    = require('../actions/HomePageActions');
var FeaturedUsersStore = require('../stores/FeaturedUsersStore');
var User               = require('./User.jsx');

var FeaturedUsers = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      error: null,
      users: []
    };
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

  componentWillUpdate: function(nextProps, nextState) {
    var hasNewProps = !_.isEqual(nextProps, this.props);
    var hasNewState = !_.isEqual(nextState, this.state);
    var hasUsers = !_.isEmpty(this.state.users);

    if ( (hasNewProps || hasNewState) && !hasUsers ) {
      HomePageActions.loadFeaturedUsers(this._onFeaturedUsersChange);
    }
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