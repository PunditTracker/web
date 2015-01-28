 'use strict';

var APIUtils = require('./APIUtils');

var PredictionAPI = {

  get: function(identifier) {
    return APIUtils.doGet('prediction/' + identifier);
  },

  postPrediction: function(prediction) {
    return APIUtils.doPost('prediction/add', prediction);
  },

  doVote: function(prediction, vote) {
    return APIUtils.doPost('predictio/vote/' + prediction.id, vote);
  }

};

module.exports = PredictionAPI;