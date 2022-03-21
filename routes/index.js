const express = require('express');
const transactionsRouter = require('../routes/transactions.route');
const depositsRouter = require('../routes/deposits.route');
const cardsRouter = require('../routes/cards.route');
const pocketRouter = require('../routes/pocket.route')

function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1',router);
    router.use('/transactions',transactionsRouter);
    router.use('/deposits',depositsRouter);
    router.use('/cards',cardsRouter);
    router.use('/pocket', pocketRouter);
}

module.exports = routerApi;