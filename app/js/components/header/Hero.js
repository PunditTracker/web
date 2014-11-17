/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');

var Hero = React.createClass({

  render: function() {
    return (
      <div className="hero" />
    );
  }

});

module.exports = React.createFactory(Hero);