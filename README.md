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

Deploying to Heroku
================
1. `heroku create`
2. `heroku app:rename newname` if you need to
3. Run `webpack` . Commit and push the changes (I know, not the best idea).
4. `git push heroku master`
5. `heroku open` to open the link

Credits to [webpack-server-side-example](https://github.com/webpack/react-webpack-server-side-example) and [example-app](https://github.com/webpack/example-app).
