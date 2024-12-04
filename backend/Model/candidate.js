const mongoose = require('mongoose');

// Define the candidate schema
const candidateSchema = mongoose.Schema({
  cname: {
    type: String,
    required: true, // Name of the candidate
  },
  cdept: {
    type: String,
    required: true, // Department of the candidate
  },
  category: {
    type: String,
    required: true, // Category of the candidate (e.g., general, reserved, etc.)
  },
  photo: {
    type: String, // Photo can store the URL or file path of the image
    required: false, // Photo is optional
  },

});

// Create the candidate model
const candidateModel = mongoose.model('candidate', candidateSchema);

module.exports = candidateModel;
