const express = require("express");
const router = express.Router();
const cartController = require("../app/api/controllers/reservations");
router.get("/:userId", cartController.getReservations);
router.post("/", cartController.makeAReservation);
router.put("/updatetickets/:id", cartController.updateReservation);
router.delete("/:movieId", cartController.removeFromReservation);

module.exports = router;
