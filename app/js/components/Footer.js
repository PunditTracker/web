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
      <footer>

        <div className="pure-g card-grid">
          <div className="pure-u-1-3">
            <ul>
              <li className="double">
                <Link to="Home">
                  <div className="logo">
                    <span>Pundit</span><br /><span>Tracker</span>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <div className="pure-u-1-3"></div>
          <div className="pure-u-1-3"></div>
        </div>

        <div className="pure-g card-grid">
          <div className="pure-u-1-3">
            <ul>
              {this.renderCategoryLinks()}
            </ul>
          </div>
          <div className="pure-u-1-3">
            <ul>
              <li><Link to="About">About</Link></li>
              <li><a href="http://blog.pundittracker.com/" target="_blank">Blog</a></li>
            </ul>
          </div>
          <div className="pure-u-1-3">
            <ul>
              <li><a href="https://www.facebook.com/pundittracker" target="_blank">Facebook</a></li>
              <li><a href="https://twitter.com/pundittracker" target="_blank">Twitter</a></li>
              <li>
                <ul>
                  <li><a href="https://twitter.com/ptraxfinance" target="_blank">@ptraxfinance</a></li>
                  <li><a href="https://twitter.com/ptraxpolitics" target="_blank">@ptraxpolitics</a></li>
                  <li><a href="https://twitter.com/ptraxsports" target="_blank">@ptraxsports</a></li>
                  <li><a href="https://twitter.com/ptraxentertain" target="_blank">@ptraxentertain</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

      </footer>
    );
  }

});

module.exports = React.createFactory(Footer);