'use strict';

import React       from 'react/addons';
import _           from 'lodash';
import moment      from 'moment';
import {LineChart} from 'react-d3';

import APIUtils   from '../utils/APIUtils';

var PredictionVotesChart = React.createClass({

  shouldUseCache: true,
  cachedData: null,
  numDaysInterval: 30,
  xDomain: [],

  propTypes: {
    prediction: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      prediction: { voteHistory: [] }
    };
  },

  componentWillReceiveProps: function(nextProps) {
    this.shouldUseCache = _.isEqual(this.props.prediction, nextProps.prediction);
  },

  _getVotesForDayRangeAndValue: function(lowerFence, value) {
    let startDay = moment(lowerFence).startOf('day');
    let endOfRange = moment(lowerFence).endOf('day');

    endOfRange.day(endOfRange.day() + this.numDaysInterval);

    // if ( global.window ) {
    //   debugger;
    // }

    return _.filter(this.props.prediction.voteHistory, vote => {
      return vote.voteValue === value && moment(vote.created).isBetween(startDay, endOfRange);
    });
  },

  _getSeries: function(voteValue) {
    let startDay = moment(this.props.prediction.created);
    let today = moment().startOf('day');
    let values = [];
    let d = startDay;

    // Iterate over days from prediction creation to today
    while ( d.isBefore(today) ) {
      let votes = this._getVotesForDayRangeAndValue(d.toDate(), voteValue);
      let numVotes = votes ? votes.length : 0;

      // Create a point for each date range, y = # of votes on that day with value == voteValue
      values.push({
        x: new Date(d.toDate()),
        y: numVotes
      });

      d.day(d.day() + this.numDaysInterval);
    }

    return values;
  },

  buildDataForD3: function() {
    let data = null;

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

  renderTooltip: function(closestY, cumulativeY) {
    return closestY + ' votes';
  },

  render: function() {
    let startDate = new Date(this.props.prediction.created);
    let endDate = new Date();
    let data = this.buildDataForD3();

    console.log('data:', data);

    return (
      <LineChart data={data}
                 legend={true}
                 yAxisLabel="Number of Votes"
                 axesColor="#e5e5e5"
                 legendTextStroke="#e5e5e5"
                 tooltipHtml={this.renderTooltip}
                 width={1300}
                 height={400} />
    );
  }

});

export default PredictionVotesChart;