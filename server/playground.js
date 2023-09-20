const { gfs } = require('./db'); // Import the gfs object from db.js

const storage = new GridFsStorage({
  url: dbURL, // Use the same URL as in db.js
  file: (req, file) => {
    return {
      filename: file.originalname,
      bucketName: 'uploads', // Name of the collection
    };
  },
});

const upload = multer({ storage });

router.post('/upload', upload.single('video'), (req, res) => {
  res.json({ message: 'Video uploaded successfully' });
});
