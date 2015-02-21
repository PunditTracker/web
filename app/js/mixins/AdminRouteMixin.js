'use strict';

var _                = require('lodash');
var Navigation       = require('react-router').Navigation;

var CurrentUserStore = require('../stores/CurrentUserStore');

var AdminRouteMixin = {

  mixins: [Navigation],

  componentDidUpdate: function() {
    if ( (_.isEmpty(CurrentUserStore.user) || !CurrentUserStore.user.isAdmin) && CurrentUserStore.hasBeenChecked && this.isMounted() ) {
      this.replaceWith('Home');
    }
  }

};

module.exports = AdminRouteMixin;