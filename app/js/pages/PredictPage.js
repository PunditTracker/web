/**
 * @jsx React.DOM
 */
'use strict';

var React         = require('react/addons');
var _             = require('lodash');
var cx            = React.addons.classSet;

var PredictionAPI = require('../utils/PredictionAPI');
var DocumentTitle = require('../components/DocumentTitle');
var User          = require('../components/User');
var TagInput      = require('../components/TagInput');

var PredictPage = React.createClass({

  mixins: [React.addons.LinkedStateMixin],

  propTypes: {
    currentUser: React.PropTypes.object.isRequired
  },

  statics: {
    placeholderOne: 'The Patriots will win the Super Bowl',
    placeholderTwo: 'it rains on game day.'
  },

  getDefaultProps: function() {
    return {
      currentUser: {}
    };
  },

  getInitialState: function() {
    return {
      posted: false,
      prediction: null,
      clause: null,
      joiner: null,
      category: null,
      submitDisabled: true,
      error: null
    };
  },

  componentDidUpdate: function(prevProps, prevState) {
    if ( !_.isEqual(this.state, prevState) ) {
      this.setState({ submitDisabled: !this.state.prediction || !this.state.category });
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

  handleSubmit: function(evt) {
    var prediction = {
      title: this.state.prediction.trim().charAt(0).toUpperCase() + this.state.prediction.trim().slice(1), // capitalize first letter
      subcat: this.state.category
    };
    var tags = this.refs.tagInput.getTokens();

    evt.preventDefault();

    if ( tags && tags.length ) {
      prediction.tags = tags;
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
    var finalPredictionClasses = cx({
      'final-prediction': true,
      'placeholder': !this.state.prediction
    });

    return (
      <div className="container card-grid">
        <div className="left">
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
                <option>NFL</option>
                <option>NBA</option>
                <option>MLB</option>
                <option>NHL</option>
              </select>
              </fieldset>
              <fieldset>
              <TagInput ref="tagInput" placeholder="Add tags (Optional)" />
            </fieldset>
            <input name="login" defaultValue="yes" hidden />
            {this.renderError()}
            <input type="submit" className="button" defaultValue="Publish" disabled={this.state.submitDisabled ? 'true' : ''} />
          </form>
        </div>

        <div className="sidebar">
          <div className="pure-g card-grid">
            <div className="pure-u-1">
              <div className="prediction-card final-prediction">
                <div className="background"><div className="scrim" /></div>
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

  renderConfirmation: function() {
    return (
      <div>
        Prediction successfully submitted!
      </div>
    );
  },

  render: function() {
    return (
      <section className="content no-hero predict">

        <DocumentTitle title="Predict" />

        {this.state.posted ? this.renderConfirmation() : this.renderForm()}

      </section>
    );
  }

});

module.exports = React.createFactory(PredictPage);