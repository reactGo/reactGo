import fs from 'fs';
import path from 'path';
import { ENV, GOOGLE_ANALYTICS_ID } from '../../config/env';

// Use fs.readFileSync(...) instead of require(...) to avoid webpack complaining about missing file
const manifestPath = path.join(process.cwd(), 'public/assets/app-manifest.json');

let manifest = {'common.js': 'common.js', 'vendor.js': 'vendor.js', 'app.js': 'app.js'};

if (ENV === 'production' && fs.existsSync(manifestPath)) {
  manifest = JSON.parse(fs.readFileSync(manifestPath), 'utf8');
}

const createAppScript = () => {
  return `
    <script src="/assets/${manifest['common.js']}"></script>
    <script src="/assets/${manifest['vendor.js']}"></script>
    <script src="/assets/${manifest['app.js']}"></script>
  `;
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

export { createTrackingScript, createAppScript };

