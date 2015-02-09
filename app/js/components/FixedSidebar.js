/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');
var $     = require('jquery');

var FixedSidebar = React.createClass({

  propTypes: {
    className: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      className: ''
    };
  },

  getInitialState: function() {
    return {
      paddingTop: 0
    };
  },

  componentDidMount: function() {
    $(window).scroll(this.setStyling);
    $(window).resize(this.setStyling);
  },

  componentWillUnmount: function() {
    $(window).off('scroll', this.setStyling);
    $(window).off('resize', this.setStyling);
  },

  setStyling: function() {
    var $sidebar = $(this.getDOMNode());
    var $inner = $('.inner');
    var $wrapper = $sidebar.parent();
    var $header = $('header');
    var navbarAndMargin = parseFloat($('.content').css('padding-top'));
    var bottomOfHeader = $header.offset().top + navbarAndMargin;
    var bottomOfWindow = $(window).scrollTop() + $(window).height();
    var bottomOfWrapper = $wrapper.offset().top + $wrapper.outerHeight();
    var topOfSidebar = $sidebar.offset().top;
    var topOfInner = $inner.offset().top;
    var bottomOfInner = topOfInner + $inner.outerHeight();
    var topSoFixedTop = bottomOfHeader - topOfSidebar;
    var topSoFixedBottom = Math.min(bottomOfWindow, bottomOfWrapper) - topOfSidebar - $inner.outerHeight();
    var newPaddingTop;

    if ( bottomOfInner > bottomOfWrapper ) {
      newPaddingTop = topSoFixedBottom;
    } else if ( topOfInner >= bottomOfHeader || (bottomOfInner < bottomOfWindow && bottomOfInner < bottomOfWrapper && $inner.height() < ($(window).height() - navbarAndMargin)) ) {
      newPaddingTop = topSoFixedTop;
    } else if ( bottomOfInner < bottomOfWindow || bottomOfInner > bottomOfWrapper ) {
      newPaddingTop = topSoFixedBottom;
    }

    this.setState({ paddingTop: newPaddingTop });
  },

  render: function() {
    var classes = 'sidebar ' + this.props.className;
    var styles = {
      'paddingTop': this.state.paddingTop
    };

    return (
      <div className={classes} style={styles}>
        {this.props.children}
      </div>
    );
  }

});

module.exports = React.createFactory(FixedSidebar);