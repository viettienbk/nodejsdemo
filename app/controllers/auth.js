'use strict'

var User = require('../models/user');

module.exports = function(app, passport) {
    app.post('/login', passport.authenticate('local-login', {
        failureRedirect: '/login',
        failureFlash: true
    }), function(req, res) {
        //  login success
        res.redirect('/profile');
    });

    app.post('/signup', passport.authenticate('local-signup', {
        failureRedirect: '/signup',
        failureFlash: true
    }), function(req, res) {
        //  signup success
        res.redirect('/profile');
    });
}