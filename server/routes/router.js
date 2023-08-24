const express = require("express");
const router = new express.Router();
const multer = require("multer");
const users1 = require("../model/usersSchema");
const moment = require("moment")

// const image = require("../uploads/imgae-1692866245252. 1.png")
// console.log("line:1000", image);

// ### - Test:Encoding images in Base64

const fs = require('fs');
// const imageBuffer = fs.readFileSync('G:\MyImage.png');


// ### - Test:

// img storage path
const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads")
    },
    filename:(req,file,callback)=>{
        callback(null,`imgae-${Date.now()}. ${file.originalname}`)
    }
})


// img filter
const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(new Error("only images is allowd"))
    }
}

const upload = multer({
    storage:imgconfig,
    fileFilter:isImage
});


// user register
router.post("/register",upload.single("photo"),async(req,res)=>{

    const {filename, path} = req.file;
    console.log("line:100", req.file);
    console.log("line:101", req.file.path);
    console.log("line:103", filename);
    console.log("line:104", path);

    const {fname} = req.body;
    console.log("line:200", req.body);

    const {image} = req.body;
    console.log("line:300", req.body);

    if(!fname || !filename){
        res.status(401).json({status:401,message:"fill all the data"})
    }

    // function getImage(image) {
    //     const options = {
    //        url: `${image}&&s=100`,
    //        encoding: 'base64'
    //     };
       
    //    return new Promise(function (resolve, reject)      {
    //          request.get(options, function (err, resp, body) {
    //              if (err) {
    //                   reject(err);
    //                } else {
    //       const userDetails = {
    //              contentType: resp.headers['content-type'],
    //              image: {
    //               imageFormat: resp.headers['content-type'].split('/')[1],
    //               base64: resp.body
    //              }
    //          }
    //            resolve(userDetails);
    //            console.log("line:400", userDetails);
    //        }
    //      })
    //   })
    // }

    try {

     

     




        const date = moment(new Date()).format("YYYY-MM-DD");

        const userdata = new users1({
            fname:fname,
            imgpath:filename,
            date:date
        });

        const finaldata = await userdata.save();

        res.status(201).json({status:201,finaldata});

    } catch (error) {
        res.status(401).json({status:401,error})
    }
});


// user data get
router.get("/getdata",async(req,res)=>{
    try {
        const getUser = await users1.find();

        res.status(201).json({status:201,getUser})
    } catch (error) {
        res.status(401).json({status:401,error})
    }
});


// delete user data
router.delete("/:id",async(req,res)=>{

    try {
        const {id} = req.params;

        const dltUser = await users1.findByIdAndDelete({_id:id});

        res.status(201).json({status:201,dltUser});

    } catch (error) {
        res.status(401).json({status:401,error})
    }

})


module.exports = router;
