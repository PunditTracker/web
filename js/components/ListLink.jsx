'use strict';

var React       = require('react/addons');
var State       = require('react-router').State;
var Link        = require('react-router').Link;

var ListLink = React.createClass({

  mixins: [State],

  propTypes: {
    className: React.PropTypes.string
  },

  render: function() {
    var isActive = this.isActive(this.props.to, this.props.params, this.props.query);
    var className = '';

    if ( this.props.className ) {
      className = this.props.className;
    }

    if ( isActive ) {
      className += this.props.className ? ' active' : 'active';
    }

    return (
      <li className={className || ''}>
        <Link to={this.props.to} params={this.props.params} query={this.props.query}>
          {this.props.children}
        </Link>
      </li>
    );
  }

});

module.exports = ListLink;