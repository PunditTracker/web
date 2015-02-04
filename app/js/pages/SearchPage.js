/**
 * @jsx React.DOM
 */
'use strict';

var React         = require('react/addons');
var Reflux        = require('reflux');
var Navigation    = require('react-router').Navigation;

var DocumentTitle = require('../components/DocumentTitle');
var GlobalActions = require('../actions/GlobalActions');
var SearchStore   = require('../stores/SearchStore');

var SearchPage = React.createClass({

  mixins: [React.addons.LinkedStateMixin, Navigation, Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      query: this.props.query.q ? this.props.query.q.replace(/(\+)|(%20)/gi, ' ') : '',
      isSearching: false,
      error: null
    };
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
      isSearching: true,
      results: []
    }, function() {
      GlobalActions.search(this.state.query, this.doneSearching);
    });
  },

  doneSearching: function(err, data) {
    if ( err ) {
      this.setState({
        error: err.message,
        isSearching: false
      });
    } else {
      this.setState({
        isSearching: false,
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

  render: function() {
    return (
      <section className="content no-hero search">

        <DocumentTitle title="Search" />

        <div className="container">
          <input id="search"
                 className="block full-width nudge-half--bottom"
                 placeholder="Type to search..."
                 valueLink={this.linkState('query')}
                 onKeyPress={this.handleKeyPress} />
          <br />
          Search for: {this.props.query.q.replace(/(\+)|(%20)/gi, ' ')}
        </div>

      </section>
    );
  }

});

module.exports = React.createFactory(SearchPage);