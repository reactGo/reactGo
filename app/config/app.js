const host = process.env.HOSTNAME || 'localhost';
const port = process.env.PORT || '3000';
const isDev = () => __DEVCLIENT__ || __DEVSERVER__;
// Replace with 'UA-########-#' or similar to enable tracking
const trackingID = null;

export {
  host,
  port,
  trackingID,
  isDev
};

