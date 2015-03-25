'use strict';

var React = require('react/addons');

var FacebookCard = React.createClass({

  render: function() {
    return (
      <div className="facebook-card">

        <div className="title-wrapper">
          <h3>Like Pundit Tracker<br/> on Facebook</h3>
        </div>

        <div className="fb-wrapper">
          <div className="inner">
            <div className="fb-like" data-href="http://www.pundittracker.com/" data-layout="box_count" data-action="like" data-show-faces="true" data-share="true"></div>
          </div>
        </div>

      </div>
    );
  }

});

module.exports = FacebookCard;