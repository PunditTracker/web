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
    var predictionsGraded = this.props.user.predictionsGraded || 1;
    // Default to a 'C' score if user hasn't had any predictions graded yet
    var predictionsCorrect = this.props.user.predictionsGraded ? this.props.user.predictionsCorrect : 0.35;
    var score = Math.round((predictionsCorrect/predictionsGraded)*10)/10; // 1 decimal place
    var scoreClass = null;
    var letterGrade = null;

    if ( score < 0.16 ) {
      scoreClass = 'red';
      letterGrade = 'F';
    } else if ( score > 0.15 && score < 0.31 ) {
      scoreClass = 'yellow-green';
      letterGrade = 'D';
    } else if ( score > 0.3 && score < 0.46 ) {
      scoreClass = 'orange';
      letterGrade = 'C';
    } else if ( score > 0.45 && score < 0.6 ) {
      scoreClass = 'yellow';
      letterGrade = 'B';
    } else if ( score > 0.59 ) {
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

module.exports = UserGrade;