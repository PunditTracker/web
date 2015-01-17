/**
 * @jsx React.DOM
 */
'use strict';

var React         = require('react/addons');

var DocumentTitle = require('../components/DocumentTitle');

var CategoryPage = React.createClass({

  render: function() {
    return (
      <section className="content no-hero category">

        <DocumentTitle title={this.props.params.category} />

        category page

      </section>
    );
  }

});

module.exports = React.createFactory(CategoryPage);