const inquirer = require("inquirer");
const deleteData = require("../utils/deleteData");
module.exports.del = () => {
  console.log("inside del");
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
    .then((result) => {
      if (result.confirm == "Yes") {
        let url = `http://localhost:5294/api/v3/app/events/${result.id}`;
        deleteData.del(url);
      }
    });
};
