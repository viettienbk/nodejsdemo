'use strict'

var User = require('../models/user');

module.exports = function(app, passport) {
    app.post('/login', passport.authenticate('local-login', {
        failureRedirect: '/',
        failureFlash: true
    }), function(req, res) {
        //  login success
        res.redirect('/profile');
    });

    app.post('/signup', passport.authenticate('local-signup', {
        failureRedirect: '/',
        failureFlash: true
    }), function(req, res) {
        //  signup success
        res.redirect('/profile');
    });
}