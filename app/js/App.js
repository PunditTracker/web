/**
 * @jsx React.DOM
 */
'use strict';

var React         = require('react/addons');
var ActiveState = require('react-router').ActiveState;

var Footer = require('./components/Footer');

var App = React.createClass({

  mixins: [ActiveState],

  getInitialState: function() {
    return {
      category: null
    };
  },

  updatePageTitle: function(title) {
    var newPageTitle = '';

    if ( title ) {
      newPageTitle += title;
      newPageTitle += ' \u2014 ';
    }

    newPageTitle += 'PunditTracker';

    document.title = newPageTitle;
  },

  setCategory: function(category) {
    this.setState({ category: category });
  },

  render: function() {
    return (
      <div>

        <this.props.activeRouteHandler updatePageTitle={this.updatePageTitle}
                                       setCategory={this.setCategory}
                                       category={this.state.category} />

        <Footer />

      </div>
    );
  }

});

module.exports = React.createFactory(App);