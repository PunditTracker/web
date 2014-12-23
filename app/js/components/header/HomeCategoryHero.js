/**
 * @jsx React.DOM
 */
'use strict';

var React                  = require('react/addons');
var Reflux                 = require('reflux');
var _                      = require('lodash');
var Link                   = React.createFactory(require('react-router').Link);

var HomePageActions        = require('../../actions/HomePageActions');
var LatestPredictionsStore = require('../../stores/LatestPredictionsStore');
var ListLink               = require('../ListLink');

var HomeCategoryHero = React.createClass({

  mixins: [Reflux.ListenerMixin],

  propTypes: {
    setCategory: React.PropTypes.func.isRequired,
    category: React.PropTypes.string.isRequired,
    subcategories: React.PropTypes.array.isRequired
  },

  getInitialState: function() {
    return {
      subcategory: this.props.subcategories[0] || null,
      latestPredictions: []
    };
  },

  _onLatestPredictionsChange: function(predictions) {
    if ( predictions ) {
      console.log('latest predictions change:', predictions);
      this.setState({
        latestPredictions: predictions
      });
    }
  },

  componentWillUpdate: function(nextProps) {
    if ( nextProps.category !== this.props.category ) {
      this.updateLatestPredictions(nextProps.subcategories[0]);
    }
  },

  componentWillMount: function() {
    HomePageActions.loadLatestPredictions(this.state.subcategory, this._onLatestPredictionsChange);
    this.listenTo(LatestPredictionsStore, this._onLatestPredictionsChange);
  },

  updateLatestPredictions: function(subcategory) {
    console.log('update predictions:', subcategory);
    this.setState({
      subcategory: subcategory
    }, function() {
      HomePageActions.loadLatestPredictions(this.state.subcategory, this._onLatestPredictionsChange);
    }.bind(this));
  },

  renderSubnavItems: function() {
    var classString;

    return _.map(this.props.subcategories, function(subcategory, index) {
      classString = (this.state.subcategory === subcategory) ? 'active': '';

      return (
        <ListLink to="Subcategory"
                  params={{ category: this.props.category, subcategory: subcategory }}
                  className={classString}
                  onMouseOver={this.updateLatestPredictions.bind(null, subcategory)}
                  key={index}>
          {subcategory}
        </ListLink>
      );
    }.bind(this));
  },

  renderLatestPredictions: function() {
    var predictionStyles;

    return _.map(this.state.latestPredictions, function(prediction, index) {
      predictionStyles = {
        'backgroundImage': prediction.imageUrl ? 'url(' + prediction.imageUrl + ')' : null
      };

      return (
        <div className="prediction" style={predictionStyles} key={index}>
          <h5 className="title">{prediction.title}</h5>
          <Link to="Prediction" params={{ category: this.props.category, id: prediction.id }} />
          <div className="gradient" />
        </div>
      );
    }.bind(this));
  },

  render: function() {
    var heroClasses = 'hero ' + this.props.category;
    var subnavClasses = 'subnav ' + this.props.category;

    return (
      <div className={heroClasses} onMouseLeave={this.props.setCategory.bind(null, null)}>

        <div className="wrapper">
          <ul className={subnavClasses}>
            {this.renderSubnavItems()}
          </ul>
          <h6>Latest Predictions</h6>
        </div>

        <div className="wrapper latest-predictions-container">
          {this.renderLatestPredictions()}
        </div>

      </div>
    );
  }

});

module.exports = React.createFactory(HomeCategoryHero);