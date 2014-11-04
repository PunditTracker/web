/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');

var UserAvatar = React.createClass({

  propTypes: {
    user: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div className="user-avatar" />
    );
  }

});

module.exports = React.createFactory(UserAvatar);