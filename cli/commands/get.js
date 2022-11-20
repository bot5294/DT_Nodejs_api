const inquirer = require("inquirer");
const fetchData = require("../utils/fetchData");

let endPoints = ["events"];
let query = {
  type: "list",
  message: "Select Api End Point !\n/api/v3/app",
  choices: endPoints,
  name: "event",
};
module.exports.get = () => {
  inquirer.prompt(query).then((result) => {
    switch (result.event) {
      case "events":
        console.log("inside events");
        inquirer
          .prompt({
            type: "rawlist",
            message: "select events via id or type",
            choices: ["id", "type"],
            name: "type",
          })
          .then((result) => {
            switch (result.type) {
              case "id":
                inquirer
                  .prompt([
                    {
                      name: "id",
                      message: "Enter id :",
                      type: "input",
                    },
                  ])
                  .then((result) => {
                    let id = result.id;
                    fetchData.get(
                      `http://localhost:5294/api/v3/app/events?id=${id}`,
                      "getEventById"
                    );
                  });
                break;
              case "type":
                inquirer
                  .prompt([
                    {
                      name: "type",
                      message: "select type :",
                      type: "list",
                      choices: ["latest", "oldest"],
                    },
                    {
                      name: "limit",
                      message: "Enter Result Limit",
                      type: "input",
                    },
                    {
                      name: "page",
                      message: "Enter Page Number",
                      type: "input",
                    },
                  ])
                  .then((result) => {
                    fetchData.get(
                      `http://localhost:5294/api/v3/app/events?type=${result.type}&limit=${result.limit}&page=${result.page}`,
                      "paginatedTable"
                    );
                  });
            }
          });
    }
  });
};
