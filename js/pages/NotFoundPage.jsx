'use strict';

var React         = require('react/addons');
var DocumentTitle = require('react-document-title');

var NotFoundPage = React.createClass({

  render: function() {
    return (
      <DocumentTitle title="Not Found">
      <section className="content no-hero not-found">

        <div className="container slim">
          <h2 className="text-center nudge-half--bottom flush--top">404: Page Not Found</h2>
        </div>

      </section>
      </DocumentTitle>
    );
  }

});

module.exports = NotFoundPage;