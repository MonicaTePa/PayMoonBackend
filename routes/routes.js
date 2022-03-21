const express = require('express');
const router = express.Router();
const code = require('../controllers/codes_controller');
const CardsController = require('../controllers/cards.controller');
const DepositsController = require('../controllers/desposits.controller');
const TransactionsController = require('../controllers/transactions.controller');
  
const cards_controller = new CardsController();
const deposits_controller = new DepositsController();
const transactions_controller = new TransactionsController();
 
//transactions rutas
router.post('/transaction', transactions_controller.createTransaction);
router.get('/transaction', transactions_controller.getTransactions);
router.get('/transaction/:id', transactions_controller.getTransactionById);
router.put('/transaction/:id', transactions_controller.updateTransaction);
router.delete('/:id', transactions_controller.deleteTransaction);

router.get('/transaction/:transId', transactions_controller.getTransactionByTransId);
router.get('/user/:userId', transactions_controller.getTransactionByUserId);

//codes_transactions rutas
router.post('/codes', code.agregarcodes);
router.get('/codes', code.vercodes);
router.get('/codes/:id', code.vercode);

//cards rutas
router.post('/cards', cards_controller.addCard);
router.get('/cards', cards_controller.getCard);
router.get('cards/:id', cards_controller.getCardById);
router.put('cards/:id', cards_controller.updateCard);
router.delete('cards/:id', cards_controller.deleteCard);

//deposit rutas

router.post('/deposit', deposits_controller.createDeposit);
router.get('/deposit', deposits_controller.getDeposits);
router.get('deposit/:id', deposits_controller.getDepositById);
router.put('deposit/:id', deposits_controller.updateDeposit);
router.delete('deposit/:id', deposits_controller.deleteDeposit);

router.get('/deposit/:depoId', deposits_controller.getDepositByDepoId);
router.get('/user/:userId', deposits_controller.getDepositByUserId);





module.exports = router;
