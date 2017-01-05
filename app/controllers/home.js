var UserMeta = require('../models/user');
var flash = require('connect-flash');

module.exports = function(app, passport) {

    //  home
    app.get('/', function(req, res) {
        console.log(req.flash('message'));
        res.render('index', {
            message: req.flash('message')
        });
    });

    //  login with facebook  
    app.get('/fblogin', function(req, res) {
        res.send({ message: 'fblogin' });
    });

    //  profile
    app.get('/profile', isLogin, function(req, res) {
        console.log(req.session.passport.user);
        res.render('profile.ejs', {
            message: req.session.passport.user.local.username,
            notes: null
        });
    });

    // process the login form
    app.get('/login', function(req, res) {
        res.render('login.ejs', {
            message: req.flash('message')
        });
    });

    //  
    app.get('/signup', isLogin, function(req, res) {
        res.render('signup.ejs', {
            message: req.flash('message')
        });
    });

    //  log out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    function isLogin(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/');
    }
}