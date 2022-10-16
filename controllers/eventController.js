const { ObjectId } = require("mongodb");
const connection = require("../config/mongodb");
const fs = require("fs");
const { log } = require("console");
module.exports.createEvent = async (req, res) => {
  try {
    let {
      name,
      tagline,
      schedule,
      description,
      moderator,
      category,
      sub_category,
      rigor_rank,
    } = req.body;
    // console.log("req.file\n");
    // console.log(req.files[0].path);
    // console.log("\n");
    // console.log(req.body);
    let arr = [];
    arr = req.files;
    for (let i = 0; i < arr.length; i++) arr[i] = arr[i].path;
    connection(function (err, client) {
      let db = client.db("DT_Nodejs_DB");
      db.collection("events").insertOne(
        {
          name,
          tagline,
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

module.exports.updateEvent = (req, res) => {
  try {
    let id = req.params.id;
    let {
      name,
      tagline,
      schedule,
      description,
      moderator,
      category,
      sub_category,
      rigor_rank,
    } = req.body;
    let arr = [];
    arr = req.files;
    for (let i = 0; i < arr.length; i++) arr[i] = arr[i].path;
    let isPhotoProvided = arr.length > 0 ? true : false;
    console.log("isPhotoProvided : ", isPhotoProvided);
    if (isPhotoProvided) {
      if (arr.length != 2) {
        return res.status(401).json({
          message: "Provide only 2 photos or none",
        });
      }
      connection(async function (err, client) {
        let db = await client.db("DT_Nodejs_DB");
        let record = await db.collection("events").findOneAndUpdate(
          { _id: new ObjectId(id) },
          {
            $set: {
              name,
              tagline,
              schedule,
              description,
              moderator,
              category,
              sub_category,
              rigor_rank,
              photos: arr,
            },
          }
        );
        if (record) {
          let photoArr = [];
          photoArr = record.value.photos;
          for (let i = 0; i < photoArr.length; i++) {
            let filename = photoArr[i];
            if (fs.existsSync(filename)) {
              fs.unlinkSync(filename);
              console.log(`${filename} Deleted successfully`);
            } else {
              console.log(
                "file not exists, unable delete photos at updateEvent"
              );
            }
          }
          return res.status(200).json({
            message: "This record updated successfully",
            record: record,
          });
        }
      });
    } else {
      connection(async function (err, client) {
        let db = await client.db("DT_Nodejs_DB");
        let record = await db.collection("events").findOneAndUpdate(
          { _id: new ObjectId(id) },
          {
            $set: {
              name,
              tagline,
              schedule,
              description,
              moderator,
              category,
              sub_category,
              rigor_rank,
            },
          },
          { returnDocument: "after" }
        );
        if (record) {
          return res.status(200).json({
            message: "Here is the updated record [no photo update]",
            record: record,
          });
        }
      });
    }
  } catch (err) {
    console.log(`Error at updateEvent : ${err}`);
  }
};

module.exports.deleteEvent = (req, res) => {
  try {
    let id = req.params.id;
    if (ObjectId.isValid(id)) {
      connection(async function (err, client) {
        let db = await client.db("DT_Nodejs_DB");
        let record = await db
          .collection("events")
          .findOneAndDelete({ _id: new ObjectId(id) });
        if (record.value != null) {
          let photoArr = [];
          photoArr = record.value.photos;
          for (let i = 0; i < photoArr.length; i++) {
            let filename = photoArr[i];
            if (fs.existsSync(filename)) {
              fs.unlinkSync(filename);
              console.log(`${filename} Deleted successfully`);
            } else {
              console.log(
                "file not exists, unable delete photos at updateEvent"
              );
            }
          }
          return res.status(200).json({
            message: "This document Delete Successfully",
            record: record,
          });
        } else {
          return res.status(404).json({
            message: "No records found for this id",
          });
        }
      });
    } else {
      return res.status(404).json({
        message: "Provide legitimate id",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error,contact Admin",
    });
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
