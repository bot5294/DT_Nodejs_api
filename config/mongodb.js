const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Database Name
const dbName = "DT_Nodejs_DB";

// Use connect method to connect to the server
module.exports.connectToDb = async () => {
  try {
    await client.connect();
    console.log("Connected successfully to the DB");
    const db = client.db(dbName);
    const collection = db.collection("documents");
    return db;
    // the following code examples can be pasted here...
  } catch (error) {
    console.log(`Error in connect to DB : ${error}`);
    client.close();
  }
};
