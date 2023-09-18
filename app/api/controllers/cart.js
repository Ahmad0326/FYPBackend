const cartModel = require("../models/cart");
const movieModel = require("../models/movies");

const updateTickets = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId, tickets } = req.body;
    console.log("in the update tickets---->", id, req.body);
    const cart = await cartModel.findOne({ userId: userId });
    const movieInfo = await movieModel.findById(id);

    if (!movieInfo) {
      return res.json({
        status: "error",
        message: "Movie not found.",
        data: null,
      });
    }

    if (!cart) {
      return res.json({
        status: "error",
        message: "Cart doesn't exist.",
        data: null,
      });
    }

    const existingCartItem = cart.items.find((item) => item.movieId === id);

    if (existingCartItem) {
      existingCartItem.ticketCount = tickets;
      existingCartItem.price = movieInfo.price * tickets;
      await cart.save();
      return res.json({
        status: "success",
        message: "Ticket count updated.",
        data: cart,
      });
    } else {
      return res.json({
        status: "error",
        message: "Item not found in cart.",
        data: null,
      });
    }
  } catch (error) {
    console.error("Error updating ticket count:", error);
    return res.json({
      status: "error",
      message: "Error updating ticket count.",
      data: null,
    });
  }
};

const addToCart = async (req, res, next) => {
  try {
    console.log("from the backendd----->", req.body);
    const { userId, id, tickets } = req.body;
    console.log(userId);
    const cart = await cartModel.findOne({ userId: userId });
    const movieInfo = await movieModel.findById(id);
    if (!movieInfo) {
      return res.json({
        status: "error",
        message: "Movie not found.",
        data: null,
      });
    }

    if (!cart) {
      const newCart = new cartModel({
        userId: userId,
        items: [
          {
            movieId: id,
            name: movieInfo.name,
            released_on: movieInfo.released_on,
            ticketCount: tickets,
            price: tickets * movieInfo.price,
          },
        ],
      });

      await newCart.save();
    } else {
      const existingCartItem = cart.items.find((item) => item.movieId === id);
      console.log("----------------exxisting cart---------------");
      //console.log("tickets ---->", existingCartItem.ticketCount)

      if (existingCartItem) {
        if (existingCartItem.ticketCount > 5) {
          return res
            .status(400)
            .json({
              status: "error",
              message:
                "1.You can't purchase more than 5 tickets for this movie.",
              data: null,
            });
        } else if (existingCartItem.ticketCount + tickets > 5) {
          return res
            .status(400)
            .json({
              status: "error",
              message:
                "2.You can't purchase more than 5 tickets for this movie.",
              data: null,
            });
        }
        console.log("tickets ---->", existingCartItem.ticketCount);
        existingCartItem.ticketCount += tickets;
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
