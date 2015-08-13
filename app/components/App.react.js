import React from 'react';
import Navigation from 'components/Navigation.react';

import 'scss/main';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        {this.props.children}
      </div>
    );
  }
}
