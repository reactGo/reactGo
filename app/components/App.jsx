import React from 'react';
import Navigation from 'components/Navigation';

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

App.propTypes = { children: React.PropTypes.object };
