const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const multiparty = require('connect-multiparty');

// Colocar controller que ainda não foi criado
const middleware = require('../middleware/authentication');
const test_controller = require('../controllers/testController');

const login_controller = require('../controllers/loginController');

router.post('/login', login_controller.login);
router.post('/register', login_controller.register);

router.use('/', middleware.authGuard);

// teste simples
router.get('/testar', test_controller.test);

// router.post('/login', test_controller.test);

router.post('/create', test_controller.create);
router.get('/:id', test_controller.details);

// files
router.route('/upload').post(multiparty(), require('../controllers/upload'));

module.exports = router;
