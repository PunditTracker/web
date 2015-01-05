/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');

var Footer = React.createClass({

  render: function() {
    return (
      <footer>

        <div className="pure-g card-grid">
          <div className="pure-u-1-3">
            <ul>
              <li className="double">
                <a href="">
                  <div className="logo">
                    <span>Pundit</span><br /><span>Tracker</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div className="pure-u-1-3"></div>
          <div className="pure-u-1-3"></div>
        </div>

        <div className="pure-g card-grid">
          <div className="pure-u-1-3">
            <ul>
              <li><a href="">Finance</a></li>
              <li><a href="">Politics</a></li>
              <li><a href="">Sports</a></li>
              <li>
                <ul>
                  <li><a href="">NFL</a></li>
                  <li><a href="">NBA</a></li>
                </ul>
              </li>
              <li><a href="">Media</a></li>
            </ul>
          </div>
          <div className="pure-u-1-3">
            <ul>
              <li><a href="">About</a></li>
              <li><a href="">Jobs</a></li>
              <li><a href="">Blog</a></li>
              <li><a href="">Blogs we like</a></li>
              <li><a href="">Contact</a></li>
              <li><a href="">Feedback</a></li>
            </ul>
          </div>
          <div className="pure-u-1-3">
            <ul>
              <li><a href="">Facebook</a></li>
              <li><a href="">Twitter</a></li>
              <li>
                <ul>
                  <li><a href="">@ptraxfinance</a></li>
                  <li><a href="">@ptraxpolitics</a></li>
                  <li><a href="">@ptraxsports</a></li>
                  <li><a href="">@ptraxentertain</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

      </footer>
    );
  }

});

module.exports = React.createFactory(Footer);