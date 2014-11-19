/**
 * @jsx React.DOM
 */
'use strict';

var React         = require('react/addons');
var _             = require('underscore');
var Link          = React.createFactory(require('react-router').Link);

var GameHighlight = require('./GameHighlight');

var NowPlaying = React.createClass({

  propTypes: {
    event: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      event: {
        location: {},
        teamOne: {
          score: {}
        },
        teamTwo: {
          score: {}
        }
      }
    };
  },

  componentDidUpdate: function() {
    console.log(this.props.event);
  },

  renderGameScores: function() {
    return (
      <div className="scores-table table full-width">
        <div className="tr full-width time-period-row">
          <div className="td" />
          <div className="td" />
          <div className="td text-center">Q1</div>
          <div className="td text-center">Q2</div>
          <div className="td text-center">Q3</div>
          <div className="td text-center">Q4</div>
          <div className="td" />
        </div>
        <div className="tr full-width">
          <div className="td team-image-container">
            <div className="team-image" />
          </div>
          <div className="td">
            <h3 className="team-name flush">{this.props.event.teamOne.name}</h3>
          </div>
          <div className="td text-center">
            <h4 className="flush">{this.props.event.teamOne.score.q1 || '-'}</h4>
          </div>
          <div className="td text-center">
            <h4 className="flush">{this.props.event.teamOne.score.q2 || '-'}</h4>
          </div>
          <div className="td text-center">
            <h4 className="flush">{this.props.event.teamOne.score.q3 || '-'}</h4>
          </div>
          <div className="td text-center">
            <h4 className="flush">{this.props.event.teamOne.score.q4 || '-'}</h4>
          </div>
          <div className="td text-right">
            <h3 className="flush">{this.props.event.teamOne.score.total}</h3>
          </div>
        </div>
        <div className="tr full-width">
          <div className="td team-image-container">
            <div className="team-image" />
          </div>
          <div className="td">
            <h3 className="team-name flush">{this.props.event.teamTwo.name}</h3>
          </div>
          <div className="td text-center">
            <h4 className="flush">{this.props.event.teamTwo.score.q1 || '-'}</h4>
          </div>
          <div className="td text-center">
            <h4 className="flush">{this.props.event.teamTwo.score.q2 || '-'}</h4>
          </div>
          <div className="td text-center">
            <h4 className="flush">{this.props.event.teamTwo.score.q3 || '-'}</h4>
          </div>
          <div className="td text-center">
            <h4 className="flush">{this.props.event.teamTwo.score.q4 || '-'}</h4>
          </div>
          <div className="td text-right">
            <h3 className="flush">{this.props.event.teamTwo.score.total}</h3>
          </div>
        </div>
      </div>
    );
  },

  renderHighlights: function() {
    return _.map(this.props.event.highlights, function(highlight, index) {
      return (
        <li className="col-3" key={index}>
          <GameHighlight highlight={highlight} />
        </li>
      );
    });
  },

  renderRelatedPredictions: function() {
    return _.map(this.props.event.relatedPredictions, function(prediction, index) {
      return (
        <li key={index}>
          <Link to="Prediction" params={{ category: prediction.category, id: prediction.id }}>
            {prediction.title}
          </Link>
        </li>
      );
    });
  },

  render: function() {
    var locationStyle = {
      'backgroundImage': this.props.event.location.imageUrl ? 'url(' + this.props.event.location.imageUrl + ')' : ''
    };
    var teamOneStyle = {
      'backgroundImage': this.props.event.teamOne.imageUrl ? 'url(' + this.props.event.teamOne.imageUrl + ')' : ''
    };
    var teamTwoStyle = {
      'backgroundImage': this.props.event.teamTwo.imageUrl ? 'url(' + this.props.event.teamTwo.imageUrl + ')' : ''
    };

    return (
      <section className="now-playing wrapper">
        <div className="col-8">
          <div className="event-info">
            <div className="location-banner" style={locationStyle}>
              <div className="location-name">{this.props.event.location.name}</div>
              <div className="shadow" />
            </div>
            <div className="info-container islet">
              {this.renderGameScores()}
              <h6 className="caps light-grey nudge-half--ends">Highlights</h6>
              <ul className="highlights row">
                {this.renderHighlights()}
              </ul>
              <h6 className="caps light-grey nudge-quarter--bottom">Related Predictions</h6>
              <ul className="related-predictions">
                {this.renderRelatedPredictions()}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="team-container islet" style={teamOneStyle}>
            <div className="table full-width">
              <div className="td">
                <h6 className="flush--bottom">{this.props.event.teamOne.location}</h6>
                <h3>{this.props.event.teamOne.name}</h3>
              </div>
              <div className="td text-right">
                <h2>({this.props.event.teamOne.wins}-{this.props.event.teamOne.losses})</h2>
              </div>
            </div>
            <div className="filter red" />
          </div>
          <div className="team-container islet" style={teamTwoStyle}>
            <div className="table full-width">
              <div className="td">
                <h6 className="flush--bottom">{this.props.event.teamTwo.location}</h6>
                <h3>{this.props.event.teamTwo.name}</h3>
              </div>
              <div className="td text-right">
                <h2>({this.props.event.teamTwo.wins}-{this.props.event.teamTwo.losses})</h2>
              </div>
            </div>
            <div className="filter blue" />
          </div>
        </div>
      </section>
    );
  }

});

module.exports = React.createFactory(NowPlaying);