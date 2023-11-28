require("dotenv").config();
const express = require("express");
const app = express();
require("./db/conn");
const router = require("./routes/router");
const cors = require("cors");
const path = require("path"); // Import the 'path' module

const port = process.env.PORT || 8005;

app.use(express.json({ limit: "50mb", extended: true }));
app.use(cors());
app.use(router);

app.use("/uploads", express.static("./uploads"));
app.use("/videos", express.static("./videos"));
app.use("/", express.static("./"));

// Serve static files from the current directory
// app.use(express.static(path.join(__dirname, 'index.html')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
