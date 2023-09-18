const express = require('express');
const router = express.Router();
const carController = require('../app/api/controllers/car');
router.get('/', carController.getAll);
router.post('/', carController.create);
router.get('/:carId', carController.getById);
router.put('/:carId', carController.updateById);
router.delete('/:carId', carController.deleteById);

module.exports = router;