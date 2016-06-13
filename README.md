# React Webpack Node

[![Dependency Status][dep-status-img]][dep-status-link] [![devDependency Status][dev-dep-status-img]][dev-dep-status-link]
[![Gitter][gitter-img]][gitter-link] [![npm version][npm-badge]][npm-link]

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

Your One-Stop solution for a full-stack app with ES6/ES2015 React.js featuring universal Redux, React Router, React Router Redux Hot reloading, CSS modules, Express 4.x, and multiple ORMs.

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
- ~~isomorphic~~ [**universal**](https://medium.com/@ghengeveld/isomorphism-vs-universal-javascript-4b47fb481beb#.4x2t3jlmx) [**Redux**](https://github.com/reactjs/redux)
	- Server-side rendering with [**React Router**](https://github.com/reactjs/react-router) 2.x. Having server-side rendering allows you to pre-render the initial state of your components when a user (or search engine crawler) requests a page.
	- Integrating Redux with React Router with ~~Redux Simple Router~~ [React Router Redux](https://github.com/reactjs/react-router-redux)
	- Asynchonous Data Fetching on server-side rendering
	- Server side authentication + Redirecting for components
- Hot reloading using [**react-transform-hmr**](https://github.com/gaearon/react-transform-hmr)
- Time travel using [**Redux-Devtools Chrome Extension**](https://github.com/zalmoxisus/redux-devtools-extension)
- [**Webpack**](https://github.com/webpack/webpack) for both development and production bundles. It's (in my opinion) the best bundler for JS, CSS, LESS, images, and lots more!
- [**CSS Modules**](https://github.com/css-modules/css-modules) allows for modular and reusable CSS. Say goodbye to conflicts (most of them) and global scope
- **Unit Tests** with webpack, karma, jsdom, mocha, & sinon
	- Reducers
	- Components
	- Synchronous and Asynchronous Actions
- Express 4.x server with a ton of middleware
- Mongoose for MongoDB
- Sequelize for Postgres
- Procfile to enable deployment to Heroku & Docs on Salt configurations + Deployment for Digital Ocean


## Motivation

The aim of this repo is to incorporate the best practices to building a non-trivial, performant, secure and quality full-stack apps with React.js and Webpack and Node (hence...react-webpack-node). However, along the way we definitely have had extensive additions to this boilerplate! I am working to document this repo extensively so it would be easy for both beginners and experts to begin dev-ing on it without pulling your hair out.

## Why Redux

I'm really a fan of this implementation of flux for state management. The main principles of having:
- a single store
- state being read-only (you have to express an intent to mutate being creating actions)
- mutations written as pure functions

make it very fun and easy to write **predictable** code! There's a ton of reasons why, but you should head to the [Redux docs](http://redux.js.org/index.html) to dive in!

Or if you are more of a *visual learner* watch the free egghead video series narrated by the creator of redux:

1. [Getting Started](https://egghead.io/series/getting-started-with-redux)
2. [Building Idiomatically](https://egghead.io/series/building-react-applications-with-idiomatic-redux)

#### Data Flow

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


#### Redux DevTools

You will have to install redux devtools extension from [here](https://github.com/zalmoxisus/redux-devtools-extension) and then everything should just work!


## Instructions

#### Deployment

Currently we support [Heroku](docs/deployment/Heroku.md) and [Digital Ocean](docs/deployment/DigitalOcean.md) and [AWS](docs/deployment/AWS.md)

#### Unit Tests

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


## Yeoman Generator
If you like using yeoman generators, you could check out [this](https://github.com/iiegor/generator-react-webpack-node) cool yeoman generator by @iiegor!

## FAQ


**Google Analytics**

Google Analytics are there if you want them and very easy to enable the basic site level support. All you need to do is replace the tracking ID in `app/server.jsx`

To learn about how to best use Google Analytics for your site [read more](https://developers.google.com/analytics/devguides/collection/analyticsjs/) here.


## How to Contribute:

Best way to keep up to date is check the [issues](https://github.com/choonkending/react-webpack-node/issues). I really welcome improvements for **all aspects** of an app.

1. Any suggestions/improvements/bugs can be in the form of Pull Requests, or creating an issue.
2. Coding guidelines:
 - [Airbnb's Style Guide](https://github.com/airbnb/javascript)
 - [bendc's frontend guidelines](https://github.com/bendc/frontend-guidelines)


Credits to [webpack-server-side-example](https://github.com/webpack/react-webpack-server-side-example), [example-app](https://github.com/webpack/example-app), [flux-examples](https://github.com/facebook/flux/tree/master/examples), [node-express-mongo-demo](https://github.com/madhums/node-express-mongoose-demo), [hackathon-starter](https://github.com/sahat/hackathon-starter/), [web-starter-kit](https://github.com/google/web-starter-kit), [awesome material-ui](https://github.com/callemall/material-ui), [alt and iso](https://github.com/goatslacker/iso/tree/master/examples/react-router-flux), [react-starter](https://github.com/webpack/react-starter), [reap](https://github.com/choonkending/reap), [isomorphic-redux-app](https://github.com/caljrimmer/isomorphic-redux-app) and [mxstbr/react-boilerplate](https://github.com/mxstbr/react-boilerplate/blob/master/README.md)


**Easter Eggs** :egg:

This boilerplate has gone through an evolution
```
React.js -> Facebook Flux -> Alt -> Redux
```

We have two implementations of universal flux:
- **Redux** is on our active **master** branch
- [**Alt**](https://github.com/goatslacker/alt) (previously implemented) on [flux/alt](https://github.com/choonkending/react-webpack-node/tree/flux/alt) branch. It features [iso](https://github.com/goatslacker/iso), react-router and ImmutableJS.

> Note: If you have previously used an alt implementation of this repository, please refer to this branch. I will not be updating it as frequently as master, but definitely welcome suggestions!

License
===============
MIT
