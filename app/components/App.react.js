import React from 'react';
import { RouteHandler } from 'react-router';
import Navigation from '../components/Navigation.react';

import '../utils/initInitialImages';
import '../scss/main.scss';

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Navigation />
        <RouteHandler />
      </div>
    );
  }
});

module.exports = App;
