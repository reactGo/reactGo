react-webpack-node
==================

Boilerplate for React application with webpack running on a node express server. Does not have server-side rendering yet.
Includes a Procfile to enable deployment to heroku.

Instructions
================
1. `npm install`
2. `npm start` to run locally

Bundling with webpack
================
1. `webpack` will run configurations within webpack.config.js.
2. `webpack --watch` to watch and recompile for changes.

Deploying to Heroku
================
1. `heroku create`
2. `heroku app:rename newname` if you need to
3. Run `webpack` . Commit and push the changes (I know, not the best idea).
4. `git push heroku master`
5. `heroku open` to open the link

Todo:
================
1. Include an easy set up for database (MongoDB, postgresql).
2. Include sass stylesheets for components. For good structure.
Currently it is still a css file in the header. Still not large enough to warrant a warning that the [above-the-fold](https://developers.google.com/speed/docs/insights/PrioritizeVisibleContent) content of the page is too large.
3. Let me know!

Credits to [webpack-server-side-example](https://github.com/webpack/react-webpack-server-side-example), [example-app](https://github.com/webpack/example-app) and [flux-examples](https://github.com/facebook/flux/tree/master/examples).
