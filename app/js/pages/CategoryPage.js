/**
 * @jsx React.DOM
 */
'use strict';

var React                = require('react/addons');
var Reflux               = require('reflux');
var _                    = require('lodash');
var Navigation           = React.createFactory(require('react-router').Navigation);

var APIUtils             = require('../utils/APIUtils');
var GlobalActions        = require('../actions/GlobalActions');
var ViewingCategoryStore = require('../stores/ViewingCategoryStore');
var DocumentTitle        = require('../components/DocumentTitle');
var MasonryContainer     = require('../components/MasonryContainer');
var PredictionCard       = require('../components/PredictionCard');

var CategoryPage = React.createClass({

  mixins: [Reflux.ListenerMixin, Navigation],

  propTypes: {
    currentUser: React.PropTypes.object,
    categories: React.PropTypes.array.isRequired
  },

  getDefaultProps: function() {
    return {
      categories: []
    };
  },

  getInitialState: function() {
    return {
      title: APIUtils.titleCase(this.props.params.category),
      predictions: [],
      error: null
    };
  },

  _onPredictionsChange: function(err, predictions) {
    if ( err ) {
      this.setState({ error: err });
    } else {
      this.setState({ predictions: predictions || [], error: null });
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if ( !this.props.params.category ) {
      this.transitionTo('Home');
    } else if ( this.props.params.category !== nextProps.params.category ) {
      this.setState({ title: APIUtils.titleCase(nextProps.params.category) });
      GlobalActions.loadCategory(nextProps.params.category, this._onPredictionsChange);
    }
  },

  componentDidMount: function() {
    if ( !this.props.params.category ) {
      this.transitionTo('Home');
    } else {
      GlobalActions.loadCategory(this.props.params.category, this._onPredictionsChange);
      this.listenTo(ViewingCategoryStore, this._onPredictionsChange);
    }
  },

  renderFeaturedPredictions: function() {
    return _.map(this.state.featuredPredictions, function(prediction, index) {
      return (
        <PredictionCard className="pur-u-1-3" prediction={prediction} key={index} />
      );
    });
  },

  renderPredictions: function() {
    var randomInt;
    var containerClasses;
    var cardClasses;

    return _.map(this.state.predictions, function(prediction, index) {
      randomInt = APIUtils.randomIntFromInterval(1, 4);
      containerClasses = 'masonry-item ';

      if ( randomInt ===  1 ) {
        containerClasses += 'w-1-3';
        cardClasses = 'tall-3-2';
      } else if ( randomInt === 2 ) {
        containerClasses += 'w-2-3';
        cardClasses = null;
      } else {
        containerClasses += 'w-1-3';
        cardClasses = null;
      }

      return (
        <div className={containerClasses} key={index}>
          <PredictionCard className={cardClasses} prediction={prediction} />
        </div>
      );
    });
  },

  render: function() {
    var featuredStyles = {
      'backgroundImage': null
    };

    return (
      <section className="content no-hero category">

        <DocumentTitle title={this.state.title} />

        <div className="pure-g card-grid">
          <div className="pure-u-1 full-width-outer flush--bottom">
            <div className="prediction-set-card" style={featuredStyles}>
              <div className="background"><div className="scrim" /></div>
              <h3 className="question">Featured {this.state.title} Predictions</h3>
              <div className="pure-g card-grid">
                {this.renderFeaturedPredictions()}
              </div>
            </div>
          </div>
        </div>

        <MasonryContainer className="card-grid">
          {this.renderPredictions()}
        </MasonryContainer>

      </section>
    );
  }

});

module.exports = React.createFactory(CategoryPage);