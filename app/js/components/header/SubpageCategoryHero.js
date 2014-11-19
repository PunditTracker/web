/**
 * @jsx React.DOM
 */
'use strict';

var React                  = require('react/addons');
var Reflux                 = require('reflux');
var _                      = require('underscore');

var ListLink               = require('../ListLink');

var SubpageCategoryHero = React.createClass({

  mixins: [Reflux.ListenerMixin],

  propTypes: {
    category: React.PropTypes.string.isRequired,
    subcategory: React.PropTypes.string,
    subcategories: React.PropTypes.array.isRequired
  },

  renderSubnavItems: function() {
    var classString;

    return _.map(this.props.subcategories, function(subcategory, index) {
      classString = (this.props.subcategory === subcategory) ? 'active': '';

      return (
        <ListLink to="Subcategory"
                  params={{ category: this.props.category, subcategory: subcategory }}
                  className={classString}
                  key={index}>
          {subcategory}
        </ListLink>
      );
    }.bind(this));
  },

  render: function() {
    var heroClasses = 'hero ' + this.props.category;
    var subnavClasses = 'subnav ' + this.props.category;

    return (
      <div className={heroClasses}>

        <div className="wrapper">
          <ul className={subnavClasses}>
            {this.renderSubnavItems()}
          </ul>
        </div>

      </div>
    );
  }

});

module.exports = React.createFactory(SubpageCategoryHero);