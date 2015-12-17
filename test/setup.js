import { jsdom } from 'jsdom';

// Read more https://github.com/tmpvar/jsdom/blob/master/README.md#for-the-hardcore-jsdomjsdom
// jsdom.jsdom just gives you back a document object, with usable document.defaultView,
// and starts asynchronously executing any <script>s included in the HTML source.
// You can listen for the 'load' event to wait until scripts are done loading and executing,
// just like you would in a normal HTML page.
global.document = jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
