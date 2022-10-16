const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from "mongodb";

module.exports = function (callback) {
  // Database Name
  const dbName = "DT_Nodejs_DB";
  // Connection URL
  const url = `mongodb://localhost:27017/${dbName}`;
  // const client = new MongoClient(url);
  // Use connect method to connect to the server
  console.log("connected to db");
  MongoClient.connect(url, callback);
};

// console.log("db inside mongo " + db);
// module.exports = db;

// the following code examples can be pasted here...
