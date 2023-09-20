const mongoose = require("mongoose");
// Define a schema
const Schema = mongoose.Schema;
const CarSchema = new Schema({
  managerId: {
    type: String,
    trim: true,
    required: true
  },
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
    type: Number,
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
    default: "available",
  },
  color: {
    type: String,
    trim: true,
    required: true,
  },
});
module.exports = mongoose.model("Car", CarSchema);
