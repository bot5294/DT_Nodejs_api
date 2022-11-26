const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");
module.exports.post = async (arr) => {
  let p = new Promise((resolve, reject) => {
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
      } else if (e[0] == "schedule"){
        var date_time = e[1].split(" ");
        var date = date_time[0].split("/"),
            m = date[0],
            d = date[1],
            y = date[2],
            time = date_time[1].split(":"),
            h = time[0],
            min = time[1];
            
        e[1] =  `${new Date(y,m,d,h,m).toUTCString()}`;

        data.append(e[0], e[1]);
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
        resolve(true);
      })
      .catch(function (error) {
        console.log(error);
      });
  });
  return p;
};
