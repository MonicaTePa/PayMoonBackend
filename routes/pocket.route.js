const express = require('express');
const router = express.Router();
const pocketController = require('../controllers/pocket.controller');


router.get('/:id', pocketController.getPocket);
router.post('/', pocketController.postPocket);
router.put('/:id', pocketController.putPocket);
router.delete('/id', pocketController.deletePocket);

module.exports = router;