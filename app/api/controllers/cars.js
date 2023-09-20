const carModel = require("../models/cars");

const getByModel = async (req, res, next) => {
  try {
    const carInfo = await carModel.find({ model: req.body.model });
    res.json({
      status: "success",
      message: "car found!!!",
      data: { movies: movieInfo },
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { carId } = req.params;
    console.log("id in the backend----->", carId);
    const carInfo = await carModel.findById({ _id: carId });
    res.json({
      status: "success",
      message: "car found!!!",
      data: { car: carInfo },
    });
  } catch (error) {
    next(error);
  }
};

const getByColor = async (req, res, next) => {
  try {
    const carInfo = await carModel.find({ color: req.body.color });
    res.json({
      status: "success",
      message: "car found!!!",
      data: { movies: movieInfo },
    });
  } catch (error) {
    next(error);
  }
};

const getByName = async (req, res, next) => {
  try {
    const carInfo = await carModel.find({ name: req.body.name });
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
    const carList = car.map((car) => ({
      id: car._id,
      name: car.name,
      model: car.model,
      type: car.type,
      rent: car.rent,
      status: car.status,
      make: car.make,
      color: car.color,
    }));
    res.json({
      status: "success",
      message: "Car list found!!!",
      data: { cars: carList },
    });
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    console.log("in the update id ------>", req.body);
    console.log("in the update id ------>", req.params);
    await carModel.findByIdAndUpdate(req.params.carId, {
      name: req.body.name,
      model: req.body.model,
      type: req.body.type,
      rent: req.body.rent,
      make: req.body.make,
      color: req.body.color,
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
    await carModel.findByIdAndRemove(req.params.carId);
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
      managerId: req.body.managerId,
      name: req.body.name,
      model: req.body.model,
      type: req.body.type,
      rent: req.body.rent,
      make: req.body.make,
      color: req.body.color,
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
  getByColor,
  getByName,
  getByModel,
  getAll,
  updateById,
  deleteById,
  create,
  getById,
};
