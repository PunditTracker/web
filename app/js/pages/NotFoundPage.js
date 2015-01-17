/**
 * @jsx React.DOM
 */
'use strict';

var React         = require('react/addons');

var DocumentTitle = require('../components/DocumentTitle');

var NotFoundPage = React.createClass({

  render: function() {
    return (
      <section className="content no-hero not-found">

        <DocumentTitle title="Not Found" />

        Page Not Found

      </section>
    );
  }

});

module.exports = React.createFactory(NotFoundPage);