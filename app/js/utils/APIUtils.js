'use strict';

var humps        = require('humps');
var camelizeKeys = humps.camelizeKeys;

var APIUtils = {

  root: 'http://54.148.170.236:8080/v1/',

  normalizeResponse: function(response) {
    return camelizeKeys(response.body);
  }

};

module.exports = APIUtils;