// models/Video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  name: String,
  data: Buffer,
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
