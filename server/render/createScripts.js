import { GOOGLE_ANALYTICS_ID } from '../../config/env';

const createAppScript = () => {
  if (__PRODUCTION__) {
    const assets = require('../../public/assets/manifest.json');
    return `<script type="text/javascript" charset="utf-8" src="/assets/${assets['app.js']}"></script>`
  }
  return '<script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>';
};

const createAnalyticsSnippet = id =>
  `<script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', '${id}', 'auto');
ga('send', 'pageview');
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>`;

const createTrackingScript = () => {
  return GOOGLE_ANALYTICS_ID ? createAnalyticsSnippet(GOOGLE_ANALYTICS_ID) : '';
};

export { createTrackingScript, createAppScript };

