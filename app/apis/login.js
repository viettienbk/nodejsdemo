'use strict'

module.exports = function(app) {
    app.get('/api/login/fb', function(req, res) {
        console.log('Login fb succes');
        res.json({ message: 'Login fb succes' });
    });
}