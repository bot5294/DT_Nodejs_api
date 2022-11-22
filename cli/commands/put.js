const inquirer = require("inquirer");
const DatePrompt = require("inquirer-date-prompt");
const putData = require("../utils/putData");
const axios = require("axios");
const moment = require("moment");
inquirer.registerPrompt("date", DatePrompt);

module.exports.put = () => {
  let awaitResult = false;
  let p = new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          name: "id",
          message: "Enter Event Id you want to edit/update :",
          type: "input",
        },
      ])
      .then(async (result) => {
        // event["data"] = await fetchData.get("getForEdit");
        await axios
          .get(`http://localhost:5294/api/v3/app/events?id=${result.id}`)
          .then((res) => {
            let event = res.data.event;
            // console.log(event.schedule);
            let tdate = event.schedule.split("/");
            tdate = new Date(`${tdate[0]}-${tdate[1]}-${tdate[2]}`);
            // console.log(tdate);
            let attendeesArr =
              event.attendees == "empty" ? new Array() : [...event.attendees];
            inquirer
              .prompt([
                {
                  name: "name",
                  message: "Edit Name :",
                  type: "input",
                  default: `${event.name}`,
                },
                {
                  name: "tagline",
                  message: "Edit Tagline :",
                  type: "input",
                  default: `${event.tagline}`,
                },
                {
                  type: "date",
                  name: "schedule",
                  message: "Edit Date : ",
                  // filter: (d) => Math.floor(d.getTime() / 1000),
                  // validate: (t) =>
                  //   t * 1000 > Date.now() + 86400000 || "God I hope not!",
                  // transformer: (s) => chalk.bold.red(s),
                  locale: "en-US",
                  default: tdate,
                  format: {
                    month: "numeric",
                    hour: undefined,
                    minute: undefined,
                  },
                  clearable: true,
                },
                {
                  name: "moderator",
                  message: "Edit Moderator : ",
                  type: "input",
                  default: `${event.moderator}`,
                },
                {
                  name: "sub_category",
                  message: "Edit Sub Category",
                  type: "input",
                  default: `${event.sub_category}`,
                },
                {
                  name: "rigor_rank",
                  message: "Edit Rigor Rank : ",
                  type: "input",
                  default: `${event.rigor_rank}`,
                },
                {
                  name: "description",
                  message: "Edit Description :",
                  type: "input",
                  default: `${event.description}`,
                },
                {
                  name: "category",
                  message: "Edit Category :",
                  type: "input",
                  default: `${event.category}`,
                },
                {
                  name: "attendees",
                  message:
                    "Edit Attendees(select attendees which you want to retain) :",
                  type: "checkbox",
                  choices: [...attendeesArr],
                },
                {
                  name: "new_attendees",
                  message: "Add New Attendee (enter attendee id) : ",
                  type: "input",
                  default: "null",
                },
              ])
              .then(async (result) => {
                console.log(result.new_attendees, " : New Attendees");
                console.log(result.new_attendees == "null");
                console.log(result.attendees, " : attendees");
                if (result.new_attendees != "null") {
                  console.log("inside new_attendees");
                  result.attendees.push(result.new_attendees);
                }
                result.id = event._id;
                awaitResult = await putData.put(result);
                if (awaitResult) {
                  resolve(awaitResult);
                } else {
                  reject(awaitResult);
                }
                // console.log(result);
              });
          });
      });
  });
  return p;
};
