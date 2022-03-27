const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/login.controller');


router.post('/login', LoginController.loginUser);

module.exports = router;