'use strict';

var Reflux = require('reflux');

var CategoryActions = Reflux.createActions([

  'loadHome',
  'loadCategories',
  'setCategories',
  'search',
  'loadPrediction',
  'loadCategory',
  'loadProfile'

]);

module.exports = CategoryActions;