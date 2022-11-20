const axios = require("axios");
module.exports.del = (url) => {
  let config = {
    method: "delete",
    url: url,
    headers: {},
  };

  axios(config)
    .then(function (response) {
      response = response.data;
      console.log("\n" + response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
