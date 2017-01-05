'use strict'
var config = require('./configuration');

module.exports = {
    'facebookAuth': {
        'clientID': '353285551712960',
        'clientSecret': '4b51a1ddd1d9e266a565b3a7f890f10b',
        'callbackURL': 'http://localhost:9090/auth/facebook/callback'
    },
    'googleAuth': {
        'clientID': '76985802818-7101sa0dk13qd4euqg47ijocmvr23lg7.apps.googleusercontent.com',
        'clientSecret': 'CCtCqPb_5LrQFp1FqpRH1IGG',
        'callbackURL': 'http://localhost:9090/auth/google/callback/'
    }
}