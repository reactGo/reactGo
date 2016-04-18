# Databases

**How do I run this app without a database?**

Change the following:
```javascript
/*
 * server/config/appConfig.js
 */

DB_TYPE: process.env.DB_TYPE || DB_TYPES.NONE
```

**How do I switch to a different database?**

We abstracted the DB config in `appConfig` to enable you to require the correct files if you were to use a different database, e.g. postgresql.

Please read [this PR](https://github.com/choonkending/react-webpack-node/pull/190#issuecomment-210273745) for more context.

```javascript
/*
 * server/config/appConfig.js
 */

DB_TYPE: process.env.DB_TYPE || DB_TYPES.YOUR_DB
```

You will need to add a folder after `/db` with [may] contain the following ORM specific code:
- models
- controllers
- passport logic
- connecting to the database
- session stores
- deserialising users

