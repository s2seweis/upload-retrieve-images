const express = require ('express');
const router = new express.Router ();
const multer = require ('multer');
const users1 = require ('../model/usersSchema');
const users2 = require ('../model/usersSchema2');
const moment = require ('moment');



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



// ### Playground -Start-: testing different Headers, dispatch and receive data #############################################################

router.post ('/playground', upload.single ('photo'), async (req, res) => {
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
  const {file} = req.body;
  // console.log ('line:209', id);
  console.log ('line:0', file);
  console.log ('line:1', id);
  // console.log ('line:204', req.params);
  console.log ('line:2', userid);
  console.log ('line:3', req.body);
  const {fname} = req.body;
  console.log ('line:3.3', req.body);
  console.log ('line:3.4', req.body.tree);
  console.log ('line:3.5', req.body.photo);
  // console.log ('line:203', req);
  // console.log ('line:208', req.body.userid);
  try {
    // ### - its running but the data is not arriving

    const dltUser = await users1.findOne ({_id: id});
    // console.log ('line:4', dltUser);
    // return res.json (dltUser);

    let today = new Date (); // get the date
    let day = ('0' + today.getDate ()).slice (-2); //get day with slice to have double digit day
    let month = ('0' + (today.getMonth () + 1)).slice (-2); //get your zero in front of single month digits so you have 2 digit months
    // let date = month + '-' + day + '-' + today.getFullYear ();
    let date = today.getFullYear () + '-' + month + '-' + day;



    // console.log ('line:5', date);

    userData = req.body;
    // console.log("line:6", userData);


    dltUser.fname = req.body.name;
    // console.log("line:7", dltUser.fname);

    dltUser.image = req.body.image;
    // console.log("line:8", dltUser.image);

    dltUser.image2 = req.body.image2;
    // console.log("line:9", dltUser.image2);

    dltUser.imgpath = req.body.imgpath;
    // console.log("line:10", dltUser.imgpath);

    dltUser.date = req.body.date;
    // console.log("line:11", dltUser.date);

    dltUser.imageCollection= req.body.imageCollection;
    console.log("line:12", dltUser.imageCollection);


    const star = await dltUser.save ();
    // res.send ('User details updated successfully');

    res.status (201).json (star);

  } catch (error) {
    res.status (401).json ({status: 401, error});

  }
});

router.post ('/edituser-submit', async (req, res) => {
 
  console.log("line:", req.body.data);

  const {fname} = req.body;
  console.log ('line:', req.body);
  const {userid} = req.body;
  console.log("line:", userid);



  try {
    // const dltUser = await users1.findOne ({_id: userid});
    // return res.json (dltUser);
    console.log("500 Where? ");
  } catch (error) {
    res.status (401).json ({status: 401, error});
  }
});

module.exports = router;
