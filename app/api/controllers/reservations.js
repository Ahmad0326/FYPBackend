const reservationsModel = require("../models/reservations");
const carModel = require("../models/cars");

const updateTickets = async (req, res, next) => {
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

const addToCart = async (req, res, next) => {
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
      const existingReservations = reservations.items.find((item) => item.carId === id);
      console.log("----------------exxisting reservations---------------");
      //console.log("tickets ---->", existingCartItem.ticketCount)

      if (existingReservations) {
        
        console.log("tickets ---->", existingCartItem.ticketCount);
        existingReservations.ticketCount += tickets;
        console.log("tickets ---->", existingCartItem.ticketCount);
        console.log("price ---->", existingCartItem.price);

        existingCartItem.price += tickets * movieInfo.price;
        console.log("price ---->", tickets, existingCartItem.price);
      } else {
        // if (cart.items.length >= 5) {
        //   return res.status(400).json({ status: "error", message: "You can't add more than 5 different movies to the cart.", data: null });
        // }
        cart.items.push({
          movieId: id,
          name: movieInfo.name,
          released_on: movieInfo.released_on,
          ticketCount: tickets,
          price: tickets * movieInfo.price,
        });
        console.log("cart----->", cart);
      }
      await cart.save();
    }

    const updatedCart = await cartModel.findOne({ userId: userId });
    return res.json({
      status: "success",
      message: "Movie added to cart successfully.",
      data: updatedCart,
    });
  } catch (error) {
    console.error(error);
    next(error);
    //return res.json({ status: "error", message: "Unable to add item to cart.", data: null });
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    console.log("In the backend of remove cart---->", req.body, req.params);
    const { movieId } = req.params;
    const { userId } = req.body;

    // Find the user's cart based on userId
    const cart = await cartModel.findOne({ userId });
    let movie = await movieModel.findOne({ _id: movieId });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found against user id" });
    }

    // Find the index of the cart item with the specified movieId
    const cartItemIndex = cart.items.findIndex(
      (item) => item.movieId.toString() === movieId
    );
    console.log("cartitem index---->", cartItemIndex);
    if (cartItemIndex === -1) {
      return res.status(404).json({ error: "Item not found in cart" });
    }

    // Increment the movie's totalTickets
    ////movie.seats++;

    // Save the updated movie document
    //await movie.save();

    // Remove the item from the cart
    cart.items.splice(cartItemIndex, 1);

    // Save the updated cart document
    await cart.save();

    const cartUpdated = await cartModel
      .findOne({ userId })
      .populate("items.movieId");

    return res.json({
      message: "Item removed from cart successfully",
      status: "success",
      data: { cart: cartUpdated },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to remove item from cart" });
  }
};

const getCart = async (req, res, next) => {
  try {
    console.log(req.params.userId);
    const userId = req.params.userId;
    const cart = await cartModel.findOne({ userId }); // Populate the movie details

    if (!cart) {
      return res.json({ message: "Cart is empty" });
    }

    return res.json({
      status: "success",
      message: "Cart found successfully!!!",
      data: { cart: cart },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Unable to retrieve cart" });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
  getCart,
  updateTickets,
};
