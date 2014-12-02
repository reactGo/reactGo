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

Setting up your Database
================
1. `brew update`
2. `brew install mongodb`
3. `mongod` (Make sure you have the permissions to the directory /data/db)

Deploying to Heroku
================
1. `heroku create`
2. `heroku app:rename newname` if you need to
3. Run `webpack` . Commit and push the changes (I know, not the best idea).
4. `git push heroku master`
5. `heroku open` to open the link
6. If you wish to have a database setup on Heroku, remember to use `heroku addons:add mongohq` or `heroku addons:add mongolab`. 

Todo:
================
1. Include an easy set up for database (postgresql).
2. Include sass stylesheets for components. For good structure.
Currently it is still a css file in the header. Still not large enough to warrant a warning that the [above-the-fold](https://developers.google.com/speed/docs/insights/PrioritizeVisibleContent) content of the page is too large.
3. One button for Heroku deploy in README
4. Let me know!

Credits to [webpack-server-side-example](https://github.com/webpack/react-webpack-server-side-example), [example-app](https://github.com/webpack/example-app), [flux-examples](https://github.com/facebook/flux/tree/master/examples) and [node-express-mongo-demo](https://github.com/madhums/node-express-mongoose-demo).
