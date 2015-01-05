/**
 * @jsx React.DOM
 */
'use strict';

var React  = require('react/addons');

var Header = require('./components/Header');

var App = React.createClass({

  render: function() {
    return (
      <div>

        <Header />

        <this.props.activeRouteHandler />

      </div>
    );
  }

});

module.exports = React.createFactory(App);