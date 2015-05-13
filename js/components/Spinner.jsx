'use strict';

var React = require('react/addons');

var Spinner = React.createClass({

  propTypes: {
    loading: React.PropTypes.bool.isRequired,
    size: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  },

  render: function() {
    var element = null;
    var styles = {};

    if ( this.props.size ) {
      styles.fontSize = this.props.size;
    }

    if ( this.props.loading ) {
      element = (
        <i className="fa fa-spinner fa-spin" style={styles} />
      );
    }

    return element;
  }

});

module.exports = Spinner;