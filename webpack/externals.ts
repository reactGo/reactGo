import * as fs from 'fs';

const externalModules = fs.readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .reduce((acc, cur) => Object.assign(acc, { [cur]: 'commonjs ' + cur }), {});

export default externalModules;

