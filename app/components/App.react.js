import React from 'react';
import { RouteHandler } from 'react-router';
import Navigation from '../components/Navigation.react';

import '../utils/initInitialImages';
import '../scss/main.scss';

export class App extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <RouteHandler />
      </div>
    );
  }
}

