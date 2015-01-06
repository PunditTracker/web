/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');
var Link  = React.createFactory(require('react-router').Link);

var CategoryLinkCard = React.createClass({

  propTypes: {
    category: React.PropTypes.string.isRequired
  },

  getDefaultProps: function() {
    return {
      category: ''
    };
  },

  render: function() {
    return (
      <div className="category-link-card">
        <div className="scrim"></div>
        <h2>The best {this.props.category.toLowerCase()} predictions.</h2>
        <Link to="Category" params={{ category: this.props.category.toLowerCase() }}>
          <h2>{this.props.category[0].toUpperCase() + this.props.category.slice(1)} Hub <i className="fa fa-long-arrow-right "></i></h2>
        </Link>
      </div>
    );
  }

});

module.exports = React.createFactory(CategoryLinkCard);