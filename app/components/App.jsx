import React from 'react';
import { RouteHandler } from 'react-router';
import Navigation from 'components/Navigation';

import 'scss/main';

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
