/**
 * @jsx React.DOM
 */
'use strict';

var React        = require('react/addons');
var MasonryMixin = require('react-masonry-mixin');

var PlaylistList = React.createClass({

  mixins: [MasonryMixin('masonryContainer', {
    transitionDuration: 0,
    itemSelector: '.masonry-item',
    columnWidth: '.grid-sizer',
  })],

  propTypes: {
    className: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      className: ''
    };
  },

  render: function() {
    return (
      <div className={this.props.className} ref="masonryContainer">

        <div className="grid-sizer" />

        {this.props.children}

      </div>
    );
  }

});

module.exports = React.createFactory(PlaylistList);