# reactGo

[![Dependency Status][dep-status-img]][dep-status-link] [![devDependency Status][dev-dep-status-img]][dev-dep-status-link]
[![Gitter][gitter-img]][gitter-link] [![npm version][npm-badge]][npm-link]

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

> Your One-Stop solution for a full-stack app with ES6/ES2015 React.js featuring universal Redux, React Router, React Router Redux Hot reloading, CSS modules, Express 4.x, and multiple ORMs. :rocket:

_Formerly known as choonkending/react-webpack-node_

[dep-status-img]: https://david-dm.org/choonkending/react-webpack-node.svg
[dep-status-link]: https://david-dm.org/choonkending/react-webpack-node
[dev-dep-status-img]: https://david-dm.org/choonkending/react-webpack-node/dev-status.svg
[dev-dep-status-link]: https://david-dm.org/choonkending/react-webpack-node#info=devDependencies
[gitter-img]: https://badges.gitter.im/Join%20Chat.svg
[gitter-link]: https://gitter.im/choonkending/react-webpack-node?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[npm-badge]: https://badge.fury.io/js/react-webpack-node.svg
[npm-link]: http://badge.fury.io/js/react-webpack-node


#### Demo site: [**https://demo-reactgo.herokuapp.com/**](https://demo-reactgo.herokuapp.com/)

## Features:
- ~~isomorphic~~ [**universal**](https://medium.com/@ghengeveld/isomorphism-vs-universal-javascript-4b47fb481beb#.4x2t3jlmx) Rendering
- [**Redux**](https://github.com/reactjs/redux) Predictive state containers.
- Server-side rendering with [**React Router**](https://github.com/reactjs/react-router) 2.x. Having server-side rendering allows you to pre-render the initial state of your components when a user (or search engine crawler) requests a page.
- Integrating Redux with React Router with ~~Redux Simple Router~~ [React Router Redux](https://github.com/reactjs/react-router-redux)
- Asynchronous Data Fetching on server-side rendering
- Server side authentication + Redirecting for components
- Hot reloading using [**react-transform-hmr**](https://github.com/gaearon/react-transform-hmr)
- Time travel using [**Redux-Devtools Chrome Extension**](https://github.com/zalmoxisus/redux-devtools-extension)
- [**Webpack 2**](https://github.com/webpack/webpack) for both development and production bundles. It's (in my opinion) the best bundler for JS, CSS, LESS, images, and lots more!
- [**CSS Modules**](https://github.com/css-modules/css-modules) allows for modular and reusable CSS. Say goodbye to conflicts (most of them) and global scope

- **Unit Testing** with jsdom, mocha, sinon & enzyme
	- Reducers
	- Components ([Enzyme](http://airbnb.io/enzyme))
	- Synchronous and Asynchronous Actions

- Express 4.x server with a ton of middleware
- Mongoose for MongoDB
- Sequelize for Postgres
- Procfile to enable deployment to Heroku & Docs on Salt configurations + Deployment for Digital Ocean


## Motivation

The motivation is simple: best practices and a wonderful development experience. Our ultimate goal is to provide a boilerplate for building non-trivial applications that are secure, performant and free of bugs. Believing a mixture of React.js, Webpack and Node was the best way to accomplish this, we created react-webpack-node.

react-webpack-node also works great as a learning tool for anyone interested in learning how to implement a large React application, or those who want a modern setup ASAP.

We've had extensive community additions to this boilerplate over time as practices have evolved, and are always interested in hearing new ideas or contributions.

## Why Redux

We're really big fans of this implementation of flux for state management. The main principles of having:
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

#### Database

We currently support MongoDB and Postgres, as well as the ability to not use any database. [Learn](docs/databases.md) about how to configure your app.

#### Development

Development is a breeze. Once you have installed all your dependencies all the configuration is done for you. using simple The process is outlined [here](docs/development.md).

#### Unit Tests

Testing with:
- `mocha` as the test framework
	- We find all the files we need that have a `-test.js` suffix in the `/app` directory.
- `jsdom` as my test environment

```bash
# Run test once
npm test

# Run in watch mode
npm test:watch
```

We have unit tests for async (redux) actions, reducers, and stateless components with [enzyme](http://airbnb.io/enzyme).

#### Deployment

Currently we support [Heroku](docs/deployment/Heroku.md) and [Digital Ocean](docs/deployment/DigitalOcean.md) and [AWS](docs/deployment/aws.md)

#### Roadmap
We have an outline of our roadmap [here](https://github.com/reactGo/reactGo/blob/master/Roadmap.md)

## Yeoman Generator
If you like using yeoman generators, you could check out [this](https://github.com/iiegor/generator-react-webpack-node) cool yeoman generator by @iiegor!


## FAQ

We have assembled an FAQ [here](/docs/FAQ.md)

## Check out what people have done

We have a [list](/docs/apps.md) of projects that have been created with this boilerplate. Check
them out to see what can be done or to get some inspiration.

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
