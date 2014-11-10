/**
 * @jsx React.DOM
 */
'use strict';

var Routes         = require('react-router').Routes;
var Route          = require('react-router').Route;
var DefaultRoute   = require('react-router').DefaultRoute;
var NotFoundRoute  = require('react-router').NotFoundRoute;
var App            = require('./App');
var HomePage       = require('./pages/HomePage');
var SearchPage     = require('./pages/SearchPage');
var PredictionPage = require('./pages/PredictionPage');
var UserPage       = require('./pages/UserPage');
var NotFoundPage   = require('./pages/NotFoundPage');

module.exports = (
  <Routes location='history'>

    <Route handler={App}>
      <DefaultRoute handler={HomePage} />
      <Route name='Home' path='/' handler={HomePage} />
      <Route name='Search' path='/search' handler={SearchPage} />
      <Route name='Prediction' path='/prediction/:id' handler={PredictionPage} />
      <Route name='Profile' path='/user/:id' handler={UserPage} />
      <NotFoundRoute handler={NotFoundPage} />
    </Route>

  </Routes>
);