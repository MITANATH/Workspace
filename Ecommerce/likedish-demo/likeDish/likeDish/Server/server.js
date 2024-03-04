const express = require('express');
const bodyParser = require('body-parser');
const likedishesRoutes = require('./likeRouter'); // Adjust the path as necessary
const dislikedishesRoutes = require('./dislikeRouter'); // Adjust the path as necessary

const app = express();
const port = 9000; // You can choose any port


const allowCors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allow all methods
  
    // If the method is OPTIONS, return early (this is for preflight requests)
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
  
    next();
  };
// Use the imported routes
app.use(bodyParser.json());
app.use(allowCors); // Use the CORS middleware
console.log("cors allowed");
app.use('/api/dishes/like', likedishesRoutes);
app.use('/api/dishes/dislike', dislikedishesRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
