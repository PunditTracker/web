/**
 * @jsx React.DOM
 */
'use strict';

var React         = require('react/addons');

var DocumentTitle = require('../components/DocumentTitle');

var SearchPage = React.createClass({

  render: function() {
    return (
      <section className="search-page">

        <DocumentTitle title="Search" />

        Search

      </section>
    );
  }

});

module.exports = React.createFactory(SearchPage);