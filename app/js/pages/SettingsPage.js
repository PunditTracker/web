/**
 * @jsx React.DOM
 */
'use strict';

var React                   = require('react/addons');

var AuthenticatedRouteMixin = require('../mixins/AuthenticatedRouteMixin');
var DocumentTitle           = require('../components/DocumentTitle');

var SettingsPage = React.createClass({

  mixins: [AuthenticatedRouteMixin],

  render: function() {
    return (
      <section className="content no-hero search">

        <DocumentTitle title="Account Settings" />

        <div className="container slim">
          Settings Page
        </div>

      </section>
    );
  }

});

module.exports = React.createFactory(SettingsPage);