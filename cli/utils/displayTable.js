const Table = require("cli-table");
module.exports.table = (data, type) => {
  if (data.length || data == undefined || data == null) {
    console.log(data);
    return;
  }
  data = data.event;
  switch (type) {
    case "paginatedTable":
      //   vertical table
      let table = new Table({
        head: ["Id", "Name", "Schedule"],
        style: {
          border: ["green"],
          "padding-left": 1,
        },
      });
      data.forEach((e) => {
        table.push([e._id, e.name, e.schedule]);
      });
      console.log(table.toString());
      break;
    case "getEventById":
      //       //   vertical table
      let table2 = new Table({
        head: ["Fields", "Data 1", "Data 2"],
        style: {
          border: ["green"],
          "padding-left": 1,
        },
      });

      for (let [key, value] of Object.entries(data)) {
        let obj = {};
        if (key == "description") value = value.substring(0, 25) + "...";
        obj[key] = value;
        table2.push(obj);
      }
      console.log(table2.toString());
  }
};
