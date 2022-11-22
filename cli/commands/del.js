const inquirer = require("inquirer");
const deleteData = require("../utils/deleteData");
module.exports.del = () => {
  let awaitResult = false;
  let p = new Promise((resolve, reject) => {
    inquirer
      .prompt([
        {
          type: "input",
          message: "Enter Id to delete the event record !",
          name: "id",
        },
        {
          name: "confirm",
          type: "checkbox",
          message: "Are you sure ? This action is irreversible !!!",
          choices: ["Yes", "No"],
          // default: "No",
        },
      ])
      .then(async (result) => {
        if (result.confirm == "Yes") {
          let url = `http://localhost:5294/api/v3/app/events/${result.id}`;
          awaitResult = await deleteData.del(url);
          if (awaitResult) {
            resolve(awaitResult);
          } else {
            reject(awaitResult);
          }
        }
      });
  });
  return p;
};
