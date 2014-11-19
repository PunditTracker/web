/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');

var Header = require('../components/header/Header');

var CategoryPage = React.createClass({

  propTypes: {
    updatePageTitle: React.PropTypes.func.isRequired
  },

  componentDidMount: function() {
    this.props.updatePageTitle(this.props.params.category);
  },

  componentWillUnmount: function() {
    this.props.setCategory(null);
  },

  render: function() {
    return (
      <div>

        <Header isHome={false} setCategory={this.props.setCategory} category={this.props.params.category} subcategory={this.props.params.category} />

        <this.props.activeRouteHandler updatePageTitle={this.props.updatePageTitle} setCategory={this.setCategory} />

      </div>
    );
  }

});

module.exports = React.createFactory(CategoryPage);