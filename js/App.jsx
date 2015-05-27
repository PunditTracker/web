'use strict';

import React             from 'react/addons';
import ReactAsync        from 'react-async';
import Reflux            from 'reflux';
import _                 from 'lodash';
import RouteHandlerMixin from '../node_modules/react-router/modules/mixins/RouteHandler';
import {State}           from 'react-router';
const {Preloaded}        = ReactAsync;

import GlobalActions     from './actions/GlobalActions';
import UserActions       from './actions/UserActions';
import CategoriesStore   from './stores/CategoriesStore';
import CurrentUserStore  from './stores/CurrentUserStore';
import Header            from './components/Header.jsx';
import Footer            from './components/Footer.jsx';

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
      <div className="app-container">
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

export default App;