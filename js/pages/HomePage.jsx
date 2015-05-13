'use strict';

var React                    = require('react/addons');
var ReactAsync               = require('react-async');
var Preloaded                = ReactAsync.Preloaded;
var Reflux                   = require('reflux');
var DocumentTitle            = require('react-document-title');

var APIUtils                 = require('../utils/APIUtils');
var HomePageActions          = require('../actions/HomePageActions');
var HomePagePredictionsStore = require('../stores/HomePagePredictionsStore');
var PredictionSetsStore      = require('../stores/PredictionSetsStore');
var MasonryContainer         = require('../components/MasonryContainer.jsx');
var Hero                     = require('../components/Hero.jsx');
var PredictionCard           = require('../components/PredictionCard.jsx');
var RecentBlogPosts          = require('../components/RecentBlogPosts.jsx');
var FeaturedUsers            = require('../components/FeaturedUsers.jsx');
//var PredictionSet            = require('../components/PredictionSet.jsx');
var FacebookCard             = require('../components/FacebookCard.jsx');
var CategoryLinkCard         = require('../components/CategoryLinkCard.jsx');

var HomePage = React.createClass({

  mixins: [ReactAsync.Mixin, Reflux.ListenerMixin],

  propTypes: {
    currentUser: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      currentUser: {}
    };
  },

  getInitialStateAsync: function(cb) {
    HomePageActions.loadPredictions(function(err, predictions) {
      //HomePageActions.loadPredictionSets(function(err, predictionSets) {
        cb(null, {
          predictions: predictions || [],
          predictionSets: [],
          error: null
        });
      //});
    });
  },

  _onHomePagePredictionsChange: function(err, predictions) {
    if ( err ) {
      this.setState({ error: err.message });
    } else {
      this.setState({ predictions: predictions || [], error: null });
    }
  },

  _onPredictionSetChange: function(err, predictionSets) {
    if ( err ) {
      this.setState({ error: err.message });
    } else {
      this.setState({ predictionSets: predictionSets || [], error: null });
    }
  },

  componentDidMount: function() {
    this.listenTo(HomePagePredictionsStore, this._onHomePagePredictionsChange);
    this.listenTo(PredictionSetsStore, this._onPredictionSetChange);
  },

  getPredictionAtIndex: function(index) {
    var prediction = {};

    if ( this.state.predictions && this.state.predictions[index] ) {
      prediction = this.state.predictions[index].prediction;
    }

    return prediction;
  },

  render: function() {
    return (
      <DocumentTitle title={APIUtils.buildPageTitle('Home')}>
      <section className="page home">

        <Preloaded>
          <Hero />
        </Preloaded>

        <div className="content">
          <MasonryContainer className="card-grid flush--bottom">
            <div className="masonry-item w-1-3">
              <PredictionCard currentUser={this.props.currentUser} prediction={this.getPredictionAtIndex(0)} />
            </div>
            <div className="masonry-item w-1-3">
              <PredictionCard currentUser={this.props.currentUser} prediction={this.getPredictionAtIndex(1)} />
            </div>
            <div className="masonry-item w-1-3">
              <PredictionCard currentUser={this.props.currentUser} prediction={this.getPredictionAtIndex(2)} />
            </div>
            <div className="masonry-item w-1-3">
              <PredictionCard currentUser={this.props.currentUser} className="tall-2" prediction={this.getPredictionAtIndex(3)} />
            </div>
            <div className="masonry-item w-1-3">
              <PredictionCard currentUser={this.props.currentUser} prediction={this.getPredictionAtIndex(4)} />
            </div>
            <div className="masonry-item w-1-3">
              <RecentBlogPosts />
            </div>
            <div className="masonry-item w-1-3">
              <PredictionCard currentUser={this.props.currentUser} prediction={this.getPredictionAtIndex(5)} />
            </div>
            <div className="masonry-item w-1-3">
              <PredictionCard currentUser={this.props.currentUser} prediction={this.getPredictionAtIndex(6)} />
            </div>
            <div className="masonry-item w-1-3">
              <PredictionCard currentUser={this.props.currentUser} prediction={this.getPredictionAtIndex(7)} />
            </div>
            <div className="masonry-item w-1-3">
              <PredictionCard currentUser={this.props.currentUser} prediction={this.getPredictionAtIndex(8)} />
            </div>
            <div className="masonry-item w-1-3">
              <FeaturedUsers />
            </div>
            <div className="masonry-item w-2-3">
              <PredictionCard currentUser={this.props.currentUser} prediction={this.getPredictionAtIndex(9)} />
            </div>
          </MasonryContainer>

          <MasonryContainer className="card-grid flush--bottom">
            <div className="masonry-item w-1-3">
              <PredictionCard currentUser={this.props.currentUser} className="tall-3-2" prediction={this.getPredictionAtIndex(10)} />
            </div>
            <div className="masonry-item w-1-3">
              <CategoryLinkCard category="finance" />
            </div>
            <div className="masonry-item w-1-3">
              <PredictionCard currentUser={this.props.currentUser} prediction={this.getPredictionAtIndex(11)} />
            </div>
            <div className="masonry-item w-1-3">
              <PredictionCard currentUser={this.props.currentUser} prediction={this.getPredictionAtIndex(12)} />
            </div>
            <div className="masonry-item w-1-3">
              <PredictionCard currentUser={this.props.currentUser} className="tall-2" prediction={this.getPredictionAtIndex(13)} />
            </div>
            <div className="masonry-item w-1-3">
              <FacebookCard />
            </div>
            <div className="masonry-item w-1-3">
              <PredictionCard currentUser={this.props.currentUser} prediction={this.getPredictionAtIndex(14)} />
            </div>
            <div className="masonry-item w-1-3">
              <PredictionCard currentUser={this.props.currentUser} className="tall-3-2" prediction={this.getPredictionAtIndex(15)} />
            </div>
            <div className="masonry-item w-2-3">
              <PredictionCard currentUser={this.props.currentUser} prediction={this.getPredictionAtIndex(16)} />
            </div>
          </MasonryContainer>

        </div>

      </section>
      </DocumentTitle>
    );
  }

});

module.exports = HomePage;

// <div className="pure-g card-grid flush--ends">
//   <div className="pure-u-1 full-width-outer flush--bottom">
//     <PredictionSet set={this.state.predictionSets[0]} />
//   </div>
// </div>