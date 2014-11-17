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
var SubcategoryListPage = require('./pages/Category/SubcategoryList');
var SubcategoryPage     = require('./pages/Category/Subcategory');
var PredictionPage      = require('./pages/Category/Prediction');
var UserPage            = require('./pages/UserPage');
var NotFoundPage        = require('./pages/NotFoundPage');

module.exports = (
  <Routes location='history'>

    <Route handler={App}>
      <DefaultRoute handler={HomePage} />

      <Route name='Home' path='/' handler={HomePage} />

      <Route name='Login' path='/login' handler={LoginPage} />
      <Route name='Register' path='/register' handler={RegisterPage} />

      <Route name='Search' path='/search' handler={SearchPage} />

      <Route name='Category' path='/category/:category' handler={CategoryPage}>
        <DefaultRoute handler={SubcategoryListPage} />
        <Route name='Subcategory' path='/category/:category/:subcategory' handler={SubcategoryPage} />
        <Route name='Prediction' path='/category/:category/prediction/:id' handler={PredictionPage} />
      </Route>

      <Route name='Profile' path='/user/:id' handler={UserPage} />

      <NotFoundRoute handler={NotFoundPage} />
    </Route>

  </Routes>
);