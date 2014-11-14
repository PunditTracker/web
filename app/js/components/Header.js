/**
 * @jsx React.DOM
 */
'use strict';

var React    = require('react/addons');
var Link     = React.createFactory(require('react-router').Link);

var ListLink = require('./ListLink');

var Header = React.createClass({

  renderNavigation: function() {
    return (
      <ul className="main-nav">
        <ListLink to="Category" params={{ category: 'finance' }} className="finance">
          Finance
          <div className="color-strip finance" />
        </ListLink>
        <ListLink to="Category" params={{ category: 'politics' }} className="politics">
          Politics
          <div className="color-strip politics" />
        </ListLink>
        <ListLink to="Category" params={{ category: 'sports' }} className="sports">
          Sports
          <div className="color-strip sports" />
        </ListLink>
        <ListLink to="Category" params={{ category: 'entertainment' }} className="entertainment">
          Entertainment
          <div className="color-strip entertainment" />
        </ListLink>
        <ListLink to="Category" params={{ category: 'tech' }} className="tech">
          Tech
          <div className="color-strip tech" />
        </ListLink>
        <li><a href="http://www.google.com" target="_blank" className="blog">Blog</a></li>
      </ul>
    );
  },

  renderUserOptions: function() {
    return (
      <ul className="user-options">
        <ListLink to="Register">Sign Up</ListLink>
        <ListLink to="Login">Log In</ListLink>
      </ul>
    );
  },

  renderHero: function() {
    var element = null;

    if ( false ) {
      element = (
        <div className="hero">
          <div className="wrapper">
            Hero Unit
          </div>
        </div>
      );
    }

    return element;
  },

  render: function() {
    return (
      <header>

        <div className="top-container wrapper">
          <div className="logo-container">
            <div className="logo">
              <Link to="Home" />
            </div>
          </div>
          {this.renderNavigation()}
          {this.renderUserOptions()}
        </div>

        {this.renderHero()}

        <div className="shadow" />

      </header>
    );
  }

});

module.exports = React.createFactory(Header);