 'use strict';

var APIUtils = require('./APIUtils');

var PredictionAPI = {

  get: function(identifier) {
    return APIUtils.get('prediction/' + identifier);
  },

  postPrediction: function(prediction) {
    return APIUtils.psot('prediction/add', prediction);
  },

  doVote: function(prediction, vote) {
    return APIUtils.post('predictio/vote/' + prediction.id, vote);
  }

};

module.exports = PredictionAPI;