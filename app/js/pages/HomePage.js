/**
 * @jsx React.DOM
 */
'use strict';

var React          = require('react/addons');

var PredictionCard = require('../components/PredictionCard');

var HomePage = React.createClass({

  propTypes: {
    updatePageTitle: React.PropTypes.func
  },

  componentDidMount: function() {
    this.props.updatePageTitle('Home');
  },

  render: function() {
    return (
      <section className="home-page">

        <PredictionCard />

      </section>
    );
  }

});

module.exports = React.createFactory(HomePage);