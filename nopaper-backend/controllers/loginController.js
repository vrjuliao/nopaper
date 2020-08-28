var User = require('../models/userModel')

exports.login = function (req, res, next) {
  var user = await User.find({user:req.user},function (err, product) {
    if(err) return res.status(501).send('Usuario inválido!');
  })[0];
  if (user.pwd === req.pwd) {
    var id = user._id; // sitaxe correta?
    var token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 300, // expires in 5min
    });
    return res.json({ auth: true, token: token });
  }

  res.status(500).json({ message: 'Login inválido!' });
};
