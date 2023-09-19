const express = require("express");
const router = express.Router();
const carController = require("../app/api/controllers/cars");
router.get("/", carController.getAll);
router.post("/", carController.create);
router.get("/:carId", carController.getById);
router.get("/:carId", carController.getByName);
router.put("/:carId", carController.updateById);
router.delete("/:carId", carController.deleteById);

module.exports = router;
