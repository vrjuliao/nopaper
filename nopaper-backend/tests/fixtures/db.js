const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../../models/userModel');

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

const setupDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
  await new User(userTwo).save();
}

module.exports = {
  userOne,
  token,
  setupDatabase
}