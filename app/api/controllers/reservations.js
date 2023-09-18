const reservationsModel = require("../models/reservations");
const carModel = require("../models/cars");

const updateReservation = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId, type } = req.body;
    console.log("in the update tickets---->", id, req.body);
    const reservations = await reservationsModel.findOne({ userId: userId });
    const carInfo = await carModel.findById(id);

    if (!carInfo) {
      return res.json({
        status: "error",
        message: "Car not found.",
        data: null,
      });
    }

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
      existingReservation.type = type;
      existingReservation.rent = carInfo.price * days;
      await reservations.save();
      return res.json({
        status: "success",
        message: "Type updated.",
        data: cart,
      });
    } else {
      return res.json({
        status: "error",
        message: "Item not found in reservations.",
        data: null,
      });
    }
  } catch (error) {
    console.error("Error updating type:", error);
    return res.json({
      status: "error",
      message: "Error updating type.",
      data: null,
    });
  }
};

const makeAReservation = async (req, res, next) => {
  try {
    console.log("from the backendd----->", req.body);
    const { userId, id, days } = req.body;
    console.log(userId);
    const reservations = await reservationsModel.findOne({ userId: userId });
    const carInfo = await carModel.findById(id);
    if (!carInfo) {
      return res.json({
        status: "error",
        message: "car not found.",
        data: null,
      });
    }

    if (!reservations) {
      const newReservation = new reservationsModel({
        userId: userId,
        Reservations: [
          {
            carId: id,
            name: carInfo.name,
            startDate: startDate,
            endDate: endDate,
            price: 100,
          },
        ],
      });

      await newReservation.save();
    } else {
      const existingReservations = reservations.items.find(
        (item) => item.carId === id
      );
      console.log("----------------exxisting reservations---------------");
      //console.log("tickets ---->", existingCartItem.ticketCount)

      if (existingReservations) {
        console.log("end date ---->", existingReservations.endDate);

        console.log("start date ---->", existingReservations.startDate);
        console.log("price ---->", existingReservations.rent);

        //existingCartItem.rent += tickets * movieInfo.price;
        console.log("price ---->", tickets, existingCartItem.price);
      } else {
        // if (cart.items.length >= 5) {
        //   return res.status(400).json({ status: "error", message: "You can't add more than 5 different movies to the cart.", data: null });
        // }
        reservations.items.push({
          carId: id,
          name: movieInfo.name,
          startDate: startDate,
          endDate: endDate,
          rent: 100,
        });
        console.log("cart----->", cart);
      }
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
    //return res.json({ status: "error", message: "Unable to add item to cart.", data: null });
  }
};

const removeFromReservations = async (req, res, next) => {
  try {
    console.log("In the backend of remove cart---->", req.body, req.params);
    const { carId } = req.params;
    const { userId } = req.body;

    // Find the user's cart based on userId
    const reservations = await reservationsModel.findOne({ userId });
    let car = await carModel.findOne({ _id: carId });

    if (!reservations) {
      return res
        .status(404)
        .json({ error: "reservations not found against user id" });
    }

    // Find the index of the cart item with the specified movieId
    const reservationItemIndex = reservations.items.findIndex(
      (item) => item.carId.toString() === carId
    );
    console.log("cartitem index---->", reservationItemIndex);
    if (reservationItemIndex === -1) {
      return res
        .status(404)
        .json({ error: "Item not found in the reservation" });
    }

    // Increment the movie's totalTickets
    ////movie.seats++;

    // Save the updated movie document
    //await movie.save();

    // Remove the item from the cart
    reservation.items.splice(reservationItemIndex, 1);

    // Save the updated cart document
    await reservations.save();

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
    const reservations = await reservationModel.findOne({ userId }); // Populate the movie details

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
  removeFromReservations,
  updateReservation,
};
