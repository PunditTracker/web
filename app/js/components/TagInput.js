/**
 * @jsx React.DOM
 */
'use strict';

var React      = require('react/addons');
var _          = require('lodash');
var $          = require('jquery');
var tokenfield = require('bootstrap-tokenfield')($);

var TagInput = React.createClass({

  propTypes: {
    addTag: React.PropTypes.func,
    placeholder: React.PropTypes.string,
    limit: React.PropTypes.number
  },

  getDefaultProps: function() {
    return {
      addTag: function() {}
    };
  },

  componentDidMount: function() {
    var $input = $(this.getDOMNode());
    var isCopy = false;

    $input.tokenfield({
      limit: this.props.limit || 3
    });

    // Prevent default tags
    $input.on('tokenfield:createtoken', function (evt) {
      _.each(this.getTokens(), function(token) {
        if ( token === evt.attrs.value ) {
          evt.preventDefault();
          isCopy = true;
        }
      });
      if ( !isCopy ) {
        this.props.addTag(evt.attrs.value);
      }
    }.bind(this));
  },

  getTokens: function() {
    return _.map($(this.getDOMNode()).tokenfield('getTokens'), function(token) {
      return token.value;
    });
  },

  render: function() {
    return (
      <input type="text" placeholder={this.props.placeholder} />
    );
  }

});

module.exports = React.createFactory(TagInput);