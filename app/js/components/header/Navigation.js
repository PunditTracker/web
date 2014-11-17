/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');

var ListLink = require('../ListLink');

var Navigation = React.createClass({

  propTypes: {
    currentCategory: React.PropTypes.string,
    updateCategory: React.PropTypes.func
  },

  getLinkClass: function(category) {
    var classString = category;

    if ( this.props.currentCategory === category ) {
      classString += ' active';
    }

    return classString;
  },

  render: function() {
    return (
      <ul className="main-nav">
        <ListLink to="Category"
                  params={{ category: 'finance' }}
                  className={this.getLinkClass('finance')}
                  onMouseOver={this.props.updateCategory.bind(null, 'finance')}>
          Finance
          <div className="color-strip finance" />
        </ListLink>
        <ListLink to="Category"
                  params={{ category: 'politics' }}
                  className={this.getLinkClass('politics')}
                  onMouseOver={this.props.updateCategory.bind(null, 'politics')}>
          Politics
          <div className="color-strip politics" />
        </ListLink>
        <ListLink to="Category"
                  params={{ category: 'sports' }}
                  className={this.getLinkClass('sports')}
                  onMouseOver={this.props.updateCategory.bind(null, 'sports')}>
          Sports
          <div className="color-strip sports" />
        </ListLink>
        <ListLink to="Category"
                  params={{ category: 'entertainment' }}
                  className={this.getLinkClass('entertainment')}
                  onMouseOver={this.props.updateCategory.bind(null, 'entertainment')}>
          Entertainment
          <div className="color-strip entertainment" />
        </ListLink>
        <ListLink to="Category"
                  params={{ category: 'tech' }}
                  className={this.getLinkClass('tech')}
                  onMouseOver={this.props.updateCategory.bind(null, 'tech')}>
          Tech
          <div className="color-strip tech" />
        </ListLink>
        <li><a href="http://www.google.com" target="_blank" className="blog">Blog</a></li>
      </ul>
    );
  }

});

module.exports = React.createFactory(Navigation);