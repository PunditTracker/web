/**
 * @jsx React.DOM
 */
'use strict';

var React         = require('react/addons');

var DocumentTitle = require('../components/DocumentTitle');

var OscarsPage = React.createClass({

  propTypes: {
    currentUser: React.PropTypes.object
  },

  getInitialState: function() {
    return {
      error: null
    };
  },

  render: function() {
    return (
      <section className="content oscars">

        <DocumentTitle title="The Oscars" />

        oscars

      </section>
    );
  }

});

module.exports = React.createFactory(OscarsPage);