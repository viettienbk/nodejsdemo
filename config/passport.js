'use strict'

var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function(passport) {

    passport.serializeUser(function(user, cb) {
        cb(null, user);
    });

    passport.deserializeUser(function(id, cb) {
        User.findById(id, function(err, user) {
            cb(err, user)
        });
    });

    /********************** */
    /*     Local auth       */
    /********************** */
    passport.use('local-login', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, done) {
        User.findOne({ 'local.username': username }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                console.log('Incorrect username');
                return done(null, false, req.flash('message', 'Incorrect username'));
            }
            console.log(password);
            if (!user.validPassword(password)) {
                console.log('Incorrect password');
                return done(null, false, req.flash('message', 'Incorrect password'));
            }
            console.log('success');
            return done(null, user);
        });
    }));

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
        passReqToCallback: true
    }, function(req, username, password, done) {
        User.findOne({ 'local.username': username }, function(err, user) {
            console.log(user);
            if (err) {
                return done(err);
            }
            if (user) {
                console.log('User exists');
                return done(null, false, req.flash('message', 'User exists'));
            }

            var _user = new User();
            console.log();
            _user.local.username = req.body.username;
            _user.local.password = _user.generateHash(req.body.password);
            _user.save(function(err) {
                if (err) {
                    return done(null, false, req.flash('message', 'Sign up error. Try again'));
                } else {
                    return done(null, _user);
                }
            });
        });
    }));

    /************************/
    /*     facbook auth     */
    /************************/
}