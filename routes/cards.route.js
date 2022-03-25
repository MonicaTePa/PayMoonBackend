const express = require('express');
const router = express.Router();
const CardsController = require('../controllers/cards.controller');

const cards_controller = new CardsController();

router.post('/', cards_controller.addCard);
router.get('/', cards_controller.getCard);
router.get('/:id', cards_controller.getCardById);
router.get('/user/:id', cards_controller.getCardByUserId);
router.put('/:id', cards_controller.updateCard);
router.delete('/:id', cards_controller.deleteCard);


module.exports = router;
