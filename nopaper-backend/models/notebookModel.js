const mongoose = require('mongoose');
const { ObjectID } = require('mongodb');

const Schema = mongoose.Schema;
let NotebookSchema = new Schema({
  name: {type: String, required: true, max: 100},
  description: {type: String, required: false, max: 500},
  userId: {type: ObjectID, required: true}
}, {timestamps: true});

module.exports = mongoose.model('Notebook', NotebookSchema);