const mongoose = require("mongoose");
// Define a schema
const Schema = mongoose.Schema;
const CarSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  model: {
    type: Date,
    trim: true,
    required: true,
  },
  rent: {
    type: String,
    required: true,
    default: 100,
  },
  type: {
    type: String,
    trim: true,
    required: true,
  },
  make: {
    type: String,
    trim: true,
    required: true,
  },
  status: {
    type: String,
    trim: true,
    required: true,
  },
  color: {
    type: String,
    trim: true,
    required: true,
  },
});
module.exports = mongoose.model("Car", CarSchema);
