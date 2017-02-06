1. Where do you compile your **css**?
	We use [ExtractTextPlugin](https://github.com/webpack/extract-text-webpack-plugin) to extract compiled css in our webpack config file. Checkout out the `webpack/` folder!
	Read more about **postcss** and **Css modules** [here](https://github.com/reactGo/reactGo/blob/master/docs/css.md).
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


