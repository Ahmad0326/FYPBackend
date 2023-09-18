const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  items: [
    {
      movieId: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      released_on: {
        type: Date,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      ticketCount: {
        type: Number,
        default:1,
        min: 1,
        max: 5,
      },
    },
  ],
});

const cartModel = mongoose.model("Cart", cartSchema);

module.exports = cartModel;