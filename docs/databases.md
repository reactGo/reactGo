##Setting Up MongoDB
Follow the steps [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials)

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

##Setting Up MySQL
Follow the steps [here](https://dev.mysql.com/doc/mysql-installation-excerpt/8.0/en/installing.html)

##Setting up Postgres
Follow the steps [here](https://www.postgresqltutorial.com/install-postgresql/)

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
