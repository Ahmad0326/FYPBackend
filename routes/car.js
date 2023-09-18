const express = require('express');
const router = express.Router();
const movieController = require('../app/api/controllers/car');
router.get('/', movieController.getAll);
router.post('/', movieController.create);
router.get('/:carId', movieController.getById);
router.put('/:carId', movieController.updateById);
router.delete('/:carId', movieController.deleteById);

module.exports = router;