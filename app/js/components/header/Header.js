/**
 * @jsx React.DOM
 */
'use strict';

var React                = require('react/addons');
var Reflux               = require('reflux');
var Link                 = React.createFactory(require('react-router').Link);

var HomePageActions      = require('../../actions/HomePageActions');
var HeroPredictionStore  = require('../../stores/HeroPredictionStore');
var Navigation           = require('./Navigation');
var Hero                 = require('./Hero');
var HomeCategoryHero     = require('./HomeCategoryHero');
var SubpageCategoryHero  = require('./SubpageCategoryHero');

var Header = React.createClass({

  propTypes: {
    category: React.PropTypes.string,
    isHome: React.PropTypes.bool
  },

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      prediction: {
        id: 0,
        category: ''
      }
    };
  },

  _onHeroPredictionChange: function(heroPrediction) {
    if ( heroPrediction ) {
      console.log('hero prediction change:', heroPrediction);
      this.setState({
        prediction: heroPrediction,
        backgroundImage: heroPrediction.imageUrl
      });
    }
  },

  componentWillMount: function() {
    HomePageActions.loadHeroPrediction(this._onHeroPredictionChange);
    this.listenTo(HeroPredictionStore, this._onHeroPredictionChange);
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

    if ( !this.props.category && this.props.isHome ) {
      element = (
        <Hero prediction={this.state.prediction} />
      );
    } else {
      switch ( this.props.category ) {
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

      if ( this.props.category && this.props.isHome ) {
        element = (
          <HomeCategoryHero category={this.props.category}
                            subcategories={subcategories}
                            setCategory={this.props.setCategory} />
        );
      } else if ( this.props.category && !this.props.isHome ) {
        element = (
          <SubpageCategoryHero category={this.props.category}
                               subcategories={subcategories} />
        );
      }
    }

    return element;
  },

  render: function() {
    var topContainerClasses = 'top-container ' + (this.props.category && this.props.isHome ? 'gray' : null);
    var filterClasses = 'filter ' + this.props.category;
    var imageStyle = {
      'backgroundImage': this.state.backgroundImage ? 'url(' + this.state.backgroundImage + ')' : null
    };

    return (
      <div className="header-hero-container">

        <header>

          <div className={topContainerClasses}>
            <div className="logo-container">
              <div className="logo">
                <Link to="Home" />
              </div>
            </div>
            <Navigation isHome={this.props.isHome} currentCategory={this.props.category} setCategory={this.props.setCategory} />
            {this.renderUserOptions()}
          </div>

        </header>

        {this.renderHero()}

        <div className={filterClasses} />

        <div className="background-image" style={imageStyle} />

        <div className="shadow" />

      </div>
    );
  }

});

module.exports = React.createFactory(Header);