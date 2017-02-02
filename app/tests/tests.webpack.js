// require.context(directory, useSubdirectories = false, regExp = /^\.\//)
var context = require.context('.', true, /-test.js$/);
context.keys().forEach(context);
