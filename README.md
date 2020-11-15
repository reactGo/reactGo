# reactGo

[![Dependency Status][dep-status-img]][dep-status-link]
[![Gitter][gitter-img]][gitter-link] [![npm version][npm-badge]][npm-link]

[한글 공식문서](https://github.com/reactGo/reactGo/blob/master/README_KO.md)

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

> Your One-Stop solution for a full-stack app with ES6/ES2015 React.js featuring universal Redux, Redux Thunk, React Router, Hot reloading, Emotion, Express 4.x, and multiple ORMs. :rocket:

_Formerly known as choonkending/react-webpack-node_

[dep-status-img]: https://img.shields.io/librariesio/release/npm/@reactgo/cli
[dep-status-link]: https://david-dm.org/@reactgo/cli
[gitter-img]: https://badges.gitter.im/Join%20Chat.svg
[gitter-link]: https://gitter.im/choonkending/react-webpack-node?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[npm-badge]: https://badge.fury.io/js/%40reactgo%2Fcli.svg
[npm-link]: http://badge.fury.io/js/%40reactgo%2Fcli

#### Demo site: [**https://demo-reactgo.herokuapp.com/**](https://demo-reactgo.herokuapp.com/)

## Features:
- ~~isomorphic~~ [**universal**](https://medium.com/@ghengeveld/isomorphism-vs-universal-javascript-4b47fb481beb#.4x2t3jlmx) Rendering
- [**Redux**](https://github.com/reactjs/redux) Predictive state containers.
- [**Redux Thunk**](https://github.com/reduxjs/redux-thunk) for asynchronous action dispatch.
- Server-side rendering with [**React Router**](https://github.com/reactjs/react-router) 5.x. Having server-side rendering allows you to pre-render the initial state of your components when a user (or search engine crawler) requests a page.
- Integrating Redux with React Router with [**Connected React Router**](https://github.com/supasate/connected-react-router)
- Asynchronous Data Fetching on server-side rendering(SSR)
- Server side authentication + Redirecting for components
- Hot reloading using [**hot-loader/react-dom**](https://github.com/hot-loader/react-dom)
- Time travel using [**Redux-Devtools Chrome Extension**](https://github.com/zalmoxisus/redux-devtools-extension)
- [**Webpack 5**](https://github.com/webpack/webpack) for both development and production bundles. It's (in my opinion) the best bundler for JS, CSS, LESS, images, and lots more!
- [**emotion**](https://emotion.sh/docs/introduction) allows for CSS-in-JS. Say goodbye to conflicts (most of them) and global scope

- **Unit Testing** with jsdom, mocha, sinon & enzyme
	- Reducers
	- Components ([Enzyme](http://airbnb.io/enzyme))
	- Synchronous and Asynchronous Actions

- Express 4.x server with a ton of middleware
- Mongoose for MongoDB
- Sequelize for Postgres or MySQL
- Procfile to enable deployment to Heroku & Docs on Salt configurations + Deployment for Digital Ocean


## Motivation

The motivation is simple: best practices and a wonderful development experience. Our ultimate goal is to provide a boilerplate for building non-trivial applications that are secure, performant and free of bugs. Believing a mixture of React.js, Webpack and Node was the best way to accomplish this, we created react-webpack-node.

reactGo also works great as a learning tool for anyone interested in learning how to implement a large React application, or those who want a modern setup ASAP.

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
-> Runs matching of routes in react-router for server(with react-router-config)
-> Makes async data fetching request
-> Renders Route component to string
-> Construct HTML file (with Meta, Link tags using helmet)
-> Browser receives html file with initial state
-> Client side React.JS kicks in and initializes with given state
-> Continues where it left off
-> Everyone is happy :)
```

More TBD

## Instructions

#### Database

We currently support MongoDB, MySQL and Postgres, as well as the ability to not use any database. [Learn](docs/databases.md) about how to configure your app.

#### Development

You have to install ReactGo CLI to set up development environment.

```bash
# Install ReactGo CLI first
# Your terminal have to be located at reactGo project.
npm i -g @reactgo/cli
# After installation, move to the directory you wanna clone ReactGo
cd /somewhere/you/want/to/clone
# Run CLI and choose which stack you wanna use
reactgo
``` 

The next process is outlined [here](docs/development.md).

#### Building the application

```bash
# Build the application for development
npm run build

# Build the application for production
npm run build:dev
```

#### Running the application

```bash
# Run in development mode (with hot-reloading)
npm run dev

# Run in production mode
npm start
```

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

## Check out what people have done

We have a [list](/docs/apps.md) of projects that have been created with this boilerplate. Check
them out to see what can be done or to get some inspiration.

## How to Contribute:

Best way to keep up to date is check the [issues](https://github.com/reactGo/reactGo/issues). I really welcome improvements for **all aspects** of an app.

1. Any suggestions/improvements/bugs can be in the form of Pull Requests, or creating an issue.
2. Coding guidelines:
 - [Airbnb's Style Guide](https://github.com/airbnb/javascript)
 - [bendc's frontend guidelines](https://github.com/bendc/frontend-guidelines)
3. If you wanna change codes and make some PR, you have to follow following steps.
```bash
# Install ReactGo CLI
# Your terminal have to be located at reactGo project.
npm i -g
# Run CLI and choose which stack you wanna change
reactgo -d
# Then app and server folders will be symlinked from original ones that you chose.
# Change whatever you want, but don't touch app and server folders. Those are just symlinks.
# Commit and push after done.
``` 

**Easter Eggs** :egg:

This boilerplate has gone through an evolution
```
React.js -> Facebook Flux -> Alt -> Redux(thunk -> saga -> toolkit)
                                 -> MobX(in mobx branch)
```

License
===============
MIT
