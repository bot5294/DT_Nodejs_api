const multer = require("multer");
const upload = multer({ dest: "../../../../uploads" });
module.exports.createEvent = (req, res) => {
  try {
    let data = ({
      name,
      tageline,
      schedule,
      description,
      moderator,
      category,
      sub_category,
      rigor_rank,
    } = req.body);
    console.log("req.file\n");
    console.log(req.files[0].originalname);
    console.log("\n");
    console.log(req.body);
    res.status(200).json({
      message: `name received = s ${JSON.stringify(data)}`,
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
