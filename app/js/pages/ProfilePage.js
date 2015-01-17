/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react');

var ProfilePage = React.createClass({

  render: function() {
    return (
      <section className="content no-hero profile">

        profile page

      </section>
    );
  }

});

module.exports = React.createFactory(ProfilePage);