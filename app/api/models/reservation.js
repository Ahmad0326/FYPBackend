const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Booked", "Recieved"],
    default: "Booked",
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
      quantity: {
        type: Number,
        required: true, 
        min: 1,
        max: 5,
      },
    },
  ],
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;