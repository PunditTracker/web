'use strict';

var express        = require('express');
var morgan         = require('morgan');
var compression    = require('compression');
var methodOverride = require('method-override');
var bodyParser     = require('body-parser');
var favicon        = require('serve-favicon');
var React          = require('react/addons');
var Router         = require('react-router');
var DocumentTitle  = require('react-document-title');
var ReactAsync     = require('react-async');
var _              = require('lodash');
var url            = require('url');
var dotenv         = require('dotenv');
var app            = express();
var Routes;
var Html;

/* ====================================================== */

// Ensure .env variables are available at process.env.*
dotenv.load();

/* ====================================================== */

// Require JSX files as node modules
require('babel/register');
Routes = require('./js/Routes.jsx');
Html = require('./js/Html.jsx');

/* ====================================================== */

app.use(morgan('dev'));     // Logs all requests to the console
app.use(compression());     // Compresses response data with gzip/deflate
app.use(methodOverride());  // Simulates DELETE and PUT
app.use(bodyParser.json()); // Parses req.body json from html POST
app.use(bodyParser.urlencoded({ extended: true })); // Parses urlencoded req.body, including extended syntax
app.set('json spaces', 0);  // Remove superfluous spaces from JSON responses

/* ====================================================== */

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// serve all asset files from necessary directories
// TODO: find a way to get rid of these wildcards?
app.use(favicon(__dirname + '/build/favicon.ico'));
app.use('*/js', express.static(__dirname + '/build/js'));
app.use('*/images', express.static(__dirname + '/build/images'));
app.use('*/css', express.static(__dirname + '/build/css'));
app.use('*/fonts', express.static(__dirname + '/build/fonts'));
app.use(/\/.*\.(png|ico|xml|json)\/?/gi, express.static(__dirname + '/build/'));

// Serve React app for all main routes
app.get('/*' ,function(req,res) {
  Router.run(Routes, req.path, function(Handler, state) {
    var title = DocumentTitle.peek();
    var query = _.isEmpty(state.query) ? url.parse(req.url, true).query : state.query;
    var HandlerComponent = React.createElement(Handler, { params: state.params, query: query });
    var HtmlComponent;

    ReactAsync.renderToStringAsync(HandlerComponent, function(err, markup/*, data*/) {
      if ( err ) {
        console.trace('error rendering to string:', err);
        res.status(500).json({ status: 500, message: err });
      } else {
        // Currently, the 'Not Found' route title flashes before loading actual route and title
        // TODO: real logic to prevent this
        if ( title && title.indexOf('Not Found') !== -1 ) {
          title = 'PunditTracker';
        }
        HtmlComponent = React.createElement(Html, { title: title, markup: markup });
        res.send('<!DOCTYPE html>\n' + React.renderToString(HtmlComponent));
      }
    });

    DocumentTitle.rewind(); // to prevent memory leak
  });
});

/* ====================================================== */

// start the server
app.listen(process.env.PORT || 3000);