const express = require('express');
const router = express.Router();
const code = require('../controllers/codes_controller');

router.post('/codes', code.agregarcodes);
router.get('/codes', code.vercodes);
router.get('/codes/:id', code.vercode);

module.exports = router;
