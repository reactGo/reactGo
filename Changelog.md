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
