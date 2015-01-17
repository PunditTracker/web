/**
 * @jsx React.DOM
 */
'use strict';

var React         = require('react/addons');
var _             = require('lodash');
var cx            = React.addons.classSet;

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
      prediction: null,
      clause: null,
      joiner: null,
      category: null,
      submitDisabled: true
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
      title: this.state.prediction,
      category: this.state.category
    };
    var tags = this.refs.tagInput.getTokens();

    if ( tags && tags.length ) {
      prediction.tags = tags;
    }

    if ( this.state.joiner ) {
      prediction.joiner = this.state.joiner;
    }

    if ( this.state.clause ) {
      prediction.clause = this.state.clause;
    }

    evt.preventDefault();

    console.log('post to API:', prediction);
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

  render: function() {
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
      <section className="content no-hero predict">

        <DocumentTitle title="Predict" />

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

      </section>
    );
  }

});

module.exports = React.createFactory(PredictPage);