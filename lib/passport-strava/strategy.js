/**
 * Module dependencies.
 */
var util = require('util')
  , OAuth2Strategy = require('passport-oauth').OAuth2Strategy
  , InternalOAuthError = require('passport-oauth').InternalOAuthError;


/**
 * `Strategy` constructor.
 *
 * The Strava authentication strategy authenticates requests by delegating to
 * Strava using the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your Moves application's App ID
 *   - `clientSecret`  your Moves application's App Secret
 *   - `callbackURL`   URL to which Moves will redirect the user after granting authorization
 *
 * Examples:
 *
 *     passport.use(new StravaStrategy({
 *         clientID: '123-456-789',
 *         clientSecret: 'shhh-its-a-secret'
 *         callbackURL: 'https://www.example.net/auth/strava/callback'
 *       },
 *       function(accessToken, refreshToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *           done(err, user);
 *         });
 *       }
 *     ));
 *
 * @param {Object} options
 * @param {Function} verify
 * @api public
 */
function Strategy(options, verify) {
  options = options || {};
  options.authorizationURL = options.authorizationURL || 'https://www.strava.com/oauth/authorize';
  options.tokenURL = options.tokenURL || 'https://www.strava.com/oauth/token';
  options.scope = options.scope || '';

  OAuth2Strategy.call(this, options, verify);
  this.name = 'strava';
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(Strategy, OAuth2Strategy);


/**
 * Retrieve user info from Moves.
 *
 * This function constructs a normalized profile, with the following properties:
 *
 *   - `provider`         always set to `strava`
 *   - `id`               unique identifier for this user.
 *
 * @param {String} accessToken
 * @param {Function} done
 * @api protected
 */
Strategy.prototype.userProfile = function(accessToken, done) {
    var url = 'https://www.strava.com/api/v3/athlete';
    this._oauth2.get(url, accessToken, function (err, body, res) {
	if (err) { return done(new InternalOAuthError('failed to fetch user profile', err)); }
	
	try {
	    var json = JSON.parse(body);
	    
	    var profile = json;
	    json.provider = 'strava';
	    profile._raw = body;
	    profile._json = json;
	    
	    done(null, profile);
	} catch(e) {
	    done(e);
	}
    });
}


/**
 * Expose `Strategy`.
 */
module.exports = Strategy;
