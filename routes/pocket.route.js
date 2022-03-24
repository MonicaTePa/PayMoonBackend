const express = require('express');
const router = express.Router();
const pocketController = require('../controllers/pocket.controller');


router.get('/:id', pocketController.getPocket);
router.get('/user/:id', pocketController.getPocketByUserId);
router.get('/', pocketController.getPockets);
router.post('/', pocketController.postPocket);
router.put('/:id', pocketController.putPocket);
router.delete('/:id', pocketController.deletePocket);

module.exports = router;