const jwt = require('jsonwebtoken');
var User = require('../models/userModel');

exports.login = function (req, res, next) {
  User.find({ email: req.body.email }, function (err, user) {
    if (err) return res.status(400).send('Usuario inválido!');
    if (user.length > 0 && user[0].pwd === req.body.pwd) {
      var usr = user[0];
      var id = usr._id;
      console.log(usr);
      var token = jwt.sign({ userId: id }, process.env.SECRET, {
        expiresIn: 10800, // expires in 3h
      });
      return res.json({ auth: true, token: token, data: { name: user[0].name } });
    }

    res.status(400).json({ message: 'Login inválido!' });
  });
};

exports.register = function (req, res) {
  console.log(req.body);

  let user = new User({
    email: req.body.email,
    name: req.body.nome,
    pwd: req.body.pwd,
  });

  user.save(function (err) {
    if (err) {
      return res.status(400).send('Não foi possivel registrar! Tente novamente mais tarde.');
    }
    res.send('Registro bem sucedido.');
  });
};
