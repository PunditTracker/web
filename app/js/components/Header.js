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
    categories: React.PropTypes.array.isRequired,
    className: React.PropTypes.string
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
        <a className="user-option non-button nudge-half--left" onClick={this.toggleLoginModal}>Log in</a>
      );
    } else {
      element = (
        <div className="user-option non-button">
          <a className="nudge-half--left" onClick={this.transitionTo.bind(null, 'Settings')}>Settings</a>
          <a className="nudge-half--left" onClick={UserActions.logout.bind(null, null)}>Log out</a>
        </div>
      );
    }

    return element;
  },

  renderLogo: function() {
    var element = (
      <img className="logo-image" src="../images/logo_black.png" alt="PunditTracker logo" />
    );

    if ( this.props.className === 'oscars' ) {
      element = (
        <img className="logo-image" src="../images/logo_white.png" alt="PunditTracker logo" />
      );
    }

    return element;
  },

  render: function() {
    return (
      <header className={this.props.className}>

        <nav>
          <div className="pure-g">
            <div className="pure-u-1">
              <Link to="Home">
                {this.renderLogo()}
              </Link>
              <ul className="categories">
                <ListLink to="Oscars" className="oscars">Oscars</ListLink>
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