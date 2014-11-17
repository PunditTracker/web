/**
 * @jsx React.DOM
 */
'use strict';

var React                   = require('react/addons');
var Reflux                  = require('reflux');

var CategoryActions         = require('../../actions/CategoryActions');
var CurrentSubcategoryStore = require('../../stores/CurrentSubcategoryStore');
var NowPlaying              = require('../../components/NowPlaying');
var FeaturedPredictions     = require('../../components/FeaturedPredictions');
var FeaturedUsers           = require('../../components/FeaturedUsers');

var SubcategoryPage = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      subcategory: {}
    };
  },

  _onSubcategoryChange: function(subcategory) {
    console.log('subcategory change:', subcategory);
    this.setState({ subcategory: subcategory });
  },

  componentWillMount: function() {
    CategoryActions.loadSubcategory(this.props.params.subcategory.toString(), this._onSubcategoryChange);
    this.listenTo(CurrentSubcategoryStore, this._onSubcategoryChange);
  },

  render: function() {
    return (
      <section className="subcategory-page">

        <div className="wrapper">
          <h2 className="dark-grey nudge-half--top">Now Playing</h2>
        </div>

        <NowPlaying event={this.state.subcategory.currentEvent} />

        <div className="wrapper">
          <h2 className="dark-grey">Featured Predictions</h2>
        </div>

        <div className="wrapper">
          <div className="col-8">
            <FeaturedPredictions subcategory={this.props.params.subcategory.toString()} />
          </div>
          <div className="col-4">
            <FeaturedUsers subcategory={this.props.params.subcategory.toString()} />
          </div>
        </div>

      </section>
    );
  }

});

module.exports = React.createFactory(SubcategoryPage);