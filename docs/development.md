## Prerequisites

> If you wish to run this app **without installing/running a database**, you can easily do so. Read more [here](https://github.com/choonkending/react-webpack-node/blob/master/docs/databases.md).


## MongoDB

#### Install MongoDB as your database

```bash
# Update brew formulae
brew update
# Install MongoDB
brew install mongodb
```

If you hate MongoDB with a passion and would like to see a postgresql example, check [this](./databases.md) out!

#### Setup your mongoDB directory

Note: Make sure you have the directory and its permissions setup (i.e. `/data/db`):
```bash
sudo mkdir -p /data/db
sudo chown -R `id -u` /data/db
```

#### Run your mongoDB server
```bash
mongod
```

## Build & Dev

#### Installation
```bash
# Install node modules - this includes those for production and development
# You only need to do this once :)
npm install
```

#### Development

```bash
# Starts the server with Hot Reloading
# Run webpack through webpack.config.dev.js
npm run dev

```

#### Production

Run the commands below for a production build, i.e. what is deployed to Heroku. If you are deploying to Heroku or similar, we assume that you are serving the pages over HTTPS.

```bash
# Clean public folder
# Run webpack through webpack.config.prod.js
npm run build

# Start server
## Note: You need MongoDB running
npm start
```
