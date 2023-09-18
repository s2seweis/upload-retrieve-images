const express = require ('express');
const router = new express.Router ();
const multer = require ('multer');
const users1 = require ('../model/usersSchema');
const users2 = require ('../model/usersSchema2');
const moment = require ('moment');

const fs = require("fs");
const mongodb = require('mongodb');



// img storage path
const imgconfig = multer.diskStorage ({
  destination: (req, file, callback) => {
    callback (null, './uploads');
  },
  filename: (req, file, callback) => {
    callback (null, `imgae-${Date.now ()}. ${file.originalname}`);
  },
});

// img filter
const isImage = (req, file, callback) => {
  if (file.mimetype.startsWith ('image')) {
    callback (null, true);
  } else {
    callback (new Error ('only images is allowd'));
  }
};

const upload = multer ({
  storage: imgconfig,
  fileFilter: isImage,
});

// user register
router.post ('/register', upload.single ('photo'), async (req, res) => {
  const {filename, path} = req.file;
  console.log("line:1", filename);
  console.log("line:1.1 ", path);
  console.log ('line:2', req.file);
  // console.log ('line:101', req.file.path);
  // console.log ('line:103', filename);
  // console.log ('line:104', path);

  const {fname} = req.body;
  console.log ('line:3', req.body);
  console.log ('line:4', req.body.add);
  // console.log ('line:201', fname);

  // const {newImage} = req.body;
  // console.log("line298", newImage);
  // console.log("line:299", req.body);
  // // console.log("line:300", req.body.image);
  // // console.log("line:301", req.body.fname);

  const {imagenew} = req.body;
  // console.log ('line:297', imagenew);
  // console.log ('line298', req.file);
  // console.log ('line:299', req.body.image);
  // console.log ('line:300', req.imagenew);
  // console.log("line:300", req.body.image);
  // console.log("line:301", req.body.fname);

  const test10 = req.body.image;
  console.log ('line:5', test10);

  if (!fname || !filename) {
    res.status (401).json ({status: 401, message: 'fill all the data'});
  }

  try {
    // const date = moment (new Date ()).format ('YYYY-MM-DD');
    // console.log ('line:333', date);

    let today = new Date (); // get the date
    let day = ('0' + today.getDate ()).slice (-2); //get day with slice to have double digit day
    let month = ('0' + (today.getMonth () + 1)).slice (-2); //get your zero in front of single month digits so you have 2 digit months
    // let date = month + '-' + day + '-' + today.getFullYear ();
    let date = today.getFullYear () + '-' + month + '-' + day;
    console.log ('line:9', date);

    ('2023-08-25');

    const userdata = new users1 ({
      fname: fname,
      imgpath: filename,
      date: date,
      image: test10,
    });

    console.log("line:10", userdata);

    const finaldata = await userdata.save ();

    res.status (201).json ({status: 201, finaldata});
  } catch (error) {
    res.status (401).json ({status: 401, error});
  }
});



// ### PlaygroundRegister -Start-: testing different Headers, dispatch and receive data #############################################################

router.post ('/playgroundregister', upload.single ('photo'), async (req, res) => {
  const {filename, path} = req.file;
  console.log("line:11", filename);
  console.log("line:11.1 ", path);
  console.log ('line:12', req.file);
  // console.log ('line:101', req.file.path);
  // console.log ('line:103', filename);
  // console.log ('line:104', path);

  const {fname} = req.body;
  console.log ('line:13', req.body);
  console.log ('line:14', req.body.add);
  // console.log ('line:201', fname);

  // const {newImage} = req.body;
  // console.log("line298", newImage);
  // console.log("line:299", req.body);
  // // console.log("line:300", req.body.image);
  // // console.log("line:301", req.body.fname);

  const {imagenew} = req.body;
  // console.log ('line:297', imagenew);
  // console.log ('line298', req.file);
  // console.log ('line:299', req.body.image);
  // console.log ('line:300', req.imagenew);
  // console.log("line:300", req.body.image);
  // console.log("line:301", req.body.fname);

  const test10 = req.body.image;
  console.log ('line:15', test10);

  if (!fname || !filename) {
    res.status (401).json ({status: 401, message: 'fill all the data'});
  }

  try {
    // const date = moment (new Date ()).format ('YYYY-MM-DD');
    // console.log ('line:333', date);

    let today = new Date (); // get the date
    let day = ('0' + today.getDate ()).slice (-2); //get day with slice to have double digit day
    let month = ('0' + (today.getMonth () + 1)).slice (-2); //get your zero in front of single month digits so you have 2 digit months
    // let date = month + '-' + day + '-' + today.getFullYear ();
    let date = today.getFullYear () + '-' + month + '-' + day;
    console.log ('line:16', date);

    ('2023-08-25');

    const userdata = new users2 ({
      fname: fname,
      imgpath: filename,
      date: date,
      image: test10,
    });

    console.log("line:17", userdata);

    console.log("line:18", userdata);

    const finaldata = await userdata.save ();

    res.status (201).json ({status: 201, finaldata});
  } catch (error) {
    res.status (401).json ({status: 401, error});
  }
});

// ### Playground -Start-: testing different Headers, dispatch and receive data #############################################################



// user data get
router.get ('/getdata', async (req, res) => {
  try {
    const getUser = await users1.find ();

    res.status (201).json ({status: 201, getUser});
  } catch (error) {
    res.status (401).json ({status: 401, error});
  }
});

// router.get ('/getdata', async (req, res) => {
//   try {
//     const getUser = await users1.find ();

