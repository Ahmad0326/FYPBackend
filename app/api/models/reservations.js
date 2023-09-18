const mongoose = require("mongoose");

const reservationsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  reservations: [
    {
      carId: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      rent: {
        type: Number,
        required: true,
      },
    },
  ],
});

const reservationsModel = mongoose.model("Reservations", reservationsSchema);

module.exports = reservationsModel;
