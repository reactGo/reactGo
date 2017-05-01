3.4.1
===
- PR #868
  - Replace baseUrl variable in config with apiEndpoint
    - This is hardcoded and no longer relying on `process.env.HOST` and `process.env.PORT`
  - Remove unneeded process.env variables

3.4
===
- PR #867
  - Add long term caching with webpack-manifest-plugin

3.3
===
- PR #853
  - Create a boundary around axios - restApiClient
    - Update topics actions creator to use our services module
    - Update services module to use our restApiClient

3.2.1
===
- PR #859 (@avloss):
  - Fix broken links
- PR #860 (@tomas-st):
  - Update apps.md to include new project

3.2
===
- PR #855 (@ZeroCho) :
  - Add yarn.lock file - You can now use yarn install!
  - Bump dependencies:
    - React, react-dom, prop-types, react-addons-test-utils
    - autoprefixer
    - axios
    - babel-cli
    - babel-core
    - babel-plugin-transform-react-remove-prop-types
    - babel-preset-es2015
    - babel-preset-react
    - babel-preset-stage-0
    - bluebird
    - body-parser
    - cross-env
    - css-loader
    - es6-promise
    - express
    - express-session
    - extract-text-webpack-plugin
    - file-loader
    - helmet
    - method-override
    - mongoose
    - pg
    - postcss-cssnext
    - postcss-loader
    - react-helmet
    - react-redux
    - react-router
    - redux-logger
    - rimraf
    - sequelize
    - sequelize-cli
    - spark-md5
    - style-loader
    - url-loader
    - webpack
    - webpack-dev-middleware
    - webpack-hot-middleware
  - Bump dev dependencies:
    - babel-eslint
    - enzyme
    - eslint
    - eslint-config-airbnb
    - eslint-plugin-import
    - eslint-plugin-jsx-a11y
    - react-test-renderer
    - redux-mock-store
    - sinon

3.1
===
- PR #847 Kill karma as a test runner - removing many layers of abstraction feels so good!
  - Bump babel-dependencies
  - Use mocha as a test runner
  - Create a setup file which does the following:
  - babel-register
  - Initialises jsdom by loading document into the global scope. Reference here
  - Remove karma dependencies
  - Remove tests.webpack.js
  - Remove karma.conf.js

3.0.0
===
- PR #822 Webpack is here!!! Hooray!
  - There have been significant changes to our webpack configuration files
```js
- webpack/
   - rules/
   plugins
   externals
   resolve
```

2.2.7
===
- PR #814
  - Remove babel-plugin-transform-decorators-legacy
- PR #819
  - Fix unit tests breaking due to failed import directory

2.2.6
===
- PR #811
  - Move and rename app/server.jsx -> server/render/middleware.js
  - Move createScripts -> server/render/
  - Move pageRenderer -> server/render/

2.2.5
===
- PR #803 - Minor spelling fixes
- PR #805 - Update README with new demo site (https://demo-reactgo.herokuapp.com)
- PR #807 - Rename middlewares/preRenderMiddleware -> utils/fetchDataForRoute

