/**
 * @jsx React.DOM
 */
'use strict';

var React                   = require('react/addons');
var _                       = require('lodash');
var cx                      = React.addons.classSet;
var Link                    = React.createFactory(require('react-router').Link);

var APIUtils                = require('../utils/APIUtils');
var PredictionAPI           = require('../utils/PredictionAPI');
var AuthenticatedRouteMixin = require('../mixins/AuthenticatedRouteMixin');
var DocumentTitle           = require('../components/DocumentTitle');
var User                    = require('../components/User');
var TagInput                = require('../components/TagInput');

var PredictPage = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

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
      prediction: null,
      clause: null,
      joiner: null,
      category: null,
      subcategory: null,
      tags: [],
      doesExpire: false,
      deadline: null,
      submitDisabled: true,
      error: null
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    if ( !_.isEqual(this.state, prevState) ) {
      this.setState({ submitDisabled: !this.state.prediction || !this.state.category });
    }
  },

  getCategoryId: function(categoryName) {
    return _.find(this.props.categories, function(category) {
      return category.name.toUpperCase() === categoryName.toUpperCase();
    }).id;
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

  setSubcategory: function(evt) {
    var hasSubcategory = evt.target.value.indexOf('...') === -1;

    evt.preventDefault();

    this.setState({ subcategory: hasSubcategory ? evt.target.value : null });
  },

  addTag: function(tag) {
    var tagsCopy = this.state.tags;

    tagsCopy.push(tag);

    this.setState({ tags: tagsCopy });
  },

  toggleDateInput: function(shouldShow) {
    this.setState({ doesExpire: shouldShow });
  },

  setDeadline: function(evt) {
    evt.preventDefault();

    this.setState({ deadline: evt.target.value || null });
  },

  handleSubmit: function(evt) {
    var prediction = {
      title: this.state.prediction.trim().charAt(0).toUpperCase() + this.state.prediction.trim().slice(1), // capitalize first letter
      category: this.getCategoryId(this.state.category),
      tags: []
    };

    evt.preventDefault();

    if ( this.state.subcategory ) {
      prediction.tags.push(this.state.subcategory);
    }

    if ( this.state.tags && this.state.tags.length ) {
      prediction.tags = prediction.tags.concat(this.state.tags);
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

    console.log('post to API:', prediction);

    PredictionAPI.postPrediction(prediction).then(function() {
      this.setState({ posted: true, error: null });
    }.bind(this)).catch(function(err) {
      this.setState({ error: err });
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

  renderSubcategoryDropdown: function() {
    var element = null;
    var options = _.map(['Select a Subcategory...', 'NFL', 'NBA', 'MLB', 'NHL'], function(subcategory, index) {
      return (
        <option key={index}>{subcategory}</option>
      );
    });

    if ( this.state.category && this.state.category.toLowerCase() === 'sports' ) {
      element = (
        <select name="category" onChange={this.setSubcategory}>
          {options}
        </select>
      );
    }

    return element;
  },

  renderSubcategoryTag: function() {
    var element = null;

    if ( this.state.subcategory ) {
      element = (
        <li>{this.state.subcategory}</li>
      );
    }

    return element;
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
    var finalPredictionClasses = cx({
      'final-prediction': true,
      'placeholder': !this.state.prediction
    });

    return (
      <div className="container card-grid">
        <div className="content-with-sidebar left">
          <form id="prediction-form" className="prediction-form" onSubmit={this.handleSubmit}>
            <h4>I predict that...</h4>
            <fieldset>
              <input type="text"
                     placeholder={this.constructor.placeholderOne}
                     name="prediction"
                     className="prediction-input"
                     valueLink={this.linkState('prediction')} />
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
              {this.renderSubcategoryDropdown()}
              </fieldset>
              <fieldset>
              <TagInput ref="tagInput" placeholder="Add tags (Optional)" addTag={this.addTag} />
            </fieldset>
            <fieldset>
              <input type="radio" ref="doesntExpire" name="doesnt-expire" checked={!this.state.doesExpire} onChange={this.toggleDateInput.bind(null, false)} />
              <label htmlFor="doesnt-expire">Doesn't expire</label>
              <input type="radio" name="does-expire" id="date-exists-2" checked={this.state.doesExpire} onChange={this.toggleDateInput.bind(null, true)} />
              <label htmlFor="does-expire">Expires</label>
              <input name="date" type="date" className={dateInputClasses} onChange={this.setDeadline} />
            </fieldset>
            <input name="login" defaultValue="yes" hidden />
            {this.renderError()}
            <input type="submit" className="button" defaultValue="Publish" disabled={this.state.submitDisabled ? 'true' : ''} />
          </form>
        </div>

        <div className="sidebar right">
          <div className="pure-g card-grid">
            <div className="pure-u-1">
              <div className="prediction-card final-prediction hover">
                <div className="background"><div className="scrim" /></div>
                <div className="tags">
                  <ul className="inner">
                    <li className="category">{this.state.category || 'Select a Category...'}</li>
                    {this.renderSubcategoryTag()}
                    {this.renderTags()}
                  </ul>
                </div>
                <h4 className="text">
                  <span className={finalPredictionClasses}>{this.state.prediction || this.constructor.placeholderOne}</span>
                  {this.renderFinalJoiner()}
                  {this.renderFinalClause()}
                </h4>
                <User user={this.props.currentUser} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  renderSuccessMessage: function() {
    return (
      <div className="container slim">
        <h4 className="text-center nudge-half--bottom flush--top">Forget your password?</h4>
        <Link to="Home" className="btn block full-width text-center">Back to Home</Link>
      </div>
    );
  },

  render: function() {
    return (
      <section className="content no-hero predict">

        <DocumentTitle title="Predict" />

        {this.state.posted ? this.renderSuccessMessage() : this.renderForm()}

      </section>
    );
  }

});

module.exports = React.createFactory(PredictPage);