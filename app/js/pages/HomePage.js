/**
 * @jsx React.DOM
 */
'use strict';

var React             = require('react/addons');

var DocumentTitle     = require('../components/DocumentTitle');
var Hero              = require('../components/Hero');
var PredictionCard    = require('../components/PredictionCard');
var FeaturedBlogPosts = require('../components/FeaturedBlogPosts');
var FeaturedUsers     = require('../components/FeaturedUsers');
var PredictionSet     = require('../components/PredictionSet');
var FacebookCard      = require('../components/FacebookCard');
var CategoryLinkCard  = require('../components/CategoryLinkCard');
var FaceoffCard       = require('../components/FaceoffCard');
var Footer            = require('../components/Footer');

var HomePage = React.createClass({

  render: function() {
    return (
      <section className="page home">

        <DocumentTitle title="Home" />

        <Hero className="fixed" featuredPrediction={{}} />

        <div className="content">
          <div className="pure-g card-grid">
            <div className="pure-u-1-3"><PredictionCard prediction={{}} /></div>
            <div className="pure-u-1-3"><PredictionCard prediction={{}} /></div>
            <div className="pure-u-1-3"><PredictionCard prediction={{}} /></div>
          </div>

          <div className="pure-g card-grid">
            <div className="pure-u-2-3">
                <div className="pure-g card-grid">
                  <div className="pure-u-1-2"><PredictionCard className="tall-2" prediction={{}} /></div>
                  <div className="pure-u-1-2">
                    <div className="pure-g card-grid">
                      <div className="pure-u-1-1"><PredictionCard prediction={{}} /></div>
                    </div>
                    <div className="pure-g card-grid">
                      <div className="pure-u-1-1"><PredictionCard prediction={{}} /></div>
                    </div>
                  </div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1-2"><PredictionCard prediction={{}} /></div>
                  <div className="pure-u-1-2"><PredictionCard prediction={{}} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><PredictionCard className="wide-2" prediction={{}} /></div>
                </div>
            </div>

            <div className="pure-u-1-3">
              <div className="pure-g card-grid">
                <div className="pure-u-1-1"><FeaturedBlogPosts /></div>
              </div>
              <div className="pure-g card-grid">
                <div className="pure-u-1"><PredictionCard prediction={{}} /></div>
              </div>
              <div className="pure-g card-grid">
                <div className="pure-u-1-1"><FeaturedUsers /></div>
              </div>
            </div>

            <div className="pure-g card-grid">
              <div className="pure-u-1 full-width-outer">
                <PredictionSet predictions={[]} />
              </div>
            </div>

            <div className="pure-g card-grid">
              <div className="pure-u-1-3">
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><PredictionCard className="tall-3-2" prediction={{}} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><FacebookCard /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><PredictionCard className="tall-3-2" prediction={{}} /></div>
                </div>
              </div>
              <div className="pure-u-2-3">
                <div className="pure-g card-grid">
                  <div className="pure-u-1-2"><CategoryLinkCard category="finance" /></div>
                  <div className="pure-u-1-2"><PredictionCard prediction={{}} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1-2">
                    <div className="pure-g card-grid">
                      <div className="pure-u-1"><PredictionCard prediction={{}} /></div>
                    </div>
                    <div className="pure-g card-grid">
                      <div className="pure-u-1"><PredictionCard prediction={{}} /></div>
                    </div>
                  </div>
                  <div className="pure-u-1-2"><PredictionCard className="tall-2" prediction={{}} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><PredictionCard className="wide-2" prediction={{}} /></div>
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
                    <div className="pure-u-1"><PredictionCard prediction={{}} /></div>
                </div>
                <div className="pure-g card-grid">
                    <div className="pure-u-1"><PredictionCard prediction={{}} /></div>
                </div>
                <div className="pure-g card-grid">
                    <div className="pure-u-1"><PredictionCard className="tall-3-2" prediction={{}} /></div>
                </div>
              </div>
              <div className="pure-u-2-3">
                <div className="pure-g card-grid">
                  <div className="pure-u-1-2"><PredictionCard prediction={{}} /></div>
                  <div className="pure-u-1-2"><PredictionCard prediction={{}} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1"><PredictionCard className="wide-2" prediction={{}} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1-2">
                    <div className="pure-g card-grid">
                      <div className="pure-u-1"><PredictionCard prediction={{}} /></div>
                    </div>
                    <div className="pure-g card-grid">
                      <div className="pure-u-1"><PredictionCard prediction={{}} /></div>
                    </div>
                  </div>
                  <div className="pure-u-1-2"><PredictionCard className="tall-2" prediction={{}} /></div>
                </div>
                <div className="pure-g card-grid">
                  <div className="pure-u-1-2"><CategoryLinkCard category="sports" /></div>
                  <div className="pure-u-1-2"><PredictionCard prediction={{}} /></div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>

      </section>
    );
  }

});

module.exports = React.createFactory(HomePage);