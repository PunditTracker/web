'use strict';

import React              from 'react/addons';
import Router             from 'react-router';

const {
  Route,
  DefaultRoute,
  NotFoundRoute
} = Router;

import App                from './App.jsx';
import HomePage           from './pages/HomePage.jsx';
import RegisterPage       from './pages/RegisterPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ResetPasswordPage  from './pages/ResetPasswordPage.jsx';
import SearchPage         from './pages/SearchPage.jsx';
import PredictPage        from './pages/PredictPage.jsx';
import CategoryPage       from './pages/CategoryPage.jsx';
import ProfilePage        from './pages/ProfilePage.jsx';
import SettingsPage       from './pages/SettingsPage.jsx';
import PredictionPage     from './pages/PredictionPage.jsx';
import AboutPage          from './pages/AboutPage.jsx';
import NotFoundPage       from './pages/NotFoundPage.jsx';
import OscarsPage         from './pages/OscarsPage.jsx';

export default (
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

    <Route name="About" path="/about" handler={AboutPage} />

    <Route name="Oscars" path="/oscars" handler={OscarsPage} />

    <NotFoundRoute handler={NotFoundPage} />

  </Route>
);