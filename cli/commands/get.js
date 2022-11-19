const inquirer = require("inquirer");
const http = require("http");
const Table = require("cli-table");
const fetchData = require("../utils/fetchData");
const { log } = require("console");
// console.log("inside get");

let endPoints = ["events"];
let query = {
  type: "list",
  message: "Select Api End Point !\n/api/v3/app",
  choices: endPoints,
  name: "event",
};
module.exports.get = () => {
  console.log("inside get");
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
                    // http.get(
                    fetchData.get(
                      `http://localhost:5294/api/v3/app/events?id=${id}`,
                      "getEventById"
                    );
                    //   (res) => {
                    //     let data = "";

                    //     // A chunk of data has been received.
                    //     res.on("data", (chunk) => {
                    //       data += chunk;
                    //     });

                    //     // The whole response has been received. Print out the result.
                    //     res.on("end", () => {
                    //       data = JSON.parse(data);
                    //       console.log("\n" + data.message + "\n");
                    //       data = data.event;
                    //       //   vertical table
                    //       let table = new Table({
                    //         head: ["Fields", "Data 1", "Data 2"],
                    //         style: {
                    //           border: ["green"],
                    //           "padding-left": 1,
                    //         },
                    //       });

                    //       for (let [key, value] of Object.entries(data)) {
                    //         let obj = {};
                    //         if (key == "description")
                    //           value = value.substring(0, 25) + "...";
                    //         obj[key] = value;
                    //         table.push(obj);
                    //       }
                    //       console.log(table.toString());
                    //     });
                    //   }
                    // );
                  });
                break;
              case "type":
                let objType = {};
                inquirer
                  .prompt([
                    {
                      name: "type",
                      message: "select type :",
                      type: "list",
                      choices: ["latest", "oldest"],
                    },
                  ])
                  .then((result) => {
                    objType["type"] = result.type;
                    inquirer
                      .prompt([
                        {
                          name: "limit",
                          message: "Enter Result Limit",
                          type: "input",
                        },
                      ])
                      .then((result) => {
                        objType["limit"] = result.limit;
                        inquirer
                          .prompt([
                            {
                              name: "page",
                              message: "Enter Page Number",
                              type: "input",
                            },
                          ])
                          .then((result) => {
                            fetchData.get(
                              `http://localhost:5294/api/v3/app/events?type=${objType.type}&limit=${objType.limit}&page=${result.page}`,
                              "paginatedTable"
                            );
                          });
                      });
                  });
            }
          });
    }
  });
};

// get();

// Table {
//     '0': '634c360680979436d4ac6cdd',
//     '1': 'bot5295',
//     '2': 'you can do it',
//     '3': '12/01/2023',
//     '4': 'jknjkn jkdnj jndfuinfj uincuidnuci',
//     '5': 'virat',
//     '6': 'general',
//     '7': 'gold',
//     '8': '45',
//     '9': [
//       'uploads\\photos-1665938950239-986911652.png',
//       'uploads\\photos-1665938950241-420792130.png'
//     ],
//     options: {
//       chars: {
//         top: '─',
//         'top-mid': '┬',
//         'top-left': '┌',
//         'top-right': '┐',
//         bottom: '─',
//         'bottom-mid': '┴',
//         'bottom-left': '└',
//         'bottom-right': '┘',
//         left: '│',
//         'left-mid': '├',
//         mid: '─',
//         'mid-mid': '┼',
//         right: '│',
//         'right-mid': '┤',
//         middle: '│'
//       },
//       truncate: '…',
//       colWidths: [ 10 ],
//       colAligns: [],
//       style: {
//         'padding-left': 1,
//         'padding-right': 1,
//         head: [Array],
//         border: [Array],
//         compact: true
//       },
//       head: [
//         '_id',         'name',
//         'tagline',     'schedule',
//         'description', 'moderator',
//         'category',    'sub_category',
//         'rigor_rank',  'photos'
//       ],
//       rows: [
//         '634c360680979436d4ac6cdd',
//         'bot5295',
//         'you can do it',
//         '12/01/2023',
//         'jknjkn jkdnj jndfuinfj uincuidnuci',
//         'virat',
//         'general',
//         'gold',
//         '45',
//         [Array]
//       ]
//     },
//     length: 10
//   }

//   //display
//   Table {
//     '0': [ 'GET', '/api/v3/app', '/events?id=:event_id', '-' ],
//     '1': [ 'GET', '/api/v3/app', '/events?type=latest&limit=5&page=1', '-' ],
//     '2': [
//       'POST',
//       '/api/v3/app',
//       '/events',
//       'name, files[image], tagline, schedule, description, moderator, category, sub_category, rigor_rank'
//     ],
//     '3': [ 'PUT', '/api/v3/app', '/events/:id', 'Same as POST payload' ],
//     '4': [ 'DELETE', '/api/v3/app', '/events/:id', '-' ],
//     options: {
//       chars: {
//         top: '─',
//         'top-mid': '┬',
//         'top-left': '┌',
//         'top-right': '┐',
//         bottom: '─',
//         'bottom-mid': '┴',
//         'bottom-left': '└',
//         'bottom-right': '┘',
//         left: '│',
//         'left-mid': '├',
//         mid: '─',
//         'mid-mid': '┼',
//         right: '│',
//         'right-mid': '┤',
//         middle: '│'
//       },
//       truncate: '…',
//       colWidths: [ 12, 16, 38, 38 ],
//       colAligns: [],
//       style: {
//         'padding-left': 1,
//         'padding-right': 1,
//         head: [Array],
//         border: [Array],
//         compact: true
//       },
//       head: [ 'Req Type', 'url', 'end point', 'payload' ],
//       rows: [ [Array], [Array], [Array], [Array], [Array] ]
//     },
//     length: 5
//   }
