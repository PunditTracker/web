/**
 * @jsx React.DOM
 */
'use strict';

var React         = require('react/addons');
var ActiveState = require('react-router').ActiveState;

var Header = require('./components/header/Header');
var Footer = require('./components/Footer');

var App = React.createClass({

  mixins: [ActiveState],

  updatePageTitle: function(title) {
    var newPageTitle = '';

    if ( title ) {
      newPageTitle += title;
      newPageTitle += ' \u2014 ';
    }

    newPageTitle += 'PunditTracker';

    document.title = newPageTitle;
  },

  render: function() {
    return (
      <div>

        <Header isHome={this.isActive('Home')} />

        <this.props.activeRouteHandler updatePageTitle={this.updatePageTitle} />

        <Footer />

      </div>
    );
  }

});

module.exports = React.createFactory(App);