const express = require('express');
const transactionsRouter = require('../routes/transactions.route');
const depositsRouter = require('../routes/deposits.route');
const cardsRouter = require('../routes/cards.route');
const code = require('../routes/codes');
const users_controller = require('../routes/users.js');

 
    const router = express.Router();
    
    router.use('/transactions',transactionsRouter);
    router.use('/deposits',depositsRouter);
    router.use('/cards',cardsRouter);
    router.use('/codes', code);
    router.use('/users', users_controller);


module.exports = router;
