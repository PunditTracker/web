'use strict';

var Reflux = require('reflux');

var CategoryActions = Reflux.createActions([

  'loadCategory',
  'loadSubcategory'

]);

module.exports = CategoryActions;