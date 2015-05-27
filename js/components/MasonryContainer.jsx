'use strict';

import React        from 'react/addons';
import MasonryMixin from 'react-masonry-mixin';

var MasonryContainer = React.createClass({

  mixins: [MasonryMixin('masonryContainer', {
    transitionDuration: 0,
    itemSelector: '.masonry-item',
    columnWidth: '.grid-sizer',
  })],

  propTypes: {
    className: React.PropTypes.string,
    columnWidth: React.PropTypes.string
  },

  getDefaultProps: function() {
    return {
      className: ''
    };
  },

  render: function() {
    var sizerStyles = {
      'width': this.props.columnWidth || null
    };

    return (
      <div className={this.props.className} ref="masonryContainer">

        <div className="grid-sizer" style={sizerStyles} />

        {this.props.children}

      </div>
    );
  }

});

export default MasonryContainer;