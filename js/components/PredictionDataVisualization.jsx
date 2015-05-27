'use strict';

var React     = require('react/addons');
var rd3       = require('react-d3');
var AreaChart = rd3.AreaChart;
var _         = require('lodash');
var moment    = require('moment');

var APIUtils  = require('../utils/APIUtils');

var PredictionDataVisualization = React.createClass({

  shouldUseCache: true,
  cachedData: null,
  numDaysInterval: 30,

  propTypes: {
    prediction: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      prediction: {
        voteHistory: []
    }
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.shouldUseCache = _.isEqual(this.props.prediction, nextProps.prediction);
  },

  _getVotesForDayRangeAndValue: function(lowerFence, value) {
    var startDay = moment(lowerFence).startOf('day');
    var endOfRange = moment(lowerFence).endOf('day');
    var debugVote;
    var isValue;
    var isBetween;

    endOfRange.day(endOfRange.day() + this.numDaysInterval);

    // if ( global.window ) {
    //   debugger;
    // }

    return _.filter(this.props.prediction.voteHistory, vote => {
      debugVote = vote;
      isValue = vote.voteValue === value;
      isBetween = moment(vote.created).isBetween(startDay, endOfRange);
      return vote.voteValue === value && moment(vote.created).isBetween(startDay, endOfRange);
    });
  },

  _getSeries: function(voteValue) {
    var startDay = moment(this.props.prediction.created);
    var today = moment().startOf('day');
    var values = [];
    var d = startDay;

    // Iterate over days from prediction creation to today
    while ( d.isBefore(today) ) {
      var votes = this._getVotesForDayRangeAndValue(d.toDate(), voteValue);
      var dCopy = new Date(d.toDate());

      // Create a point for each day where x = day, y = # of votes on that day with value == voteValue
      values.push({
        x: dCopy,
        y: votes ? votes.length : 0
      });

      d.day(d.day() + this.numDaysInterval);
    }

    return values;
  },

  buildDataForD3: function() {
    var data = null;

    if ( this.shouldUseCache && this.cachedData ) {
      data = this.cachedData;
    } else if ( !_.isEmpty(this.props.prediction) ) {
      data = _.map(APIUtils.voteValues, (value, index) => {
        return {
          name: value,
          values: this._getSeries(index)
        };
      });
    }

    this.cachedData = data;

    return data;
  },

  render: function() {
    return (
      <AreaChart data={this.buildDataForD3()}
                 xAxisTickInterval={{ unit: 'day', interval: this.numDaysInterval }}
                 yAxisTickCount={5}
                 yAxisTickInterval={{ interval: 1 }}
                 legend={true}
                 width={1300}
                 height={400} />
    );
  }

});

module.exports = PredictionDataVisualization;