import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';

import config from 'helmconfig.js';

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

ReactDOMServer.renderToString(<Header />);
let header = Helmet.rewind();

export default header;
