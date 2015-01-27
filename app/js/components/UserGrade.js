/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');

var UserGrade = React.createClass({

  getInitialState: function() {
    return {
      scoreClass: '',
      letterGrade: ''
    };
  },

  componentWillMount: function() {
    this.calculateGrade();
  },

  calculateGrade: function() {
    var scoreClass;
    var letterGrade;

    if ( this.props.user.score <= -7 ) {
      scoreClass = 'red';
      letterGrade = 'F';
    } else if ( this.props.user.score >= -6 && this.props.user.score <= -3 ) {
      scoreClass = 'yellow-green';
      letterGrade = 'D';
    } else if ( this.props.user.score >= -2 && this.props.user.score <= 2 ) {
      scoreClass = 'orange';
      letterGrade = 'C';
    } else if ( this.props.user.score >= 3 && this.props.user.score <= 6 ) {
      scoreClass = 'yellow';
      letterGrade = 'B';
    } else if ( this.props.user.score >= 7 ) {
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