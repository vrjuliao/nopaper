const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const User = require('../../models/userModel');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  name: 'Mike',
  email:'eleven@example.com',
  password: '56what!!'
}

const setupDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
}

module.exports = {
  userOne,
  setupDatabase
}