export const createStylesheets = () => ({
  if (__PRODUCTION__) {
    const assets = require('../../public/assets/manifest.json');
    return `<link rel="stylesheet" href="/assets/${assets['styles/main.css']} />`
  }

});

