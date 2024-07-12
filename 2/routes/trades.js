const express = require('express');
const router = express.Router();
const tradesController = require('../controllers/trades');

router.route('')
    .get(tradesController.getTrades)
    .post(tradesController.createTrade);

router.route('/:id')
    .delete(tradesController.modifyTrade)
    .put(tradesController.modifyTrade)
    .patch(tradesController.modifyTrade)
    .get(tradesController.getTradeById);



module.exports = router;
