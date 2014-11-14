/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');
var Link  = React.createFactory(require('react-router').Link);

var UserAvatar = React.createClass({

  propTypes: {
    user: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div className="user-avatar">
        <Link to="Home" />
      </div>
    );
  }

});

module.exports = React.createFactory(UserAvatar);