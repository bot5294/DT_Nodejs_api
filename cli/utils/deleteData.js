const axios = require("axios");
module.exports.del = (url) => {
  let p = new Promise((resolve, reject) => {
    let config = {
      method: "delete",
      url: url,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        response = response.data;
        if (response.message == undefined) {
          console.log("\n" + response + "\n");
        } else {
          console.log("\n" + response.message + " \n");
        }
        resolve(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
  return p;
};
