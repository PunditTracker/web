/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');

var Footer = React.createClass({

  render: function() {
    return (
      <footer>

        <div className="wrapper">
          Footer
        </div>

        <div className="shadow" />

      </footer>
    );
  }

});

module.exports = React.createFactory(Footer);