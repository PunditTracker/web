'use strict';

var React            = require('react/addons');
var ReactAsync       = require('react-async');
var Preloaded        = ReactAsync.Preloaded;
var Reflux           = require('reflux');
var _                = require('lodash');
var RouteHandlerMixin = require('../node_modules/react-router/modules/mixins/RouteHandler');
var State            = require('react-router').State;

var GlobalActions    = require('./actions/GlobalActions');
var UserActions      = require('./actions/UserActions');
var CategoriesStore  = require('./stores/CategoriesStore');
var CurrentUserStore = require('./stores/CurrentUserStore');
var Header           = require('./components/Header.jsx');
var Footer           = require('./components/Footer.jsx');

var App = React.createClass({

  mixins: [RouteHandlerMixin, ReactAsync.Mixin, Reflux.ListenerMixin, State],

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

  // Must ensure categories store has categories due to serverside rendering
  // not populating stores initially
  _checkCategoriesStore: function() {
    var hasCategories = !_.isEmpty(this.state.categories);
    var storeHasCategories = !_.isEmpty(CategoriesStore.categories);
    var categoriesNotEqual = !_.isEqual(this.state.categories, CategoriesStore.categories);

    if ( hasCategories && (!storeHasCategories || categoriesNotEqual) ) {
      GlobalActions.setCategories(this.state.categories);
    } else if ( !hasCategories ) {
      GlobalActions.loadCategories();
    }
  },

  componentDidMount: function() {
    this.listenTo(CategoriesStore, this._onCategoriesChange);
    this.listenTo(CurrentUserStore, this._onUserChange);

    this._checkCategoriesStore();
  },

  componentDidUpdate: function() {
    this._checkCategoriesStore();
  },

  render: function() {
    var RouteHandler = this.getRouteHandler({
      params: this.props.params,
      query: this.props.query,
      currentUser: this.state.currentUser,
      categories: this.state.categories
    });

    return (
      <div>
        <Header currentUser={this.state.currentUser}
                categories={this.state.categories} />

        <Preloaded>
          {RouteHandler}
        </Preloaded>

        <Footer categories={this.state.categories} />

        <div id="fb-root" />

      </div>
    );
  }

});

module.exports = App;