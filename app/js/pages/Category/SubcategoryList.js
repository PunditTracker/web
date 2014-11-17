/**
 * @jsx React.DOM
 */
'use strict';

var React = require('react/addons');

var SubcategoryListPage = React.createClass({

  render: function() {
    return (
      <div>
        A list of subcategories
      </div>
    );
  }

});

module.exports = React.createFactory(SubcategoryListPage);