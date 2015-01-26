/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');
var Link  = React.createFactory(require('react-router').Link);

var User = React.createClass({

  propTypes: {
    user: React.PropTypes.object.isRequired,
    tag: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      user: {},
      tag: 'div'
    };
  },

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
    var factory = React.createFactory(this.props.tag);
    var photoStyles = {
      'backgroundImage': this.props.user.avatarURL ? 'url(' + this.props.user.avatarURL + ')' : null
    };
    var gradeClasses = 'grade ' + this.state.scoreClass;

    return factory({ className: 'user' },
      <div>

        <div className="photo" style={photoStyles} />

        <div className="text-wrapper">
            <h5 className="name">{this.props.user.firstName} {this.props.user.lastName}</h5>
            <h6 className="affiliation">{this.props.user.affiliation}</h6>
        </div>

        <div className={gradeClasses}>
            <span className="letter">{this.state.letterGrade}</span>
        </div>

        <Link to="Profile" params={{ identifier: this.props.user.id || 1 }} />

      </div>
    );
  }

});

module.exports = React.createFactory(User);