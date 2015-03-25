'use strict';

var React            = require('react/addons');
var ReactAsync       = require('react-async');
var Preloaded        = ReactAsync.Preloaded;
var Reflux           = require('reflux');
var RouteHandler     = require('react-router').RouteHandler;
var State            = require('react-router').State;

var GlobalActions    = require('./actions/GlobalActions');
var UserActions      = require('./actions/UserActions');
var CategoriesStore  = require('./stores/CategoriesStore');
var CurrentUserStore = require('./stores/CurrentUserStore');
var Header           = require('./components/Header.jsx');
var Footer           = require('./components/Footer.jsx');

var App = React.createClass({

  mixins: [ReactAsync.Mixin, Reflux.ListenerMixin, State],

  getInitialStateAsync: function(cb) {
    UserActions.check(function(err, user) {
      GlobalActions.loadCategories(function(err, categories) {
        cb(null, {
          categories: categories || [],
          currentUser: user || {}
        });
      });
    });
  },

  _onCategoriesChange: function(err, categories) {
    if ( err ) {
      this.setState({ error: err.message });
    } else {
      this.setState({ categories: categories || [] });
    }
  },

  _onUserChange: function(err, user) {
    if ( err ) {
      this.setState({ error: err.message });
    } else {
      this.setState({ currentUser: user || {} });
    }
  },

  componentDidMount: function() {
    this.listenTo(CategoriesStore, this._onCategoriesChange);
    this.listenTo(CurrentUserStore, this._onUserChange);
  },

  render: function() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}
                categories={this.state.categories} />

        <Preloaded>
          <RouteHandler params={this.props.params}
                        query={this.props.query}
                        currentUser={this.state.currentUser}
                        categories={this.state.categories} />
        </Preloaded>

        <Footer categories={this.state.categories} />

        <div id="fb-root" />

      </div>
    );
  }

});

module.exports = App;