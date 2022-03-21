const express = require('express');
const router = express.Router();
const TransactionsController = require('../controllers/transactions.controller');

const transactions_controller = new TransactionsController();

router.post('/', transactions_controller.createTransaction);
router.get('/', transactions_controller.getTransactions);
router.get('/:id', transactions_controller.getTransactionById);
router.put('/:id', transactions_controller.updateTransaction);
router.delete('/:id', transactions_controller.deleteTransaction);

router.get('/transaction/:transId', transactions_controller.getTransactionByTransId);
router.get('/user/:userId', transactions_controller.getTransactionByUserId);

module.exports = router;

