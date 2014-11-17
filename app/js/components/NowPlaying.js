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
          <div className="team-container" style={teamOneStyle}>
            <div className="filter red" />
          </div>
          <div className="team-container" style={teamTwoStyle}>
            <div className="filter blue" />
          </div>
        </div>
      </section>
    );
  }

});

module.exports = React.createFactory(NowPlaying);