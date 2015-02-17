/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');
var $     = require('jquery');

var OscarsHero = React.createClass({

  componentDidMount: function() {
    var $hero = $(this.getDOMNode());

    setTimeout(function() {
      if( $(window).scrollTop() <= 0 ) {
          $hero.addClass('shrink');
      }
    }, 3000);
  },

  scrollDown: function(evt) {
    var $content = $('.content');
    var offset = parseFloat($content.css('padding-top'));

    evt.preventDefault();

    $('html, body').animate({
      'scrollTop': $content.offset().top - offset
    }, 500);
  },

  render: function() {
    return (
      <div className="hero short oscars" id="hero">

        <div className="oscars-cover">
          <i className="logo" />
          <a className="scroll down" onClick={this.scrollDown}>
            <span>Make your picks</span>
            <br />
            <i className="fa fa-chevron-down" />
          </a>
        </div>

      </div>
    );
  }

});

module.exports = React.createFactory(OscarsHero);