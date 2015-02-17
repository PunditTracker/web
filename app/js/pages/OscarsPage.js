/**
 * @jsx React.DOM
 */
'use strict';

var React            = require('react/addons');
var $                = require('jquery');
var _                = require('lodash');
var when             = require('when');
var moment           = require('moment');
var cx               = React.addons.classSet;

var data             = require('../data/oscars_2015');
var APIUtils         = require('../utils/APIUtils');
var PredictionAPI    = require('../utils/PredictionAPI');
var LoginModalMixin  = require('../mixins/LoginModalMixin');
var DocumentTitle    = require('../components/DocumentTitle');
var OscarsHero       = require('../components/Oscars/Hero');
var CompletionWidget = require('../components/Oscars/CompletionWidget');
var Category         = require('../components/Oscars/Category');
var Spinner          = require('../components/Spinner');

var OscarsPage = React.createClass({

  // NOTE: LinkedStateMixin is only included for the LoginModal
  mixins: [React.addons.LinkedStateMixin, LoginModalMixin],

  propTypes: {
    currentUser: React.PropTypes.object.isRequired,
    categories: React.PropTypes.array
  },

  getDefaultProps: function() {
    return {
      currentUser: {},
      categories: []
    };
  },

  getInitialState: function() {
    return {
      loading: false,
      submitted: false,
      error: null,
      unsubmittedVotes: {},
      submittedVotes: {}
    };
  },

  componentDidMount: function() {
    $(window).scroll(this.handleScroll);
  },

  componentWillUnmount: function() {
    $(window).off('scroll', this.handleScroll);
  },

  handleScroll: function() {
    if ( $(window).scrollTop() >= $(this.getDOMNode()).height() / 2 ) {
      $('.hidden-for-oscars').addClass('show');
    } else if ( $(window).scrollTop() <= 0 ){
      $('.hidden-for-oscars').removeClass('show');
    }
  },

  doVote: function(category, nominee) {
    var unsubmittedVotesCopy = this.state.unsubmittedVotes;

    if ( _.isEqual(unsubmittedVotesCopy[category.toLowerCase()], nominee) ) {
      delete unsubmittedVotesCopy[category.toLowerCase()];
    } else {
      unsubmittedVotesCopy[category.toLowerCase()] = nominee;
    }

    this.setState({ unsubmittedVotes: unsubmittedVotesCopy });
  },

  submitPredictions: function(evt) {
    var promises = [];
    var submittedVotesCopy = this.state.submittedVotes;
    var prediction;

    if ( evt ) {
      evt.preventDefault();
    }

    if ( _.isEmpty(this.props.currentUser) ) {
      this.toggleLoginModal();
    } else {
      this.setState({ loading: true });

      _.forOwn(this.state.unsubmittedVotes, function(nominee, category) {
        if ( !_.isEmpty(nominee) ) {
          prediction = {
            categoryId: APIUtils.getCategoryId('Entertainment', this.props.categories),
            title: nominee.title + ' will win Best ' + APIUtils.titleCase(category) + '.',
            tags: ['Oscars', 'Best ' + APIUtils.titleCase(category), nominee.title],
            deadline: moment('Sunday, February 22nd 2015, 11:59:59 pm', 'dddd, MMMM Do YYYY, h:mm:ss a').toISOString()
          };

          promises.push(PredictionAPI.postPrediction(prediction));

          submittedVotesCopy[category.toLowerCase()] = nominee;
        }
      }.bind(this));

      when.all(promises).then(function() {
        this.setState({
          loading: false,
          submitted: true,
          error: null,
          unsubmittedVotes: {},
          submittedVotes: submittedVotesCopy
        });
      }.bind(this)).catch(function(err) {
        this.setState({ loading: false, error: err.message });
      }.bind(this));
    }
  },

  renderCategories: function() {
    return _.map(data, function(oscar, index) {
      return (
        <Category oscar={oscar}
                  index={index}
                  key={index}
                  unsubmittedVotes={this.state.unsubmittedVotes}
                  submittedVotes={this.state.submittedVotes}
                  doVote={this.doVote} />
      );
    }.bind(this));
  },

  render: function() {
    var buttonClasses = cx({
      'button': true,
      'go-to-submit': true,
      'scroll': true,
      'show': !_.isEmpty(this.state.unsubmittedVotes)
    });

    return (
      <section className="oscars">

        <DocumentTitle title="The Oscars" />

        <OscarsHero />

        <div className="content">
          <button className={buttonClasses} onClick={this.submitPredictions}>
            <Spinner loading={this.state.loading} />
            Predict Now
          </button>

          <CompletionWidget categories={data}
                            unsubmittedVotes={this.state.unsubmittedVotes}
                            submittedVotes={this.state.submittedVotes} />

          <div className="pure-g card-grid">
            <div className="pure-u-1-6">
            </div>
            <div className="pure-u-5-6">
              <ul className="oscars-categories">
                {this.renderCategories()}
              </ul>
            </div>
          </div>
        </div>

        <div id="submit">
          <div className="background">
            <div className="scrim">
              <button className="button" onClick={this.submitPredictions}>
                <Spinner loading={this.state.loading} />
                Submit Predictions
              </button>
            </div>
          </div>
        </div>

      </section>
    );
  }

});

module.exports = React.createFactory(OscarsPage);