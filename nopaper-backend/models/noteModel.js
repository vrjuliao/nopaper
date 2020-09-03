const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

const Schema = mongoose.Schema;
let NoteSchema = new Schema({
  title: {type: String, required: true, max: 100},
  markdown: {type: String, required: true},
  notebookId: {type: ObjectID, required: true}
}, {timestamps: true});

module.exports = mongoose.model('Note', NoteSchema);