//     res.status (201).json ({status: 201, getUser});
//   } catch (error) {
//     res.status (401).json ({status: 401, error});
//   }
// });

// delete user data
router.delete ('/:id', async (req, res) => {
  try {
    const {id} = req.params;

    const dltUser = await users1.findByIdAndDelete ({_id: id});

    res.status (201).json ({status: 201, dltUser});
  } catch (error) {
    res.status (401).json ({status: 401, error});
  }
});




router.post ('/edituser', async (req, res) => {
  
  
  const {userid} = req.body;
  const {id} = req.body;
  const {fname} = req.body;
  console.log("line:1", req.body);
 

  try {

    const dltUser = await users1.findOne ({_id: id});
   
    let today = new Date (); // get the date
    let day = ('0' + today.getDate ()).slice (-2); //get day with slice to have double digit day
    let month = ('0' + (today.getMonth () + 1)).slice (-2); //get your zero in front of single month digits so you have 2 digit months
    let date = today.getFullYear () + '-' + month + '-' + day;




   


    dltUser.fname = req.body.name;
    dltUser.image = req.body.image;
    dltUser.image2 = req.body.image2;
    dltUser.imgpath = req.body.imgpath;
    dltUser.date = req.body.date;
    dltUser.imageCollection= req.body.imageCollection;
    console.log("line:12", dltUser.imageCollection);


    const star = await dltUser.save ();

    res.status (201).json (star);
    // res.status (201).json ("star");

  } catch (error) {
    res.status (401).json ({status: 401, error});

  }
});

// ### PlaygroundEditUser2 -Start-: testing different Headers, dispatch and receive data #############################################################



router.post ('/playgroundedituser2', upload.single ('photo'), async (req, res) => {
 
// Commen:!!! The reason you are getting [object Object] is because you are trying to add a Javascript object to the screen (shown in the console).
//  #for the file

// 1. goes an check for Undefined Values
  // if (req.body && req.file?.size) {
  //   console.log("line:1", req.file?.fieldname);
  // }
  // else {
  //   console.log("line:1.1, Just an error!!!");
  // }



  // const {filename, path} = req.file;
  // console.log("line:1", filename);
  // console.log("line:1.1 ", path);

  // 2. also possible to use Optional Chaining
  console.log ('line:2', req.file);
  console.log ('line:3', req.file?.filename);
  // console.log("line:3", req.file?.fieldname);
  // console.log("line:4", req.file?.size);
  // console.log ('line:5', req.body);
  // console.log ('line:5.1', req.body.id);
  // console.log ('line:5.2', req.body.date);
  // console.log ('line:5.3', req.body.imageCollection);

// #for the tree data
  // const {userid} = req.body;
  // const {id} = req.body;
  // const {fname} = req.body;
  // console.log("line:1", req.body);

  const userAgent = req.headers;
  // console.log("line:6", req.headers);


  
  
 

  try {

    const dltUser = await users1.findOne ({_id: req.body.id});
    // console.log("line:7", dltUser);

    // let today = new Date (); // get the date
    // let day = ('0' + today.getDate ()).slice (-2); //get day with slice to have double digit day
    // let month = ('0' + (today.getMonth () + 1)).slice (-2); //get your zero in front of single month digits so you have 2 digit months
    // let date = today.getFullYear () + '-' + month + '-' + day;
   
    dltUser.fname = req.body.name;
    // console.log("line:8", req.body.name);

    dltUser.image = req.body.image;
    // console.log("line:9", req.body.image);

    dltUser.image2 = req.body.image2;
    // console.log("line:10", req.body.image2);

    dltUser.imgpath = req.file?.filename;
    console.log("line:11", req.file?.filename);

    dltUser.date = req.body.date;
    // console.log("line:12", req.body.date);

    // not working so far
    dltUser.imageCollection= req.body.imageCollection;
    // console.log("line:13", req.body.imageCollection);

    const star = await dltUser.save ();
    // console.log("line:14", star);

    res.status (201).json (star);
    // res.status (201).json ("star");

  } catch (error) {
    res.status (401).json ({status: 401, error});

  }
});

router.get('/init-video', function (req, res) {
 
    const db = client.db('videos');
    const bucket = new mongodb.GridFSBucket(db);
    const videoUploadStream = bucket.openUploadStream('bigbuck');
    const videoReadStream = fs.createReadStream('./bigbuck.mp4');
    videoReadStream.pipe(videoUploadStream);
    res.status(200).send("Done...");
  
});

router.get("/mongo-video", function (req, res) {
  

    const range = req.headers.range;
    if (!range) {
      res.status(400).send("Requires Range header");
    }

    const db = client.db('videos');
    // GridFS Collection
    db.collection('fs.files').findOne({}, (err, video) => {
      if (!video) {
        res.status(404).send("No video uploaded!");
        return;
      }

      // Create response headers
      const videoSize = video.length;
      const start = Number(range.replace(/\D/g, ""));
      const end = videoSize - 1;

      const contentLength = end - start + 1;
      const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
      };

      // HTTP Status 206 for Partial Content
      res.writeHead(206, headers);

      const bucket = new mongodb.GridFSBucket(db);
      const downloadStream = bucket.openDownloadStreamByName('bigbuck', {
        start
      });

      // Finally pipe video to response
      downloadStream.pipe(res);
    });
  
});



// ### PlaygroundEditUser2 -End-: testing different Headers, dispatch and receive data #############################################################





module.exports = router;
