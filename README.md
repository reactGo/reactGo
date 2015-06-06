# REAP

| React + Express + Alt + Postgresql | ... and Mongo

<img href="https://gratipay.com/~choonkending/" src="https://img.shields.io/gratipay/choonkending.svg">

Boilerplate for React application with webpack using alt's Flux running on a node express server with sequelize to connect to postgresl and mongoose for mongoDB. That was a mouthful.

This is based off my original [React+Webpack+Node](https://github.com/choonkending/react-webpack-node). Having sequelize with postgresql might seem like a small extra dependency, but I did not wish to overcomplicate the mission of that repo (plus it would be hard for beginners to deal with an extra database). 

## Why postgresql?

I am all for using MongoDB for a boilerplate (which is why I am leaving it in). But being a postgres fanboy myself, this repo appeared!

## Demo site:

[https://react-express-alt-postgres.herokuapp.com/](https://react-express-alt-postgres.herokuapp.com/)

## Features:

1. Isomorphic Flux using:
 - [alt](https://github.com/goatslacker/alt) as my Flux implementation
 - [iso](https://github.com/goatslacker/iso) to help with bootstrapping data for isomorphic Flux
 - [react-router](https://github.com/rackt/react-router)
2. Stores storing data using [ImmutableJS](https://github.com/facebook/immutable-js) data structures
3. Webpack [config file](https://github.com/choonkending/react-webpack-node/blob/master/webpack.config.js)
4. Express server
5. Mongoose for MongoDB
6. Sequelize for Postgresql
7. Includes a Procfile to enable deployment to Heroku.

## Why alt?

Having isomorphic React was one of my key criteria when choosing a Flux library, which helped narrow down the scope of libraries.

I found alt's implementation to be clean and simple, and like the option of allowing us to create alt instances or using singletons (and flushing the stores). I also like the direction in which alt is heading.

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

#### Postgresql

1. `npm install --save sequelize`
2. `npm install --save pg pg-hstore`

#### MongoDB

1. `brew update`
2. `brew install mongodb`
3. `mongod` (Make sure you have the permissions to the directory /data/db)

Note:

For local dev, you have to create your database locally, by following either steps:
1. `createdb ReactWebpackNode` on command line, read more [here](http://www.postgresql.org/docs/9.3/static/app-createdb.html)
2. Creating it manually using pgadmin
3. psql magic

### Deploying to Heroku

1. `heroku create`
2. `heroku app:rename newname` if you need to
3. `git push heroku master`

  Note: If you are working from a different machine and get `heroku does not appear to be a remote repository`     message, be sure to run `git remote add heroku git@heroku.com:appname.git`.
4. `heroku open` to open the link
5. If you wish to have a database setup on Heroku, remember to use the commands below for the following databases:
MongoDB:
- `heroku addons:add mongohq` or `heroku addons:add mongolab`
Postgresql:
- `heroku addons:create heroku-postgresql`

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
			- Dashboard.react
			  - PriorityNotes.react
			  - Profile.react

## IsomorphicRouterRenderer

This is a modified version of alt's IsomorphicRenderer. I wished to use webpack to build my server and client side code, but wanted to easily bootstrap data into the stores, and render the correct component using react-router. This takes into account the fact that we're using a singleton store and flushing it everytime (as opposed to creating an instance everytime).

## Questions:

- Google Authentication does not work locally or on heroku!

#### Setting up Google Authentication

1. Follow [these steps from Google](https://developers.google.com/identity/protocols/OpenIDConnect) to create your API  keys on [Google Developers Console](https://console.developers.google.com/)
2. Under APIs & Auth, Copy your Client ID and Client Secret

#### Dev
For Google Auth to work locally, you need to do the following in your terminal before starting the server:
`export GOOGLE_CLIENTID=YOUR_CLIENTID`
`export GOOGLE_SECRET=YOUR_SECRET`

#### Heroku

Fret not! Heroku's covered [this](https://devcenter.heroku.com/articles/config-vars) pretty well.

1. `heroku config:set GOOGLE_CLIENTID=YOUR_CLIENTID`

2. `heroku config:set GOOGLE_SECRET=YOUR_SECRET`

3. `heroku config:set GOOGLE_CALLBACK=YOUR_CALLBACK`

- Postgresql does not work locally. It throws a role "root" does not exist error!

You might not have sufficient permissions for the database. A quick way to fix this is to:

1. `export PGUSER=`whoami`` (secrets.js defaults to process.env.PGUSER)

## Todo:

1. My efforts will be focused primarily on [React+Webpack+Node](https://github.com/choonkending/react-webpack-node). However, so if you have any questions/issues with this repo, feel free to create an issue!

## How to Contribute:

1. As this repo is still in its baby stages, any suggestions/improvements/bugs can be in the form of Pull Requests, or creating an issue.

Credits to [webpack-server-side-example](https://github.com/webpack/react-webpack-server-side-example), [example-app](https://github.com/webpack/example-app), [flux-examples](https://github.com/facebook/flux/tree/master/examples), [node-express-mongo-demo](https://github.com/madhums/node-express-mongoose-demo), [hackathon-starter](https://github.com/sahat/hackathon-starter/), [web-starter-kit](https://github.com/google/web-starter-kit), [awesome material-ui](https://github.com/callemall/material-ui), [alt and iso](https://github.com/goatslacker/iso/tree/master/examples/react-router-flux), and [React+Webpack+Node](https://github.com/choonkending/react-webpack-node)

License
===============
MIT
