const express = require('express');
const bodyParser = require('body-parser');
const config_dorenv = require("dotenv-safe").config();
const jwt = require('jsonwebtoken');
var cors = require('cors');

// Importa Routes
const routes = require('./routes/routes'); 

const app = express();

//Acesso à BD
const mongoose = require('mongoose');
let url = 'mongodb://localhost:27017/smartphones';
let mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB,{useNewUrlParser: true });
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro na Ligação ao MongoDB'));

//Body Parser
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', routes);

//Servidor
let porto = 8000;
app.listen(porto, () => {
 console.log('Servidor em execução no porto: ' + porto);
});