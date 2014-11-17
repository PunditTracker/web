'use strict';

var Reflux            = require('reflux');

var CategoryActions   = require('../actions/CategoryActions');
var CategoryAPI       = require('../utils/CategoryAPI');

var CurrentSubcategoryStore = Reflux.createStore({

  init: function() {
    this.listenTo(CategoryActions.loadSubcategory, this.load);
  },

  load: function(subcategory, cb) {
    cb = cb || function() {};

    console.log('load subcategory:', subcategory);

    CategoryAPI.getSubcategory(subcategory).then(function(subcategory) {
      console.log('got subcategory:', subcategory);
      this.subcategory = subcategory;
      this.trigger(subcategory);
      cb();
    }.bind(this)).catch(function(e) {
      // TODO: deal with error
      console.log('error loading subcategory:', e);
    });
  }

});

module.exports = CurrentSubcategoryStore;