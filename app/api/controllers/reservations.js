const { differenceInDays } = require("date-fns");
const reservationsModel = require("../models/reservations");
const carModel = require("../models/cars");

const updateReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId, startDate, endDate, rent } = req.body;
    console.log("in the update reservation ---->", id, req.body);
    const reservations = await reservationsModel.findOne({ userId: userId });

    if (!reservations) {
      return res.json({
        status: "error",
        message: "Reservation doesn't exist.",
        data: null,
      });
    }

    const existingReservation = reservations.items.find(
      (item) => item.carId === id
    );

    if (existingReservation) {
      existingReservation.rent = calculateRent(startDate, endDate, rent);

      existingReservation.startDate = startDate;
      existingReservation.endDate = endDate;

      await reservations.save();
      return res.json({
        status: "success",
        message: "Reservation updated.",
        data: reservations,
      });
    } else {
      return res.json({
        status: "error",
        message: "Item not found in reservations.",
        data: null,
      });
    }
  } catch (error) {
    console.error("Error updating reservation:", error);
    return res.json({
      status: "error",
      message: "Error updating reservation.",
      data: null,
    });
  }
};

const makeAReservation = async (req, res, next) => {
  try {
    console.log("from the backendd----->", req.body);
    const { userId, carId, startDate, endDate, rent } = req.body;
    console.log(userId);
    const reservations = await reservationsModel.findOne({ userId: userId });
    const carInfo = await carModel.findById(carId);
    if (!carInfo) {
      return res.json({
        status: "error",
        message: "Car not found.",
        data: null,
      });
    }

    if (!reservations) {
      const newReservation = new reservationsModel({
        userId: userId,
        bookings: [
          {
            carId: carId,
            name: carInfo.name,
            startDate: startDate,
            endDate: endDate,
            rent: calculateRent(startDate, endDate, rent),
          },
        ],
      });
      await carModel.findByIdAndUpdate(carId, { status: "Hired" });
      await newReservation.save();
    } else {
      console.log("----------------existing reservations---------------");

      reservations.bookings.push({
        carId: carId,
        name: carInfo.name,
        startDate: startDate,
        endDate: endDate,
        rent: calculateRent(startDate, endDate, rent),
      });
      await carModel.findByIdAndUpdate(carId, { status: "Hired" });
      await reservations.save();
    }

    const updatedReservation = await reservationsModel.findOne({
      userId: userId,
    });
    return res.json({
      status: "success",
      message: "Car reserved successfully.",
      data: updatedReservation,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const removeReservations = async (req, res, next) => {
  try {
    console.log("In the backend of remove cart---->", req.body, req.params);
    const { carId } = req.params;
    const { userId } = req.body;

    const reservations = await reservationsModel.findOne({ userId });
    let car = await carModel.findOne({ _id: carId });

    if (!reservations) {
      return res
        .status(404)
        .json({ error: "reservations not found against user id" });
    }

    const reservationItemIndex = reservations.items.findIndex(
      (item) => item.carId.toString() === carId
    );
    console.log("cartitem index---->", reservationItemIndex);
    if (reservationItemIndex === -1) {
      return res
        .status(404)
        .json({ error: "Item not found in the reservation" });
    }

    reservations.items.splice(reservationItemIndex, 1);
    await reservations.save();

    await carModel.findByIdAndUpdate(carId, { status: "Available" });

    const reservationUpdated = await reservationsModel
      .findOne({ userId })
      .populate("items.carId");

    return res.json({
      message: "car removed from the reservations",
      status: "success",
      data: { reservations: reservationUpdated },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Unable to remove car from reservation" });
  }
};

const getReservations = async (req, res, next) => {
  try {
    console.log(req.params.userId);
    const userId = req.params.userId;
    const reservations = await reservationsModel.findOne({ userId });

    if (!reservations) {
      return res.json({ message: "No reservations found" });
    }

    return res.json({
      status: "success",
      message: "Reservation found successfully!!!",
      data: { reservations: reservations },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to get any reserved car" });
  }
};

module.exports = {
  makeAReservation,
  getReservations,
  removeReservations,
  updateReservation,
};

function calculateRent(startDate, endDate, dailyRent) {
  const numDays = differenceInDays(new Date(endDate), new Date(startDate));
  return numDays * dailyRent;
}
