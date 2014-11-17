/**
 * @jsx React.DOM
 */
'use strict';

var React        = require('react/addons');
var Link         = React.createFactory(require('react-router').Link);

var Navigation   = require('./Navigation');
var Hero         = require('./Hero');
var CategoryHero = require('./CategoryHero');

var Header = React.createClass({

  propTypes: {
    category: React.PropTypes.string,
    isHome: React.PropTypes.bool
  },

  getInitialState: function() {
    return {
      category: this.props.category
    };
  },

  renderUserOptions: function() {
    return (
      <div className="login-container">
        <Link to="Login">Log In</Link>
      </div>
    );
  },

  updateCategory: function(category) {
    this.setState({
      category: category
    });
  },

  renderHero: function() {
    var subcategories;
    var element;

    if ( !this.state.category ) {
      element = (
        <Hero />
      );
    } else {
      switch ( this.state.category ) {
        case 'finance':
          subcategories = ['barron\'s roundtable'];
          break;
        case 'politics':
          subcategories = ['mclaughlin group'];
          break;
        case 'sports':
          subcategories = ['nfl', 'nba', 'mlb', 'ncaab', 'ncaaf'];
          break;
        case 'entertainment':
          subcategories = ['oscars', 'emmys', 'box office'];
          break;
        case 'tech':
          subcategories = [];
          break;
        default:
          subcategories = [];
      }

      element = (
        <CategoryHero category={this.state.category} subcategories={subcategories} isHome={this.props.isHome} />
      );
    }

    return element;
  },

  render: function() {
    var filterClasses = 'filter ' + this.state.category;

    return (
      <header onMouseLeave={this.updateCategory.bind(null, 'sports')}>

        <div className="top-container">
          <div className="logo-container">
            <div className="logo">
              <Link to="Home" />
            </div>
          </div>
          <Navigation currentCategory={this.state.category} updateCategory={this.updateCategory} />
          {this.renderUserOptions()}
        </div>

        {this.renderHero()}

        <div className={filterClasses} />

        <div className="shadow" />

      </header>
    );
  }

});

module.exports = React.createFactory(Header);