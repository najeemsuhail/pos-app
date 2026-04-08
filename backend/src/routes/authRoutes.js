const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.post('/login', (req, res, next) => AuthController.login(req, res, next));
router.post('/register', (req, res, next) => AuthController.createUser(req, res, next));

module.exports = router;
