/**
 * @jsx React.DOM
 */
'use strict';

var React           = require('react/addons');
var _               = require('lodash');
var $               = require('jquery');
var when            = require('when');

var data            = require('../../data/oscars_2015');
var APIUtils        = require('../../utils/APIUtils');
var AdminRouteMixin = require('../../mixins/AdminRouteMixin');
var DocumentTitle   = require('../../components/DocumentTitle');
var Spinner         = require('../../components/Spinner');

var SpecialEventsResultsPage = React.createClass({

  mixins: [AdminRouteMixin],

  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      results: {},
      loading: false,
      error: null
    };
  },

  updateCategoryResult: function(evt) {
    var category = $(evt.target).attr('id');
    var nominee = evt.target.value;
    var resultsCopy = this.state.results;

    if ( nominee.indexOf('...') === -1 ) {
      resultsCopy[category] = nominee;
    } else {
      delete resultsCopy[category];
    }

    console.log(resultsCopy);

    this.setState({ results: resultsCopy });
  },

  submitResults: function(evt) {
    var promises = [];
    var result;

    evt.preventDefault();
    this.setState({ loading: true, error: null });

    _.forOwn(this.state.results, function(nominee, category) {
      if ( !_.isEmpty(nominee) ) {
        result = {
          year: 2015,
          category: category,
          selection: nominee.title
        };

        promises.push(APIUtils.doPost('admin/special_event/result/set', result));
      }
    }.bind(this));

    when.all(promises).then(function() {
      this.setState({
        loading: false,
        error: null
      });
    }.bind(this)).catch(function(err) {
      this.setState({ loading: false, error: err.message });
    }.bind(this));
  },

  renderCategorySelections: function(category) {
    var elements = null;

    if ( category.nominees && category.nominees.length ) {
      elements = _.map(category.nominees, function(nominee, index) {
        return (
          <option key={index}>{nominee.title}</option>
        );
      }.bind(this));
    }

    return elements;
  },

  renderCategoryRows: function() {
    var elements = null;

    if ( data && data.length ) {
      elements = _.map(data, function(item, index) {
        return (
          <div className="pure-g card-grid white islet" key={index}>
            <div className="pure-u-1-2">
              <h4 className="flush">{item.category}</h4>
            </div>
            <div className="pure-u-1-2">
              <select id={item.category} className="full-width" onChange={this.updateCategoryResult}>
                <option>Select the winner...</option>
                {this.renderCategorySelections(item)}
              </select>
            </div>
          </div>
        );
      }.bind(this));
    }

    return elements;
  },

  render: function() {
    return (
      <section className="content no-hero results predict">

        <DocumentTitle title="Special Event Results" />

        <div className="container">
          <h3 className="flush--top">Event Results: Oscars 2015</h3>
          <form id="results-form" onSubmit={this.submitResults}>
            {this.renderCategoryRows()}
            <button type="submit" className="btn float-right" disabled={_.isEmpty(this.state.results) ? 'true' : ''}>
              <Spinner loading={this.state.loading} />
              Submit Results
            </button>
          </form>
        </div>

      </section>
    );
  }

});

module.exports = React.createFactory(SpecialEventsResultsPage);