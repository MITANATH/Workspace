const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MongoDB URI
const mongoUri = 'mongodb://localhost:27017'; 
const dbName = 'userdetails'; 

// Create a new MongoClient
const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
}

connectToMongoDB();

// Example route to update FCM tokens
app.post('/updateFCMTokens', async (req, res) => {
    const { loginIdentifier, fcmToken } = req.body;

    if (!loginIdentifier || !fcmToken) {
        return res.status(400).send('Missing login identifier or FCM token.');
    }

    try {
        const database = client.db("userdetail");
        const collection = database.collection('user_details');

        // Upsert FCM token
        
            const result = await collection.updateOne(
                { loginIdentifier: loginIdentifier },
                { $set: { token_area: fcmToken } },
                { upsert: true }
            );
    //console.log("new-user",newUser)
        res.send('FCM token inserted/updated successfully.');
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/getFCMTokens', async (req) => {
    const { loginIdentifier } = req.body;

    if (!loginIdentifier ) 

    try {
        const database = client.db("userdetail");
        const collection = database.collection('user_details');

        // Upsert FCM token
        
            const result = await collection.find(
                { loginIdentifier: loginIdentifier },
                {   token_area: "6290944082"  },
                { upsert: true }
            );
    //console.log("new-user",newUser)
        res.send('GotToken 6290944082 sucessfully .');
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).send('Internal Server Error');
    }
});

const PORT = process.env.PORT || 9900;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});