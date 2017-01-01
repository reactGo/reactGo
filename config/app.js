export const HOST = process.env.HOSTNAME || 'localhost';
export const PORT = process.env.PORT || '3000';

export const isProduction = process.env.NODE_ENV === 'production';
export const isDebug = process.env.NODE_ENV === 'development';
export const isClient = typeof window !== 'undefined';

export const baseURL = `http://${HOST}:${PORT}`;
// Replace with 'UA-########-#' or similar to enable tracking
export const trackingID = null;

