/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');

var Header = React.createClass({

  render: function() {
    return (
      <header>
        Header
      </header>
    );
  }

});

module.exports = React.createFactory(Header);