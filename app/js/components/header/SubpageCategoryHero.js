/**
 * @jsx React.DOM
 */
'use strict';

var React                   = require('react/addons');
var Reflux                  = require('reflux');
var _                       = require('underscore');
var Link                    = React.createFactory(require('react-router').Link);

var CurrentSubcategoryStore = require('../../stores/CurrentSubcategoryStore');
var ListLink                = require('../ListLink');

var SubpageCategoryHero = React.createClass({

  mixins: [Reflux.ListenerMixin],

  propTypes: {
    category: React.PropTypes.string.isRequired,
    subcategories: React.PropTypes.array.isRequired
  },

  getInitialState: function() {
    return {
      featuredPrediction: {}
    };
  },

  _onSubcategoryChange: function(subcategory) {
    this.setState({ featuredPrediction: subcategory.featuredPrediction });
  },

  componentWillMount: function() {
    this.listenTo(CurrentSubcategoryStore, this._onSubcategoryChange);
  },

  renderSubnavItems: function() {
    return _.map(this.props.subcategories, function(subcategory, index) {
      return (
        <ListLink to="Subcategory"
                  params={{ category: this.props.category, subcategory: subcategory }}
                  key={index}>
          {subcategory}
        </ListLink>
      );
    }.bind(this));
  },

  renderFeaturedPrediction: function() {
    var element = null;

    if ( !_.isEmpty(this.state.featuredPrediction) ) {
      element = (
        <div className="wrapper table inherit-height">
          <div className="td full-width full-height">
            <h1 className="title">{this.state.featuredPrediction.title}</h1>
            <h3 className="cta">
              Make your prediction heard.
              <Link to="Prediction"
                    params={{ category: this.state.featuredPrediction.category, id: this.state.featuredPrediction.id }}>
                Predict Now <i className="fa fa-arrow-right" />
              </Link>
            </h3>
          </div>
        </div>
      );
    }

    return element;
  },

  render: function() {
    var heroClasses = 'hero ' + this.props.category;
    var subnavClasses = 'subnav ' + this.props.category;

    return (
      <div className={heroClasses}>

        <div className="wrapper">
          <ul className={subnavClasses}>
            {this.renderSubnavItems()}
          </ul>
        </div>

        {this.renderFeaturedPrediction()}

      </div>
    );
  }

});

module.exports = React.createFactory(SubpageCategoryHero);