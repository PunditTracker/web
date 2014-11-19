/**
 * @jsx React.DOM
 */
'use strict';

var React  = require('react/addons');
var Reflux = require('reflux');
var Link   = React.createFactory(require('react-router').Link);

var Hero = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getDefaultProps: function() {
    return {
      prediction: {
        id: 0,
        category: ''
      }
    };
  },

  render: function() {
    return (
      <div className="hero">

        <div className="wrapper table inherit-height">
          <div className="td full-width full-height">
            <h1 className="title">{this.props.prediction.title}</h1>
            <h3 className="cta">
              Make your prediction heard.
              <Link to="Prediction"
                    params={{ category: this.props.prediction.category, id: this.props.prediction.id }}>
                Predict Now <i className="fa fa-arrow-right" />
              </Link>
            </h3>
          </div>
        </div>

      </div>
    );
  }

});

module.exports = React.createFactory(Hero);