2.2.4
===
- PR #802
  - Add `npm run build` as part of `npm start`
  - Remove postinstall command - we no longer need it! (Running `npm start` or
    `npm run dev` both build the app respectively
  - Remove greenkeeper command in package.json as we no longer use it

2.2.3
===
- PR #800
   - Rename server/config into server/init
   - Move passport.js into passport/index.js

2.2.2
===
- PR #798 - Fix incorrect exclusion of binary files in webpack
`bit` -> `bin`

2.2.1
===
- PR #795 - Convert tracking ID for google analytics into a environment variable
With this change, we also extracted createScript files from pageRenderer

2.2.0
===
- PR #792 - Centralize /config
Having config/ folders in app and server with shared functionality makes it harder to understand and maintain our app.

With this change, we move our config/ to the root level.

2.1.1
===
- PR #786 - Fixed failed imports with named export
- PR #780 - Eslint fix
- Replace external inline-environment-variables-webpack-plugin with
  webpack.EvnrionmentPlugin

2.1
===
- #766
- Modify webpack configurations (prod and dev) to work on server
  - Specify all `node_modules` files (except binaries) as externals.
  - Change entry point for server to be server/index.js
  - Change output path to be /compiled
  - Extract postcss config to common.config.js
  - Remove css extraction
  - Use css-loader/locals in the prerendering bundle to only export identifier mappings webpack/css-loader#59 (comment)
  - Add sourcemap support
- Cleaned up package.json
- Removed babel, babel-node, build:node, build:prod commands in scripts
- Fix db/* files to work with webpack
- Modify express path to work with webpack
- Fix incorrect css-loader query parameters - thanks @ZeroCho!
- Add command line config to webpack to have i
  - `--debug`
  - `--display-error-details` - shows more information about errors. I.e. this
    shows which paths are tried while resolving a module
- Bump postcss-loader, postcss-import, postcss-cssnext, postcss-reporter versions
- Remove postcss-simple-vars


2.0.1
===
- Remove isomorphic fetch as dependency - no longer needed! Hooray!

2.0
===
- #730 - Remove promise middleware

If you previously `dispatch` promises and relied on `promise` middleware, we are planning on deprecating the support for this promise middleware. From #509, we remove usage of `promise` in action dispatched for asynchronous API call in redux action calls.

Previously in order to fetch data asynchronously on route change, we would specify a `static need` method in a `container` component, e.g. `Vote.jsx`. This `need` method specified an action creator such as the method below.

```js
export function fetchTopics() {
  return {
    type: types.GET_TOPICS,
    promise: makeTopicRequest('get')
  };
}
```

`preRenderMiddleware` would call the above function which relied on `promiseMiddleware` to work and fetch data. This coupled our asynchronous data fetching to `redux` which was coupled to `promiseMiddleware`. Upon inspection, we could make `preRenderMiddleware` a simpler function which served one purpose, to invoke the `fetch` functions specified on `Routes` and returning the values.

When we removed usage of promise in our middleware, we effectively **removed the need for this middleware to exist**! Hooray! It's all to a matter of preference, if you like (and it suits your project), keep it!

If you are wondering how you could handle dispatching of events without `promiseMiddleware`, shout in an issue and someone will help you out. Otherwise, look at how we implemented `fetch-data/fetchVoteData.js` and work your way backwards from there!

1.7.18
===
- #518 - remove unneeded `app/services/user.js` @StefanWerW
- #523 - Update app.json with mongolab @StefanWerW
- #548 - Fix 404 in README @malixsys
- #591 - Update apps.md @StefanWerW
- #617 - Remove unused dependencies @StefanWerW
- #569 - Add jsx to lint files @GGAlanSmithee
- #648 - Bugfix for local authentication @shredd
- #675 - Fix page title, meta, link tags for dynamic routes
- #699 - Remove immutable
- #711 - Do no check line-breaks for windows @ZeroCho
- Delete duplicate AWS doc

1.7.17
===
- #509 - fetch data on Route Components
- Update many greenkeeper dependencies

1.7.16
====
- PR #299 - Update all dependencies (greenkeeper)

1.7.15
====
- PR #264 - Instaces of `req` in reference to Promise results changed to `res`
- PR #255 - AWS docs
- PR #267 - docs restructure :+1
- PR #285 - Unit tests for users
- PR #293 - Webpack build tweaks (sourcemap change + ignore plugin)
- PR #294 - Remove redux-devtools from prod
- PR #295 - Add postcss-mixins into config again

1.7.14
====
- PR #256 - Update README to include egghead videos. Egghead ftw!
- PR #257 - Issue #243 - Add `Object.assign` as a babel-plugin
- PR #258 - Issue #252 - Bump dependencies - kerberos and friends
- PR #262 - Issue #251 - Removed legacy Express views config
- PR #254 - Conditional Google Analytics script

1.7.13
====
- PR #247 - Use optimistic update *after* request has been dispatched
- Set #app height to 100%

1.7.12
====
- PR #240 - Update tests to add tests for action creator

1.7.11
====
- PR #237 - Issue #220 - Refactor code to use `mapDispatchToProps`
- PR #227 - Fixed typo in README

1.7.10
====
- PR #223 - Issue #212 - Logging out does not log you out in session

1.7.9
====
- PR #214 - React Helmet 3.1

1.7.8
====
- PR #219 - Dismiss messages on click

1.7.7
====
- PR #215 - Update dependencies
- Rename `constants` to `types`
- Use `resolve.root` instead of `resolve.modulesDirectories`

1.7.6
====
- PR #216 - Fixing migration filenames

1.7.5
====
- PR #200 - Adding Es7 decorators (issue #199)

1.7.4
====
- PR #206 - Move login and register input fields into a form
- PR #210 - Remove unneeded (incorrect) warning

1.7.3
====
- Addresses issue #166 - Duplicate fetch called being made in
  fetchComponentDataBeforeRender.js
- More detailed discussion in PR #201

1.7.2
====
- Addresses issue #202 - Front end routing does not fetch data for component
- More detailed discussion in PR #203

1.7.1
====
- Bump up library versions:
   - React 15
   - Babel Eslint
   - Nock

1.7
====
- We now have multiple ORMs! Mongoose (for MongoDB) and sequelize (for
  Postgresql)!
- Addresses #121 and #156
- Read
  [databases.md](https://github.com/choonkending/react-webpack-node/blob/master/docs/databases.md)
  to learn more.

1.6.2
====
- Addresses issue #191
- Remove DevTools window popup, instead use [**Redux-Devtools Chrome
  Extension**](https://github.com/zalmoxisus/redux-devtools-extension)

1.6.1
====
- Swap databases out with a single config change
- Check PR #190 for the changes
- There is a DB folder in the server which contains
  all the database/ORM specific code, including:
  - models
  - controllers
  - deserializing users
  - connecting to the database
  - session stores
  - passport logic

1.6
====
- Addresses issue #26
- Allow ES6 syntax in javascript/nodeJS scripts in `server/` folder
**Important**
If you have an error such as

> You have mistakenly installed the babel package, which is a no-op

Remember to uninstall babel and instead install babel-cli as follows:

```javascript
npm uninstall babel
npm install babel-cli
```

1.5.4
=====
- Addresses issue #156
- Abstract Database type into `appConfig.js`
- Move main route `all` to `server/index.js` from `server/config/routes.js`
- Use `DB_TYPE` value from `appConfig.js` to conditionally require DB-specific files in `config/connect` and `config/sessions`
- Read more about how to easily NOT use a DB within this repo [here](https://github.com/choonkending/react-webpack-node/blob/master/docs/databases.md)

1.5.3
=====
- Fix eslint warnings and fully lint project

1.5.2
======
- Fix issue #179 - upgraded redux-mock-store API broke the tests

1.5.1
=====
- Fix issue #177 - missing module autoprefixer

1.5
====
**A bit of a warning**
- Switch entirely to postcss, eliminate Sass from this boilerplate :boom:
- Use CSS modules `composes` and `@value` - still does not solve things the way I like.
We know this is still a space with active development.
  - `composes` still does not work with pseudo-classes, which is being solved
  - Having the `Order in extracted chunk undefined` error. Have been looking into this https://github.com/css-modules/css-modules/issues/12#issuecomment-165227881 issue, however, it gets tricky when we use @value.

1.4.5
====
- Begin using `nodemon` so we do not need to run `npm run build` whenever there
  is a change in `server.jsx` or any files within the `server/` folder
- Separate `webpack.config.dev.js` into `webpack.config.dev-client.js` and
  `webpack.config.dev-server.js`. You only need to run `npm run dev` now!!

1.4.4
=====
- Use Babel 6

1.4.3
=====
- Refactor login and sign up flow to work
- Rename Login.jsx to LoginOrRegister.jsx
- Add global Message.jsx container
- Style Login flow a tad bit more :v:
- Rename scss components (Remove prefixes)
- Fix a bunch of ugly lint errors

1.4.2
=====
- Abstract async `fetchTopics` to a more generic `need` method which any component can
  contain
- Make endpoints more RESTful
- Use [axios](https://github.com/mzabriskie/axios) for fetching for topics (only)
- Use sinonJS for `topics-test.js`

1.4.1
======
- Rename and move `elements/Header.jsx` to `components/Meta.jsx` for better structure and semantic meaning.

1.4
=====
- Bump versions of
  - redux ^3.0
  - react-router ^2.0.0-rc5
  - redux-simple-router ^2.0.3
- authentication flow for `/dashboard` route now works server side as well.

1.3.3
=====
- Add unit tests to the repository
- Add the /containers folder and moved several 'components' to containers
- Prevent duplicate topics from being added

1.3.2
=====
This was more of a styling convention change.
- Use classNames.bind(styles) for css modules
- Clean up some code, and reduce code bloat
- Instead of nesting classes within scss, indent them for easier readability.

1.3.1
=====
This was actually a pretty big change!
- Replace react-hot-loader with react-transform-hmr
- Clean package.json so we do not have so many confusing commands
- Refactor bits of webpack
- Temporarily comment out devtools
- Use [redux-simple-router](https://github.com/jlongster/redux-simple-router)

1.3
=====
- Breaking changes (at least for master):
  - We will be using Redux in our master branch. We know a lot more work needs to be done to make this more boilerplate-y.
  - alt is now on the [flux/alt](https://github.com/choonkending/react-webpack-node/tree/flux/alt) branch.

1.2.1
======
- React v0.14
  - Using react-dom to render

1.2
======
- Breaking Changes (Apologize for the breaking changes):
  - react-router bumped up to react-router beta3
  - Deprecating UniversalRenderer:
    - Initially the server + client side code was very similar. But the code has evolved now and keeping them as one reusable class just complicates how the isomorphic (sorry, universal) react works.
    - Separating them now makes it easier to move forward.

1.1.7
======
- Renaming .react.js files into .jsx files. Now I feel like a weight has been lifted off my chest.
- Removing AnimationMixin (no longer in use and serves to be confusing)

1.1.6
======
- Breaking Changes:
   - `package.json` now has different commands to run servers locally. This was to fix an initial issue with sessions over HTTPS.
   - `npm run build && npm run dev` to run locally without a hot loader.
   - `npm run devHotLoader` to build and develop using react-hot-loader.
   - `npm run build && npm start` to run server for production (with HTTPS).

1.1.5
======
- [Css modules](https://github.com/webpack/css-loader#css-modules) that works with development and production setup

1.1.3
=======

- Added [react-hot-loader](https://github.com/gaearon/react-hot-loader) for development speed
- Moved webpack config files into the /webpack folder

1.1.2
======

- Removed swig
- Parsing html files using webpack's html-loader, inspired by [react-starter](https://github.com/webpack/react-starter)
- Using react-helmet to manage favicons and links
- Renamed IsomorphicRouterRenderer to UniversalRenderer
- Removing views folder from server as we no longer need them
- Removing socket.io dependency as the examples no longer supports it

1.1.1
=======

- React Components in ES6
- Using babel-loader instead of jsx-loader

1.1.0
======

- Added ImmutableJS
- Using [alt](https://github.com/goatslacker/alt) and [iso](https://github.com/goatslacker/iso)
- isomorphic [react-router](https://github.com/rackt/react-router) on the client and server
- Structural changes:
	- Renamed:
  	1. SideSection.react -> Scoreboard.react
  	2. Header.react -> Entrybox.react
  	3. NavigationBar.react -> Navigation.react
		4. _navbar.scss -> navigation.scss
	- Removed:
		- AppDispatcher
		- Constants
		- InputFormField.react.js
- TopicStore to use alt's alt.createStore
- TopicActions to use alt's alt.createAction
- With alt, there won't need to be a dispatcher and constants
- Using webpack to build client and serverside bundles
- Removing `/** @jsx React.DOM */`
- Temporarily commented out AnimationMixin
