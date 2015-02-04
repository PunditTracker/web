/**
 * @jsx React.DOM
 */
'use strict';

var React         = require('react/addons');

var DocumentTitle = require('../components/DocumentTitle');

var AboutPage = React.createClass({

  render: function() {
    return (
      <section className="content no-hero about">

        <DocumentTitle title="About" />

        About Page

      </section>
    );
  }

});

module.exports = React.createFactory(AboutPage);