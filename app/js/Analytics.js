'use strict';

var ga = require('./ga');

var Analytics = {

  send: function(state) {
    var subdomain = window.location.host.split('.')[0];
    var hostname = window.location.hostname;

    // Don't log development visits
    if ( subdomain !== 'dev' && hostname !== 'localhost' ) {
      ga('send', 'pageview', { 'page': state.path });
    }
  }

};


module.exports = Analytics;