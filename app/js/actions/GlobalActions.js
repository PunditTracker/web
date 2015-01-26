'use strict';

var Reflux = require('reflux');

var CategoryActions = Reflux.createActions([

  'loadHome',
  'search',
  'loadPrediction',
  'loadProfile'

]);

module.exports = CategoryActions;