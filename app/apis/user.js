'use strict'

var UserMeta = require('../models/user');

module.exports = function (app) {
    //  get all users
    app.get('/api/user', function (req, res) {
        UserMeta.find(function (err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(data);
            }
        });
    });

    //  get user by id
    app.get('/api/user/:id', function (req, res) {
        UserMeta.findById(req.params.id, function (err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.json(data);
            }
        });
    });

    //  create user
    app.post('/api/user', function (req, res) {
        UserMeta.create({
            userName: req.body.name,
            password: req.body.password,
            isAdmin: false
        }, function (err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send({ message: 'Create user success' });
            }
        });
    });

    //  delete user
    app.delete('/api/user/:id', function (req, res) {
        UserMeta.remove({ _id: req.params.id }, function (err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send({ message: 'Delete user success' });
            }
        });
    });

    //  update user
    app.put('/api/user', function (req, res) {
        UserMeta.findByIdAndUpdate(req.body._id,
            {
                name: req.body.name,
                password: req.body.password,
                isAdmin: req.body.isAdmin
            },
            function (err, data) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.send({ message: 'Update user success' });
                }
            });
    });
}