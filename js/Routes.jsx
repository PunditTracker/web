'use strict';

var React              = require('react/addons');
var Router             = require('react-router');
var Route              = Router.Route;
var DefaultRoute       = Router.DefaultRoute;
var NotFoundRoute      = Router.NotFoundRoute;

var App                = require('./App.jsx');
var HomePage           = require('./pages/HomePage.jsx');
var RegisterPage       = require('./pages/RegisterPage.jsx');
var ForgotPasswordPage = require('./pages/ForgotPasswordPage.jsx');
var ResetPasswordPage  = require('./pages/ResetPasswordPage.jsx');
var SearchPage         = require('./pages/SearchPage.jsx');
var PredictPage        = require('./pages/PredictPage.jsx');
var CategoryPage       = require('./pages/CategoryPage.jsx');
var ProfilePage        = require('./pages/ProfilePage.jsx');
var SettingsPage       = require('./pages/SettingsPage.jsx');
var PredictionPage     = require('./pages/PredictionPage.jsx');
var AboutPage          = require('./pages/AboutPage.jsx');
var NotFoundPage       = require('./pages/NotFoundPage.jsx');

module.exports = (
  <Route path="/" handler={App}>

    <DefaultRoute handler={HomePage} />

    <Route name="Home" path="/" handler={HomePage} />

    <Route name="Register" path="/register" handler={RegisterPage} />

    <Route name="ForgotPassword" path="/forgot" handler={ForgotPasswordPage} />

    <Route name="ResetPassword" path="/reset/:userId/:resetKey" handler={ResetPasswordPage} />

    <Route name="Search" path="/search" handler={SearchPage} />

    <Route name="Category" path="/category/:category" handler={CategoryPage} />

    <Route name="Predict" path="/predict" handler={PredictPage} />

    <Route name="Prediction" path="/prediction/:identifier" handler={PredictionPage} />

    <Route name="Profile" path="/user/:identifier" handler={ProfilePage} />

    <Route name="Settings" path="/settings" handler={SettingsPage} />

    <Route name="About" path="/about" handler ={AboutPage} />

    <NotFoundRoute handler={NotFoundPage} />

  </Route>
);