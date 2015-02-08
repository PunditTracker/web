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

        <div className="container slim">
          <h2 className="text-center nudge-half--bottom flush--top">404: Page Not Found</h2>
        </div>

      </section>
    );
  }

});

module.exports = React.createFactory(NotFoundPage);