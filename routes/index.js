const express = require('express');
const transactionsRouter = require('../routes/transactions.route');
const depositsRouter = require('../routes/deposits.route');
const cardsRouter = require('../routes/cards.route');
const pocketRouter = require('../routes/pocket.route');
const codesRouter = require('../routes/codes');
const usersRouter = require('../routes/users.route');
const authRouter = require('../routes/auth.route');

const operationsRouter = require('../routes/operations.route');

function routerApi(app) {
    const router = express.Router();    
    app.use('/api/v1',router);
    router.use('/transactions',transactionsRouter);
    router.use('/deposits',depositsRouter);
    router.use('/cards',cardsRouter);
    router.use('/pockets', pocketRouter);
    router.use('/codes', codesRouter);
    router.use('/users',usersRouter);

    router.use('/operations', operationsRouter);
    router.use('/auth', authRouter);
}

module.exports = routerApi;