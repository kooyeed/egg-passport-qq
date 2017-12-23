'use strict';
const qqStrategy = require('passport-qq').Strategy;

module.exports = app => {
    const config = app.config.passportQQ;
    config.passReqToCallback = true;
    config.clientID = config.key;
    config.clientSecret = config.secret;
    const client = 'qq';
    app.passport.use(client, new qqStrategy(config, (req, accessToken, refreshToken, profile, done) => {
        const user = {
            provider: 'qq',
            id: profile.id,
            name: profile.nickname,
            displayName: profile.nickname,
            photo: profile._json && profile._json.figureurl_qq_2 && profile._json.figureurl_qq_2.replace('http://', 'https://'),
            emails: 'unset',
            accessToken: accessToken,
            refreshToken: refreshToken,
        };
        
        app.passport.doVerify(req, user, done);
    }));
};
