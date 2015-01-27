/**
 * @jsx React.DOM
 */
'use strict';

var React                    = require('react/addons');
var Reflux                   = require('reflux');

var HomePageActions          = require('../actions/HomePageActions');
var FeaturedPredictionsStore = require('../stores/FeaturedPredictionsStore');
var PredictionSetsStore      = require('../stores/PredictionSetsStore');
var DocumentTitle            = require('../components/DocumentTitle');
var Hero                     = require('../components/Hero');
var PredictionCard           = require('../components/PredictionCard');
var RecentBlogPosts          = require('../components/RecentBlogPosts');
var FeaturedUsers            = require('../components/FeaturedUsers');
var PredictionSet            = require('../components/PredictionSet');
var FacebookCard             = require('../components/FacebookCard');
var CategoryLinkCard         = require('../components/CategoryLinkCard');
var FaceoffCard              = require('../components/FaceoffCard');

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
      featuredPredictions: [],
      predictionSets: [],
      error: null
    };
  },

  _onFeaturedPredictionsChange: function(err, predictions) {
    if ( err ) {
      this.setState({ error: err });
    } else {
      this.setState({ featuredPredictions: predictions || [], error: null });
    }
  },

  _onPredictionSetChange: function(err, predictionSets) {
    if ( err ) {
      this.setState({ error: err });
    } else {
      this.setState({ predictionSets: predictionSets || [], error: null });
    }
  },

  componentDidMount: function() {
    HomePageActions.loadFeaturedPredictions(this._onFeaturedPredictionsChange);
    HomePageActions.loadPredictionSets(this._onPredictionSetChange);
    this.listenTo(FeaturedPredictionsStore, this._onFeaturedPredictionsChange);
    this.listenTo(PredictionSetsStore, this._onPredictionSetChange);
  },

  render: function() {
    return (
      <section className="page home">

        <DocumentTitle title="Home" />

        <Hero />

        <div className="content">
          <div className="pure-g card-grid">
            <div className="pure-u-1-3"><PredictionCard currentUser={this.props.currentUser} prediction={this.state.featuredPredictions[0]} /></div>
            <div className="pure-u-1-3"><PredictionCard currentUser={this.props.currentUser} prediction={this.state.featuredPredictions[1]} /></div>
            <div className="pure-u-1-3"><PredictionCard currentUser={this.props.currentUser} prediction={this.state.featuredPredictions[2]} /></div>
          </div>
          <div className="pure-g card-grid">
            <div className="pure-u-2-3">
              <div className="pure-g card-grid">
                <div className="pure-u-1-2"><PredictionCard currentUser={this.props.currentUser} className="tall-2" prediction={{}} /></div>
                <div className="pure-u-1-2">
                  <div className="pure-g card-grid">
                    <div className="pure-u-1-1"><PredictionCard currentUser={this.props.currentUser} prediction={this.state.featuredPredictions[3]} /></div>
                  </div>
                  <div className="pure-g card-grid">
                    <div className="pure-u-1-1"><PredictionCard currentUser={this.props.currentUser} prediction={this.state.featuredPredictions[4]} /></div>
                  </div>
                </div>
              </div>
              <div className="pure-g card-grid">
                <div className="pure-u-1-2"><PredictionCard currentUser={this.props.currentUser} prediction={this.state.featuredPredictions[5]} /></div>
                <div className="pure-u-1-2"><PredictionCard currentUser={this.props.currentUser} prediction={this.state.featuredPredictions[6]} /></div>
              </div>
              <div className="pure-g card-grid">
                <div className="pure-u-1"><PredictionCard currentUser={this.props.currentUser} className="wide-2" prediction={this.state.featuredPredictions[7]} /></div>
              </div>
            </div>

            <div className="pure-u-1-3">
              <div className="pure-g card-grid">
                <div className="pure-u-1-1"><RecentBlogPosts /></div>
              </div>
              <div className="pure-g card-grid">
                <div className="pure-u-1"><PredictionCard currentUser={this.props.currentUser} prediction={this.state.featuredPredictions[8]} /></div>
              </div>
              <div className="pure-g card-grid">
                <div className="pure-u-1-1"><FeaturedUsers /></div>
              </div>
            </div>

            <div className="pure-g card-grid">
              <div className="pure-u-1 full-width-outer">
                <PredictionSet set={this.state.predictionSets[0]} />
              </div>
            </div>

            <div className="pure-g card-grid">
              <div className="pure-u-1-3">
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><PredictionCard currentUser={this.props.currentUser} className="tall-3-2" prediction={this.state.featuredPredictions[9]} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><FacebookCard /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><PredictionCard currentUser={this.props.currentUser} className="tall-3-2" prediction={this.state.featuredPredictions[10]} /></div>
                </div>
              </div>
              <div className="pure-u-2-3">
                <div className="pure-g card-grid">
                  <div className="pure-u-1-2"><CategoryLinkCard category="finance" /></div>
                  <div className="pure-u-1-2"><PredictionCard currentUser={this.props.currentUser} prediction={this.state.featuredPredictions[11]} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1-2">
                    <div className="pure-g card-grid">
                      <div className="pure-u-1"><PredictionCard currentUser={this.props.currentUser} prediction={this.state.featuredPredictions[12]} /></div>
                    </div>
                    <div className="pure-g card-grid">
                      <div className="pure-u-1"><PredictionCard currentUser={this.props.currentUser} prediction={this.state.featuredPredictions[13]} /></div>
                    </div>
                  </div>
                  <div className="pure-u-1-2"><PredictionCard currentUser={this.props.currentUser} className="tall-2" prediction={this.state.featuredPredictions[14]} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><PredictionCard currentUser={this.props.currentUser} className="wide-2" prediction={this.state.featuredPredictions[15]} /></div>
                </div>
              </div>
            </div>

            <div className="pure-g card-grid">
              <div className="pure-u-1 full-width-outer">
                <FaceoffCard />
              </div>
            </div>

            <div className="pure-g card-grid">
              <div className="pure-u-1-3">
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><FeaturedUsers /></div>
                </div>
                <div className="pure-g card-grid">
                    <div className="pure-u-1"><PredictionCard currentUser={this.props.currentUser} prediction={this.state.featuredPredictions[16]} /></div>
                </div>
                <div className="pure-g card-grid">
                    <div className="pure-u-1"><PredictionCard currentUser={this.props.currentUser} prediction={this.state.featuredPredictions[17]} /></div>
                </div>
                <div className="pure-g card-grid">
                    <div className="pure-u-1"><PredictionCard currentUser={this.props.currentUser} className="tall-3-2" prediction={this.state.featuredPredictions[18]} /></div>
                </div>
              </div>
              <div className="pure-u-2-3">
                <div className="pure-g card-grid">
                  <div className="pure-u-1-2"><PredictionCard currentUser={this.props.currentUser} prediction={this.state.featuredPredictions[19]} /></div>
                  <div className="pure-u-1-2"><PredictionCard currentUser={this.props.currentUser} prediction={this.state.featuredPredictions[20]} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><PredictionCard currentUser={this.props.currentUser} className="wide-2" prediction={this.state.featuredPredictions[21]} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1-2">
                    <div className="pure-g card-grid">
                      <div className="pure-u-1"><PredictionCard currentUser={this.props.currentUser} prediction={this.state.featuredPredictions[21]} /></div>
                    </div>
                    <div className="pure-g card-grid">
                      <div className="pure-u-1"><PredictionCard currentUser={this.props.currentUser} prediction={this.state.featuredPredictions[22]} /></div>
                    </div>
                  </div>
                  <div className="pure-u-1-2"><PredictionCard currentUser={this.props.currentUser} className="tall-2" prediction={this.state.featuredPredictions[23]} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1-2"><CategoryLinkCard category="sports" /></div>
                  <div className="pure-u-1-2"><PredictionCard currentUser={this.props.currentUser} prediction={this.state.featuredPredictions[24]} /></div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>
    );
  }

});

module.exports = React.createFactory(HomePage);