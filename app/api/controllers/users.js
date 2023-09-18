
const userModel = require('../models/users');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken')

module.exports = {

 create: function(req, res, next) {

   const data = { name: req.body.name, email: req.body.email, password: req.body.password };
    console.log("in the controller", data.name, data.email,data.password)
  userModel.create(data)
  .then((result) => {
      res.send({ status: 200, msg: 'User created successfully' })
   })
  .catch((err) => {
      res.send({ status: 500, msg: 'Error creating user' })
   });
 },

 authenticate: async (req, res, next) => {
   console.log('request -------------->', req.body);
   try {
      const userInfo = await userModel.findOne({ email: req.body.email });

      if (!userInfo) {
         res.status(412).json({ status: "error", message: "Invalid email/password!!!", data: null });
         return;
      }

      const isPasswordValid = await bcrypt.compare(req.body.password, userInfo.password);
      if (isPasswordValid) {
         const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '1h' });
         res.json({ status: "success", message: "User found!!!", data: { user: userInfo, token: token } });
      } else {
         res.status(412).json({ status: "error", message: "Invalid email/password!!!", data: null });
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
    console.log("in the update---->",username)

    await userModel.findByIdAndUpdate(userId, { name: username , password: hashedPassword});

    res.json({ status: "success", message: "User updated successfully!!!", data: null });
  } catch (error) {
    next(error);
  }
},


 deleteUser: async (req, res, next) => {
   try {
     await userModel.findByIdAndDelete(req.params.userId);
     res.json({ status: "success", message: "User deleted successfully", data: null });
   } catch (error) {
     next(error);
   }
 },

 getAllUsers: async (req, res, next) => {
  try {
    const users = await userModel.find({}, '-password'); 
    res.json({ status: 'success', message: 'Users retrieved successfully', data: { users } });
  } catch (error) {
    next(error);
  }
},

updateUserRole: async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const newRole = req.body.role;
    console.log("IN the update userROle---->", req.body.role, userId)

    await userModel.findByIdAndUpdate(userId, { userRole: newRole },{new:true});

    res.json({ status: 'success', message: 'User role updated successfully', data: null });
  } catch (error) {
    next(error);
  }
},

 
}