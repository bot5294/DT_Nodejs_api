const connection = require("../config/mongodb");
module.exports.createEvent = async (req, res) => {
  try {
    let {
      name,
      tageline,
      schedule,
      description,
      moderator,
      category,
      sub_category,
      rigor_rank,
    } = req.body;
    console.log("req.file\n");
    console.log(req.files[0].path);
    console.log("\n");
    console.log(req.body);
    let arr = [];
    arr = req.files;
    for (let i = 0; i < arr.length; i++) arr[i] = arr[i].path;
    let insertResult = connection(function (err, client) {
      let db = client.db("DT_Nodejs_DB");
      db.collection("events").insertOne(
        {
          name,
          tageline,
          schedule,
          description,
          moderator,
          category,
          sub_category,
          rigor_rank,
          photos: arr,
        },
        function (err, result) {
          if (err) {
            console.log(err);
            return;
          }
          console.log("inserted documents =>", result);
          res.status(200).json({
            message: `Event Created Successfully, Id =  ${result.insertedId}`,
          });
          return result;
        }
      );
    });
  } catch (err) {
    console.log(`Error at createEvent : ${err}`);
  }
};

module.exports.getEventDetails = (req, res) => {
  try {
    if (req.query.id) {
      let event_id = req.query.id;
      return res.status(200).json({
        message: `Event id received at backend is ${event_id}`,
      });
    }
    let type = req.query.type;
    let limit = req.query.limit;
    let page = req.query.page;
    let data = {
      type: type,
      limit: limit,
      page: page,
    };
    console.log(page);
    data = JSON.stringify(data);
    res.status(200).json({
      message: `Event details received at backend are as follows : ${data}`,
    });
  } catch (err) {
    console.log(`Error at  ${err}`);
  }
};
