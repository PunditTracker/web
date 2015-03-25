'use strict';

var React            = require('react/addons');
var ReactAsync       = require('react-async');
var Reflux           = require('reflux');
var _                = require('lodash');
var Navigation       = require('react-router').Navigation;
var DocumentTitle    = require('react-document-title');

var GlobalActions    = require('../actions/GlobalActions');
var SearchStore      = require('../stores/SearchStore');
var APIUtils         = require('../utils/APIUtils');
var MasonryContainer = require('../components/MasonryContainer.jsx');
var PredictionCard   = require('../components/PredictionCard.jsx');
var Spinner          = require('../components/Spinner.jsx');

var SearchPage = React.createClass({

  mixins: [ReactAsync.Mixin, React.addons.LinkedStateMixin, Navigation, Reflux.ListenerMixin],

  getInitialStateAsync: function(cb) {
    cb(null, {
      query: this.props.query.q ? this.props.query.q.replace(/(\+)|(%20)/gi, ' ') : '',
      loading: false,
      error: null
    });
  },

  componentDidUpdate: function(prevProps) {
    var haveNewQuery = this.props.query.q && this.props.query.q.length && prevProps.query.q !== this.props.query.q;

    if ( haveNewQuery ) {
      this.setState({
        query: this.props.query.q
      }, function() {
        this.doSearch();
      });
    }
  },

  componentDidMount: function() {
    if ( this.state.query.length ) {
      this.doSearch();
    }
    this.listenTo(SearchStore, this.doneSearching);
  },

  reloadPage: function() {
    this.replaceWith('Search', {}, { q: this.state.query });
  },

  doSearch: function() {
    this.setState({
      loading: true,
      results: []
    }, function() {
      GlobalActions.search(this.state.query, this.doneSearching);
    });
  },

  doneSearching: function(err, data) {
    if ( err ) {
      this.setState({
        error: err.message,
        loading: false
      });
    } else {
      this.setState({
        loading: false,
        results: data,
        error: null
      });
    }
  },

  handleKeyPress: function(evt) {
    var keyCode = evt.keyCode || evt.which;

    if ( keyCode === '13' || keyCode === 13 ) {
      this.reloadPage();
    }
  },

  renderTitle: function() {
    var element = null;

    if ( this.state.results && this.state.results.length ) {
      element = (
        <h4 className="flush--top nudge-half--bottom soft-half--left">
          Results for: {this.props.query.q.replace(/(\+)|(%20)/gi, ' ')}
        </h4>
      );
    } else if ( !this.state.loading ) {
      element = (
        <h4 className="flush--top nudge-half--bottom soft-half--left">
          No matching predictions found.
        </h4>
      );
    }

    return element;
  },

  renderResults: function() {
    var element = null;
    var randomInt;
    var containerClasses;
    var cardClasses;

    if ( this.state.results && this.state.results.length ) {
      element = _.map(this.state.results, function(prediction, index) {
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
      }.bind(this));
    }

    return element;
  },

  render: function() {
    return (
      <DocumentTitle title="Search">
      <section className="content no-hero search">

        <div className="container">
          <div className="pure-g card-grid flush--bottom">
            <div className="pure-u-20-24 hard--bottom">
              <input id="search"
                     className="block full-width nudge-half--bottom"
                     placeholder="Type to search..."
                     valueLink={this.linkState('query')}
                     onKeyPress={this.handleKeyPress} />
            </div>
            <div className="pure-u-4-24 hard--bottom">
              <button className="button block text-center"
                      onClick={this.reloadPage}
                      disabled={this.state.loading ? 'true' : ''}>
                <Spinner loading={this.state.loading} />
                Search
              </button>
            </div>
          </div>
          {this.renderTitle()}
          <MasonryContainer className="card-grid">
            {this.renderResults()}
          </MasonryContainer>

        </div>

      </section>
      </DocumentTitle>
    );
  }

});

module.exports = SearchPage;