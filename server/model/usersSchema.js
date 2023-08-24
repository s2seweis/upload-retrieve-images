const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
    imgpath:{
        type:String,
        required:true
    },
    image:{
        base64: String,
        imageFormat: String
    },
    date:{
        type:Date
    }
});


// create model

const users1 = new mongoose.model("users1",userSchema);

module.exports = users1;

