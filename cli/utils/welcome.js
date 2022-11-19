const figlet = require("figlet");
const Table = require("cli-table");
module.exports.display = () => {
  figlet("WishKarma   Backend", (err, data) => {
    if (err) {
      console.log("figlet error...");
      console.dir(err);
      return;
    }
    console.log(data);
    let table = new Table({
      head: ["Req Type", "url", "end point", "payload"],
      rows: [
        ["GET", "/api/v3/app", "/events?id=:event_id", "-"],
        ["GET", "/api/v3/app", "/events?type=latest&limit=5&page=1", "-"],
        [
          "POST",
          "/api/v3/app",
          "/events",
          "name, files[image], tagline, schedule, description, moderator, category, sub_category, rigor_rank",
        ],
        ["PUT", "/api/v3/app", "/events/:id", "Same as POST payload"],
        ["DELETE", "/api/v3/app", "/events/:id", "-"],
      ],
      colWidths: [12, 16, 38, 38],
      style: { compact: true, "padding-left": 1 },
    });

    //   table.push(["First value", "Second Value"], ["First value", "Second Value"]);
    console.log(table.toString());
  });
};
