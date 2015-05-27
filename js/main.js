'use strict';

import React     from 'react/addons';
import Router    from 'react-router';

import Routes    from './Routes.jsx';
import Analytics from './Analytics';
const subdomain  = window.location.host.split('.')[0];
const hostname   = window.location.hostname;

if ( subdomain === 'dev' || hostname === 'localhost' || process.env.NODE_ENV !== 'production' ) {
  window.React = React; // Enable React devtools
}

document.addEventListener('DOMContentLoaded', () => {
  Router.run(Routes, Router.HistoryLocation, (Root, state) => {
    React.render(<Root params={state.params} query={state.query} />, document.body);
    Analytics.send(state);
  });
});
