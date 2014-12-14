react-webpack-node
==================

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

Boilerplate for React application with webpack using Facebook's Flux running on a node express server. 

Features:
==========
1. Uses Flux pattern for Front End
2. Simple webpack config file ( Includes code splitting )
3. Running on Express and socket.io
4. Mongoose for MongoDB
5. Includes a Procfile to enable deployment to heroku.

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

Note: If you are working from a different machine and get `heroku does not appear to be a remote repository` message, be sure to run `git remote add heroku git@heroku.com:appname.git`.

5. `heroku open` to open the link
6. If you wish to have a database setup on Heroku, remember to use `heroku addons:add mongohq` or `heroku addons:add mongolab`. 

Todo:
================
1. Include an easy set up for database (postgresql).
2. Include sass stylesheets for components. For good structure.
Currently it is still a css file in the header. Still not large enough to warrant a warning that the [above-the-fold](https://developers.google.com/speed/docs/insights/PrioritizeVisibleContent) content of the page is too large.
3. Passport auth with express
4. Let me know!

Credits to [webpack-server-side-example](https://github.com/webpack/react-webpack-server-side-example), [example-app](https://github.com/webpack/example-app), [flux-examples](https://github.com/facebook/flux/tree/master/examples) and [node-express-mongo-demo](https://github.com/madhums/node-express-mongoose-demo).
