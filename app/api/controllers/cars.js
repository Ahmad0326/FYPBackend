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
      data: { cars: carInfo },
    });
  } catch (error) {
    next(error);
  }
};

const getCarByManagerId = async (req, res, next) => {
  try {
    const { managerId } = req.params;
    const carList = await carModel.find({ managerId: managerId });
    res.json({
      status: "success",
      message: "car found!!!",
      data: { cars: carList },
    });
  } catch (error) {}
};

const getAll = async (req, res, next) => {
  try {
    const car = await carModel.find({});
    const carList = car.map((car) => ({
      managerId: car.managerId,
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

// const updateStatus = async (req, res, next) => {
//   try {
//     const { carId } = req.params;

//     const car = await carModel.findById(carId);
//     if (!car) {
//       return res.status(404).json({
//         status: "error",
//         message: "Car not found.",
//         data: null,
//       });
//     }

//     car.status = car.status === "Available" ? "Hired" : "Available";
//     await car.save();

//     res.json({
//       status: "success",
//       message: `Car status updated to ${car.status}`,
//       data: car.status,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
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
    console.log("in the creater body--------------------->", req.body);

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
      data: newCar,
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
  getCarByManagerId,
  deleteById,
  create,
  getById,
};
