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
      error: null,
      loading: true
    };
  },

  _onPredictionsChange: function(err, predictions) {
    if ( err ) {
      this.setState({ loading: false, error: err });
    } else {
      this.setState({
        loading: false,
        predictions: predictions || [],
        error: null
      });
    }
  },

  componentWillReceiveProps: function(nextProps) {
    var hasNewCategory = this.props.params.category !== nextProps.params.category;
    var hasNewCategories = nextProps.categories && nextProps.categories.length !== this.props.categories.length;
    var categoryId;

    if ( !this.props.params.category ) {
      this.transitionTo('Home');
    } else if ( hasNewCategory || hasNewCategories ) {
      categoryId = APIUtils.getCategoryId(nextProps.params.category, nextProps.categories);

      this.setState({
        title: APIUtils.titleCase(nextProps.params.category),
        predictions: [],
        loading: true
      });

      GlobalActions.loadCategory(categoryId, this._onPredictionsChange);
    }
  },

  componentDidMount: function() {
    var categoryId;

    if ( !this.props.params.category ) {
      this.transitionTo('Home');
    } else if ( this.props.params.category && this.props.categories.length ) {
      categoryId = APIUtils.getCategoryId(this.props.params.category, this.props.categories);
      GlobalActions.loadCategory(categoryId, this._onPredictionsChange);
    }

    this.listenTo(ViewingCategoryStore, this._onPredictionsChange);
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

        <MasonryContainer className="card-grid">
          {this.renderPredictions()}
        </MasonryContainer>

      </section>
    );
  }

});

module.exports = React.createFactory(CategoryPage);

// <div className="pure-g card-grid">
//   <div className="pure-u-1 full-width-outer flush--bottom">
//     <div className="prediction-set-card" style={featuredStyles}>
//       <div className="background"><div className="scrim" /></div>
//       <h3 className="question">Featured {this.state.title} Predictions</h3>
//       <div className="pure-g card-grid">
//         {this.renderFeaturedPredictions()}
//       </div>
//     </div>
//   </div>
// </div>