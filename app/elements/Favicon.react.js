import React from 'react';

import url from 'file!images/chrome-ninja192-precomposed.png';

class Favicon extends React.Component {
	render() {
		return (
			<link rel="icon" sizes="192x192" href={url} />
		);
	}
}

export default React.renderToString(<Favicon />);
