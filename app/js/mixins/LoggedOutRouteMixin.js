'use strict';

var _                = require('lodash');

var CurrentUserStore = require('../stores/CurrentUserStore');

var LoggedOutRouteMixin = {

  // NOTE: Navigation mixin is required, but already supplied on RegisterPage where this is used
  mixins: [],

  componentDidUpdate: function() {
    if ( !_.isEmpty(CurrentUserStore.user) && CurrentUserStore.hasBeenChecked && this.isMounted() ) {
      this.replaceWith('Home');
    }
  }

};

module.exports = LoggedOutRouteMixin;