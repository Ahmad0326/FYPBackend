const express = require("express");
const router = express.Router();
const reservationController = require("../app/api/controllers/reservations");
router.get("/:userId", reservationController.getReservations);
router.get("/", reservationController.getAllReservations);
router.post("/", reservationController.makeAReservation);
router.put("/updatetickets/:id", reservationController.updateReservation);
router.delete("/:carId", reservationController.removeReservations);

module.exports = router;
