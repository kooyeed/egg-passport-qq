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
            photo: profile.figureurl_qq_2,
            emails: '',
            accessToken: accessToken,
            refreshToken: refreshToken,

            gender: profile.gender,
            province: profile.province,
            city: profile.city,
            year: profile.year,
        };
        
        app.passport.doVerify(req, user, done);
    }));
};
