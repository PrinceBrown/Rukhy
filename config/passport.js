const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/User');
const KEYS = require('../config/keys');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    }).catch(err => {
        if (err) throw err;
    });
});

passport.use('google-admin', new GoogleStrategy({
    clientID: KEYS.GOOGLE_CLIENT_ID,
    clientSecret: KEYS.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({
        oauthID: profile.id
    }).then(user => {
        if (user) {
            //User Exists, Do somethin
            done(null, user);
        } else {
            //User doesnt exist, create a new account
            const user = new User({
                oauthID: profile.id,
                userType: 'admin'
            });
            user.save().then(user => {
                done(null, user);
            }).catch(err => {
                if (err) throw err;
            });
        }
    }).catch(err => {
        if (err) throw err;
    })
}))

router.get('/auth/google', passport.authenticate('google-admin', {
    scope: ['profile', 'email']
}));

router.get('/auth/google/callback', passport.authenticate('google-admin'),
    (req, res, next) => {
        res.status(302).redirect('/admin/');
    })

module.exports = router;