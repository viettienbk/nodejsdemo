'use strict'

var mongoose = require('mongoose');
var NoteMeta = require('../models/note');
var dateFormat = require('dateformat');

module.exports = function(app) {

    //  get all note
    app.get('/api/note', function(req, res) {
        NoteMeta.find(function(err, data) {
            console.log(data);
            if (err) {
                res.status(500).render(err);
            } else {
                res.json(data);
            }
        });
    });

    //  create note
    app.post('/api/note', function(req, res) {
        var note = {
            name: req.body.name,
            time: dateFormat(new Date(), 'dd/mm/yyyy'),
            content: []
        };
        NoteMeta.create(note, function(err, data) {
            if (err) {
                res.status(500).send({ error: err });
            } else {
                res.send({ message: 'Create success', data: data });
            }
        });
    });

    // delete note
    app.delete('/api/note/:id', function(req, res) {
        NoteMeta.remove({ _id: req.params.id }, function(err, data) {
            if (err) {
                res.status(500).send({ error: err });
            } else {
                res.send({ message: 'Delete success' });
            }
        });
    });

    // update note
    app.put('/api/note', function(req, res) {
        NoteMeta.update({ _id: req.body._id }, { name: req.body.name },
            function(err, data) {
                if (err) {
                    res.status(500).send({ error: err });
                } else {
                    res.send({ message: 'Update success' });
                }
            });
    });

    //  insert content in note
    app.put('/api/note/content/insert', function(req, res) {
        NoteMeta.update({ _id: req.body._id }, {
                $push: {
                    content: {
                        _id: mongoose.Types.ObjectId(),
                        name: req.body.name,
                        time: dateFormat(new Date(), 'dd/mm/yyyy'),
                        isDone: false
                    }
                }
            },
            function(err, data) {
                if (err) {
                    res.send({ error: err });
                } else {
                    res.send({ message: 'insert success' });
                }
            });
    });

    //  get all content in note
    app.get('/api/note/content/:id', function(req, res) {
        NoteMeta.findOne({ _id: req.params.id }, function(err, data) {
            if (err) {
                res.status(500).send({ error: err });
            } else {
                res.json(data.content);
            }
        });
    });

    //  delete content in node
    app.put('/api/note/content/delete', function(req, res) {
        NoteMeta.update({}, {
                $pull: {
                    content: {
                        _id: mongoose.Types.ObjectId(req.body._contentid)
                    }
                }
            },
            function(err, data) {
                if (err) {
                    res.send({ error: err });
                } else {
                    res.send({ message: 'delete success' });
                }
            });
    });

    //  edit content in note
    app.put('/api/note/content/update', function(req, res) {
        NoteMeta.update({ "content._id": mongoose.Types.ObjectId(req.body._id) }, { $set: { "content.$.name": req.body.name } },
            function(err, data) {
                if (err) {
                    res.send({ error: err });
                } else {
                    res.json(data);
                }
            });
    });

    //  get content by id
    app.get('/api/note/content/get/:id', function(req, res) {
        console.log(mongoose.Types.ObjectId(req.params.id));
        NoteMeta.find({}, { content: { $elemMatch: { _id: mongoose.Types.ObjectId(req.params.id) } } },
            function(err, data) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(data);
                }
            });
    });

}