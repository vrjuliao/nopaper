const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../../models/userModel');
const Notebook = require('../../models/notebookModel');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  username: 'mikee',
  name: 'Mike',
  email:'eleven@example.com',
  pwd: '56what!!',
  favorites: []
}

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
  _id: userTwoId,
  username: 'will',
  name: 'Will',
  email:'will@example.com',
  pwd: '56what!!'
}

var token = jwt.sign({ userId: userOneId }, process.env.SECRET, {
  expiresIn: 10800, // expires in 3h
});

const notebookOneId = new mongoose.Types.ObjectId();
const notebookOne = {
  _id: notebookOneId,
  name: 'Notebook One',
  description: 'Fixture notebook',
  userId: userOneId
}


const notebookTwoId = new mongoose.Types.ObjectId();
const notebookTwo = {
  _id: notebookTwoId,
  name: 'Notebook Two',
  description: 'Fixture notebook',
  userId: userTwoId
}

const setupDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
  await Notebook.deleteMany();
  await new Notebook(notebookOne).save();
  await new Notebook(notebookTwo).save();

}

module.exports = {
  userOne,
  token,
  setupDatabase,
  notebookOne,
  notebookTwo
}