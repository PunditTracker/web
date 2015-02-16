/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');
var _     = require('lodash');

var UserGrade = React.createClass({

  propTypes: {
    user: React.PropTypes.object.isRequired
  },

  getDefaultProps: function() {
    return {
      user: {}
    };
  },

  getInitialState: function() {
    return {
      scoreClass: '',
      letterGrade: ''
    };
  },

  componentDidMount: function() {
    this.calculateGrade();
  },

  componentDidUpdate: function(prevProps) {
    if ( !_.isEqual(prevProps.user, this.props.user) && !_.isEmpty(this.props.user) ) {
      this.calculateGrade();
    }
  },

  calculateGrade: function() {
    var score = this.props.user.score || 0;
    var scoreClass = null;
    var letterGrade = null;

    if ( score <= -7 ) {
      scoreClass = 'red';
      letterGrade = 'F';
    } else if ( score >= -6 && score <= -3 ) {
      scoreClass = 'yellow-green';
      letterGrade = 'D';
    } else if ( score >= -2 && score <= 2 ) {
      scoreClass = 'orange';
      letterGrade = 'C';
    } else if ( score >= 3 && score <= 6 ) {
      scoreClass = 'yellow';
      letterGrade = 'B';
    } else if ( score >= 7 ) {
      scoreClass = 'green';
      letterGrade = 'A';
    }

    this.setState({
      scoreClass: scoreClass,
      letterGrade: letterGrade
    });
  },

  render: function() {
    var gradeClasses = 'grade ' + this.state.scoreClass;

    return (
      <div className={gradeClasses}>
        <span className="letter">{this.state.letterGrade}</span>
      </div>
    );
  }

});

module.exports = React.createFactory(UserGrade);