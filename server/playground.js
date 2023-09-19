// // app.js

// const express = require('express');
// const cors = require('cors');
// const conn = require('./conn');
// const router = require('./router');
// const app = express();

// // Enable CORS (Cross-Origin Resource Sharing)
// app.use(cors());

// // Parse JSON requests
// app.use(express.json());

// // Mount the router for file uploads
// app.use('/api', router);

// // Start the server
// const port = process.env.PORT || 5000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });