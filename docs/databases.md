##Setting up Postgres

#### Install Postgres as your database:

```bash
# Update brew formulae
brew update
# Install Postgres
brew install postgres
```

#### Run your Postgres server
```bash
postgres -D /usr/local/var/postgres
```

#### Setup your postgres database
```bash
createuser root
createdb react_webpack_node_development # or test/production
npm run sequelize db:migrate
```

#### Installing on Heroku
```bash
# https://devcenter.heroku.com/articles/heroku-postgresql#provisioning-the-add-on
heroku addons:create heroku-postgresql:<PLANNAME> --as POSTGRES_DB
heroku run bash
# once in bash
npm run sequelize db:migrate
# exit heroku bash
```
