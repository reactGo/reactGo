import React from 'react';

export default class Favicon extends React.Component {
  render() {
    const faviProp = this.props.fav;
    const faviType = faviProp.type;
    let faviconElement;
    // Depending on the favicon type passed in, eg. link or meta
    // we will generate a different element
    if (faviType === 'link') {
      faviconElement = <link rel={faviProp.rel} href={faviProp.filename} sizes={faviProp.sizes}/>;
    } else if (faviType === 'meta'){
      faviconElement = <meta name={faviProp.name} content={faviProp.filename} />;
    }
    return (faviconElement);
  }
}

Favicon.propTypes = {
  fav: React.PropTypes.object
};
