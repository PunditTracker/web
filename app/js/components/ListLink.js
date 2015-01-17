/**
 * @jsx React.DOM
 */
'use strict';

var React       = require('react/addons');
var State       = require('react-router').State;
var Link        = React.createFactory(require('react-router').Link);

var ListLink = React.createClass({

  mixins: [State],

  render: function() {
    var isActive = this.isActive(this.props.to, this.props.params, this.props.query);
    var className = isActive ? 'active' : '';
    var link = Link(this.props);

    return <li className={className}>{link}</li>;
  }

});

module.exports = React.createFactory(ListLink);