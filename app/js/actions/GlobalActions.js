'use strict';

var Reflux = require('reflux');

var CategoryActions = Reflux.createActions([

  'loadHome',
  'loadCategories',
  'search',
  'loadPrediction',
  'loadCategory',
  'loadProfile'

]);

module.exports = CategoryActions;