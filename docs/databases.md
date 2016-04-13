# Databases

**How do I run this app without a database?**

Change the following:
```javascript
/*
 * server/config/appConfig.js
 */

DB_TYPE: process.env.DB_TYPE || DB_TYPES.NONE


/*
 * Either:
 * 1. Remove the `require` line below
 * 2. Edit the `controllers` in `config/routes` to not have a DB dependency
 */
require('./config/routes')(app);
```

**How do I switch to a different database?**

We abstracted the DB config in `appConfig` to enable you to require the correct files if you were to use a different database, e.g. postgresql. Currently there is work underway by our awesome contributors to add that into the repo as a potential dependency. :)

