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
    var score = (this.props.user.predictionsCorrect/this.props.user.predictionsGraded).toFixed(1);
    var scoreClass = null;
    var letterGrade = null;

    if ( score < 0.21 ) {
      scoreClass = 'red';
      letterGrade = 'F';
    } else if ( score > 0.2 && score < 0.41 ) {
      scoreClass = 'yellow-green';
      letterGrade = 'D';
    } else if ( score > 0.4 && score < 0.61 ) {
      scoreClass = 'orange';
      letterGrade = 'C';
    } else if ( score > 0.6 && score < 0.71 ) {
      scoreClass = 'yellow';
      letterGrade = 'B';
    } else if ( score > 0.7 ) {
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