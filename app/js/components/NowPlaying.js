/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');

var NowPlaying = React.createClass({

  propTypes: {
    event: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      event: {
        location: {},
        teamOne: {},
        teamTwo: {}
      }
    };
  },

  componentDidUpdate: function() {
    console.log(this.props.event);
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
            </div>
            <div className="info-container">
              now playing box
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