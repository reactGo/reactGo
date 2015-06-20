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

1.1.1
=======

- React Components in ES6
- Using babel-loader instead of jsx-loader

1.1.2
======

- Removed swig
- Parsing html files using webpack's html-loader, inspired by [react-starter](https://github.com/webpack/react-starter)
- Using react-helmet to manage favicons and links
- Renamed IsomorphicRouterRenderer to UniversalRenderer
- Removing views folder from server as we no longer need them
- Removing socket.io dependency as the examples no longer supports it