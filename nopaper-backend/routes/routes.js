const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const multiparty = require('connect-multiparty');

// Colocar controller que ainda não foi criado
const middleware = require('../middleware/authentication');
const test_controller = require('../controllers/testController');

const login_controller = require('../controllers/loginController');
const except_list = ['/login'];

router.post('/login', (req, res, next) => {
  if (req.body.user === 'luiz' && req.body.pwd === '123') {
    //auth ok
    const id = 1; //esse id viria do banco de dados
    var token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 300, // expires in 5min
    });
    return res.json({ auth: true, token: token });
  }

  res.status(500).json({ message: 'Login inválido!' });
});

router.use('/', middleware.authGuard);

// teste simples
router.get('/testar', test_controller.test);

// router.post('/login', test_controller.test);

router.post('/create', test_controller.create);
router.get('/:id', test_controller.details);

// files
router.route('/upload').post(multiparty(), require('../controllers/upload'));

module.exports = router;
