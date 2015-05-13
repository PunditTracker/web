'use strict';

var React     = require('react/addons');
var cx        = require('classnames');
var Link      = require('react-router').Link;

var UserGrade = require('./UserGrade.jsx');

var User = React.createClass({

  propTypes: {
    user: React.PropTypes.object.isRequired,
    renderGrade: React.PropTypes.bool,
    tag: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      user: {},
      renderGrade: true,
      tag: 'div'
    };
  },

  renderGrade: function() {
    if ( this.props.renderGrade ) {
      return (
        <UserGrade user={this.props.user} />
      );
    }
  },

  render: function() {
    var factory = React.createFactory(this.props.tag);
    var photoStyles = {
      'backgroundImage': this.props.user.avatarUrl ? 'url(' + this.props.user.avatarUrl + ')' : null
    };
    var wrapperClasses = cx({
      'text-wrapper': true,
      'no-grade': !this.props.renderGrade
    });

    return factory({ className: 'user' },
      <div>

        <div className="photo" style={photoStyles} />

        <div className={wrapperClasses}>
            <h5 className="name">{this.props.user.firstName} {this.props.user.lastName}</h5>
            <h6 className="affiliation">{this.props.user.affiliation}</h6>
        </div>

        {this.renderGrade()}

        <Link to="Profile" params={{ identifier: this.props.user.id || 1 }} />

      </div>
    );
  }

});

module.exports = User;