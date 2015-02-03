/**
 * @jsx React.DOM
 */
'use strict';

var React            = require('react/addons');
var Reflux           = require('reflux');
var _                = require('lodash');
var RouteHandler     = React.createFactory(require('react-router').RouteHandler);

var UserActions      = require('./actions/UserActions');
var CurrentUserStore = require('./stores/CurrentUserStore');
var Header           = require('./components/Header');
var Footer           = require('./components/Footer');

var App = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      currentUser: {}
    };
  },

  _onUserChange: function(err, user) {
    if ( err ) {
      this.setState({ error: err.message });
    } else {
      this.setState({ currentUser: user || {} });
    }
  },

  componentDidMount: function() {
    if ( !_.isEmpty(CurrentUserStore.user) ) {
      this._onUserChange(null, CurrentUserStore.user);
    } else {
      UserActions.check(this._onUserChange);
    }

    this.listenTo(CurrentUserStore, this._onUserChange);
  },

  render: function() {
    return (
      <div>

        <Header currentUser={this.state.currentUser} />

        <RouteHandler params={this.props.params}
                      query={this.props.query}
                      currentUser={this.state.currentUser} />

        <Footer />

      </div>
    );
  }

});

module.exports = React.createFactory(App);