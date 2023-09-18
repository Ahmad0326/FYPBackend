const mongoose = require('mongoose');
const mongoDB = 'mongodb+srv://uzairmaqsood451:uzair1234567890@moviemesh.xhe7iz0.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
module.exports = mongoose;