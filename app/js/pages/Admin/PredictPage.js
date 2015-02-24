/**
 * @jsx React.DOM
 */
'use strict';

var React           = require('react/addons');
var _               = require('lodash');
var cx              = require('classnames');
var Link            = React.createFactory(require('react-router').Link);
var Pikaday         = require('pikaday');

var APIUtils        = require('../../utils/APIUtils');
var AdminRouteMixin = require('../../mixins/AdminRouteMixin');
var DocumentTitle   = require('../../components/DocumentTitle');
var PredictionCard  = require('../../components/PredictionCard');
var User            = require('../../components/User');
var TagInput        = require('../../components/TagInput');
var Spinner         = require('../../components/Spinner');

var PredictPage = React.createClass({

  mixins: [AdminRouteMixin, React.addons.LinkedStateMixin],

  propTypes: {
    currentUser: React.PropTypes.object.isRequired,
    categories: React.PropTypes.array.isRequired
  },

  statics: {
    placeholderOne: 'The Patriots will win the Super Bowl',
    placeholderTwo: 'it rains on game day.'
  },

  getDefaultProps: function() {
    return {
      currentUser: {},
      categories: []
    };
  },

  getInitialState: function() {
    return {
      posted: false,
      creatorId: null,
      prediction: null,
      clause: null,
      joiner: null,
      category: null,
      tags: [],
      doesExpire: false,
      deadline: null,
      submitDisabled: true,
      createdPrediction: null,
      loading: false,
      error: null
    };
  },

  componentDidMount: function() {
    var component = this;

    this.datepicker = new Pikaday({
      field: component.refs.datepicker.getDOMNode(),
      format: 'D MMMM YYYY',
      onSelect: function() {
        component.setState({ deadline: this.getMoment().toDate() });
      }
    });
  },

  componentDidUpdate: function(prevProps, prevState) {
    if ( !_.isEqual(this.state, prevState) ) {
      this.setState({
        submitDisabled: !this.state.prediction || !this.state.category || !this.state.creatorId
      });
    }
  },

  setJoiner: function(joiner, evt) {
    evt.preventDefault();

    this.setState({ joiner: joiner === this.state.joiner ? null : joiner });
  },

  setCategory: function(evt) {
    var hasCategory = evt.target.value.indexOf('...') === -1;

    evt.preventDefault();

    this.setState({ category: hasCategory ? evt.target.value : null });
  },

  addTag: function(tag) {
    this.setState({ tags: _.union(this.state.tags, [tag]) });
  },

  removeTag: function(tag) {
    this.setState({ tags: _.without(this.state.tags, tag) });
  },

  toggleDateInput: function(shouldShow) {
    this.setState({ doesExpire: shouldShow });
  },

  setDeadline: function(evt) {
    this.setState({ deadline: evt.target.value || null });
  },

  handleSubmit: function(evt) {
    var prediction = {
      creatorId: parseInt(this.state.creatorId),
      title: this.state.prediction.trim().charAt(0).toUpperCase() + this.state.prediction.trim().slice(1), // capitalize first letter
      categoryId: APIUtils.getCategoryId(this.state.category, this.props.categories),
      tags: []
    };

    evt.preventDefault();

    if ( this.state.tags && this.state.tags.length ) {
      prediction.tags = this.state.tags;
    }

    if ( this.state.doesExpire && this.state.deadline ) {
      prediction.deadline = (new Date(this.state.deadline)).toISOString();
    }

    if ( this.state.joiner && this.state.clause ) {
      prediction.title += ' ' + this.state.joiner + ' ' + this.state.clause;
    }

    // Always end with a period
    if ( prediction.title.charAt(prediction.title.length - 1) !== '.' ) {
      prediction.title += '.';
    }

    this.setState({ loading: true });

    APIUtils.doPost('admin/prediction/add', prediction).then(function(createdPrediction) {
      this.setState({ posted: true, loading: false, createdPrediction: createdPrediction, error: null });
    }.bind(this)).catch(function(err) {
      this.setState({ loading: false, error: err });
    }.bind(this));

  },

  renderCategoryOptions: function() {
    var elements = null;

    if ( this.props.categories && this.props.categories.length ) {
      elements = _.map(this.props.categories, function(category, index) {
        return (
          <option key={index}>{APIUtils.titleCase(category.name)}</option>
        );
      });
    }

    return elements;
  },

  renderTags: function() {
    return _.map(this.state.tags, function(tag, index) {
      return (
        <li key={index}>{tag}</li>
      );
    });
  },

  renderFinalJoiner: function() {
    var element = null;
    var finalJoinerText = this.state.joiner ? ' ' + this.state.joiner + ' ' : '';

    if ( this.state.joiner ) {
      element = (
        <span className="joiner">{finalJoinerText}</span>
      );
    }

    return element;
  },

  renderFinalClause: function() {
    var element = null;
    var finalClauseClasses = cx({
      'final-clause': true,
      'placeholder': !this.state.clause
    });

    if ( this.state.joiner ) {
      element = (
        <span className={finalClauseClasses}>{this.state.clause || this.constructor.placeholderTwo}</span>
      );
    }

    return element;
  },

  renderError: function() {
    var element = null;

    if ( this.state.error ) {
      element = (
        <div className="error">{this.state.error}</div>
      );
    }

    return element;
  },

  renderForm: function() {
    var ifClasses = cx({
      'button': true,
      'on': this.state.joiner === 'if'
    });
    var andClasses = cx({
      'button': true,
      'on': this.state.joiner === 'and'
    });
    var unlessClasses = cx({
      'button': true,
      'on': this.state.joiner === 'unless'
    });
    var clauseWrapperClasses = cx({
      'clause-wrapper': true,
      'hidden': !this.state.joiner
    });
    var dateInputClasses = cx({
      'date-input': true,
      'hidden': !this.state.doesExpire
    });

    return (
      <form id="prediction-form" className="prediction-form" onSubmit={this.handleSubmit}>
        <fieldset>
          <input type="text"
                 placeholder="Creator ID of prediction"
                 name="creatorId"
                 className="creator-id-input full-width"
                 valueLink={this.linkState('creatorId')}
                 required />
        </fieldset>
        <h4>Predicts that...</h4>
        <fieldset>
          <input type="text"
                 placeholder={this.constructor.placeholderOne}
                 name="prediction"
                 className="prediction-input full-width"
                 valueLink={this.linkState('prediction')}
                 required />
          <ul className="joiners">
            <span className="is-opt">(Optional)</span>
            <li><button className={ifClasses} onClick={this.setJoiner.bind(null, 'if')}>if</button></li>
            <li><button className={andClasses} onClick={this.setJoiner.bind(null, 'and')}>and</button></li>
            <li><button className={unlessClasses} onClick={this.setJoiner.bind(null, 'unless')}>unless</button></li>
            <li className={clauseWrapperClasses}>
              <input type="text"
                     placeholder={this.constructor.placeholderTwo}
                     name="clause"
                     className="clause-input"
                     valueLink={this.linkState('clause')} />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <select name="category" onChange={this.setCategory}>
            <option>Select a Category...</option>
            {this.renderCategoryOptions()}
          </select>
        </fieldset>
        <fieldset className="nudge-half--bottom">
          <TagInput ref="tagInput" placeholder="Add tags (Optional)" addTag={this.addTag} removeTag={this.removeTag} />
        </fieldset>
        <fieldset>
          <input type="radio" ref="doesntExpire" name="doesnt-expire" checked={!this.state.doesExpire} onChange={this.toggleDateInput.bind(null, false)} />
          <label htmlFor="doesnt-expire">Doesn't expire</label>
          <input type="radio" name="does-expire" id="date-exists-2" checked={this.state.doesExpire} onChange={this.toggleDateInput.bind(null, true)} />
          <label htmlFor="does-expire">Expires</label>
          <input name="date" ref="datepicker" type="text" className={dateInputClasses} onChange={this.setDeadline} />
        </fieldset>
        <input name="login" defaultValue="yes" hidden />
        {this.renderError()}
        <button type="submit" className="btn" disabled={this.state.loading || this.state.submitDisabled ? 'true' : ''}>
          <Spinner loading={this.state.loading} />
          Publish
        </button>
      </form>
    );
  },

  renderSuccessMessage: function() {
    return (
      <div>
        <h4 className="text-center nudge-half--bottom flush--top">Prediction submitted!</h4>
        <Link to="Home" className="btn block full-width text-center">Back to Home</Link>
      </div>
    );
  },

  renderPreviewCard: function() {
    var finalPredictionClasses = cx({
      'final-prediction': true,
      'placeholder': !this.state.prediction
    });

    return (
      <div className="prediction-card final-prediction hover">
        <div className="background"><div className="scrim" /></div>
        <div className="tags">
          <ul className="inner">
            <li className="category">{this.state.category || 'Select a Category...'}</li>
            {this.renderTags()}
          </ul>
        </div>
        <h4 className="text">
          <span className={finalPredictionClasses}>{this.state.prediction || this.constructor.placeholderOne}</span>
          {this.renderFinalJoiner()}
          {this.renderFinalClause()}
        </h4>
        <User user={{}} />
      </div>
    );
  },

  renderCreatedPrediction: function() {
    return (
      <PredictionCard prediction={this.state.createdPrediction} />
    );
  },

  render: function() {
    return (
      <section className="content no-hero predict">

        <DocumentTitle title="Predict" />

        <div className="container card-grid">
          <div className="content-with-sidebar left hard--bottom">
            {this.state.posted ? this.renderSuccessMessage() : this.renderForm()}
          </div>

          <div className="sidebar relative right hard--bottom">
            <div className="pure-g card-grid">
              <div className="pure-u-1">
                {this.state.posted ? this.renderCreatedPrediction() : this.renderPreviewCard()}
              </div>
            </div>
          </div>
        </div>

      </section>
    );
  }

});

module.exports = React.createFactory(PredictPage);