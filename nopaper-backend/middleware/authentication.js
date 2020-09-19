// middleware para validar se o JWT está presente/valido na requisição
var jwt = require('jsonwebtoken');

exports.authGuard = function (req, res, next) {
  console.log('entrou no middleware');
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });

    // se tudo estiver ok, salva no request para uso posterior
    console.log(decoded);
    req.body.userId = decoded.userId;
    next();
  });
};
