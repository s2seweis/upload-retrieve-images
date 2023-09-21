const mongoose = require('mongoose');

// Define the schema for your video model
const videoSchema = new mongoose.Schema({
  title: String,           // Example: Video title
  description: String,     // Example: Video description
  length: Number,          // Example: Video length in seconds
  // Add more fields as needed for your video data
});

// Create a Mongoose model for the video using the schema
const Video = mongoose.model('Video', videoSchema);

module.exports = Video;