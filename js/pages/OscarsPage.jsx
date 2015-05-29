'use strict';

import React            from 'react/addons';
import ReactAsync       from 'react-async';
import $                from 'jquery';
import _                from 'lodash';
import when             from 'when';
import moment           from 'moment';
import {Navigation}     from 'react-router';
import DocumentTitle    from 'react-document-title';
import cx               from 'classnames';

import data             from '../data/oscars_2015';
import APIUtils         from '../utils/APIUtils';
import PredictionAPI    from '../utils/PredictionAPI';
import OscarsHero       from '../components/Oscars/Hero.jsx';
import CompletionWidget from '../components/Oscars/CompletionWidget.jsx';
import Category         from '../components/Oscars/Category.jsx';
import Spinner          from '../components/Spinner.jsx';

var OscarsPage = React.createClass({

  mixins: [ReactAsync.Mixin, Navigation],

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

  getInitialStateAsync: function(cb) {
    cb(null, {
      loading: false,
      submitted: false,
      error: null,
      unsubmittedVotes: {},
      submittedVotes: {}
    });
  },

  componentDidMount: function() {
    $(window).scroll(this.handleScroll);

    if ( !_.isEmpty(this.props.currentUser) ) {
      this.checkForPreviousVotes();
    }

    // this.transitionTo('Search', {}, { q: 'Oscars 2015' });
  },

  componentDidUpdate: function(prevProps) {
    if ( !_.isEmpty(this.props.currentUser) && !_.isEqual(prevProps.currentUser, this.props.currentUser) ) {
      this.checkForPreviousVotes();
    }
  },

  componentWillUnmount: function() {
    $(window).off('scroll', this.handleScroll);
  },

  checkForPreviousVotes: function() {
    // APIUtils.doUnnormalizedGet('event/oscars/2015').then(previousVotes => {
    //   this.setState({
    //     submittedVotes: _.merge(this.state.submittedVotes, previousVotes),
    //     loading: false,
    //     error: null
    //   });
    // }).catch(err => {
    //   this.setState({ error: err.message, loading: false });
    // });
  },

  handleScroll: function() {
    if ( $(window).scrollTop() >= $('.hero').height() / 2 ) {
      $('.hidden-for-oscars').addClass('show');
    } else if ( $(window).scrollTop() <= 0 ){
      $('.hidden-for-oscars').removeClass('show');
    }
  },

  doVote: function(category, nominee) {
    var unsubmittedVotesCopy = this.state.unsubmittedVotes;

    if ( _.isEqual(unsubmittedVotesCopy[APIUtils.titleCase(category)], nominee) ) {
      delete unsubmittedVotesCopy[APIUtils.titleCase(category)];
    } else {
      unsubmittedVotesCopy[APIUtils.titleCase(category)] = nominee;
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

    this.setState({ loading: true });

    // Simulate submission
    setTimeout(() => {
      this.setState({
        loading: false,
        submitted: true
      });
    }, 1000);

    // _.forOwn(this.state.unsubmittedVotes, (nominee, category) => {
    //   if ( !_.isEmpty(nominee) ) {
    //     prediction = {
    //       categoryId: APIUtils.getCategoryId('Entertainment', this.props.categories),
    //       title: 'Oscars 2015: ' + nominee.title + ' will win Best ' + APIUtils.titleCase(category) + '.',
    //       tags: ['Oscars', 'Best ' + APIUtils.titleCase(category), nominee.title],
    //       deadline: moment('Sunday, February 22nd 2015, 11:59:59 pm', 'dddd, MMMM Do YYYY, h:mm:ss a').toISOString(),
    //       SpecialEventYear: 2015,
    //       SpecialEventCategory: APIUtils.titleCase(category),
    //       SpecialEventSelection: nominee.title
    //     };

    //     promises.push(PredictionAPI.postPrediction(prediction));

    //     submittedVotesCopy[APIUtils.titleCase(category)] = nominee;
    //   }
    // }.bind(this));

    // when.all(promises).then(() => {
    //   this.setState({
    //     loading: false,
    //     submitted: true,
    //     error: null,
    //     unsubmittedVotes: {},
    //     submittedVotes: submittedVotesCopy
    //   }, this.redirectToResults);
    // }).catch(err => {
    //   this.setState({ loading: false, error: err.message });
    // });
  },

  redirectToResults: function() {
    this.transitionTo('Search', {}, { q: 'oscars' });
  },

  renderCategories: function() {
    return _.map(data, function(oscar, index) {
      return (
        <Category currentUser={this.props.currentUser}
                  oscar={oscar}
                  index={index}
                  key={index}
                  unsubmittedVotes={this.state.unsubmittedVotes}
                  submittedVotes={this.state.submittedVotes}
                  doVote={this.doVote} />
      );
    }.bind(this));
  },

  renderSideSubmitButton: function() {
    var buttonClasses = cx({
      'button': true,
      'go-to-submit': true,
      'scroll': true,
      'show': !_.isEmpty(this.state.unsubmittedVotes)
    });
    var element;

    if ( !this.state.submitted ) {
      element = (
        <button className={buttonClasses} onClick={this.submitPredictions}>
          <Spinner loading={this.state.loading} />
          Predict Now
        </button>
      );
    } else {
      element = (
        <button className={buttonClasses} disabled="true">
          Submitted!
        </button>
      );
    }

    return element;
  },

  renderFinalSubmitButton: function() {
    var finalSubmitButtonClasses = cx({
      'button': true,
      'hide': _.isEmpty(this.state.unsubmittedVotes)
    });
    var element;

    if ( !this.state.submitted ) {
      element =  (
        <button className={finalSubmitButtonClasses} onClick={this.submitPredictions}>
          <Spinner loading={this.state.loading} />
          Submit Predictions
        </button>
      );
    } else {
      element = (
        <h2 className="text-center soft--top">Predictions submitted!</h2>
      );
    }

    return element;
  },

  render: function() {
    return (
      <DocumentTitle title={APIUtils.buildPageTitle('The Oscars')}>
      <section className="oscars">

        <OscarsHero />

        <div className="content oscars">
          {this.renderSideSubmitButton()}

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
              {this.renderFinalSubmitButton()}
            </div>
          </div>
        </div>

      </section>
      </DocumentTitle>
    );
  }

});

export default OscarsPage;