/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');

var ProfilePage = React.createClass({

  render: function() {
    return (
      <section className="profile-page">

        profile page

      </section>
    );
  }

});

module.exports = React.createFactory(ProfilePage);