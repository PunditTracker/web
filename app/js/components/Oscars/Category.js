/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');
var _     = require('lodash');
var humps = require('humps');
var cx    = React.addons.classSet;

var CompletionWidget = React.createClass({

  propTypes: {
    oscar: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired,
    unsubmittedVotes: React.PropTypes.object.isRequired,
    submittedVotes: React.PropTypes.object.isRequired,
    doVote: React.PropTypes.func.isRequired
  },

  getDefaultProps: function() {
    return {
      oscar: {},
      index: 0,
      unsubmittedVotes: {},
      submittedVotes: {},
      doVote: function() {}
    };
  },

  getInitialState: function() {
    return {
      currentNominee: this.props.oscar.nominees[0],
      currentVote: null
    };
  },

  userHasAlreadyVoted: function() {
    return !_.isEmpty(this.props.submittedVotes[humps.camelize(this.props.oscar.category)]);
  },

  isSelectedNominee: function(nominee) {
    var votesObject = null;
    var categoryIndex = humps.camelize(this.props.oscar.category);

    if ( this.userHasAlreadyVoted() ) {
      votesObject = this.props.submittedVotes;
    } else {
      votesObject = this.props.unsubmittedVotes;
    }

    return _.isEqual(votesObject[categoryIndex], nominee) || votesObject[categoryIndex] === nominee.title;
  },

  updateInfo: function(nominee) {
    this.setState({ currentNominee: nominee });
  },

  doVote: function(category, nominee) {
    if ( !this.userHasAlreadyVoted() ) {
      this.props.doVote(category, nominee);
    }
  },

  renderNominees: function() {
    var id;
    var classes;

    return _.map(this.props.oscar.nominees, function(nominee, index) {
      id = 'nom-' + this.props.index.toString() + index.toString();
      classes = cx({
        'nominee': true,
        'selected': this.isSelectedNominee(nominee)
      });

      return (
        <li className={classes}
            id={id}
            key={index}
            onMouseOver={this.updateInfo.bind(null, nominee)}
            onClick={this.doVote.bind(null, this.props.oscar.category, nominee)}>
          <h4><i className="fa fa-check boxed" />{nominee.title}</h4>
        </li>
      );
    }.bind(this));
  },

  render: function() {
    var id ='cat-' + this.props.index.toString();
    var classes = cx({
      'pure-g': true,
      'card-grid': true,
      'oscars-category': true,
      'submitted': this.userHasAlreadyVoted()
    });
    var backgroundStyles = {
      'backgroundImage': 'url(' + this.state.currentNominee.imageUrl + ')'
    };

    return (
      <li className={classes} id={id}>
        <div className="pure-u-3-5">
          <div className="oscars-header">
            <h4>Best</h4>
            <h2>{this.props.oscar.category}</h2>
          </div>
          <ul className="nominees">
            {this.renderNominees()}
          </ul>
        </div>
        <div className="pure-u-2-5">
          <div className="oscars-details">
            <div className="inner">
              <div className="background" style={backgroundStyles}>
                <div className="scrim"></div>
                <div className="text">
                    <h3>{this.state.currentNominee.title}</h3>
                </div>
              </div>
                <p className="text" dangerouslySetInnerHTML={{__html: this.state.currentNominee.desc + '.'}} />
            </div>
          </div>
        </div>
      </li>
    );
  }

});

module.exports = React.createFactory(CompletionWidget);