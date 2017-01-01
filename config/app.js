export const host = process.env.HOSTNAME || 'localhost';
export const port = process.env.PORT || '3000';
export const isDev = () => __DEVCLIENT__ || __DEVSERVER__;
// Replace with 'UA-########-#' or similar to enable tracking
export const trackingID = null;

