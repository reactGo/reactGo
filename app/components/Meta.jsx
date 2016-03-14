import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';

import config from 'helmconfig.js';

// Remove stylesheets because we do not extract them into a css file
// in development mode
if (__DEVSERVER__) {
  config.link = config.link.filter(l => l.rel !== 'stylesheet');
}

class Meta extends React.Component {
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

ReactDOMServer.renderToString(<Meta />);
let header = Helmet.rewind();

export default header;
