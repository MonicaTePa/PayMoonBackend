const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
// const {checkUser} = require('../middlewares/auth.middleware');

router.post('/signup', authController.signup_post);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout);

router.get('/checkUser/:id',authController.checkUser);

module.exports = router;