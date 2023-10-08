const express = require("express");
const router = express.Router();
const userController = require("../app/api/controllers/users");

router.post("/register", userController.create);
//router.post('/register', validateRegistration, userController.create);
router.post("/authenticate", userController.authenticate);
router.get("/all", userController.getAllUsers);
router.get("/:userId", userController.getUserById);
router.put("/:userId/updateUser", userController.updateUser);
router.delete("/deletemanager/:managerId", userController.deleteManager);
router.delete("/:userId", userController.deleteUser);

module.exports = router;
