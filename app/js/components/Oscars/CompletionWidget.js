/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');
var _     = require('lodash');

var CompletionWidget = React.createClass({

  propTypes: {
    categories: React.PropTypes.array.isRequired,
    unsubmittedVotes: React.PropTypes.object.isRequired,
    submittedVotes: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      categories: [],
      unsubmittedVotes: {},
      submittedVotes: {}
    };
  },

  userHasAlreadyVoted: function(category) {
    return !_.isEmpty(this.props.submittedVotes[category.toLowerCase()]);
  },

  userHasVoted: function(category) {
    return this.userHasAlreadyVoted(category) || !_.isEmpty(this.props.unsubmittedVotes[category.toLowerCase()]);
  },

  renderCategories: function() {
    var id;
    var href;
    var classes;

    return _.map(this.props.categories, function(oscar, index) {
      id = 'nav-' + index.toString();
      href = '#cat-' + index.toString();
      classes = this.userHasVoted(oscar.category) ? 'done' : null;

      return (
        <li id={id} key={index} className={classes}>
          <a href={href} className="scroll">
            <span className="dot" />
            <i className="fa fa-check check" />
            <h6 className="text">{oscar.category}</h6>
          </a>
        </li>
      );
    }.bind(this));
  },

  render: function() {
    return (
      <ul className="completion fixed">

        {this.renderCategories()}

      </ul>
    );
  }

});

module.exports = React.createFactory(CompletionWidget);