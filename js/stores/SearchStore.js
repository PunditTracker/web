'use strict';

var Reflux        = require('reflux');

var GlobalActions = require('../actions/GlobalActions');
var SearchAPI     = require('../utils/SearchAPI');

var SearchStore = Reflux.createStore({

  init: function() {
    this.results = null;

    this.listenTo(GlobalActions.search, this.doSearch);
  },

  doSearch: function(query, cb) {
    cb = cb || function() {};

    console.log('do search:', query);

    SearchAPI.search(query).then(function(results) {
      this.results = results;
      cb(null, this.results);
      this.trigger(null, this.results);
    }.bind(this)).catch(function(err) {
      this.results = null;
      cb(err);
      this.trigger(err);
    }.bind(this));
  }

});

module.exports = SearchStore;