/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');

var Header = React.createClass({

  render: function() {
    return (
      <header>

        <div className="wrapper">
          Header
        </div>

        <div className="shadow" />

      </header>
    );
  }

});

module.exports = React.createFactory(Header);