export const HOST = process.env.HOSTNAME || 'localhost';
export const PORT = process.env.PORT || '3000';

export const isDev = () => __DEVCLIENT__ || __DEVSERVER__;

export const baseURL = `http://${HOST}:${PORT}`;
// Replace with 'UA-########-#' or similar to enable tracking
export const trackingID = null;

