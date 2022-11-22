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
        console.log("\n" + response);
        resolve(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
  return p;
};
