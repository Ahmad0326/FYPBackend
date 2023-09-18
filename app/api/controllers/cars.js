const carModel = require("../models/cars"); // Import your movie model

const getById = async (req, res, next) => {
  try {
    const carInfo = await carModel.findById(req.params.movieId);
    res.json({
      status: "success",
      message: "car found!!!",
      data: { movies: movieInfo },
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const car = await carModel.find({});
    const carList = car.map((movie) => ({
      id: car._id,
      name: car.name,
      model: car.model,
      type: car.type,
      rent: car.rent,
      status: car.status,
      make: car.make,
    }));
    res.json({
      status: "success",
      message: "Movies list found!!!",
      data: { cars: carList },
    });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    console.log("in the update id ------>", req.body);
    await movieModel.findByIdAndUpdate(req.params.movieId, {
      name: req.body.name,
      rent: req.body.rent,
      status: req.body.status,
    });
    res.json({
      status: "success",
      message: "Car updated successfully!!!",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    await movieModel.findByIdAndRemove(req.params.carId);
    res.json({
      status: "success",
      message: "Car deleted successfully!!!",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const newCar = {
      name: req.body.name,
      model: req.body.model,
      type: req.body.type,
      rent: req.body.rent,
      status: req.body.status,
      make: req.body.make,
    };
    console.log("Car", newCar);
    await carModel.create(newCar);
    res.json({
      status: "success",
      message: "Car added successfully!!!",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getById,
  getAll,
  updateById,
  deleteById,
  create,
};
