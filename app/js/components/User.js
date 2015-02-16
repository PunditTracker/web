/**
 * @jsx React.DOM
 */
'use strict';

var React     = require('react/addons');
var Link      = React.createFactory(require('react-router').Link);

var UserGrade = require('./UserGrade');

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
      'backgroundImage': this.props.user.avatarUrl ? 'url(' + this.props.user.avatarUrl + ')' : null
    };

    return factory({ className: 'user' },
      <div>

        <div className="photo" style={photoStyles} />

        <div className="text-wrapper">
            <h5 className="name">{this.props.user.firstName} {this.props.user.lastName}</h5>
            <h6 className="affiliation">{this.props.user.affiliation}</h6>
        </div>

        <UserGrade user={this.props.user} />

        <Link to="Profile" params={{ identifier: this.props.user.id || 1 }} />

      </div>
    );
  }

});

module.exports = React.createFactory(User);