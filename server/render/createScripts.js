import { GOOGLE_ANALYTICS_ID, ENV } from '../../config/env';

const createVendorScripts = () => {
  const isProduction = ENV === 'production'
  
  const vendorManifest = isProduction ? require('../../public/vendor/prod/manifest.json')
                                      : require('../../public/vendor/dev/manifest.json');
                                              
  const vendorScripts = Object.keys(vendorManifest).map(key => vendorManifest[key])
                                                   .map(value => `<script src="vendor/${isProduction ? 'prod' : 'dev'}/${value}"></script>`)
                                                   .join('\n');
                                                   
  return vendorScripts;
};

const createAppScript = () => {
  return '<script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>';
};

const createTrackingScript = () => {
  return GOOGLE_ANALYTICS_ID ? createAnalyticsSnippet(GOOGLE_ANALYTICS_ID) : '';
};

const createAnalyticsSnippet = id =>
`<script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', '${id}', 'auto');
ga('send', 'pageview');
</script>
<script async src='https://www.google-analytics.com/analytics.js'></script>`;

export { createTrackingScript, createAppScript, createVendorScripts };

