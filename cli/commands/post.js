const postData = require("../utils/postData");
const fs = require("fs");

const args = process.argv;

module.exports.post = (file) => {
  let awaitResult = false;
  let p = new Promise((resolve, reject) => {
    let filename = "";
    console.log();
    if (Object.keys(file).length === 0 && file.constructor === Object) {
      filename = `${args[3]}`;
    } else {
      filename = file;
    }
    //   console.log(args[3]);
    fs.readFile(filename, "utf8", async (err, data) => {
      if (err) {
        console.log(
          `\nError: unable to open the specified path, plz check the path!\n`
        );
        resolve(true);
      }
      data = JSON.parse(data);
      let arr = [];
      for (let i of Object.entries(data)) {
        arr.push(i);
      }
      awaitResult = await postData.post(arr);
      if (awaitResult) {
        resolve(awaitResult);
      } else {
        reject(awaitResult);
      }
    });
  });
  return p;
};
