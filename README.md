# Passport-Strava

[Passport](http://passportjs.org/) strategy for authenticating with [Strava](http://www.strava.com/)
using the OAuth 2.0 API.

This module lets you authenticate using Strava in your Node.js applications.
By plugging into Passport, Strava authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Usage

#### Configure Strategy

The Strava authentication strategy authenticates users using a Moves API
and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which
accepts these credentials and calls `done` providing a user, as well as
`options` specifying a client ID, client secret, and callback URL.

    passport.use(new StravaStrategy({
        clientID: STRAVA_CLIENT_ID,
        clientSecret: STRAVA_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/strava/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ stravaId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'strava'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/strava',
      passport.authenticate('strava'));

    app.get('/auth/strava/callback', 
      passport.authenticate('strava', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Credits

  - [Micah Fitzgerald](http://github.com/mcfitz2)

Build based on [Jared Hanson](http://github.com/jaredhanson)'s [passport-foursquare](https://github.com/jaredhanson/passport-foursquare).

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2013 [Micah Fitzgerald](http://github.com/mcfitz2)

