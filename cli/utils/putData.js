const axios = require("axios");
const FormData = require("form-data");
const moment = require("moment");
module.exports.put = (result) => {
  //   console.log(result);
  let data = new FormData();
  for (const [key, value] of Object.entries(result)) {
    // console.log(key, value);
    if (key == "attendees") {
      value.forEach((f) => {
        data.append(key, f);
      });
    }
    if (key == "schedule") {
      //   let dvalue = new Date(value);
      //   let svalue = value + "";
      //   let index = svalue.indexOf("T");
      let date = moment(value).format("MM/DD/YYYY");
      //   let date = svalue.substring(0, index);
      //   date = date.split("-");
      //   console.log(date);
      data.append(key, `${date}`);
    } else if (key != "new_attendees" || key != "id" || key != "attendees") {
      data.append(`${key}`, `${value}`);
    }
  }
  //   console.log(data);
  let config = {
    method: "put",
    url: `http://localhost:5294/api/v3/app/events/${result.id}`,
    headers: {
      ...data.getHeaders(),
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log("\nRecord updated successfully");
    })
    .catch(function (error) {
      console.log(error);
    });
};