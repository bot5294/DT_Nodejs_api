const express = require("express");
const app = express(),
  bodyParser = require("body-parser");
const PORT = process.env.PORT || 5294;
const db = require("./config/mongodb");
db.connectToDb();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", require("./routes"));
app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error in starting the server : ${err}`);
  } else {
    console.log(`Server is up and running at : http://localhost:${PORT}`);
  }
});
