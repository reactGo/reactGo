# react-webpack-node

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/choonkending/react-webpack-node?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![npm version](https://badge.fury.io/js/react-webpack-node.svg)](http://badge.fury.io/js/react-webpack-node)
<img href="https://gratipay.com/~choonkending/" src="https://img.shields.io/gratipay/choonkending.svg">

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

Boilerplate for an ~~isomorphic~~ universal React application in ES6 with webpack using Redux running on an Express server.

| React + Redux / alt + Immutable + Express + mongoose + MongoDB |

## Demo site:

[https://react-webpack-node.herokuapp.com/](https://react-webpack-node.herokuapp.com/)

## Features:
We now have two ~~isomorphic~~ Universal Flux implementations in this repository:

On master branch:
 - [redux](https://github.com/rackt/redux)
 - [react-router](https://github.com/rackt/react-router)
 - [redux-simple-router](https://github.com/jlongster/redux-simple-router)
 - [react-transform-hmr](https://github.com/gaearon/react-transform-hmr)

On [flux/alt](https://github.com/choonkending/react-webpack-node/tree/flux/alt) branch:
 - [alt](https://github.com/goatslacker/alt)
 - [iso](https://github.com/goatslacker/iso) to help with bootstrapping data for isomorphic Flux
 - [react-router](https://github.com/rackt/react-router)
 - [ImmutableJS](https://github.com/facebook/immutable-js)

> Note: If you have previously used an alt implementation of this repository, please refer to this branch. I will not be updating it as frequently as master, but definitely welcome suggestions!

1. [Css Modules](https://github.com/webpack/css-loader#css-modules)
2. Webpack [config file](https://github.com/choonkending/react-webpack-node/blob/master/webpack/webpack.config.prod.js)
3. Express server
4. Mongoose for MongoDB
5. Procfile to enable deployment to Heroku.

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

1. First run your mongo server `mongod`
	- Read [setting up your database](https://github.com/choonkending/react-webpack-node#setting-up-your-database) section to install MongoDB

### Production build

Run the commands below for a production build, i.e. what is deployed to Heroku. If you are deploying to Heroku or similar, we assume that you serving the pages over HTTPS.

1. `npm run build`
	- cleans the `/public` folder
	- runs `webpack` through configurations specified in `webpack.config.prod.js`
2. `npm start` to start server

### Development build

1. `npm run dev` starts the server with [webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware) and [react-transform-hmr](https://github.com/gaearon/react-transform-hmr)
	- If you get an error saying file not found, run `npm run build && npm run dev` (because the server relies on the compiled file to exist in order to serve those files).
	- I am looking into using [webpack isomorphic tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools) to help with bundling files server side, so we will potentially move away from having two configs for client and server side. 

##### Where do you compile your scss?
We use [ExtractTextPlugin](https://github.com/webpack/extract-text-webpack-plugin) to extract compiled css in our [webpack config file](https://github.com/choonkending/react-webpack-node/blob/master/webpack.config.prod.js)

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
	- App.jsx
		- Navigation.jsx
		- Vote.jsx
			- EntryBox.jsx
			- MainSection.jsx
			- Scoreboard.jsx
		- Login.jsx
		- Logout.jsx
		- About.jsx

## Testing

Testing with:
- `karma` as test runner
	- `karma.conf.js` for the main karma configuration (it has webpack configurations)
	- `tests.webpack.js` which is the single entry file. It uses `webpack`'s require API to find all the files we need that have a `-test.js` suffix.
- `mocha` as the test framework
- `jsdom` as my test environment

1. `npm test` to run test once
2. `npm test:watch` to run in `watch` mode

We have unit tests for `/actions` and `/reducers` in place, but none for `/components` yet. 

I previously followed the [example for writing tests with redux](http://rackt.org/redux/docs/recipes/WritingTests.html) which used `mocha` and `jsdom`, but I soon encountered problems with `require`-ing files without using a relative path, also a lot issues with `nock`-ing correctly. 


## Questions
1. Google Authentication does not work locally or on heroku!
	- *Setting up Google Authentication*
		1. Follow [these steps from Google](https://developers.google.com/identity/protocols/OpenIDConnect) to create your API  keys on [Google Developers Console](https://console.developers.google.com/)
		2. Under APIs & Auth, Copy your Client ID and Client Secret
	- *Dev* 
		- For Google Auth to work locally, you need to do the following in your terminal before starting the server:
			1. `export GOOGLE_CLIENTID=YOUR_CLIENTID`
			2. `export GOOGLE_SECRET=YOUR_SECRET`
	- *Heroku*
		- Fret not! Heroku's covered [this](https://devcenter.heroku.com/articles/config-vars) pretty well:
			1. `heroku config:set GOOGLE_CLIENTID=YOUR_CLIENTID`
			2. `heroku config:set GOOGLE_SECRET=YOUR_SECRET`
			3. `heroku config:set GOOGLE_CALLBACK=YOUR_CALLBACK`

2. I do not know how to write React Components/anything in ES6. Help!
	- Don't you worry child. Read [this](https://github.com/choonkending/react-webpack-node/blob/master/docs/ReactInES6.md).
	- You can learn more about ES6 (or ES2015) [here](http://babeljs.io/docs/learn-es2015/).
3. Why do I get `Error: Failed to serialize user into session` when trying to login with email/password locally?
It's because there are no users created in your local DB so it's throwing an error on the server's end. We haven't set up the handling of errors for this yet.  I intend to fix this. If you check [this](https://github.com/choonkending/react-webpack-node/blob/master/server/controllers/users.js), you'll see that there is a `/signup` endpoint for creating a user. In the meantime, a quick and easy way to do this is to paste this in your console log while your server is running:

```javascript
var http = new XMLHttpRequest();
var url = "http://localhost:3000/signup";
var params = "email=example@ninja.com&password=ninja";
http.open("POST", url, true);http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

http.send(params);
```

This should create a user in your local database and all will be well!!

## Todo:

Best way to keep up to date is check the [issues](https://github.com/choonkending/react-webpack-node/issues). 

My priorities are:

1. Improving the server side rendering
2. Better dev experience
3. Auth routing

## How to Contribute:

1. Any suggestions/improvements/bugs can be in the form of Pull Requests, or creating an issue.
2. Coding guidelines:
 - [Airbnb's Style Guide](https://github.com/airbnb/javascript)
 - [bendc's frontend guidelines](https://github.com/bendc/frontend-guidelines)

Credits to [webpack-server-side-example](https://github.com/webpack/react-webpack-server-side-example), [example-app](https://github.com/webpack/example-app), [flux-examples](https://github.com/facebook/flux/tree/master/examples), [node-express-mongo-demo](https://github.com/madhums/node-express-mongoose-demo), [hackathon-starter](https://github.com/sahat/hackathon-starter/), [web-starter-kit](https://github.com/google/web-starter-kit), [awesome material-ui](https://github.com/callemall/material-ui), [alt and iso](https://github.com/goatslacker/iso/tree/master/examples/react-router-flux), [react-starter](https://github.com/webpack/react-starter), [reap](https://github.com/choonkending/reap).

License
===============
MIT
