require('babel-register')({
  presets: ['es2015', 'react', 'stage-0']
});
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const exposedProperties = ['window', 'navigator', 'document'];

const { document } = (new JSDOM('<!doctype><html><head></head><body></body></html>', {
  url: 'http://localhost:3001'
})).window;

global.document = document;

global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

documentRef = document;
