const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const multiparty = require('connect-multiparty');

// teste simples
// const test_controller = require('../controllers/testController');
// router.get('/testar', test_controller.test);
// router.post('/create', test_controller.create);

// router.get('/:id', test_controller.details);

// files
// router.route('/upload').post(multiparty(), require('../controllers/upload'));

const login_controller = require('../controllers/loginController');
const notebook_controller = require('../controllers/notebookController');
const note_controller = require('../controllers/noteController');

router.post('/login', login_controller.login);
router.post('/register', login_controller.register);

// Colocar controller que ainda não foi criado
const middleware = require('../middleware/authentication');
router.use('/', middleware.authGuard);
router.get('/notebook', notebook_controller.find);
router.post('/notebook/new', notebook_controller.new);
router.post('/note/new', note_controller.setNewNote);
router.get('/note/get', note_controller.getNotesById);

module.exports = router;
