const express = require('express');
const router = express.Router();
const cartController = require('../app/api/controllers/cart');
router.get('/:userId', cartController.getCart);
router.post('/', cartController.addToCart);
router.put('/updatetickets/:id', cartController.updateTickets);
router.delete('/:movieId', cartController.removeFromCart)


module.exports = router;