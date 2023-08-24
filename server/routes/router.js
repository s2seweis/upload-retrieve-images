const express = require("express");
const router = new express.Router();
const multer = require("multer");
const users1 = require("../model/usersSchema");
const moment = require("moment")

// const image = require("../uploads/imgae-1692866245252. 1.png")
// console.log("line:1000", image);

// ### - Test:Encoding images in Base64





const fs = require('fs');




// const JSON = {
//   name: 'Jenny william',
//   age: 21,
//   image: base64Image
// };
// db.student.insertOne(JSON);





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
    console.log("line:301", req.body.image);
    console.log("line:302", image);

    // const imageBuffer = fs.readFileSync(image);
    // const base64Image = imageBuffer.toString('base64');
    // console.log("line:303", base64Image);


     


    if(!fname || !filename){
        res.status(401).json({status:401,message:"fill all the data"})
    }
    

   

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
