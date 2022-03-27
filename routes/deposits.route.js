const express = require('express');
const router = express.Router();
const DepositsController = require('../controllers/desposits.controller');

const deposits_controller = new DepositsController();

router.post('/', deposits_controller.createDeposit);
router.get('/', deposits_controller.getDeposits);
router.get('/:id', deposits_controller.getDepositById);
router.put('/:id', deposits_controller.updateDeposit);
router.delete('/:id', deposits_controller.deleteDeposit);
router.get('/deposit/:depoId', deposits_controller.getDepositByDepoId);
router.get('/user/:userId', deposits_controller.getDepositByUserId);

module.exports = router;

