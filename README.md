# react-webpack-node

[![npm version](https://badge.fury.io/js/react-webpack-node.svg)](http://badge.fury.io/js/react-webpack-node)

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

Boilerplate for React application with webpack using alt's Flux running on a node express server.

## Features:

1. Isomorphic flux using [alt](https://github.com/goatslacker/alt) and [react-router](https://github.com/rackt/react-router)
2. Stores storing data using [ImmutableJS](https://github.com/facebook/immutable-js)
3. Simple webpack [config file](https://github.com/choonkending/react-webpack-node/blob/master/webpack.config.js) and [gulpfile](https://github.com/choonkending/react-webpack-node/blob/master/gulpfile.js)
4. Running on Express
5. Mongoose for MongoDB
6. Includes a Procfile to enable deployment to Heroku.

## Why alt?

Having isomorphic React was one of my key criteria when choosing a Flux library, which helped narrow down the scope of libraries.
I found alt's implementation to be clean and simple, and like the option to allow us to create flux instances or using singeltons (and flushing the stores). 

## Mission

The aim of this repo is to incorporate the best practices to building a powerful apps with Reactjs and Node.
I am working to document this repo extensively so it would be easy for both beginners and experts to begin dev-ing on it without pulling your hair out.

## Instructions

1. `npm install`
2. `npm start` to run locally

### Bundling with webpack and gulp

1. `npm run build` runs `webpack` will run configurations within webpack.config.js.
2. `npm run watch` runs `webpack --watch` to watch and recompile for changes.
3. `npm run sass-watch` compiles sass and watches for changes or `npm run sass` to compile once using gulp.

### Setting up your Database

1. `brew update`
2. `brew install mongodb`
3. `mongod` (Make sure you have the permissions to the directory /data/db)

### Deploying to Heroku

1. `heroku create`
2. `heroku app:rename newname` if you need to
3. Run `webpack` . Commit and push the changes (I know, not the best idea).
4. `git push heroku master`

  Note: If you are working from a different machine and get `heroku does not appear to be a remote repository`     message, be sure to run `git remote add heroku git@heroku.com:appname.git`.

5. `heroku open` to open the link
6. If you wish to have a database setup on Heroku, remember to use `heroku addons:add mongohq` or `heroku addons:add mongolab`. 

### Deploying to Digital Ocean

1. Create a Droplet
2. Follow [this](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04) or
[this](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server) tutorial
to set up nodejs
3. Follow [this](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-12-04) tutorial to install mongodb
4. git clone this repo
5. `npm install`
6. `sudo npm install pm2 -g`
7. `pm2 start server/index.js`
8. `pm2 startup ubuntu`
9. `sudo env PATH=$PATH:/usr/local/bin pm2 startup ubuntu -u sammy`

## Component Hierarchy

- app.js
	- App.react
		- NavigationBar.react
	  - RouteHandler
			- Vote.react
				- EntryBox.react
				- MainSection.react
				- Scoreboard.react
			- Login.react
			- Logout.react
			- About.react

## IsomorphicRouterRenderer

This is a modified version of alt's IsomorphicRenderer. I wished to use webpack to build my server and client side code, but wanted to easily bootstrap data into the stores, and render the correct component using react-router. This takes into account the fact that we're using a singleton store and flushing it everytime (as opposed to creating an instance everytime).

## Todo:

1. Include an easy set up for database (postgresql).
2. Passport auth with google-auth
3. Figure out the best way to serve css (inline, radium, webpack or global main.css as is)
4. Use of PureRenderComponent mixin for performance
5. Let me know!

## How to Contribute:

1. As this repo is still in its baby stages, any suggestions/improvements/bugs can be in the form of Pull Requests, or creating an issue.

Credits to [webpack-server-side-example](https://github.com/webpack/react-webpack-server-side-example), [example-app](https://github.com/webpack/example-app), [flux-examples](https://github.com/facebook/flux/tree/master/examples), [node-express-mongo-demo](https://github.com/madhums/node-express-mongoose-demo), [web-starter-kit](https://github.com/google/web-starter-kit), [awesome material-ui](https://github.com/callemall/material-ui), [alt and iso](https://github.com/goatslacker/iso/tree/master/examples/react-router-flux).

License
===============
MIT
