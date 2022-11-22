const http = require("http");
const displayTable = require("../utils/displayTable");
module.exports.get = (url, type) => {
  let awaitResult = false;
  let p = new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";

      // A chunk of data has been received.
      res.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      res.on("end", async () => {
        data = JSON.parse(data);
        awaitResult = await displayTable.table(data, type);
        if (awaitResult) resolve(awaitResult);
      });
    });
  });
  return p;
};
