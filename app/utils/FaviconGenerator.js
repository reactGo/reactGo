import React from 'react';

import Favicon from 'elements/Favicon.react';
import config from 'faviconfig.js';

/*
 * FIXME: I should not be hardcoded like this. I deserve a better life!
 * What I've tried: 
 * const renderedFavicons = config.map((fav) => {
 *   let fullImagePath = imagePath + fav.filename;
 *   import url from fullImagePath;
 *   return React.renderToString(<Favicon fav={fav} url={url}/>);
 *  }).join('');
 * 
 * Please suggest a more elegant solution. 
 */
import chromecon from 'file!images/chrome-ninja192-precomposed.png';
import applecon from 'file!images/apple-ninja152-precomposed.png';
import mscon from 'file!images/ms-ninja144-precomposed.png';

// A bad hack
// This will obviously have repurcussions when you wish to extend the number of favicons
// Using something like https://github.com/haydenbleasel/favicons
config.chrome.filename = chromecon;
config.apple.filename = applecon;
config.ms.filename = mscon;


// TODO: Add polyfill for Object.keys() and Array.prototype.map()
const renderedFavicons = Object.keys(config).map((name) => {
  return React.renderToString(<Favicon fav={config[name]} />);
}).join('');

export default renderedFavicons;
