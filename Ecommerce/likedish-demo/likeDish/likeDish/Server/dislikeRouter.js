const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const router = express.Router();

//  MongoDB connection details
const url = 'mongodb://localhost:27017';
const dbName = 'dislikedb';
const client = new MongoClient(url);

router.post('/like', async (req, res) => {
  try {
    await client.connect();
    const db = client.db(dbName);

    const { dishId, userIdentifier } = req.body;
    //console.log("request received",dishId,userIdentifier)
    const dishesCollection = db.collection('Dishes');

    // Check if the user has already liked the dish
    const dish = await dishesCollection.findOne({ dishId: dishId, likedBy: userIdentifier });

    if (dish) {
      return res.status(409).send('User has already disliked this dish');
    }

    // Update likes and likedBy array
    const updateResult = await dishesCollection.updateOne(
      { dishId: dishId }, // Use the unique dishID to find the document
      { 
        $addToSet: { likedBy: userIdentifier }, // Adds userIdentifier to likedBy if not already present
        $inc: { likes: 1 } // Increment likes by 1
      }
    );
    
    if (updateResult.matchedCount === 0) {
      return res.status(404).send('Dish not found');
    }

    res.status(200).send('Dish disliked successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  } finally {
    await client.close();
  }
});

module.exports = router;
