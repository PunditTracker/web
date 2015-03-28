'use strict';

var React           = require('react/addons');
var ReactAsync      = require('react-async');
var DocumentTitle   = require('react-document-title');

var AdminRouteMixin = require('../../mixins/AdminRouteMixin');
var ListLink        = require('../../components/ListLink.jsx');

var IndexPage = React.createClass({

  mixins: [ReactAsync.Mixin, AdminRouteMixin],

  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  getInitialStateAsync: function(cb) {
    cb(null, {
      results: {},
      loading: false,
      error: null
    });
  },

  render: function() {
    return (
      <DocumentTitle title="Admin Dashboard">
      <section className="content no-hero results">

        <ul className="island">
          <ListLink to="AdminPredict">Submit Predictions as Any User</ListLink>
          <ListLink to="AdminResults">Bulk Submit Special Event Results</ListLink>
        </ul>

      </section>
      </DocumentTitle>
    );
  }

});

module.exports = IndexPage;