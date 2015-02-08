'use strict';

var _                = require('lodash');
var Navigation       = require('react-router').Navigation;

var CurrentUserStore = require('../stores/CurrentUserStore');

var AuthenticatedRouteMixin = {

  mixins: [Navigation],

  componentDidMount: function() {
    if ( _.isEmpty(CurrentUserStore.user) && this.isMounted() ) {
      this.replaceWith('Home');
    }
  }

};

module.exports = AuthenticatedRouteMixin;