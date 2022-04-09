const express = require('express');
const router = express.Router();
const OperationsController = require('../controllers/operations.controller');

const operations_controller = new OperationsController();

router.post('/transferences', operations_controller.moneyTransference);
router.post('/deposits', operations_controller.moneyDeposit);

module.exports = router;