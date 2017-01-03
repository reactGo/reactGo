import { HOST, PORT, ENV } from './env';

export const isProduction = ENV === 'production';
export const isDebug = ENV === 'development';
export const isClient = typeof window !== 'undefined';

export const baseURL = `http://${HOST}:${PORT}`;
// Replace with 'UA-########-#' or similar to enable tracking
export const trackingID = null;

