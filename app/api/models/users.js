// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

// const Schema = mongoose.Schema;
// const UserSchema = new Schema({
//   name: {
//     type: String,
//     trim: true,
//     required: true,
//     validate: {
//       validator: function(value) {
//         return /^[^\s\d]*\d+[^\s\d]*$/.test(value);
//       },
//       message: 'Name should not have spaces and must contain at least one number.',
//     },
//   },
//   email: {
//     type: String,
//     trim: true,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     trim: true,
//     required: true,
//     minlength: 8,
//     validate: {
//       validator: function(value) {
//         return /^(?=.*[!@#$%^&*()_+{}[\]:;<>,.?~\\/\-='|"'])(?=.*[A-Z])/.test(value);
//       },
//       message: 'Password must start with a capital letter and contain a special character.',
//     },
//   },
// });

// UserSchema.pre('save', function(next) {
//   this.password = bcrypt.hashSync(this.password, saltRounds);
//   next();
// });

// module.exports = mongoose.model('User', UserSchema);

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = mongoose.Schema;
const UserSchema = new Schema({
 name: {
  type: String,
  trim: true,  
  required: true,
 },
 email: {
  type: String,
  trim: true,
  required: true
 },
 password: {
  type: String,
  trim: true,
  required: true
 },
 userRole: {
   type: String,
   trim: true,
   default:'User',
  },
});

UserSchema.pre('save', function(next){
this.password = bcrypt.hashSync(this.password, saltRounds);
next();
});
module.exports = mongoose.model('User', UserSchema);
