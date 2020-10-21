const express = require('express');
const bodyParser = require('body-parser');
const config_dorenv = require('dotenv-safe').config();
const jwt = require('jsonwebtoken');
var cors = require('cors');

// Importa Routes
const routes = require('./routes/routes');

const app = express();

// Acesso à BD
const mongoose = require('mongoose');

// const uri =
//   'mongodb+srv://no-paper-api-dev:exgkhx9eqPxcLTI3@nopapaer.zvop4.mongodb.net/no-paper-dev?retryWrites=true&w=majority';
const uri =
  'mongodb://localhost:27017/nopaper-api-test';

  let mongoDB = process.env.MONGODB_URI || uri;
mongoose.Promise = global.Promise;
mongoose
  .connect(mongoDB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Server is up');
  })
  .catch((err) => {
    console.log(`MongoDB connection error. Problem with ${err.message}`);
    process.exit(-1);
  });

//Body Parser
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);

//Servidor
let porto = process.env.PORT || 8000;

if (process.env.NODE_ENV !== 'test'){
  app.listen(porto, () => {});
}

module.exports = app;
