const userModel = require("../models/users");
const carModel = require("../models/cars");
const reservationModel = require("../models/reservations");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  create: function (req, res, next) {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      userRole: req.body.userRole,
    };
    console.log(
      "in the controller",
      data.name,
      data.email,
      data.password,
      data.userRole
    );
    userModel
      .create(data)
      .then((result) => {
        res.send({ status: 200, msg: "User created successfully" });
      })
      .catch((err) => {
        res.send({ status: 500, msg: "Error creating user" });
      });
  },

  authenticate: async (req, res, next) => {
    console.log("request -------------->", req.body);
    try {
      const userInfo = await userModel.findOne({ email: req.body.email });

      if (!userInfo) {
        res.status(412).json({
          status: "error",
          message: "Invalid email/password!!!",
          data: null,
        });
        return;
      }

      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        userInfo.password
      );
      if (isPasswordValid) {
        const token = jwt.sign({ id: userInfo._id }, req.app.get("secretKey"), {
          expiresIn: "1h",
        });
        res.json({
          status: "success",
          message: "User found!!!",
          data: { user: userInfo, token: token },
        });
      } else {
        res.status(412).json({
          status: "error",
          message: "Invalid email/password!!!",
          data: null,
        });
      }
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const username = req.body.name;
      const newPassword = req.body.password;
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      console.log("in the update---->", username);

      await userModel.findByIdAndUpdate(userId, {
        name: username,
        password: hashedPassword,
      });

      res.json({
        status: "success",
        message: "User updated successfully!!!",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      console.log("in the delete user-->", req.params);
      await reservationModel.findByIdAndDelete(req.params.userId);
      await userModel.findByIdAndDelete(req.params.userId);
      res.json({
        status: "success",
        message: "User deleted successfully",
        data: null,
      });
    } catch (error) {
      next(error);
    }
  },

  getAllUsers: async (req, res, next) => {
    try {
      const users = await userModel.find({}, "-password");
      res.json({
        status: "success",
        message: "Users retrieved successfully",
        data: { users },
      });
    } catch (error) {
      next(error);
    }
  },

  deleteManager: async (req, res, next) => {
    const userId = req.params.managerId;
    console.log(req.params);

    try {
      const deletedUser = await userModel.findByIdAndDelete(userId);

      if (!deletedUser) {
        return res.status(404).json({ message: "User not found." });
      }

      const deletedCars = await carModel.deleteMany({ managerId: userId });

      res.json({
        message: "User and associated cars deleted successfully.",
        deletedUser,
        deletedCars,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error." });
    }
  },
};
