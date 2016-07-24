## Getting Started with Heroku

Heroku
```bash
heroku create

# Deploy to Heroku server
git push heroku master

# Database on Heroku
heroku addons:create mongohq
# or
heroku addons:create mongolab

# OPTIONAL:

# Rename if you need to
heroku apps:rename <newname>

# Open Link in browser
heroku open

```



Note:

1. If you are working from a different machine and get `heroku does not appear to be a remote repository` message, be sure to run `git remote add heroku git@heroku.com:appname.git`.
2. For setting up Google Authentication for Heroku and local dev, read the FAQ section
