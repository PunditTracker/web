'use strict';

import React              from 'react/addons';
import _                  from 'lodash';
import {Link, Navigation} from 'react-router';

import APIUtils           from '../utils/APIUtils';
import LoginModalMixin    from '../mixins/LoginModalMixin.jsx';
import UserDropdown       from '../components/UserDropdown.jsx';
import ListLink           from './ListLink.jsx';

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

    this.setState({ query: '' }, () => {
      this.refs.searchInput.getDOMNode().blur();
    });
  },

  renderMenuLinks: function() {
    var elements = [];

    if ( this.props.categories && this.props.categories.length ) {
      elements = _.map(this.props.categories, (category, index) => {
        return (
          <ListLink to="Category" params={{ category: category.name.toLowerCase() }} key={index}>
            {APIUtils.titleCase(category.name)}
          </ListLink>
        );
      });
    }

    elements.push((
      <li key={Math.floor(Math.random()+50)}>
        <a href="http://blog.pundittracker.com/" target="_blank">Blog</a>
      </li>
    ));

    return elements;
  },

  renderButton: function() {
    var element;

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
    var element;

    if ( _.isEmpty(this.props.currentUser) ) {
      element = (
        <a className="user-option non-button nudge-half--left" onClick={this.toggleLoginModal}>Log in</a>
      );
    } else {
      element = (
        <UserDropdown currentUser={this.props.currentUser} />
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
                <img className="logo-image" src="../images/logo_black.png" alt="PunditTracker logo" />
              </Link>
              <ul className="categories">
                {this.renderMenuLinks()}
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

export default Header;