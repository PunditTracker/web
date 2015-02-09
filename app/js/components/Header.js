/**
 * @jsx React.DOM
 */
'use strict';

var React           = require('react/addons');
var _               = require('lodash');
var Link            = React.createFactory(require('react-router').Link);
var Navigation      = require('react-router').Navigation;

var APIUtils        = require('../utils/APIUtils');
var LoginModalMixin = require('../mixins/LoginModalMixin');
var UserActions     = require('../actions/UserActions');
var ListLink        = require('./ListLink');

var Header = React.createClass({

  mixins: [React.addons.LinkedStateMixin, Navigation, LoginModalMixin],

  propTypes: {
    currentUser: React.PropTypes.object.isRequired,
    categories: React.PropTypes.array.isRequired
  },

  getDefaultProps: function() {
    return {
      currentUser: {},
      categories: []
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

  renderButton: function() {
    var element = null;

    if ( _.isEmpty(this.props.currentUser) ) {
      element = (
        <Link to="Register" className="user-option button">Sign Up</Link>
      );
    } else {
      element = (
        <Link to="Predict" className="user-option button">Predict!</Link>
      );
    }

    return element;
  },

  renderLink: function() {
    var element = null;

    if ( _.isEmpty(this.props.currentUser) ) {
      element = (
        <a className="user-option non-button" onClick={this.toggleLoginModal}>Log in</a>
      );
    } else {
      element = (
        <a className="user-option non-button" onClick={UserActions.logout.bind(null, null)}>Log out</a>
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
                {this.renderCategoryLinks()}
                <li><a href="http://blog.pundittracker.com/" target="_blank">Blog</a></li>
              </ul>
              {this.renderLink()}
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