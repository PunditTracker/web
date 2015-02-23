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
var SettingsPage       = require('./pages/SettingsPage');
//var PredictionPage = require('./pages/PredictionPage');
var AboutPage          = require('./pages/AboutPage');
var AdminIndexPage     = require('./pages/Admin/IndexPage');
var AdminPredictPage   = require('./pages/Admin/PredictPage');
var AdminResultsPage   = require('./pages/Admin/ResultsPage');
var NotFoundPage       = require('./pages/NotFoundPage');
var OscarsPage         = require('./pages/OscarsPage');

module.exports = (
  <Route handler={App}>

    <DefaultRoute handler={HomePage} />

    <Route name='Home' path='/' handler={HomePage} />

    <Route name='Register' path='/register' handler={RegisterPage} />

    <Route name='ForgotPassword' path='/forgot' handler={ForgotPasswordPage} />

    <Route name='ResetPassword' path='/reset/:userId/:resetKey' handler={ResetPasswordPage} />

    <Route name='Search' path='/search' handler={SearchPage} />

    <Route name='Predict' path='/predict' handler={PredictPage} />

    <Route name='Profile' path='/user/:identifier' handler={ProfilePage} />

    <Route name='Settings' path='/settings' handler={SettingsPage} />

    <Route name='About' path='/about' handler ={AboutPage} />

    <Route name='AdminIndex' path='/admin' handler={AdminIndexPage} />

    <Route name='AdminPredict' path='/admin/predict' handler={AdminPredictPage} />

    <Route name='AdminResults' path='/admin/results' handler={AdminResultsPage} />

    <Route name='Oscars' path='/oscars' handler={OscarsPage} />

    <Route name='Category' path='/:category' handler={CategoryPage} />

    <NotFoundRoute handler={NotFoundPage} />

  </Route>
);