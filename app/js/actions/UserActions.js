'use strict';

var Reflux = require('reflux');

var UserActions = Reflux.createActions([

  'check',
  'set',
  'login',
  'facebookLogin',
  'logout'

]);

module.exports = UserActions;