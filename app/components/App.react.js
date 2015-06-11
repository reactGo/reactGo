import React from 'react';
import { RouteHandler } from 'react-router';
import Navigation from '../components/Navigation.react';

import '../scss/main.scss';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <RouteHandler />
      </div>
    );
  }
}
