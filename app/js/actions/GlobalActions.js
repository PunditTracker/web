'use strict';

var Reflux = require('reflux');

var CategoryActions = Reflux.createActions([

  'loadHome',
  'search',
  'loadPrediction',
  'loadCategory',
  'loadProfile'

]);

module.exports = CategoryActions;