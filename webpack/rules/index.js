const image = require('./image');
const javascript = require('./javascript');
const css = require('./css');

module.exports = ({ production = false, browser = false } = {}) => (
  [
    javascript({ production }),
    css({ production, browser }),
    image()
  ]
);
