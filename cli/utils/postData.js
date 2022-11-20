const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
module.exports.post = async (arr) => {
  let data = new FormData();
  arr.forEach((e) => {
    if (e[0] == "attendees") {
      e[1].forEach((f) => {
        data.append(e[0], `${f}`);
      });
    } else if (e[0] == "photos") {
      e[1].forEach((f) => {
        data.append(e[0], fs.createReadStream(`${f}`));
      });
    } else {
      data.append(e[0], e[1]);
    }
  });
  var config = {
    method: "post",
    url: "http://localhost:5294/api/v3/app/events",
    headers: {
      ...data.getHeaders(),
    },
    data: data,
  };
  axios(config)
    .then(function (response) {
      response = JSON.stringify(response.data);
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};
