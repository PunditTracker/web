/**
 * @jsx React.DOM
 */
'use strict';

var Route               = require('react-router').Route;
var DefaultRoute        = require('react-router').DefaultRoute;
var NotFoundRoute       = require('react-router').NotFoundRoute;

var App                 = require('./App');
var HomePage            = require('./pages/HomePage');
var LoginPage           = require('./pages/LoginPage');
var RegisterPage        = require('./pages/RegisterPage');
var SearchPage          = require('./pages/SearchPage');
var PredictPage         = require('./pages/PredictPage');
var CategoryPage        = require('./pages/CategoryPage');
var ProfilePage         = require('./pages/ProfilePage');
var PredictionPage      = require('./pages/PredictionPage');
var NotFoundPage        = require('./pages/NotFoundPage');

module.exports = (
  <Route handler={App}>

    <DefaultRoute handler={HomePage} />

    <Route name='Home' path='/' handler={HomePage} />

    <Route name='Login' path='/login' handler={LoginPage} />
    <Route name='Register' path='/register' handler={RegisterPage} />

    <Route name='Search' path='/search' handler={SearchPage} />

    <Route name='Predict' path='/predict' handler={PredictPage} />

    <Route name='Category' path='/:category' handler={CategoryPage} />

    <Route name='Profile' path='/user/:identifier' handler={ProfilePage} />

    <Route name='Prediction' path='/prediction/:identifier' handler={PredictionPage} />

    <NotFoundRoute handler={NotFoundPage} />

  </Route>
);