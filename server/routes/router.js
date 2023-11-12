const express = require('express');
const router = new express.Router();
const multer = require('multer');
const files1 = require('../model/usersSchema-1');
const video1 = require('../model/videoSchema-1');
const video2 = require('../model/videoSchema-2');
const fs = require("fs");

// #################################################################################################
// ### working!!! - Stores the Files to Mongo DB 
// #################################################################################################

const imgconfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `imgae-${Date.now()}. ${file.originalname}`);
  },
});

const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith('image')) {
    callback(null, true);
  } else {
    callback(new Error('only images is allowd'));
  }
};

const upload = multer({
  storage: imgconfig,
  fileFilter: isImage,
});

// user register
router.post('/addfiles', upload.single('photo'), async (req, res) => {
  const { filename, path } = req.file;
  const { fname } = req.body;
  const { imagenew } = req.body;
  const test10 = req.body.image;

  if (!fname || !filename) {
    res.status(401).json({ status: 401, message: 'fill all the data' });
  }

  try {

    let today = new Date(); // get the date
    let day = ('0' + today.getDate()).slice(-2); //get day with slice to have double digit day
    let month = ('0' + (today.getMonth() + 1)).slice(-2); //get your zero in front of single month digits so you have 2 digit months
    // let date = month + '-' + day + '-' + today.getFullYear ();
    let date = today.getFullYear() + '-' + month + '-' + day;

    ('2023-08-25');

    const userdata = new files1({
      fname: fname,
      imgpath: filename,
      date: date,
      image: test10,
    });

    const finaldata = await userdata.save();

    res.status(201).json({ status: 201, finaldata });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// #################################################################################################
// ### working!!! - Get the Files from the Server and Database
// #################################################################################################

router.get('/getfiles', async (req, res) => {
  try {
    const getUser = await files1.find();

    res.status(201).json({ status: 201, getUser });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// #################################################################################################
// ### working!!! - Get the Videos from Mong DB
// #################################################################################################

router.get('/getvideo', async (req, res) => {
  try {
    const getVideo = await video1.find();

    res.status(201).json({ status: 201, getVideo });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// #################################################################################################
// ### working!!! - Delete the User Data
// #################################################################################################

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const dltUser = await files1.findByIdAndDelete({ _id: id });

    res.status(201).json({ status: 201, dltUser });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// #################################################################################################
// ### working!!! - EditFilesForm: Edit the files on the server and in the Database
// #################################################################################################

router.post('/editfiles', upload.single('photo'), async (req, res) => {

  const userAgent = req.headers;

  try {

    const dltUser = await files1.findOne({ _id: req.body.id });
   
    dltUser.fname = req.body.name;
    dltUser.image = req.body.image;
    dltUser.image2 = req.body.image2;
    dltUser.imgpath = req.file?.filename || req.body.imgpath;
    dltUser.date = req.body.date;
    dltUser.imageCollection = req.body.imageCollection;

    const star = await dltUser.save();
    res.status(201).json(star);
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// #################################################################################################
// ### working!!! - Video:1, Stores the Video on the Server and Stores a Url to the videos in the Database
// #################################################################################################

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './videos');
  },
  filename: (req, file, callback) => {
    callback(null, `video-${Date.now()}. ${file.originalname}`);
  },
});

const upload1 = multer({ storage: storage });

router.post('/add-video-server', upload1.single('video'), async (req, res) => {
  const videoData = req.file; // Uploaded video file

  if (!videoData) {
    return res.status(400).json({ message: 'No video file provided' });
  }

  try {
    const userdata = new video1({
      imgpath: req.file.filename,
    });

    const finaldata = await userdata.save();
    res.status(201).json({ status: 201, finaldata });
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
});

// #################################################################################################
// ### Push the video to the database and slice the data into smaller chunks - Grif FS
// #################################################################################################

const mongoose = require('../db/conn'); // Import the Mongoose connection

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

const storage4 = multer.memoryStorage();
const upload4 = multer({ storage: storage4 });

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
  router.post('/init-video', upload4.single('video'), async (req, res) => {

    try {

       const folderName = "videos500"

      const newVideo = new video1({
        // filename: originalname,
        // contentType: mimetype,
        folder: folderName, // Set the folder property here
      });

      const videoData = await newVideo.save();

      // ***each of the videos needs its own folder
      // const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, { bucketName: folderName });
      const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db);
      // ***the name can be the same
      const videoUploadStream = bucket.openUploadStream('bigbuck500', {
        // contentType: mimetype,
        metadata: { folder: folderName }, // Store folder information in metadata
      });

      const videoReadStream = fs.createReadStream('./bigbuck.mp4');

      videoUploadStream.on('error', (error) => {
        console.error('Error uploading video:', error);
        res.status(500).json({ error: 'Error uploading video' });
      });

      videoUploadStream.on('finish', () => {
        console.log('Video upload completed');
        res.status(200).send('Done...');
      });

      videoReadStream.pipe(videoUploadStream);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  });
});

// #################################################################################################
// ### Second Part for Streaming from Mongo DB !!!
// #################################################################################################

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB500');

  router.get("/video-stream", async (req, res) => {
    try {
      const range = req.headers.range;
      if (!range) {
        return res.status(400).send("Requires Range header");
      }

      const db = mongoose.connection.db;
      // GridFS Collection
      // ***the folder like fs.files needs to be dynamic
      const video = await db.collection('fs.files').findOne({ filename: 'bigbuck500' });

      if (!video) {
        return res.status(404).send("No video uploaded!");
      }

      // Create response headers
      const videoSize = video.length;
      const start = Number(range.replace(/\D/g, ""));
      const end = videoSize - 1;

      // Ensure start position is valid
      const correctedStart = start > end ? 0 : start;

      const contentLength = end - correctedStart + 1;
      const headers = {
        "Content-Range": `bytes ${correctedStart}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
      };

      // HTTP Status 206 for Partial Content
      res.writeHead(206, headers);

      const bucket = new mongoose.mongo.GridFSBucket(db);
      // const downloadStream = bucket.openDownloadStreamByName('bigbuck', { start: correctedStart, end: end });
      const downloadStream = bucket.openDownloadStream(video._id, { start: correctedStart, end: end });

      // Finally, pipe video to response
      downloadStream.pipe(res);
    } catch (error) {
      console.error("Error:", error); a
      res.status(500).send("Internal Server Error");
    }
  });
});

module.exports = router;

