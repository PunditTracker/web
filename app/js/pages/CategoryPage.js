/**
 * @jsx React.DOM
 */
'use strict';

var React         = require('react/addons');

var DocumentTitle = require('../components/DocumentTitle');
var Header        = require('../components/header/Header');

var CategoryPage = React.createClass({

  componentWillUnmount: function() {
    this.props.setCategory(null);
  },

  render: function() {
    return (
      <div>

        <DocumentTitle title={this.props.params.category} />

        <Header isHome={false} setCategory={this.props.setCategory} category={this.props.params.category} subcategory={this.props.params.category} />

        <this.props.activeRouteHandler setCategory={this.setCategory} />

      </div>
    );
  }

});

module.exports = React.createFactory(CategoryPage);