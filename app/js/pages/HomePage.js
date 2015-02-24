/**
 * @jsx React.DOM
 */
'use strict';

var React                    = require('react/addons');
var Reflux                   = require('reflux');

var HomePageActions          = require('../actions/HomePageActions');
var HomePagePredictionsStore = require('../stores/HomePagePredictionsStore');
var PredictionSetsStore      = require('../stores/PredictionSetsStore');
var DocumentTitle            = require('../components/DocumentTitle');
var MasonryContainer         = require('../components/MasonryContainer');
var Hero                     = require('../components/Hero');
var PredictionCard           = require('../components/PredictionCard');
var RecentBlogPosts          = require('../components/RecentBlogPosts');
var FeaturedUsers            = require('../components/FeaturedUsers');
var PredictionSet            = require('../components/PredictionSet');
var FacebookCard             = require('../components/FacebookCard');
var CategoryLinkCard         = require('../components/CategoryLinkCard');

var HomePage = React.createClass({

  mixins: [Reflux.ListenerMixin],

  propTypes: {
    currentUser: React.PropTypes.object
  },

  getDefaultProps: function() {
    return {
      currentUser: {}
    };
  },

  getInitialState: function() {
    return {
      predictions: [],
      predictionSets: [],
      error: null
    };
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
    HomePageActions.loadPredictions(this._onHomePagePredictionsChange);
    HomePageActions.loadPredictionSets(this._onPredictionSetChange);
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
      <section className="page home">

        <DocumentTitle title="Home" />

        <Hero />

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
              <PredictionCard currentUser={this.props.currentUser} className="tall-3-2" prediction={this.getPredictionAtIndex(1)} />
            </div>
            <div className="masonry-item w-1-3">
              <CategoryLinkCard category="finance" />
            </div>
            <div className="masonry-item w-1-3">
              <PredictionCard currentUser={this.props.currentUser} prediction={this.getPredictionAtIndex(1)} />
            </div>
            <div className="masonry-item w-1-3">
              <PredictionCard currentUser={this.props.currentUser} prediction={this.getPredictionAtIndex(1)} />
            </div>
            <div className="masonry-item w-1-3">
              <PredictionCard currentUser={this.props.currentUser} className="tall-2" prediction={this.getPredictionAtIndex(1)} />
            </div>
            <div className="masonry-item w-1-3">
              <FacebookCard />
            </div>
            <div className="masonry-item w-1-3">
              <PredictionCard currentUser={this.props.currentUser} prediction={this.getPredictionAtIndex(1)} />
            </div>
            <div className="masonry-item w-1-3">
              <PredictionCard currentUser={this.props.currentUser} className="tall-3-2" prediction={this.getPredictionAtIndex(1)} />
            </div>
            <div className="masonry-item w-2-3">
              <PredictionCard currentUser={this.props.currentUser} prediction={this.getPredictionAtIndex(1)} />
            </div>
          </MasonryContainer>

        </div>

      </section>
    );
  }

});

module.exports = React.createFactory(HomePage);

// <div className="pure-g card-grid flush--ends">
//   <div className="pure-u-1 full-width-outer flush--bottom">
//     <PredictionSet set={this.state.predictionSets[0]} />
//   </div>
// </div>