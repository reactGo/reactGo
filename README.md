# react-webpack-node

[![npm version](https://badge.fury.io/js/react-webpack-node.svg)](http://badge.fury.io/js/react-webpack-node)

<img href="https://gratipay.com/~choonkending/" src="https://img.shields.io/gratipay/choonkending.svg">

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)


Boilerplate for React application with webpack using alt's Flux running on a node express server.

## Demo site:

[https://react-webpack-node.herokuapp.com/](https://react-webpack-node.herokuapp.com/)

## Features:

1. Isomorphic flux using [alt](https://github.com/goatslacker/alt), [iso](https://github.com/goatslacker/iso) and [react-router](https://github.com/rackt/react-router)
2. Stores storing data using [ImmutableJS](https://github.com/facebook/immutable-js)
3. Simple webpack [config file](https://github.com/choonkending/react-webpack-node/blob/master/webpack.config.js)
4. Running on Express
5. Mongoose for MongoDB
6. Includes a Procfile to enable deployment to Heroku.

## Why alt?

Having isomorphic React was one of my key criteria when choosing a Flux library, which helped narrow down the scope of libraries.
I found alt's implementation to be clean and simple, and like the option to allow us to create flux instances or using singeltons (and flushing the stores). 

## Mission

The aim of this repo is to incorporate the best practices to building a non-trivial apps with Reactjs and Node.
I am working to document this repo extensively so it would be easy for both beginners and experts to begin dev-ing on it without pulling your hair out.

## Instructions

1. `npm install`
2. `npm start` to run locally

### Bundling with webpack

1. `npm run build` runs `webpack` will run configurations within webpack.config.js.
2. `npm run watch` runs `webpack --watch` to watch and recompile for changes.

#### Where do you compile your scss?
We use [ExtractTextPlugin](https://github.com/webpack/extract-text-webpack-plugin) to extract compiled css in our [webpack config file](https://github.com/choonkending/react-webpack-node/blob/master/webpack.config.js)

### Setting up your Database

1. `brew update`
2. `brew install mongodb`
3. `mongod` (Make sure you have the permissions to the directory /data/db)

### Deploying to Heroku

1. `heroku create`
2. `heroku app:rename newname` if you need to
3. `git push heroku master`

  Note: If you are working from a different machine and get `heroku does not appear to be a remote repository`     message, be sure to run `git remote add heroku git@heroku.com:appname.git`.

4. `heroku open` to open the link
5. If you wish to have a database setup on Heroku, remember to use `heroku addons:add mongohq` or `heroku addons:add mongolab`. 

Note: For Google Auth, read [Setting up Google Authentication](https://github.com/choonkending/react-webpack-node/tree/feature/passport_google_auth#setting-up-google-authentication) below

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

## Questions:
### 1. Google Authentication does not work locally or on heroku!

#### Setting up Google Authentication

1. Follow [these steps from Google](https://developers.google.com/identity/protocols/OpenIDConnect) to create your API  keys on [Google Developers Console](https://console.developers.google.com/)
2. Under APIs & Auth, Copy your Client ID and Client Secret

#### Dev
For Google Auth to work locally, you need to do the following in your terminal before starting the server:
`export GOOGLE_CLIENTID=YOUR_CLIENTID`
`export GOOGLE_SECRET=YOUR_SECRET`

#### Heroku

Fret not! Heroku's covered [this](https://devcenter.heroku.com/articles/config-vars) pretty well.

`heroku config:set GOOGLE_CLIENTID=YOUR_CLIENTID`
`heroku config:set GOOGLE_SECRET=YOUR_SECRET`
`heroku config:set GOOGLE_CALLBACK=YOUR_CALLBACK`

## Todo:

1. Include an easy set up for database (postgresql) [ In Progress ].
2. react-hot-loader
3. Use of PureRenderComponent mixin for performance
4. Let me know!

## How to Contribute:

1. As this repo is still in its baby stages, any suggestions/improvements/bugs can be in the form of Pull Requests, or creating an issue.

Credits to [webpack-server-side-example](https://github.com/webpack/react-webpack-server-side-example), [example-app](https://github.com/webpack/example-app), [flux-examples](https://github.com/facebook/flux/tree/master/examples), [node-express-mongo-demo](https://github.com/madhums/node-express-mongoose-demo), [hackathon-starter](https://github.com/sahat/hackathon-starter/), [web-starter-kit](https://github.com/google/web-starter-kit), [awesome material-ui](https://github.com/callemall/material-ui), [alt and iso](https://github.com/goatslacker/iso/tree/master/examples/react-router-flux).

License
===============
MIT
