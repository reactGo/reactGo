// require.context(directory, useSubdirectories = false, regExp = /^\.\//)
var context = require.context('./app', true, /-test.js$/);
context.keys().forEach(context);
