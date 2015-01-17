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

  render: function() {
    var factory = React.createFactory(this.props.tag);
    var photoStyles = {
      'background-image': this.props.user.avatarURL ? 'url(' + this.props.user.avatarURL + ')' : null
    };
    var gradeClasses = 'grade ' + this.props.color; // TODO: figure out how to actually get the color from user's grade

    return factory({ className: 'user' },
      <div>

        <div className="photo" style={photoStyles} />

        <div className="text-wrapper">
            <Link to="Profile" params={{ id: this.props.user.id || 1 }}>
                <h5 className="name">{this.props.user.name}</h5>
            </Link>
            <a href="#/source/{{source}}">
                <h6 className="affiliation">{this.props.user.affiliation}</h6>
            </a>
        </div>

        <div className={gradeClasses}>
            <span className="letter">{this.props.user.grade}</span>
            <span className="average">Average</span>
        </div>

      </div>
    );
  }

});

module.exports = React.createFactory(User);