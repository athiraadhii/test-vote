const mongoose = require('mongoose');

// Define the user schema
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures the username is unique in the database
  },
  admissionNumber: {
    type: String,
    required: true,
    unique: true, // Ensures the admission number is unique in the database
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user", // Default role is 'user'
  },
});



// Create the user model
const userModel = mongoose.model('user', userSchema);

module.exports = userModel;
