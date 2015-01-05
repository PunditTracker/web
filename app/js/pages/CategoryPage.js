/**
 * @jsx React.DOM
 */
'use strict';

var React         = require('react/addons');

var DocumentTitle = require('../components/DocumentTitle');

var CategoryPage = React.createClass({

  render: function() {
    return (
      <section className="category-page">

        <DocumentTitle title={this.props.params.category} />

        category page

      </section>
    );
  }

});

module.exports = React.createFactory(CategoryPage);