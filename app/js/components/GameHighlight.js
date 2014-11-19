/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');

var GameHighlight = React.createClass({

  propTypes: {
    highlight: React.PropTypes.object.isRequired
  },

  render: function() {
    return (
      <div className="game-highlight" />
    );
  }

});

module.exports = React.createFactory(GameHighlight);