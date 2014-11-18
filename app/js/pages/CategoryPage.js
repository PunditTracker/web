/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');

var CategoryPage = React.createClass({

  propTypes: {
    updatePageTitle: React.PropTypes.func.isRequired,
    setCategory: React.PropTypes.func.isRequired
  },

  componentWillReceiveProps: function(nextProps) {
    if ( nextProps.category && nextProps.category !== this.props.category) {
      this.props.updatePageTitle(this.props.params.category);
      this.props.setCategory(this.props.params.category);
    }
  },

  componentWillUnmount: function() {
    this.props.setCategory(null);
  },

  render: function() {
    return (
      <this.props.activeRouteHandler updatePageTitle={this.props.updatePageTitle} setCategory={this.setCategory} />
    );
  }

});

module.exports = React.createFactory(CategoryPage);