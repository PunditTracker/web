'use strict';

var humps        = require('humps');
var camelizeKeys = humps.camelizeKeys;

var APIUtils = {

  root: '/api/',

  normalizeResponse: function(response) {
    return camelizeKeys(response.body);
  }

};

module.exports = APIUtils;