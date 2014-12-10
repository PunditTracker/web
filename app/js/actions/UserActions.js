'use strict';

var Reflux = require('reflux');

var UserActions = Reflux.createActions([

  'check',
  'login',
  'facebookLogin',
  'logout'

]);

module.exports = UserActions;