const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://talhatariqfyp:fyp$123@cluster0.pztronx.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
module.exports = mongoose;

s