const express = require('express');
const app = express();
const multer = require('multer');
const fs = require('fs');
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongoose');
const Video = require('./videoModel'); // Import the Mongoose model for videos

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost/videos100', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Event handlers for the database connection
db.on('connected', () => {
  console.log('Connected to MongoDB');
});

db.on('error', (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

db.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Handle file uploads using the '/init-video' route
app.post('/init-video', upload.single('video'), async (req, res) => {
  try {
    const { originalname, mimetype, buffer } = req.file;

    // Specify the desired folder
    const folderName = 'videos'; // Change to the desired folder name

    // Create a new instance of the Video model with the 'folder' property
    const newVideo = new Video({
      filename: originalname,
      contentType: mimetype,
      folder: folderName, // Set the folder property here
    });

    // Save the video information to MongoDB using Mongoose
    const videoData = await newVideo.save();

    // Create a new GridFSBucket instance associated with the specified collection (bucket)
    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: 'videos100', // Change to your desired bucket name
    });

    // Create an upload stream with the desired file name and folder information in metadata
    const videoUploadStream = bucket.openUploadStream(originalname, {
      contentType: mimetype,
      metadata: { folder: folderName }, // Store folder information in metadata
    });

    // Write the file buffer to the upload stream
    videoUploadStream.end(buffer);

    res.status(200).json({ message: 'Video information saved', videoData });
  } catch (error) {
    console.error('Error uploading video information:', error);
    res.status(500).json({ error: 'Video information upload failed' });
  }
});

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
