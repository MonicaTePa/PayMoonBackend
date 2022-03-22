const express = require('express');
const router = express.Router();
const code = require('../controllers/codes_controller');
router.post('/', code.agregarcodes);
router.get('/', code.vercodes);
router.get('/:id', code.vercode);

module.exports = router;
