const express = require('express');
const router = express.Router();
const orderController=require('../app/api/controllers/order')
router.post('/', orderController.createOrder)
router.put('/:reservationId', orderController.updateOrderStatus)
router.get('/user/reservationhistory/:userId', orderController.getUserOrders)
router.get('/',orderController.getOrders)
module.exports = router;