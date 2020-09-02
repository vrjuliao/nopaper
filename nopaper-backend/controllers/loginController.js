const jwt = require('jsonwebtoken');
var User = require('../models/userModel');

exports.login = function (req, res, next) {
  console.log(req.body.email + '  ' + req.body.pwd);
  User.find({ email: req.body.email }, function (err, product) {
    if (err) return res.status(501).send('Usuario inválido!');
    console.log(product);
    if (product[0].pwd === req.body.pwd) {
      var id = product._id; // sitaxe correta?
      var token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 10800, // expires in 3h
      });
      return res.json({ auth: true, token: token });
    }

    res.status(500).json({ message: 'Login inválido!' });
  });
};

exports.register = function (req, res) {
  console.log(req.body);

  let user = new User({
    email: req.body.email,
    nome: req.body.nome,
    pwd: req.body.pwd,
  });

  user.save(function (err) {
    if (err) {
      return res.status(501).send('Não foi possivel registrar! Tente novamente mais tarde.');
    }
    res.send('Registro bem sucedido.');
  });
};