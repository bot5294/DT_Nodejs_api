const http = require("http");
const displayTable = require("../utils/displayTable");
module.exports.get = (url, type) => {
  http.get(url, (res) => {
    let data = "";

    // A chunk of data has been received.
    res.on("data", (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    res.on("end", () => {
      data = JSON.parse(data);
      displayTable.table(data, type);
    });
  });
};
