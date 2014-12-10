/**
 * @jsx React.DOM
 */
'use strict';

var React  = require('react/addons');

var Footer = require('./components/Footer');

var App = React.createClass({

  getInitialState: function() {
    return {
      category: null
    };
  },

  setCategory: function(category) {
    this.setState({ category: category });
  },

  render: function() {
    return (
      <div>

        <this.props.activeRouteHandler setCategory={this.setCategory}
                                       category={this.state.category} />

        <Footer />

      </div>
    );
  }

});

module.exports = React.createFactory(App);