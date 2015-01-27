/**
 * @jsx React.DOM
 */
'use strict';

var React           = require('react/addons');
var _               = require('lodash');
var Link            = React.createFactory(require('react-router').Link);
var Navigation      = require('react-router').Navigation;

var LoginModalMixin = require('../mixins/LoginModalMixin');
var ListLink        = require('./ListLink');

var Header = React.createClass({

  mixins: [React.addons.LinkedStateMixin, Navigation, LoginModalMixin],

  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      currentUser: {}
    };
  },

  getInitialState: function() {
    return {
      query: ''
    };
  },

  handleKeyPress: function(evt) {
    var keyCode = evt.keyCode || evt.which;

    if ( keyCode === '13' || keyCode === 13 ) {
      this.doSearch();
    }
  },

  doSearch: function() {
    this.transitionTo('Search', {}, { q: this.state.query });

    this.setState({ query: '' }, function() {
      this.refs.searchInput.getDOMNode().blur();
    }.bind(this));
  },

  renderButton: function() {
    var element = null;

    if ( _.isEmpty(this.props.currentUser) ) {
      element = (
        <a className="user-button button" onClick={this.toggleLoginModal}>Sign Up / Log in</a>
      );
    } else {
      element = (
        <Link to="Predict" className="user-button button">Predict!</Link>
      );
    }

    return element;
  },

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
                <li><a href="http://blog.pundittracker.com/" target="_blank">Blog</a></li>
              </ul>
              {this.renderButton()}
              <div className="search">
                <input ref="searchInput"
                       id="search"
                       className="stretch"
                       type="text"
                       placeholder="Type to search..."
                       valueLink={this.linkState('query')}
                       onKeyPress={this.handleKeyPress} />
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