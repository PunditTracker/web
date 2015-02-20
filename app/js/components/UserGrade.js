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
      user: {
        predictionsCorrect: 0,
        predictionsGraded: 0
      }
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
    var score = Math.round((this.props.user.predictionsCorrect/this.props.user.predictionsGraded)*10)/10; // 1 decimal place
    var scoreClass = null;
    var letterGrade = null;

    if ( score < 0.11 ) {
      scoreClass = 'red';
      letterGrade = 'F';
    } else if ( score > 0.1 && score < 0.31 ) {
      scoreClass = 'yellow-green';
      letterGrade = 'D';
    } else if ( score > 0.3 && score < 0.51 ) {
      scoreClass = 'orange';
      letterGrade = 'C';
    } else if ( score > 0.5 && score < 0.76 ) {
      scoreClass = 'yellow';
      letterGrade = 'B';
    } else if ( score > 0.75 ) {
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