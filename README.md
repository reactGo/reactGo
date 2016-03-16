# React Webpack Node

[![Dependency Status][dep-status-img]][dep-status-link] [![devDependency Status][dev-dep-status-img]][dev-dep-status-link]
[![Gitter][gitter-img]][gitter-link] [![npm version][npm-badge]][npm-link]

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

Your One-Stop solution for a full-stack app with ES6/ES2015 React.js featuring universal Redux, React Router, React Router Redux Hot reloading, CSS modules, Express 4.x, mongoose.

[dep-status-img]: https://david-dm.org/choonkending/react-webpack-node.svg
[dep-status-link]: https://david-dm.org/choonkending/react-webpack-node
[dev-dep-status-img]: https://david-dm.org/choonkending/react-webpack-node/dev-status.svg
[dev-dep-status-link]: https://david-dm.org/choonkending/react-webpack-node#info=devDependencies
[gitter-img]: https://badges.gitter.im/Join%20Chat.svg
[gitter-link]: https://gitter.im/choonkending/react-webpack-node?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[npm-badge]: https://badge.fury.io/js/react-webpack-node.svg
[npm-link]: http://badge.fury.io/js/react-webpack-node


## Demo site:

[https://react-webpack-node.herokuapp.com/](https://react-webpack-node.herokuapp.com/)

## Features:
- ~~isomorphic~~ **universal** [**Redux**](https://github.com/reactjs/redux)
	- Server-side rendering with [**React Router**](https://github.com/reactjs/react-router) 2.x. Having server-side rendering allows you to pre-render the initial state of your components when a user (or search engine crawler) requests a page.
	- Integrating Redux with React Router with ~~Redux Simple Router~~ [React Router Redux](https://github.com/reactjs/react-router-redux)
	- Asynchonous Data Fetching on server-side rendering
	- Server side authentication + Redirecting for components
- Hot reloading using [**react-transform-hmr**](https://github.com/gaearon/react-transform-hmr)
- [**Webpack**](https://github.com/webpack/webpack) for both development and production bundles. It's (in my opinion) the best bundler for JS, CSS, LESS, images, and lots more!
- [**CSS Modules**](https://github.com/css-modules/css-modules) allows for modular and reusable CSS. Say goodbye to conflicts (most of them) and global scope
- **Unit Tests** with webpack, karma, jsdom, mocha, & sinon
	- Reducers
	- Components
	- Synchronous and Asynchronous Actions
- Express 4.x server with a ton of middleware
- Mongoose for MongoDB
- Procfile to enable deployment to Heroku & Docs on Salt configurations + Deployment for Digital Ocean

**Easter Eggs** :egg:

This boilerplate has gone through an evolution
```
React.js -> Facebook Flux -> Alt -> Redux
```

We have two implementations of universal flux:
- **Redux** is on our active **master** branch
- [**Alt**](https://github.com/goatslacker/alt) (previously implemented) on [flux/alt](https://github.com/choonkending/react-webpack-node/tree/flux/alt) branch. It features [iso](https://github.com/goatslacker/iso), react-router and ImmutableJS.

> Note: If you have previously used an alt implementation of this repository, please refer to this branch. I will not be updating it as frequently as master, but definitely welcome suggestions!

## Motivation

The aim of this repo is to incorporate the best practices to building a non-trivial, performant, secure and quality full-stack apps with React.js and Webpack and Node (hence...react-webpack-node). However, along the way we definitely have had extensive additions to this boilerplate! I am working to document this repo extensively so it would be easy for both beginners and experts to begin dev-ing on it without pulling your hair out.

## Why
**Redux**

I'm really a fan of this implementation of flux for state management. The main principles of having:
- a single store
- state being read-only (you have to express an intent to mutate being creating actions)
- mutations written as pure functions

make it very fun and easy to write **predictable** code! There's a ton of reasons why, but you should head to the [Redux docs](http://redux.js.org/index.html) to dive in!

**alt**

Having isomorphic React was one of my key criteria when choosing a Flux library, which helped narrow down the scope of libraries. I found alt's implementation to be clean and simple, and like the option of allowing us to create alt instances or using singletons (and flushing the stores). I also like the direction in which alt is heading.

## Instructions

### Prerequisites

**Install MongoDB as your database**:

```bash
# Update brew formulae
brew update
# Install MongoDB
brew install mongodb
```

If you hate MongoDB with a passion and would like to see a postgresql example, check [**reap**](https://github.com/choonkending/reap) out!


**Setup your mongoDB directory**

Note: Make sure you have the directory and its permissions setup (i.e. `/data/db`):
```bash
sudo mkdir -p /data/db
sudo chown -R `id -u` /data/db
```

**Run your mongoDB server**
```bash
mongod
```

### Build & Dev

**Installation**
```bash
# Install node modules - this includes those for production and development
# You only need to do this once :)
npm install
```

**Development**

```bash
# Starts the server with Hot Reloading
# Run webpack through webpack.config.dev.js
npm run dev

```

**Production**

Run the commands below for a production build, i.e. what is deployed to Heroku. If you are deploying to Heroku or similar, we assume that you serving the pages over HTTPS.

```bash
# Clean public folder
# Run webpack through webpack.config.prod.js
npm run build

# Start server
## Note: You need MongoDB running
npm start
```

**Deployment**

Heroku
```bash
heroku create

# Deploy to Heroku server
git push heroku master

# Database on Heroku
heroku addons:add mongohq
# or
heroku addons:add mongolab

# OPTIONAL:

# Rename if you need to
heroku app:rename <newname>

# Open Link in browser
heroku open

```

Note:
1. If you are working from a different machine and get `heroku does not appear to be a remote repository` message, be sure to run `git remote add heroku git@heroku.com:appname.git`.
2. For setting up Google Authentication for Heroku and local dev, read the FAQ section

Digital Ocean

1. Create a Droplet
2. Follow [this](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04) or
[this](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-an-ubuntu-14-04-server) tutorial
to set up nodejs
3. Follow [this](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-12-04) tutorial to install mongodb
4. git clone this repo
```bash
npm install
sudo npm install pm2 -g
pm2 start server/index.js
pm2 startup ubuntu
sudo env PATH=$PATH:/usr/local/bin pm2 startup ubuntu -u sammy

```

Read more on DO config [here](https://github.com/choonkending/react-webpack-node/blob/master/docs/GettingStartedWithDigitalOcean.md)

AWS

TBD - if you have an interest, please help

## Unit Tests

Testing with:
- `karma` as test runner
	- `karma.conf.js` for the main karma configuration (it has webpack configurations)
	- `tests.webpack.js` which is the single entry file. It uses `webpack`'s require API to find all the files we need that have a `-test.js` suffix.
- `mocha` as the test framework
- `jsdom` as my test environment

```bash
# Run test once
npm test

# Run in watch mode
npm test:watch
```

We have unit tests for async (redux) actions, reducers, and components.

## Data Flow

A simplistic representation of data flow from server to client is:

```
Express app.use() receives a request
-> Calls a pre-built webpack file for the server
-> Runs matching of routes in react-router for server
-> Makes async data fetching request
-> Renders Route component to string
-> Construct HTML file (with Meta, Link tags using helmet)
-> Browser receives html file with initial state
-> Client side React.JS kicks in and initializes with given state
-> Continues where it left off
-> Everyone is happy :)
```

More TBD

## Yeoman Generator
If you like using yeoman generators, you could check out [this](https://github.com/iiegor/generator-react-webpack-node) cool yeoman generator by @iiegor!

## FAQ
1. Where do you compile your **css**?
	We use [ExtractTextPlugin](https://github.com/webpack/extract-text-webpack-plugin) to extract compiled css in our [webpack config file](https://github.com/choonkending/react-webpack-node/blob/master/webpack.config.prod.js).
	Read more about **postcss** and **Css modules** [here](https://github.com/choonkending/react-webpack-node/blob/master/docs/css.md).
2. What loaders do you use for ES6/ ES2015?
	[babel-loader](https://github.com/babel/babel-loader). Seriously, try it!
3. Google Authentication does not work locally or on heroku!
	1. Follow [these steps from Google](https://developers.google.com/identity/protocols/OpenIDConnect) to create your API  keys on [Google Developers Console](https://console.developers.google.com/)
	2. Under APIs & Auth, Copy your Client ID and Client Secret

**Dev**

- For Google Auth to work locally, you need to do the following in your terminal before starting the server:

```bash
export GOOGLE_CLIENTID=YOUR_CLIENTID
export GOOGLE_SECRET=YOUR_SECRET
```

**Heroku**

- Fret not! Heroku's covered [this](https://devcenter.heroku.com/articles/config-vars) pretty well:

```bash
heroku config:set GOOGLE_CLIENTID=YOUR_CLIENTID
heroku config:set GOOGLE_SECRET=YOUR_SECRET
heroku config:set GOOGLE_CALLBACK=YOUR_CALLBACK
```
4. I do not know how to write React Components/anything in ES6. Help!
	- Don't you worry child. Read [this](https://github.com/choonkending/react-webpack-node/blob/master/docs/ReactInES6.md).
	- You can learn more about ES6 (or ES2015) [here](http://babeljs.io/docs/learn-es2015/).

## How to Contribute:

Best way to keep up to date is check the [issues](https://github.com/choonkending/react-webpack-node/issues). I really welcome improvements for **all aspects** of an app.

1. Any suggestions/improvements/bugs can be in the form of Pull Requests, or creating an issue.
2. Coding guidelines:
 - [Airbnb's Style Guide](https://github.com/airbnb/javascript)
 - [bendc's frontend guidelines](https://github.com/bendc/frontend-guidelines)


Credits to [webpack-server-side-example](https://github.com/webpack/react-webpack-server-side-example), [example-app](https://github.com/webpack/example-app), [flux-examples](https://github.com/facebook/flux/tree/master/examples), [node-express-mongo-demo](https://github.com/madhums/node-express-mongoose-demo), [hackathon-starter](https://github.com/sahat/hackathon-starter/), [web-starter-kit](https://github.com/google/web-starter-kit), [awesome material-ui](https://github.com/callemall/material-ui), [alt and iso](https://github.com/goatslacker/iso/tree/master/examples/react-router-flux), [react-starter](https://github.com/webpack/react-starter), [reap](https://github.com/choonkending/reap), [isomorphic-redux-app](https://github.com/caljrimmer/isomorphic-redux-app) and [mxstbr/react-boilerplate](https://github.com/mxstbr/react-boilerplate/blob/master/README.md)

License
===============
MIT
