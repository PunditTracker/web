'use strict';

var ga = require('./ga');

var Analytics = {

  send: function(state) {
    console.log('send:', state.path);
    ga('send', 'pageview', { 'page': state.path });
  }

};


module.exports = Analytics;