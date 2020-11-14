1. Google Authentication does not work locally or on heroku!
	1. Follow [these steps from Google](https://developers.google.com/identity/protocols/OpenIDConnect) to create your API  keys on [Google Developers Console](https://console.developers.google.com/)
	2. Under APIs & Auth, Copy your Client ID and Client Secret

**Local dev**

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
