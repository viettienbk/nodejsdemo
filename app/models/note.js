'use strict'

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    name: String,
    time: String,
    content: Array
});

var NoteMeta = mongoose.model('NoteMeta', NoteSchema);

module.exports = NoteMeta;