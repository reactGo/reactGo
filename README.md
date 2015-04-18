react-webpack-node
==================

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

Boilerplate for React application with webpack using alt's Flux running on a node express server.

Features:
==========
1. Isomorphic flux using alt
2. Simple webpack config file ( Includes code splitting )
3. Running on Express
4. Mongoose for MongoDB
5. Includes a Procfile to enable deployment to heroku.

Why alt?
==========
Having isomorphic React was one of my key criteria when choosing a Flux library, which helped narrow down the scope of libraries.
I found alt's implementation to be clean and simple, and like the option to allow us to create flux instances or using singeltons (and flushing the stores). 

Mission
=================
The aim of this repo is to incorporate the best practices to building a powerful apps with Reactjs and Node.
I am working to document this repo extensively so it would be easy for both beginners and experts to begin dev-ing on it without pulling your hair out.

IsomorphicRouterRenderer
=================
This is a modified version of alt's IsomorphicRenderer. I wished to use webpack to build my server and client side code, but wanted to easily bootstrap data into the stores, and render the correct component using react-router. This takes into account the fact that we're using a singleton store and flushing it everytime (as opposed to creating an instance everytime).

Instructions
================
1. `npm install`
2. `npm start` to run locally

Bundling with webpack
================
1. `npm run build` runs `webpack` will run configurations within webpack.config.js.
2. `npm run watch` runs `webpack --watch` to watch and recompile for changes.
3. `npm run sass-watch` compiles sass using gulp

Setting up your Database
================
1. `brew update`
2. `brew install mongodb`
3. `mongod` (Make sure you have the permissions to the directory /data/db)

Deploying to Heroku
================
1. `heroku create`
2. `heroku app:rename newname` if you need to
3. Run `webpack` . Commit and push the changes (I know, not the best idea).
4. `git push heroku master`

  Note: If you are working from a different machine and get `heroku does not appear to be a remote repository`     message, be sure to run `git remote add heroku git@heroku.com:appname.git`.

5. `heroku open` to open the link
6. If you wish to have a database setup on Heroku, remember to use `heroku addons:add mongohq` or `heroku addons:add mongolab`. 

Deploying to Digital Ocean
=====================
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

Component Hierarchy
===================
App 
- NavigationBar
- RouteHandler
	- Vote
		- EntryBox
		- MainSection
		- SideSection
	- Login
	- About
	- Dashboard


Todo:
================
1. Include an easy set up for database (postgresql).
2. Use of PureRenderComponent mixin for performance
3. Passport auth with express - IN PROGRESS.
- [x] Fetching correct state on refresh.
4. Making the modules more extendible, so you can reuse them.
5. Let me know!

How to Contribute:
=================
1. As this repo is still in its baby stages, any suggestions/improvements/bugs can be in the form of Pull Requests, or creating an issue.

Credits to [webpack-server-side-example](https://github.com/webpack/react-webpack-server-side-example), [example-app](https://github.com/webpack/example-app), [flux-examples](https://github.com/facebook/flux/tree/master/examples), [node-express-mongo-demo](https://github.com/madhums/node-express-mongoose-demo), [web-starter-kit](https://github.com/google/web-starter-kit), [awesome material-ui](https://github.com/callemall/material-ui), [alt and iso](https://github.com/goatslacker/iso/tree/master/examples/react-router-flux).

Please note that if you really wish to use material-ui React Components, you should npm install it into your repo and make it work.

License
===============
MIT