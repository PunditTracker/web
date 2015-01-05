/**
 * @jsx React.DOM
 */
'use strict';

var Routes              = require('react-router').Routes;
var Route               = require('react-router').Route;
var DefaultRoute        = require('react-router').DefaultRoute;
var NotFoundRoute       = require('react-router').NotFoundRoute;
var App                 = require('./App');
var HomePage            = require('./pages/HomePage');
var LoginPage           = require('./pages/LoginPage');
var RegisterPage        = require('./pages/RegisterPage');
var SearchPage          = require('./pages/SearchPage');
var CategoryPage        = require('./pages/CategoryPage');
var ProfilePage         = require('./pages/ProfilePage');
var NotFoundPage        = require('./pages/NotFoundPage');

module.exports = (
  <Routes location='history'>

    <Route handler={App}>
      <DefaultRoute handler={HomePage} />

      <Route name='Home' path='/' handler={HomePage} />

      <Route name='Login' path='/login' handler={LoginPage} />
      <Route name='Register' path='/register' handler={RegisterPage} />

      <Route name='Search' path='/search' handler={SearchPage} />

      <Route name='Category' path='/category/:category' handler={CategoryPage} />

      <Route name='Profile' path='/user/:id' handler={ProfilePage} />

      <NotFoundRoute handler={NotFoundPage} />
    </Route>

  </Routes>
);