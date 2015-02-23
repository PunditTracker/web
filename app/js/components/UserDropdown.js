/**
 * @jsx React.DOM
 */
'use strict';

var React       = require('react/addons');
var Navigation  = require('react-router').Navigation;
var Link        = React.createFactory(require('react-router').Link);
var $           = require('jquery');
var cx          = React.addons.classSet;

var UserActions = require('../actions/UserActions');

var UserDropdown = React.createClass({

  mixins: [Navigation],

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
      showDropdown: false
    };
  },

  toggleDropdown: function() {
    this.setState({ showDropdown: !this.state.showDropdown }, this.setDocumentListener);
  },

  setDocumentListener: function() {
    if ( this.state.showDropdown ) {
      $(document).on('click', this.toggleDropdown);
    } else {
      $(document).off('click', this.toggleDropdown);
    }
  },

  renderAdminLink: function() {
    var element = null;

    if ( this.props.currentUser.isAdmin ) {
      element = (
        <li>
          Admin
          <Link to="AdminIndex" />
        </li>
      );
    }

    return element;
  },

  renderDropdown: function() {
    var classes = cx({
      'dropdown': true,
      'show': this.state.showDropdown
    });

    return (
      <ul className={classes}>
        {this.renderAdminLink()}
        <li>
          My Profile
          <Link to="Profile" params={{ identifier: this.props.currentUser.id }} />
        </li>
        <li>
          Settings
          <Link to="Settings" />
        </li>
        <li>
          Log Out
          <a onClick={UserActions.logout.bind(null, null)} />
        </li>
      </ul>
    );
  },

  render: function() {
    var avatarStyles = {
      'backgroundImage': 'url(' + this.props.currentUser.avatarUrl + ')'
    };

    return (
      <div className="user-dropdown">

        <div className="avatar" style={avatarStyles} onClick={this.toggleDropdown} />

        {this.renderDropdown()}

      </div>
    );
  }

});

module.exports = React.createFactory(UserDropdown);