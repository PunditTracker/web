/**
 * @jsx React.DOM
 */
'use strict';

var Route              = require('react-router').Route;
var DefaultRoute       = require('react-router').DefaultRoute;
var NotFoundRoute      = require('react-router').NotFoundRoute;

var App                = require('./App');
var HomePage           = require('./pages/HomePage');
var RegisterPage       = require('./pages/RegisterPage');
var ForgotPasswordPage = require('./pages/ForgotPasswordPage');
var ResetPasswordPage  = require('./pages/ResetPasswordPage');
var SearchPage         = require('./pages/SearchPage');
var PredictPage        = require('./pages/PredictPage');
var CategoryPage       = require('./pages/CategoryPage');
var ProfilePage        = require('./pages/ProfilePage');
//var PredictionPage = require('./pages/PredictionPage');
var AboutPage          = require('./pages/AboutPage');
var NotFoundPage       = require('./pages/NotFoundPage');

module.exports = (
  <Route handler={App}>

    <DefaultRoute handler={HomePage} />

    <Route name='Home' path='/' handler={HomePage} />

    <Route name='Register' path='/register' handler={RegisterPage} />

    <Route name='ForgotPassword' path='/forgot' handler={ForgotPasswordPage} />

    <Route name='ResetPassword' path='/reset/:userId/:resetKey' handler={ResetPasswordPage} />

    <Route name='Search' path='/search' handler={SearchPage} />

    <Route name='Predict' path='/predict' handler={PredictPage} />

    <Route name='Category' path='/:category' handler={CategoryPage} />

    <Route name='Profile' path='/user/:identifier' handler={ProfilePage} />

    <Route name='About' path='/about' handler ={AboutPage} />

    <NotFoundRoute handler={NotFoundPage} />

  </Route>
);