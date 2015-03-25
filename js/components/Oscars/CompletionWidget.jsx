'use strict';

var React    = require('react/addons');
var _        = require('lodash');
var $        = require('jquery');

var APIUtils = require('../../utils/APIUtils');

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
    return !_.isEmpty(this.props.submittedVotes[APIUtils.titleCase(category)]);
  },

  userHasVoted: function(category) {
    return this.userHasAlreadyVoted(category) || !_.isEmpty(this.props.unsubmittedVotes[APIUtils.titleCase(category)]);
  },

  scrollToCategory: function(elementString) {
    var offset = parseFloat($('.content').css('padding-top'));

    $('html, body').animate({
      'scrollTop': $(elementString).offset().top - offset
    }, 500);
  },

  renderCategories: function() {
    var id;
    var target;
    var classes;

    return _.map(this.props.categories, function(oscar, index) {
      id = 'nav-' + index.toString();
      target = '#cat-' + index.toString();
      classes = this.userHasVoted(oscar.category) ? 'done' : null;

      return (
        <li id={id} key={index} className={classes}>
          <a className="scroll" onClick={this.scrollToCategory.bind(null, target)}>
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

module.exports = CompletionWidget;