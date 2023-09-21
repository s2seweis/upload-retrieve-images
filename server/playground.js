const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const fs = require('fs');
const multer = require('multer');
const path = require('path');

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb://localhost:27017/videos100', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Create a connection to the GridFS stream
const conn = mongoose.connection;
Grid.mongo = mongoose.mongo;
const gfs = Grid(conn.db);

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route for initializing the video
app.post('/init-video', upload.single('video'), (req, res) => {
  try {
    if (!req.file) {
      res.status(400).send('No video file uploaded.');
      return;
    }

    const writestream = gfs.createWriteStream({
      filename: 'bigbuck',
      mode: 'w',
    });

    // Pipe the video data to the write stream
    const videoBuffer = req.file.buffer;
    const videoStream = new Readable();
    videoStream.push(videoBuffer);
    videoStream.push(null);
    videoStream.pipe(writestream);

    writestream.on('close', () => {
      res.status(200).send('Video initialization completed.');
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
