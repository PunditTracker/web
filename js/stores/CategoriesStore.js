'use strict';

var Reflux          = require('reflux');

var GlobalActions = require('../actions/GlobalActions');
var HomePageAPI   = require('../utils/HomePageAPI');

var CategoriesStore = Reflux.createStore({

  init: function() {
    this.categories = null;

    this.listenTo(GlobalActions.loadCategories, this.loadCategories);
  },

  loadCategories: function(cb) {
    cb = cb || function() {};

    console.log('get blog posts');

    HomePageAPI.getCategories().then(function(categories) {
      console.log('got categories:', categories);
      this.categories = categories;
      cb(null, this.categories);
      this.trigger(null, this.categories);
    }.bind(this)).catch(function(err) {
      cb(err);
      this.trigger(err);
    }.bind(this));
  }

});

module.exports = CategoriesStore;