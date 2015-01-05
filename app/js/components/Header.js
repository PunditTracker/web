/**
 * @jsx React.DOM
 */
'use strict';

var React    = require('react/addons');
var Link     = React.createFactory(require('react-router').Link);

var ListLink = require('./ListLink');

var Header = React.createClass({

  render: function() {
    return (
      <header>

        <nav>
          <div className="pure-g">
            <div className="pure-u-1">
              <Link to="Home">
                <div className="logo">
                  <span>Pundit</span><br /><span>Tracker</span>
                </div>
              </Link>
              <ul className="categories">
                <ListLink to="Category" params={{ category: 'finance' }}>Finance</ListLink>
                <ListLink to="Category" params={{ category: 'politics' }}>Politics</ListLink>
                <ListLink to="Category" params={{ category: 'sports' }}>Sports</ListLink>
                <ListLink to="Category" params={{ category: 'tech' }}>Tech</ListLink>
                <ListLink to="Category" params={{ category: 'media' }}>Media</ListLink>
                <ListLink to="/blog">Blog</ListLink>
              </ul>
              <a className="sign-up button" href="#">Sign Up / Log in</a>
              <div className="search">
                <input id="search" className="stretch" type="text" placeholder="Type to search..." />
                <i className="search-icon fa fa-search"></i>
              </div>
            </div>
          </div>
        </nav>

      </header>
    );
  }

});

module.exports = React.createFactory(Header);