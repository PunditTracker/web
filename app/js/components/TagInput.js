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
    placeholder: React.PropTypes.string,
    limit: React.PropTypes.number
  },

  componentDidMount: function() {
    var $input = $(this.getDOMNode());

    $input.tokenfield({
      limit: this.props.limit || 3
    });

    // Prevent default tags
    $input.on('tokenfield:createtoken', function (evt) {
      console.log('token created');
      _.each(this.getTokens(), function(token) {
        if ( token === evt.attrs.value ) {
          evt.preventDefault();
        }
      });
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