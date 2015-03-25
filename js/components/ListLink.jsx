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
    var className = this.props.className + (isActive ? ' active' : '');
    var link = Link(this.props);

    return <li className={className || ''}>{link}</li>;
  }

});

module.exports = ListLink;