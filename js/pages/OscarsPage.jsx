'use strict';

var React            = require('react/addons');
var ReactAsync       = require('react-async');
var $                = require('jquery');
var _                = require('lodash');
var when             = require('when');
var moment           = require('moment');
var Navigation       = require('react-router').Navigation;
var DocumentTitle    = require('react-document-title');

var data             = require('../data/oscars_2015');
var APIUtils         = require('../utils/APIUtils');
var PredictionAPI    = require('../utils/PredictionAPI');
var OscarsHero       = require('../components/Oscars/Hero.jsx');
var CompletionWidget = require('../components/Oscars/CompletionWidget.jsx');
var Category         = require('../components/Oscars/Category.jsx');

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
    // $(window).scroll(this.handleScroll);

    // if ( !_.isEmpty(this.props.currentUser) ) {
    //   this.checkForPreviousVotes();
    // }

    this.transitionTo('Search', {}, { q: 'Oscars 2015' });
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
    APIUtils.doUnnormalizedGet('event/oscars/2015').then(function(previousVotes) {
      this.setState({
        submittedVotes: _.merge(this.state.submittedVotes, previousVotes),
        loading: false,
        error: null
      });
    }.bind(this)).catch(function(err) {
      this.setState({ error: err.message, loading: false });
    }.bind(this));
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

    _.forOwn(this.state.unsubmittedVotes, function(nominee, category) {
      if ( !_.isEmpty(nominee) ) {
        prediction = {
          categoryId: APIUtils.getCategoryId('Entertainment', this.props.categories),
          title: 'Oscars 2015: ' + nominee.title + ' will win Best ' + APIUtils.titleCase(category) + '.',
          tags: ['Oscars', 'Best ' + APIUtils.titleCase(category), nominee.title],
          deadline: moment('Sunday, February 22nd 2015, 11:59:59 pm', 'dddd, MMMM Do YYYY, h:mm:ss a').toISOString(),
          SpecialEventYear: 2015,
          SpecialEventCategory: APIUtils.titleCase(category),
          SpecialEventSelection: nominee.title
        };

        promises.push(PredictionAPI.postPrediction(prediction));

        submittedVotesCopy[APIUtils.titleCase(category)] = nominee;
      }
    }.bind(this));

    when.all(promises).then(function() {
      this.setState({
        loading: false,
        submitted: true,
        error: null,
        unsubmittedVotes: {},
        submittedVotes: submittedVotesCopy
      }, this.redirectToResults);
    }.bind(this)).catch(function(err) {
      this.setState({ loading: false, error: err.message });
    }.bind(this));
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

  render: function() {
    return (
      <DocumentTitle title={APIUtils.buildPageTitle('The Oscars')}>
      <section className="oscars">

        <OscarsHero />

        <div className="content oscars">
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
            <div className="scrim" />
          </div>
        </div>

      </section>
      </DocumentTitle>
    );
  }

});

module.exports = OscarsPage;