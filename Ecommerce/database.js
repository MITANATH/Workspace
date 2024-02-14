const { MongoClient } = require("mongodb");
const uri = "mongodb://0.0.0.0:27017";

const client = new MongoClient(uri);
client.connect();

async function shoes() {
    try {
        const dataset = await client.db('Nabadb').collection('shoes').find().toArray();
        // console.log("shoes-returned")
        return JSON.stringify(dataset);
    }
    catch {
        console.log("db closed");
        await client.close();
    }
}
module.exports = {shoes};
// var result=shoes();
// console.log("shoes-returned",result)