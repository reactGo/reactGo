# react-webpack-node

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/choonkending/react-webpack-node?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![npm version](https://badge.fury.io/js/react-webpack-node.svg)](http://badge.fury.io/js/react-webpack-node)
<img href="https://gratipay.com/~choonkending/" src="https://img.shields.io/gratipay/choonkending.svg">

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

Boilerplate for React application with webpack using alt's Flux running on a node express server.

| React + Redux / alt + Immutable + Express + mongoose + MongoDB |

## Demo site:

[https://react-webpack-node.herokuapp.com/](https://react-webpack-node.herokuapp.com/)

## Features:
### We now have two Flux implementations in this repository:
Isomorphic Flux using:

On master branch:
 - [redux](https://github.com/rackt/redux)
 - [react-router](https://github.com/rackt/react-router)
 - [redux-simple-router](https://github.com/jlongster/redux-simple-router)

On [flux/alt](https://github.com/choonkending/react-webpack-node/tree/flux/alt) branch:
 - [alt](https://github.com/goatslacker/alt) as my Flux implementation
 - [iso](https://github.com/goatslacker/iso) to help with bootstrapping data for isomorphic Flux
 - [react-router](https://github.com/rackt/react-router)

Note: If you have previously used an alt implementation of this repository, please refer to this branch. I will not be updating it as frequently as master, but definitely welcome suggestions!

1. Stores storing data using [ImmutableJS](https://github.com/facebook/immutable-js) data structures - currently only on [flux/alt](https://github.com/choonkending/react-webpack-node/tree/flux/alt)
2. [Css Modules](https://github.com/webpack/css-loader#css-modules)
3. Webpack [config file](https://github.com/choonkending/react-webpack-node/blob/master/webpack/webpack.config.js)
4. Express server
5. Mongoose for MongoDB
6. Procfile to enable deployment to Heroku.

## Why redux?
I'm really a fan of this implementation. The main principles of having:

- a single store
- state being read-only (you have to express an intent to mutate being creating actions)
- mutations are written as pure functions

make it very fun and easy to write predictable code! Redux also has a really good ecosystem and strong support from the community.


## Why alt?

Having isomorphic React was one of my key criteria when choosing a Flux library, which helped narrow down the scope of libraries.

I found alt's implementation to be clean and simple, and like the option of allowing us to create alt instances or using singletons (and flushing the stores). I also like the direction in which alt is heading.

## Mission

The aim of this repo is to incorporate the best practices to building a non-trivial apps with Reactjs and Node.
I am working to document this repo extensively so it would be easy for both beginners and experts to begin dev-ing on it without pulling your hair out.

## Instructions

1. `npm install`
2. `npm run dev` to run locally

There are 3 different "modes" you can develop in:
1. Development -  without react-hot-loader
2. Development - with react-hot-loader
3. Production

### Development build (without Hot loader)

1. `npm run watch` watches and recompiles on file changes
2. `npm run dev` will run the server locally without a proxy. The difference between `dev` and `npm start` is that `npm start` requires you to access your site over HTTPS, otherwise session cookies will not be set. 

~~### Development build with Hot Loader~~

~~We use [react-hot-loader](https://github.com/gaearon/react-hot-loader), which is about the greatest thing that has ever happened. No browser refreshes needed.~~

~~1. `npm run devHotLoader` to build with webpack and start the server. We use webpack-dev-server as a proxy server to serve assets. Changes made are not saved to disk, as that is not what webpack-dev-server is for. However, `npm run watchHotLoader` IF you want to reload the page and see the change in the server-rendered React.~~

Currently I'm working on using [React Transform HMR](https://github.com/gaearon/react-transform-hmr) to replace hot loader and hopefully make dev work easier.

### Production build

Run the commands below for a production build, i.e. what is deployed to Heroku. If you are deploying to Heroku or similar, we assume that you serving the pages over HTTPS.

1. `npm run build && npm start`

#### Bundling with webpack

1. `npm run build` runs `webpack` will run configurations within webpack.config.js.
2. `npm run watch` runs `webpack --watch` to watch and recompile for changes.

##### Where do you compile your scss?
We use [ExtractTextPlugin](https://github.com/webpack/extract-text-webpack-plugin) to extract compiled css in our [webpack config file](https://github.com/choonkending/react-webpack-node/blob/master/webpack.config.js)

#### What loaders do you use for ES6/ ES2015?
[babel-loader](https://github.com/babel/babel-loader). Seriously, try it!

### Setting up your Database

Install MongoDB:

1. `brew update`
2. `brew install mongodb`
3. `mongod` (Make sure you have the permissions to the directory /data/db)

If you're interested in a boilerplate example with postgresql, check [reap](https://github.com/choonkending/reap) out!

### Deploying to Heroku

1. `heroku create`
2. `heroku app:rename newname` if you need to
3. `git push heroku master`

  Note: If you are working from a different machine and get `heroku does not appear to be a remote repository`     message, be sure to run `git remote add heroku git@heroku.com:appname.git`.

4. `heroku open` to open the link
5. If you wish to have a database setup on Heroku, remember to use `heroku addons:add mongohq` or `heroku addons:add mongolab`. 

Note: For Google Auth, read [Setting up Google Authentication](https://github.com/choonkending/react-webpack-node/blob/master#setting-up-google-authentication) below

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

Read more on DO config [here](https://github.com/choonkending/react-webpack-node/blob/master/docs/GettingStartedWithDigitalOcean.md)

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

### 2. I do not know how to write React Components/anything in ES6. Help!

Don't you worry child. Read [this](https://github.com/choonkending/react-webpack-node/blob/master/docs/ReactInES6.md).

You can learn more about ES6 (or ES2015) [here](http://babeljs.io/docs/learn-es2015/).

### 3. Why do I get `Error: Failed to serialize user into session` when trying to login with email/password locally?

It's because there are no users created in your local DB so it's throwing an error on the server's end. We haven't set up the handling of errors for this yet.  I intend to fix this. If you check [this](https://github.com/choonkending/react-webpack-node/blob/master/server/controllers/users.js), you'll see that there is a `/signup` endpoint for creating a user. In the meantime, a quick and easy way to do this is to paste this in your console log while your server is running:

```javascript
var http = new XMLHttpRequest();
var url = "http://localhost:3000/signup";
var params = "email=example@ninja.com&password=ninja";
http.open("POST", url, true);http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

http.send(params);
```

This should create a user in your local database and all will be well!!

### 4. Why do I get a FOUC (Flash Of Unstyled Content) when I run `npm run dev`?

This is because we do not use ExtractTextPlugin in our dev config. It won't happen in production because we extract and serve the css as a separate file. It's something we can all live with, unless you have a better working suggestion, in which case, please create an issue and PR right away!!!

## Todo:

1. Use csrf tokens for form login
2. Let me know!

## How to Contribute:

1. As this repo is still in its baby stages, any suggestions/improvements/bugs can be in the form of Pull Requests, or creating an issue.
2. Coding guidelines:
 - [Airbnb's Style Guide](https://github.com/airbnb/javascript)
 - [bendc's frontend guidelines](https://github.com/bendc/frontend-guidelines)

Credits to [webpack-server-side-example](https://github.com/webpack/react-webpack-server-side-example), [example-app](https://github.com/webpack/example-app), [flux-examples](https://github.com/facebook/flux/tree/master/examples), [node-express-mongo-demo](https://github.com/madhums/node-express-mongoose-demo), [hackathon-starter](https://github.com/sahat/hackathon-starter/), [web-starter-kit](https://github.com/google/web-starter-kit), [awesome material-ui](https://github.com/callemall/material-ui), [alt and iso](https://github.com/goatslacker/iso/tree/master/examples/react-router-flux), [react-starter](https://github.com/webpack/react-starter), [reap](https://github.com/choonkending/reap).

License
===============
MIT
