/** @jsx React.DOM */
'use strict';

var React     = require('react/addons');
var Router    = require('react-router');

var routes    = require('./Routes');
var Analytics = require('./Analytics');

if ( process.env.NODE_ENV !== 'production' ) {
  window.React = React; // Enable React devtools
}

Router.HistoryLocation.replace(Router.HashLocation.getCurrentPath());

Router.run(routes, Router.HistoryLocation, function(Handler, state) {
  React.render(<Handler params={state.params} query={state.query} />, document.getElementById('app'));
  Analytics.send(state);
});