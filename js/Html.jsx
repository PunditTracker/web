/*global FB:false */

'use strict';

var React    = require('react/addons');

var APIUtils = require('./utils/APIUtils');

var Html = React.createClass({

  propTypes: {
    title: React.PropTypes.string,
    markup: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      title: '',
      markup: ''
    };
  },

  componentDidMount: function() {
    if ( window ) {
      window.fbAsyncInit = function() {
        FB.init({
          appId   : '428993863813184',
          xfbml   : true,
          version : 'v2.2'
        });
      };

      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
  },

  render: function() {
    var isProd = this.props.env.toLowerCase() === 'production';
    var stylesheetPath = isProd ? '//assets.pundittracker.com/css/main.css' : 'css/main.css';
    var jsPath = isProd ? '//assets.pundittracker.com/js/main.js' : 'js/main.js';

    console.log('env:', this.props.env);
    return (
      <html className="no-js" lang="">

        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="description" content="" />
          <meta name="viewport" content="width=device-width" />

          <title>{APIUtils.buildPageTitle(this.props.title)}</title>

          <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png" />
          <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png" />
          <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png" />
          <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />
          <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png" />
          <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
          <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
          <meta name="theme-color" content="#ffffff" />

          <link rel="stylesheet" href={stylesheetPath} />
          <script src={jsPath} />
        </head>

        <body dangerouslySetInnerHTML={{ __html: this.props.markup }} />

      </html>
    );
  }

});

module.exports = Html;