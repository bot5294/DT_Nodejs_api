const { MongoClient } = require("mongodb");
// Database Name
const dbName = "DT_Nodejs_DB";
// Connection URL
const url = `mongodb://localhost:27017/${dbName}`;

module.exports = {
  connectToserver: function (callback) {
    MongoClient.connect(url, function (err, client) {
      if (err) throw err;
      const db = client.db(dbName);
      return callback(err, db);
    });
  },
};
