const express = require("express");
const app = express(),
  bodyParser = require("body-parser");
const PORT = process.env.PORT || 5294;
const apiResponseHandler = require("./response-handler/api-response-handler");
const mongoUtil = require("./config/mongodb");
mongoUtil.connectToserver(function (err, db) {
  if (err) console.log(err);
  app.locals.collection = db.collection("events");
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use("/", require("./routes"));
  app.use(apiResponseHandler);
  app.listen(PORT, (err) => {
    if (err) {
      console.log(`Error in starting the server : ${err}`);
    } else {
      console.log(`Server is up and running at : http://localhost:${PORT}`);
    }
  });
});
