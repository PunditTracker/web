'use strict';

var Reflux = require('reflux');

var UserActions = Reflux.createActions([

  'check',
  'set',
  'login',
  'facebookLogin',
  'update',
  'logout'

]);

module.exports = UserActions;