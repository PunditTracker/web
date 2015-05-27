'use strict';

import React     from 'react/addons';
import _         from 'lodash';
import {Link}    from 'react-router';

import APIUtils  from '../utils/APIUtils';
import ListLink  from './ListLink.jsx';

var Footer = React.createClass({

  propTypes: {
    categories: React.PropTypes.array.isRequired,
    className: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      categories: []
    };
  },

  renderCategoryLinks: function() {
    if ( this.props.categories && this.props.categories.length ) {
       return _.map(this.props.categories, function(category, index) {
        return (
          <ListLink to="Category" params={{ category: category.name.toLowerCase() }} key={index}>
            {APIUtils.titleCase(category.name)}
          </ListLink>
        );
      });
    }
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

export default Footer;