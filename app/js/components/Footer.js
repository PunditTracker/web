/**
 * @jsx React.DOM
 */
'use strict';

var React     = require('react/addons');
var _         = require('lodash');
var Link      = React.createFactory(require('react-router').Link);

var APIUtils  = require('../utils/APIUtils');
var ListLink  = require('./ListLink');

var Footer = React.createClass({

  propTypes: {
    categories: React.PropTypes.array.isRequired,
    className: React.PropTypes.string
  },

  renderCategoryLinks: function() {
    var elements = null;

    if ( this.props.categories && this.props.categories.length ) {
      elements = _.map(this.props.categories, function(category, index) {
        return (
          <ListLink to="Category" params={{ category: category.name.toLowerCase() }} key={index}>
            {APIUtils.titleCase(category.name)}
          </ListLink>
        );
      });
    }

    return elements;
  },

  render: function() {
    return (
      <footer className={this.props.className}>
        <div className="pure-g card-grid">

          <div className="pure-u-12-24">
            <Link to="Home">
              <img className="logo-image" src="../images/logo_white.png" alt="PunditTracker logo" />
            </Link>
          </div>

          <div className="pure-u-6-24">
            <h4 className="flush--top nudge-quarter--bottom">Categories</h4>
            <ul>
              {this.renderCategoryLinks()}
            </ul>
          </div>

          <div className="pure-u-6-24">
            <h4 className="flush--top nudge-quarter--bottom">More PT</h4>
            <ul>
              <li><Link to="About">About</Link></li>
              <li><a href="http://blog.pundittracker.com/" target="_blank">Blog</a></li>
              <li><a href="https://www.facebook.com/pundittracker" target="_blank">Facebook</a></li>
              <li><a href="https://twitter.com/pundittracker" target="_blank">Twitter</a></li>
            </ul>
          </div>

        </div>
      </footer>
    );
  }

});

module.exports = React.createFactory(Footer);