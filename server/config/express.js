var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var MongoStore =  require('connect-mongo')(session);
var path = require('path');
var swig = require('swig');
var secrets = require('./secrets');
var flash = require('express-flash');
var methodOverride = require('method-override');
var lusca = require('lusca');

module.exports = function (app, passport) {
    app.set('port', (process.env.PORT || 3000));

    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', path.join(__dirname, '..', 'views'));

    // Swig will cache templates for you, but you can disable
    // that and use Express's caching instead, if you like:
    app.set('view cache', false);
    // To disable Swig's cache, do the following:
    swig.setDefaults({cache: false});
    // NOTE: You should always cache templates in a production environment.
    // Don't leave both of these to `false` in production!

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded
    app.use(methodOverride());
    app.use(express.static(path.join(__dirname, '../..', 'public')));

    // Cookie parser should be above session
    // cookieParser - Parse Cookie header and populate req.cookies with an object keyed by cookie names
    // Optionally you may enable signed cookie support by passing a secret string, which assigns req.secret
    // so it may be used by other middleware
    app.use(cookieParser());
    // Create a session middleware with the given options
    // Note session data is not saved in the cookie itself, just the session ID. Session data is stored server-side.
    // Options: resave: forces the session to be saved back to the session store, even if the session was never
    //                  modified during the request. Depending on your store this may be necessary, but it can also
    //                  create race conditions where a client has two parallel requests to your server and changes made
    //                  to the session in one request may get overwritten when the other request ends, even if it made no
    //                  changes(this behavior also depends on what store you're using).
    //          saveUnitialized: Forces a session that is uninitialized to be saved to the store. A session is uninitialized when
    //                  it is new but not modified. Choosing false is useful for implementing login sessions, reducing server storage
    //                  usage, or complying with laws that require permission before setting a cookie. Choosing false will also help with
    //                  race conditions where a client makes multiple parallel requests without a session
    //          secret: This is the secret used to sign the session ID cookie.
    app.use(session({
      resave: true,
      saveUninitialized: true,
      secret: secrets.sessionSecret,
      store: new MongoStore({ url: secrets.db, autoReconnect: true})
    }));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(flash());
    //app.use(lusca({
    //  csrf: true,
    //  xframe: 'SAMEORIGIN',
    //  xssProtection: true
    //}));

    // An object that contains response local variables scoped to the request, and therefore available only to the view(s) rendered during
    // that request/response cycle (if any). Otherwise, this property is identical to app.locals
    // This property is useful for exposing request-level information such as request path name, authenticated user, user settings, and so on.
    app.use(function(req, res, next) {
      res.locals.user = req.user;
      next();
    });

  };
