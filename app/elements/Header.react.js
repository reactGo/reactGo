import React from 'react';
import Helmet from 'react-helmet';

import config from 'helmconfig.js';

import chromecon from 'file!images/chrome-ninja192-precomposed.png';
import applecon from 'file!images/apple-ninja152-precomposed.png';
import mscon from 'file!images/ms-ninja144-precomposed.png';

class Header extends React.Component {
  render() {
    return (
      <Helmet 
        title="React Webpack Node"
        meta={config.meta}
        link={config.link}
      />
    );
  }
}

let header = React.renderToString(<Header />);


export default header;
