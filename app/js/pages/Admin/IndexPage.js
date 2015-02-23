/**
 * @jsx React.DOM
 */
'use strict';

var React           = require('react/addons');

var AdminRouteMixin = require('../../mixins/AdminRouteMixin');
var DocumentTitle   = require('../../components/DocumentTitle');
var ListLink        = require('../../components/ListLink');

var IndexPage = React.createClass({

  mixins: [AdminRouteMixin],

  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      results: {},
      loading: false,
      error: null
    };
  },

  render: function() {
    return (
      <section className="content no-hero results">

        <DocumentTitle title="Admin Dashboard" />

        <ul className="island">
          <ListLink to="AdminPredict">Submit Predictions as Any User</ListLink>
          <ListLink to="AdminResults">Bulk Submit Special Event Results</ListLink>
        </ul>

      </section>
    );
  }

});

module.exports = React.createFactory(IndexPage);