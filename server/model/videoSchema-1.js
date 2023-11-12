const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    imgpath: {
        type: String,
    },
    folder: String,         // The folder where the video is stored
    uploadDate: {           // The date the video was uploaded
        type: Date,
        default: Date.now,
    },
});

const video1 = new mongoose.model("videos1", userSchema);

module.exports = video1;
