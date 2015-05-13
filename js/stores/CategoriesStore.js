'use strict';

var Reflux          = require('reflux');

var GlobalActions = require('../actions/GlobalActions');
var HomePageAPI   = require('../utils/HomePageAPI');

var CategoriesStore = Reflux.createStore({

  init: function() {
    this.categories = null;

    this.listenTo(GlobalActions.setCategories, this.setCategories);
    this.listenTo(GlobalActions.loadCategories, this.loadCategories);
  },

  setCategories: function(categories, cb) {
    cb = cb || function() {};

    this.categories = categories;
    console.log('set categories:', categories);
    cb(null, this.categories);
    this.trigger(null, this.categories);
  },

  loadCategories: function(cb) {
    cb = cb || function() {};

    console.log('get categories');

    HomePageAPI.getCategories().then(function(categories) {
      this.setCategories(categories, cb);
    }.bind(this)).catch(function(err) {
      cb(err);
      this.trigger(err);
    }.bind(this));
  }

});

module.exports = CategoriesStore;