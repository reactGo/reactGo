/*
 * Based on the template in Web Starter Kit : https://github.com/google/web-starter-kit/blob/master/app/index.html
 * To add to the config, add an object:
 * {
 *  type: "link" | "meta",
 *  sizes: "widthxheight",
 *  rel: "rel value"
 *  filename: <Name of your file"
 * }
 */

const config = {
  chrome: {
    type: "link",
    rel: "icon",
    sizes: "192x192",
    filename: "chrome-ninja192-precomposed.png"
  },
  apple: {
    type: "link",
    rel: "apple-touch-icon",
    sizes: "152x152",
    filename: "apple-ninja152-precomposed.png"
  },
  ms: {
    type: "meta",
    name: "msapplication-TileImage",
    filename: "ms-ninja144-precomposed.png"
  }
};

export default config;
