 'use strict';

var APIUtils = require('./APIUtils');

var PredictionAPI = {

  get: function(identifier) {
    return APIUtils.doGet('prediction/' + identifier);
  },

  postPrediction: function(prediction) {
    return APIUtils.doPost('prediction/add', prediction);
  },

  doVote: function(prediction, voteInt) {
    return APIUtils.doPost('prediction/vote/' + prediction.id + '/' + voteInt);
  }

};

module.exports = PredictionAPI;