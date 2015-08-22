import React from 'react';

import 'scss/main';

export default class UnauthorisedApp extends React.Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

UnauthorisedApp.propTypes = { children: React.PropTypes.object };
