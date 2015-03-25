'use strict';

var React           = require('react/addons');
var _               = require('lodash');
var $               = require('jquery');
var when            = require('when');
var DocumentTitle   = require('react-document-title');

var data            = require('../../data/oscars_2015');
var APIUtils        = require('../../utils/APIUtils');
var AdminRouteMixin = require('../../mixins/AdminRouteMixin');
var Spinner         = require('../../components/Spinner.jsx');

var SpecialEventsResultsPage = React.createClass({

  mixins: [AdminRouteMixin],

  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      results: {},
      loading: false,
      submitted: false,
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
          selection: nominee
        };

        promises.push(APIUtils.doPost('admin/special_event/result/set', result));
      }
    }.bind(this));

    when.all(promises).then(function() {
      this.setState({
        loading: false,
        submitted: true,
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

  renderError: function() {
    var element = null;

    if ( this.state.error ) {
      element = (
        <div className="error-container text-center nudge-half--bottom">
          {this.state.error}
        </div>
      );
    }

    return element;
  },

  renderForm: function() {
    return (
      <form id="results-form" onSubmit={this.submitResults}>
        {this.renderCategoryRows()}
        {this.renderError()}
        <button type="submit"
                className="btn float-right"
                disabled={_.isEmpty(this.state.results) || this.state.loading ? 'true' : ''}>
          <Spinner loading={this.state.loading} />
          Submit Results
        </button>
      </form>
    );
  },

  renderSuccessMessage: function() {
    return (
      <h2>Results successfully submitted!</h2>
    );
  },

  render: function() {
    return (
      <DocumentTitle title="Special Event Results">
      <section className="content no-hero results predict">

        <div className="container">
          <h3 className="flush--top">Event Results: Oscars 2015</h3>
          {this.state.submitted ? this.renderSuccessMessage() : this.renderForm()}
        </div>

      </section>
      </DocumentTitle>
    );
  }

});

module.exports = SpecialEventsResultsPage;