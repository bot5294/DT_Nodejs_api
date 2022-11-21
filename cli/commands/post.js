const postData = require("../utils/postData");
const fs = require("fs");

const args = process.argv;

module.exports.post = () => {
  let filename = `${args[3]}`;
  //   console.log(args[3]);
  fs.readFile(filename, "utf8", (err, data) => {
    if (err) throw err;
    data = JSON.parse(data);
    let arr = [];
    for (let i of Object.entries(data)) {
      arr.push(i);
    }
    postData.post(arr);
  });
};
