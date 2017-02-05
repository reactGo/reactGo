const fs = require('fs');

const externalModules = fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .reduce((acc, cur) => Object.assign(acc, { [cur]: 'commonjs ' + cur }), {});

module.exports = externalModules;

